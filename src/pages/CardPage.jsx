import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CARDS, PUBLICATIONS } from '../data/cards'
import PublicationItem from '../components/PublicationItem'

const FILTERS = [
  { label: 'Todos', value: 'todos' },
  { label: 'Ofrezco', value: 'ofrezco' },
  { label: 'Busco', value: 'busco' },
]

export default function CardPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('todos')

  const card = CARDS.find(c => c.id === Number(id))
  const pubs = PUBLICATIONS[Number(id)] || []

  if (!card) {
    return (
      <div className="px-6 py-16 text-center text-zinc-400">
        <div className="text-4xl mb-3">😕</div>
        <div className="text-[14px]">Carta no encontrada.</div>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-[13px] text-[#C0392B] hover:underline"
        >
          Volver al inicio
        </button>
      </div>
    )
  }

  const filteredPubs =
    activeFilter === 'todos' ? pubs : pubs.filter(p => p.mode === activeFilter)

  const ofrecen = pubs.filter(p => p.mode === 'ofrezco').length
  const buscan = pubs.filter(p => p.mode === 'busco').length

  return (
    <div>
      {/* Header de la carta */}
      <div className="bg-white border-b border-zinc-200 px-6 py-5 flex gap-5 items-start">
        {/* Emoji / Imagen */}
        <div className="w-24 shrink-0 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200">
          <img
            src={card.image}
            alt={card.name}
            className="w-full h-full object-contain"
            style={{ backgroundColor: card.typeBg }}
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-1.5 text-[13px] text-zinc-400 hover:text-zinc-700 mb-3 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
            Volver
          </button>

          <h2 className="text-[20px] font-medium text-zinc-900">{card.name}</h2>
          <div className="text-[13px] text-zinc-500 mt-0.5">
            {card.set} · {card.number} · {card.rarity}
          </div>

          <div className="mt-2">
            <span
              className="text-[11px] px-2.5 py-[3px] rounded-full font-medium"
              style={{ backgroundColor: card.typeBg, color: card.typeColor }}
            >
              {card.type}
            </span>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-4">
            <div className="bg-zinc-50 rounded-lg px-4 py-2 text-center">
              <div className="text-[18px] font-medium text-zinc-900">{ofrecen}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">La ofrecen</div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-2 text-center">
              <div className="text-[18px] font-medium text-zinc-900">{buscan}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">La buscan</div>
            </div>
            <div className="bg-zinc-50 rounded-lg px-4 py-2 text-center">
              <div className="text-[18px] font-medium text-zinc-900">{pubs.length}</div>
              <div className="text-[11px] text-zinc-400 mt-0.5">Publicaciones</div>
            </div>
          </div>
        </div>
      </div>

      {/* Publicaciones */}
      <div className="px-6 py-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[15px] font-medium text-zinc-900">Publicaciones</h3>
          <div className="flex gap-1.5">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-3 py-1 rounded-full text-[12px] border transition-colors ${
                  activeFilter === f.value
                    ? 'bg-[#C0392B] border-[#C0392B] text-white'
                    : 'border-zinc-200 text-zinc-500 hover:text-zinc-800'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {filteredPubs.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            <div className="text-3xl mb-3">📭</div>
            <div className="text-[14px]">No hay publicaciones con este filtro.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredPubs.map(pub => (
              <PublicationItem key={pub.id} pub={pub} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
