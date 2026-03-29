import { useNavigate } from 'react-router-dom'
import {
  Home, Clock, Star, Trash2, LayoutGrid, Layers,
  FileText, FolderPlus, Bookmark, ChevronRight
} from 'lucide-react'

const ACCENT = '#7c3aed'

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Clock, label: 'Recent', path: '/' },
  { icon: Star, label: 'Starred', path: '/' },
  { icon: Trash2, label: 'Trash', path: '/' },
]

const libraryItems = [
  { icon: LayoutGrid, label: 'All designs', path: '/' },
  { icon: Bookmark, label: 'Brand hub', path: '/brand' },
  { icon: FileText, label: 'Templates', path: '/templates' },
  { icon: FolderPlus, label: 'Create a folder', path: '/', accent: true },
]

export default function Sidebar({ active = 'Home' }) {
  const navigate = useNavigate()

  const Item = ({ icon: Icon, label, path, accent }) => {
    const isActive = label === active
    return (
      <button
        onClick={() => navigate(path)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          width: '100%', padding: '8px 12px', borderRadius: 9,
          border: 'none', cursor: 'pointer', textAlign: 'left',
          background: isActive ? '#ede9fe' : 'none',
          color: isActive ? ACCENT : accent ? '#667085' : '#120b20',
          fontSize: 14, fontWeight: isActive ? 600 : 500,
          transition: 'all 0.14s',
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f3f4f6' }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none' }}
      >
        <Icon size={17} color={isActive ? ACCENT : accent ? '#9ca3af' : '#667085'} />
        <span>{label}</span>
      </button>
    )
  }

  return (
    <aside style={{
      width: 220, flexShrink: 0,
      background: '#f4f4f5',
      borderRight: '1px solid #e5e7eb',
      display: 'flex', flexDirection: 'column',
      padding: '16px 12px',
      overflowY: 'auto',
      gap: 2,
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '4px 12px 8px' }}>
        Navigation
      </div>
      {navItems.map(item => <Item key={item.label} {...item} />)}

      <div style={{ height: 1, background: '#e5e7eb', margin: '12px 4px' }} />

      <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', padding: '4px 12px 8px' }}>
        Library
      </div>
      {libraryItems.map(item => <Item key={item.label} {...item} />)}

      <div style={{ flex: 1 }} />

      {/* Upgrade CTA */}
      <div style={{
        margin: '12px 0 4px',
        padding: '14px',
        borderRadius: 12,
        background: 'linear-gradient(135deg, #7c3aed15 0%, #a855f715 100%)',
        border: '1px solid #ede9fe',
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#120b20', marginBottom: 4 }}>
          Try Palette Pro
        </div>
        <div style={{ fontSize: 12, color: '#667085', marginBottom: 10 }}>
          Unlock premium templates, fonts &amp; brand kits.
        </div>
        <button style={{
          width: '100%', padding: '7px 0', borderRadius: 8,
          background: ACCENT, color: '#fff', border: 'none',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          Upgrade <ChevronRight size={14} />
        </button>
      </div>
    </aside>
  )
}
