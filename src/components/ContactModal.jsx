import { useState } from 'react'

const QUICK_MESSAGES = [
  '👋 ¡Hola! Me interesa la carta que publicaste.',
  '🃏 Tengo las cartas que buscás a cambio.',
  '📍 ¿Sigue disponible? Me gustaría coordinar un intercambio.',
  '🔍 Hola, ¿te interesa revisar mi catálogo de intercambio?',
]

export default function ContactModal({ isOpen, onClose, pub, card }) {
  const isOfrezco = pub?.mode === 'ofrezco'
  const defaultMsg = (pub && card)
    ? (isOfrezco 
        ? `¡Hola ${pub.user}! Me interesa tu publicación del ${card.name} (${card.set}). ¿Sigue disponible?`
        : `¡Hola ${pub.user}! Vi que buscás un ${card.name} (${card.set}). Tengo uno disponible para intercambio.`)
    : ''

  const [activeTab, setActiveTab] = useState('chat') // 'chat' | 'whatsapp'
  const [messageText, setMessageText] = useState(defaultMsg)
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [copied, setCopied] = useState(false)

  if (!isOpen || !pub || !card) return null

  // Format phone for WhatsApp simulation
  const mockPhone = pub.id.replace(/[^0-9]/g, '') || '2235554321'
  const waPhone = `549223${mockPhone.padEnd(7, '9')}`

  const handleSendChat = (e) => {
    e.preventDefault()
    setIsSending(true)
    
    // Simulate API request
    setTimeout(() => {
      setIsSending(false)
      setIsSent(true)
    }, 1200)
  }

  const handleSendWhatsApp = () => {
    // URL encode the message text
    const encodedText = encodeURIComponent(messageText)
    const waUrl = `https://wa.me/${waPhone}?text=${encodedText}`
    
    // Open in new tab (simulated / real depending on click)
    window.open(waUrl, '_blank')
  }

  const handleCopyText = () => {
    navigator.clipboard.writeText(messageText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-zinc-100 z-10 animate-zoom-in relative">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C0392B] flex items-center justify-center text-white text-base">
              ◎
            </div>
            <div>
              <h3 className="font-semibold text-zinc-950 text-[15px]">Contactar a {pub.user}</h3>
              <p className="text-[11px] text-zinc-500">{pub.location} · {pub.time}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Content Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 custom-scroll">
          
          {/* Card Context Box */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 mb-5 flex gap-3.5 items-start">
            <div className="w-14 aspect-[3/4] shrink-0 rounded-lg overflow-hidden border border-zinc-200" style={{ backgroundColor: card.typeBg }}>
              <img src={card.image} alt={card.name} className="w-full h-full object-contain p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-zinc-900 text-[13px] truncate">{card.name}</span>
                <span className={`text-[10px] px-2 py-[2px] rounded-full font-medium ${
                  isOfrezco ? 'bg-[#FCEBEB] text-[#A32D2D]' : 'bg-[#E6F1FB] text-[#185FA5]'
                }`}>
                  {isOfrezco ? 'Ofrece' : 'Busca'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">{card.set} · {card.number}</p>
              
              {/* Note snippet */}
              <div className="mt-2 bg-white rounded-lg px-2.5 py-1.5 border border-zinc-150 text-[12px] text-zinc-600 italic line-clamp-2">
                "{pub.note}"
              </div>
              
              {/* Wants list */}
              {pub.wants && pub.wants.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-zinc-400">{isOfrezco ? 'Busca a cambio:' : 'Ofrece a cambio:'}</span>
                  {pub.wants.map((w, idx) => (
                    <span key={idx} className="bg-zinc-200/60 text-zinc-700 text-[9.5px] px-1.5 py-[1px] rounded border border-zinc-200">
                      {w}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* If message is sent, show Success View */}
          {isSent ? (
            <div className="py-8 px-4 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm animate-scale-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4 className="text-[16px] font-semibold text-zinc-950 mb-1">¡Propuesta enviada con éxito!</h4>
              <p className="text-[12.5px] text-zinc-500 max-w-sm mx-auto mb-6">
                Le enviamos tu mensaje a <strong className="text-zinc-800">{pub.user}</strong>. Te notificaremos aquí y a tu email cuando responda.
              </p>

              {/* Message Copy Box */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-left mb-6">
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 font-semibold block mb-1.5">Mensaje enviado</span>
                <p className="text-[12.5px] text-zinc-700 whitespace-pre-wrap leading-relaxed">"{messageText}"</p>
              </div>

              <div className="flex gap-2 justify-center">
                <button 
                  onClick={onClose}
                  className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg px-5 py-2 text-[13px] font-medium transition-colors"
                >
                  Entendido
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-zinc-200 mb-4 bg-zinc-50/50 rounded-lg p-0.5">
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 py-2 text-[12.5px] font-medium rounded-md flex justify-center items-center gap-1.5 transition-all ${
                    activeTab === 'chat'
                      ? 'bg-white text-zinc-900 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  Chat Interno
                </button>
                <button
                  onClick={() => setActiveTab('whatsapp')}
                  className={`flex-1 py-2 text-[12.5px] font-medium rounded-md flex justify-center items-center gap-1.5 transition-all ${
                    activeTab === 'whatsapp'
                      ? 'bg-white text-emerald-600 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-800 hover:bg-white/40'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  WhatsApp Directo
                </button>
              </div>

              {/* Tab: Chat Interno */}
              {activeTab === 'chat' && (
                <form onSubmit={handleSendChat} className="space-y-4 animate-fade-in">
                  
                  {/* Quick messages */}
                  <div>
                    <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-2">Respuestas rápidas</label>
                    <div className="flex flex-wrap gap-1.5">
                      {QUICK_MESSAGES.map((msg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setMessageText(msg)}
                          className="text-[11px] bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-full px-3 py-1.5 text-left hover:bg-zinc-100 hover:border-zinc-300 transition-colors"
                        >
                          {msg}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message input */}
                  <div>
                    <label htmlFor="message-body" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Escribí tu mensaje</label>
                    <textarea
                      id="message-body"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                      className="w-full border border-zinc-200 rounded-xl p-3 text-[13px] text-zinc-800 placeholder-zinc-400 focus:border-[#C0392B] outline-none transition-colors leading-relaxed"
                      placeholder="Escribí acá tu propuesta de intercambio o consulta..."
                      required
                    ></textarea>
                  </div>

                  {/* Submit button */}
                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 border border-zinc-200 text-zinc-600 rounded-lg py-2.5 text-[13.5px] font-medium hover:bg-zinc-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSending}
                      className="flex-1 bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg py-2.5 text-[13.5px] font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                          </svg>
                          Enviar Mensaje
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* Tab: WhatsApp Directo */}
              {activeTab === 'whatsapp' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 text-emerald-800 text-[12px] leading-relaxed flex gap-2.5">
                    <span className="text-[16px] select-none">💬</span>
                    <div>
                      <strong className="font-semibold block mb-0.5">Contacto directo por WhatsApp</strong>
                      Ideal para coordinar rápido. Podés escribirle directamente a su número y la app te abrirá la conversación con un mensaje listo.
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wa-message-body" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Mensaje pre-definido</label>
                    <textarea
                      id="wa-message-body"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      rows={4}
                      className="w-full border border-zinc-200 rounded-xl p-3 text-[13px] text-zinc-800 focus:border-emerald-500 outline-none transition-colors leading-relaxed"
                      placeholder="Escribí el mensaje para enviar por WhatsApp..."
                      required
                    ></textarea>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopyText}
                      className="border border-zinc-200 text-zinc-600 hover:bg-zinc-50 rounded-lg px-4 py-2.5 text-[13px] font-medium flex items-center justify-center gap-1.5 transition-colors shrink-0"
                    >
                      {copied ? (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          Copiado
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                          Copiar
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleSendWhatsApp}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg py-2.5 text-[13.5px] font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                      Abrir WhatsApp
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>

      </div>
    </div>
  )
}
