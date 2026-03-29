import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageCircle,
  Camera,
  Edit,
  Search,
  Plus,
  MoreVertical,
  Check,
  CheckCheck,
} from 'lucide-react'
import { CURRENT_USER, STATUS_CONTACTS, CHATS } from '../data/chats.js'

function Avatar({ initials, color, size = 48, ring = false, ringColor }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        color: '#fff',
        fontSize: size * 0.33,
        boxShadow: ring ? `0 0 0 2.5px ${ringColor || color}, 0 0 0 4px #111b21` : undefined,
      }}
    >
      {initials}
    </div>
  )
}

function StatusCircle({ contact, isMe }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      <div className="relative">
        {isMe ? (
          <>
            <Avatar initials={CURRENT_USER.initials} color={CURRENT_USER.avatarColor} size={48} />
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: '#00a884' }}
            >
              <Plus size={11} color="#fff" strokeWidth={2.5} />
            </div>
          </>
        ) : (
          <Avatar initials={contact.initials} color={contact.color} size={48} ring ringColor={contact.color} />
        )}
      </div>
      <span className="text-xs truncate max-w-[52px] text-center" style={{ color: '#aebac1' }}>
        {isMe ? 'Add status' : contact.name.split(' ')[0]}
      </span>
    </div>
  )
}

function DoubleCheck({ isRead }) {
  return (
    <CheckCheck
      size={16}
      style={{ color: isRead ? '#53bdeb' : '#8696a0' }}
      strokeWidth={2.5}
    />
  )
}

function ChatRow({ chat, isActive, onClick }) {
  const isSentByMe = chat.lastMessage.startsWith('You:')

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-3 cursor-pointer transition-colors"
      style={{
        background: isActive ? '#2a3942' : 'transparent',
        borderBottom: '1px solid #1d2b30',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#182229' }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      <Avatar initials={chat.initials} color={chat.color} size={49} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className="font-semibold text-sm truncate" style={{ color: '#e9edef' }}>{chat.name}</span>
          <span
            className="text-xs flex-shrink-0 ml-2"
            style={{ color: chat.unread > 0 ? '#25d366' : '#8696a0', fontSize: '0.7rem' }}
          >
            {chat.timestamp}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0 flex-1">
            {isSentByMe && <DoubleCheck isRead={chat.isRead} />}
            {chat.isTyping ? (
              <span className="text-xs truncate" style={{ color: '#25d366' }}>typing...</span>
            ) : (
              <span className="text-xs truncate" style={{ color: '#8696a0' }}>{chat.lastMessage}</span>
            )}
          </div>
          {chat.unread > 0 && (
            <span
              className="text-xs rounded-full flex items-center justify-center flex-shrink-0 ml-2 font-medium"
              style={{
                background: '#25d366',
                color: '#111b21',
                minWidth: 20,
                height: 20,
                padding: '0 6px',
                fontSize: '0.68rem',
              }}
            >
              {chat.unread}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function LeftPanel({ activeChatId, onSelectChat }) {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredChats = CHATS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div
      className="flex flex-col h-full"
      style={{ width: 380, minWidth: 380, background: '#111b21', borderRight: '1px solid #2a3942' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ background: '#202c33', minHeight: 60 }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle size={26} fill="#25d366" color="#25d366" />
          <span className="font-bold text-lg tracking-tight" style={{ color: '#e9edef' }}>Beam</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/status')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: '#aebac1' }}
            title="Status"
          >
            <Camera size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }} title="New chat">
            <Edit size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 flex-shrink-0" style={{ background: '#111b21' }}>
        <div
          className="flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: '#202c33' }}
        >
          <Search size={16} style={{ color: '#8696a0' }} />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#e9edef' }}
          />
        </div>
      </div>

      {/* Status Row */}
      <div
        className="flex items-center gap-4 px-4 py-3 overflow-x-auto flex-shrink-0"
        style={{ background: '#111b21', borderBottom: '1px solid #2a3942' }}
      >
        <StatusCircle isMe />
        {STATUS_CONTACTS.slice(0, 4).map(contact => (
          <StatusCircle key={contact.id} contact={contact} />
        ))}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map(chat => (
          <ChatRow
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onClick={() => onSelectChat(chat.id)}
          />
        ))}
      </div>
    </div>
  )
}
