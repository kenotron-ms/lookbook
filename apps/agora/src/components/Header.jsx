import { Globe, Search, TrendingUp, Bell, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 48, background: '#1a1a1b', borderBottom: '1px solid #343536',
      display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12,
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          width: 32, height: 32, background: '#ff6314', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Globe size={18} color="#fff" strokeWidth={2.5} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#d7dadc', letterSpacing: '-0.3px' }}>Agora</span>
      </Link>

      {/* Community dropdown placeholder */}
      <button style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '5px 12px',
        background: 'transparent', border: '1px solid transparent', borderRadius: 4,
        color: '#d7dadc', cursor: 'pointer', fontSize: 14, whiteSpace: 'nowrap',
        flexShrink: 0,
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#343536'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}
      >
        <TrendingUp size={16} color="#818384" />
        <span style={{ color: '#818384' }}>Communities</span>
      </button>

      {/* Search */}
      <div style={{ flex: 1, maxWidth: 680, position: 'relative' }}>
        <Search size={16} color="#818384" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input
          placeholder="Search Agora"
          style={{
            width: '100%', height: 36,
            background: '#272729', border: '1px solid #343536',
            borderRadius: 20, paddingLeft: 40, paddingRight: 16,
            color: '#d7dadc', fontSize: 14, outline: 'none',
          }}
          onFocus={e => { e.target.style.border = '1px solid #ff6314'; e.target.style.background = '#1a1a1b'; }}
          onBlur={e => { e.target.style.border = '1px solid #343536'; e.target.style.background = '#272729'; }}
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Actions */}
      <button
        onClick={() => navigate('/submit')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '5px 14px',
          background: 'transparent', border: '1px solid #818384', borderRadius: 20,
          color: '#d7dadc', cursor: 'pointer', fontSize: 14, fontWeight: 600,
          flexShrink: 0,
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#d7dadc'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#818384'}
      >
        <Plus size={16} />
        Create
      </button>

      <button style={{
        width: 32, height: 32, background: 'transparent', border: 'none',
        borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#272729'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <Bell size={18} color="#818384" />
      </button>

      {/* Auth buttons */}
      <button style={{
        padding: '5px 16px', background: 'transparent',
        border: '1px solid #ff6314', borderRadius: 20,
        color: '#ff6314', cursor: 'pointer', fontSize: 14, fontWeight: 700,
        flexShrink: 0,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,99,20,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
      >
        Log In
      </button>
      <button style={{
        padding: '5px 16px', background: '#ff6314',
        border: '1px solid #ff6314', borderRadius: 20,
        color: '#fff', cursor: 'pointer', fontSize: 14, fontWeight: 700,
        flexShrink: 0,
      }}
        onMouseEnter={e => { e.currentTarget.style.background = '#e55a10'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#ff6314'; }}
      >
        Sign Up
      </button>
    </header>
  )
}
