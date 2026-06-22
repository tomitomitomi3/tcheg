import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CARDS } from '../data/cards'
import PokeCard from '../components/PokeCard'
import { PUBLICATIONS } from '../data/cards'

const TABS = ['Todas las cartas', 'Con publicaciones', 'Más buscadas', 'Recientes']

const TYPES = ['Fuego', 'Agua', 'Planta', 'Psíquico', 'Eléctrico', 'Dragón', 'Lucha', 'Fantasma']
const RARITIES = ['Holo Rara', 'Rara', 'Promo']
const SETS = ['Base Set', 'Fossil', 'Promo']

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const [search, setSearch] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  
  // Filter states
  const [selectedType, setSelectedType] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('')
  const [selectedSet, setSelectedSet] = useState('')

  // Filter logic
  const filteredCards = CARDS.filter(card => {
    const matchesSearch =
      card.name.toLowerCase().includes(search.toLowerCase()) ||
      card.set.toLowerCase().includes(search.toLowerCase()) ||
      card.type.toLowerCase().includes(search.toLowerCase())

    if (!matchesSearch) return false

    // Category filter tabs
    if (activeTab === 1) {
      const cardPubs = PUBLICATIONS[card.id] || []
      if (cardPubs.length === 0) return false
    }
    if (activeTab === 2) {
      const cardPubs = PUBLICATIONS[card.id] || []
      const hasSeekPub = cardPubs.some(p => p.mode === 'busco')
      if (!hasSeekPub) return false
    }

    // Dropdown filters
    if (selectedType && card.type !== selectedType) return false
    if (selectedRarity && card.rarity !== selectedRarity) return false
    if (selectedSet && card.set !== selectedSet) return false

    return true
  })

  // Sorting
  let sortedCards = [...filteredCards]
  
  if (activeTab === 2) {
    // Sort by number of seekers descending
    sortedCards.sort((a, b) => {
      const buscaA = (PUBLICATIONS[a.id] || []).filter(p => p.mode === 'busco').length
      const buscaB = (PUBLICATIONS[b.id] || []).filter(p => p.mode === 'busco').length
      return buscaB - buscaA
    })
  } else if (activeTab === 3) {
    // Recientes tab: simulate by sorting by ID descending
    sortedCards.sort((a, b) => b.id - a.id)
  }

  const isAnyFilterActive = selectedType || selectedRarity || selectedSet

  const handleClearFilters = () => {
    setSelectedType('')
    setSelectedRarity('')
    setSelectedSet('')
  }

  return (
    <div className="bg-zinc-55/30 min-h-screen">
      {/* Hero / Search */}
      <div className="bg-white border-b border-zinc-200 px-8 pt-8 pb-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-[22px] font-bold text-zinc-950">Encontrá la carta que te falta</h1>
          <p className="text-[14px] text-zinc-500 mt-1">
            Conectate con otros coleccionistas y cerrá intercambios directamente.
          </p>
          
          {/* Search input & Filter toggle button */}
          <div className="flex gap-2.5 mt-5">
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
                className="w-full pl-9 pr-4 py-2.5 border border-zinc-200 rounded-xl bg-zinc-50 text-[14px] text-zinc-800 placeholder-zinc-400 outline-none focus:border-[#C0392B] focus:bg-white transition-colors"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(prev => !prev)}
              className={`flex items-center gap-2 px-5 border rounded-xl text-[13px] transition-colors font-semibold ${
                showFilters || isAnyFilterActive
                  ? 'border-[#C0392B] text-[#C0392B] bg-red-50/20 shadow-sm'
                  : 'border-zinc-200 text-zinc-650 bg-zinc-50 hover:bg-zinc-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/>
              </svg>
              Filtros {isAnyFilterActive && '•'}
            </button>
          </div>

          {/* Collapsible Filter Panel */}
          {showFilters && (
            <div className="mt-3.5 bg-zinc-50/50 border border-zinc-200 rounded-xl p-4 animate-fade-in">
              <div className="flex items-center justify-between mb-3 border-b border-zinc-200/60 pb-2">
                <span className="text-[12px] font-semibold text-zinc-750">Filtros Avanzados</span>
                {isAnyFilterActive && (
                  <button 
                    onClick={handleClearFilters}
                    className="text-[11px] text-[#C0392B] hover:underline font-semibold"
                  >
                    Limpiar todos
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Type Filter */}
                <div>
                  <label htmlFor="type-filter" className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Tipo de Energía</label>
                  <select
                    id="type-filter"
                    value={selectedType}
                    onChange={e => setSelectedType(e.target.value)}
                    className="w-full border border-zinc-250 rounded-lg p-2.5 text-[12.5px] text-zinc-700 bg-white outline-none focus:border-[#C0392B]"
                  >
                    <option value="">Todos los tipos</option>
                    {TYPES.map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                {/* Rarity Filter */}
                <div>
                  <label htmlFor="rarity-filter" className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Rareza</label>
                  <select
                    id="rarity-filter"
                    value={selectedRarity}
                    onChange={e => setSelectedRarity(e.target.value)}
                    className="w-full border border-zinc-250 rounded-lg p-2.5 text-[12.5px] text-zinc-700 bg-white outline-none focus:border-[#C0392B]"
                  >
                    <option value="">Todas las rarezas</option>
                    {RARITIES.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Set Filter */}
                <div>
                  <label htmlFor="set-filter" className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">Set / Expansión</label>
                  <select
                    id="set-filter"
                    value={selectedSet}
                    onChange={e => setSelectedSet(e.target.value)}
                    className="w-full border border-zinc-250 rounded-lg p-2.5 text-[12.5px] text-zinc-700 bg-white outline-none focus:border-[#C0392B]"
                  >
                    <option value="">Todas las expansiones</option>
                    {SETS.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Active Filter Badges */}
          {isAnyFilterActive && (
            <div className="flex items-center gap-1.5 flex-wrap mt-3.5">
              <span className="text-[11.5px] text-zinc-400 font-semibold">Activos:</span>
              {selectedType && (
                <span className="bg-zinc-100 border border-zinc-205 rounded-full px-3 py-0.5 text-[11px] font-semibold text-zinc-650 flex items-center gap-1 shadow-sm">
                  Tipo: {selectedType}
                  <button onClick={() => setSelectedType('')} className="hover:text-red-650 font-bold ml-1 text-[11px]">✕</button>
                </span>
              )}
              {selectedRarity && (
                <span className="bg-zinc-100 border border-zinc-205 rounded-full px-3 py-0.5 text-[11px] font-semibold text-zinc-650 flex items-center gap-1 shadow-sm">
                  Rareza: {selectedRarity}
                  <button onClick={() => setSelectedRarity('')} className="hover:text-red-650 font-bold ml-1 text-[11px]">✕</button>
                </span>
              )}
              {selectedSet && (
                <span className="bg-zinc-100 border border-zinc-205 rounded-full px-3 py-0.5 text-[11px] font-semibold text-zinc-650 flex items-center gap-1 shadow-sm">
                  Set: {selectedSet}
                  <button onClick={() => setSelectedSet('')} className="hover:text-red-650 font-bold ml-1 text-[11px]">✕</button>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-zinc-200 px-8 flex gap-0">
        <div className="max-w-7xl mx-auto w-full flex">
          {TABS.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3.5 text-[13.5px] border-b-2 bg-transparent transition-colors font-medium ${
                activeTab === i
                  ? 'border-[#C0392B] text-[#C0392B] font-bold'
                  : 'border-transparent text-zinc-500 hover:text-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* THREE COLUMN GRID LAYOUT WITH ADVERTISING SPACES */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex gap-6 items-start">
        
        {/* Left Advertising Column (Hidden on screens smaller than xl) */}
        <aside className="w-52 shrink-0 hidden xl:flex flex-col gap-4.5 sticky top-20">
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-1">Publicidad</div>
          
          {/* Ad Card 1 */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
            <div className="w-full h-24 bg-red-50 rounded-xl overflow-hidden flex items-center justify-center border border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C0392B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <div>
              <span className="text-[9.5px] uppercase tracking-wider text-[#A32D2D] font-bold block mb-1">Dragon Shield</span>
              <h4 className="font-bold text-zinc-900 text-[12px] leading-tight">Folios Oficiales</h4>
              <p className="text-[10.5px] text-zinc-450 mt-1 leading-snug">Protegé tus holos raras. 10% OFF usando el código <strong className="text-zinc-700">TCGMAR</strong>.</p>
            </div>
            <a 
              href="https://www.dragonshield.com" 
              target="_blank" 
              rel="noreferrer"
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-1.5 text-center text-[10.5px] font-bold transition-colors no-underline block"
            >
              Ver Protectores
            </a>
          </div>

          {/* Ad Card 2 */}
          <div className="bg-zinc-900/5 border border-zinc-200/60 rounded-2xl p-4 flex flex-col gap-2.5">
            <span className="text-[9px] uppercase tracking-wider text-zinc-400 font-bold block">Patrocinado</span>
            <h4 className="font-bold text-zinc-850 text-[12px] leading-tight">Torneo Regional TCG</h4>
            <p className="text-[10.5px] text-zinc-500 leading-snug">Inscripciones abiertas en Mar del Plata. ¡Sorteo de Booster Boxes!</p>
            <span className="text-[10px] text-[#C0392B] font-bold cursor-pointer hover:underline">Saber más →</span>
          </div>
        </aside>

        {/* Center Main Content Grid */}
        <main className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-widest text-zinc-400 font-bold mb-4">
            Cartas disponibles — {sortedCards.length} resultados
          </div>

          {sortedCards.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-2xl text-center py-16 text-zinc-400">
              <div className="text-4xl mb-3">🔍</div>
              <div className="text-[14px] font-medium">No se encontraron cartas con ese criterio.</div>
              {isAnyFilterActive && (
                <button 
                  onClick={handleClearFilters}
                  className="mt-3 text-[13px] text-[#C0392B] hover:underline font-semibold"
                >
                  Limpiar filtros avanzados
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4">
              {sortedCards.map(card => (
                <PokeCard key={card.id} card={card} />
              ))}
            </div>
          )}
        </main>

        {/* Right Advertising Column (Hidden on screens smaller than lg) */}
        <aside className="w-52 shrink-0 hidden lg:flex flex-col gap-4.5 sticky top-20">
          <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold px-1">Patrocinadores</div>
          
          {/* Ad Card 3 */}
          <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-3">
            <div className="w-full h-24 bg-blue-50 rounded-xl overflow-hidden flex items-center justify-center border border-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="13" x2="15" y2="13"/>
              </svg>
            </div>
            <div>
              <span className="text-[9.5px] uppercase tracking-wider text-[#185FA5] font-bold block mb-1">MDP Geek Store</span>
              <h4 className="font-bold text-zinc-900 text-[12px] leading-tight">MDP Geek Store</h4>
              <p className="text-[10.5px] text-zinc-450 mt-1 leading-snug">Presentá tu perfil de la app en caja y obtené <strong className="text-zinc-700">10% de descuento</strong> en sobres.</p>
            </div>
            <Link 
              to="/profile" 
              className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg py-1.5 text-center text-[10.5px] font-bold transition-colors no-underline block"
            >
              Mostrar Perfil
            </Link>
          </div>

          {/* Ad Card 4 */}
          <div className="bg-gradient-to-br from-red-500/5 to-amber-500/5 border border-zinc-250 rounded-2xl p-4 flex flex-col gap-2">
            <span className="text-[9.5px] uppercase tracking-wider text-amber-600 font-bold block">PSA Argentina</span>
            <h4 className="font-bold text-zinc-850 text-[12px] leading-tight">Graduá tus Joyas</h4>
            <p className="text-[10.5px] text-zinc-500 leading-snug">Envíos consolidados a PSA desde la costa. Asegurá el valor de tus cartas.</p>
            <span className="text-[10px] text-[#C0392B] font-bold cursor-pointer hover:underline">Cotizar Grading →</span>
          </div>
        </aside>

      </div>
    </div>
  )
}
