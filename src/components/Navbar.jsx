import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublishModal from './PublishModal'

export default function Navbar() {
  const navigate = useNavigate()
  const [isPublishOpen, setIsPublishOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'match',
      title: '¡Match de intercambio!',
      user: 'Ro P.',
      cardName: 'Venusaur (Base Set)',
      cardId: 7,
      time: 'Hace 5m',
      read: false,
    },
    {
      id: 2,
      type: 'match',
      title: '¡Match de intercambio!',
      user: 'Emi P.',
      cardName: 'Mewtwo (Base Set)',
      cardId: 2,
      time: 'Hace 2h',
      read: false,
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, read: true } : n))
    setShowNotifications(false)
    // Navigate to card page
    navigate(`/card/${notification.cardId}`)
  }

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-zinc-200/80 h-24 px-8 flex items-center justify-between transition-all duration-200">
        <Link to="/" className="flex items-center gap-2.5 no-underline group">
          <div className="w-8.5 h-8.5 rounded-full bg-[#C0392B] flex items-center justify-center text-white text-base font-bold select-none transition-transform group-hover:rotate-12 duration-200">
            ◎
          </div>
          <span className="font-bold text-zinc-950 text-[16.5px] tracking-tight">Intercambios TCG</span>
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/home" className="group text-[15.5px] font-semibold text-zinc-550 hover:text-zinc-955 no-underline transition-colors relative py-1">
            Catálogo
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C0392B] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
          </Link>
          <a href="/#como-funciona" className="group text-[15.5px] font-semibold text-zinc-550 hover:text-zinc-955 no-underline transition-colors relative py-1">
            Cómo funciona
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C0392B] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 rounded-full"></span>
          </a>
        </div>

        <div className="flex items-center gap-6 relative">
          {/* Notification Button */}
          <button 
            onClick={() => setShowNotifications(prev => !prev)}
            className={`w-[42px] h-[42px] border rounded-xl flex items-center justify-center transition-all relative ${
              showNotifications || unreadCount > 0
                ? 'border-[#C0392B] text-[#C0392B] bg-red-50/20 shadow-sm'
                : 'border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:border-zinc-300'
            }`}
            title="Notificaciones"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C0392B] rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {/* Notification Dropdown Panel */}
          {showNotifications && (
            <>
              {/* Transparent background overlay click to close */}
              <div className="fixed inset-0 z-40 cursor-default" onClick={() => setShowNotifications(false)}></div>
              
              <div className="absolute right-0 top-full mt-2 w-[340px] bg-white border border-zinc-200 rounded-2xl shadow-2xl z-50 p-5 animate-scale-up flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-zinc-150 pb-2">
                  <span className="text-[13.5px] font-bold text-zinc-955">Notificaciones ({unreadCount})</span>
                  {unreadCount > 0 && (
                    <button 
                      onClick={handleMarkAllAsRead}
                      className="text-[10.5px] text-[#C0392B] hover:underline font-semibold"
                    >
                      Marcar todas como leídas
                    </button>
                  )}
                </div>

                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto custom-scroll pr-1">
                  {notifications.length === 0 ? (
                    <div className="text-center py-8 text-zinc-400 text-[12.5px]">
                      No tenés notificaciones.
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n.id}
                        onClick={() => handleNotificationClick(n)}
                        className={`p-4 rounded-xl border transition-all cursor-pointer text-left flex gap-4 items-start ${
                          n.read 
                            ? 'border-zinc-150 bg-white hover:bg-zinc-50' 
                            : 'border-red-100 bg-red-50/10 hover:bg-red-50/20'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-red-50 text-[#C0392B] flex items-center justify-center font-bold text-xs shrink-0 select-none">
                          🔄
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-zinc-800 text-[11.5px]">{n.title}</span>
                            <span className="text-[9.5px] text-zinc-400 shrink-0">{n.time}</span>
                          </div>
                          <p className="text-[12px] text-zinc-650 mt-1 leading-relaxed">
                            <strong>{n.user}</strong> ofrece <strong>{n.cardName}</strong>, que está en tu Lista de Deseos.
                          </p>
                          <span className="text-[11px] text-[#C0392B] font-bold block mt-1.5 hover:underline">
                            Ver publicación →
                          </span>
                        </div>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 bg-[#C0392B] rounded-full shrink-0 mt-2"></span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
          
          {/* Profile Button */}
          <Link 
            to="/profile" 
            className="border border-zinc-200 rounded-xl px-6 py-2.5 text-[14.5px] text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 transition-all no-underline font-bold flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-[#E1F5EE] text-[#0F6E56] font-bold text-[10px] flex items-center justify-center shadow-sm">
              TB
            </div>
            Mi Perfil
          </Link>

          {/* Publish Button */}
          <button 
            onClick={() => setIsPublishOpen(true)}
            className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-xl px-6 py-2.5 text-[14.5px] font-bold transition-all shadow-md hover:shadow-red-500/10 active:scale-98"
          >
            Publicar
          </button>
        </div>
      </nav>

      <PublishModal 
        isOpen={isPublishOpen} 
        onClose={() => setIsPublishOpen(false)} 
      />
    </>
  )
}
