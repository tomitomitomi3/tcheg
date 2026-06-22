import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CARDS } from '../data/cards'

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('publicaciones') // 'publicaciones' | 'carpeta' | 'deseadas'
  
  // Local state to simulate active/completed publications
  const [userPubs, setUserPubs] = useState([
    {
      id: 'p1-7',
      cardId: 1, // Charizard
      mode: 'ofrezco',
      condition: 'Regular',
      note: 'Charizard usado pero completo. Sin rayones en el arte, solo en el borde.',
      wants: ['Cualquier holo Base Set'],
      time: 'hace 1s',
      status: 'active' // 'active' | 'completed'
    },
    {
      id: 'p4-3-user',
      cardId: 4, // Pikachu Promo
      mode: 'busco',
      condition: null,
      note: 'Busco el Pikachu promo del 2004 en buen estado. Tengo repetidas de Jungle.',
      wants: ['Cartas de Jungle'],
      time: 'hace 2d',
      status: 'active'
    }
  ])

  // Mock folder (binder) cards
  const [binderCards] = useState([
    { id: 3, name: 'Blastoise', set: 'Base Set', image: '/images/cards/1200px-Blastoise_(Base_Set_TCG).png', typeBg: '#E6F1FB' },
    { id: 6, name: 'Dragonite', set: 'Fossil', image: '/images/cards/290.avif', typeBg: '#E1F5EE' },
    { id: 8, name: 'Machamp', set: 'Base Set', image: '/images/cards/Machamp_TCG.webp', typeBg: '#FAECE7' }
  ])

  // Mock wishlist cards
  const [wishlistCards] = useState([
    { id: 2, name: 'Mewtwo', set: 'Base Set', image: '/images/cards/Mewtwo_29.webp', typeBg: '#EEEDFE' },
    { id: 7, name: 'Venusaur', set: 'Base Set', image: '/images/cards/1200px-Venusaur_(Wizards_Promo_TCG).png', typeBg: '#EAF3DE' }
  ])

  const handleCompletePub = (id) => {
    setUserPubs(prev => prev.map(p => p.id === id ? { ...p, status: 'completed' } : p))
  }

  const handleDeletePub = (id) => {
    setUserPubs(prev => prev.filter(p => p.id !== id))
  }

  // Get card details for rendering
  const getCardDetails = (cardId) => {
    return CARDS.find(c => c.id === cardId) || {}
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Profile Header Card */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full bg-[#E1F5EE] text-[#0F6E56] font-bold text-2xl flex items-center justify-center border-2 border-white shadow-md ring-4 ring-[#E1F5EE]/40">
          TB
        </div>
        
        {/* User Details */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h2 className="text-[20px] font-bold text-zinc-900">Tomás B.</h2>
            <span className="bg-[#EAF3DE] text-[#3B6D11] text-[10.5px] font-medium px-2 py-0.5 rounded-full self-center">
              Coleccionista Verificado
            </span>
          </div>
          <p className="text-[12.5px] text-zinc-500 mt-1">Mar del Plata, Buenos Aires · Miembro desde hace 1 año</p>
          
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            <div className="flex items-center gap-1.5 text-[13px] text-zinc-700">
              <span className="text-[#C0392B] font-semibold">{userPubs.filter(p => p.status === 'active').length}</span> Activas
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 self-center"></div>
            <div className="flex items-center gap-1.5 text-[13px] text-zinc-700">
              <span className="text-[#C0392B] font-semibold">14</span> Concretados
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 self-center"></div>
            <div className="flex items-center gap-1.5 text-[13px] text-zinc-700">
              <span className="text-amber-500 font-semibold">⭐ 4.9</span> (24 Valoraciones)
            </div>
          </div>
        </div>

        {/* Profile Quick Settings (Mock) */}
        <button className="border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-[13px] font-medium px-4 py-2 rounded-lg transition-colors shrink-0">
          Editar Perfil
        </button>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-200 mb-6 bg-white rounded-xl p-1 border">
        <button
          onClick={() => setActiveTab('publicaciones')}
          className={`flex-1 py-2.5 text-[13px] font-medium rounded-lg flex justify-center items-center gap-2 transition-all ${
            activeTab === 'publicaciones'
              ? 'bg-[#C0392B] text-white shadow-sm font-semibold'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
          }`}
        >
          Mis Publicaciones
        </button>
        <button
          onClick={() => setActiveTab('carpeta')}
          className={`flex-1 py-2.5 text-[13px] font-medium rounded-lg flex justify-center items-center gap-2 transition-all ${
            activeTab === 'carpeta'
              ? 'bg-[#C0392B] text-white shadow-sm font-semibold'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
          }`}
        >
          Mi Carpeta (Repetidas)
        </button>
        <button
          onClick={() => setActiveTab('deseadas')}
          className={`flex-1 py-2.5 text-[13px] font-medium rounded-lg flex justify-center items-center gap-2 transition-all ${
            activeTab === 'deseadas'
              ? 'bg-[#C0392B] text-white shadow-sm font-semibold'
              : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
          }`}
        >
          Mi Lista de Deseos
        </button>
      </div>

      {/* Tab Panel: Mis Publicaciones */}
      {activeTab === 'publicaciones' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-zinc-900 text-[15px]">Administrá tus publicaciones</h3>
            <span className="text-[12px] text-zinc-500">{userPubs.length} creadas</span>
          </div>

          {userPubs.length === 0 ? (
            <div className="bg-white border border-zinc-200 rounded-2xl p-12 text-center text-zinc-400">
              <div className="text-4xl mb-3">📭</div>
              <p className="text-[13.5px]">No tenés publicaciones activas en este momento.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {userPubs.map(pub => {
                const card = getCardDetails(pub.cardId)
                const isOfrezco = pub.mode === 'ofrezco'
                return (
                  <div key={pub.id} className="bg-white border border-zinc-200 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 items-start relative overflow-hidden transition-all hover:border-zinc-300 shadow-sm">
                    {/* Completion Watermark/Overlay */}
                    {pub.status === 'completed' && (
                      <div className="absolute inset-0 bg-white/70 backdrop-blur-[0.5px] z-10 flex items-center justify-center">
                        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transform -rotate-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span className="font-bold text-[13px] uppercase tracking-wide">Intercambio Concretado</span>
                        </div>
                      </div>
                    )}

                    {/* Card Thumbnail */}
                    <div 
                      onClick={() => navigate(`/card/${card.id}`)}
                      className="w-16 sm:w-20 shrink-0 aspect-[3/4] rounded-xl overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:scale-102 transition-transform" 
                      style={{ backgroundColor: card.typeBg }}
                    >
                      <img src={card.image} alt={card.name} className="w-full h-full object-contain p-1.5" />
                    </div>

                    {/* Pub info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 
                          onClick={() => navigate(`/card/${card.id}`)}
                          className="font-bold text-zinc-950 text-[15px] hover:text-[#C0392B] cursor-pointer"
                        >
                          {card.name}
                        </h4>
                        <span className="text-zinc-300">·</span>
                        <span className="text-[12px] text-zinc-400 font-medium">{card.set}</span>
                        <span className={`text-[10px] px-2 py-[2px] rounded-full font-medium ml-auto sm:ml-0 ${
                          isOfrezco ? 'bg-[#FCEBEB] text-[#A32D2D]' : 'bg-[#E6F1FB] text-[#185FA5]'
                        }`}>
                          {isOfrezco ? 'Ofrezco' : 'Busco'}
                        </span>
                      </div>
                      
                      {pub.condition && (
                        <p className="text-[12px] text-zinc-500 mt-1.5">
                          Estado: <strong className="text-zinc-700 font-medium">{pub.condition}</strong>
                        </p>
                      )}
                      
                      <p className="text-[13px] text-zinc-600 mt-2 italic leading-relaxed">"{pub.note}"</p>
                      
                      {pub.wants && pub.wants.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[11px] text-zinc-400">{isOfrezco ? 'Busca a cambio:' : 'Ofrece a cambio:'}</span>
                          {pub.wants.map((w, idx) => (
                            <span key={idx} className="bg-zinc-100 text-zinc-600 text-[10.5px] px-2 py-[2.5px] rounded border border-zinc-200">
                              {w}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col items-stretch gap-2 w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 mt-3 sm:mt-0">
                      <button
                        onClick={() => handleCompletePub(pub.id)}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-3 py-1.5 text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        Concretar
                      </button>
                      <button
                        onClick={() => handleDeletePub(pub.id)}
                        className="flex-1 border border-zinc-200 hover:bg-red-50 hover:text-red-600 text-zinc-600 rounded-lg px-3 py-1.5 text-[12px] font-medium flex items-center justify-center gap-1.5 transition-colors"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab Panel: Carpeta (Repetidas) */}
      {activeTab === 'carpeta' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-zinc-900 text-[15px]">Tus cartas repetidas para intercambio</h3>
            <button className="bg-[#C0392B] hover:bg-[#A93226] text-white text-[12px] rounded-lg px-3.5 py-1.5 flex items-center gap-1.5 transition-colors font-medium">
              + Agregar Carta
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {binderCards.map(card => (
              <div 
                key={card.id}
                onClick={() => navigate(`/card/${card.id}`)}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-300 shadow-sm p-3 flex flex-col items-center text-center hover:scale-102 transition-transform duration-200"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center relative mb-3" style={{ backgroundColor: card.typeBg }}>
                  <img src={card.image} alt={card.name} className="w-full h-full object-contain p-2" />
                </div>
                <h4 className="font-semibold text-zinc-900 text-[13px] truncate w-full">{card.name}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{card.set}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Panel: Wishlist */}
      {activeTab === 'deseadas' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-zinc-900 text-[15px]">Tus cartas buscadas</h3>
            <button className="bg-[#C0392B] hover:bg-[#A93226] text-white text-[12px] rounded-lg px-3.5 py-1.5 flex items-center gap-1.5 transition-colors font-medium">
              + Buscar Carta
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {wishlistCards.map(card => (
              <div 
                key={card.id}
                onClick={() => navigate(`/card/${card.id}`)}
                className="bg-white border border-zinc-200 rounded-xl overflow-hidden cursor-pointer hover:border-zinc-300 shadow-sm p-3 flex flex-col items-center text-center hover:scale-102 transition-transform duration-200"
              >
                <div className="w-full aspect-[3/4] rounded-lg overflow-hidden flex items-center justify-center relative mb-3" style={{ backgroundColor: card.typeBg }}>
                  <img src={card.image} alt={card.name} className="w-full h-full object-contain p-2" />
                </div>
                <h4 className="font-semibold text-zinc-900 text-[13px] truncate w-full">{card.name}</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">{card.set}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
