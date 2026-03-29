import { useState } from 'react'
import { Users } from 'lucide-react'
import { templates } from '../data/boards.js'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = ['All', 'Business', 'Marketing', 'Engineering', 'Personal']

function formatCount(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return n.toString()
}

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('All')
  const navigate = useNavigate()

  const filtered = activeCategory === 'All'
    ? templates
    : templates.filter(t => t.category === activeCategory)

  return (
    <div style={{
      height: '100%',
      background: '#f4f5f7',
      overflowY: 'auto',
      padding: '28px 40px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#172b4d', marginBottom: 6 }}>
          Board Templates
        </h1>
        <p style={{ fontSize: 14, color: '#6b778c' }}>
          Get started faster with templates built by Board's community.
        </p>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '6px 16px', borderRadius: 4,
              border: 'none', cursor: 'pointer',
              fontWeight: 600, fontSize: 13,
              background: activeCategory === cat ? '#0052cc' : '#ebecf0',
              color: activeCategory === cat ? '#fff' : '#172b4d',
              transition: 'background 0.12s ease',
            }}
            onMouseEnter={e => {
              if (activeCategory !== cat) e.currentTarget.style.background = '#d5d9de'
            }}
            onMouseLeave={e => {
              if (activeCategory !== cat) e.currentTarget.style.background = '#ebecf0'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))',
        gap: 16,
      }}>
        {filtered.map(template => (
          <div
            key={template.id}
            onClick={() => navigate('/board')}
            style={{
              background: '#fff',
              borderRadius: 8,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'box-shadow 0.15s ease, transform 0.1s ease',
              display: 'flex', flexDirection: 'column',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.1)'
              e.currentTarget.style.transform = 'none'
            }}
          >
            {/* Color preview */}
            <div style={{
              height: 100,
              background: template.bg,
              position: 'relative',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {/* Mini kanban preview */}
              <div style={{ display: 'flex', gap: 6, padding: '12px' }}>
                {['', '', ''].map((_, i) => (
                  <div key={i} style={{
                    width: 48, background: 'rgba(255,255,255,0.25)',
                    borderRadius: 3, padding: '4px',
                    display: 'flex', flexDirection: 'column', gap: 3,
                  }}>
                    {Array.from({ length: i + 1 }).map((_, j) => (
                      <div key={j} style={{
                        height: i === 2 ? (j === 0 ? 14 : 10) : 12,
                        background: 'rgba(255,255,255,0.6)',
                        borderRadius: 2,
                      }} />
                    ))}
                  </div>
                ))}
              </div>

              {/* Category badge */}
              <div style={{
                position: 'absolute', top: 8, right: 8,
                background: 'rgba(0,0,0,0.3)',
                color: '#fff', fontSize: 10, fontWeight: 700,
                padding: '2px 8px', borderRadius: 3,
                textTransform: 'uppercase', letterSpacing: '0.5px',
              }}>
                {template.category}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: '#172b4d', marginBottom: 6 }}>
                {template.name}
              </h3>
              <p style={{
                fontSize: 12, color: '#6b778c', lineHeight: 1.5,
                flex: 1, marginBottom: 12,
              }}>
                {template.description}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#6b778c', fontSize: 12 }}>
                  <Users size={12} />
                  {formatCount(template.uses)} uses
                </div>
                <button style={{
                  background: '#0052cc', color: '#fff',
                  border: 'none', borderRadius: 4,
                  padding: '5px 12px', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600,
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#003d99'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0052cc'}
                >
                  Use template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
