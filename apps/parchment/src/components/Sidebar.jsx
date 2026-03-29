import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  BookOpen, ChevronRight, Search, Bell, Settings,
  Plus, MoreHorizontal, FilePlus, Users, Lock
} from 'lucide-react'

const TREE = [
  {
    id: 'getting-started', icon: '📋', label: 'Getting Started',
    children: [
      { id: 'quick-start', icon: '📄', label: 'Quick Start Guide' },
      { id: 'templates', icon: '📄', label: 'Templates' },
    ]
  },
  {
    id: 'product', icon: '🎯', label: 'Product', defaultOpen: true,
    children: [
      { id: 'roadmap', icon: '🗺️', label: 'Roadmap', path: '/database/roadmap' },
      { id: 'feature-specs', icon: '📝', label: 'Feature Specs', path: '/page/feature-specs' },
      { id: 'meeting-notes', icon: '📄', label: 'Meeting Notes' },
    ]
  },
  {
    id: 'design-system', icon: '📊', label: 'Design System',
    children: [
      { id: 'components', icon: '📄', label: 'Components' },
      { id: 'color-tokens', icon: '📄', label: 'Color Tokens' },
    ]
  },
  {
    id: 'team', icon: '👥', label: 'Team',
    children: [
      { id: 'team-directory', icon: '📄', label: 'Team Directory' },
      { id: 'onboarding', icon: '📄', label: 'Onboarding' },
    ]
  },
]

const PRIVATE = [
  { id: 'my-notes', icon: '📄', label: 'My Notes' },
  { id: 'scratch', icon: '📄', label: 'Scratch Pad' },
]

function TreeItem({ item, depth = 0 }) {
  const [open, setOpen] = useState(item.defaultOpen || false)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const hasChildren = item.children && item.children.length > 0
  const isActive = item.path && location.pathname === item.path
  const paddingLeft = 12 + depth * 16

  return (
    <div>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (hasChildren) setOpen(o => !o)
          if (item.path) navigate(item.path)
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          paddingLeft,
          paddingRight: 8,
          paddingTop: 3,
          paddingBottom: 3,
          cursor: 'pointer',
          borderRadius: 4,
          background: isActive ? '#2a1f3d' : hovered ? '#1e1e1e' : 'transparent',
          color: isActive ? '#9333ea' : '#e6e6e6',
          fontSize: 13,
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {/* Chevron */}
        <span
          onClick={e => { e.stopPropagation(); if (hasChildren) setOpen(o => !o) }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            color: '#666',
            flexShrink: 0,
            transition: 'transform 0.15s',
            transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
            visibility: hasChildren ? 'visible' : 'hidden',
          }}
        >
          <ChevronRight size={12} />
        </span>
        {/* Icon */}
        <span style={{ fontSize: 13, flexShrink: 0 }}>{item.icon}</span>
        {/* Label */}
        <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.label}
        </span>
        {/* More */}
        {hovered && (
          <span style={{ color: '#666', display: 'flex', alignItems: 'center' }}>
            <MoreHorizontal size={13} />
          </span>
        )}
      </div>
      {open && hasChildren && (
        <div>
          {item.children.map(child => (
            <TreeItem key={child.id} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <aside style={{
      width: 240,
      minWidth: 240,
      background: '#111111',
      borderRight: '1px solid #2d2d2d',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Workspace selector */}
      <div style={{
        padding: '12px 12px 4px',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        borderRadius: 6,
        margin: '4px 4px 0',
      }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: 6,
          background: 'linear-gradient(135deg, #9333ea, #6d28d9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <BookOpen size={13} color="#fff" />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#e6e6e6', flex: 1 }}>ParaNet Workspace</span>
        <ChevronRight size={13} color="#666" />
      </div>

      {/* Nav items */}
      <div style={{ padding: '8px 4px 0' }}>
        {/* Search */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 4, cursor: 'pointer',
            color: '#888', fontSize: 13,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Search size={14} />
          <span style={{ flex: 1 }}>Search</span>
          <span style={{ fontSize: 11, color: '#555', background: '#252525', padding: '1px 5px', borderRadius: 3, border: '1px solid #333' }}>⌘K</span>
        </div>

        {/* Updates */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 4, cursor: 'pointer',
            color: '#888', fontSize: 13,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Bell size={14} />
          <span style={{ flex: 1 }}>Updates</span>
          <span style={{
            background: '#9333ea', color: '#fff', fontSize: 10,
            borderRadius: 10, padding: '1px 6px', fontWeight: 600
          }}>3</span>
        </div>

        {/* Settings */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 4, cursor: 'pointer',
            color: '#888', fontSize: 13,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Settings size={14} />
          <span>Settings &amp; Members</span>
        </div>

        {/* New page */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '5px 12px', borderRadius: 4, cursor: 'pointer',
            color: '#888', fontSize: 13,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <FilePlus size={14} />
          <span>New page</span>
        </div>
      </div>

      <div style={{ height: 1, background: '#2d2d2d', margin: '8px 0' }} />

      {/* Page tree */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 4px' }}>
        {/* Home link */}
        <div
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '3px 12px 3px 32px', borderRadius: 4, cursor: 'pointer',
            fontSize: 13,
            background: location.pathname === '/' ? '#2a1f3d' : 'transparent',
            color: location.pathname === '/' ? '#9333ea' : '#e6e6e6',
          }}
          onMouseEnter={e => { if (location.pathname !== '/') e.currentTarget.style.background = '#1e1e1e' }}
          onMouseLeave={e => { if (location.pathname !== '/') e.currentTarget.style.background = 'transparent' }}
        >
          <span style={{ fontSize: 13 }}>🏠</span>
          <span>Home</span>
        </div>

        {TREE.map(item => <TreeItem key={item.id} item={item} />)}

        <div style={{ height: 1, background: '#2d2d2d', margin: '8px 4px' }} />

        {/* Private pages */}
        <div style={{ padding: '2px 12px', fontSize: 11, color: '#555', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
          Private
        </div>
        {PRIVATE.map(item => (
          <div
            key={item.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '3px 12px 3px 32px', borderRadius: 4, cursor: 'pointer',
              fontSize: 13, color: '#e6e6e6',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Lock size={11} color="#555" />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom: new page */}
      <div style={{ padding: '8px 4px', borderTop: '1px solid #2d2d2d' }}>
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 12px', borderRadius: 4, cursor: 'pointer',
            color: '#666', fontSize: 13,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1e1e1e'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Plus size={14} />
          <span>New page</span>
        </div>
      </div>
    </aside>
  )
}
