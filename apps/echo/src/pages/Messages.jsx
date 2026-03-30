import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  Mail, Edit, Search, MoreHorizontal, Send, ArrowLeft,
} from 'lucide-react'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const fmtTime = ts => {
  const d = Date.now() - ts
  const m = Math.floor(d / 6e4)
  const h = Math.floor(d / 36e5)
  const dy = Math.floor(d / 864e5)
  if (m < 1) return 'now'
  if (h < 1) return `${m}m`
  if (dy < 1) return `${h}h`
  if (dy < 30) return `${dy}d`
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// ─── Avatar ────────────────────────────────────────────────────────────────────

function Avatar({ user, size = 44 }) {
  const [err, setErr] = useState(false)

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?'

  const colors = ['#6366f1', '#f59e0b', '#10b981', '#ec4899', '#8b5cf6', '#14b8a6', '#f97316']
  const colorIdx = user ? (user.id || 0) % colors.length : 0
  const bg = colors[colorIdx]

  const style = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    overflow: 'hidden',
    background: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.38,
    fontWeight: '700',
    color: '#fff',
  }

  if (user?.avatar && !err) {
    return (
      <div style={style}>
        <img
          src={user.avatar}
          alt={user.name}
          onError={() => setErr(true)}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    )
  }

  return <div style={style}>{initials}</div>
}

// ─── IconBtn ───────────────────────────────────────────────────────────────────

function IconBtn({ icon: Icon, onClick, size = 20, title }) {
  const [hov, setHov] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'var(--bg-hover)' : 'transparent',
        border: 'none',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        width: 36,
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.15s',
        padding: 0,
      }}
    >
      <Icon size={size} strokeWidth={1.75} />
    </button>
  )
}

// ─── ConvoRow ──────────────────────────────────────────────────────────────────

function ConvoRow({ convo, isActive, onClick }) {
  const [hov, setHov] = useState(false)
  const otherId = convo.participantIds.find(id => id !== CURRENT_USER_ID)
  const other = useLiveQuery(() => db.users.get(otherId), [otherId])

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 16px',
        cursor: 'pointer',
        background: isActive
          ? 'var(--bg-secondary)'
          : hov
          ? 'var(--bg-hover)'
          : 'transparent',
        transition: 'background 0.15s',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Avatar */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <Avatar user={other} size={50} />
        {convo.unread > 0 && (
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '9999px',
              minWidth: 18,
              height: 18,
              fontSize: 11,
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
              lineHeight: 1,
            }}
          >
            {convo.unread}
          </span>
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 }}>
          <span
            style={{
              fontSize: 15,
              fontWeight: convo.unread ? '700' : '600',
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: 130,
            }}
          >
            {other?.name ?? '…'}
          </span>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0, marginLeft: 4 }}>
            {fmtTime(convo.lastTimestamp)}
          </span>
        </div>
        <span
          style={{
            fontSize: 14,
            color: convo.unread ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: convo.unread ? '500' : '400',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            display: 'block',
          }}
        >
          {convo.lastMessage}
        </span>
      </div>
    </div>
  )
}

// ─── ConvoList ─────────────────────────────────────────────────────────────────

