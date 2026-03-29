import { useState } from 'react'
import { Activity, CheckSquare, Clock, ArrowRight } from 'lucide-react'
import { activityFeed, mainBoard, members as allMembers } from '../data/boards.js'
import { useNavigate } from 'react-router-dom'

function Avatar({ member, size = 32 }) {
  return (
    <div title={member.name} style={{
      width: size, height: size, borderRadius: '50%',
      background: member.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.37, fontWeight: 700,
      flexShrink: 0,
    }}>
      {member.initials}
    </div>
  )
}

// Get all cards assigned to "AK" (current user = m1)
function getMyCards() {
  return mainBoard.columns.flatMap(col =>
    col.cards
      .filter(c => c.members.includes('m1'))
      .map(c => ({ ...c, columnName: col.name }))
  )
}

function getDueCards() {
  return mainBoard.columns.flatMap(col =>
    col.cards
      .filter(c => c.dueDate && (c.dueStatus === 'soon' || c.dueStatus === 'overdue'))
      .map(c => ({ ...c, columnName: col.name }))
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
}

const DUE_COLORS = {
  soon: { bg: '#fff9c4', text: '#172b4d', border: '#f2d600' },
  overdue: { bg: '#ffebe6', text: '#bf2600', border: '#eb5a46' },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const myCards = getMyCards()
  const dueCards = getDueCards()

  return (
    <div style={{
      height: '100%',
      background: '#f4f5f7',
      overflowY: 'auto',
      padding: '28px 40px',
      display: 'flex',
      gap: 28,
      flexWrap: 'wrap',
    }}>
      {/* Left column */}
      <div style={{ flex: 1, minWidth: 300 }}>
        {/* Activity Feed */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Activity size={16} color="#172b4d" />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Activity</h2>
          </div>
          <div style={{
            background: '#fff', borderRadius: 6,
            border: '1px solid #dfe1e6',
            overflow: 'hidden',
          }}>
            {activityFeed.map((item, i) => (
              <div
                key={item.id}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  padding: '14px 16px',
                  borderBottom: i < activityFeed.length - 1 ? '1px solid #f1f2f4' : 'none',
                }}
              >
                <Avatar member={item.member} size={32} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, color: '#172b4d', lineHeight: 1.5 }}>
                    <strong>{item.member.name}</strong>{' '}
                    {item.action}{' '}
                    <span
                      onClick={() => navigate('/board')}
                      style={{ color: '#0052cc', cursor: 'pointer', fontWeight: 500 }}
                    >
                      {item.card}
                    </span>
                    {item.from && item.to && (
                      <span style={{ color: '#6b778c' }}>
                        {' '}from <em>{item.from}</em> to <em>{item.to}</em>
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b778c', marginTop: 2 }}>{item.time}</div>
                </div>
                <div style={{
                  fontSize: 11, color: '#0052cc', cursor: 'pointer',
                  flexShrink: 0, display: 'flex', alignItems: 'center', gap: 2,
                }}
                  onClick={() => navigate('/board')}
                >
                  View <ArrowRight size={10} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right column */}
      <div style={{ width: 320, flexShrink: 0 }}>
        {/* Cards assigned to me */}
        <section style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <CheckSquare size={16} color="#172b4d" />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Assigned to me</h2>
            <span style={{
              background: '#0052cc', color: '#fff',
              fontSize: 11, fontWeight: 700,
              padding: '1px 7px', borderRadius: 10,
              marginLeft: 2,
            }}>{myCards.length}</span>
          </div>
          <div style={{
            background: '#fff', borderRadius: 6,
            border: '1px solid #dfe1e6', overflow: 'hidden',
          }}>
            {myCards.map((card, i) => (
              <div
                key={card.id}
                onClick={() => navigate('/board')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '12px 14px',
                  borderBottom: i < myCards.length - 1 ? '1px solid #f1f2f4' : 'none',
                  cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f8f9fb'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: card.dueStatus === 'overdue' ? '#eb5a46'
                    : card.dueStatus === 'soon' ? '#f2d600'
                    : '#61bd4f',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 500, color: '#172b4d',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {card.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#6b778c', marginTop: 1 }}>
                    Product Roadmap · {card.columnName}
                  </div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 600,
                  color: card.dueStatus === 'overdue' ? '#eb5a46'
                    : card.dueStatus === 'soon' ? '#d29034' : '#6b778c',
                  flexShrink: 0,
                }}>
                  {card.dueDate ? new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Due soon */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Clock size={16} color="#172b4d" />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Due soon</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {dueCards.map(card => {
              const s = DUE_COLORS[card.dueStatus] || DUE_COLORS.soon
              return (
                <div
                  key={card.id}
                  onClick={() => navigate('/board')}
                  style={{
                    background: s.bg, border: `1px solid ${s.border}`,
                    borderRadius: 6, padding: '10px 14px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 600, color: s.text, marginBottom: 2 }}>
                    {card.title}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#6b778c' }}>{card.columnName}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: s.text === '#bf2600' ? '#bf2600' : '#6b778c' }}>
                      {new Date(card.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      {card.dueStatus === 'overdue' && ' · Overdue'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
