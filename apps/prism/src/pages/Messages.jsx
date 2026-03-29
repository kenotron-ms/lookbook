import { useState } from 'react'
import { Search, Edit } from 'lucide-react'
import { DM_CONVERSATIONS } from '../data/posts'
import { Avatar } from '../components/LeftSidebar'

const SECONDARY = '#8e8e8e'
const BORDER = '#262626'
const ACCENT = '#f43f5e'

export default function Messages() {
  const [selectedId, setSelectedId] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = DM_CONVERSATIONS.filter(
    (c) =>
      c.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ padding: '16px 24px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#e7e9ea' }}>Messages</h1>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: '#e7e9ea',
            padding: '6px',
            borderRadius: '8px',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#1a1a1a')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <Edit size={22} />
        </button>
      </div>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#1a1a1a',
          border: `1px solid ${BORDER}`,
          borderRadius: '10px',
          padding: '10px 14px',
          marginBottom: '16px',
        }}
      >
        <Search size={16} color={SECONDARY} />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search direct messages"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#e7e9ea',
            fontSize: '15px',
          }}
        />
      </div>

      {/* Conversation list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {filtered.map((convo) => (
          <ConversationRow
            key={convo.id}
            convo={convo}
            isSelected={selectedId === convo.id}
            onClick={() => setSelectedId(convo.id)}
          />
        ))}
      </div>
    </div>
  )
}

function ConversationRow({ convo, isSelected, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '12px 10px',
        borderRadius: '12px',
        cursor: 'pointer',
        background: isSelected ? '#1a1a1a' : hovered ? '#111' : 'transparent',
        transition: 'background 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Avatar initials={convo.user.initials} bg={convo.user.avatarBg} size={52} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: convo.unread > 0 ? '700' : '400',
            color: '#e7e9ea',
            marginBottom: '2px',
          }}
        >
          {convo.user.name}
        </div>
        <div
          style={{
            fontSize: '14px',
            color: convo.unread > 0 ? '#e7e9ea' : SECONDARY,
            fontWeight: convo.unread > 0 ? '500' : '400',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {convo.lastMessage}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
        <span style={{ fontSize: '12px', color: convo.unread > 0 ? ACCENT : SECONDARY }}>
          {convo.time}
        </span>
        {convo.unread > 0 && (
          <span
            style={{
              background: ACCENT,
              color: 'white',
              borderRadius: '9999px',
              fontSize: '11px',
              fontWeight: '700',
              minWidth: '18px',
              height: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0 4px',
            }}
          >
            {convo.unread}
          </span>
        )}
      </div>
    </div>
  )
}
