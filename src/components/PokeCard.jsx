import { useNavigate } from 'react-router-dom'
import { PUBLICATIONS } from '../data/cards'

export default function PokeCard({ card }) {
  const navigate = useNavigate()
  const pubs = PUBLICATIONS[card.id] || []

  return (
    <div
      onClick={() => navigate(`/card/${card.id}`)}
      className="bg-white border border-zinc-200 rounded-xl overflow-hidden cursor-pointer hover:border-[#C0392B] transition-colors duration-150 group"
    >
      {/* Imagen / Emoji */}
      <div
        className="w-full aspect-[3/4] flex items-center justify-center relative text-[52px]"
        style={{ backgroundColor: card.typeBg }}
      >
        <img src={card.image} alt={card.name} className="w-full h-full object-contain p-2" />
        <div className="absolute top-2 right-2 bg-[#C0392B] text-white text-[10px] px-2 py-[2px] rounded-md font-medium">
          {card.rarity}
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-2">
        <div className="font-medium text-[13px] text-zinc-900">{card.name}</div>
        <div className="text-[11px] text-zinc-400 mt-0.5">{card.set} · {card.number}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-100">
        <div className="text-[12px] text-zinc-500">
          <span className="text-[#C0392B] font-medium">{pubs.length}</span> publicaciones
        </div>
        <div
          className="text-[10px] px-2 py-[2px] rounded-full font-medium"
          style={{ backgroundColor: card.typeBg, color: card.typeColor }}
        >
          {card.type}
        </div>
      </div>
    </div>
  )
}
