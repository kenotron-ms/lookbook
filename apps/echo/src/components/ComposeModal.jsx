import { useState, useEffect, useRef } from 'react'
import { X, Image, Smile, BarChart2, MapPin, Calendar } from 'lucide-react'
import { useCurrentUser } from '../hooks/useUser.js'
import { useToast } from '../context/ToastContext.jsx'
import { createPost } from '../hooks/useFeed.js'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

const MAX_CHARS = 280

export default function ComposeModal({ open, onClose, replyTo }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const currentUser = useCurrentUser()
  const { addToast } = useToast()

  const remaining = MAX_CHARS - text.length
  const canPost = text.trim().length > 0 && remaining >= 0
  const pct = Math.min(1, text.length / MAX_CHARS)
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - pct)
  const nearLimit = remaining <= 20
  const overLimit = remaining < 0

  // Auto-focus textarea when modal opens
  useEffect(() => {
    if (open && textareaRef.current) {
      setTimeout(() => textareaRef.current?.focus(), 50)
    }
    if (!open) {
      setText('')
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  const handlePost = async () => {
    if (!text.trim()) return
    if (replyTo) {
      await db.posts.add({
        userId: CURRENT_USER_ID,
        content: text.trim(),
        timestamp: Date.now(),
        likes: 0,
        echoes: 0,
        replies: 0,
        views: 0,
        mediaUrl: null,
        parentId: replyTo.id,
        bookmarks: 0,
      })
      await db.posts.where('id').equals(replyTo.id).modify(p => { p.replies++ })
    } else {
      await createPost(text.trim())
    }
    addToast(replyTo ? 'Your reply was sent' : 'Your post was sent', 'success')
    setText('')
    onClose()
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 60,
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)',
          borderRadius: 16,
          width: '100%',
          maxWidth: 600,
          maxHeight: '80vh',
          overflow: 'auto',
          padding: '12px 16px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button
            onClick={onClose}
            style={{
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <X size={20} />
          </button>
          <button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--accent)',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: 4,
            }}
          >
            Drafts
          </button>
        </div>

        {/* ReplyTo context */}
        {replyTo && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <ReplyAuthorAvatar replyTo={replyTo} />
              {/* Thread line */}
              <div style={{ width: 2, flex: 1, minHeight: 24, background: 'var(--border)', marginTop: 6 }} />
            </div>
            <div style={{ paddingTop: 2 }}>
              <ReplyAuthorName replyTo={replyTo} />
              <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: '20px', marginTop: 2 }}>
                {replyTo.content?.slice(0, 80)}{replyTo.content?.length > 80 ? '…' : ''}
              </p>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Replying to <span style={{ color: 'var(--accent)' }}>@<ReplyAuthorHandleInline replyTo={replyTo} /></span>
              </p>
            </div>
          </div>
        )}

        {/* Compose area */}
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Current user avatar */}
          <div style={{ flexShrink: 0, paddingTop: 2 }}>
            {currentUser?.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: 16,
              }}>
                {currentUser?.name?.[0] || 'J'}
              </div>
            )}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* "Everyone can reply" pill */}
            <button style={{
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              borderRadius: '9999px',
              padding: '2px 12px',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              marginBottom: 8,
            }}>
              Everyone ▾
            </button>

            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder={replyTo ? 'Post your reply' : 'What is happening?!'}
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                resize: 'none',
                color: 'var(--text-primary)',
                fontSize: 20,
                lineHeight: '28px',
                minHeight: 120,
                fontFamily: 'inherit',
              }}
              maxLength={MAX_CHARS + 10}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                  e.preventDefault()
                  if (canPost) handlePost()
                }
              }}
            />

            {/* Bottom separator */}
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 12 }}>
              <button style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--accent)',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                padding: 0,
              }}>
                🌐 Everyone can reply
              </button>
            </div>

            {/* Toolbar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 12,
            }}>
              <div style={{ display: 'flex', gap: 4, marginLeft: -4 }}>
                {[Image, Smile, BarChart2, MapPin, Calendar].map((Icon, i) => (
                  <button
                    key={i}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--accent)',
                      cursor: 'pointer',
                      width: 36,
                      height: 36,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '50%',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-subtle)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Icon size={20} strokeWidth={1.75} />
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                {text.length > 0 && (
                  <>
                    {/* Ring counter */}
                    <svg width="26" height="26" viewBox="0 0 26 26">
                      <circle
                        cx="13" cy="13" r={radius}
                        fill="none" stroke="var(--border)" strokeWidth="2.5"
                      />
                      <circle
                        cx="13" cy="13" r={radius}
                        fill="none"
                        stroke={overLimit ? '#f4212e' : nearLimit ? '#ffd400' : 'var(--accent)'}
                        strokeWidth="2.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        strokeLinecap="round"
                        transform="rotate(-90 13 13)"
                        style={{ transition: 'stroke-dashoffset 0.1s, stroke 0.2s' }}
                      />
                      {nearLimit && (
                        <text
                          x="13" y="17"
                          textAnchor="middle"
                          fontSize="9"
                          fill={overLimit ? '#f4212e' : 'var(--text-secondary)'}
                        >
                          {remaining}
                        </text>
                      )}
                    </svg>
                    <div style={{ width: 1, height: 28, background: 'var(--border)' }} />
                  </>
                )}

                <button
                  disabled={!canPost}
                  onClick={handlePost}
                  style={{
                    background: canPost ? 'var(--accent)' : 'rgba(99,102,241,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '9999px',
                    padding: '10px 20px',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: canPost ? 'pointer' : 'default',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (canPost) e.currentTarget.style.background = 'var(--accent-hover)' }}
                  onMouseLeave={e => { if (canPost) e.currentTarget.style.background = 'var(--accent)' }}
                >
                  {replyTo ? 'Reply' : 'Post'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper sub-components to load reply author data
import { useLiveQuery } from 'dexie-react-hooks'

function ReplyAuthorAvatar({ replyTo }) {
  const author = useLiveQuery(() => db.users.get(replyTo.userId), [replyTo.userId])
  if (!author) return (
    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
  )
  return author.avatar
    ? <img src={author.avatar} alt={author.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
    : <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>{author.name?.[0] || '?'}</div>
}

function ReplyAuthorName({ replyTo }) {
  const author = useLiveQuery(() => db.users.get(replyTo.userId), [replyTo.userId])
  return <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{author?.name ?? '…'}</span>
}

function ReplyAuthorHandleInline({ replyTo }) {
  const author = useLiveQuery(() => db.users.get(replyTo.userId), [replyTo.userId])
  return author?.handle ?? '…'
}
