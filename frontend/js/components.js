/* ===== UTILIDADES ===== */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem('cdo_'+k))??d}catch{return d}},set:(k,v)=>localStorage.setItem('cdo_'+k,JSON.stringify(v))};
const money=n=>'$'+n.toLocaleString('es-CO');
const thumb=(e,h)=>`<div class="thumb" style="background:linear-gradient(135deg,hsl(${h} 70% 28%),hsl(${(h+60)%360} 60% 10%))">${e}</div>`;
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.append(t);setTimeout(()=>t.remove(),2800)}
function openModal(html){
  const o=document.createElement('div');o.className='overlay';
  o.innerHTML=`<div class="modal"><button class="x" aria-label="Cerrar">×</button>${html}</div>`;
  const close=()=>o.remove();
  o.addEventListener('click',e=>{if(e.target===o||e.target.classList.contains('x'))close()});
  document.addEventListener('keydown',function k(e){if(e.key==='Escape'){close();document.removeEventListener('keydown',k)}});
  document.body.append(o);o.close=close;return o;
}
/* ===== ICONOS ===== */
const ICON={power:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 2v10M18.4 6.6a9 9 0 11-12.8 0"/></svg>',
lang:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
cart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h2l2.4 11h10l2-8H6"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>',
menu:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
up:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/><path d="M12 9v11" opacity=".55"/></svg>',
whatsapp:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.33-1.66a11.86 11.86 0 005.72 1.46h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.16-3.43-8.42zM12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.76.98 1-3.66-.24-.38a9.85 9.85 0 01-1.51-5.25c0-5.45 4.44-9.89 9.91-9.89 2.64 0 5.13 1.03 7 2.9a9.83 9.83 0 012.9 7c0 5.45-4.44 9.89-9.9 9.89zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35z"/></svg>',
donate:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'};
/* ===== SISTEMA MULTILENGUAJE (9 IDIOMAS) ===== */
const LANGS=[
  {code:'es',short:'ES',native:'Español',label:'Idioma original',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#c60b1e"/><rect y="4" width="24" height="8" fill="#ffc400"/></svg>'},
  {code:'en',short:'EN',native:'English',label:'Inglés',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#b22234"/><path d="M0 2.5h24M0 5.5h24M0 8.5h24M0 11.5h24M0 14.5h24" stroke="#fff" stroke-width="1.3"/><rect width="10" height="9" fill="#3c3b6e"/></svg>'},
  {code:'fr',short:'FR',native:'Français',label:'Francés',flag:'<svg viewBox="0 0 24 16"><rect width="8" height="16" fill="#002395"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ed2939"/></svg>'},
  {code:'de',short:'DE',native:'Deutsch',label:'Alemán',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#000"/><rect y="5.3" width="24" height="5.4" fill="#dd0000"/><rect y="10.7" width="24" height="5.3" fill="#ffce00"/></svg>'},
  {code:'pt',short:'PT',native:'Português',label:'Portugués',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#009c3b"/><polygon points="12,2 22,8 12,14 2,8" fill="#ffdf00"/><circle cx="12" cy="8" r="3.2" fill="#002776"/></svg>'},
  {code:'it',short:'IT',native:'Italiano',label:'Italiano',flag:'<svg viewBox="0 0 24 16"><rect width="8" height="16" fill="#009246"/><rect x="8" width="8" height="16" fill="#fff"/><rect x="16" width="8" height="16" fill="#ce2b37"/></svg>'},
  {code:'hi',short:'HI',native:'हिन्दी',label:'Hindú (India)',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#ff9933"/><rect y="5.3" width="24" height="5.4" fill="#fff"/><rect y="10.7" width="24" height="5.3" fill="#138808"/><circle cx="12" cy="8" r="2" fill="none" stroke="#000080" stroke-width="1"/></svg>'},
  {code:'ru',short:'RU',native:'Русский',label:'Ruso',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="5.3" fill="#fff"/><rect y="5.3" width="24" height="5.4" fill="#0039a6"/><rect y="10.7" width="24" height="5.3" fill="#d52b1e"/></svg>'},
  {code:'zh-CN',short:'ZH',native:'中文',label:'Chino',flag:'<svg viewBox="0 0 24 16"><rect width="24" height="16" fill="#de2910"/><circle cx="5" cy="5" r="2.2" fill="#ffde00"/><circle cx="9.5" cy="2.5" r=".7" fill="#ffde00"/><circle cx="11" cy="4.2" r=".7" fill="#ffde00"/><circle cx="10.5" cy="6.5" r=".7" fill="#ffde00"/><circle cx="8.8" cy="8" r=".7" fill="#ffde00"/></svg>'}
];
const I18N_DICT={
  en:{'Inicio':'Home','Membresías':'Memberships','Tienda':'Store','Seminarios':'Seminars','Redes':'Networks','Tours':'Tours','Acceder':'Sign In','Navegación':'Navigation','Institucional y Legal':'Institutional & Legal','Central de Contacto':'Contact Center','Donar':'Donate','Subir':'Top','EN LÍNEA':'ONLINE','MISIÓN CDO':'CDO MISSION','Todos':'All','Ropa':'Apparel','Hogar':'Home','Accesorios':'Accessories','Agregar':'Add','Inscribirme':'Enroll','Inscribirme al tour':'Join Tour','Crear mi cuenta':'Create Account','Únete a la comunidad':'Join the Community','Explorar tours':'Explore Tours'},
  fr:{'Inicio':'Accueil','Membresías':'Adhésions','Tienda':'Boutique','Seminarios':'Séminaires','Redes':'Réseaux','Tours':'Expéditions','Acceder':'Connexion','Navegación':'Navigation','Institucional y Legal':'Institutionnel et Légal','Central de Contacto':'Centre de Contact','Donar':'Faire un don','Subir':'Haut','EN LÍNEA':'EN LIGNE','MISIÓN CDO':'MISSION CDO','Todos':'Tous','Ropa':'Vêtements','Hogar':'Maison','Accesorios':'Accessoires','Agregar':'Ajouter','Inscribirme':"S'inscrire",'Inscribirme al tour':'Rejoindre le tour','Crear mi cuenta':'Créer mon compte','Únete a la comunidad':'Rejoindre la communauté','Explorar tours':'Explorer les tours'},
  de:{'Inicio':'Startseite','Membresías':'Mitgliedschaften','Tienda':'Shop','Seminarios':'Seminare','Redes':'Netzwerke','Tours':'Touren','Acceder':'Anmelden','Navegación':'Navigation','Institucional y Legal':'Rechtliches','Central de Contacto':'Kontaktzentrum','Donar':'Spenden','Subir':'Oben','EN LÍNEA':'ONLINE','MISIÓN CDO':'CDO MISSION','Todos':'Alle','Ropa':'Kleidung','Hogar':'Zuhause','Accesorios':'Zubehör','Agregar':'Hinzufügen','Inscribirme':'Anmelden','Inscribirme al tour':'Tour buchen','Crear mi cuenta':'Konto erstellen','Únete a la comunidad':'Community beitreten','Explorar tours':'Touren entdecken'},
  pt:{'Inicio':'Início','Membresías':'Assinaturas','Tienda':'Loja','Seminarios':'Seminários','Redes':'Redes','Tours':'Expedições','Acceder':'Entrar','Navegación':'Navegação','Institucional y Legal':'Institucional e Legal','Central de Contacto':'Central de Contato','Donar':'Doar','Subir':'Topo','EN LÍNEA':'ONLINE','MISIÓN CDO':'MISSÃO CDO','Todos':'Todos','Ropa':'Roupas','Hogar':'Casa','Accesorios':'Acessórios','Agregar':'Adicionar','Inscribirme':'Inscrever-se','Inscribirme al tour':'Inscrever-se no tour','Crear mi cuenta':'Criar minha conta','Únete a la comunidad':'Junte-se à comunidade','Explorar tours':'Explorar expedições'},
  it:{'Inicio':'Home','Membresías':'Abbonamenti','Tienda':'Negozio','Seminarios':'Seminari','Redes':'Reti','Tours':'Tour','Acceder':'Accedi','Navegación':'Navigazione','Institucional y Legal':'Istituzionale e Legale','Central de Contacto':'Centro Contatti','Donar':'Dona','Subir':'Su','EN LÍNEA':'ONLINE','MISIÓN CDO':'MISSIONE CDO','Todos':'Tutti','Ropa':'Abbigliamento','Hogar':'Casa','Accesorios':'Accessori','Agregar':'Aggiungi','Inscribirme':'Iscriviti','Inscribirme al tour':'Iscriviti al tour','Crear mi cuenta':'Crea il mio account','Únete a la comunidad':'Unisciti alla comunità','Explorar tours':'Esplora i tour'},
  hi:{'Inicio':'मुख्य पृष्ठ','Membresías':'सदस्यता','Tienda':'स्टोर','Seminarios':'सेमिनार','Redes':'नेटवर्क','Tours':'टूर','Acceder':'लॉग इन','Navegación':'नेविगेशन','Institucional y Legal':'संस्थागत और कानूनी','Central de Contacto':'संपर्क केंद्र','Donar':'दान करें','Subir':'ऊपर','EN LÍNEA':'ऑनलाइन','MISIÓN CDO':'CDO मिशन','Todos':'सभी','Ropa':'कपड़े','Hogar':'घर','Accesorios':'एक्सेसरीज़','Agregar':'जोड़ें','Inscribirme':'पंजीकरण करें','Inscribirme al tour':'टूर में शामिल हों','Crear mi cuenta':'खाता बनाएं','Únete a la comunidad':'समुदाय से जुड़ें','Explorar tours':'टूर देखें'},
  ru:{'Inicio':'Главная','Membresías':'Членство','Tienda':'Магазин','Seminarios':'Семинары','Redes':'Сети','Tours':'Туры','Acceder':'Войти','Navegación':'Навигация','Institucional y Legal':'Правовая информация','Central de Contacto':'Контактный центр','Donar':'Пожертвовать','Subir':'Наверх','EN LÍNEA':'ОНЛАЙН','MISIÓN CDO':'МИССИЯ CDO','Todos':'Все','Ropa':'Одежда','Hogar':'Дом','Accesorios':'Аксессуары','Agregar':'Добавить','Inscribirme':'Записаться','Inscribirme al tour':'Записаться на тур','Crear mi cuenta':'Создать аккаунт','Únete a la comunidad':'Вступить в сообщество','Explorar tours':'Смотреть туры'},
  'zh-CN':{'Inicio':'首页','Membresías':'会员资格','Tienda':'官方商店','Seminarios':'研讨会','Redes':'官方网络','Tours':'实地考察','Acceder':'登录','Navegación':'网站导航','Institucional y Legal':'机构与法律','Central de Contacto':'联系中心','Donar':'捐赠支持','Subir':'顶部','EN LÍNEA':'在线','MISIÓN CDO':'CDO 使命','Todos':'全部','Ropa':'服饰','Hogar':'家居','Accesorios':'配件','Agregar':'添加','Inscribirme':'立即报名','Inscribirme al tour':'报名考察团','Crear mi cuenta':'创建账户','Únete a la comunidad':'加入社区','Explorar tours':'探索考察路线'}
};
const i18n={
  getLang:()=>store.get('lang','es'),
  getCache:l=>store.get('tr_'+l,{}),
  setCache:(l,c)=>store.set('tr_'+l,c),
  shouldSkipText:s=>{
    if(!s||s.length<2)return true;
    if(/^[\d\s$.,+:%•·/\-–—*()#@!¡?¿'"°<>[\]=×✓✕→↗›✦★⚡🛸🛍️🎓🌌📡👤👥🧭🌍📧📞📍🛒🔐🛡️👁️🙈📅🕒🎟️🎒🏜️🏔️🗺️👕🧢☕🎖️🔦🌠👽🧥🔭📻📁🎥💬💛🗑️📥🔔📲⭐🛰️]+$/.test(s))return true;
    if(/^(MOD|EQP|SEM|EXP|CH|CRED|PRIV|CDO)-[A-Z0-9-]+$/.test(s))return true;
    return false;
  },
  collect(root=document.body){
    if(!root)return {nodes:[],attrs:[]};
    const nodes=[],attrs=[];
    const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
      acceptNode(n){
        const p=n.parentElement;
        if(!p)return NodeFilter.FILTER_REJECT;
        if(p.closest('script,style,noscript,svg,code,.notranslate,[data-no-translate]'))return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    let n;
    while((n=w.nextNode())){
      const cur=n.nodeValue;
      if(n.__cdoOrig===undefined||cur!==n.__cdoLast){
        n.__cdoOrig=cur;
      }
      const trimmed=(n.__cdoOrig||'').trim();
      if(!i18n.shouldSkipText(trimmed))nodes.push(n);
    }
    const els=root.querySelectorAll?root.querySelectorAll('[placeholder],[title],[aria-label]'):[];
    els.forEach(el=>{
      if(el.closest('.notranslate,[data-no-translate]'))return;
      if(!el.__cdoOrigAttrs)el.__cdoOrigAttrs={};
      if(!el.__cdoLastAttrs)el.__cdoLastAttrs={};
      ['placeholder','title','aria-label'].forEach(a=>{
        if(!el.hasAttribute(a))return;
        const v=el.getAttribute(a);
        if(el.__cdoOrigAttrs[a]===undefined||v!==el.__cdoLastAttrs[a]){
          el.__cdoOrigAttrs[a]=v;
        }
        const trimmed=(el.__cdoOrigAttrs[a]||'').trim();
        if(!i18n.shouldSkipText(trimmed))attrs.push({el,a});
      });
    });
    return {nodes,attrs};
  },
  async fetchSingle(text,lang){
    try{
      const url=`https://translate.googleapis.com/translate_a/single?client=gtx&sl=es&tl=${encodeURIComponent(lang)}&dt=t&q=${encodeURIComponent(text)}`;
      const r=await fetch(url);
      if(!r.ok)return null;
      const d=await r.json();
      if(Array.isArray(d)&&Array.isArray(d[0])){
        return d[0].map(x=>x[0]).join('');
      }
    }catch{}
    return null;
  },
  async apply(lang,root=document.body){
    document.documentElement.lang=lang==='zh-CN'?'zh':lang;
    const {nodes,attrs}=i18n.collect(root);
    if(lang==='es'){
      nodes.forEach(n=>{
        if(n.__cdoOrig!==undefined){
          n.nodeValue=n.__cdoOrig;
          n.__cdoLast=n.__cdoOrig;
        }
      });
      attrs.forEach(({el,a})=>{
        const orig=el.__cdoOrigAttrs?.[a];
        if(orig!==undefined){
          el.setAttribute(a,orig);
          el.__cdoLastAttrs[a]=orig;
        }
      });
      return;
    }
    const dict=I18N_DICT[lang]||{};
    const cache=i18n.getCache(lang);
    const missingSet=new Set();
    const resolveSync=t=>dict[t]||cache[t]||null;

    nodes.forEach(n=>{
      const raw=n.__cdoOrig;
      const t=raw.trim();
      const tr=resolveSync(t);
      if(tr){
        const lead=raw.match(/^\s*/)[0],trail=raw.match(/\s*$/)[0];
        const val=lead+tr+trail;
        if(n.nodeValue!==val)n.nodeValue=val;
        n.__cdoLast=val;
      }else{
        missingSet.add(t);
      }
    });
    attrs.forEach(({el,a})=>{
      const raw=el.__cdoOrigAttrs[a];
      const t=raw.trim();
      const tr=resolveSync(t);
      if(tr){
        if(el.getAttribute(a)!==tr)el.setAttribute(a,tr);
        el.__cdoLastAttrs[a]=tr;
      }else{
        missingSet.add(t);
      }
    });

    const missing=[...missingSet];
    if(!missing.length)return;

    const batchSize=10;
    let updated=false;
    for(let i=0;i<missing.length;i+=batchSize){
      if(i18n.getLang()!==lang)return;
      const chunk=missing.slice(i,i+batchSize);
      const canJoin=chunk.every(s=>!s.includes('\n'));
      let resolved=false;
      if(canJoin&&chunk.length>1){
        const joined=chunk.join('\n');
        const res=await i18n.fetchSingle(joined,lang);
        if(res){
          const parts=res.split('\n');
          if(parts.length===chunk.length){
            chunk.forEach((origStr,idx)=>{
              const clean=parts[idx].trim();
              if(clean){cache[origStr]=clean;updated=true;}
            });
            resolved=true;
          }
        }
      }
      if(!resolved){
        await Promise.all(chunk.map(async origStr=>{
          const res=await i18n.fetchSingle(origStr,lang);
          if(res){cache[origStr]=res.trim();updated=true;}
        }));
      }
      if(updated){
        i18n.setCache(lang,cache);
        nodes.forEach(n=>{
          const raw=n.__cdoOrig;
          const t=raw.trim();
          const tr=dict[t]||cache[t];
          if(tr){
            const lead=raw.match(/^\s*/)[0],trail=raw.match(/\s*$/)[0];
            const val=lead+tr+trail;
            if(n.nodeValue!==val)n.nodeValue=val;
            n.__cdoLast=val;
          }
        });
        attrs.forEach(({el,a})=>{
          const raw=el.__cdoOrigAttrs[a];
          const t=raw.trim();
          const tr=dict[t]||cache[t];
          if(tr){
            if(el.getAttribute(a)!==tr)el.setAttribute(a,tr);
            el.__cdoLastAttrs[a]=tr;
          }
        });
      }
    }
  },
  setLang(lang){
    store.set('lang',lang);
    const lObj=LANGS.find(x=>x.code===lang)||LANGS[0];
    const badge=$('#langBadge');
    if(badge)badge.textContent=lObj.short;
    $$('.lang-opt').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
    i18n.apply(lang,document.body);
    toast(`🌐 ${lObj.native} (${lObj.label})`);
  },
  initObserver(){
    if(i18n._obs)return;
    let timer=null;
    i18n._obs=new MutationObserver(()=>{
      const lang=i18n.getLang();
      if(lang==='es')return;
      clearTimeout(timer);
      timer=setTimeout(()=>i18n.apply(lang,document.body),60);
    });
    i18n._obs.observe(document.body,{childList:true,subtree:true});
  }
};
const SOCIAL_SVG={
  Facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>',
  Instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
  YouTube:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/></svg>',
  TikTok:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/></svg>',
  X:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  Telegram:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.94 2.34a1.5 1.5 0 00-1.62-.23L2.43 9.38a1.42 1.42 0 00-.06 2.66l4.65 1.65 1.77 5.51a1.25 1.25 0 002.12.47l2.63-2.66 4.74 3.49a1.48 1.48 0 002.32-.92l2.75-15.65a1.5 1.5 0 00-.41-1.59zM9.2 13.3l8.67-5.46-6.83 6.94-.26 2.85-1.58-4.33z"/></svg>'
};
/* ===== NAVBAR ===== */
function renderNav(){
  const cur=location.pathname.split('/').pop()||'index.html';
  const curLang=i18n.getLang();
  const curLangObj=LANGS.find(x=>x.code===curLang)||LANGS[0];
  $('#site-nav').innerHTML=`<header class="nav" id="nav"><div class="container nav-in">
    <a class="nav-logo" href="index.html"><img src="assets/logo_menu.png" alt="Cazadores de Ovnis Internacional"></a>
    <ul class="nav-links" id="navLinks">${CDO_DATA.pages.map(([h,t])=>`<li><a href="${h}" class="${h===cur?'active':''}">${t}</a></li>`).join('')}
      <li><button class="icon-btn power" id="adminBtn" title="Consola administrativa" aria-label="Consola administrativa">${ICON.power}</button></li></ul>
    <div class="nav-tools">
      <div class="lang-wrap notranslate" id="langWrap">
        <button class="icon-btn lang-btn" id="langBtn" type="button" title="Cambiar idioma" aria-label="Cambiar idioma">${ICON.lang}<span class="lang-badge" id="langBadge">${curLangObj.short}</span></button>
        <div class="lang-menu" id="langMenu" role="menu" aria-label="Seleccionar idioma">
          <div class="lang-menu-head"><span>🌐 IDIOMAS</span><span>${LANGS.length}</span></div>
          <div class="lang-list">${LANGS.map(l=>`<button type="button" class="lang-opt ${l.code===curLang?'on':''}" data-lang="${l.code}"><span class="lang-flag">${l.flag}</span><span class="lang-info"><strong>${l.native}</strong><small>${l.label}</small></span><span class="lang-tag">${l.short}</span></button>`).join('')}</div>
        </div>
      </div>
      <button class="icon-btn" id="cartBtn" aria-label="Carrito">${ICON.cart}<span class="cart-count" id="cartCount">0</span></button>
      <button class="icon-btn burger" id="burger" aria-label="Menú">${ICON.menu}</button>
    </div></div></header>`;
  const nav=$('#nav'),onScroll=()=>nav.classList.toggle('scrolled',scrollY>40);
  addEventListener('scroll',onScroll);onScroll();
  $('#burger').onclick=()=>$('#navLinks').classList.toggle('open');
  $('#adminBtn').onclick=openAdminGate;$('#cartBtn').onclick=openCart;updateCartCount();
  const lBtn=$('#langBtn'),lMenu=$('#langMenu'),lWrap=$('#langWrap');
  const closeLang=()=>{lMenu.classList.remove('open');lBtn.classList.remove('active')};
  lBtn.onclick=e=>{e.stopPropagation();const open=lMenu.classList.toggle('open');lBtn.classList.toggle('active',open)};
  $$('.lang-opt',lMenu).forEach(b=>b.onclick=e=>{e.stopPropagation();closeLang();i18n.setLang(b.dataset.lang)});
  document.addEventListener('click',e=>{if(!lWrap.contains(e.target))closeLang()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLang()});
}
/* ===== FOOTER ===== */
function renderFooter(){
  const waPhone=(CDO_CONFIG.WHATSAPP_PHONE||'573000000000').replace(/\D/g,'');
  const waMsg=encodeURIComponent(CDO_CONFIG.WHATSAPP_TEXT||'Hola Cazadores de Ovnis Internacional 🛸');
  const waUrl=`https://wa.me/${waPhone}?text=${waMsg}`;
  $('#site-footer').innerHTML=`<footer class="site-footer"><div class="foot-grid-bg"></div><div class="container">
  <div class="foot">
    <div class="foot-brand">
      <a href="index.html" class="foot-logo"><img src="assets/logo_menu.png" alt="Cazadores de Ovnis Internacional"></a>
      <p>Organización internacional dedicada a la investigación científica, documentación de campo y divulgación rigurosa del fenómeno OVNI y anomalías aéreas.</p>
      <div class="mini-social">${CDO_DATA.socials.map(s=>`<a href="${s.url}" target="_blank" rel="noopener" title="${s.name}" aria-label="${s.name}" style="--sc:${s.color}">${SOCIAL_SVG[s.name]||s.ch}</a>`).join('')}</div>
    </div>
    <div class="foot-col">
      <h4>Navegación</h4>
      <ul class="foot-list">${CDO_DATA.pages.map(([h,t])=>`<li><a href="${h}"><span>›</span> ${t}</a></li>`).join('')}</ul>
    </div>
    <div class="foot-col">
      <h4>Institucional y Legal</h4>
      <ul class="foot-list">
        <li><a href="membresias.html"><span>›</span> Membresía Oficial VIP</a></li>
        <li><a href="seminarios.html"><span>›</span> Academia y Seminarios</a></li>
        <li><a href="#" data-legal="privacidad"><span>›</span> Política de privacidad</a></li>
        <li><a href="#" data-legal="terminos"><span>›</span> Términos y condiciones</a></li>
        <li><a href="#" data-donate><span>›</span> Apoyar la misión (Donar)</a></li>
      </ul>
    </div>
    <div class="foot-col">
      <h4>Central de Contacto</h4>
      <ul class="foot-contact">
        <li><i class="fc-ic">📧</i><div><small>Correo oficial</small><span>contacto@cazadoresdeovnis.org</span></div></li>
        <li><i class="fc-ic">📞</i><div><small>Línea directa y reportes</small><span>+57 300 000 0000</span></div></li>
        <li><i class="fc-ic">📍</i><div><small>Base de operaciones</small><span>Medellín, Colombia</span></div></li>
      </ul>
      <form class="foot-news" id="footNews">
        <input type="email" id="fnEmail" placeholder="Tu correo para alertas OVNI..." required>
        <button type="submit" aria-label="Suscribirme">📡</button>
      </form>
    </div>
  </div>
  <div class="foot-bottom">
    <p class="copy">© ${new Date().getFullYear()} <b>CAZADORES DE OVNIS INTERNACIONAL</b>. Todos los derechos reservados.</p>
  </div>
  </div></footer>
  <div class="fab-dock" aria-label="Acciones rápidas">
    <button type="button" class="fab-item fab-top" id="backToTop" aria-label="Volver arriba" title="Volver al inicio">
      <span class="fab-ic">${ICON.up}</span>
      <span class="fab-tip">Subir</span>
    </button>
    <a class="fab-item fab-wa" href="${waUrl}" target="_blank" rel="noopener" aria-label="Chatear por WhatsApp" title="Línea directa por WhatsApp">
      <span class="fab-ic">${ICON.whatsapp}<i class="fab-dot"></i></span>
      <span class="fab-txt"><small>EN LÍNEA</small><b>WhatsApp</b></span>
    </a>
    <button type="button" class="fab-item fab-donate donate-fab" data-donate aria-label="Apoyar la misión (Donar)" title="Apoyar la misión">
      <span class="fab-ic">${ICON.donate}</span>
      <span class="fab-txt"><small>MISIÓN CDO</small><b>Donar</b></span>
    </button>
  </div>`;
  $$('[data-legal]').forEach(a=>a.onclick=e=>{e.preventDefault();const t=a.dataset.legal==='privacidad';
    openModal(`<h3>${t?'Política de privacidad':'Términos y condiciones'}</h3><p style="margin-top:12px">${t?'Texto demostrativo. Aquí se describirá cómo se recopilan, usan y protegen los datos personales de los usuarios.':'Texto demostrativo. Aquí se definirán las reglas de uso del sitio, membresías, compras y participación en actividades.'}</p>`)});
  $$('[data-donate]').forEach(b=>b.onclick=e=>{e.preventDefault();openDonate()});
  const btt=$('#backToTop');
  if(btt){
    const toggleTop=()=>btt.classList.toggle('show',scrollY>260);
    addEventListener('scroll',toggleTop,{passive:true});
    toggleTop();
    btt.onclick=()=>scrollTo({top:0,behavior:'smooth'});
  }
  const fn=$('#footNews');if(fn)fn.onsubmit=e=>{e.preventDefault();$('#fnEmail').value='';toast('📡 Suscripción a alertas aeroespaciales activada')};
}
/* ===== DONACIONES (SOLO VISUAL) ===== */
function openDonate(){
  const o=openModal(`<h3>💛 Apoya la misión</h3><p>Tu aporte financia investigaciones, equipos y divulgación.</p>
  <div class="amounts">${[10000,25000,50000,100000].map(v=>`<button class="chip" data-v="${v}">${money(v)}</button>`).join('')}</div>
  <input type="number" id="dAmt" placeholder="Otro valor (COP)"><div class="form-actions"><button class="btn btn-gold btn-block" id="dGo">Donar ahora</button></div>`);
  $$('.chip',o).forEach(c=>c.onclick=()=>{$$('.chip',o).forEach(x=>x.classList.remove('on'));c.classList.add('on');$('#dAmt',o).value=c.dataset.v});
  $('#dGo',o).onclick=()=>{const v=+$('#dAmt',o).value;if(v<=0)return toast('Ingresa un valor válido');o.close();toast('¡Gracias por tu donación de '+money(v)+'! (simulado)')};
}
/* ===== CARRITO (SIMULADO) ===== */
const cart={get:()=>store.get('cart',[]),set:c=>{store.set('cart',c);updateCartCount()}};
function updateCartCount(){const n=cart.get().reduce((a,i)=>a+i.q,0);const el=$('#cartCount');if(el)el.textContent=n;const sb=$('#storeCartBadge');if(sb)sb.textContent=n}
function addToCart(id){const c=cart.get(),i=c.find(x=>x.id===id);i?i.q++:c.push({id,q:1});cart.set(c);toast('Agregado al carrito 🛒')}
function openCart(){
  const draw=()=>{const c=cart.get(),rows=c.map(i=>{const p=CDO_DATA.products.find(x=>x.id===i.id);return {p,i}});
    const total=rows.reduce((a,r)=>a+r.p.price*r.i.q,0);
    return `<h3>🛒 Tu carrito</h3>${rows.length?rows.map(r=>`<div class="cart-row"><span>${r.p.emoji} ${r.p.name}<br><small>${money(r.p.price)}</small></span>
    <span class="qty"><button data-m="${r.p.id}">−</button>${r.i.q}<button data-p="${r.p.id}">+</button></span></div>`).join('')+
    `<p style="margin:16px 0" class="price">Total: ${money(total)}</p><button class="btn btn-primary btn-block" id="buy">Finalizar compra (simulada)</button>`:'<p style="margin:16px 0">Tu carrito está vacío.</p>'}`};
  const o=openModal(draw()),bind=()=>{
    $$('[data-p]',o).forEach(b=>b.onclick=()=>{addToCart(+b.dataset.p);refresh()});
    $$('[data-m]',o).forEach(b=>b.onclick=()=>{let c=cart.get();const i=c.find(x=>x.id==b.dataset.m);i.q--;cart.set(c.filter(x=>x.q>0));refresh()});
    const buy=$('#buy',o);if(buy)buy.onclick=()=>{cart.set([]);o.close();toast('¡Compra simulada realizada! 🛸')}};
  const refresh=()=>{o.querySelector('.modal').innerHTML='<button class="x">×</button>'+draw();bind()};bind();
}
/* ===== ACCESO ADMINISTRATIVO (SIMULADO) ===== */
function openAdminGate(){
  const o=openModal(`<h3>🔐 Acceso restringido</h3><p>Ingresa el código numérico administrativo.</p>
  <label>Código</label><input class="code-input" id="aCode" type="password" inputmode="numeric" maxlength="8" autofocus>
  <div class="err" id="aErr"></div><div class="form-actions"><button class="btn btn-primary btn-block" id="aGo">Verificar</button></div>`);
  const step2=()=>{o.querySelector('.modal').innerHTML=`<button class="x">×</button><h3>🛡️ Autenticación administrativa</h3><p>Código verificado. Completa el acceso (simulado).</p>
    <label>Usuario</label><input id="aUser" placeholder="admin"><label>Contraseña</label><input id="aPass" type="password" placeholder="••••••••">
    <div class="err" id="aErr2"></div><div class="form-actions"><button class="btn btn-primary btn-block" id="aLogin">Entrar a la consola</button></div>`;
    $('#aLogin',o).onclick=()=>{if(!$('#aUser',o).value.trim()||!$('#aPass',o).value)return $('#aErr2',o).textContent='Completa usuario y contraseña.';
      sessionStorage.setItem('cdo_admin','1');location.href='admin.html'}};
  const check=()=>{$('#aCode',o).value===CDO_CONFIG.ADMIN_CODE?step2():($('#aErr',o).textContent='Código incorrecto.')};
  $('#aGo',o).onclick=check;$('#aCode',o).addEventListener('keydown',e=>e.key==='Enter'&&check());
}
/* ===== ANIMACIÓN AL HACER SCROLL ===== */
function initReveal(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el))}
/* ===== USUARIO ===== */
const session={get:()=>store.get('user',null),set:u=>store.set('user',u)};
/* ===== INICIO ===== */
document.addEventListener('DOMContentLoaded',()=>{if($('#site-nav')){renderNav();renderFooter()}if(window.initPage)initPage();initReveal();i18n.initObserver();if(i18n.getLang()!=='es')i18n.apply(i18n.getLang())});
