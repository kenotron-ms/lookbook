import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tv2, Search, ChevronDown, Crown } from 'lucide-react'

export default function Header() {
  const [browseOpen, setBrowseOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <header
      className="flex items-center gap-4 px-4 h-14 shrink-0 z-50 relative"
      style={{ background: '#1f1f23', borderBottom: '1px solid #2a2a2f' }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 shrink-0">
        <div
          className="flex items-center justify-center w-8 h-8 rounded"
          style={{ background: '#9146ff' }}
        >
          <Tv2 size={18} color="white" strokeWidth={2} />
        </div>
        <span className="font-bold text-lg tracking-tight" style={{ color: '#efeff1' }}>
          Burst
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex items-center gap-1 ml-2">
        {/* Browse dropdown */}
        <div className="relative">
          <button
            onClick={() => setBrowseOpen((v) => !v)}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-colors"
            style={{ color: browseOpen ? '#efeff1' : '#adadb8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#efeff1')}
            onMouseLeave={(e) => !browseOpen && (e.currentTarget.style.color = '#adadb8')}
          >
            Browse
            <ChevronDown size={14} />
          </button>
          {browseOpen && (
            <div
              className="absolute top-full left-0 mt-1 w-44 rounded py-1 z-50"
              style={{ background: '#26262c', border: '1px solid #3a3a3f', boxShadow: '0 4px 16px rgba(0,0,0,0.5)' }}
            >
              {[
                { label: 'All Channels', path: '/' },
                { label: 'Categories', path: '/' },
                { label: 'Events', path: '/' },
                { label: 'Following', path: '/following' },
                { label: 'Directory', path: '/directory' },
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path); setBrowseOpen(false) }}
                  className="w-full text-left px-4 py-2 text-sm transition-colors"
                  style={{ color: '#adadb8' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#3a3a3f'
                    e.currentTarget.style.color = '#efeff1'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#adadb8'
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {[
          { label: 'Following', path: '/following' },
        ].map((link) => (
          <Link
            key={link.label}
            to={link.path}
            className="px-3 py-1.5 rounded text-sm font-medium transition-colors"
            style={{ color: '#adadb8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#efeff1')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#adadb8')}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Search */}
      <div className="flex-1 max-w-md mx-4">
        <div
          className="flex items-center gap-2 px-3 h-8 rounded"
          style={{ background: '#0e0e10', border: '1px solid #3a3a3f' }}
        >
          <Search size={14} style={{ color: '#adadb8' }} />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: '#efeff1' }}
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3 ml-auto shrink-0">
        {/* Prime badge */}
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-80"
          style={{ background: 'linear-gradient(135deg, #00c8ff, #9146ff)', color: 'white' }}
        >
          <Crown size={13} />
          Prime
        </button>

        {/* Login */}
        <button
          className="px-4 py-1.5 rounded text-sm font-semibold transition-colors"
          style={{ color: '#9146ff', border: '1px solid #9146ff' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(145,70,255,0.1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          Log In
        </button>

        {/* Sign Up */}
        <button
          className="px-4 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
          style={{ background: '#9146ff', color: 'white' }}
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}
