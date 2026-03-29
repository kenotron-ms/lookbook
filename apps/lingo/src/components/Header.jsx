import { BookOpen, Flame, Heart, Diamond } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-[#e5e5e5] h-14">
      <div className="max-w-[960px] mx-auto h-full flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
               style={{ background: '#58cc02' }}>
            <BookOpen size={20} color="white" strokeWidth={2.5} />
          </div>
          <span className="font-black text-xl tracking-tight" style={{ color: '#58cc02' }}>
            lingo
          </span>
        </Link>

        {/* Stats row */}
        <div className="flex items-center gap-4">
          {/* Streak */}
          <div className="flex items-center gap-1">
            <Flame size={20} fill="#ffd900" color="#ffd900" />
            <span className="font-extrabold text-sm" style={{ color: '#ffd900' }}>47</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1">
            <Heart size={18} fill="#ff4b4b" color="#ff4b4b" />
            <span className="font-extrabold text-sm" style={{ color: '#ff4b4b' }}>5</span>
          </div>

          {/* Gems */}
          <div className="flex items-center gap-1">
            <Diamond size={18} fill="#1cb0f6" color="#1cb0f6" />
            <span className="font-extrabold text-sm" style={{ color: '#1cb0f6' }}>340</span>
          </div>

          {/* XP */}
          <div
            className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-xl text-sm font-extrabold"
            style={{ background: '#fff5b4', color: '#d4a800' }}
          >
            ⚡ 123 XP
          </div>
        </div>
      </div>
    </header>
  )
}
