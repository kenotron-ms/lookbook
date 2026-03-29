import { useState } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'

const TAG_COLORS = {
  Backend: { bg: '#1e3a5f', color: '#60a5fa' },
  Security: { bg: '#3d1a1a', color: '#f87171' },
  Design: { bg: '#2a1f3d', color: '#c4b5fd' },
  Mobile: { bg: '#1a3320', color: '#4ade80' },
  Frontend: { bg: '#3d2a1a', color: '#fb923c' },
  Auth: { bg: '#3d2a1a', color: '#fbbf24' },
  Infra: { bg: '#1a2d3d', color: '#38bdf8' },
  Product: { bg: '#3d1a3d', color: '#f472b6' },
  Search: { bg: '#1e3a5f', color: '#60a5fa' },
}

const AVATAR_COLORS = {
  JD: '#9333ea', SR: '#0ea5e9', MK: '#10b981', AL: '#f59e0b',
}

const COLUMNS = [
  {
    id: 'backlog', label: 'Backlog', color: '#555',
    cards: [
      { id: 1, title: 'SSO integration', tags: ['Security', 'Auth'], assignee: 'JD', due: 'Apr 30' },
      { id: 2, title: 'Dashboard analytics', tags: ['Frontend'], assignee: 'SR', due: 'May 1' },
      { id: 3, title: 'Onboarding flow redesign', tags: ['Design', 'Product'], assignee: 'AL', due: 'Apr 12' },
    ]
  },
  {
    id: 'in-progress', label: 'In Progress', color: '#60a5fa',
    cards: [
      { id: 4, title: 'Auth system overhaul', tags: ['Backend', 'Security'], assignee: 'JD', due: 'Mar 30' },
      { id: 5, title: 'API rate limiting', tags: ['Backend'], assignee: 'MK', due: 'Apr 5' },
      { id: 6, title: 'Search indexing', tags: ['Backend', 'Search'], assignee: 'MK', due: 'Mar 28' },
      { id: 7, title: 'Performance audit', tags: ['Infra'], assignee: 'MK', due: 'Mar 31' },
    ]
  },
  {
    id: 'in-review', label: 'In Review', color: '#f59e0b',
    cards: [
      { id: 8, title: 'Mobile app v2.0', tags: ['Mobile'], assignee: 'JD', due: 'Apr 20' },
      { id: 9, title: 'Email notification system', tags: ['Backend'], assignee: 'AL', due: 'Mar 15' },
    ]
  },
  {
    id: 'done', label: 'Done', color: '#4ade80',
    cards: [
      { id: 10, title: 'Design token migration', tags: ['Design'], assignee: 'SR', due: 'Mar 22' },
      { id: 11, title: 'CI/CD pipeline setup', tags: ['Infra'], assignee: 'MK', due: 'Mar 10' },
      { id: 12, title: 'API documentation', tags: ['Backend'], assignee: 'AL', due: 'Mar 8' },
    ]
  },
]

function Tag({ label }) {
  const cfg = TAG_COLORS[label] || { bg: '#252525', color: '#888' }
  return (
    <span style={{
      fontSize: 10, padding: '2px 7px', borderRadius: 3,
      background: cfg.bg, color: cfg.color,
      fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function Avatar({ initials }) {
  return (
    <div style={{
      width: 22, height: 22, borderRadius: '50%',
      background: AVATAR_COLORS[initials] || '#555',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 700, color: '#fff',
    }}>
      {initials}
    </div>
  )
}

function Card({ card }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#2d2d2d' : '#252525',
        border: '1px solid #2d2d2d',
        borderRadius: 6,
        padding: '12px',
        cursor: 'pointer',
        transition: 'background 0.1s, border-color 0.1s',
        borderColor: hovered ? '#9333ea44' : '#2d2d2d',
      }}
    >
      {/* Title */}
      <div style={{ fontSize: 13, color: '#e6e6e6', fontWeight: 500, marginBottom: 10, lineHeight: 1.4 }}>
        {card.title}
      </div>
      {/* Tags */}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 10 }}>
        {card.tags.map(t => <Tag key={t} label={t} />)}
      </div>
      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Avatar initials={card.assignee} />
        <span style={{ fontSize: 11, color: '#555' }}>{card.due}</span>
      </div>
    </div>
  )
}

function Column({ column }) {
  const [colHovered, setColHovered] = useState(false)
  return (
    <div
      style={{
        width: 256, minWidth: 256, flexShrink: 0,
        display: 'flex', flexDirection: 'column', gap: 8,
      }}
    >
      {/* Column header */}
      <div
        onMouseEnter={() => setColHovered(true)}
        onMouseLeave={() => setColHovered(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 4px',
        }}
      >
        <span style={{
          width: 8, height: 8, borderRadius: '50%',
          background: column.color, flexShrink: 0,
        }} />
        <span style={{ fontSize: 13, fontWeight: 600, color: '#e6e6e6', flex: 1 }}>
          {column.label}
        </span>
        <span style={{
          fontSize: 11, color: '#555', background: '#252525',
          border: '1px solid #3d3d3d', borderRadius: 10,
          padding: '1px 7px', fontWeight: 600,
        }}>
          {column.cards.length}
        </span>
        {colHovered && (
          <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#555', padding: 2 }}>
            <MoreHorizontal size={13} />
          </button>
        )}
      </div>

      {/* Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {column.cards.map(card => <Card key={card.id} card={card} />)}
      </div>

      {/* Add card */}
      <button
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '8px 12px',
          background: 'transparent', border: '1px dashed #2d2d2d',
          borderRadius: 6, cursor: 'pointer',
          color: '#555', fontSize: 12, width: '100%',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = '#9333ea44'
          e.currentTarget.style.color = '#9333ea'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = '#2d2d2d'
          e.currentTarget.style.color = '#555'
        }}
      >
        <Plus size={12} />
        Add a card
      </button>
    </div>
  )
}

export default function BoardView() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Page header */}
      <div style={{ padding: '32px 40px 20px', borderBottom: '1px solid #2d2d2d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
          <span style={{ fontSize: 28 }}>🗺️</span>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e6e6e6' }}>Roadmap</h1>
          <span style={{
            fontSize: 11, padding: '2px 8px', borderRadius: 4,
            background: '#2a1f3d', color: '#9333ea', border: '1px solid #9333ea33',
            fontWeight: 500,
          }}>
            Board
          </span>
        </div>
        <p style={{ fontSize: 13, color: '#555' }}>Kanban view — drag cards to update status</p>
      </div>

      {/* Board */}
      <div style={{
        flex: 1, overflowX: 'auto', overflowY: 'auto',
        padding: '24px 40px',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', minWidth: 'max-content' }}>
          {COLUMNS.map(col => <Column key={col.id} column={col} />)}

          {/* Add column */}
          <button
            style={{
              width: 240, padding: '10px 16px',
              background: 'transparent', border: '1px dashed #2d2d2d',
              borderRadius: 8, cursor: 'pointer',
              color: '#555', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 6,
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#9333ea44'
              e.currentTarget.style.color = '#9333ea'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#2d2d2d'
              e.currentTarget.style.color = '#555'
            }}
          >
            <Plus size={14} />
            Add a group
          </button>
        </div>
      </div>
    </div>
  )
}
