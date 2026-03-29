import { Link, useLocation } from 'react-router-dom'
import { GitBranch, Search, Bell, GitPullRequest, CircleDot, Cloud, ShoppingBag, Compass } from 'lucide-react'
import { CURRENT_USER } from '../data/repos.js'

const NAV_LINKS = [
  { label: 'Pull Requests', to: '/pulls', icon: GitPullRequest },
  { label: 'Issues', to: '/issues', icon: CircleDot },
  { label: 'Codespaces', to: '/', icon: Cloud },
  { label: 'Marketplace', to: '/', icon: ShoppingBag },
  { label: 'Explore', to: '/', icon: Compass },
]

export default function Header() {
  const location = useLocation()

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      background: '#161b22',
      borderBottom: '1px solid #30363d',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
        <GitBranch size={24} color="#3fb950" strokeWidth={2} />
        <span style={{ fontWeight: 700, fontSize: '16px', color: '#e6edf3', letterSpacing: '-0.02em' }}>
          Forge
        </span>
      </Link>

      {/* Search */}
      <div style={{
        flex: 1,
        maxWidth: '320px',
        position: 'relative',
      }}>
        <Search size={14} color="#8b949e" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
        <input
          type="text"
          placeholder="Search or jump to..."
          style={{
            width: '100%',
            height: '32px',
            background: '#0d1117',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '0 12px 0 32px',
            color: '#8b949e',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <span style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '11px',
          color: '#8b949e',
          border: '1px solid #30363d',
          borderRadius: '4px',
          padding: '1px 5px',
        }}>/</span>
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
        {NAV_LINKS.map(({ label, to, icon: Icon }) => (
          <Link
            key={label}
            to={to}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: 500,
              color: location.pathname === to ? '#e6edf3' : '#c9d1d9',
              background: location.pathname === to ? '#21262d' : 'transparent',
              whiteSpace: 'nowrap',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#21262d'}
            onMouseLeave={e => e.currentTarget.style.background = location.pathname === to ? '#21262d' : 'transparent'}
          >
            <Icon size={14} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        <button style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#8b949e',
          padding: '4px',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
        }}>
          <Bell size={18} />
          <span style={{
            position: 'absolute',
            top: '2px',
            right: '2px',
            width: '8px',
            height: '8px',
            background: '#3fb950',
            borderRadius: '50%',
            border: '2px solid #161b22',
          }} />
        </button>

        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3fb950, #238636)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 700,
            color: '#fff',
            border: '2px solid #30363d',
            cursor: 'pointer',
          }}>
            {CURRENT_USER.avatar}
          </div>
        </Link>
      </div>
    </header>
  )
}
