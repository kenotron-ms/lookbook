import { useRef, useEffect } from 'react'
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Pin,
  Paperclip,
  Smile,
  Mic,
  Send,
  ChevronRight,
} from 'lucide-react'
import { conversation, pinnedMessage, chats } from '../data/chats'

// ----- Message Types -----

function TextBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`} style={{ paddingLeft: isMe ? 80 : 0, paddingRight: isMe ? 0 : 80 }}>
      <div
        className="rounded-2xl px-3 py-2 max-w-xs"
        style={{
          background: isMe ? '#2b5278' : '#182533',
          borderBottomRightRadius: isMe ? 4 : 18,
          borderBottomLeftRadius: isMe ? 18 : 4,
          maxWidth: 360,
        }}
      >
        <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.45, whiteSpace: 'pre-line' }}>{msg.text}</p>
        <div className={`flex ${isMe ? 'justify-end' : 'justify-end'} mt-0.5`}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{msg.time}</span>
        </div>
      </div>
    </div>
  )
}

function StickerBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div
        className="rounded-2xl flex items-center justify-center"
        style={{
          width: 80,
          height: 80,
          background: msg.gradient,
          fontSize: 32,
        }}
      >
        <span style={{ fontSize: 36 }}>✨</span>
      </div>
    </div>
  )
}

function PhotoBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`} style={{ paddingLeft: isMe ? 80 : 0, paddingRight: isMe ? 0 : 80 }}>
      <div
        className="overflow-hidden"
        style={{
          borderRadius: 12,
          borderBottomRightRadius: isMe ? 4 : 12,
          borderBottomLeftRadius: isMe ? 12 : 4,
          maxWidth: 280,
        }}
      >
        <div
          className="relative"
          style={{
            width: 260,
            height: 160,
            background: msg.gradient || 'linear-gradient(135deg,#1a1a2e,#16213e)',
          }}
        >
          {/* Photo placeholder grid lines */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.1) 20px,rgba(255,255,255,0.1) 21px)',
          }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div style={{ fontSize: 40 }}>🖼️</div>
          </div>
        </div>
        {msg.caption && (
          <div style={{ background: isMe ? '#2b5278' : '#182533', padding: '6px 10px' }}>
            <p style={{ fontSize: 13, color: '#fff' }}>{msg.caption}</p>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{msg.time}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ForwardedBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`} style={{ paddingLeft: isMe ? 80 : 0, paddingRight: isMe ? 0 : 80 }}>
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: isMe ? '#2b5278' : '#182533',
          borderBottomRightRadius: isMe ? 4 : 18,
          borderBottomLeftRadius: isMe ? 18 : 4,
          maxWidth: 360,
        }}
      >
        {/* Forwarded header */}
        <div
          className="flex items-center gap-1.5 px-3 pt-2 pb-1"
          style={{ borderLeft: '3px solid #2ca5e0', marginLeft: 8, marginTop: 8 }}
        >
          <ChevronRight size={12} color="#2ca5e0" />
          <span style={{ fontSize: 12, color: '#2ca5e0', fontWeight: 600 }}>
            Forwarded from {msg.forwardedFrom}
          </span>
        </div>
        <div className="px-3 pb-2 pt-1">
          <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.45 }}>{msg.text}</p>
          <div className="flex justify-end mt-0.5">
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{msg.time}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function PollBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'}`} style={{ paddingLeft: isMe ? 40 : 0, paddingRight: isMe ? 0 : 40 }}>
      <div
        className="rounded-2xl p-3"
        style={{
          background: isMe ? '#2b5278' : '#182533',
          borderBottomRightRadius: isMe ? 4 : 18,
          borderBottomLeftRadius: isMe ? 18 : 4,
          minWidth: 260,
          maxWidth: 320,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="rounded-full flex items-center justify-center"
            style={{ width: 28, height: 28, background: '#2ca5e0' }}
          >
            <span style={{ fontSize: 14 }}>📊</span>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{msg.question}</p>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Anonymous Poll</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {msg.options.map((opt, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden" style={{ height: 36, background: 'rgba(255,255,255,0.06)' }}>
              <div
                className="absolute inset-y-0 left-0 rounded-xl"
                style={{ width: `${opt.pct}%`, background: 'rgba(44,165,224,0.3)' }}
              />
              <div className="absolute inset-0 flex items-center justify-between px-3">
                <span style={{ fontSize: 13, color: '#fff' }}>{opt.text}</span>
                <span style={{ fontSize: 12, color: '#2ca5e0', fontWeight: 600 }}>{opt.pct}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{msg.totalVotes} votes</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{msg.time}</span>
        </div>
      </div>
    </div>
  )
}

function InlineKeyboardBubble({ msg }) {
  const isMe = msg.sender === 'me'
  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`} style={{ paddingLeft: isMe ? 80 : 0, paddingRight: isMe ? 0 : 80 }}>
      <div
        className="rounded-2xl px-3 py-2"
        style={{
          background: isMe ? '#2b5278' : '#182533',
          borderBottomRightRadius: isMe ? 4 : 18,
          borderBottomLeftRadius: isMe ? 18 : 4,
          maxWidth: 320,
        }}
      >
        <p style={{ fontSize: 14, color: '#fff', lineHeight: 1.45 }}>{msg.text}</p>
        <div className="flex justify-end mt-0.5">
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{msg.time}</span>
        </div>
      </div>
      {/* Inline keyboard */}
      <div className="flex flex-col gap-1 mt-1" style={{ minWidth: 200, maxWidth: 320, width: '100%' }}>
        {msg.buttons.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {row.map((btn, bi) => (
              <button
                key={bi}
                className="flex-1 rounded-xl flex items-center justify-center transition-colors hover:opacity-80"
                style={{
                  height: 32,
                  background: 'rgba(44,165,224,0.15)',
                  border: '1px solid rgba(44,165,224,0.3)',
                  fontSize: 13,
                  color: '#2ca5e0',
                  fontWeight: 500,
                }}
              >
                {btn.text}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function DateDivider({ label }) {
  if (!label) return null
  return (
    <div className="flex items-center justify-center py-3">
      <span
        className="px-3 py-1 rounded-full"
        style={{ fontSize: 12, color: '#8a9ab0', background: 'rgba(0,0,0,0.3)' }}
      >
        {label}
      </span>
    </div>
  )
}

function MessageRow({ msg }) {
  switch (msg.type) {
    case 'text':       return <TextBubble msg={msg} />
    case 'sticker':    return <StickerBubble msg={msg} />
    case 'photo':      return <PhotoBubble msg={msg} />
    case 'forwarded':  return <ForwardedBubble msg={msg} />
    case 'poll':       return <PollBubble msg={msg} />
    case 'inline_keyboard': return <InlineKeyboardBubble msg={msg} />
    default:           return null
  }
}

// ----- Main component -----

export default function ConversationArea({ chat }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  if (!chat) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center gap-4"
        style={{ background: '#0f1923' }}
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{ width: 80, height: 80, background: 'rgba(44,165,224,0.1)' }}
        >
          <Send size={36} color="#2ca5e0" />
        </div>
        <div className="text-center">
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Warp</h2>
          <p style={{ fontSize: 14, color: '#8a9ab0' }}>Fast. Secure. Wherever.</p>
          <p style={{ fontSize: 13, color: '#5a6a7a', marginTop: 4 }}>Select a chat to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#0f1923' }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 56, background: '#17212b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
      >
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center text-white font-semibold"
            style={{ width: 38, height: 38, background: chat.avatarColor, fontSize: 12 }}
          >
            {chat.avatar}
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.2 }}>{chat.name}</p>
            <p style={{ fontSize: 12, color: chat.online ? '#4cd964' : '#8a9ab0' }}>
              {chat.online ? 'online' : chat.members ? `${chat.members} members` : 'last seen recently'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {[Phone, Video, Search, MoreVertical].map((Icon, i) => (
            <button
              key={i}
              className="flex items-center justify-center rounded-full transition-colors hover:bg-white/5"
              style={{ width: 36, height: 36 }}
            >
              <Icon size={18} color="#8a9ab0" />
            </button>
          ))}
        </div>
      </div>

      {/* Pinned message */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
        style={{ background: 'rgba(44,165,224,0.08)', borderBottom: '1px solid rgba(44,165,224,0.15)' }}
      >
        <Pin size={14} color="#2ca5e0" />
        <div className="flex-1 min-w-0">
          <span style={{ fontSize: 11, color: '#2ca5e0', fontWeight: 600 }}>Pinned Message</span>
          <p className="truncate" style={{ fontSize: 13, color: '#8a9ab0' }}>{pinnedMessage.text}</p>
        </div>
        <ChevronRight size={14} color="#8a9ab0" />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2" style={{ scrollbarWidth: 'thin' }}>
        {conversation.map((msg) => (
          <div key={msg.id}>
            <DateDivider label={msg.dateLabel} />
            <MessageRow msg={msg} />
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-4 flex-shrink-0"
        style={{ height: 64, background: '#17212b', borderTop: '1px solid rgba(255,255,255,0.04)' }}
      >
        <button
          className="flex items-center justify-center rounded-full transition-colors hover:bg-white/5 flex-shrink-0"
          style={{ width: 38, height: 38 }}
        >
          <Paperclip size={20} color="#8a9ab0" />
        </button>

        <div
          className="flex-1 flex items-center gap-2 rounded-2xl px-3"
          style={{ background: 'rgba(255,255,255,0.07)', height: 44 }}
        >
          <button>
            <Smile size={20} color="#8a9ab0" />
          </button>
          <input
            className="flex-1 bg-transparent outline-none"
            placeholder="Message"
            style={{ fontSize: 14, color: '#fff' }}
          />
          <button style={{ fontSize: 16 }}>🎭</button>
          <button style={{ fontSize: 16 }}>🎬</button>
        </div>

        <button
          className="flex items-center justify-center rounded-full flex-shrink-0 transition-transform hover:scale-105 active:scale-95"
          style={{ width: 44, height: 44, background: '#2ca5e0' }}
        >
          <Mic size={20} color="#fff" />
        </button>
      </div>
    </div>
  )
}