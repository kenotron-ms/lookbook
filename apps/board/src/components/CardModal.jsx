import { X, AlignLeft, Tag, Users, Calendar, Paperclip, MessageSquare, ArrowRight, ChevronRight } from 'lucide-react'
import { labels as allLabels, members as allMembers } from '../data/boards.js'

const COLUMN_NAMES = ['Backlog', 'To Do', 'In Progress', 'Review', 'Done']

function Avatar({ member, size = 28 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: member.color,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.38, fontWeight: 700,
      flexShrink: 0,
    }}>
      {member.initials}
    </div>
  )
}

export default function CardModal({ card, columnName, onClose }) {
  if (!card) return null

  const cardLabels = (card.labels || []).map(id => allLabels.find(l => l.id === id)).filter(Boolean)
  const cardMembers = (card.members || []).map(id => allMembers.find(m => m.id === id)).filter(Boolean)

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.55)',
        zIndex: 1000,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 60, paddingBottom: 40,
        overflowY: 'auto',
      }}
    >
      <div style={{
        background: '#f4f5f7',
        borderRadius: 8,
        width: 680,
        maxWidth: '95vw',
        boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Color band at top */}
        {card.topColors && card.topColors.length > 0 && (
          <div style={{
            height: 8, borderRadius: '8px 8px 0 0',
            background: card.topColors.length === 1
              ? card.topColors[0]
              : `linear-gradient(90deg,${card.topColors.join(',')})`,
          }} />
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 12, right: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6b778c', padding: 4, borderRadius: 4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ebecf0'; e.currentTarget.style.color = '#172b4d' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#6b778c' }}
        >
          <X size={18} />
        </button>

        <div style={{ display: 'flex', gap: 16, padding: '20px 20px 24px 20px' }}>
          {/* Left main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Title */}
            <h2 style={{
              fontSize: 20, fontWeight: 600, color: '#172b4d',
              lineHeight: 1.3, marginBottom: 4,
            }}>
              {card.title}
            </h2>

            {/* Column indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20, color: '#6b778c', fontSize: 12 }}>
              <span>in list</span>
              <span style={{
                fontWeight: 600, color: '#172b4d',
                textDecoration: 'underline', textDecorationStyle: 'dashed',
                cursor: 'pointer',
              }}>{columnName}</span>
            </div>

            {/* Labels */}
            {cardLabels.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Labels</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cardLabels.map(label => (
                    <div key={label.id} style={{
                      background: label.color,
                      color: '#fff',
                      fontSize: 12, fontWeight: 600,
                      padding: '4px 10px', borderRadius: 4,
                      cursor: 'pointer',
                    }}>
                      {label.name}
                    </div>
                  ))}
                  <div style={{
                    background: '#ebecf0', color: '#6b778c',
                    fontSize: 12, fontWeight: 600,
                    padding: '4px 10px', borderRadius: 4, cursor: 'pointer',
                  }}>
                    +
                  </div>
                </div>
              </div>
            )}

            {/* Members */}
            {cardMembers.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Members</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  {cardMembers.map(m => (
                    <Avatar key={m.id} member={m} size={32} />
                  ))}
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#ebecf0', color: '#6b778c',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, cursor: 'pointer', fontWeight: 400,
                  }}>
                    +
                  </div>
                </div>
              </div>
            )}

            {/* Due date */}
            {card.dueDate && (
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Due Date</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <input type="checkbox" checked={card.dueStatus === 'fine' || card.dueStatus === 'overdue'} readOnly style={{ cursor: 'pointer' }} />
                  <span style={{
                    background: card.dueStatus === 'overdue' ? '#eb5a46' : card.dueStatus === 'soon' ? '#f2d600' : '#ebecf0',
                    color: card.dueStatus === 'overdue' ? '#fff' : card.dueStatus === 'soon' ? '#172b4d' : '#6b778c',
                    fontSize: 12, fontWeight: 600, padding: '4px 8px', borderRadius: 4,
                  }}>
                    {card.dueDate}
                  </span>
                  {card.dueStatus === 'overdue' && (
                    <span style={{ fontSize: 12, color: '#eb5a46', fontWeight: 600 }}>Overdue</span>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <AlignLeft size={16} color="#6b778c" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#172b4d' }}>Description</span>
              </div>
              <textarea
                defaultValue={card.description || ''}
                placeholder="Add a more detailed description…"
                style={{
                  width: '100%', minHeight: 80, padding: '8px 10px',
                  background: '#ebecf0', border: 'none', borderRadius: 4,
                  fontSize: 14, color: '#172b4d', resize: 'vertical',
                  fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
                }}
                onFocus={e => { e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 2px #0052cc' }}
                onBlur={e => { e.target.style.background = '#ebecf0'; e.target.style.boxShadow = 'none' }}
              />
            </div>

            {/* Attachments */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Paperclip size={16} color="#6b778c" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#172b4d' }}>Attachments</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: '#ebecf0', borderRadius: 4, padding: '8px 10px',
              }}>
                <div style={{
                  width: 64, height: 48, borderRadius: 4,
                  background: 'linear-gradient(135deg,#026aa7,#0052cc)',
                  flexShrink: 0,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#172b4d' }}>design-spec-v3.pdf</div>
                  <div style={{ fontSize: 11, color: '#6b778c' }}>Added 2 days ago</div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <button style={{ fontSize: 11, color: '#0052cc', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Download</button>
                    <button style={{ fontSize: 11, color: '#eb5a46', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <MessageSquare size={16} color="#6b778c" />
                <span style={{ fontSize: 14, fontWeight: 700, color: '#172b4d' }}>Activity</span>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <Avatar member={{ initials: 'AK', color: '#5aac44' }} size={28} />
                <textarea
                  placeholder="Write a comment…"
                  style={{
                    flex: 1, minHeight: 60, padding: '8px 10px',
                    background: '#ebecf0', border: '1px solid transparent', borderRadius: 4,
                    fontSize: 13, color: '#172b4d', resize: 'none',
                    fontFamily: 'inherit', outline: 'none', cursor: 'pointer',
                  }}
                  onFocus={e => { e.target.style.background = '#fff'; e.target.style.border = '1px solid #0052cc' }}
                  onBlur={e => { e.target.style.background = '#ebecf0'; e.target.style.border = '1px solid transparent' }}
                />
              </div>
              {/* Sample comments */}
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { m: allMembers[1], text: 'I\'ve updated the API spec to reflect the new rate limits. Pushing to staging tonight.', time: '1 hour ago' },
                  { m: allMembers[2], text: 'LGTM! Let\'s sync tomorrow to review the results before merging to prod.', time: '3 hours ago' },
                ].map((comment, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10 }}>
                    <Avatar member={comment.m} size={28} />
                    <div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: '#172b4d' }}>{comment.m.name}</span>
                        <span style={{ fontSize: 11, color: '#6b778c' }}>{comment.time}</span>
                      </div>
                      <div style={{
                        background: '#fff', border: '1px solid #dfe1e6',
                        borderRadius: 4, padding: '8px 10px',
                        fontSize: 13, color: '#172b4d', lineHeight: 1.5,
                      }}>
                        {comment.text}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar actions */}
          <div style={{ width: 168, flexShrink: 0 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Add to card</div>
            {[
              { icon: <Users size={14} />, label: 'Members' },
              { icon: <Tag size={14} />, label: 'Labels' },
              { icon: <Calendar size={14} />, label: 'Dates' },
              { icon: <Paperclip size={14} />, label: 'Attachment' },
            ].map(action => (
              <button key={action.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '6px 10px', borderRadius: 4,
                background: '#ebecf0', border: 'none', cursor: 'pointer',
                color: '#172b4d', fontSize: 13, fontWeight: 500, marginBottom: 6,
                textAlign: 'left',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#d5d9de'}
                onMouseLeave={e => e.currentTarget.style.background = '#ebecf0'}
              >
                {action.icon}
                {action.label}
              </button>
            ))}

            <div style={{ fontSize: 11, fontWeight: 700, color: '#6b778c', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '16px 0 8px' }}>Actions</div>
            {[
              { icon: <ArrowRight size={14} />, label: 'Move' },
              { icon: <ChevronRight size={14} />, label: 'Archive' },
            ].map(action => (
              <button key={action.label} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                width: '100%', padding: '6px 10px', borderRadius: 4,
                background: '#ebecf0', border: 'none', cursor: 'pointer',
                color: '#172b4d', fontSize: 13, fontWeight: 500, marginBottom: 6,
                textAlign: 'left',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#d5d9de'}
                onMouseLeave={e => e.currentTarget.style.background = '#ebecf0'}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
