/* ===== DATOS SIMULADOS (reemplazar luego por API / base de datos) ===== */
const CDO_DATA = {
  /* --- Navegación --- */
  pages: [
    ["index.html","Inicio"],["membresias.html","Membresías"],["tienda.html","Tienda"],
    ["seminarios.html","Seminarios"],["redes.html","Redes"],["tours.html","Tours"],["acceso.html","Acceder"]
  ],
  /* --- Accesos rápidos del inicio --- */
  quick: [
    ["🛸","Membresías","membresias.html","Desbloquea archivos desclasificados, foros privados de investigadores y descuentos en expediciones.","ACCESO VIP","MOD-01","Ver planes"],
    ["🛍️","Tienda Oficial","tienda.html","Indumentaria táctica, linternas de visión nocturna y souvenirs exclusivos para salidas de campo.","EQUIPAMIENTO","MOD-02","Ir a la tienda"],
    ["🎓","Seminarios","seminarios.html","Fórmate con investigadores, astrónomos y especialistas en análisis de evidencia aérea.","ACADEMIA","MOD-03","Ver calendario"],
    ["🌌","Tours y Campo","tours.html","Viaja a zonas calientes de avistamiento con equipos de monitoreo y observación guiada.","EXPEDICIONES","MOD-04","Explorar rutas"],
    ["📡","Redes y Alertas","redes.html","Conéctate a nuestros canales de transmisión en vivo, reportes ciudadanos y alertas en tiempo real.","TRANSMISIÓN","MOD-05","Conectar ahora"],
    ["👤","Mi Perfil","acceso.html","Gestiona tu credencial de investigador, tus inscripciones activas y tu rango en la comunidad.","CREDENCIAL","MOD-06","Acceder al panel"]
  ],
  /* --- Productos (emoji + color sustituyen fotos hasta tener imágenes reales en assets/) --- */
  products: [
    {id:1,code:"EQP-01",name:"Camiseta Área 51",cat:"Ropa",badge:"★ MÁS VENDIDO",spec:"Algodón 240g · Estampado Fotoluminiscente",price:59000,emoji:"👕",hue:190,desc:"Prenda táctica de algodón premium con emblema reflectivo que brilla durante vigilias nocturnas."},
    {id:2,code:"EQP-02",name:"Gorra Cazador Oficial",cat:"Ropa",badge:"OFICIAL CDO",spec:"Ripstop Impermeable · Bordado 3D",price:42000,emoji:"🧢",hue:255,desc:"Gorra de expedición con ajuste ergonómico, visera reforzada e insignia bordada en alto relieve."},
    {id:3,code:"EQP-03",name:"Taza Termosensible Abducción",cat:"Hogar",badge:"COLECCIÓN",spec:"Cerámica Térmica · 350 ml",price:32000,emoji:"☕",hue:165,desc:"Recipiente reactivo al calor: el haz de luz y el disco metálico se revelan al servir bebidas calientes."},
    {id:4,code:"EQP-04",name:"Parche Misión Aeroespacial",cat:"Accesorios",badge:"INSIGNIA",spec:"Velcro Táctico · Hilo Metálico",price:18000,emoji:"🎖️",hue:42,desc:"Insignia oficial de división de campo con respaldo de velcro para morral, chaleco o chaqueta."},
    {id:5,code:"EQP-05",name:"Linterna Nocturna Espectro Rojo",cat:"Accesorios",badge:"⚡ USO DE CAMPO",spec:"LED 660nm · Aluminio Aeronáutico",price:55000,emoji:"🔦",hue:180,desc:"Iluminación táctica de espectro rojo diseñada para preservar la visión escotópica en observación astronómica."},
    {id:6,code:"EQP-06",name:"Póster Cartografía de Avistamientos",cat:"Hogar",badge:"ARCHIVO",spec:"Formato 50×70 cm · Papel Museo 250g",price:36000,emoji:"🌠",hue:275,desc:"Mapa estelar de alta precisión con coordenadas históricas de anomalías aéreas documentadas."},
    {id:7,code:"EQP-07",name:"Llavero Aleación Alienígena",cat:"Accesorios",badge:"SOUVENIR",spec:"Acero Inoxidable · Grabado Láser",price:15000,emoji:"👽",hue:140,desc:"Pieza metálica anodizada de alta resistencia con grabado láser del sello internacional CDO."},
    {id:8,code:"EQP-08",name:"Sudadera Térmica Contacto",cat:"Ropa",badge:"★ EDICIÓN VIP",spec:"Fleece Térmico · Alta Montaña",price:98000,emoji:"🧥",hue:215,desc:"Sudadera de expedición con capucha térmica, bolsillos de seguridad e insignia oficial bordada."}
  ],
  /* --- Seminarios --- */
  seminars: [
    {id:1,code:"SEM-01",cat:"Virtual",tag:"UFOLOGÍA",badge:"★ CERTIFICADO CDO",title:"Fundamentos de la Ufología Científica",speaker:"Dr. Alejandro Vega · Dir. Investigación",time:"19:00 - 21:30 COT",duration:"2.5 Horas",spots:18,desc:"Historia desclasificada, clasificación Hynek-Vallée y metodología científica para el estudio riguroso de fenómenos aéreos no identificados (UAP).",topics:["Clasificación de encuentros","Archivos oficiales desclasificados","Protocolo de entrevista a testigos"],date:"2026-11-14",mode:"Virtual · Sala En Vivo",emoji:"🛸",hue:192},
    {id:2,code:"SEM-02",cat:"Virtual",tag:"FOTOGRAMETRÍA",badge:"LABORATORIO PRÁCTICO",title:"Análisis Forense de Avistamientos",speaker:"Ing. Valeria Montes · Analista Óptica",time:"18:30 - 21:00 COT",duration:"2.5 Horas",spots:14,desc:"Cómo documentar, verificar metadatos, analizar trayectorias en video y descartar explicaciones convencionales o manipulaciones digitales.",topics:["Verificación de espectro y EXIF","Descarte de satélites y globos","Triangulación de coordenadas"],date:"2026-11-28",mode:"Virtual · Laboratorio HD",emoji:"🔍",hue:258},
    {id:3,code:"SEM-03",cat:"Presencial",tag:"ASTRONOMÍA",badge:"⚡ PRÁCTICA NOCTURNA",title:"Astronomía Observacional para Cazadores",speaker:"Prof. Martín Soler · Astrofísico",time:"17:00 - 22:00 COT",duration:"5 Horas",spots:12,desc:"Cartografía celeste, tránsito de satélites, bólidos, fenómenos atmosféricos de alta cota y manejo de telescopios motorizados.",topics:["Bóveda celeste y efemérides","Órbitas LEO y destellos orbitales","Calibración de ópticas nocturnas"],date:"2026-12-05",mode:"Presencial · Medellín",emoji:"🔭",hue:215},
    {id:4,code:"SEM-04",cat:"Híbrido",tag:"INSTRUMENTACIÓN",badge:"EQUIPO TÁCTICO",title:"Tecnología Aplicada a la Investigación",speaker:"Cmdt. Héctor Ríos · División Instrumental",time:"16:00 - 19:30 COT",duration:"3.5 Horas",spots:20,desc:"Operación de cámaras térmicas FLIR, sensores de espectro electromagnético, radares pasivos, drones y telemetría acústica.",topics:["Termografía infrarroja y visión nocturna","Sensores EMF y radiofrecuencia","Captura con cámaras All-Sky"],date:"2026-12-19",mode:"Híbrido · Bogotá + Streaming",emoji:"📡",hue:168},
    {id:5,code:"SEM-05",cat:"Presencial",tag:"OPERACIONES",badge:"★ ENTRENAMIENTO VIP",title:"Exploración Científica de Campo",speaker:"Dra. Elena Duarte · Líder de Expedición",time:"08:00 - 14:00 COT",duration:"6 Horas",spots:10,desc:"Protocolos de seguridad en zonas calientes, levantamiento de muestras en terreno, cadena de custodia y bitácora operativa de vigilia.",topics:["Seguridad y navegación táctica","Muestreo de suelo y radiación","Coordinación de escuadras"],date:"2027-01-16",mode:"Presencial · Bogotá",emoji:"🧭",hue:34},
    {id:6,code:"SEM-06",cat:"Híbrido",tag:"RADIODETECCIÓN",badge:"NUEVO MÓDULO",title:"Monitoreo de Señales y Transmisiones",speaker:"Ing. Camilo Pardo · Especialista RF",time:"19:00 - 21:30 COT",duration:"2.5 Horas",spots:22,desc:"Escucha de bandas aeronáuticas, análisis de espectrogramas de audio, detección por radio definida por software (SDR) y alertas tempranas.",topics:["Receptores SDR y antenas","Lectura de espectrogramas","Comunicaciones ATC y anomalías"],date:"2027-01-30",mode:"Híbrido · Medellín + Streaming",emoji:"📻",hue:285}
  ],
  /* --- Tours --- */
  tours: [
    {id:1,code:"EXP-T01",tag:"VIGILIA ASTRONÓMICA",title:"Noche en el Desierto de la Tatacoa",place:"Huila, Colombia",coords:"3°14'N · 75°10'W",lead:"Unidad de Campo #02 · Óptica Nocturna",level:"Nivel Inicial · Desierto",spots:14,date:"2026-12-12",days:"2 días / 1 noche",emoji:"🏜️",hue:25,price:420000,desc:"Expedición de vigilia en uno de los cielos más limpios de Sudamérica. Monitoreo con telescopios robotizados, cámaras de espectro completo y seguimiento de anomalías.",acts:["Observación astronómica y patrullaje celeste","Fotografía nocturna de larga exposición","Registro instrumental de anomalías luminosas"]},
    {id:2,code:"EXP-T02",tag:"ALTA MONTAÑA",title:"Expedición Sierra Nevada",place:"Santa Marta, Colombia",coords:"10°52'N · 73°43'W",lead:"Unidad de Campo #05 · Etnoufología",level:"Nivel Intermedio · Montaña",spots:10,date:"2027-01-23",days:"3 días / 2 noches",emoji:"🏔️",hue:190,price:780000,desc:"Incursión científica en un corredor histórico de avistamientos y relatos ancestrales. Despliegue de sensores pasivos, entrevistas de campo y campamento de observación.",acts:["Caminata guiada por miradores estratégicos","Entrevistas con testigos y sabedores locales","Instalación de cámaras térmicas y All-Sky"]},
    {id:3,code:"EXP-T03",tag:"MISIÓN INTERNACIONAL",title:"Ruta Nazca y Paracas",place:"Ica, Perú",coords:"14°44'S · 75°07'W",lead:"Comité Internacional · Arqueoastronomía",level:"Nivel General · Costa Sur",spots:8,date:"2027-03-06",days:"5 días / 4 noches",emoji:"🗺️",hue:45,price:2400000,desc:"Travesía internacional por los geoglifos de Nazca y la reserva de Paracas. Análisis arqueoastronómico, sobrevuelo en avioneta privada y vigilia en el desierto costero.",acts:["Sobrevuelo táctico sobre las Líneas de Nazca","Conferencia magistral in situ y vigilia nocturna","Visita arqueológica en Paracas y museos locales"]}
  ],
  /* --- Investigaciones en curso --- */
  investigations: [
    {id:1,code:"EXP-01",icon:"🛸",place:"Guatapé, Antioquia",lead:"Unidad de Campo #04",title:"Luces de Guatapé",status:"Recolección de testimonios",progress:62,desc:"Análisis fotogramétrico, triangulación de coordenadas y entrevistas de 40 reportes de anomalías luminosas sobre el embalse."},
    {id:2,code:"EXP-02",icon:"📡",place:"Red Multinacional",lead:"División Instrumental",title:"Proyecto Cielo Abierto",status:"Instalación de sensores",progress:35,desc:"Despliegue de estaciones ciudadanas con cámaras de cielo completo (All-Sky) y detección automatizada de trayectorias no balísticas."},
    {id:3,code:"EXP-03",icon:"📁",place:"Archivo Central",lead:"Comité Documental",title:"Archivo Histórico OVNI",status:"Digitalización",progress:80,desc:"Restauración, catalogación y desclasificación de reportes de prensa, audios de torre de control y expedientes entre 1950 y 2000."}
  ],
  /* --- Redes (reemplazar URLs y logos oficiales en assets/) --- */
  socials: [
    {name:"Facebook",code:"CH-01",tag:"COMUNIDAD GLOBAL",handle:"@CazadoresDeOvnisOficial",stats:"128K seguidores",cta:"Unirse a la comunidad",ch:"f",color:"#1877f2",url:"https://www.facebook.com/",desc:"Debates abiertos, crónicas de expediciones, convocatorias de vigilia y comunicados oficiales de la organización."},
    {name:"Instagram",code:"CH-02",tag:"EVIDENCIA VISUAL",handle:"@cazadoresdeovnis.int",stats:"94K seguidores",cta:"Explorar galería",ch:"IG",color:"#e1306c",url:"https://www.instagram.com/",desc:"Fotografía astronómica de larga exposición, capturas térmicas, infografías de casos y cobertura visual en campo."},
    {name:"YouTube",code:"CH-03",tag:"DOCUMENTALES HD",handle:"Cazadores de Ovnis TV",stats:"215K suscriptores",cta:"Ver transmisiones",ch:"▶",color:"#ff0033",url:"https://www.youtube.com/",desc:"Investigaciones documentales completas, análisis cuadro a cuadro, entrevistas a testigos y seminarios en vivo."},
    {name:"TikTok",code:"CH-04",tag:"CÁPSULAS RÁPIDAS",handle:"@cazadoresovnis",stats:"180K seguidores",cta:"Ver cápsulas",ch:"♪",color:"#fe2c55",url:"https://www.tiktok.com/",desc:"Resúmenes de avistamientos recientes, desmentidos técnicos en 60 segundos y datos curiosos de ufología."},
    {name:"X",code:"CH-05",tag:"ALERTA TEMPRANA",handle:"@CDO_Oficial",stats:"62K seguidores",cta:"Seguir alertas",ch:"X",color:"#38bdf8",url:"https://x.com/",desc:"Monitoreo minuto a minuto, hilos de desclasificación aeroespacial, reportes ciudadanos y última hora."},
    {name:"Telegram",code:"CH-06",tag:"CANAL ENCRIPTADO",handle:"t.me/CazadoresOvnis",stats:"48K miembros activos",cta:"Entrar al canal",ch:"✈",color:"#229ed9",url:"https://telegram.org/",desc:"Canal de difusión inmediata con alertas de avistamientos por coordenadas, archivos PDF y avisos urgentes."}
  ],
  /* --- Membresías --- */
  plans: [
    {
      key:"comun",
      name:"Cuenta Gratis",
      code:"CRED-01",
      icon:"🛰️",
      price:"Gratis",
      period:"Acceso básico permanente",
      desc:"Ideal para entusiastas y observadores que inician su recorrido en la comunidad ufológica, con acceso al catálogo general de eventos y tienda táctica.",
      cta:"Crear cuenta gratis",
      items:[
        ["Registro y perfil de observador",1],
        ["Ver calendario de seminarios y tours",1],
        ["Comprar en la tienda oficial",1],
        ["15% descuento en tours y seminarios",0],
        ["Participar en investigaciones de campo",0],
        ["Archivo de casos desclasificados",0],
        ["Grabaciones de seminarios",0],
        ["Mapa de avistamientos",0],
        ["Foro privado de investigadores",0]
      ]
    },
    {
      key:"miembro",
      name:"Miembro Oficial",
      code:"CRED-VIP",
      icon:"🛸",
      price:"$29.000",
      period:"/ mes · COP",
      featured:1,
      desc:"Credencial de investigador activo con acceso irrestricto a expedientes clasificados, cartografía de anomalías en tiempo real y operaciones de campo.",
      cta:"Solicitar membresía oficial",
      items:[
        ["Registro y credencial verificada de miembro",1],
        ["Ver calendario de seminarios y tours",1],
        ["Comprar en la tienda oficial",1],
        ["15% descuento en tours y seminarios",1],
        ["Participar en investigaciones de campo",1],
        ["Archivo de casos desclasificados",1,1],
        ["Grabaciones de seminarios",1,1],
        ["Mapa de avistamientos",1,1],
        ["Foro privado de investigadores",1,1]
      ]
    }
  ],
  exclusive: ["📁 Archivo de casos desclasificados","🎥 Grabaciones de seminarios","🗺️ Mapa de avistamientos","💬 Foro privado de investigadores"],
  /* --- Datos iniciales de la consola --- */
  adminUsers: [
    {nombre:"Laura Gómez",correo:"laura@mail.com",categoria:"miembro"},
    {nombre:"Carlos Ruiz",correo:"carlos@mail.com",categoria:"comun"},
    {nombre:"Ana Torres",correo:"ana@mail.com",categoria:"miembro"}
  ]
};
