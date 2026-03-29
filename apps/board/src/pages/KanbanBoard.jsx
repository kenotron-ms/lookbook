import { useState } from 'react'
import { MoreHorizontal, Plus, Paperclip, MessageSquare, Calendar } from 'lucide-react'
import { mainBoard, members as allMembers, labels as allLabels } from '../data/boards.js'
import CardModal from '../components/CardModal.jsx'

function Avatar({ memberId, size = 24 }) {
  const m = allMembers.find(x => x.id === memberId)
  if (!m) return null
  return (
    <div title={m.name} style={{
      width: size, height: size, borderRadius: '50%',
      background: m.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.38, fontWeight: 700,
      flexShrink: 0, border: '1.5px solid #fff',
    }}>
      {m.initials}
    </div>
  )
}

function LabelPill({ labelId }) {
  const label = allLabels.find(l => l.id === labelId)
  if (!label) return null
  return (
    <span style={{
      background: label.color, color: '#fff',
      fontSize: 11, fontWeight: 600,
      padding: '2px 8px', borderRadius: 3,
      display: 'inline-block',
    }}>
      {label.name}
    </span>
  )
}

function DuePill({ date, status }) {
  if (!date) return null
  const colors = {
    fine: { bg: '#ebecf0', color: '#6b778c' },
    soon: { bg: '#f2d600', color: '#172b4d' },
    overdue: { bg: '#eb5a46', color: '#fff' },
  }
  const c = colors[status] || colors.fine
  const formatted = new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  return (
    <span style={{
      background: c.bg, color: c.color,
      fontSize: 11, fontWeight: 600,
      padding: '2px 7px', borderRadius: 3,
      display: 'inline-flex', alignItems: 'center', gap: 3,
    }}>
      <Calendar size={10} />
      {formatted}
    </span>
  )
}

