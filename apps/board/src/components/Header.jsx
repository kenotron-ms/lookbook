import { LayoutGrid, Home, ChevronDown, Search, Bell, Plus, X } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NAV = [
  { label: 'Boards', to: '/home' },
  { label: 'Recent', to: '/board' },
  { label: 'Starred', to: '/board' },
  { label: 'Templates', to: '/templates' },
]

export default function Header() {
  const [searchVal, setSearchVal] = useState('')
  const navigate = useNavigate()

  return (
    <header style={{
      height: 44,
      background: '#026aa7',
      borderBottom: '1px solid rgba(0,0,0,0.18)',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      padding: '0 8px',
      flexShrink: 0,
      zIndex: 100,
    }}>
      {/* Logo + Brand */}
      <button
        onClick={() => navigate('/board')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '4px 8px', borderRadius: 4,
          color: '#fff',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <LayoutGrid size={18} strokeWidth={2} />
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px', lineHeight: 1 }}>Board</span>
      </button>

      {/* Home icon btn */}
      <NavLink to="/home" style={{ textDecoration: 'none' }}>
        {({ isActive }) => (
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: isActive ? 'rgba(255,255,255,0.25)' : 'none',
            border: 'none', cursor: 'pointer',
            padding: '4px 8px', borderRadius: 4, color: '#fff',
          }}
            onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
            onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none' }}
          >
            <Home size={16} />
          </button>
        )}
      </NavLink>

      {/* Nav links */}
      {NAV.map(n => (
        <NavLink key={n.label} to={n.to} style={{ textDecoration: 'none' }}>
          {({ isActive }) => (
            <button style={{
              display: 'flex', alignItems: 'center', gap: 3,
              background: isActive ? 'rgba(255,255,255,0.25)' : 'none',
              border: 'none', cursor: 'pointer',
              padding: '4px 8px', borderRadius: 4, color: '#fff',
              fontSize: 14, fontWeight: 500,
            }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none' }}
            >
              {n.label}
              <ChevronDown size={12} />
            </button>
          )}
        </NavLink>
      ))}

      {/* Create btn */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: 4,
        background: '#0052cc', border: 'none', cursor: 'pointer',
        padding: '4px 12px', borderRadius: 4, color: '#fff',
        fontSize: 14, fontWeight: 600, marginLeft: 4,
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#003d99'}
        onMouseLeave={e => e.currentTarget.style.background = '#0052cc'}
      >
        <Plus size={14} />
        Create
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Search */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search size={14} style={{ position: 'absolute', left: 8, color: '#deecf9', pointerEvents: 'none' }} />
        <input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Search…"
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: 4, padding: '4px 28px 4px 28px',
            color: '#fff', fontSize: 13, width: 200,
            outline: 'none',
          }}
          onFocus={e => { e.target.style.background = '#fff'; e.target.style.color = '#172b4d' }}
          onBlur={e => { e.target.style.background = 'rgba(255,255,255,0.2)'; e.target.style.color = '#fff' }}
        />
        {searchVal && (
          <button onClick={() => setSearchVal('')} style={{
            position: 'absolute', right: 6, background: 'none', border: 'none',
            cursor: 'pointer', color: '#deecf9', display: 'flex', alignItems: 'center',
          }}>
            <X size={12} />
          </button>
        )}
      </div>

      {/* Notifications */}
      <button style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '4px 6px', borderRadius: 4, color: '#fff',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        onMouseLeave={e => e.currentTarget.style.background = 'none'}
      >
        <Bell size={16} />
        <span style={{
          position: 'absolute', top: 2, right: 2,
          background: '#eb5a46', color: '#fff',
          fontSize: 9, fontWeight: 700, lineHeight: 1,
          padding: '1px 3px', borderRadius: 8,
        }}>3</span>
      </button>

      {/* Avatar */}
      <div style={{
        width: 28, height: 28, borderRadius: '50%',
        background: '#5aac44',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
        flexShrink: 0,
        boxShadow: '0 0 0 2px rgba(255,255,255,0.35)',
      }}>
        AK
      </div>
    </header>
  )
}
