import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { SquarePen, MessageSquare } from 'lucide-react'
import db from '../db/index.js'
import { USER } from '../db/seed.js'

function groupByDate(convos) {
  const groups = { Today: [], Yesterday: [], 'Previous 7 days': [], 'Previous 30 days': [] }
  const now = new Date()
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  const yesterdayStart = todayStart - 86400000
  const sevenDaysStart = todayStart - 86400000 * 7
  const thirtyDaysStart = todayStart - 86400000 * 30

  for (const c of convos) {
    const t = c.updatedAt
    if (t >= todayStart) groups['Today'].push(c)
    else if (t >= yesterdayStart) groups['Yesterday'].push(c)
    else if (t >= sevenDaysStart) groups['Previous 7 days'].push(c)
    else if (t >= thirtyDaysStart) groups['Previous 30 days'].push(c)
  }
  return groups
}

export default function Sidebar() {
  const navigate = useNavigate()
  const { convoId } = useParams()
  const activeId = convoId ? Number(convoId) : null
  const [avatarError, setAvatarError] = useState(false)
  const [newChatHover, setNewChatHover] = useState(false)
  const [iconHover, setIconHover] = useState(false)

  const convos = useLiveQuery(
    () => db.conversations.orderBy('updatedAt').reverse().toArray(),
    []
  )

  const handleNewChat = () => navigate('/')

  const grouped = groupByDate(convos || [])
  const sections = ['Today', 'Yesterday', 'Previous 7 days', 'Previous 30 days']

  return (
    <div style={{
      width: 260,
      flexShrink: 0,
      height: '100vh',
      background: 'var(--bg-sidebar)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img
            src="./sage-logo.jpg"
            width={28}
            height={28}
            alt="Sage"
            style={{ borderRadius: 'var(--radius-sm)', objectFit: 'cover' }}
          />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            sage
          </span>
        </div>
        <button
          onClick={handleNewChat}
          onMouseEnter={() => setIconHover(true)}
          onMouseLeave={() => setIconHover(false)}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            border: 'none',
            background: iconHover ? 'var(--bg-sidebar-hover)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            transition: 'background 0.15s',
          }}
          title="New chat"
        >
          <SquarePen size={17} />
        </button>
      </div>

      {/* New chat wide button */}
      <button
        onClick={handleNewChat}
        onMouseEnter={() => setNewChatHover(true)}
        onMouseLeave={() => setNewChatHover(false)}
        style={{
          margin: '4px 8px 8px',
          padding: '9px 12px',
          borderRadius: 'var(--radius-md)',
          background: newChatHover ? 'var(--bg-sidebar-hover)' : 'transparent',
          border: 'none',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 14,
          color: 'var(--text-secondary)',
          transition: 'background 0.15s',
        }}
      >
        <MessageSquare size={16} />
        New chat
      </button>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
        {sections.map((section) => {
          const items = grouped[section]
          if (!items || items.length === 0) return null
          return (
            <div key={section}>
              <div style={{
                padding: '8px 12px 4px',
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {section}
              </div>
              {items.map((convo) => (
                <ConvoRow
                  key={convo.id}
                  convo={convo}
                  isActive={convo.id === activeId}
                  onClick={() => navigate(`/c/${convo.id}`)}
                />
              ))}
            </div>
          )
        })}
      </div>

      {/* User account */}
      <div style={{ marginTop: 'auto', padding: '8px', borderTop: '1px solid var(--border-light)' }}>
        <UserRow avatarError={avatarError} setAvatarError={setAvatarError} />
      </div>
    </div>
  )
}

function ConvoRow({ convo, isActive, onClick }) {
  const [hover, setHover] = useState(false)
  const bg = isActive ? 'var(--bg-hover)' : hover ? 'var(--bg-sidebar-hover)' : 'transparent'

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '7px 12px',
        margin: '1px 4px',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: 14,
        color: 'var(--text-secondary)',
        background: bg,
        fontWeight: isActive ? 500 : 400,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        transition: 'background 0.1s',
      }}
    >
      {convo.title}
    </div>
  )
}

function UserRow({ avatarError, setAvatarError }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: 8,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        background: hover ? 'var(--bg-sidebar-hover)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      {avatarError ? (
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: 'white',
          fontSize: 12,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          {USER.name.charAt(0)}
        </div>
      ) : (
        <img
          src={USER.avatar}
          alt={USER.name}
          width={28}
          height={28}
          onError={() => setAvatarError(true)}
          style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      )}
      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
        {USER.name} Blake
      </span>
    </div>
  )
}
