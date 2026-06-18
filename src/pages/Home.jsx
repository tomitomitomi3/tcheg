import { useState } from 'react'
import { CARDS } from '../data/cards'
import PokeCard from '../components/PokeCard'
import { PUBLICATIONS } from '../data/cards'

const TABS = ['Todas las cartas', 'Con publicaciones', 'Más buscadas', 'Recientes']

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')

  const filteredCards = CARDS.filter(card => {
    const matchesSearch =
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.set.toLowerCase().includes(search.toLowerCase()) ||
      card.type.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    if (activeTab === 1) {
      return (PUBLICATIONS[card.id] || []).length > 0
    }
    if (activeTab === 2) {
      const pubs = PUBLICATIONS[card.id] || []
      return pubs.filter(p => p.mode === 'busco').length > 0
    }
    return true
  })

  // Para "Más buscadas", ordenar por cantidad de publicaciones tipo busco
  const sortedCards =
    activeTab === 2
      ? [...filteredCards].sort((a, b) => {
          const buscaA = (PUBLICATIONS[a.id] || []).filter(p => p.mode === 'busco').length
          const buscaB = (PUBLICATIONS[b.id] || []).filter(p => p.mode === 'busco').length
          return buscaB - buscaA
        })
      : filteredCards

  return (
    <div>
      {/* Hero / Search */}
      <div className="bg-white border-b border-zinc-200 px-6 pt-8 pb-5">
        <h1 className="text-[22px] font-medium text-zinc-900">Encontrá la carta que te falta</h1>
        <p className="text-[14px] text-zinc-500 mt-1">
          Conectate con otros coleccionistas y cerrá intercambios directamente.
        </p>
        <div className="flex gap-2 mt-5">
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
              xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar carta, set o tipo..."
              className="w-full pl-9 pr-4 py-2 border border-zinc-200 rounded-lg bg-zinc-50 text-[14px] text-zinc-800 placeholder-zinc-400 outline-none focus:border-[#C0392B] focus:bg-white transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 border border-zinc-200 rounded-lg text-[13px] text-zinc-600 bg-zinc-50 hover:bg-zinc-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
            </svg>
            Filtros
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-zinc-200 px-6 flex gap-0">
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-3 text-[13px] border-b-2 bg-transparent transition-colors ${
              activeTab === i
                ? 'border-[#C0392B] text-[#C0392B] font-medium'
                : 'border-transparent text-zinc-500 hover:text-zinc-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="px-6 py-5">
        <div className="text-[11px] uppercase tracking-widest text-zinc-400 mb-4">
          Cartas disponibles — {sortedCards.length} resultados
        </div>

        {sortedCards.length === 0 ? (
          <div className="text-center py-16 text-zinc-400">
            <div className="text-4xl mb-3">🔍</div>
            <div className="text-[14px]">No se encontraron cartas con ese criterio.</div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {sortedCards.map(card => (
              <PokeCard key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
