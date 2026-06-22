import { useNavigate } from 'react-router-dom'

const STATS = [
  { val: '+340', label: 'Publicaciones activas' },
  { val: '+120', label: 'Coleccionistas registrados' },
  { val: '+80', label: 'Intercambios concretados' },
]

const STEPS = [
  {
    num: '1',
    title: 'Buscá la carta',
    desc: 'Explorá el catálogo y encontrá la carta que necesitás. Filtrá por set, tipo o rareza.',
    bg: 'bg-red-50/50',
    border: 'border-red-100'
  },
  {
    num: '2',
    title: 'Revisá las publicaciones',
    desc: 'Cada carta tiene su página con todas las publicaciones de usuarios que la ofrecen o la buscan.',
    bg: 'bg-blue-50/50',
    border: 'border-blue-100'
  },
  {
    num: '3',
    title: 'Contactá y acordá',
    desc: 'Escribile directamente al coleccionista, acordá el intercambio y listo. Sin comisiones.',
    bg: 'bg-emerald-50/50',
    border: 'border-emerald-100'
  },
]

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'Búsqueda específica',
    desc: 'Encontrá exactamente la carta que buscás filtrando por nombre, set, tipo o rareza.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
        <circle cx="12" cy="13" r="4"/>
      </svg>
    ),
    title: 'Fotos del estado real',
    desc: 'Cada publicación incluye fotos de la carta para que sepas exactamente qué estás recibiendo.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Contacto directo',
    desc: 'Sin intermediarios. Hablás directamente con el coleccionista y acordás el intercambio.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Sin comisiones',
    desc: 'El intercambio es entre vos y el otro coleccionista. La plataforma no cobra nada.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>
      </svg>
    ),
    title: 'Ofrezco y busco',
    desc: 'Publicá las cartas que tenés de más y las que necesitás. El sistema cruza las necesidades.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    title: 'Comunidad local',
    desc: 'Enfocado en Mar del Plata para que los intercambios sean fáciles de coordinar en persona.',
  },
]

const PREVIEW_CARDS = [
  { name: 'Charizard', set: 'Base Set', number: '4/102', image: '/images/cards/Charizard_(Base_Set_TCG).png', bg: '#FCEBEB', pubs: 7, type: 'Fuego' },
  { name: 'Pikachu', set: 'Promo', number: 'Special', image: '/images/cards/Pikachu_(Celebraciones_TCG).png', bg: '#FAEEDA', pubs: 9, type: 'Eléctrico' },
  { name: 'Venusaur', set: 'Base Set', number: '15/102', image: '/images/cards/1200px-Venusaur_(Wizards_Promo_TCG).png', bg: '#EAF3DE', pubs: 6, type: 'Planta' },
  { name: 'Mewtwo', set: 'Base Set', number: '10/102', image: '/images/cards/Mewtwo_29.webp', bg: '#EEEDFE', pubs: 5, type: 'Psíquico' },
]

