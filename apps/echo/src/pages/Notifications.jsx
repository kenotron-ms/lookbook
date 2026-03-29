import { useState } from 'react'
import { Heart, Repeat2, UserPlus, AtSign } from 'lucide-react'
import { Avatar } from '../components/LeftSidebar'

const TABS = ['All', 'Verified', 'Mentions']

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'like',
    users: [
      { name: 'Alex Rivera', initials: 'AR', bg: '#f59e0b' },
      { name: 'Sam Chen', initials: 'SC', bg: '#10b981' },
      { name: 'Riley Park', initials: 'RP', bg: '#14b8a6' },
    ],
    content: 'liked your post',
    excerpt: 'Design systems are not about consistency...',
    time: '2m',
  },
  {
    id: 2,
    type: 'echo',
    users: [{ name: 'Taylor Kim', initials: 'TK', bg: '#ec4899' }],
    content: 're-echoed your post',
    excerpt: 'The best code review comment is "this is great, ship it"...',
    time: '15m',
  },
  {
    id: 3,
    type: 'follow',
    users: [{ name: 'Morgan West', initials: 'MW', bg: '#8b5cf6' }],
    content: 'followed you',
    time: '1h',
  },
  {
    id: 4,
    type: 'mention',
    users: [{ name: 'Casey Nguyen', initials: 'CN', bg: '#f97316' }],
    content: 'mentioned you',
    excerpt: '@jordanblake totally agree on the naming thing — it\'s everything.',
    time: '2h',
  },
  {
    id: 5,
    type: 'like',
    users: [
      { name: 'Echo Engineering', initials: 'EE', bg: '#6366f1' },
      { name: 'Riley Park', initials: 'RP', bg: '#14b8a6' },
    ],
    content: 'liked your post',
    excerpt: 'Just shipped a feature that took 3 days to plan...',
    time: '3h',
  },
  {
    id: 6,
    type: 'follow',
    users: [
      { name: 'Sam Chen', initials: 'SC', bg: '#10b981' },
      { name: 'Casey Nguyen', initials: 'CN', bg: '#f97316' },
    ],
    content: 'followed you',
    time: '5h',
  },
  {
    id: 7,
    type: 'like',
    users: [
      { name: 'Alex Rivera', initials: 'AR', bg: '#f59e0b' },
      { name: 'Taylor Kim', initials: 'TK', bg: '#ec4899' },
      { name: 'Morgan West', initials: 'MW', bg: '#8b5cf6' },
      { name: 'Riley Park', initials: 'RP', bg: '#14b8a6' },
    ],
    content: 'liked your post',
    excerpt: 'Three things that make any codebase better...',
    time: '8h',
  },
]

const TYPE_ICONS = {
  like: { icon: Heart, color: '#f91880', bg: '#f91880' },
  echo: { icon: Repeat2, color: '#00ba7c', bg: '#00ba7c' },
  follow: { icon: UserPlus, color: '#6366f1', bg: '#6366f1' },
  mention: { icon: AtSign, color: '#6366f1', bg: '#6366f1' },
}

export default function Notifications() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div>
      {/* Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2f3336',
        }}
      >
        <div
          style={{
            padding: '12px 16px',
            fontSize: '20px',
            fontWeight: '800',
            color: '#e7e9ea',
            letterSpacing: '-0.02em',
          }}
        >
          Notifications
        </div>
        <div style={{ display: 'flex', borderBottom: '1px solid #2f3336' }}>
          {TABS.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              style={{
                flex: 1,
                padding: '16px',
                background: 'transparent',
                border: 'none',
                color: activeTab === i ? '#e7e9ea' : '#71767b',
                fontSize: '15px',
                fontWeight: activeTab === i ? '700' : '500',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {tab}
              {activeTab === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '4px',
                    background: '#6366f1',
                    borderRadius: '9999px',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {NOTIFICATIONS.map((n) => (
        <NotifRow key={n.id} notif={n} />
      ))}
    </div>
  )
}

function NotifRow({ notif }) {
  const [hovered, setHovered] = useState(false)
  const { icon: Icon, color } = TYPE_ICONS[notif.type]

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid #2f3336',
        cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: '40px',
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'flex-end',
          paddingTop: '4px',
        }}
      >
        <Icon size={28} color={color} strokeWidth={2} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Avatar stack */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
          {notif.users.slice(0, 5).map((u, i) => (
            <Avatar key={i} initials={u.initials} bg={u.bg} size={36} />
          ))}
        </div>

        <div style={{ fontSize: '15px', color: '#e7e9ea', marginBottom: '2px' }}>
          <strong>
            {notif.users.length === 1
              ? notif.users[0].name
              : notif.users.length === 2
              ? `${notif.users[0].name} and ${notif.users[1].name}`
              : `${notif.users[0].name} and ${notif.users.length - 1} others`}
          </strong>{' '}
          {notif.content}
          <span style={{ color: '#71767b', marginLeft: '6px', fontSize: '14px' }}>
            {notif.time}
          </span>
        </div>

        {notif.excerpt && (
          <div
            style={{
              fontSize: '15px',
              color: '#71767b',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {notif.excerpt}
          </div>
        )}
      </div>
    </div>
  )
}
