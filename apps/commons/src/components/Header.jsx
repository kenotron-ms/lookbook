import { useNavigate, useLocation } from 'react-router-dom'
import { Users, Search, Home, UsersRound, ShoppingBag, Gamepad2, PlaySquare, Bell, MessageCircle, ChevronDown, Plus, Menu } from 'lucide-react'
import { useState } from 'react'
import { CURRENT_USER } from '../data/posts.js'

const ACCENT = '#1877f2'

function NavIcon({ icon: Icon, label, path, active }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(path)}
      title={label}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '0 20px', height: 48, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        borderBottom: active ? `3px solid ${ACCENT}` : '3px solid transparent',
        color: active ? ACCENT : '#65676b',
        transition: 'all 0.1s',
      }}
    >
      <Icon size={24} />
    </button>
  )
}

function IconBtn({ icon: Icon, badge }) {
  return (
    <div style={{ position: 'relative' }}>
      <button style={{
        width: 40, height: 40, borderRadius: '50%',
        backgroundColor: '#e4e6eb', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#050505',
      }}>
        <Icon size={20} />
      </button>
      {badge && (
        <span style={{
          position: 'absolute', top: -2, right: -2,
          backgroundColor: '#f02849', color: '#fff',
          borderRadius: 999, fontSize: 11, fontWeight: 700,
          padding: '1px 5px', border: '2px solid #fff', lineHeight: 1.4,
        }}>{badge}</span>
      )}
    </div>
  )
}

export default function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: UsersRound, label: 'Groups', path: '/groups' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/marketplace' },
    { icon: Gamepad2, label: 'Gaming', path: '#' },
    { icon: PlaySquare, label: 'Watch', path: '#' },
  ]

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: 56,
      display: 'flex', alignItems: 'center',
    }}>
      {/* Left: Logo + Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', minWidth: 0, flex: 1 }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
          }}
        >
          <Users size={24} color="#fff" />
        </div>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          backgroundColor: '#f0f2f5', borderRadius: 999,
          padding: '0 12px', height: 36,
        }}>
          <Search size={16} color="#65676b" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Commons"
            style={{
              background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: '#050505', width: 160,
            }}
          />
        </div>
      </div>

      {/* Center: Nav icons */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto' }}>
        {navItems.map(item => (
          <NavIcon
            key={item.label}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={location.pathname === item.path}
          />
        ))}
      </nav>

      {/* Right: actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 16px', flex: 1, justifyContent: 'flex-end' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 4, padding: '6px 12px',
          backgroundColor: '#e7f3ff', color: ACCENT, border: 'none', borderRadius: 6,
          cursor: 'pointer', fontWeight: 600, fontSize: 14,
        }}>
          <Plus size={16} />
          Create
        </button>
        <IconBtn icon={MessageCircle} badge="3" />
        <IconBtn icon={Bell} badge="9" />
        <button
          onClick={() => navigate('/profile')}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: CURRENT_USER.color,
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 15, flexShrink: 0,
          }}
        >
          {CURRENT_USER.initials}
        </button>
      </div>
    </header>
  )
}
