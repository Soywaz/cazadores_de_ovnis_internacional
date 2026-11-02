/* ===== LÓGICA POR PÁGINA (según data-page del body) ===== */
function initPage(){const p=document.body.dataset.page;(PAGES[p]||(()=>{}))()}
function enrollForm(title,type,extra=''){ // formulario genérico de inscripción
  const u=session.get()||{};
  const o=openModal(`<h3>${title}</h3><p>Déjanos tus datos para confirmar tu cupo.</p><label>Nombre completo</label><input id="eN" value="${u.name||''}">
  <label>Correo</label><input id="eE" type="email" value="${u.email||''}">${extra}<div class="err" id="eErr"></div>
  <div class="form-actions"><button class="btn btn-primary btn-block" id="eGo">Confirmar</button></div>`);
  $('#eGo',o).onclick=()=>{const n=$('#eN',o).value.trim(),e=$('#eE',o).value.trim();
    if(!n||!/\S+@\S+\.\S+/.test(e))return $('#eErr',o).textContent='Ingresa nombre y un correo válido.';
    const list=store.get(type,[]);list.push({nombre:n,correo:e,detalle:title,fecha:new Date().toLocaleDateString('es-CO')});store.set(type,list);
    o.close();toast('✅ Solicitud registrada (simulada)')};
}
const PAGES={
  index(){
    /* Estrellas del hero */
    const c=$('#stars'),x=c.getContext('2d');let S=[];
    const size=()=>{c.width=c.offsetWidth;c.height=c.offsetHeight;S=Array.from({length:140},()=>({x:Math.random()*c.width,y:Math.random()*c.height,r:Math.random()*1.5+.3,s:Math.random()*.4+.05}))};
    size();addEventListener('resize',size);
    (function loop(){x.clearRect(0,0,c.width,c.height);S.forEach(s=>{s.y+=s.s;if(s.y>c.height)s.y=0;x.fillStyle=`rgba(180,255,240,${.4+s.r/3})`;x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()});requestAnimationFrame(loop)})();
    $('#quick').innerHTML=CDO_DATA.quick.map((q,idx)=>`<a href="${q[2]}" class="card q-card reveal" style="--d:${idx*.08}s">
      <div class="q-glow"></div>
      <div class="q-top"><span class="q-tag">${q[4]||'MÓDULO'}</span><span class="q-code">${q[5]||'0'+(idx+1)}</span></div>
      <div class="q-icon-wrap"><span class="q-ring"></span><div class="q-ic">${q[0]}</div></div>
      <h3>${q[1]}</h3>
      <p>${q[3]}</p>
      <div class="q-foot"><span>${q[6]||'Explorar'}</span><b class="q-arr">→</b></div>
    </a>`).join('');
    $('#invs').innerHTML=CDO_DATA.investigations.map((i,idx)=>`<div class="card inv-card reveal" style="--d:${idx*.1}s">
      <div class="q-glow"></div>
      <div class="inv-head">
        <span class="inv-badge"><i class="pulse-dot"></i> ${i.status}</span>
        <span class="q-code">${i.code||'EXP-0'+(idx+1)}</span>
      </div>
      <div class="inv-title-row">
        <div class="inv-ic">${i.icon||'🛸'}</div>
        <div>
          <h3>${i.title}</h3>
          <span class="inv-meta">📍 ${i.place||'Zona de estudio'} · 🛡️ ${i.lead||'Equipo CDO'}</span>
        </div>
      </div>
      <p class="inv-desc">${i.desc}</p>
      <div class="inv-prog">
        <div class="inv-prog-top"><span>Avance operativo</span><b>${i.progress}%</b></div>
        <div class="bar inv-bar"><i style="width:${i.progress}%"></i></div>
      </div>
      <div class="q-foot"><a href="tours.html" style="display:flex;justify-content:space-between;width:100%;align-items:center"><span>Participar en el expediente</span><b class="q-arr">→</b></a></div>
    </div>`).join('');
  },
  membresias(){
    const checkSvg='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 10.5l3.5 3.5 7.5-7.5"/></svg>';
    const crossSvg='<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l8 8M14 6l-8 8"/></svg>';
    $('#plans').innerHTML=CDO_DATA.plans.map((p,idx)=>`<article class="plan ${p.featured?'featured':''} reveal" style="--d:${idx*.12}s">
      <div class="plan-glow"></div>
      ${p.featured?'<div class="plan-ribbon">★ RECOMENDADO · ACCESO TOTAL</div>':''}
      <div class="plan-top">
        <span class="badge ${p.key}">${p.featured?'⭐ RANGO VIP':'🛰️ ACCESO ESTÁNDAR'}</span>
        <span class="q-code">${p.code||'CRED-0'+(idx+1)}</span>
      </div>
      <div class="plan-head">
        <div class="plan-ic">${p.icon||'🛸'}</div>
        <div>
          <h3>${p.name}</h3>
          <span class="plan-sub">${p.featured?'Investigador acreditado CDO':'Observador de la comunidad'}</span>
        </div>
      </div>
      <p class="plan-desc">${p.desc||''}</p>
      <div class="plan-price-box">
        <div class="plan-price">
          <span class="price-val">${p.price}</span>
          ${p.period?`<span class="price-per">${p.period}</span>`:''}
        </div>
      </div>
      <div class="plan-sep"><span>BENEFICIOS Y PRIVILEGIOS</span></div>
      <ul class="plan-list">
        ${p.items.map(i=>`<li class="${i[1]?'ok':'no'} ${i[2]?'vip-item':''}">
          <i class="li-ic">${i[1]?checkSvg:crossSvg}</i>
          <span class="li-txt">${i[0]}</span>
          ${i[2]?'<em class="vip-tag">VIP</em>':''}
        </li>`).join('')}
      </ul>
      <div class="plan-foot">
        <button class="btn ${p.featured?'btn-gold':'btn-ghost'} btn-block plan-cta" data-plan="${p.key}">
          <span>${p.cta||(p.featured?'Solicitar membresía':'Crear cuenta gratis')}</span>
          <b class="q-arr">→</b>
        </button>
      </div>
    </article>`).join('');
    $$('[data-plan]').forEach(b=>b.onclick=()=>{const u=session.get();
      if(!u){toast('Primero inicia sesión o regístrate');return setTimeout(()=>location.href='acceso.html',900)}
      if(b.dataset.plan==='comun')return toast('Ya tienes cuenta registrada');
      enrollForm('Solicitud de membresía','solicitudes_membresia');
      store.set('pendiente_miembro',1);});
  },
  tienda(){
    const cats=['Todos',...new Set(CDO_DATA.products.map(p=>p.cat))];
    let curCat='Todos', qStr='';
    const countCat=c=>c==='Todos'?CDO_DATA.products.length:CDO_DATA.products.filter(p=>p.cat===c).length;
    $('#filters').innerHTML=cats.map((c,i)=>`<button class="chip store-chip ${i?'':'on'}" data-c="${c}"><span>${c}</span><small>${countCat(c)}</small></button>`).join('');
    const draw=()=>{
      const list=CDO_DATA.products.filter(p=>(curCat==='Todos'||p.cat===curCat)&&(!qStr||(p.name+' '+p.desc+' '+(p.spec||'')).toLowerCase().includes(qStr)));
      if(!list.length){
        $('#products').innerHTML=`<div class="store-empty"><div class="se-ic">🛸</div><h3>Sin coincidencias en el inventario</h3><p>No encontramos artículos para tu búsqueda actual. Prueba con otra categoría o término.</p></div>`;
        return;
      }
      $('#products').innerHTML=list.map((p,idx)=>`<article class="card prod-card reveal in" style="--d:${idx*.06}s;--ph:${p.hue}">
        <div class="q-glow"></div>
        <div class="prod-stage" style="background:radial-gradient(circle at 50% 38%,hsla(${p.hue},82%,42%,.34),hsla(${(p.hue+50)%360},70%,14%,.88) 72%,rgba(7,11,26,.98) 100%)">
          <div class="prod-top">
            <span class="q-tag">${p.cat.toUpperCase()}</span>
            <span class="q-code">${p.code||'EQP-0'+p.id}</span>
          </div>
          <div class="prod-visual">
            <span class="prod-ring"></span>
            <span class="prod-ring r2"></span>
            <div class="prod-emoji">${p.emoji}</div>
          </div>
          ${p.badge?`<span class="prod-badge">${p.badge}</span>`:''}
        </div>
        <div class="prod-body">
          <h3>${p.name}</h3>
          <span class="prod-spec">${p.spec||'Equipamiento oficial CDO'}</span>
          <p>${p.desc}</p>
          <div class="prod-foot">
            <div class="prod-price-col">
              <small>VALOR OFICIAL</small>
              <div class="price">${money(p.price)}</div>
            </div>
            <button class="btn btn-primary btn-sm prod-btn" data-add="${p.id}">
              <span>Agregar</span>
              <b>+</b>
            </button>
          </div>
        </div>
      </article>`).join('');
    };
    draw();
    updateCartCount();
    $('#filters').onclick=e=>{const b=e.target.closest('.chip');if(!b)return;$$('#filters .chip').forEach(x=>x.classList.remove('on'));b.classList.add('on');curCat=b.dataset.c;draw()};
    const sIn=$('#storeSearch');if(sIn)sIn.oninput=e=>{qStr=e.target.value.trim().toLowerCase();draw()};
    const scBtn=$('#storeCartBtn');if(scBtn)scBtn.onclick=openCart;
    $('#products').onclick=e=>{const b=e.target.closest('[data-add]');if(b)addToCart(+b.dataset.add)};
  },
  seminarios(){
    const cats=['Todos','Virtual','Presencial','Híbrido'];
    let curCat='Todos', qStr='';
    const getAgenda=()=>store.get('agenda_seminarios',[]);
    const setAgenda=list=>{store.set('agenda_seminarios',list);updateAgendaBadge()};
    const isSaved=id=>getAgenda().some(x=>x.id===id);
    const fmtDate=d=>new Date(d+'T12:00').toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'});
    const fmtLongDate=d=>new Date(d+'T12:00').toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'});
    const shortParts=d=>{
      const dt=new Date(d+'T12:00');
      return {
        day:String(dt.getDate()).padStart(2,'0'),
        mon:dt.toLocaleDateString('es-CO',{month:'short'}).replace('.','').toUpperCase(),
        yr:dt.getFullYear()
      };
    };
    const updateAgendaBadge=()=>{
      const b=$('#semCalBadge');
      if(b)b.textContent=getAgenda().length;
    };
    const countCat=c=>c==='Todos'?CDO_DATA.seminars.length:CDO_DATA.seminars.filter(s=>(s.cat||s.mode.split(' ')[0])===c).length;
    const renderFilters=()=>{
      const f=$('#semFilters');
      if(!f)return;
      f.innerHTML=cats.map((c,i)=>`<button class="chip store-chip ${c===curCat?'on':''}" data-c="${c}"><span>${c}</span><small>${countCat(c)}</small></button>`).join('');
    };
    const draw=()=>{
      const list=CDO_DATA.seminars.filter(s=>{
        const sCat=s.cat||s.mode.split(' ')[0];
        const matchCat=curCat==='Todos'||sCat===curCat;
        const text=(s.title+' '+s.desc+' '+(s.speaker||'')+' '+s.mode+' '+(s.tag||'')+' '+(s.topics||[]).join(' ')).toLowerCase();
        return matchCat&&(!qStr||text.includes(qStr));
      });
      if(!list.length){
        $('#seminars').innerHTML=`<div class="store-empty"><div class="se-ic">🎓</div><h3>Sin seminarios para este filtro</h3><p>No encontramos sesiones académicas que coincidan con tu búsqueda. Prueba con otra modalidad o palabra clave.</p></div>`;
        return;
      }
      $('#seminars').innerHTML=list.map((s,idx)=>{
        const dp=shortParts(s.date);
        const saved=isSaved(s.id);
        const sCat=s.cat||s.mode.split(' ')[0];
        const modeClass=sCat==='Virtual'?'virtual':sCat==='Presencial'?'presencial':'hibrido';
        return `<article class="card sem-card reveal in" style="--d:${idx*.07}s;--sh:${s.hue}">
          <div class="q-glow"></div>
          <div class="sem-stage" style="background:radial-gradient(circle at 50% 35%,hsla(${s.hue},82%,42%,.34),hsla(${(s.hue+45)%360},72%,13%,.9) 72%,rgba(6,10,24,.98) 100%)">
            <div class="prod-top">
              <span class="q-tag">${s.tag||'ACADEMIA'}</span>
              <span class="q-code">${s.code||'SEM-0'+s.id}</span>
            </div>
            <div class="prod-visual">
              <span class="prod-ring"></span>
              <span class="prod-ring r2"></span>
              <div class="prod-emoji">${s.emoji}</div>
            </div>
            <div class="sem-stage-bot">
              <span class="prod-badge">${s.badge||'SESIÓN OFICIAL'}</span>
              <div class="sem-date-pill" title="${fmtLongDate(s.date)}">
                <b>${dp.day}</b>
                <span>${dp.mon} ${dp.yr}</span>
              </div>
            </div>
          </div>
          <div class="sem-body">
            <div class="sem-pills">
              <span class="sem-mode-tag ${modeClass}"><i class="sm-dot"></i> ${s.mode}</span>
              <span class="sem-info-pill">⏱ ${s.duration||'2.5 Horas'}</span>
              <span class="sem-info-pill spots">🎟️ ${s.spots||15} cupos</span>
            </div>
            <h3>${s.title}</h3>
            <span class="sem-speaker">🎙️ ${s.speaker||'Comité Científico CDO'}</span>
            <p>${s.desc}</p>
            ${s.topics?`<ul class="sem-topics">${s.topics.map(t=>`<li><i>›</i><span>${t}</span></li>`).join('')}</ul>`:''}
            <button type="button" class="sem-sched tour-sched-btn ${saved?'saved':''}" data-cal="${s.id}" title="${saved?'Seminario agendado · Clic para gestionar':'Clic para agregar este seminario a tu calendario'}">
              <div class="sem-sched-item">
                <small>FECHA PROGRAMADA</small>
                <strong>📅 ${fmtDate(s.date)}</strong>
              </div>
              <div class="sem-sched-item">
                <small>HORARIO OFICIAL</small>
                <strong>🕒 ${s.time||'19:00 COT'}</strong>
              </div>
            </button>
            <div class="sem-foot">
              <button class="btn btn-primary btn-sm sem-enroll-btn" type="button" data-s="${s.id}">
                <span>Inscribirme</span>
                <b class="q-arr">→</b>
              </button>
            </div>
          </div>
        </article>`;
      }).join('');
    };

    const saveToAgenda=(s,provider='Agenda CDO',reminder='30 min antes')=>{
      const list=getAgenda();
      const idx=list.findIndex(x=>x.id===s.id);
      const item={id:s.id,code:s.code,title:s.title,date:s.date,time:s.time||'19:00 COT',mode:s.mode,emoji:s.emoji,provider,reminder,savedAt:new Date().toLocaleDateString('es-CO')};
      if(idx>=0)list[idx]=item;else list.push(item);
      setAgenda(list);
      draw();
    };

    const downloadIcs=s=>{
      const dClean=s.date.replace(/-/g,'');
      const ics=[
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Cazadores de Ovnis Internacional//Academia CDO//ES',
        'BEGIN:VEVENT',
        `UID:cdo-sem-${s.id}@cazadoresdeovnis.org`,
        `DTSTAMP:${dClean}T120000Z`,
        `DTSTART:${dClean}T190000`,
        `DTEND:${dClean}T213000`,
        `SUMMARY:[CDO] ${s.title}`,
        `DESCRIPTION:${s.desc} - Ponente: ${s.speaker||'Equipo CDO'} (${s.mode})`,
        `LOCATION:${s.mode}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=`${(s.code||'seminario-cdo').toLowerCase()}.ics`;
      a.click();
      URL.revokeObjectURL(a.href);
    };

    const openCalendarSim=s=>{
      const saved=getAgenda().find(x=>x.id===s.id);
      const o=openModal(`
        <div class="cal-modal-head">
          <span class="q-tag">${s.code||'SEM-0'+s.id} · SINCRONIZACIÓN DE CALENDARIO</span>
          <h3>📅 Agendar Seminario</h3>
          <p>Programa este evento en tu calendario personal y configura una alerta automática antes de iniciar la transmisión.</p>
        </div>
        <div class="cal-preview">
          <div class="cal-prev-ic">${s.emoji}</div>
          <div class="cal-prev-info">
            <strong>${s.title}</strong>
            <span>🎙️ ${s.speaker||'Comité Científico CDO'}</span>
            <div class="cal-prev-meta">
              <span>📅 ${fmtLongDate(s.date)}</span>
              <span>🕒 ${s.time||'19:00 COT'}</span>
              <span>📍 ${s.mode}</span>
            </div>
          </div>
        </div>
        <label>🔔 Alerta de recordatorio previo</label>
        <div class="cal-reminders" id="calRem">
          ${['15 min antes','30 min antes','1 hora antes','1 día antes'].map(r=>`<button type="button" class="chip cal-rem-chip ${(saved?.reminder||'30 min antes')===r?'on':''}" data-rem="${r}">${r}</button>`).join('')}
        </div>
        <label>📲 Selecciona tu plataforma de calendario (simulado)</label>
        <div class="cal-providers">
          <button type="button" class="cal-prov-btn" data-prov="Google Calendar">
            <i class="cp-ic" style="background:rgba(66,133,244,.16);color:#6ea8fe;border-color:rgba(66,133,244,.38)">G</i>
            <div><strong>Google Calendar</strong><small>Sincronización directa en la nube (simulada)</small></div>
            <b>+ Agendar</b>
          </button>
          <button type="button" class="cal-prov-btn" data-prov="Outlook / Microsoft 365">
            <i class="cp-ic" style="background:rgba(0,180,216,.16);color:#48cae4;border-color:rgba(0,180,216,.38)">O</i>
            <div><strong>Outlook Calendar</strong><small>Integración con cuenta corporativa o personal</small></div>
            <b>+ Agendar</b>
          </button>
          <button type="button" class="cal-prov-btn" data-prov="Archivo .ICS (Apple / Universal)" data-ics="1">
            <i class="cp-ic" style="background:rgba(53,242,208,.15);color:var(--cyan);border-color:rgba(53,242,208,.38)">📥</i>
            <div><strong>Descargar invitación .ICS</strong><small>Compatible con Apple Calendar, Thunderbird y móviles</small></div>
            <b>Descargar</b>
          </button>
        </div>
        ${saved?`<div class="form-actions" style="margin-top:16px"><button type="button" class="btn btn-sm btn-block cal-remove-btn" id="calRemove">🗑️ Quitar este seminario de mi calendario</button></div>`:''}
      `);
      let curRem=saved?.reminder||'30 min antes';
      $$('#calRem .chip',o).forEach(b=>b.onclick=()=>{
        $$('#calRem .chip',o).forEach(x=>x.classList.remove('on'));
        b.classList.add('on');
        curRem=b.dataset.rem;
      });
      $$('.cal-prov-btn',o).forEach(b=>b.onclick=()=>{
        const prov=b.dataset.prov;
        if(b.dataset.ics)downloadIcs(s);
        saveToAgenda(s,prov,curRem);
        o.close();
        toast(`📅 Agregado a ${prov} · Alerta: ${curRem}`);
      });
      const rm=$('#calRemove',o);
      if(rm)rm.onclick=()=>{
        setAgenda(getAgenda().filter(x=>x.id!==s.id));
        draw();
        o.close();
        toast('Evento retirado de tu calendario');
      };
    };

    const openAgendaModal=()=>{
      const renderAgenda=()=>{
        const list=getAgenda();
        return `
          <div class="cal-modal-head">
            <span class="q-tag">AGENDA PERSONAL · ACADEMIA CDO</span>
            <h3>📅 Mis Seminarios Agendados</h3>
            <p>Eventos guardados en tu calendario con recordatorio activo.</p>
          </div>
          ${list.length?`<div class="agenda-list">${list.map(item=>`
            <div class="agenda-row">
              <div class="ag-ic">${item.emoji||'🎓'}</div>
              <div class="ag-info">
                <strong>${item.title}</strong>
                <span>📅 ${fmtLongDate(item.date)} · 🕒 ${item.time}</span>
                <small>📲 ${item.provider||'Agenda CDO'} · 🔔 ${item.reminder||'30 min antes'}</small>
              </div>
              <div class="ag-acts">
                <button class="btn btn-primary btn-sm" data-ag-enr="${item.id}">Inscribirme</button>
                <button class="btn btn-ghost btn-sm" data-ag-del="${item.id}" title="Eliminar de mi agenda">✕</button>
              </div>
            </div>
          `).join('')}</div>`:`<div class="agenda-empty"><div style="font-size:2.4rem;margin-bottom:8px">📅</div><strong>Tu agenda está vacía</strong><p>Haz clic en el recuadro de fecha programada en cualquier seminario para programar tus recordatorios.</p></div>`}
        `;
      };
      const o=openModal(renderAgenda());
      const bind=()=>{
        $$('[data-ag-del]',o).forEach(b=>b.onclick=()=>{
          setAgenda(getAgenda().filter(x=>x.id!==+b.dataset.agDel));
          draw();
          o.querySelector('.modal').innerHTML='<button class="x">×</button>'+renderAgenda();
          bind();
          toast('Evento eliminado de tu agenda');
        });
        $$('[data-ag-enr]',o).forEach(b=>b.onclick=()=>{
          const sem=CDO_DATA.seminars.find(x=>x.id===+b.dataset.agEnr);
          o.close();
          if(sem)openSeminarEnroll(sem);
        });
      };
      bind();
    };

    const openSeminarEnroll=s=>{
      const u=session.get()||{};
      const alreadySaved=isSaved(s.id);
      const o=openModal(`
        <div class="cal-modal-head">
          <span class="q-tag">${s.code||'SEM-0'+s.id} · REGISTRO ACADÉMICO</span>
          <h3>🎓 Inscripción a Seminario</h3>
          <p>Completa tus credenciales para reservar tu cupo oficial en la sesión.</p>
        </div>
        <div class="cal-preview" style="margin-bottom:14px">
          <div class="cal-prev-ic">${s.emoji}</div>
          <div class="cal-prev-info">
            <strong>${s.title}</strong>
            <span>🎙️ ${s.speaker||'Comité Científico CDO'}</span>
            <div class="cal-prev-meta">
              <span>📅 ${fmtLongDate(s.date)}</span>
              <span>🕒 ${s.time||'19:00 COT'}</span>
              <span>📍 ${s.mode}</span>
            </div>
          </div>
        </div>
        <label>Nombre completo</label>
        <input id="eN" value="${u.name||''}" placeholder="Tu nombre y apellido">
        <label>Correo electrónico</label>
        <input id="eE" type="email" value="${u.email||''}" placeholder="correo@ejemplo.com">
        <label class="cal-auto-check">
          <input type="checkbox" id="eCal" ${alreadySaved?'checked':''} checked>
          <span>📅 Sincronizar automáticamente con mi calendario (recordatorio 30 min antes)</span>
        </label>
        <div class="err" id="eErr"></div>
        <div class="form-actions">
          <button class="btn btn-primary btn-block" id="eGo">Confirmar inscripción oficial</button>
        </div>
      `);
      $('#eGo',o).onclick=()=>{
        const n=$('#eN',o).value.trim(),e=$('#eE',o).value.trim();
        if(!n||!/\S+@\S+\.\S+/.test(e))return $('#eErr',o).textContent='Ingresa tu nombre completo y un correo válido.';
        const list=store.get('inscripciones_seminarios',[]);
        list.push({nombre:n,correo:e,detalle:'Inscripción: '+s.title,fecha:new Date().toLocaleDateString('es-CO')});
        store.set('inscripciones_seminarios',list);
        const addCal=$('#eCal',o)?.checked;
        if(addCal&&!isSaved(s.id))saveToAgenda(s,'Inscripción CDO','30 min antes');
        o.close();
        toast(addCal?'✅ Cupo confirmado y agendado en tu calendario':'✅ Inscripción registrada (simulada)');
      };
    };

    renderFilters();
    draw();
    updateAgendaBadge();
    $('#semFilters').onclick=e=>{
      const b=e.target.closest('.chip');
      if(!b)return;
      curCat=b.dataset.c;
      renderFilters();
      draw();
    };
    const sIn=$('#semSearch');
    if(sIn)sIn.oninput=e=>{qStr=e.target.value.trim().toLowerCase();draw()};
    const agBtn=$('#semAgendaBtn');
    if(agBtn)agBtn.onclick=openAgendaModal;
    $('#seminars').onclick=e=>{
      const calBtn=e.target.closest('[data-cal]');
      if(calBtn){
        const sem=CDO_DATA.seminars.find(s=>s.id==calBtn.dataset.cal);
        if(sem)openCalendarSim(sem);
        return;
      }
      const enrBtn=e.target.closest('[data-s]');
      if(enrBtn){
        const sem=CDO_DATA.seminars.find(s=>s.id==enrBtn.dataset.s);
        if(sem)openSeminarEnroll(sem);
      }
    };
  },
  redes(){
    $('#socials').innerHTML=CDO_DATA.socials.map((s,idx)=>`<a href="${s.url}" target="_blank" rel="noopener" class="card soc-card reveal" style="--d:${idx*.08}s;--sc:${s.color}">
      <div class="soc-glow"></div>
      <div class="q-top">
        <span class="q-tag">${s.tag||'CANAL OFICIAL'}</span>
        <span class="q-code">${s.code||'CH-0'+(idx+1)}</span>
      </div>
      <div class="soc-head-row">
        <div class="soc-logo-wrap">
          <span class="soc-ring"></span>
          <div class="soc-logo">${SOCIAL_SVG[s.name]||s.ch}</div>
        </div>
        <div class="soc-title-col">
          <div class="soc-name-line">
            <h3>${s.name}</h3>
            <span class="soc-verified" title="Canal Oficial Verificado">✓</span>
          </div>
          <span class="soc-handle">${s.handle||'@CazadoresDeOvnis'}</span>
          ${s.stats?`<span class="soc-stats"><i class="pulse-dot"></i> ${s.stats}</span>`:''}
        </div>
      </div>
      <p class="soc-desc">${s.desc}</p>
      <div class="q-foot soc-foot">
        <span>${s.cta||'Visitar perfil oficial'}</span>
        <b class="q-arr">↗</b>
      </div>
    </a>`).join('');
  },
  tours(){
    const fmtDate=d=>new Date(d+'T12:00').toLocaleDateString('es-CO',{day:'numeric',month:'short',year:'numeric'});
    const fmtLongDate=d=>new Date(d+'T12:00').toLocaleDateString('es-CO',{day:'numeric',month:'long',year:'numeric'});
    const getTourAgenda=()=>store.get('agenda_tours',[]);
    const setTourAgenda=list=>store.set('agenda_tours',list);
    const isTourSaved=id=>getTourAgenda().some(x=>x.id===id);

    const drawTours=()=>{
      $('#tours').innerHTML=CDO_DATA.tours.map((t,idx)=>{
        const saved=isTourSaved(t.id);
        return `<article class="card tour-card reveal in" style="--d:${idx*.1}s;--th:${t.hue}">
          <div class="q-glow"></div>
          <div class="tour-stage" style="background:radial-gradient(circle at 50% 42%,hsla(${t.hue},85%,42%,.36),hsla(${(t.hue+40)%360},72%,13%,.9) 72%,rgba(6,10,24,.98) 100%)">
            <div class="prod-top">
              <span class="q-tag">${t.tag||'EXPEDICIÓN'}</span>
              <span class="q-code">${t.code||'EXP-T0'+t.id}</span>
            </div>
            <div class="prod-visual">
              <span class="prod-ring"></span>
              <span class="prod-ring r2"></span>
              <div class="prod-emoji">${t.emoji}</div>
            </div>
          </div>
          <div class="tour-body">
            <div class="sem-pills">
              <span class="sem-mode-tag tour-loc-tag">📍 ${t.place}</span>
              <span class="sem-info-pill">⏱ ${t.days}</span>
              <span class="sem-info-pill spots">🎒 ${t.spots||12} cupos</span>
            </div>
            <h3>${t.title}</h3>
            <span class="sem-speaker">🧭 ${t.lead||'División de Campo CDO'}</span>
            <p>${t.desc}</p>
            <div class="tour-acts-box">
              <span class="tour-acts-lbl">OPERACIONES E ITINERARIO</span>
              <ul class="sem-topics tour-topics">
                ${t.acts.map(a=>`<li><i>✦</i><span>${a}</span></li>`).join('')}
              </ul>
            </div>
            <button type="button" class="sem-sched tour-sched-btn ${saved?'saved':''}" data-tcal="${t.id}" title="${saved?'Expedición agendada · Clic para gestionar':'Clic para agregar esta expedición a tu calendario'}">
              <div class="sem-sched-item">
                <small>FECHA DE DESPLIEGUE</small>
                <strong>📅 ${fmtDate(t.date)}</strong>
              </div>
              <div class="sem-sched-item">
                <small>COORDENADAS</small>
                <strong>🛰️ ${t.coords||t.place}</strong>
              </div>
            </button>
            <div class="prod-foot tour-foot">
              <div class="prod-price-col">
                <small>INVERSIÓN OFICIAL</small>
                <div class="price">${money(t.price)} <span class="tour-cop">COP</span></div>
              </div>
              <button class="btn btn-primary btn-sm tour-btn" type="button" data-t="${t.id}">
                <span>Inscribirme al tour</span>
                <b class="q-arr">→</b>
              </button>
            </div>
          </div>
        </article>`;
      }).join('');
    };

    const saveTourAgenda=(t,provider='Agenda CDO',reminder='3 días antes')=>{
      const list=getTourAgenda();
      const idx=list.findIndex(x=>x.id===t.id);
      const item={id:t.id,code:t.code,title:t.title,date:t.date,days:t.days,place:t.place,provider,reminder,savedAt:new Date().toLocaleDateString('es-CO')};
      if(idx>=0)list[idx]=item;else list.push(item);
      setTourAgenda(list);
      drawTours();
    };

    const downloadTourIcs=t=>{
      const dClean=t.date.replace(/-/g,'');
      const ics=[
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Cazadores de Ovnis Internacional//Expediciones CDO//ES',
        'BEGIN:VEVENT',
        `UID:cdo-tour-${t.id}@cazadoresdeovnis.org`,
        `DTSTAMP:${dClean}T120000Z`,
        `DTSTART;VALUE=DATE:${dClean}`,
        `SUMMARY:[Expedición CDO] ${t.title}`,
        `DESCRIPTION:${t.desc} - Duración: ${t.days} - Coordenadas: ${t.coords||t.place}`,
        `LOCATION:${t.place} (${t.coords||''})`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');
      const blob=new Blob([ics],{type:'text/calendar;charset=utf-8'});
      const a=document.createElement('a');
      a.href=URL.createObjectURL(blob);
      a.download=`${(t.code||'expedicion-cdo').toLowerCase()}.ics`;
      a.click();
      URL.revokeObjectURL(a.href);
    };

    const openTourCalendarSim=t=>{
      const saved=getTourAgenda().find(x=>x.id===t.id);
      const o=openModal(`
        <div class="cal-modal-head">
          <span class="q-tag">${t.code||'EXP-T0'+t.id} · CRONOGRAMA DE EXPEDICIÓN</span>
          <h3>📅 Agendar Fecha de Despliegue</h3>
          <p>Sincroniza las fechas de esta expedición en tu calendario personal y activa alertas de preparación de equipo.</p>
        </div>
        <div class="cal-preview">
          <div class="cal-prev-ic">${t.emoji}</div>
          <div class="cal-prev-info">
            <strong>${t.title}</strong>
            <span>🧭 ${t.lead||'División de Campo CDO'}</span>
            <div class="cal-prev-meta">
              <span>📅 ${fmtLongDate(t.date)}</span>
              <span>⏱ ${t.days}</span>
              <span>📍 ${t.place} (${t.coords||''})</span>
            </div>
          </div>
        </div>
        <label>🔔 Alerta previa de alistamiento</label>
        <div class="cal-reminders" id="tCalRem">
          ${['1 día antes','3 días antes','1 semana antes','2 semanas antes'].map(r=>`<button type="button" class="chip cal-rem-chip ${(saved?.reminder||'3 días antes')===r?'on':''}" data-rem="${r}">${r}</button>`).join('')}
        </div>
        <label>📲 Selecciona tu plataforma de calendario (simulado)</label>
        <div class="cal-providers">
          <button type="button" class="cal-prov-btn" data-prov="Google Calendar">
            <i class="cp-ic" style="background:rgba(66,133,244,.16);color:#6ea8fe;border-color:rgba(66,133,244,.38)">G</i>
            <div><strong>Google Calendar</strong><small>Sincroniza fechas de salida y coordenadas GPS</small></div>
            <b>+ Agendar</b>
          </button>
          <button type="button" class="cal-prov-btn" data-prov="Outlook / Microsoft 365">
            <i class="cp-ic" style="background:rgba(0,180,216,.16);color:#48cae4;border-color:rgba(0,180,216,.38)">O</i>
            <div><strong>Outlook Calendar</strong><small>Reserva los días de expedición en tu agenda</small></div>
            <b>+ Agendar</b>
          </button>
          <button type="button" class="cal-prov-btn" data-prov="Archivo .ICS (Apple / Universal)" data-ics="1">
            <i class="cp-ic" style="background:rgba(53,242,208,.15);color:var(--cyan);border-color:rgba(53,242,208,.38)">📥</i>
            <div><strong>Descargar invitación .ICS</strong><small>Compatible con Apple Calendar, iOS, Android y escritorio</small></div>
            <b>Descargar</b>
          </button>
        </div>
        ${saved?`<div class="form-actions" style="margin-top:16px"><button type="button" class="btn btn-sm btn-block cal-remove-btn" id="tCalRemove">🗑️ Quitar esta expedición de mi calendario</button></div>`:''}
      `);
      let curRem=saved?.reminder||'3 días antes';
      $$('#tCalRem .chip',o).forEach(b=>b.onclick=()=>{
        $$('#tCalRem .chip',o).forEach(x=>x.classList.remove('on'));
        b.classList.add('on');
        curRem=b.dataset.rem;
      });
      $$('.cal-prov-btn',o).forEach(b=>b.onclick=()=>{
        const prov=b.dataset.prov;
        if(b.dataset.ics)downloadTourIcs(t);
        saveTourAgenda(t,prov,curRem);
        o.close();
        toast(`📅 Expedición agendada en ${prov} · Alerta: ${curRem}`);
      });
      const rm=$('#tCalRemove',o);
      if(rm)rm.onclick=()=>{
        setTourAgenda(getTourAgenda().filter(x=>x.id!==t.id));
        drawTours();
        o.close();
        toast('Expedición retirada de tu calendario');
      };
    };

    const openTourEnroll=t=>{
      const u=session.get()||{};
      const isVip=u.cat==='miembro';
      const finalPrice=isVip?Math.round(t.price*.85):t.price;
      const o=openModal(`
        <div class="cal-modal-head">
          <span class="q-tag">${t.code||'EXP-T0'+t.id} · RESERVA DE EXPEDICIÓN</span>
          <h3>🌌 Inscripción a Tour de Campo</h3>
          <p>Registra tus datos para reservar tu cupo y recibir el protocolo de equipamiento y punto de encuentro.</p>
        </div>
        <div class="cal-preview" style="margin-bottom:14px">
          <div class="cal-prev-ic">${t.emoji}</div>
          <div class="cal-prev-info">
            <strong>${t.title}</strong>
            <span>📍 ${t.place} · ⏱ ${t.days}</span>
            <div class="cal-prev-meta">
              <span>📅 ${fmtLongDate(t.date)}</span>
              <span>💰 ${money(finalPrice)} COP ${isVip?'(15% Dto. VIP aplicado)':''}</span>
            </div>
          </div>
        </div>
        <label>Nombre completo del explorador</label>
        <input id="eN" value="${u.name||''}" placeholder="Tu nombre y apellido">
        <label>Correo electrónico de contacto</label>
        <input id="eE" type="email" value="${u.email||''}" placeholder="correo@ejemplo.com">
        <label>Teléfono / WhatsApp de emergencia (opcional)</label>
        <input id="eP" type="tel" placeholder="+57 300 000 0000">
        <label class="cal-auto-check">
          <input type="checkbox" id="eTourCal" checked>
          <span>📅 Sincronizar automáticamente la fecha de despliegue con mi calendario</span>
        </label>
        <div class="err" id="eErr"></div>
        <div class="form-actions">
          <button class="btn btn-primary btn-block" id="eGo">Confirmar reserva de cupo</button>
        </div>
      `);
      $('#eGo',o).onclick=()=>{
        const n=$('#eN',o).value.trim(),e=$('#eE',o).value.trim();
        if(!n||!/\S+@\S+\.\S+/.test(e))return $('#eErr',o).textContent='Ingresa tu nombre completo y un correo válido.';
        const list=store.get('inscripciones_tours',[]);
        list.push({nombre:n,correo:e,detalle:'Tour: '+t.title,fecha:new Date().toLocaleDateString('es-CO')});
        store.set('inscripciones_tours',list);
        if($('#eTourCal',o)?.checked&&!isTourSaved(t.id))saveTourAgenda(t,'Reserva CDO','3 días antes');
        o.close();
        toast('🌌 Reserva registrada y agendada para '+t.title);
      };
    };

    drawTours();
    $('#tours').onclick=e=>{
      const calBtn=e.target.closest('[data-tcal]');
      if(calBtn){
        const tour=CDO_DATA.tours.find(t=>t.id==calBtn.dataset.tcal);
        if(tour)openTourCalendarSim(tour);
        return;
      }
      const b=e.target.closest('[data-t]');
      if(!b)return;
      const tour=CDO_DATA.tours.find(t=>t.id==b.dataset.t);
      if(tour)openTourEnroll(tour);
    };
  },
  acceso(){
    const root=$('#authRoot');
    let curMode='login';
    let recoverStep=1;
    let recoverEmail='';

    const draw=()=>{
      const u=session.get();
      u?profile(u):forms(curMode);
    };

    function forms(mode='login'){
      curMode=mode;

      root.innerHTML=`
        <div class="auth-wrap reveal in">
          <article class="card auth-card">
            <div class="q-glow"></div>
            <div class="auth-card-logo">
              <a href="index.html" title="Volver al inicio">
                <img src="assets/logo_menu.png" alt="Cazadores de Ovnis Internacional">
              </a>
            </div>

            ${mode==='login'?`
              <form class="auth-form" id="fLogin" novalidate>
                <div class="auth-field">
                  <label for="lE">Correo electrónico</label>
                  <div class="auth-input-wrap">
                    <i class="ai-ic">📧</i>
                    <input id="lE" type="email" placeholder="investigador@correo.com" autocomplete="email">
                  </div>
                </div>
                <div class="auth-field">
                  <label for="lP">Contraseña</label>
                  <div class="auth-input-wrap">
                    <i class="ai-ic">🔑</i>
                    <input id="lP" type="password" placeholder="••••••••" autocomplete="current-password">
                    <button type="button" class="ai-eye" data-eye="lP" title="Mostrar u ocultar contraseña">👁️</button>
                  </div>
                </div>
                <div class="auth-links-below">
                  <p>¿No tienes una cuenta aún? <button type="button" class="auth-link-inline" data-go="register">Regístrate aquí</button></p>
                  <p>¿Problemas para entrar? <button type="button" class="auth-link-inline" data-go="recover">Recuperar contraseña</button></p>
                </div>
                <div class="err" id="lErr"></div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary btn-block auth-submit">
                    <span>Iniciar sesión</span>
                    <b class="q-arr">→</b>
                  </button>
                </div>
              </form>
            `:''}

            ${mode==='register'?`
              <form class="auth-form" id="fRegister" novalidate>
                <div class="auth-field">
                  <label for="rN">Nombre completo o alias de campo</label>
                  <div class="auth-input-wrap">
                    <i class="ai-ic">👤</i>
                    <input id="rN" type="text" placeholder="Ej. Valentina Ríos" autocomplete="name">
                  </div>
                </div>
                <div class="auth-field">
                  <label for="rE">Correo electrónico</label>
                  <div class="auth-input-wrap">
                    <i class="ai-ic">📧</i>
                    <input id="rE" type="email" placeholder="investigador@correo.com" autocomplete="email">
                  </div>
                </div>
                <div class="auth-field-grid">
                  <div class="auth-field">
                    <label for="rP">Contraseña (mín. 6)</label>
                    <div class="auth-input-wrap">
                      <i class="ai-ic">🔑</i>
                      <input id="rP" type="password" placeholder="••••••••" autocomplete="new-password">
                      <button type="button" class="ai-eye" data-eye="rP" title="Mostrar u ocultar contraseña">👁️</button>
                    </div>
                  </div>
                  <div class="auth-field">
                    <label for="rP2">Confirmar contraseña</label>
                    <div class="auth-input-wrap">
                      <i class="ai-ic">🛡️</i>
                      <input id="rP2" type="password" placeholder="••••••••" autocomplete="new-password">
                    </div>
                  </div>
                </div>
                <div class="auth-links-below">
                  <p>¿Ya tienes una cuenta registrada? <button type="button" class="auth-link-inline" data-go="login">Inicia sesión</button></p>
                  <p>¿Olvidaste tu clave de acceso? <button type="button" class="auth-link-inline" data-go="recover">Recuperar contraseña</button></p>
                </div>
                <div class="err" id="rErr"></div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary btn-block auth-submit">
                    <span>Regístrate aquí</span>
                    <b class="q-arr">→</b>
                  </button>
                </div>
              </form>
            `:''}

            ${mode==='recover'?`
              <form class="auth-form" id="fRecover" novalidate>
                ${recoverStep===1?`
                  <div class="auth-recover-info">
                    <i class="ari-ic">📡</i>
                    <p>Enviaremos un código temporal de seguridad a tu correo para que puedas definir una nueva contraseña.</p>
                  </div>
                  <div class="auth-field">
                    <label for="recE">Correo electrónico asociado a tu cuenta</label>
                    <div class="auth-input-wrap">
                      <i class="ai-ic">📧</i>
                      <input id="recE" type="email" value="${recoverEmail}" placeholder="investigador@correo.com" autocomplete="email">
                    </div>
                  </div>
                  <div class="auth-links-below">
                    <p>¿Recordaste tu contraseña? <button type="button" class="auth-link-inline" data-go="login">Inicia sesión</button></p>
                    <p>¿Aún no tienes una cuenta? <button type="button" class="auth-link-inline" data-go="register">Regístrate aquí</button></p>
                  </div>
                  <div class="err" id="recErr"></div>
                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-block auth-submit">
                      <span>Enviar código de recuperación</span>
                      <b class="q-arr">→</b>
                    </button>
                  </div>
                `:`
                  <div class="auth-recover-info ok">
                    <i class="ari-ic">✅</i>
                    <p>Hemos enviado un enlace y código simulado a <b>${recoverEmail}</b>. Ingresa tu nueva contraseña a continuación (código demo: <b>CDO-777</b>).</p>
                  </div>
                  <div class="auth-field">
                    <label for="recCode">Código de verificación recibido</label>
                    <div class="auth-input-wrap">
                      <i class="ai-ic">🛡️</i>
                      <input id="recCode" type="text" value="CDO-777" placeholder="Ej. CDO-777">
                    </div>
                  </div>
                  <div class="auth-field">
                    <label for="recNewP">Nueva contraseña (mín. 6 caracteres)</label>
                    <div class="auth-input-wrap">
                      <i class="ai-ic">🔑</i>
                      <input id="recNewP" type="password" placeholder="Nueva contraseña segura">
                      <button type="button" class="ai-eye" data-eye="recNewP" title="Mostrar u ocultar contraseña">👁️</button>
                    </div>
                  </div>
                  <div class="auth-links-below">
                    <p>¿Recordaste tu contraseña? <button type="button" class="auth-link-inline" data-go="login">Inicia sesión</button></p>
                    <p>¿Aún no tienes una cuenta? <button type="button" class="auth-link-inline" data-go="register">Regístrate aquí</button></p>
                  </div>
                  <div class="err" id="recErr"></div>
                  <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-block auth-submit">
                      <span>Actualizar contraseña e iniciar sesión</span>
                      <b class="q-arr">→</b>
                    </button>
                  </div>
                `}
              </form>
            `:''}
          </article>
        </div>
      `;

      $$('[data-go]',root).forEach(b=>b.onclick=()=>{
        const target=b.dataset.go;
        if(target!=='recover')recoverStep=1;
        forms(target);
      });

      $$('[data-eye]',root).forEach(b=>b.onclick=()=>{
        const inp=$('#'+b.dataset.eye,root);
        if(!inp)return;
        inp.type=inp.type==='password'?'text':'password';
        b.textContent=inp.type==='password'?'👁️':'🙈';
      });

      const fL=$('#fLogin',root);
      if(fL)fL.onsubmit=ev=>{
        ev.preventDefault();
        const e=$('#lE',root).value.trim(),p=$('#lP',root).value;
        if(!/\S+@\S+\.\S+/.test(e)||!p)return $('#lErr',root).textContent='Ingresa un correo válido y tu contraseña.';
        const users=store.get('usuarios_registrados',[]);
        const found=users.find(u=>u.email.toLowerCase()===e.toLowerCase());
        if(found&&found.pass&&found.pass!==p)return $('#lErr',root).textContent='La contraseña ingresada no coincide con esta cuenta.';
        const userObj=found?{name:found.name,email:found.email,cat:found.cat||'comun'}:{name:e.split('@')[0],email:e,cat:'comun'};
        session.set(userObj);
        toast('🛸 Sesión iniciada · Bienvenido, '+userObj.name);
        draw();
      };

      const fR=$('#fRegister',root);
      if(fR)fR.onsubmit=ev=>{
        ev.preventDefault();
        const n=$('#rN',root).value.trim(),e=$('#rE',root).value.trim(),p=$('#rP',root).value,p2=$('#rP2',root).value;
        if(!n||!/\S+@\S+\.\S+/.test(e))return $('#rErr',root).textContent='Completa tu nombre y un correo electrónico válido.';
        if(p.length<6)return $('#rErr',root).textContent='La contraseña debe tener al menos 6 caracteres.';
        if(p!==p2)return $('#rErr',root).textContent='Las contraseñas no coinciden. Verifica e intenta de nuevo.';
        const users=store.get('usuarios_registrados',[]);
        const idx=users.findIndex(u=>u.email.toLowerCase()===e.toLowerCase());
        const newU={name:n,email:e,pass:p,cat:'comun',createdAt:new Date().toLocaleDateString('es-CO')};
        if(idx>=0)users[idx]=newU;else users.push(newU);
        store.set('usuarios_registrados',users);
        session.set({name:n,email:e,cat:'comun'});
        toast('✅ Credencial creada con éxito');
        draw();
      };

      const fRec=$('#fRecover',root);
      if(fRec)fRec.onsubmit=ev=>{
        ev.preventDefault();
        if(recoverStep===1){
          const e=$('#recE',root).value.trim();
          if(!/\S+@\S+\.\S+/.test(e))return $('#recErr',root).textContent='Ingresa un correo electrónico válido para recuperar tu cuenta.';
          recoverEmail=e;
          recoverStep=2;
          toast('📧 Código de recuperación enviado a '+e);
          forms('recover');
        }else{
          const code=$('#recCode',root).value.trim(),np=$('#recNewP',root).value;
          if(!code)return $('#recErr',root).textContent='Ingresa el código de verificación.';
          if(np.length<6)return $('#recErr',root).textContent='La nueva contraseña debe tener mínimo 6 caracteres.';
          const users=store.get('usuarios_registrados',[]);
          const idx=users.findIndex(u=>u.email.toLowerCase()===recoverEmail.toLowerCase());
          const name=idx>=0?users[idx].name:recoverEmail.split('@')[0];
          const cat=idx>=0?(users[idx].cat||'comun'):'comun';
          if(idx>=0)users[idx].pass=np;
          else users.push({name,email:recoverEmail,pass:np,cat:'comun'});
          store.set('usuarios_registrados',users);
          recoverStep=1;
          session.set({name,email:recoverEmail,cat});
          toast('🔐 Contraseña restablecida · Sesión iniciada');
          draw();
        }
      };
    }

    function profile(u){
      const m=u.cat==='miembro';
      const semCount=store.get('agenda_seminarios',[]).length;
      const tourCount=store.get('agenda_tours',[]).length;
      const privMeta=[
        {ic:'📁',code:'PRIV-01',title:'Archivo de casos desclasificados',desc:'Expedientes históricos, informes técnicos, audios de radar y evidencia fotogramétrica.',link:'tours.html'},
        {ic:'🎥',code:'PRIV-02',title:'Grabaciones de seminarios',desc:'Biblioteca completa en alta definición de sesiones académicas y laboratorios forenses.',link:'seminarios.html'},
        {ic:'🗺️',code:'PRIV-03',title:'Mapa de avistamientos',desc:'Cartografía interactiva con coordenadas, reportes verificados y zonas calientes activas.',link:'tours.html'},
        {ic:'💬',code:'PRIV-04',title:'Foro privado de investigadores',desc:'Canal encriptado de debate científico y coordinación operativa con el equipo CDO.',link:'redes.html'}
      ];

      root.innerHTML=`
        <div class="profile-pro reveal in">
          <aside class="card prof-card ${m?'is-vip':''}">
            <div class="q-glow"></div>
            <div class="prod-top">
              <span class="q-tag">${m?'CREDENCIAL VIP':'CREDENCIAL BASE'}</span>
              <span class="q-code">${m?'CRED-VIP':'CRED-OBS'}</span>
            </div>
            <div class="prof-avatar-wrap">
              <span class="prof-ring"></span>
              <div class="avatar ${m?'m':''}">${(u.name||'U')[0].toUpperCase()}</div>
            </div>
            <h3 class="prof-name">${u.name}</h3>
            <p class="prof-mail">${u.email}</p>
            <div class="prof-badge-wrap">
              <span class="badge ${u.cat}">${m?'⭐ MIEMBRO OFICIAL':'🛰️ OBSERVADOR COMÚN'}</span>
            </div>
            <div class="prof-stats">
              <div><b>${semCount}</b><small>Seminarios</small></div>
              <div><b>${tourCount}</b><small>Expediciones</small></div>
              <div><b>${m?'100%':'25%'}</b><small>Acceso CDO</small></div>
            </div>
            <div class="prof-actions">
              <button class="btn ${m?'btn-ghost':'btn-gold'} btn-sm btn-block" id="toggle">
                <span>${m?'Simular cambiar a cuenta común':'⚡ Simular ascenso a Miembro VIP'}</span>
              </button>
              <button class="btn btn-sm btn-block prof-logout" id="out">Cerrar sesión activa</button>
            </div>
          </aside>

          <div class="prof-main">
            <div class="card prof-panel">
              <div class="prof-panel-head">
                <div>
                  <span class="eyebrow"><i class="pulse-dot"></i> Nivel de Autorización</span>
                  <h3>Privilegios de tu categoría</h3>
                </div>
                ${m
                  ?`<span class="badge miembro">🔓 ACCESO TOTAL ACTIVO</span>`
                  :`<a class="btn btn-gold btn-sm" href="membresias.html"><span>Conoce la Membresía VIP</span><b class="q-arr">→</b></a>`
                }
              </div>
              <div class="prof-priv-grid">
                ${privMeta.map(p=>`
                  <div class="card prof-priv-card ${m?'unlocked':'locked'}">
                    <div class="prod-top">
                      <span class="q-tag">${m?'DESBLOQUEADO':'RESTRINGIDO'}</span>
                      <span class="q-code">${p.code}</span>
                    </div>
                    <div class="pp-head">
                      <div class="pp-ic">${p.ic}</div>
                      <div>
                        <h4>${p.title}</h4>
                        <span class="pp-status">${m?'✅ Disponible en tu rango':'🔒 Exclusivo Miembros VIP'}</span>
                      </div>
                    </div>
                    <p>${p.desc}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      $('#toggle',root).onclick=()=>{
        u.cat=m?'comun':'miembro';
        session.set(u);
        toast(u.cat==='miembro'?'⭐ Rango actualizado a Miembro Oficial VIP':'🛰️ Rango cambiado a Observador Común');
        draw();
      };
      $('#out',root).onclick=()=>{
        session.set(null);
        toast('Sesión finalizada correctamente');
        draw();
      };
    }

    draw();
  }
};
