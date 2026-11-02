/* ===== GUARDIA DE ACCESO (SIMULADO) ===== */
if(!sessionStorage.getItem('cdo_admin'))location.replace('index.html');
/* ===== DEFINICIÓN DE MÓDULOS ===== */
const D=CDO_DATA;
const MODS={
  dashboard:{icon:'📊',title:'Resumen'},
  usuarios:{icon:'👥',title:'Usuarios registrados',key:'adm_usuarios',seed:D.adminUsers,cols:[['nombre','Nombre'],['correo','Correo'],['categoria','Categoría','select',['comun','miembro']]]},
  membresias:{icon:'⭐',title:'Membresías',key:'solicitudes_membresia',seed:[],cols:[['nombre','Nombre'],['correo','Correo'],['fecha','Fecha']],toggle:['Pendiente','Aprobada']},
  productos:{icon:'🛍️',title:'Productos y souvenirs',key:'adm_productos',seed:D.products.map(p=>({nombre:p.name,categoria:p.cat,precio:p.price})),cols:[['nombre','Nombre'],['categoria','Categoría'],['precio','Precio','number']]},
  seminarios:{icon:'🎓',title:'Seminarios',key:'adm_seminarios',seed:D.seminars.map(s=>({titulo:s.title,fecha:s.date,modalidad:s.mode})),cols:[['titulo','Título'],['fecha','Fecha','date'],['modalidad','Modalidad']]},
  tours:{icon:'🌌',title:'Inscripciones a tours',key:'inscripciones_tours',seed:[],cols:[['nombre','Nombre'],['correo','Correo'],['detalle','Tour'],['fecha','Fecha']]},
  participantes:{icon:'🔬',title:'Participantes en investigaciones',key:'participantes_investigaciones',seed:[],cols:[['nombre','Nombre'],['correo','Correo'],['detalle','Investigación'],['fecha','Fecha']]},
  contenido:{icon:'📝',title:'Contenido general del sitio'}
};
const rows=m=>store.get(MODS[m].key,MODS[m].seed);
/* ===== MENÚ LATERAL ===== */
$('#side').innerHTML=`<img src="assets/logo_menu.png" alt="Logo">`+Object.entries(MODS).map(([k,m])=>`<button data-m="${k}">${m.icon} ${m.title.split(' ')[0]==='Resumen'?'Resumen':m.title}</button>`).join('')+`<button class="out" id="exit">⏻ Salir</button>`;
$('#side').onclick=e=>{const b=e.target.closest('[data-m]');if(b)show(b.dataset.m)};
$('#exit').onclick=()=>{sessionStorage.removeItem('cdo_admin');location.href='index.html'};
/* ===== VISTAS ===== */
function show(m){
  $$('#side [data-m]').forEach(b=>b.classList.toggle('on',b.dataset.m===m));$('#title').textContent=MODS[m].title;
  const v=$('#view');
  if(m==='dashboard'){v.innerHTML=`<div class="kpis">${['usuarios','membresias','productos','seminarios','tours','participantes'].map(k=>`<div class="kpi"><b>${rows(k).length}</b><span>${MODS[k].title}</span></div>`).join('')}</div><div class="panel"><p>Bienvenido a la consola. Selecciona un módulo del menú lateral. Los datos de inscripciones se leen de lo que los visitantes envían en el sitio (guardado en el navegador).</p></div>`;return}
  if(m==='contenido'){const c=store.get('contenido',{titulo:'CAZADORES DE OVNIS INTERNACIONAL',mensaje:'Comunidad dedicada a investigar el fenómeno OVNI.',contacto:'contacto@cazadoresdeovnis.org'});
    v.innerHTML=`<div class="panel" style="max-width:640px"><label>Título principal</label><input id="cT" value="${c.titulo}"><label>Mensaje de misión</label><textarea id="cM" rows="4">${c.mensaje}</textarea><label>Correo de contacto</label><input id="cC" value="${c.contacto}"><div class="form-actions"><button class="btn btn-primary" id="cS">Guardar cambios</button></div></div>`;
    $('#cS').onclick=()=>{store.set('contenido',{titulo:$('#cT').value,mensaje:$('#cM').value,contacto:$('#cC').value});toast('Contenido guardado (simulado)')};return}
  const M=MODS[m],R=rows(m);
  v.innerHTML=`<div style="margin-bottom:16px"><button class="btn btn-primary btn-sm" id="add">+ Nuevo registro</button></div><div class="panel">${R.length?`<table><thead><tr>${M.cols.map(c=>`<th>${c[1]}</th>`).join('')}${M.toggle?'<th>Estado</th>':''}<th></th></tr></thead><tbody>${R.map((r,i)=>`<tr>${M.cols.map(c=>`<td>${r[c[0]]??''}</td>`).join('')}${M.toggle?`<td><button class="st ${r.estado==='Aprobada'?'ok':''}" data-s="${i}">${r.estado||M.toggle[0]}</button></td>`:''}<td><button class="btn btn-ghost btn-sm" data-d="${i}">Eliminar</button></td></tr>`).join('')}</tbody></table>`:'<div class="empty">Sin registros todavía.</div>'}</div>`;
  $('#add').onclick=()=>form(m);
  $$('[data-d]',v).forEach(b=>b.onclick=()=>{const l=rows(m);l.splice(+b.dataset.d,1);store.set(M.key,l);show(m);toast('Registro eliminado')});
  $$('[data-s]',v).forEach(b=>b.onclick=()=>{const l=rows(m),r=l[+b.dataset.s];r.estado=(r.estado||M.toggle[0])===M.toggle[0]?M.toggle[1]:M.toggle[0];store.set(M.key,l);show(m)});
}
function form(m){
  const M=MODS[m];
  const o=openModal(`<h3>Nuevo: ${M.title}</h3>${M.cols.map(c=>`<label>${c[1]}</label>${c[2]==='select'?`<select data-f="${c[0]}">${c[3].map(x=>`<option>${x}</option>`).join('')}</select>`:`<input data-f="${c[0]}" type="${c[2]||'text'}">`}`).join('')}<div class="form-actions"><button class="btn btn-primary btn-block" id="ok">Guardar</button></div>`);
  $('#ok',o).onclick=()=>{const r={};$$('[data-f]',o).forEach(i=>r[i.dataset.f]=i.type==='number'?+i.value:i.value);
    if(!Object.values(r).every(v=>v!==''))return toast('Completa todos los campos');
    const l=rows(m);l.push(r);store.set(M.key,l);o.close();show(m);toast('Registro guardado ✅')};
}
show('dashboard');
