import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft, Archive, Trash2, FolderOpen, Tag, MoreVertical,
  ChevronLeft, ChevronRight, Star, Reply, Forward, Printer,
  ChevronDown, ChevronUp, Paperclip, Send, X,
} from 'lucide-react'
import { emailThread } from '../data/emails'

function Avatar({ name, size = 36 }) {
  const colors = ['#1a73e8','#34a853','#ea4335','#fbbc04','#9c27b0','#ff5722','#607d8b']
  const idx = name.charCodeAt(0) % colors.length
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: colors[idx],
      color: '#fff', fontWeight: 600, fontSize: size * 0.4,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {name[0].toUpperCase()}
    </div>
  )
}

function MessageCard({ msg, index, total }) {
  const [expanded, setExpanded] = useState(!msg.collapsed)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyText, setReplyText] = useState('')

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: 8,
      background: '#fff',
      marginBottom: 8,
      overflow: 'hidden',
    }}>
      {/* Message Header */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px', cursor: !expanded ? 'pointer' : 'default',
          background: '#fff',
        }}
        onClick={() => !expanded && setExpanded(true)}
      >
        <Avatar name={msg.from.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 14, color: '#202124' }}>{msg.from.name}</span>
            <span style={{ fontSize: 12, color: '#5f6368' }}>&lt;{msg.from.email}&gt;</span>
          </div>
          {!expanded ? (
            <div style={{ fontSize: 13, color: '#5f6368', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {msg.body.split('\n')[0]}
            </div>
          ) : (
            <div style={{ fontSize: 12, color: '#5f6368', marginTop: 2 }}>
              to {msg.to}
            </div>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          {expanded && (
            <>
              <span style={{ fontSize: 12, color: '#5f6368' }}>{msg.date}, {msg.time}</span>
              <button
                style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Star size={16} />
              </button>
              <button
                style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Reply size={16} />
              </button>
              <button
                style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <MoreVertical size={16} />
              </button>
            </>
          )}
          <button
            onClick={e => { e.stopPropagation(); setExpanded(!expanded) }}
            style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Body */}
      {expanded && (
        <>
          <div style={{ padding: '0 20px 20px 68px' }}>
            <div style={{ fontSize: 14, color: '#202124', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {msg.body}
            </div>
          </div>

          {/* Message Actions */}
          <div style={{ display: 'flex', gap: 8, padding: '0 20px 16px 68px' }}>
            {[
              { icon: Reply, label: 'Reply', primary: true },
              { icon: Forward, label: 'Forward', primary: false },
            ].map(({ icon: Icon, label, primary }) => (
              <button
                key={label}
                onClick={() => label === 'Reply' && setReplyOpen(!replyOpen)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '8px 16px',
                  border: `1px solid ${primary ? '#1a73e8' : '#dadce0'}`,
                  borderRadius: 4,
                  background: primary ? 'transparent' : 'transparent',
                  color: primary ? '#1a73e8' : '#5f6368',
                  fontSize: 14, fontWeight: 500,
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = primary ? '#e8f0fe' : 'rgba(0,0,0,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          {/* Inline Reply Box */}
          {replyOpen && (
            <div style={{ margin: '0 20px 16px 20px', border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0', fontSize: 13, color: '#5f6368' }}>
                To: {msg.from.email}
              </div>
              <textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                style={{
                  width: '100%', minHeight: 120, padding: '12px 16px',
                  border: 'none', outline: 'none', resize: 'none',
                  fontSize: 14, color: '#202124', lineHeight: 1.6, fontFamily: 'inherit',
                }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderTop: '1px solid #f0f0f0' }}>
                <button style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 24px', borderRadius: 4, border: 'none',
                  background: '#1a73e8', color: '#fff', fontSize: 14, fontWeight: 600,
                  cursor: 'pointer',
                }}>
                  <Send size={16} />
                  Send
                </button>
                <button onClick={() => setReplyOpen(false)} style={{ padding: 8, background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}>
                  <X size={18} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function EmailThread() {
  const navigate = useNavigate()
  const thread = emailThread

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#ffffff' }}>
      {/* Thread Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '8px 16px', borderBottom: '1px solid #e0e0e0',
        flexShrink: 0,
      }}>
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <ArrowLeft size={20} />
        </button>

        {/* Actions */}
        {[
          { icon: Archive, label: 'Archive' },
          { icon: Trash2, label: 'Delete' },
          { icon: FolderOpen, label: 'Move to' },
          { icon: Tag, label: 'Labels' },
          { icon: MoreVertical, label: 'More' },
        ].map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Icon size={18} />
          </button>
        ))}

        <div style={{ flex: 1 }} />

        {/* Thread count */}
        <span style={{ fontSize: 13, color: '#5f6368' }}>3 of 12</span>
        <button style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}>
          <ChevronLeft size={18} />
        </button>
        <button style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: '#5f6368' }}>
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Thread Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
        {/* Subject */}
        <h1 style={{ fontSize: 22, fontWeight: 400, color: '#202124', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
          {thread.subject}
          <span style={{
            fontSize: 12, fontWeight: 500, padding: '2px 8px',
            background: '#f1f3f4', borderRadius: 4, color: '#5f6368',
          }}>
            Inbox
          </span>
        </h1>

        {/* Messages */}
        {thread.messages.map((msg, i) => (
          <MessageCard key={msg.id} msg={msg} index={i} total={thread.messages.length} />
        ))}

        {/* Reply Prompt */}
        <div
          style={{
            border: '1px solid #e0e0e0', borderRadius: 8, padding: '16px 20px',
            display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', background: '#fff',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
        >
          <Avatar name="Ken J" size={36} />
          <span style={{ color: '#5f6368', fontSize: 14 }}>Click here to Reply or Forward</span>
        </div>
      </div>
    </div>
  )
}
