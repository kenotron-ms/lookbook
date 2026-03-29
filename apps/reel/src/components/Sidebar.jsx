import { Home, Zap, Users, Library, History, Clock, ThumbsUp, ChevronRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { channels } from '../data/videos'

const navItems = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Shorts', icon: Zap, path: '/shorts' },
  { label: 'Subscriptions', icon: Users, path: '/search' },
]

const libraryItems = [
  { label: 'Library', icon: Library, path: '/' },
  { label: 'History', icon: History, path: '/' },
  { label: 'Watch Later', icon: Clock, path: '/' },
  { label: 'Liked Videos', icon: ThumbsUp, path: '/' },
]

export default function Sidebar({ collapsed }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [hovered, setHovered] = useState(false)

  const isExpanded = !collapsed && hovered || !collapsed
  const width = collapsed ? 72 : (hovered ? 240 : 72)

  // On shorts page, sidebar is hidden
  if (location.pathname === '/shorts') return null

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        top: 56,
        left: 0,
        bottom: 0,
        width: hovered ? 240 : 72,
        background: '#0f0f0f',
        borderRight: hovered ? '1px solid #3d3d3d' : 'none',
        transition: 'width 0.2s ease',
        overflowY: hovered ? 'auto' : 'hidden',
        overflowX: 'hidden',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 8,
      }}
    >
      {/* Main nav */}
      {navItems.map(item => (
        <NavItem
          key={item.label}
          item={item}
          expanded={hovered}
          active={location.pathname === item.path}
          onClick={() => navigate(item.path)}
        />
      ))}

      <Divider expanded={hovered} />

      {/* Library */}
      {libraryItems.map(item => (
        <NavItem
          key={item.label}
          item={item}
          expanded={hovered}
          active={false}
          onClick={() => {}}
        />
      ))}

      {hovered && (
        <>
          <Divider expanded={hovered} />
          {/* Subscriptions list */}
          <div style={{ padding: '8px 16px 4px', fontSize: 13, fontWeight: 600, color: '#f1f1f1', whiteSpace: 'nowrap' }}>
            Subscriptions
          </div>
          {channels.slice(0, 6).map(ch => (
            <button
              key={ch.id}
              onClick={() => navigate('/channel')}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#f1f1f1', width: '100%', textAlign: 'left',
                borderRadius: 8,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#272727'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                background: ch.bannerGradient, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 9, fontWeight: 700, color: '#fff',
              }}>
                {ch.name.slice(0, 1)}
              </div>
              <span style={{ fontSize: 13, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {ch.name}
              </span>
            </button>
          ))}
        </>
      )}
    </aside>
  )
}

function NavItem({ item, expanded, active, onClick }) {
  const Icon = item.icon
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: expanded ? 'row' : 'column',
        alignItems: 'center',
        justifyContent: expanded ? 'flex-start' : 'center',
        gap: expanded ? 12 : 4,
        padding: expanded ? '10px 16px' : '14px 8px',
        background: active ? '#272727' : 'none',
        border: 'none',
        cursor: 'pointer',
        color: active ? '#f1f1f1' : '#f1f1f1',
        width: '100%',
        borderRadius: 8,
        transition: 'background 0.15s',
        minHeight: expanded ? 40 : 64,
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#272727' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'none' }}
    >
      <div style={{ position: 'relative' }}>
        <Icon size={20} color={active ? '#ff0000' : '#f1f1f1'} />
        {active && !expanded && (
          <div style={{
            position: 'absolute', left: '50%', bottom: -2,
            transform: 'translateX(-50%)',
            width: 3, height: 3, borderRadius: '50%', background: '#ff0000',
          }} />
        )}
      </div>
      {expanded ? (
        <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, whiteSpace: 'nowrap' }}>{item.label}</span>
      ) : (
        <span style={{ fontSize: 9, color: '#aaaaaa' }}>{item.label}</span>
      )}
    </button>
  )
}

function Divider({ expanded }) {
  return (
    <div style={{
      margin: expanded ? '8px 16px' : '8px',
      height: 1,
      background: '#3d3d3d',
    }} />
  )
}