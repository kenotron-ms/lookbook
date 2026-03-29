import { useState, useRef, useEffect } from 'react'
import {
  Phone,
  Video,
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  Play,
  ImageIcon,
  CheckCheck,
  Check,
} from 'lucide-react'
import { ACTIVE_CONVERSATION } from '../data/chats.js'

function Avatar({ initials, color, size = 40 }) {
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold flex-shrink-0"
      style={{
        width: size,
        height: size,
        background: color,
        color: '#fff',
        fontSize: size * 0.33,
      }}
    >
      {initials}
    </div>
  )
}

function ReadReceipt({ status }) {
  if (status === 'read') {
    return <CheckCheck size={15} style={{ color: '#53bdeb' }} strokeWidth={2.5} />
  }
  if (status === 'delivered') {
    return <CheckCheck size={15} style={{ color: '#8696a0' }} strokeWidth={2.5} />
  }
  return <Check size={15} style={{ color: '#8696a0' }} strokeWidth={2.5} />
}

function VoiceMessage({ duration, isMe }) {
  const bars = [3, 5, 8, 6, 10, 7, 12, 9, 6, 8, 5, 10, 7, 4, 8, 6, 11, 8, 5, 7, 9, 6, 4, 8]

  return (
    <div className="flex items-center gap-2" style={{ minWidth: 200 }}>
      <button
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: isMe ? '#ffffff22' : '#25d36644' }}
      >
        <Play size={14} fill={isMe ? '#e9edef' : '#25d366'} color={isMe ? '#e9edef' : '#25d366'} />
      </button>
      <div className="flex items-center gap-0.5 flex-1">
        {bars.map((h, i) => (
          <div
            key={i}
            className="rounded-full flex-shrink-0"
            style={{
              width: 2.5,
              height: h,
              background: isMe ? '#aebac1' : '#8696a0',
              opacity: i < 10 ? 1 : 0.4,
            }}
          />
        ))}
      </div>
      <span className="text-xs flex-shrink-0" style={{ color: isMe ? '#aebac1' : '#8696a0' }}>
        {duration}
      </span>
    </div>
  )
}

function ImageMessage() {
  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{
        width: 220,
        height: 160,
        background: 'linear-gradient(135deg, #1a3a4a 0%, #0d2233 50%, #1a3040 100%)',
        position: 'relative',
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <ImageIcon size={36} style={{ color: '#ffffff44' }} />
      </div>
      <div
        className="absolute bottom-0 left-0 right-0 px-2 py-1 text-xs"
        style={{ background: 'rgba(0,0,0,0.4)', color: '#ffffffaa' }}
      >
        Event flyer
      </div>
    </div>
  )
}

function DateDivider({ text }) {
  return (
    <div className="flex items-center justify-center my-4">
      <span
        className="text-xs px-3 py-1 rounded-full"
        style={{ background: '#182229', color: '#8696a0' }}
      >
        {text}
      </span>
    </div>
  )
}

function MessageBubble({ msg }) {
  const isMe = msg.sender === 'me'

  return (
    <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-1`}>
      <div
        className="rounded-lg px-3 py-2 max-w-sm relative"
        style={{
          background: isMe ? '#005c4b' : '#202c33',
          borderRadius: isMe
            ? '12px 12px 2px 12px'
            : '12px 12px 12px 2px',
        }}
      >
        {msg.type === 'image' ? (
          <div>
            <ImageMessage />
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-xs" style={{ color: '#8696a0' }}>{msg.time}</span>
              {isMe && <ReadReceipt status={msg.status} />}
            </div>
          </div>
        ) : msg.type === 'voice' ? (
          <div>
            <VoiceMessage duration={msg.duration} isMe={isMe} />
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-xs" style={{ color: '#8696a0' }}>{msg.time}</span>
              {isMe && <ReadReceipt status={msg.status} />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            <span className="text-sm leading-relaxed break-words" style={{ color: '#e9edef' }}>
              {msg.text}
            </span>
            <div className="flex items-center justify-end gap-1 mt-1 -mb-0.5">
              <span className="text-xs flex-shrink-0" style={{ color: '#8696a0', fontSize: '0.67rem' }}>
                {msg.time}
              </span>
              {isMe && <ReadReceipt status={msg.status} />}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RightPanel({ chatId }) {
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState(ACTIVE_CONVERSATION.messages)
  const messagesEndRef = useRef(null)
  const { contact } = ACTIVE_CONVERSATION

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!inputText.trim()) return
    const newMsg = {
      id: Date.now(),
      sender: 'me',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'delivered',
    }
    setMessages(prev => [...prev, newMsg])
    setInputText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col flex-1 h-full" style={{ background: '#0b141a' }}>
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
        style={{ background: '#202c33', minHeight: 60, borderBottom: '1px solid #2a3942' }}
      >
        <Avatar initials={contact.initials} color={contact.color} size={42} />
        <div className="flex-1">
          <p className="font-semibold text-sm leading-tight" style={{ color: '#e9edef' }}>
            {contact.name}
          </p>
          <p className="text-xs" style={{ color: '#25d366' }}>
            {contact.isTyping ? 'typing...' : contact.status === 'online' ? 'online' : `last seen today at ${contact.lastSeen}`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
            <Video size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
            <Phone size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
            <Search size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto px-6 py-4 chat-bg"
      >
        {messages.map(msg => {
          if (msg.type === 'date-divider') {
            return <DateDivider key={msg.id} text={msg.text} />
          }
          return <MessageBubble key={msg.id} msg={msg} />
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div
        className="flex items-center gap-2 px-3 py-2 flex-shrink-0"
        style={{ background: '#202c33' }}
      >
        <button className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0" style={{ color: '#aebac1' }}>
          <Paperclip size={22} />
        </button>
        <div
          className="flex-1 flex items-center rounded-lg px-4 py-2"
          style={{ background: '#2a3942', minHeight: 42 }}
        >
          <button className="mr-3 flex-shrink-0" style={{ color: '#aebac1' }}>
            <Smile size={22} />
          </button>
          <input
            type="text"
            placeholder="Type a message"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: '#e9edef' }}
          />
        </div>
        {inputText.trim() ? (
          <button
            onClick={handleSend}
            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
            style={{ background: '#00a884' }}
          >
            <Send size={18} color="#fff" />
          </button>
        ) : (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors flex-shrink-0" style={{ color: '#aebac1' }}>
            <Mic size={22} />
          </button>
        )}
      </div>
    </div>
  )
}
