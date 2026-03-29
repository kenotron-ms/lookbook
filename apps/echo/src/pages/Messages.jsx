import { useState } from 'react'
import { Search, Edit, Settings } from 'lucide-react'
import { Avatar } from '../components/LeftSidebar'

const CONVERSATIONS = [
  {
    id: 1,
    user: { name: 'Alex Rivera', handle: 'alexrivera', initials: 'AR', bg: '#f59e0b' },
    lastMsg: 'That\'s a great point on the design system discussion!',
    time: '2m',
    unread: 1,
  },
  {
    id: 2,
    user: { name: 'Sam Chen', handle: 'samchen', initials: 'SC', bg: '#10b981' },
    lastMsg: 'Sent you a link to the Figma file',
    time: '1h',
    unread: 0,
  },
  {
    id: 3,
    user: { name: 'Echo Engineering', handle: 'echo_eng', initials: 'EE', bg: '#6366f1' },
    lastMsg: 'Thanks for the feedback on the new thread feature!',
    time: '3h',
    unread: 0,
  },
  {
    id: 4,
    user: { name: 'Taylor Kim', handle: 'taylorkim', initials: 'TK', bg: '#ec4899' },
    lastMsg: 'lol exactly, ship it 🚀',
    time: '1d',
    unread: 0,
  },
  {
    id: 5,
    user: { name: 'Morgan West', handle: 'morganwest', initials: 'MW', bg: '#8b5cf6' },
    lastMsg: 'Agreed on all points. Let\'s sync next week.',
    time: '2d',
    unread: 0,
  },
  {
    id: 6,
    user: { name: 'Riley Park', handle: 'rileypark', initials: 'RP', bg: '#14b8a6' },
    lastMsg: 'You saw my post on 10x engineers?',
    time: '3d',
    unread: 0,
  },
]

const ACTIVE_MESSAGES = [
  {
    id: 1,
    from: 'AR',
    text: 'Hey! Saw your post about shipping features. So relatable.',
    time: '10:24 AM',
    mine: false,
  },
  {
    id: 2,
    from: 'me',
    text: 'Right? The planning to execution ratio is always skewed.',
    time: '10:26 AM',
    mine: true,
  },
  {
    id: 3,
    from: 'AR',
    text: 'That\'s a great point on the design system discussion!',
    time: '10:31 AM',
    mine: false,
  },
]

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(CONVERSATIONS[0])
  const [searchVal, setSearchVal] = useState('')
  const [messageText, setMessageText] = useState('')

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Conversation list */}
      <div
        style={{
          width: '100%',
          borderRight: '1px solid #2f3336',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid #2f3336',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#e7e9ea', letterSpacing: '-0.02em' }}>
            Messages
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <IconBtn icon={Settings} />
            <IconBtn icon={Edit} />
          </div>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 16px', position: 'relative' }}>
          <Search
            size={16}
            color="#71767b"
            style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search Direct Messages"
            style={{
              width: '100%',
              background: '#16181c',
              border: '1px solid transparent',
              borderRadius: '9999px',
              padding: '8px 16px 8px 38px',
              fontSize: '15px',
              color: '#e7e9ea',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.target.style.background = '#000'
              e.target.style.borderColor = '#6366f1'
            }}
            onBlur={(e) => {
              e.target.style.background = '#16181c'
              e.target.style.borderColor = 'transparent'
            }}
          />
        </div>

        {/* Conversations */}
        <div style={{ overflowY: 'auto', flex: 1 }}>
          {CONVERSATIONS.map((convo) => (
            <ConvoRow
              key={convo.id}
              convo={convo}
              active={activeConvo.id === convo.id}
              onClick={() => setActiveConvo(convo)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ConvoRow({ convo, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        cursor: 'pointer',
        background: active
          ? 'rgba(99,102,241,0.1)'
          : hovered
          ? 'rgba(255,255,255,0.03)'
          : 'transparent',
        borderBottom: '1px solid #2f3336',
        transition: 'background 0.15s',
      }}
    >
      <Avatar initials={convo.user.initials} bg={convo.user.bg} size={48} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
          <span style={{ fontWeight: convo.unread ? '700' : '600', fontSize: '15px', color: '#e7e9ea' }}>
            {convo.user.name}
          </span>
          <span style={{ fontSize: '13px', color: '#71767b' }}>{convo.time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontSize: '15px',
              color: convo.unread ? '#e7e9ea' : '#71767b',
              fontWeight: convo.unread ? '500' : '400',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {convo.lastMsg}
          </span>
          {convo.unread > 0 && (
            <span
              style={{
                background: '#6366f1',
                color: 'white',
                borderRadius: '9999px',
                width: '20px',
                height: '20px',
                fontSize: '12px',
                fontWeight: '700',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginLeft: '8px',
              }}
            >
              {convo.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function IconBtn({ icon: Icon }) {
  return (
    <button
      style={{
        background: 'transparent',
        border: 'none',
        color: '#e7e9ea',
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#16181c')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <Icon size={20} strokeWidth={1.75} />
    </button>
  )
}
