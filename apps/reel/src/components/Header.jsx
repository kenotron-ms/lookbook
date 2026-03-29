import { PlayCircle, Search, Mic, Upload, Bell, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    navigate('/search')
  }

  return (
    <header style={{ height: 56, background: '#0f0f0f', borderBottom: '1px solid #3d3d3d', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 16 }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', minWidth: 120, userSelect: 'none' }}
      >
        <PlayCircle size={28} color="#ff0000" strokeWidth={2} />
        <span style={{ fontSize: 18, fontWeight: 700, color: '#f1f1f1', letterSpacing: '-0.3px' }}>Reel</span>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: 600, margin: '0 auto' }}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search"
          style={{
            flex: 1,
            background: '#121212',
            border: '1px solid #3d3d3d',
            borderRight: 'none',
            borderRadius: '20px 0 0 20px',
            padding: '8px 16px',
            color: '#f1f1f1',
            fontSize: 14,
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            background: '#272727',
            border: '1px solid #3d3d3d',
            borderRadius: '0 20px 20px 0',
            padding: '8px 16px',
            cursor: 'pointer',
            color: '#f1f1f1',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={16} />
        </button>
      </form>

      {/* Right icons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
        <IconBtn icon={<Mic size={20} />} title="Voice search" />
        <IconBtn icon={<Upload size={20} />} title="Upload" />
        <IconBtn icon={<Bell size={20} />} title="Notifications" />
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff0000, #cc0000)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', fontSize: 12, fontWeight: 700, color: '#fff', marginLeft: 4,
        }}>
          K
        </div>
      </div>
    </header>
  )
}

function IconBtn({ icon, title }) {
  return (
    <button
      title={title}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: '#f1f1f1', padding: 8, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#272727'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      {icon}
    </button>
  )
}