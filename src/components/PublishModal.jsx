import { useState } from 'react'
import { CARDS } from '../data/cards'

const CONDITIONS = [
  'Sellado (Sealed)',
  'Excelente (Near Mint)',
  'Muy bueno (Excellent)',
  'Bueno (Good)',
  'Regular (Light Played)',
  'Mal estado (Heavily Played)'
]

export default function PublishModal({ isOpen, onClose }) {
  const [mode, setMode] = useState('ofrezco') // 'ofrezco' | 'busco'
  const [cardId, setCardId] = useState(CARDS[0].id)
  const [condition, setCondition] = useState(CONDITIONS[1])
  const [note, setNote] = useState('')
  const [wants, setWants] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [uploadingPhoto, setUploadingPhoto] = useState(false)

  if (!isOpen) return null

  const selectedPoke = CARDS.find(c => c.id === Number(cardId)) || CARDS[0]

  const handlePhotoUpload = () => {
    setUploadingPhoto(true)
    setTimeout(() => {
      setPhoto(selectedPoke.image) // Simulates uploading a photo of the card
      setUploadingPhoto(false)
    }, 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  const handleResetAndClose = () => {
    setMode('ofrezco')
    setCardId(CARDS[0].id)
    setCondition(CONDITIONS[1])
    setNote('')
    setWants('')
    setPhoto(null)
    setIsSuccess(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      {/* Background click to close */}
      <div className="absolute inset-0 cursor-default" onClick={handleResetAndClose}></div>

      {/* Modal Container */}
      <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col max-h-[90vh] border border-zinc-100 z-10 animate-zoom-in relative">
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#C0392B] flex items-center justify-center text-white text-base">
              ◎
            </div>
            <div>
              <h3 className="font-semibold text-zinc-950 text-[15px]">Crear Publicación</h3>
              <p className="text-[11px] text-zinc-500">Publicá tu carta en Mar del Plata</p>
            </div>
          </div>
          <button 
            onClick={handleResetAndClose}
            className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-400 hover:text-zinc-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 custom-scroll">
          {isSuccess ? (
            <div className="py-8 px-4 text-center animate-fade-in">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm animate-scale-up">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h4 className="text-[16px] font-semibold text-zinc-950 mb-1">¡Publicado exitosamente!</h4>
              <p className="text-[12.5px] text-zinc-500 max-w-sm mx-auto mb-6">
                Tu carta ya figura en el catálogo. Otros coleccionistas de la zona podrán verla y contactarte por chat o WhatsApp.
              </p>

              {/* Preview Box */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 text-left mb-6 flex gap-3">
                <div className="w-12 aspect-[3/4] shrink-0 rounded border border-zinc-200" style={{ backgroundColor: selectedPoke.typeBg }}>
                  <img src={selectedPoke.image} alt={selectedPoke.name} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-zinc-800 text-[13px]">{selectedPoke.name}</span>
                    <span className={`text-[9px] px-1.5 py-[1px] rounded-full font-medium ${
                      mode === 'ofrezco' ? 'bg-[#FCEBEB] text-[#A32D2D]' : 'bg-[#E6F1FB] text-[#185FA5]'
                    }`}>
                      {mode === 'ofrezco' ? 'Ofrezco' : 'Busco'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">{selectedPoke.set} · {selectedPoke.number}</p>
                  <p className="text-[12px] text-zinc-600 mt-1 italic line-clamp-1">"{note || 'Sin comentarios adicionales.'}"</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <button 
                  onClick={handleResetAndClose}
                  className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg px-5 py-2 text-[13px] font-medium transition-colors"
                >
                  Entendido
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Seek / Offer Switch */}
              <div className="flex border border-zinc-200 rounded-lg p-0.5 bg-zinc-50/50">
                <button
                  type="button"
                  onClick={() => setMode('ofrezco')}
                  className={`flex-1 py-2 text-[12.5px] font-semibold rounded-md transition-all ${
                    mode === 'ofrezco'
                      ? 'bg-white text-[#C0392B] shadow-sm border border-zinc-200/50'
                      : 'text-zinc-500 hover:text-zinc-850'
                  }`}
                >
                  Tengo / Ofrezco
                </button>
                <button
                  type="button"
                  onClick={() => setMode('busco')}
                  className={`flex-1 py-2 text-[12.5px] font-semibold rounded-md transition-all ${
                    mode === 'busco'
                      ? 'bg-white text-[#185FA5] shadow-sm border border-zinc-200/50'
                      : 'text-zinc-500 hover:text-zinc-855'
                  }`}
                >
                  Busco / Necesito
                </button>
              </div>

              {/* Card Selection */}
              <div>
                <label htmlFor="card-select" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Carta Pokémon</label>
                <select
                  id="card-select"
                  value={cardId}
                  onChange={(e) => setCardId(e.target.value)}
                  className="w-full border border-zinc-200 rounded-lg p-2.5 text-[13px] text-zinc-850 bg-zinc-50 outline-none focus:border-[#C0392B] focus:bg-white transition-all"
                  required
                >
                  {CARDS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.set} · {c.number})
                    </option>
                  ))}
                </select>
              </div>

              {/* Selection preview banner */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-2.5 flex items-center gap-3">
                <div className="w-10 aspect-[3/4] rounded border border-zinc-200" style={{ backgroundColor: selectedPoke.typeBg }}>
                  <img src={selectedPoke.image} alt={selectedPoke.name} className="w-full h-full object-contain p-1" />
                </div>
                <div className="text-[12px]">
                  <span className="font-semibold text-zinc-800">{selectedPoke.name}</span>
                  <p className="text-[10px] text-zinc-400 mt-0.5">{selectedPoke.set} · {selectedPoke.rarity} · Tipo: {selectedPoke.type}</p>
                </div>
              </div>

              {/* Condition (only shown for "ofrezco") */}
              {mode === 'ofrezco' && (
                <div>
                  <label htmlFor="condition-select" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Estado de la carta</label>
                  <select
                    id="condition-select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full border border-zinc-200 rounded-lg p-2.5 text-[13px] text-zinc-850 bg-zinc-50 outline-none focus:border-[#C0392B] focus:bg-white transition-all"
                  >
                    {CONDITIONS.map((cond, idx) => (
                      <option key={idx} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Want in exchange */}
              <div>
                <label htmlFor="wants-input" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">
                  {mode === 'ofrezco' ? '¿Qué buscás a cambio?' : '¿Qué ofrecés a cambio?'}
                </label>
                <input
                  id="wants-input"
                  type="text"
                  value={wants}
                  onChange={(e) => setWants(e.target.value)}
                  placeholder="Ej: Blastoise Base Set, Cartas de tipo Fuego, etc."
                  className="w-full border border-zinc-200 rounded-lg p-2.5 text-[13px] text-zinc-850 bg-zinc-50 focus:border-[#C0392B] focus:bg-white outline-none transition-colors"
                />
              </div>

              {/* Note / Comment */}
              <div>
                <label htmlFor="note-textarea" className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Detalles / Nota</label>
                <textarea
                  id="note-textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder={
                    mode === 'ofrezco' 
                      ? 'Describí las condiciones de tu carta, disponibilidad horaria o detalles del intercambio...'
                      : 'Escribí detalles sobre qué cartas tenés para dar o por qué buscás esta carta...'
                  }
                  className="w-full border border-zinc-200 rounded-xl p-3 text-[13px] text-zinc-850 placeholder-zinc-400 focus:border-[#C0392B] focus:bg-white outline-none transition-all leading-relaxed"
                ></textarea>
              </div>

              {/* Mock Photo Upload (only shown for "ofrezco") */}
              {mode === 'ofrezco' && (
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-wider block mb-1.5">Foto real de tu carta (Opcional)</label>
                  {photo ? (
                    <div className="relative w-36 h-24 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50 group">
                      <img src={photo} alt="Vista previa de subida" className="w-full h-full object-cover p-1" />
                      <button
                        type="button"
                        onClick={() => setPhoto(null)}
                        className="absolute top-1 right-1 bg-black/60 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] hover:bg-black transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handlePhotoUpload}
                      disabled={uploadingPhoto}
                      className="w-full border border-dashed border-zinc-300 rounded-xl py-5 px-3 flex flex-col items-center justify-center hover:bg-zinc-50 hover:border-zinc-400 transition-colors"
                    >
                      {uploadingPhoto ? (
                        <>
                          <svg className="animate-spin h-5 w-5 text-zinc-500 mb-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-[12px] text-zinc-500">Subiendo foto...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 mb-1">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                            <circle cx="12" cy="13" r="4"/>
                          </svg>
                          <span className="text-[12.5px] text-zinc-550 font-medium">Subir foto de la carta</span>
                          <span className="text-[10px] text-zinc-400 mt-0.5">Soportado: JPG, PNG (Simulado)</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 border border-zinc-200 text-zinc-600 rounded-lg py-2.5 text-[13.5px] font-medium hover:bg-zinc-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg py-2.5 text-[13.5px] font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Publicando...
                    </>
                  ) : (
                    <>
                      Publicar Carta
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
