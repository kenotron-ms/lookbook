import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Star, Paperclip, MoreVertical, Archive, Trash2, Clock, FolderOpen,
  Square, CheckSquare, ChevronDown, AlertCircle
} from 'lucide-react'
import { emails, categories } from '../data/emails'

function AvatarCircle({ name, email: emailAddr }) {
  const colors = ['#1a73e8','#34a853','#ea4335','#fbbc04','#9c27b0','#ff5722','#607d8b','#00bcd4']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{
      width: 36, height: 36, borderRadius: '50%', background: colors[idx],
      color: '#fff', fontWeight: 600, fontSize: 14,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {name[0].toUpperCase()}
    </div>
  )
}

export default function EmailList() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('primary')
  const [checkedIds, setCheckedIds] = useState(new Set())
  const [starredIds, setStarredIds] = useState(
    new Set(emails.filter(e => e.isStarred).map(e => e.id))
  )
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = emails.filter(e => e.category === activeCategory)

  const toggleCheck = (id, e) => {
    e.stopPropagation()
    setCheckedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleStar = (id, e) => {
    e.stopPropagation()
    setStarredIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const anyChecked = checkedIds.size > 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
      {/* Category Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', paddingLeft: 16, background: '#fff' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '12px 20px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: activeCategory === cat.id ? '#1a73e8' : '#5f6368',
              borderBottom: activeCategory === cat.id ? '2px solid #1a73e8' : '2px solid transparent',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s',
              marginBottom: -1,
            }}
            onMouseEnter={e => { if (activeCategory !== cat.id) e.currentTarget.style.color = '#202124' }}
            onMouseLeave={e => { if (activeCategory !== cat.id) e.currentTarget.style.color = '#5f6368' }}
          >
            {cat.label}
            {cat.count > 0 && (
              <span style={{
                background: activeCategory === cat.id ? '#1a73e8' : '#5f6368',
                color: '#fff',
                borderRadius: 10,
                padding: '1px 7px',
                fontSize: 11,
                fontWeight: 600,
              }}>
                {cat.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Bulk Action Toolbar */}
      {anyChecked && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px',
          background: '#f0f6ff', borderBottom: '1px solid #e0e0e0',
        }}>
          <span style={{ fontSize: 14, color: '#202124', marginRight: 8 }}>
            {checkedIds.size} selected
          </span>
          {[
            { icon: Archive, label: 'Archive' },
            { icon: Trash2, label: 'Delete' },
            { icon: FolderOpen, label: 'Move to' },
            { icon: ChevronDown, label: 'Labels' },
            { icon: MoreVertical, label: 'More' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '6px 12px', border: 'none', background: 'transparent',
                borderRadius: 4, cursor: 'pointer', fontSize: 13, color: '#5f6368',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Email Rows */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {filtered.length === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, color: '#5f6368' }}>
            <AlertCircle size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
            <p style={{ fontSize: 16 }}>No emails in this category</p>
          </div>
        )}
        {filtered.map(email => {
          const checked = checkedIds.has(email.id)
          const starred = starredIds.has(email.id)
          const hovered = hoveredId === email.id

          return (
            <div
              key={email.id}
              className="email-row"
              onClick={() => navigate('/email')}
              onMouseEnter={() => setHoveredId(email.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
                height: 50,
                cursor: 'pointer',
                background: checked
                  ? '#e8f0fe'
                  : hovered
                    ? '#f2f6fc'
                    : !email.isRead
                      ? '#f8f9fa'
                      : '#ffffff',
                borderBottom: '1px solid #f0f0f0',
                position: 'relative',
              }}
            >
              {/* Checkbox */}
              <button
                onClick={e => toggleCheck(email.id, e)}
                style={{
                  width: 28, flexShrink: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: 'transparent', border: 'none',
                  cursor: 'pointer', color: '#5f6368', padding: 0,
                  opacity: checked || hovered ? 1 : 0,
                  transition: 'opacity 0.15s',
                }}
              >
                {checked ? <CheckSquare size={18} style={{ color: '#1a73e8' }} /> : <Square size={18} />}
              </button>

              {/* Star */}
              <button
                onClick={e => toggleStar(email.id, e)}
                className="star-btn"
                style={{
                  width: 28, flexShrink: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: 'transparent', border: 'none',
                  cursor: 'pointer', padding: 0,
                }}
              >
                <Star
                  size={16}
                  fill={starred ? '#f4b400' : 'none'}
                  style={{ color: starred ? '#f4b400' : '#bdc1c6' }}
                />
              </button>

              {/* Important marker */}
              {email.isImportant && (
                <div style={{ width: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="#f4b400">
                    <polygon points="6,0 8,4 12,4.5 9,7.5 10,12 6,9.5 2,12 3,7.5 0,4.5 4,4"/>
                  </svg>
                </div>
              )}
              {!email.isImportant && <div style={{ width: 20, flexShrink: 0 }} />}

              {/* Sender */}
              <div style={{
                width: 160, flexShrink: 0, paddingRight: 16,
                fontSize: 14,
                fontWeight: !email.isRead ? 700 : 400,
                color: '#202124',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {email.from.name}
              </div>

              {/* Subject + Preview */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: !email.isRead ? 700 : 400,
                  color: '#202124',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  maxWidth: 240,
                  flexShrink: 0,
                }}>
                  {email.subject}
                </span>
                <span style={{ color: '#5f6368', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flexShrink: 1 }}>
                  {' — '}{email.preview}
                </span>
              </div>

              {/* Right side */}
              {!hovered ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, marginLeft: 8 }}>
                  {email.hasAttachment && (
                    <Paperclip size={14} style={{ color: '#5f6368' }} />
                  )}
                  <span style={{ fontSize: 12, color: '#5f6368', whiteSpace: 'nowrap' }}>
                    {email.date}
                  </span>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0, marginLeft: 8 }}>
                  {[
                    { icon: Archive, label: 'Archive', onClick: e => e.stopPropagation() },
                    { icon: Trash2, label: 'Delete', onClick: e => e.stopPropagation() },
                    { icon: Clock, label: 'Snooze', onClick: e => e.stopPropagation() },
                    { icon: FolderOpen, label: 'Move', onClick: e => e.stopPropagation() },
                  ].map(({ icon: Icon, label, onClick }) => (
                    <button
                      key={label}
                      title={label}
                      onClick={onClick}
                      style={{
                        width: 32, height: 32, borderRadius: '50%', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: '#5f6368',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.08)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <Icon size={16} />
                    </button>
                  ))}
                  <span style={{ fontSize: 12, color: '#5f6368', whiteSpace: 'nowrap', marginLeft: 4 }}>
                    {email.date}
                  </span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