function ConvoList({ activeConvoId }) {
  const navigate = useNavigate()
  const [searchVal, setSearchVal] = useState('')
  const [searchFocus, setSearchFocus] = useState(false)

  const conversations = useLiveQuery(
    () => db.conversations.orderBy('lastTimestamp').reverse().toArray()
  )

  const filtered = searchVal.trim()
    ? (conversations ?? []).filter(c =>
        c.lastMessage?.toLowerCase().includes(searchVal.toLowerCase())
      )
    : (conversations ?? [])

  return (
    <div
      style={{
        width: 240,
        flexShrink: 0,
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 20,
            fontWeight: '800',
            color: 'var(--text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          Messages
        </span>
        <IconBtn
          icon={Edit}
          title="New message"
          onClick={() => navigate('/messages')}
        />
      </div>

      {/* Search */}
      <div style={{ padding: '12px 16px', flexShrink: 0, position: 'relative' }}>
        <Search
          size={15}
          color="var(--text-muted)"
          style={{
            position: 'absolute',
            left: 30,
            top: '50%',
            transform: 'translateY(-50%)',
            pointerEvents: 'none',
          }}
        />
        <input
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          placeholder="Search Messages"
          onFocus={() => setSearchFocus(true)}
          onBlur={() => setSearchFocus(false)}
          style={{
            width: '100%',
            boxSizing: 'border-box',
            background: searchFocus ? 'var(--bg)' : 'var(--bg-input)',
            border: `1.5px solid ${searchFocus ? 'var(--accent)' : 'transparent'}`,
            borderRadius: 9999,
            padding: '7px 14px 7px 34px',
            fontSize: 14,
            color: 'var(--text-primary)',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        />
      </div>

      {/* Conversation list */}
      <div style={{ overflowY: 'auto', flex: 1 }}>
        {filtered.map(convo => (
          <ConvoRow
            key={convo.id}
            convo={convo}
            isActive={activeConvoId === convo.id}
            onClick={() => navigate(`/messages/${convo.id}`)}
          />
        ))}
        {filtered.length === 0 && (
          <div
            style={{
              padding: '32px 16px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: 14,
            }}
          >
            No conversations found
          </div>
        )}
      </div>
    </div>
  )
}

// ─── MessageBubble ─────────────────────────────────────────────────────────────

function MessageBubble({ msg, isOwn, isFirst, isLast }) {
  const br = 18
  const innerCorner = 4

  const borderRadius = isOwn
    ? `${br}px ${isFirst ? br : innerCorner}px ${isLast ? br : innerCorner}px ${br}px`
    : `${isFirst ? br : innerCorner}px ${br}px ${br}px ${isLast ? br : innerCorner}px`

  return (
    <div
      style={{
        maxWidth: '72%',
        padding: '10px 14px',
        borderRadius,
        background: isOwn ? 'var(--accent)' : 'var(--bg-secondary)',
        color: isOwn ? '#fff' : 'var(--text-primary)',
        fontSize: 15,
        lineHeight: 1.45,
        wordBreak: 'break-word',
        marginBottom: 2,
        alignSelf: isOwn ? 'flex-end' : 'flex-start',
      }}
    >
      {msg.content}
    </div>
  )
}

// ─── ThreadPanel ───────────────────────────────────────────────────────────────

function ThreadPanel({ activeConvoId }) {
  const navigate = useNavigate()
  const [inputVal, setInputVal] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  const convo = useLiveQuery(
    () => (activeConvoId ? db.conversations.get(activeConvoId) : null),
    [activeConvoId]
  )

  const otherId = convo?.participantIds?.find(id => id !== CURRENT_USER_ID)

  const other = useLiveQuery(
    () => (otherId != null ? db.users.get(otherId) : null),
    [otherId]
  )

  const messages = useLiveQuery(
    () =>
      activeConvoId
        ? db.messages
            .where('conversationId')
            .equals(activeConvoId)
            .sortBy('timestamp')
        : [],
    [activeConvoId]
  )

  // Mark as read when conversation opened
  useEffect(() => {
    if (activeConvoId) {
      db.conversations.update(activeConvoId, { unread: 0 })
    }
  }, [activeConvoId])

  // Auto-scroll to bottom when messages load/change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  // Reset input when switching convos
  useEffect(() => {
    setInputVal('')
  }, [activeConvoId])

  const handleSend = async () => {
    const content = inputVal.trim()
    if (!content || sending) return
    setSending(true)
    try {
      await db.messages.add({
        conversationId: activeConvoId,
        senderId: CURRENT_USER_ID,
        content,
        timestamp: Date.now(),
      })
      await db.conversations.update(activeConvoId, {
        lastMessage: content,
        lastTimestamp: Date.now(),
        unread: 0,
      })
      setInputVal('')
    } finally {
      setSending(false)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // ── Empty state ──────────────────────────────────────────────────────────────

  if (!activeConvoId) {
    return (
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          padding: 32,
          color: 'var(--text-muted)',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 8,
          }}
        >
          <Mail size={36} strokeWidth={1.5} color="var(--text-muted)" />
        </div>
        <span style={{ fontSize: 22, fontWeight: '800', color: 'var(--text-primary)' }}>
          Select a message
        </span>
        <span
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: 280,
            lineHeight: 1.5,
          }}
        >
          Choose from your existing conversations, start a new one, or just keep swimming.
        </span>
      </div>
    )
  }

  // ── Thread view ──────────────────────────────────────────────────────────────

  // Group messages to determine first/last in consecutive runs
  const grouped = (messages ?? []).map((msg, i, arr) => {
    const prev = arr[i - 1]
    const next = arr[i + 1]
    const isFirst = !prev || prev.senderId !== msg.senderId
    const isLast = !next || next.senderId !== msg.senderId
    return { ...msg, isFirst, isLast }
  })

  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        minWidth: 0,
      }}
    >
      {/* Thread header */}
      <div
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
          background: 'var(--bg)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => navigate('/messages')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: 4,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft size={18} strokeWidth={1.75} />
        </button>

        <button
          onClick={() => other?.handle && navigate(`/profile/${other.handle}`)}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 0,
            textAlign: 'left',
            flex: 1,
          }}
        >
          <Avatar user={other} size={40} />
          <div>
            <div
              style={{
                fontSize: 15,
                fontWeight: '700',
                color: 'var(--text-primary)',
                lineHeight: 1.25,
              }}
            >
              {other?.name ?? '…'}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.25 }}>
              @{other?.handle ?? '…'}
            </div>
          </div>
        </button>

        <IconBtn icon={MoreHorizontal} title="More options" />
      </div>

      {/* Messages scrollable area */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}
      >
        {grouped.map((msg, i) => {
          const isOwn = msg.senderId === CURRENT_USER_ID
          const showTimestamp = msg.isLast

          return (
            <div
              key={msg.id ?? i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isOwn ? 'flex-end' : 'flex-start',
                marginTop: msg.isFirst ? 10 : 0,
              }}
            >
              <MessageBubble
                msg={msg}
                isOwn={isOwn}
                isFirst={msg.isFirst}
                isLast={msg.isLast}
              />
              {showTimestamp && (
                <span
                  style={{
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    marginTop: 4,
                    marginBottom: 6,
                    paddingLeft: isOwn ? 0 : 4,
                    paddingRight: isOwn ? 4 : 0,
                  }}
                >
                  {fmtTime(msg.timestamp)}
                </span>
              )}
            </div>
          )
        })}

        {/* Scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* Compose bar */}
      <div
        style={{
          padding: '10px 16px',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
          background: 'var(--bg)',
        }}
      >
        <input
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Start a new message"
          style={{
            flex: 1,
            background: 'var(--bg-input)',
            border: '1.5px solid transparent',
            borderRadius: 24,
            padding: '10px 16px',
            fontSize: 15,
            color: 'var(--text-primary)',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.15s',
          }}
          onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
          onBlur={e => (e.target.style.borderColor = 'transparent')}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!inputVal.trim() || sending}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: inputVal.trim() ? 'var(--accent)' : 'var(--bg-secondary)',
            border: 'none',
            cursor: inputVal.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s, opacity 0.15s',
            opacity: inputVal.trim() ? 1 : 0.5,
          }}
        >
          <Send
            size={17}
            strokeWidth={2}
            color={inputVal.trim() ? '#fff' : 'var(--text-muted)'}
            style={{ transform: 'translateX(1px)' }}
          />
        </button>
      </div>
    </div>
  )
}

// ─── Messages (page root) ──────────────────────────────────────────────────────

export default function Messages() {
  const { convoId } = useParams()
  const activeConvoId = convoId ? Number(convoId) : null

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <ConvoList activeConvoId={activeConvoId} />
      <ThreadPanel activeConvoId={activeConvoId} />
    </div>
  )
}
