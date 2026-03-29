import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Paintbrush, Search, ChevronDown, Bell, Plus,
  Monitor, Image, Type, Video, Star, Crop
} from 'lucide-react'

const ACCENT = '#7c3aed'

const createMenuItems = [
  { icon: Monitor, label: 'Presentation', color: '#7c3aed' },
  { icon: Image, label: 'Social Post', color: '#ec4899' },
  { icon: Star, label: 'Logo', color: '#f59e0b' },
  { icon: Video, label: 'Video', color: '#ef4444' },
  { icon: Crop, label: 'Poster', color: '#10b981' },
  { icon: Plus, label: 'Custom size', color: '#6366f1' },
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchVal, setSearchVal] = useState('')

  return (
    <header style={{
      height: 64,
      background: '#ffffff',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 12,
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexShrink: 0,
    }}>
      {/* Logo */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px',
          borderRadius: 8, textDecoration: 'none',
        }}
      >
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Paintbrush size={20} color="#fff" />
        </div>
        <span style={{ fontSize: 18, fontWeight: 700, color: '#120b20', letterSpacing: '-0.5px' }}>
          Palette
        </span>
      </button>

      {/* Search bar */}
      <div style={{
        flex: 1, maxWidth: 480, position: 'relative',
        display: 'flex', alignItems: 'center',
      }}>
        <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: 12, pointerEvents: 'none' }} />
        <input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          placeholder="What will you design today?"
          style={{
            width: '100%', height: 40, paddingLeft: 38, paddingRight: 16,
            borderRadius: 10, border: '1.5px solid #e5e7eb',
            background: '#f9fafb', fontSize: 14, color: '#120b20',
            outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => e.target.style.borderColor = ACCENT}
          onBlur={e => e.target.style.borderColor = '#e5e7eb'}
        />
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {[
          { label: 'Home', path: '/' },
          { label: 'Templates', path: '/templates' },
          { label: 'Brand Hub', path: '/brand' },
          { label: 'Editor', path: '/editor' },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              background: location.pathname === item.path ? '#f3f0ff' : 'none',
              border: 'none', cursor: 'pointer',
              padding: '6px 12px', borderRadius: 8,
              fontSize: 14, fontWeight: 500,
              color: location.pathname === item.path ? ACCENT : '#667085',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { if (location.pathname !== item.path) e.target.style.background = '#f9fafb' }}
            onMouseLeave={e => { if (location.pathname !== item.path) e.target.style.background = 'none' }}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Create a design */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: ACCENT, color: '#fff',
            border: 'none', borderRadius: 10, padding: '9px 16px',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(124,58,237,0.35)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#6d28d9'}
          onMouseLeave={e => e.currentTarget.style.background = ACCENT}
        >
          <Plus size={16} />
          Create a design
          <ChevronDown size={14} />
        </button>

        {menuOpen && (
          <div style={{
            position: 'absolute', top: '110%', right: 0,
            background: '#fff', borderRadius: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
            border: '1px solid #f0f0f0',
            padding: 12, width: 260, zIndex: 200,
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#667085', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8, padding: '0 4px' }}>
              Quick create
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {createMenuItems.map(({ icon: Icon, label, color }) => (
                <button
                  key={label}
                  onClick={() => { navigate('/editor'); setMenuOpen(false) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px', borderRadius: 8, border: 'none',
                    background: '#f9fafb', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500, color: '#120b20',
                    transition: 'background 0.15s', textAlign: 'left',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f3f0ff'}
                  onMouseLeave={e => e.currentTarget.style.background = '#f9fafb'}
                >
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} color="#fff" />
                  </div>
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Notification bell */}
      <button style={{
        width: 36, height: 36, borderRadius: 10, background: '#f4f4f5',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: 'background 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = '#ede9fe'}
        onMouseLeave={e => e.currentTarget.style.background = '#f4f4f5'}
      >
        <Bell size={17} color="#667085" />
        <div style={{
          position: 'absolute', top: 7, right: 7,
          width: 7, height: 7, borderRadius: '50%',
          background: '#ef4444', border: '1.5px solid #fff',
        }} />
      </button>

      {/* Avatar */}
      <div style={{
        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0,
      }}>
        KP
      </div>

      {/* Backdrop for menu */}
      {menuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 150 }}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  )
}
