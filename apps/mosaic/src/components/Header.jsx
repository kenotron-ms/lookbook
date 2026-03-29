import { Grid3x3, Search, Bell, Plus, ChevronDown } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const location = useLocation()

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Following', path: '/following' },
    { label: 'Explore', path: '/explore' },
  ]

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #e0e0e0',
        height: 60,
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', flexShrink: 0 }}>
        <Grid3x3 size={28} color="#e60023" strokeWidth={2.5} />
        <span style={{ fontWeight: 700, fontSize: 20, color: '#e60023', letterSpacing: '-0.5px' }}>Mosaic</span>
      </Link>

      {/* Nav items */}
      <nav style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {navItems.map(item => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.label}
              to={item.path}
              style={{
                padding: '8px 16px',
                borderRadius: 24,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: 'none',
                color: isActive ? '#ffffff' : '#111111',
                background: isActive ? '#111111' : 'transparent',
                transition: 'background 0.15s',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Search bar */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Search
          size={16}
          color="#767676"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
        />
        <input
          type="text"
          placeholder="Search for any idea..."
          style={{
            width: '100%',
            padding: '10px 16px 10px 40px',
            borderRadius: 24,
            border: 'none',
            background: '#f0f0f0',
            fontSize: 14,
            color: '#111111',
            outline: 'none',
          }}
        />
      </div>

      {/* Right side actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Notification bell */}
        <button
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: 'none',
            background: '#f0f0f0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bell size={18} color="#111111" />
        </button>

        {/* Avatar */}
        <Link to="/profile">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e60023 0%, #ff6584 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            YT
          </div>
        </Link>

        {/* Create button */}
        <Link to="/create" style={{ textDecoration: 'none' }}>
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '10px 18px',
              background: '#e60023',
              color: '#ffffff',
              border: 'none',
              borderRadius: 24,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            <Plus size={16} />
            Create
          </button>
        </Link>
      </div>
    </header>
  )
}
