import { Link, useNavigate } from 'react-router-dom'
import { Code2, Search, Plus, Bell, User } from 'lucide-react'

export default function Header({ showSearch = true }) {
  const navigate = useNavigate()

  return (
    <header style={{ background: '#1e1f26', borderBottom: '1px solid #2d2f3d' }} className="sticky top-0 z-50">
      <div className="flex items-center gap-4 px-5 h-14">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 text-white no-underline">
          <Code2 size={22} color="#47cf73" />
          <span className="font-semibold text-base tracking-tight" style={{ color: '#f8f8f2' }}>Sandbox</span>
        </Link>

        {/* Search */}
        {showSearch && (
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6272a4' }} />
              <input
                type="text"
                placeholder="Search pens..."
                className="w-full pl-9 pr-4 py-1.5 rounded text-sm outline-none"
                style={{
                  background: '#282a36',
                  border: '1px solid #3d3f52',
                  color: '#f8f8f2',
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            to="/work"
            className="px-3 py-1.5 rounded text-sm no-underline transition-colors"
            style={{ color: '#6272a4' }}
            onMouseEnter={e => e.target.style.color = '#f8f8f2'}
            onMouseLeave={e => e.target.style.color = '#6272a4'}
          >
            Your Work
          </Link>
        </nav>

        <Bell size={16} style={{ color: '#6272a4', cursor: 'pointer' }} />

        <button
          onClick={() => navigate('/editor')}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded font-semibold text-sm transition-all"
          style={{ background: '#47cf73', color: '#0a1f12' }}
          onMouseEnter={e => e.currentTarget.style.background = '#3ab562'}
          onMouseLeave={e => e.currentTarget.style.background = '#47cf73'}
        >
          <Plus size={14} />
          Create Pen
        </button>

        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{ background: '#282a36', color: '#f8f8f2', border: '1px solid #44475a' }}
        >
          <User size={14} />
        </div>
      </div>
    </header>
  )
}