const FAQS = [
  {
    q: '¿Tiene algún costo usar la plataforma?',
    a: 'No, es completamente gratuito. No cobramos comisiones ni cargos por publicar o contactar a otros coleccionistas.',
  },
  {
    q: '¿Solo funciona para Pokémon?',
    a: 'Por ahora sí. Estamos enfocados en Pokémon TCG, pero planeamos incorporar otros juegos de cartas en el futuro.',
  },
  {
    q: '¿Cómo sé que la carta está en el estado que dicen?',
    a: 'Cada publicación requiere fotos reales de la carta. Podés ver el estado antes de contactar al vendedor.',
  },
  {
    q: '¿Puedo publicar si quiero buscar una carta, no solo ofrecerla?',
    a: 'Sí, podés publicar tanto si querés ofrecer una carta como si la estás buscando. El sistema muestra ambos tipos.',
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="font-sans text-zinc-900 bg-zinc-50 overflow-x-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-white border-b border-zinc-200 px-8 sm:px-16 py-20 lg:py-28 overflow-hidden">
        
        {/* Glow ambient background bubbles */}
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-red-150 rounded-full mix-blend-multiply filter blur-3xl opacity-35 pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-blue-100/75 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none animate-pulse-slow" style={{ animationDelay: '3s' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.3px,transparent_1.3px)] [background-size:28px_28px] opacity-70 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Heading & Text */}
          <div className="lg:col-span-7 text-left flex flex-col items-start">
            <span className="inline-flex items-center gap-1.5 bg-[#FCEBEB] text-[#A32D2D] text-[12.5px] font-bold px-4 py-1.5 rounded-full mb-8 border border-red-200/50 shadow-sm animate-fade-in">
              <span className="w-1.5 h-1.5 bg-[#C0392B] rounded-full animate-ping"></span>
              Pokémon TCG · Mar del Plata
            </span>
            
            <h1 className="text-[44px] sm:text-[56px] font-black leading-[1.08] tracking-tight text-zinc-950 mb-6 max-w-xl">
              La carta que te falta está esperando a alguien{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C0392B] to-[#E05638] inline-block">
                como vos
              </span>
            </h1>
            
            <p className="text-[16px] sm:text-[17.5px] text-zinc-550 max-w-lg mb-10 leading-relaxed font-medium">
              El primer catálogo local de coleccionistas. Intercambiá tus cartas Pokémon de forma directa, en persona y totalmente sin comisiones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate('/home')}
                className="bg-[#C0392B] hover:bg-[#A93226] hover:scale-102 hover:shadow-xl hover:shadow-red-500/20 active:scale-98 text-white rounded-xl px-8 py-4 text-[15px] font-bold transition-all duration-200 text-center shadow-md"
              >
                Ver cartas disponibles
              </button>
              <button
                onClick={() => document.getElementById('como-funciona').scrollIntoView({ behavior: 'smooth' })}
                className="border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 rounded-xl px-8 py-4 text-[15px] font-bold transition-all duration-200 text-center shadow-sm"
              >
                Cómo funciona
              </button>
            </div>
          </div>

          {/* Right Column: Floating Showcase Cards */}
          {/* Posicionadas con top/left/right/bottom absolutos para evitar conflictos de transform */}
          <div className="lg:col-span-5 relative flex justify-center items-center h-[350px] lg:h-[450px]">
            {/* Ambient Backlight for the cards */}
            <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#C0392B]/10 to-amber-500/10 filter blur-3xl animate-pulse"></div>

            {/* Back Floating Card: Blastoise */}
            <div className="absolute top-12 left-4 sm:left-12 animate-float-delayed z-10">
              <div className="w-[170px] sm:w-[190px] aspect-[3/4] bg-[#E6F1FB] border border-blue-200 rounded-2xl p-3 shadow-xl -rotate-12 hover:-rotate-6 hover:scale-105 hover:shadow-2xl transition-all duration-305 group cursor-pointer select-none">
                <div className="w-full h-full border border-blue-150/40 rounded-xl bg-white/70 overflow-hidden flex flex-col p-1.5">
                  <img src="/images/cards/1200px-Blastoise_(Base_Set_TCG).png" alt="Blastoise" className="w-full h-[82%] object-contain rounded-lg group-hover:scale-102 transition-transform duration-300" />
                  <div className="flex justify-between items-center mt-2 px-1">
                    <span className="font-bold text-[11px] text-blue-900">Blastoise</span>
                    <span className="text-[8px] bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-bold">Holo</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Front Floating Card: Charizard */}
            <div className="absolute bottom-12 right-4 sm:right-12 animate-float z-20">
              <div className="w-[190px] sm:w-[210px] aspect-[3/4] bg-[#FCEBEB] border border-red-200 rounded-2xl p-3 shadow-2xl rotate-6 hover:rotate-12 hover:scale-105 hover:shadow-3xl transition-all duration-305 group cursor-pointer select-none">
                {/* Glossy reflection shimmer overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
                
                <div className="w-full h-full border border-red-150/40 rounded-xl bg-white/80 overflow-hidden flex flex-col p-1.5 relative">
                  <img src="/images/cards/Charizard_(Base_Set_TCG).png" alt="Charizard" className="w-full h-[82%] object-contain rounded-lg group-hover:scale-102 transition-transform duration-300" />
                  <div className="flex justify-between items-center mt-2.5 px-1">
                    <span className="font-extrabold text-[12px] text-red-950">Charizard</span>
                    <span className="text-[8px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">Holo Rara</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-10 right-0 lg:right-[-20px] bg-zinc-950 text-white rounded-2xl px-4 py-2 flex items-center gap-2 shadow-2xl animate-bounce text-[12.5px] font-bold border border-zinc-800/80">
              ¡Match al instante!
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION - NO EMOJIS */}
      <section className="px-8 py-10 max-w-6xl mx-auto -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 text-center shadow-md hover:shadow-lg hover:border-zinc-300 transition-all duration-200">
              <div className="text-[32px] font-black text-[#C0392B] leading-none">{s.val}</div>
              <div className="text-[13px] text-zinc-550 font-bold mt-2.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="px-8 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[11px] uppercase tracking-widest text-[#C0392B] font-extrabold">Proceso</span>
          <h2 className="text-[28px] sm:text-[32px] font-black text-zinc-950 mt-1.5">Tres pasos para cerrar un intercambio</h2>
          <p className="text-[14px] text-zinc-400 mt-2.5 max-w-md mx-auto">Navegá de forma intuitiva, contactá rápido y concretá en persona de manera segura.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step, i) => (
            <div 
              key={i} 
              className={`border rounded-2xl p-7 bg-white hover:shadow-xl hover:border-zinc-350 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group`}
            >
              <div className={`w-9.5 h-9.5 rounded-xl ${step.bg} ${step.border} border text-[#C0392B] text-[15px] font-black flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200`}>
                {step.num}
              </div>
              <h3 className="text-[15.5px] font-bold text-zinc-900 mb-2.5">{step.title}</h3>
              <p className="text-[13.5px] text-zinc-550 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-zinc-100/60 border-y border-zinc-200 px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-widest text-[#C0392B] font-extrabold">Beneficios</span>
            <h2 className="text-[28px] sm:text-[32px] font-black text-zinc-950 mt-1.5">Pensado para coleccionistas reales</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 flex gap-4.5 items-start shadow-sm hover:border-zinc-300 hover:shadow-md transition-all duration-200">
                <div className="w-10 h-10 rounded-xl bg-[#FCEBEB] text-[#C0392B] flex items-center justify-center shrink-0 border border-red-100">
                  {f.icon}
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-zinc-900 mb-1.5">{f.title}</h3>
                  <p className="text-[13px] text-zinc-550 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREVIEW CARTAS */}
      <section className="px-8 py-20 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end mb-12 gap-4">
          <div className="text-center sm:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#C0392B] font-extrabold">Catálogo</span>
            <h2 className="text-[28px] sm:text-[32px] font-black text-zinc-955 mt-1.5">Cartas con más actividad esta semana</h2>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="border border-zinc-250 bg-white hover:bg-zinc-50 hover:border-zinc-355 text-[#C0392B] font-bold rounded-xl px-6 py-3 text-[13.5px] transition-all duration-200 shadow-sm"
          >
            Ver todas las cartas
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {PREVIEW_CARDS.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate('/home')}
              className="bg-white border border-zinc-200 rounded-2xl overflow-hidden cursor-pointer hover:border-zinc-300 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              <div
                className="w-full aspect-[3/4] flex items-center justify-center relative transition-colors"
                style={{ backgroundColor: card.bg }}
              >
                {/* Shiny gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <img src={card.image} alt={card.name} className="w-full h-full object-contain p-3.5 group-hover:scale-104 transition-transform duration-300" />
                <div className="absolute top-3 right-3 bg-[#C0392B] text-white text-[9.5px] px-2 py-[2.5px] rounded-md font-bold shadow-sm">
                  {card.type === 'Promo' ? 'Promo' : 'Holo'}
                </div>
              </div>
              
              <div className="px-6 py-4">
                <div className="text-[14px] font-bold text-zinc-900 truncate">{card.name}</div>
                <div className="text-[12px] text-zinc-400 mt-1">{card.set} · {card.number}</div>
              </div>
              <div className="px-6 py-3.5 border-t border-zinc-100 text-[11.5px] text-zinc-555 bg-zinc-50/50 flex justify-between items-center">
                <span>Publicaciones:</span>
                <span className="text-[#C0392B] font-bold">{card.pubs}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-zinc-100/60 border-t border-zinc-200 px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[11px] uppercase tracking-widest text-[#C0392B] font-extrabold">Preguntas frecuentes</span>
            <h2 className="text-[28px] sm:text-[32px] font-black text-zinc-950 mt-1.5">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-4.5">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[14.5px] font-bold text-zinc-900 mb-2">{faq.q}</h3>
                <p className="text-[13.5px] text-zinc-550 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-24 bg-white text-center relative overflow-hidden border-t border-zinc-200">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-45 pointer-events-none"></div>
        
        <div className="relative z-10 max-w-lg mx-auto">
          <h2 className="text-[28px] font-black text-zinc-955 mb-4">
            ¿Tenés cartas repetidas? ¿Te falta alguna?
          </h2>
          <p className="text-[14.5px] text-zinc-550 mb-9 leading-relaxed">
            Publicá en menos de un minuto y conectate con coleccionistas locales en Mar del Plata de forma 100% gratuita.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="bg-[#C0392B] hover:bg-[#A93226] hover:scale-102 hover:shadow-xl hover:shadow-red-500/20 active:scale-98 text-white rounded-xl px-9 py-4 text-[15px] font-bold transition-all duration-200 shadow-md"
          >
            Empezar ahora
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-50 border-t border-zinc-200 px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-[12.5px] text-zinc-400 font-semibold">© 2026 Intercambios TCG · Mar del Plata</div>
        <div className="flex gap-6">
          <a href="#" className="text-[12.5px] text-zinc-400 hover:text-zinc-600 no-underline transition-colors font-medium">Términos</a>
          <a href="#" className="text-[12.5px] text-zinc-400 hover:text-zinc-600 no-underline transition-colors font-medium">Privacidad</a>
          <a href="#" className="text-[12.5px] text-zinc-400 hover:text-zinc-600 no-underline transition-colors font-medium">Contacto</a>
        </div>
      </footer>

    </div>
  )
}
