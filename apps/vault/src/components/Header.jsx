import { Bitcoin, Search, Bell } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { label: 'Home', path: '/' },
  { label: 'Trade', path: '/trade' },
  { label: 'Explore', path: '/explore' },
  { label: 'Earn', path: '/earn' },
  { label: 'NFT', path: '/nft' },
  { label: 'For Business', path: '/business' },
]

export default function Header() {
  const loc = useLocation()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: 64, background: '#ffffff',
      borderBottom: '1px solid #e6e8ea',
      display: 'flex', alignItems: 'center',
      padding: '0 24px', gap: 32,
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32, borderRadius: 8, background: '#1652f0',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Bitcoin size={18} color="#ffffff" strokeWidth={2} />
        </div>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#0a0b0d', letterSpacing: '-0.3px' }}>Vault</span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
        {NAV.map(item => {
          const active = loc.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                padding: '6px 12px',
                borderRadius: 6,
                fontSize: 14,
                fontWeight: active ? 600 : 400,
                color: active ? '#1652f0' : '#0a0b0d',
                textDecoration: 'none',
                background: active ? '#eef1fe' : 'transparent',
                transition: 'all 0.15s',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Right actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#f5f7fa', border: '1px solid #e6e8ea',
          borderRadius: 8, padding: '6px 12px',
        }}>
          <Search size={15} color="#8a919e" />
          <input
            placeholder="Search…"
            style={{
              border: 'none', background: 'transparent',
              fontSize: 13, color: '#0a0b0d', outline: 'none', width: 140,
            }}
          />
        </div>

        {/* Notification bell */}
        <button style={{
          width: 36, height: 36, borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#f5f7fa', border: '1px solid #e6e8ea', cursor: 'pointer', position: 'relative',
        }}>
          <Bell size={17} color="#0a0b0d" />
          <span style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%', background: '#fa3d33',
            border: '1.5px solid #ffffff',
          }} />
        </button>

        {/* Avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #1652f0 0%, #0d3ec7 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
        }}>
          KP
        </div>
      </div>
    </header>
  )
}
