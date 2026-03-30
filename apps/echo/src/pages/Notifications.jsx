import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import { Heart, Repeat2, UserPlus, AtSign, MessageCircle, Bell } from 'lucide-react'
import db from '../db/index.js'

const fmtTime = ts => {
  const d = Date.now() - ts, m = Math.floor(d / 6e4), h = Math.floor(d / 36e5), dy = Math.floor(d / 864e5)
  if (m < 1) return 'now'; if (h < 1) return `${m}m`; if (dy < 1) return `${h}h`
  if (dy < 30) return `${dy}d`; return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const TYPE_META = {
  like:    { Icon: Heart,         color: '#f91880', filled: true  },
  echo:    { Icon: Repeat2,       color: '#00ba7c', filled: false },
  follow:  { Icon: UserPlus,      color: 'var(--accent)', filled: false },
  mention: { Icon: AtSign,        color: 'var(--accent)', filled: false },
  reply:   { Icon: MessageCircle, color: 'var(--accent)', filled: false },
}

const ACTION_TEXT = {
  like:    'liked your post',
  echo:    'reposted your post',
  follow:  'followed you',
  mention: 'mentioned you',
  reply:   'replied to your post',
}

const TABS = ['All', 'Verified', 'Mentions']

/* ── Initials avatar fallback ─────────────────────────────── */
function UserAvatar({ user, size = 48 }) {
  const [err, setErr] = useState(false)
  if (!user) return <div style={{ width: size, height: size, borderRadius: '50%', background: 'var(--border)', flexShrink: 0 }} />
  if (!err && user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        onError={() => setErr(true)}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  const initials = user.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?'
  const colors = ['#6366f1','#ec4899','#f59e0b','#10b981','#3b82f6','#8b5cf6','#f97316','#14b8a6']
  const bg = colors[(user.id || 0) % colors.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.35, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

/* ── Single notification row ──────────────────────────────── */
function NotifRow({ notif }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  const fromUser = useLiveQuery(() => db.users.get(notif.fromUserId), [notif.fromUserId])
  const relatedPost = useLiveQuery(
    () => (notif.postId ? db.posts.get(notif.postId) : Promise.resolve(null)),
    [notif.postId]
  )

  const meta = TYPE_META[notif.type] || TYPE_META.like
  const { Icon, color } = meta

  // hex → rgba helper for icon bg
  const hexToRgba = (hex, a) => {
    if (hex.startsWith('var(')) return `rgba(99,102,241,${a})`
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${a})`
  }

  const handleClick = () => {
    if (notif.postId) navigate(`/post/${notif.postId}`)
    else if (fromUser?.handle) navigate(`/profile/${fromUser.handle}`)
  }

  return (
    <div
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: 12,
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        background: hovered
          ? 'var(--bg-hover)'
          : notif.read
            ? 'transparent'
            : 'var(--bg-secondary)',
        transition: 'background 0.15s',
      }}
    >
      {/* Type icon — circle with tinted bg */}
      <div style={{ width: 40, flexShrink: 0, display: 'flex', justifyContent: 'center', paddingTop: 4 }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: hexToRgba(color, 0.15),
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon
            size={20}
            color={color}
            fill={meta.filled ? color : 'none'}
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* User avatar */}
        <div style={{ marginBottom: 6 }}>
          <UserAvatar user={fromUser} size={48} />
        </div>

        {/* Action text */}
        <div style={{ fontSize: 15, color: 'var(--text-primary)', lineHeight: 1.4 }}>
          <strong style={{ color: 'var(--text-primary)' }}>{fromUser?.name ?? '…'}</strong>
          {' '}{ACTION_TEXT[notif.type] ?? notif.type}
        </div>

        {/* Post preview */}
        {relatedPost?.content && (
          <div style={{
            marginTop: 2,
            fontSize: 14,
            color: 'var(--text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}>
            {relatedPost.content.slice(0, 60)}{relatedPost.content.length > 60 ? '…' : ''}
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div style={{ color: 'var(--text-muted)', fontSize: 13, flexShrink: 0, paddingTop: 2 }}>
        {fmtTime(notif.timestamp)}
      </div>
    </div>
  )
}

/* ── Main page ────────────────────────────────────────────── */
export default function Notifications() {
  const [activeTab, setActiveTab] = useState(0)

  const notifications = useLiveQuery(() =>
    db.notifications.orderBy('timestamp').reverse().toArray()
  )

  // Mark all as read on mount
  useEffect(() => {
    db.notifications.toCollection().modify({ read: true })
  }, [])

  // Tab filtering (we need user data for 'Verified' — handled per-row)
  // We collect verified user IDs for the Verified tab
  const allUsers = useLiveQuery(() => db.users.toArray())

  const verifiedIds = new Set((allUsers ?? []).filter(u => u.verified).map(u => u.id))

  const filtered = (notifications ?? []).filter(n => {
    if (activeTab === 1) return verifiedIds.has(n.fromUserId)
    if (activeTab === 2) return n.type === 'mention'
    return true
  })

  return (
    <div>
      {/* Sticky header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'var(--bg)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{ padding: '14px 16px', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Notifications
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex' }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1, padding: '14px 0', background: 'transparent', border: 'none',
                color: activeTab === i ? 'var(--text-primary)' : 'var(--text-muted)',
                fontSize: 15, fontWeight: activeTab === i ? 700 : 500,
                cursor: 'pointer', position: 'relative', transition: 'background 0.15s',
              }}
            >
              {tab}
              {activeTab === i && (
                <div style={{
                  position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                  width: 40, height: 4, background: 'var(--accent)', borderRadius: 9999,
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Rows */}
      {notifications === undefined ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>
      ) : filtered.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '64px 32px', color: 'var(--text-muted)' }}>
          <Bell size={40} strokeWidth={1.5} />
          <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Nothing to see here — yet!</div>
          <div style={{ fontSize: 15, textAlign: 'center' }}>
            When someone likes or reposts one of your posts, you'll find it here.
          </div>
        </div>
      ) : (
        filtered.map(n => <NotifRow key={n.id} notif={n} />)
      )}
    </div>
  )
}
