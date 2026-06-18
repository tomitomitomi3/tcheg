import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 bg-white border-b border-zinc-200 h-14 px-6 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 no-underline">
        <div className="w-7 h-7 rounded-full bg-[#C0392B] flex items-center justify-center text-white text-sm font-bold select-none">
          ◎
        </div>
        <span className="font-medium text-zinc-900 text-[15px]">Intercambios TCG</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/home" className="text-[13px] text-zinc-500 hover:text-zinc-900 no-underline transition-colors">
          Cartas
        </Link>
        <a href="#como-funciona" className="text-[13px] text-zinc-500 hover:text-zinc-900 no-underline transition-colors">
          Cómo funciona
        </a>
      </div>

      <div className="flex items-center gap-2">
        <button className="w-[34px] h-[34px] border border-zinc-200 rounded-lg flex items-center justify-center text-zinc-500 hover:bg-zinc-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
        </button>
        <button className="border border-zinc-200 rounded-lg px-4 py-[6px] text-[13px] text-zinc-700 hover:bg-zinc-50 transition-colors">
          Iniciar sesión
        </button>
        <button className="bg-[#C0392B] hover:bg-[#A93226] text-white rounded-lg px-4 py-[6px] text-[13px] transition-colors">
          Publicar
        </button>
      </div>
    </nav>
  )
}
