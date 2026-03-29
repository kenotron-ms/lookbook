import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  CheckSquare,
  Search,
  Plus,
  Inbox,
  CalendarDays,
  CalendarRange,
  Tag,
  ChevronDown,
  ChevronRight,
  Star,
  Zap,
} from 'lucide-react'
import { PROJECTS, FAVORITES, CURRENT_USER } from '../data/tasks.js'

export default function Sidebar() {
  const navigate  = useNavigate()
  const location  = useLocation()
  const [projectsOpen, setProjectsOpen] = useState(true)
  const [favoritesOpen, setFavoritesOpen] = useState(true)

  const path = location.pathname

  const navItems = [
    { label: 'Inbox',            icon: Inbox,        path: '/inbox',    badge: 5 },
    { label: 'Today',            icon: CalendarDays, path: '/' },
    { label: 'Upcoming',         icon: CalendarRange,path: '/upcoming' },
    { label: 'Filters & Labels', icon: Tag,          path: '/filters'  },
  ]

  const isActive = (p) => {
    if (p === '/' ) return path === '/'
    return path.startsWith(p)
  }

  return (
    <aside style={{
      width: 260,
      flexShrink: 0,
      background: '#282828',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #1a1a1a',
      overflowY: 'auto',
      overflowX: 'hidden',
    }}>

      {/* ── Logo ── */}
      <div style={{
        padding: '16px 14px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
             onClick={() => navigate('/')}>
          <CheckSquare size={22} color="#db4035" strokeWidth={2.5} />
          <span style={{ fontWeight: 700, fontSize: 17, color: '#e8e8e8', letterSpacing: '-0.3px' }}>Slate</span>
        </div>
        <div className="karma-badge">
          <Zap size={10} />
          {CURRENT_USER.karma.toLocaleString()}
        </div>
      </div>

      {/* ── Search + Add ── */}
      <div style={{ padding: '8px 10px', display: 'flex', gap: 6 }}>
        <button
          onClick={() => {}}
          style={{
            flex: 1,
            display: 'flex', alignItems: 'center', gap: 6,
            background: '#1f1f1f',
            border: '1px solid #3d3d3d',
            borderRadius: 6,
            padding: '6px 10px',
            color: '#888',
            fontSize: 13,
            cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
        >
          <Search size={13} />
          Search
        </button>
        <button
          onClick={() => {}}
          style={{
            display: 'flex', alignItems: 'center',
            background: '#db4035',
            border: 'none',
            borderRadius: 6,
            padding: '6px 10px',
            color: '#fff',
            fontSize: 13,
            cursor: 'pointer',
            fontWeight: 600,
            gap: 4,
          }}
        >
          <Plus size={14} strokeWidth={2.5} />
          Add
        </button>
      </div>

      {/* ── Nav ── */}
      <nav style={{ padding: '4px 8px' }}>
        {navItems.map(item => (
          <div
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <item.icon size={16} strokeWidth={1.8}
              color={isActive(item.path) ? '#e8e8e8' : '#aaa'} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{
                background: '#db4035',
                color: '#fff',
                fontSize: 10,
                fontWeight: 700,
                borderRadius: 10,
                padding: '1px 6px',
                minWidth: 18,
                textAlign: 'center',
              }}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </nav>

      <div style={{ height: 1, background: '#333', margin: '8px 12px' }} />

      {/* ── My Projects ── */}
      <div style={{ padding: '0 8px' }}>
        <div
          className="section-header"
          onClick={() => setProjectsOpen(o => !o)}
          style={{ fontSize: 11 }}
        >
          {projectsOpen
            ? <ChevronDown size={13} color="#666" />
            : <ChevronRight size={13} color="#666" />}
          <span>My Projects</span>
          <div style={{ marginLeft: 'auto' }}>
            <Plus
              size={14}
              color="#666"
              style={{ cursor: 'pointer' }}
              onClick={e => e.stopPropagation()}
            />
          </div>
        </div>

        {projectsOpen && PROJECTS.map(proj => (
          <div
            key={proj.id}
            className={`nav-item ${path === `/project/${proj.id}` ? 'active' : ''}`}
            onClick={() => navigate(`/project/${proj.id}`)}
          >
            <span style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: proj.color,
              flexShrink: 0,
            }} />
            <span style={{ flex: 1, fontSize: 13 }}>{proj.name}</span>
            <span style={{ color: '#555', fontSize: 11 }}>{proj.taskCount}</span>
          </div>
        ))}
      </div>

      <div style={{ height: 1, background: '#333', margin: '8px 12px' }} />

      {/* ── Favorites ── */}
      <div style={{ padding: '0 8px' }}>
        <div
          className="section-header"
          onClick={() => setFavoritesOpen(o => !o)}
          style={{ fontSize: 11 }}
        >
          {favoritesOpen
            ? <ChevronDown size={13} color="#666" />
            : <ChevronRight size={13} color="#666" />}
          <Star size={11} color="#ff9933" fill="#ff9933" />
          <span>Favorites</span>
        </div>

        {favoritesOpen && FAVORITES.map(fav => (
          <div
            key={fav.id}
            className="nav-item"
            onClick={() => navigate(`/project/${fav.id}`)}
          >
            <span style={{
              width: 10, height: 10,
              borderRadius: '50%',
              background: fav.color,
              flexShrink: 0,
            }} />
            <span style={{ fontSize: 13 }}>{fav.name}</span>
          </div>
        ))}
      </div>

      {/* ── Bottom user ── */}
      <div style={{ marginTop: 'auto', padding: '12px 14px', borderTop: '1px solid #333' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #db4035 0%, #ff9933 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontWeight: 700, fontSize: 11, flexShrink: 0,
          }}>
            {CURRENT_USER.name.split(' ').map(w => w[0]).join('')}
          </div>
          <div>
            <div style={{ fontSize: 12, color: '#ccc', fontWeight: 600 }}>{CURRENT_USER.name}</div>
            <div style={{ fontSize: 10, color: '#666' }}>Pro · {CURRENT_USER.karma.toLocaleString()} karma</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
