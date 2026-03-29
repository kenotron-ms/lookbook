import { useNavigate } from 'react-router-dom'
import { Star, Clock, ArrowRight, FileText, Database, Layout, BookOpen } from 'lucide-react'

const RECENT = [
  { id: 'feature-specs', icon: '📝', title: 'Feature Specs', edited: '2 min ago', path: '/page/feature-specs' },
  { id: 'roadmap', icon: '🗺️', title: 'Roadmap', edited: '1 hour ago', path: '/database/roadmap' },
  { id: 'getting-started', icon: '📋', title: 'Getting Started', edited: 'Yesterday' },
  { id: 'design-system', icon: '📊', title: 'Design System', edited: '2 days ago' },
  { id: 'meeting-notes', icon: '📄', title: 'Meeting Notes', edited: '3 days ago' },
  { id: 'team-dir', icon: '👥', title: 'Team Directory', edited: '1 week ago' },
]

const FAVORITES = [
  { id: 'feature-specs', icon: '📝', title: 'Feature Specs', path: '/page/feature-specs' },
  { id: 'roadmap', icon: '🗺️', title: 'Roadmap', path: '/database/roadmap' },
  { id: 'board', icon: '📌', title: 'Board View', path: '/board/roadmap' },
  { id: 'design', icon: '📊', title: 'Design System' },
]

const QUICKLINKS = [
  { icon: FileText, label: 'New page', color: '#9333ea', action: '/page/feature-specs' },
  { icon: Database, label: 'New database', color: '#0ea5e9', action: '/database/roadmap' },
  { icon: Layout, label: 'Board view', color: '#10b981', action: '/board/roadmap' },
]

export default function Home() {
  const navigate = useNavigate()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 40px 80px' }}>
      {/* Greeting */}
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 30, fontWeight: 700, color: '#e6e6e6', marginBottom: 6 }}>
          {greeting}, Jordan 👋
        </h1>
        <p style={{ color: '#666', fontSize: 14 }}>Here's what you've been working on</p>
      </div>

      {/* Quick Links */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 10 }}>
          {QUICKLINKS.map(({ icon: Icon, label, color, action }) => (
            <button
              key={label}
              onClick={() => navigate(action)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px', borderRadius: 6,
                background: '#252525', border: '1px solid #2d2d2d',
                color: '#e6e6e6', fontSize: 13, cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2f2f2f'}
              onMouseLeave={e => e.currentTarget.style.background = '#252525'}
            >
              <Icon size={14} color={color} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Recent */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Clock size={14} color="#666" />
          <h2 style={{ fontSize: 13, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Recently Edited
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {RECENT.map(page => (
            <div
              key={page.id}
              onClick={() => page.path && navigate(page.path)}
              style={{
                background: '#252525',
                border: '1px solid #2d2d2d',
                borderRadius: 6,
                padding: '16px',
                cursor: page.path ? 'pointer' : 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#9333ea44'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#2d2d2d'}
            >
              <div style={{ fontSize: 24, marginBottom: 10 }}>{page.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#e6e6e6', marginBottom: 4 }}>{page.title}</div>
              <div style={{ fontSize: 11, color: '#555' }}>Edited {page.edited}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Favorites */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <Star size={14} color="#666" />
          <h2 style={{ fontSize: 13, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Favorites
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {FAVORITES.map(page => (
            <div
              key={page.id}
              onClick={() => page.path && navigate(page.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 12px', borderRadius: 6,
                cursor: page.path ? 'pointer' : 'default',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#252525'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <span style={{ fontSize: 15 }}>{page.icon}</span>
              <span style={{ fontSize: 13, color: '#e6e6e6', flex: 1 }}>{page.title}</span>
              {page.path && <ArrowRight size={12} color="#444" />}
            </div>
          ))}
        </div>
      </section>

      {/* Workspace summary */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <BookOpen size={14} color="#666" />
          <h2 style={{ fontSize: 13, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Workspace
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
          {[
            { label: 'Pages', value: '24', sub: 'across 6 sections' },
            { label: 'Databases', value: '3', sub: 'tables, boards, calendars' },
            { label: 'Members', value: '8', sub: 'active this week' },
            { label: 'Comments', value: '12', sub: 'unresolved threads' },
          ].map(stat => (
            <div key={stat.label} style={{
              background: '#252525', border: '1px solid #2d2d2d',
              borderRadius: 6, padding: '16px',
            }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#9333ea', marginBottom: 2 }}>{stat.value}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#e6e6e6', marginBottom: 2 }}>{stat.label}</div>
              <div style={{ fontSize: 11, color: '#555' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
