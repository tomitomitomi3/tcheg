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
  },
  {
    num: '2',
    title: 'Revisá las publicaciones',
    desc: 'Cada carta tiene su página con todas las publicaciones de usuarios que la ofrecen o la buscan.',
  },
  {
    num: '3',
    title: 'Contactá y acordá',
    desc: 'Escribile directamente al coleccionista, acorden el intercambio y listo. Sin comisiones.',
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
    desc: 'Sin intermediarios. Hablás directamente con el coleccionista y acordán el intercambio.',
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
  { name: 'Charizard', set: 'Base Set', number: '4/102', image: '/images/cards/Charizard_(Base_Set_TCG).png', bg: '#FCEBEB', pubs: 7 },
  { name: 'Pikachu', set: 'Promo', number: 'Special', image: '/images/cards/Pikachu_(Celebraciones_TCG).png', bg: '#FAEEDA', pubs: 9 },
  { name: 'Venusaur', set: 'Base Set', number: '15/102', image: '/images/cards/1200px-Venusaur_(Wizards_Promo_TCG).png', bg: '#EAF3DE', pubs: 6 },
  { name: 'Mewtwo', set: 'Base Set', number: '10/102', image: '/images/cards/Gengar_(151_TCG).png', bg: '#EEEDFE', pubs: 5 },
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
    <div className="font-sans text-zinc-900">

      {/* HERO */}
      <section className="bg-white border-b border-zinc-200 px-8 pt-20 pb-16 text-center">
        <span className="inline-block bg-[#FCEBEB] text-[#A32D2D] text-[12px] font-medium px-4 py-1 rounded-full mb-6">
          Pokémon TCG · Mar del Plata
        </span>
        <h1 className="text-[36px] font-medium leading-tight max-w-xl mx-auto mb-4">
          La carta que te falta está esperando a alguien{' '}
          <span className="text-[#C0392B]">como vos</span>
        </h1>
        <p className="text-[15px] text-zinc-500 max-w-md mx-auto mb-8 leading-relaxed">
          El lugar donde coleccionistas se encuentran para intercambiar cartas Pokémon de forma simple, directa y sin intermediarios.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => navigate('/home')}
            className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg px-6 py-2.5 text-[14px] transition-colors"
          >
            Ver cartas disponibles
          </button>
          <button
            onClick={() => document.getElementById('como-funciona').scrollIntoView({ behavior: 'smooth' })}
            className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg px-6 py-2.5 text-[14px] transition-colors"
          >
            Cómo funciona
          </button>
        </div>
      </section>

      {/* STATS */}
      <div className="bg-zinc-50 border-b border-zinc-200 grid grid-cols-3">
        {STATS.map((s, i) => (
          <div key={i} className="py-6 text-center border-r border-zinc-200 last:border-r-0">
            <div className="text-[24px] font-medium text-[#C0392B]">{s.val}</div>
            <div className="text-[12px] text-zinc-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="px-8 py-14 bg-white border-b border-zinc-200">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Proceso</div>
        <h2 className="text-[22px] font-medium mb-8">Tres pasos para cerrar un intercambio</h2>
        <div className="grid grid-cols-3 gap-5">
          {STEPS.map((step, i) => (
            <div key={i} className="border border-zinc-200 rounded-xl p-6">
              <div className="w-8 h-8 rounded-lg bg-[#FCEBEB] text-[#A32D2D] text-[13px] font-medium flex items-center justify-center mb-4">
                {step.num}
              </div>
              <h3 className="text-[14px] font-medium mb-2">{step.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 py-14 bg-zinc-50 border-b border-zinc-200">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Características</div>
        <h2 className="text-[22px] font-medium mb-8">Pensado para coleccionistas</h2>
        <div className="grid grid-cols-2 gap-3">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-white border border-zinc-200 rounded-xl p-5 flex gap-4 items-start">
              <div className="w-9 h-9 rounded-lg bg-[#FCEBEB] text-[#C0392B] flex items-center justify-center shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="text-[13px] font-medium mb-1">{f.title}</h3>
                <p className="text-[12px] text-zinc-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PREVIEW CARTAS */}
      <section className="px-8 py-14 bg-white border-b border-zinc-200">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Catálogo</div>
        <h2 className="text-[22px] font-medium mb-8">Cartas con más actividad esta semana</h2>
        <div className="grid grid-cols-4 gap-3">
          {PREVIEW_CARDS.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate('/home')}
              className="border border-zinc-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#C0392B] transition-colors"
            >
              <div
                className="w-full aspect-[3/4] flex items-center justify-center text-4xl relative"
                style={{ backgroundColor: card.bg }}
              >
                <img src={card.image} alt={card.name} className="w-full h-full object-contain p-2" />
                <div className="absolute top-2 right-2 bg-[#C0392B] text-white text-[9px] px-2 py-[2px] rounded">
                  Holo
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="text-[12px] font-medium">{card.name}</div>
                <div className="text-[10px] text-zinc-400 mt-0.5">{card.set} · {card.number}</div>
              </div>
              <div className="px-3 py-2 border-t border-zinc-100 text-[10px] text-zinc-500">
                <span className="text-[#C0392B] font-medium">{card.pubs}</span> publicaciones
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/home')}
            className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 rounded-lg px-6 py-2.5 text-[13px] transition-colors"
          >
            Ver todas las cartas
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-14 bg-zinc-50 border-b border-zinc-200">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-1">Preguntas frecuentes</div>
        <h2 className="text-[22px] font-medium mb-8">Lo que más nos preguntan</h2>
        <div className="divide-y divide-zinc-200 border-t border-zinc-200">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-5">
              <div className="text-[14px] font-medium mb-2">{faq.q}</div>
              <div className="text-[13px] text-zinc-500 leading-relaxed">{faq.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-8 py-16 bg-white text-center">
        <h2 className="text-[22px] font-medium mb-3">
          ¿Tenés cartas de más? ¿Te falta alguna?
        </h2>
        <p className="text-[14px] text-zinc-500 mb-8">
          Publicá en menos de un minuto y conectate con coleccionistas de Mar del Plata.
        </p>
        <button
          onClick={() => navigate('/home')}
          className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg px-8 py-3 text-[14px] transition-colors"
        >
          Empezar ahora
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-zinc-50 border-t border-zinc-200 px-8 py-5 flex items-center justify-between">
        <div className="text-[12px] text-zinc-400">© 2025 Intercambios TCG · Mar del Plata</div>
        <div className="flex gap-6">
          <a href="#" className="text-[12px] text-zinc-400 hover:text-zinc-600 no-underline">Términos</a>
          <a href="#" className="text-[12px] text-zinc-400 hover:text-zinc-600 no-underline">Privacidad</a>
          <a href="#" className="text-[12px] text-zinc-400 hover:text-zinc-600 no-underline">Contacto</a>
        </div>
      </footer>

    </div>
  )
}