function Card({ card, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onOpen(card)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff',
        borderRadius: 4,
        boxShadow: hovered
          ? '0 4px 12px rgba(0,0,0,0.18)'
          : '0 1px 3px rgba(0,0,0,0.14)',
        cursor: 'pointer',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s ease, transform 0.1s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
        position: 'relative',
      }}
    >
      {/* Color band at top */}
      {card.topColors && card.topColors.length > 0 && (
        <div style={{
          height: 8,
          background: card.topColors.length === 1
            ? card.topColors[0]
            : `linear-gradient(90deg,${card.topColors.join(',')})`,
        }} />
      )}

      {/* Quick edit btn on hover */}
      {hovered && (
        <button
          onClick={e => { e.stopPropagation(); onOpen(card) }}
          style={{
            position: 'absolute', top: card.topColors?.length ? 14 : 6, right: 6,
            background: '#ebecf0', border: 'none', borderRadius: 3,
            padding: '2px 5px', cursor: 'pointer', color: '#6b778c',
            display: 'flex', alignItems: 'center', fontSize: 11, fontWeight: 600, gap: 2,
          }}
        >
          <MoreHorizontal size={12} /> Edit
        </button>
      )}

      <div style={{ padding: '8px 10px 10px' }}>
        {/* Label pills */}
        {card.labels && card.labels.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {card.labels.map(lid => <LabelPill key={lid} labelId={lid} />)}
          </div>
        )}

        {/* Title */}
        <div style={{
          fontSize: 14, fontWeight: 500, color: '#172b4d',
          lineHeight: 1.4, marginBottom: card.description ? 4 : 0,
        }}>
          {card.title}
        </div>

        {/* Description excerpt */}
        {card.description && (
          <div style={{
            fontSize: 12, color: '#6b778c', lineHeight: 1.4,
            marginBottom: 8, overflow: 'hidden',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          }}>
            {card.description}
          </div>
        )}

        {/* Footer row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
          {/* Due date */}
          <DuePill date={card.dueDate} status={card.dueStatus} />

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Attachments */}
          {card.attachments > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#6b778c' }}>
              <Paperclip size={11} /> {card.attachments}
            </span>
          )}

          {/* Comments */}
          {card.comments > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 12, color: '#6b778c' }}>
              <MessageSquare size={11} /> {card.comments}
            </span>
          )}

          {/* Avatars */}
          {card.members && card.members.length > 0 && (
            <div style={{ display: 'flex', marginLeft: 2 }}>
              {card.members.map((mid, i) => (
                <div key={mid} style={{ marginLeft: i > 0 ? -6 : 0 }}>
                  <Avatar memberId={mid} size={22} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Column({ column, onCardOpen }) {
  const [addHovered, setAddHovered] = useState(false)
  const count = column.cards.length

  return (
    <div style={{
      flexShrink: 0,
      width: 272,
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Column header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 10px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>{column.name}</span>
          <span style={{
            background: 'rgba(255,255,255,0.25)',
            color: '#fff',
            fontSize: 11, fontWeight: 700,
            padding: '1px 7px', borderRadius: 10,
            minWidth: 20, textAlign: 'center',
          }}>{count}</span>
        </div>
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgba(255,255,255,0.75)', padding: 2, borderRadius: 3,
          display: 'flex', alignItems: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Cards container */}
      <div style={{
        background: '#ebecf0',
        borderRadius: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        padding: 8,
        overflowY: 'auto',
        flex: 1,
        minHeight: 0,
      }}>
        {column.cards.map(card => (
          <Card key={card.id} card={card} onOpen={onCardOpen} />
        ))}

        {/* Add card button */}
        <button
          onMouseEnter={() => setAddHovered(true)}
          onMouseLeave={() => setAddHovered(false)}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: addHovered ? 'rgba(0,0,0,0.07)' : 'transparent',
            border: '1.5px dashed rgba(0,0,0,0.2)',
            borderRadius: 4, padding: '8px 10px',
            cursor: 'pointer', color: '#5e6c84',
            fontSize: 13, fontWeight: 500,
            transition: 'background 0.12s ease',
            marginTop: 2,
            width: '100%',
          }}
        >
          <Plus size={14} />
          Add a card
        </button>
      </div>
    </div>
  )
}

export default function KanbanBoard() {
  const [activeCard, setActiveCard] = useState(null)
  const [activeColumn, setActiveColumn] = useState('')

  const handleCardOpen = (card, columnName) => {
    setActiveCard(card)
    setActiveColumn(columnName)
  }

  return (
    <div style={{
      flex: 1,
      height: '100%',
      background: '#026aa7',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Board subheader */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 16px',
        background: 'rgba(0,0,0,0.12)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h1 style={{ color: '#fff', fontWeight: 700, fontSize: 18, letterSpacing: '-0.3px' }}>
            {mainBoard.name}
          </h1>
          <div style={{ display: 'flex', gap: 6 }}>
            {allMembers.slice(0, 4).map((m, i) => (
              <div key={m.id} style={{ marginLeft: i > 0 ? -6 : 0 }}>
                <div title={m.name} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: m.color, border: '2px solid rgba(255,255,255,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 10, fontWeight: 700,
                }}>
                  {m.initials}
                </div>
              </div>
            ))}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 11, fontWeight: 700, cursor: 'pointer',
            }}>
              <Plus size={12} />
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['Filter', 'Sort', 'Power-Ups'].map(label => (
            <button key={label} style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none', borderRadius: 4,
              padding: '5px 12px', cursor: 'pointer',
              color: '#fff', fontSize: 13, fontWeight: 500,
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Columns scroll area */}
      <div style={{
        flex: 1,
        overflowX: 'auto',
        overflowY: 'hidden',
        display: 'flex',
        alignItems: 'flex-start',
        padding: '12px 16px',
        gap: 12,
      }}>
        {mainBoard.columns.map(col => (
          <Column
            key={col.id}
            column={col}
            onCardOpen={(card) => handleCardOpen(card, col.name)}
          />
        ))}

        {/* Add column button */}
        <div style={{ flexShrink: 0, width: 272 }}>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.2)',
            border: 'none', borderRadius: 6,
            padding: '10px 14px', cursor: 'pointer',
            color: '#fff', fontSize: 14, fontWeight: 500,
            width: '100%',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
          >
            <Plus size={16} />
            Add another list
          </button>
        </div>
      </div>

      {/* Card modal */}
      {activeCard && (
        <CardModal
          card={activeCard}
          columnName={activeColumn}
          onClose={() => { setActiveCard(null); setActiveColumn('') }}
        />
      )}
    </div>
  )
}
