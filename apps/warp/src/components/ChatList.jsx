import { useState } from 'react'
import { Search, Edit, Volume2, VolumeX, Users, Radio } from 'lucide-react'
import { chats } from '../data/chats'

const FOLDERS = ['All', 'Personal', 'Work', 'Channels', 'Groups']

const FOLDER_FILTER = {
  All: () => true,
  Personal: (c) => c.type === 'dm' || c.type === 'saved',
  Work: (c) => c.type === 'group',
  Channels: (c) => c.type === 'channel',
  Groups: (c) => c.type === 'group',
}

function formatSubscribers(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n
}

function ChatRow({ chat, selected, onClick }) {
  const isGroup = chat.type === 'group'
  const isChannel = chat.type === 'channel'
  const isSpecial = chat.type === 'saved'

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 transition-colors text-left"
      style={{
        background: selected ? 'rgba(44,165,224,0.12)' : 'transparent',
        borderLeft: selected ? '2px solid #2ca5e0' : '2px solid transparent',
      }}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div
          className="flex items-center justify-center text-white font-semibold"
          style={{
            width: 50,
            height: 50,
            borderRadius: isGroup || isChannel ? 14 : '50%',
            background: chat.avatarColor,
            fontSize: isSpecial ? 22 : 15,
          }}
        >
          {isGroup || isChannel ? (
            <span style={{ fontSize: 14 }}>{chat.avatar}</span>
          ) : isSpecial ? (
            '☁'
          ) : (
            chat.avatar
          )}
        </div>
        {chat.online && (
          <div
            className="absolute rounded-full"
            style={{
              width: 12,
              height: 12,
              background: '#4cd964',
              border: '2px solid #212121',
              bottom: 1,
              right: 1,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <div className="flex items-center gap-1 min-w-0">
            {isGroup && <Users size={12} color="#8a9ab0" />}
            {isChannel && <Radio size={12} color="#8a9ab0" />}
            <span
              className="font-semibold truncate"
              style={{ fontSize: 14, color: selected ? '#2ca5e0' : '#ffffff' }}
            >
              {chat.name}
            </span>
          </div>
          <span className="flex-shrink-0 ml-2" style={{ fontSize: 11, color: '#8a9ab0' }}>
            {chat.time}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className="truncate flex-1"
            style={{
              fontSize: 13,
              color: chat.muted ? '#5a6a7a' : '#8a9ab0',
              maxWidth: 180,
            }}
          >
            {chat.preview}
          </span>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            {chat.muted && <VolumeX size={12} color="#5a6a7a" />}
            {chat.unread > 0 && (
              <div
                className="flex items-center justify-center rounded-full font-semibold"
                style={{
                  minWidth: 18,
                  height: 18,
                  padding: '0 5px',
                  background: chat.muted ? '#5a6a7a' : '#2ca5e0',
                  fontSize: 11,
                  color: '#fff',
                }}
              >
                {chat.unread > 99 ? '99+' : chat.unread}
              </div>
            )}
          </div>
        </div>
        {(isGroup || isChannel) && (
          <div style={{ fontSize: 11, color: '#5a6a7a', marginTop: 1 }}>
            {isGroup ? `${chat.members} members` : `${formatSubscribers(chat.subscribers)} subscribers`}
          </div>
        )}
      </div>
    </button>
  )
}

export default function ChatList({ selectedChatId, onSelectChat }) {
  const [activeFolder, setActiveFolder] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = chats.filter((c) => {
    const matchesFolder = FOLDER_FILTER[activeFolder](c)
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  return (
    <div
      className="flex flex-col flex-shrink-0"
      style={{ width: 320, background: '#212121', borderRight: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 56, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <span style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', letterSpacing: -0.3 }}>
          Warp
        </span>
        <div className="flex items-center gap-2">
          <button className="flex items-center justify-center rounded-full transition-colors hover:bg-white/5" style={{ width: 34, height: 34 }}>
            <Search size={18} color="#8a9ab0" />
          </button>
          <button className="flex items-center justify-center rounded-full transition-colors hover:bg-white/5" style={{ width: 34, height: 34 }}>
            <Edit size={18} color="#8a9ab0" />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 py-2 flex-shrink-0">
        <div
          className="flex items-center gap-2 rounded-xl px-3"
          style={{ background: 'rgba(255,255,255,0.06)', height: 36 }}
        >
          <Search size={15} color="#5a6a7a" />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            style={{ fontSize: 14, color: '#ffffff' }}
          />
        </div>
      </div>

      {/* Folder tabs */}
      <div
        className="flex gap-2 px-4 pb-2 overflow-x-auto flex-shrink-0"
        style={{ scrollbarWidth: 'none' }}
      >
        {FOLDERS.map((folder) => (
          <button
            key={folder}
            onClick={() => setActiveFolder(folder)}
            className="flex-shrink-0 rounded-full px-3 transition-all"
            style={{
              height: 26,
              fontSize: 12,
              fontWeight: activeFolder === folder ? 600 : 400,
              background: activeFolder === folder ? '#2ca5e0' : 'rgba(255,255,255,0.07)',
              color: activeFolder === folder ? '#fff' : '#8a9ab0',
            }}
          >
            {folder}
          </button>
        ))}
      </div>

      {/* Chat list */}
      <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <Search size={32} color="#5a6a7a" />
            <span style={{ fontSize: 14, color: '#5a6a7a' }}>No chats found</span>
          </div>
        ) : (
          filtered.map((chat) => (
            <ChatRow
              key={chat.id}
              chat={chat}
              selected={chat.id === selectedChatId}
              onClick={() => onSelectChat(chat)}
            />
          ))
        )}
      </div>
    </div>
  )
}