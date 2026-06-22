export default function PublicationItem({ pub, onContact }) {
  const isOfrezco = pub.mode === 'ofrezco'

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-4 flex gap-3 items-start">
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium shrink-0"
        style={{ backgroundColor: pub.avatarBg, color: pub.avatarColor }}
      >
        {pub.initials}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-[13px] text-zinc-900">{pub.user}</div>
        <div className="text-[12px] text-zinc-400 mt-0.5">{pub.location}</div>

        {pub.condition && (
          <div className="mt-2 text-[12px] text-zinc-500">
            Estado: <span className="text-zinc-700 font-medium">{pub.condition}</span>
          </div>
        )}

        <div className="mt-2 text-[13px] text-zinc-600 leading-relaxed">{pub.note}</div>

        {pub.photo && (
          <div className="mt-3">
            <img
              src={pub.photo}
              alt={`Foto de ${pub.user}`}
              className="w-40 h-28 object-cover rounded-lg border border-zinc-200"
            />
          </div>
        )}

        {pub.wants && pub.wants.length > 0 && (
          <div className="mt-3">
            <div className="text-[11px] text-zinc-400 mb-1">Busca a cambio:</div>
            <div className="flex flex-wrap gap-1.5">
              {pub.wants.map((w, i) => (
                <span
                  key={i}
                  className="bg-zinc-100 text-zinc-600 text-[11px] px-2 py-[3px] rounded-md border border-zinc-200"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Acciones */}
      <div className="flex flex-col items-end gap-2 shrink-0">
        <span
          className={`text-[11px] px-2.5 py-[3px] rounded-full font-medium ${
            isOfrezco
              ? 'bg-[#FCEBEB] text-[#A32D2D]'
              : 'bg-[#E6F1FB] text-[#185FA5]'
          }`}
        >
          {isOfrezco ? 'Ofrezco' : 'Busco'}
        </span>
        <span className="text-[11px] text-zinc-400">{pub.time}</span>
        <button 
          onClick={onContact}
          className="bg-[#C0392B] hover:bg-[#A93226] text-white text-[12px] rounded-lg px-3 py-1.5 flex items-center gap-1.5 transition-colors mt-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Contactar
        </button>
      </div>
    </div>
  )
}

