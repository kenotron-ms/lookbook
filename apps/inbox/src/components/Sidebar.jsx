import { Pencil, Inbox, Star, Clock, Send, FileText, ChevronDown, Tag } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { labels } from '../data/emails'

const navItems = [
  { icon: Inbox, label: 'Inbox', path: '/', badge: 24, bold: true },
  { icon: Star, label: 'Starred', path: '/?folder=starred' },
  { icon: Clock, label: 'Snoozed', path: '/?folder=snoozed' },
  { icon: Send, label: 'Sent', path: '/?folder=sent' },
  { icon: FileText, label: 'Drafts', path: '/?folder=drafts', badge: 3, badgeStyle: 'text' },
  { icon: ChevronDown, label: 'More', path: null },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.search
    return location.pathname + location.search === path
  }

  return (
    <aside
      style={{
        width: 240,
        background: '#f6f8fc',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        paddingTop: 8,
        paddingBottom: 16,
      }}
    >
      {/* Compose Button */}
      <div style={{ padding: '0 16px', marginBottom: 8 }}>
        <button
          onClick={() => navigate('/compose')}
          style={{
            background: '#c2e7ff',
            border: 'none',
            borderRadius: 16,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 14,
            color: '#001d35',
            width: '100%',
            transition: 'background 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#a8d7f8'
            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.15)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = '#c2e7ff'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <Pencil size={20} />
          Compose
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '0 8px' }}>
        {navItems.map((item) => {
          const Icon = item.icon
          const active = item.path ? isActive(item.path) : false
          return (
            <button
              key={item.label}
              onClick={() => item.path && navigate(item.path)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '4px 12px 4px 12px',
                borderRadius: 0,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: active ? 700 : (item.bold ? 600 : 400),
                color: '#202124',
                background: active ? '#d3e3fd' : 'transparent',
                borderRadius: active ? 0 : 0,
                transition: 'background 0.1s',
                height: 32,
                textAlign: 'left',
              }}
              className={!active ? 'hover:bg-black/5' : ''}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(0,0,0,0.06)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              {/* Active left bar */}
              <div style={{ width: 4, flexShrink: 0, visibility: 'hidden' }} />
              <Icon size={18} style={{ flexShrink: 0, color: active ? '#1a73e8' : '#444746' }} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: item.badgeStyle === 'text' ? '#444746' : '#202124',
                    marginLeft: 'auto',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {/* Divider */}
      <div style={{ height: 1, background: '#e0e0e0', margin: '8px 16px' }} />

      {/* Labels Section */}
      <div style={{ padding: '0 8px' }}>
        <div
          style={{
            padding: '4px 12px',
            fontSize: 14,
            fontWeight: 500,
            color: '#444746',
            marginBottom: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Tag size={18} style={{ color: '#444746' }} />
          Labels
        </div>

        {labels.map((label) => (
          <button
            key={label.id}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '4px 12px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              color: '#202124',
              height: 32,
              textAlign: 'left',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Colored square */}
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: 3,
                background: label.color,
                flexShrink: 0,
                marginLeft: 2,
              }}
            />
            <span>{label.name}</span>
          </button>
        ))}

        {/* Manage labels */}
        <button
          style={{
            width: '100%',
            padding: '4px 12px',
            paddingLeft: 42,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 13,
            color: '#1a73e8',
            textAlign: 'left',
            height: 32,
          }}
          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
        >
          Manage labels
        </button>
      </div>
    </aside>
  )
}
