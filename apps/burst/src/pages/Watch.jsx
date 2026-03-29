import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Play, Pause, Volume2, VolumeX, Maximize2, MessageSquare,
  Settings, Bell, Share2, Heart, ChevronDown, ChevronUp, Scissors, Star
} from 'lucide-react'
import { chatMessages, streams, formatViewers } from '../data/streams.js'

const stream = streams[0]

function ChatMessage({ msg }) {
  const renderMessage = (text) => {
    const emoteRegex = /:([\w]+):/g
    const parts = text.split(emoteRegex)
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        // It's an emote name
        const emoteColors = { PogChamp: '#ffd700', KEKW: '#ff9f00', Pog: '#00bfff', monkaS: '#ff4444', LUL: '#ff9f00' }
        return (
          <span
            key={i}
            className="font-bold mx-0.5 text-xs px-1 py-0.5 rounded"
            style={{ background: '#26262c', color: emoteColors[part] || '#9146ff' }}
          >
            :{part}:
          </span>
        )
      }
      return <span key={i}>{part}</span>
    })
  }

  return (
    <div
      className="px-4 py-1 text-sm leading-snug hover:bg-white/5 transition-colors"
      style={msg.bits > 0 ? { background: 'rgba(145,70,255,0.08)', borderLeft: '2px solid #9146ff' } : {}}
    >
      {msg.bits > 0 && (
        <div className="text-xs font-semibold mb-0.5" style={{ color: '#9146ff' }}>
          ✦ {msg.bits.toLocaleString()} Bits
        </div>
      )}
      <span>
        {msg.isMod && (
          <span className="mr-1 text-xs" style={{ color: '#00ff7f' }}>⚔</span>
        )}
        {msg.isVip && (
          <span className="mr-1 text-xs" style={{ color: '#ffd700' }}>♦</span>
        )}
        <span className="font-bold mr-1" style={{ color: msg.color }}>
          {msg.user}
        </span>
        <span style={{ color: '#efeff1' }}>
          {renderMessage(msg.message)}
        </span>
      </span>
    </div>
  )
}

const clipPreviews = [
  { id: 1, title: "Insane 1v5 clutch — 5 kills in 4 seconds", duration: "0:38", views: "142K", gradient: "linear-gradient(135deg, #1a0533, #6b21a8)" },
  { id: 2, title: "Chat goes KEKW after failed flash", duration: "0:15", views: "89K", gradient: "linear-gradient(135deg, #3b0000, #b91c1c)" },
  { id: 3, title: "Stream highlight — crazy outplay mid lane", duration: "1:02", views: "210K", gradient: "linear-gradient(135deg, #001a0e, #15803d)" },
]

export default function Watch() {
  const [playing, setPlaying] = useState(true)
  const [muted, setMuted] = useState(false)
  const [chatVisible, setChatVisible] = useState(true)
  const [followed, setFollowed] = useState(false)
  const [message, setMessage] = useState('')
  const [localMessages, setLocalMessages] = useState(chatMessages)
  const chatEndRef = useRef(null)
  const [descExpanded, setDescExpanded] = useState(false)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [localMessages])

  const sendMessage = () => {
    if (!message.trim()) return
    setLocalMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        user: 'You',
        color: '#9146ff',
        message: message.trim(),
        bits: 0,
      },
    ])
    setMessage('')
  }

  return (
    <div className="flex h-full overflow-hidden">
      {/* ── LEFT: Video + info ── */}
      <div className="flex-1 flex flex-col overflow-y-auto min-w-0">
        {/* Video Player */}
        <div
          className="relative w-full shrink-0"
          style={{ aspectRatio: '16/9', background: '#000', maxHeight: '75vh' }}
        >
          {/* Stream simulation */}
          <div
            className="absolute inset-0"
            style={{ background: stream.gradient }}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.015) 3px, rgba(255,255,255,0.015) 4px)',
            }}
          />

          {/* Gradient overlay for controls */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 30%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 20%)' }}
          />

          {/* LIVE badge + viewer count */}
          <div className="absolute top-4 left-4 flex items-center gap-3">
            <span
              className="px-2.5 py-1 rounded text-sm font-bold text-white tracking-wide"
              style={{ background: '#e91916' }}
            >
              LIVE
            </span>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded text-sm font-medium text-white"
              style={{ background: 'rgba(0,0,0,0.65)' }}
            >
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: '#e91916' }} />
              {formatViewers(stream.viewers)} viewers
            </div>
          </div>

          {/* Controls bar */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 px-4 pb-4">
            {/* Play/Pause */}
            <button
              onClick={() => setPlaying((v) => !v)}
              className="p-1.5 rounded transition-colors hover:bg-white/20"
            >
              {playing ? <Pause size={20} color="white" fill="white" /> : <Play size={20} color="white" fill="white" />}
            </button>

            {/* Volume */}
            <button
              onClick={() => setMuted((v) => !v)}
              className="p-1.5 rounded transition-colors hover:bg-white/20"
            >
              {muted ? <VolumeX size={20} color="white" /> : <Volume2 size={20} color="white" />}
            </button>

            {/* Volume slider */}
            <input
              type="range"
              min="0"
              max="100"
              defaultValue="80"
              className="w-20 accent-white"
              style={{ accentColor: '#9146ff' }}
            />

            {/* Spacer */}
            <div className="flex-1" />

            {/* Chat overlay toggle */}
            <button
              onClick={() => setChatVisible((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium transition-colors hover:bg-white/20"
              style={{ color: chatVisible ? 'white' : 'rgba(255,255,255,0.6)' }}
            >
              <MessageSquare size={14} />
              Chat
            </button>

            {/* Fullscreen */}
            <button className="p-1.5 rounded transition-colors hover:bg-white/20">
              <Maximize2 size={18} color="white" />
            </button>
          </div>
        </div>

        {/* Channel Info */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2f' }}>
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <Link to="/" className="shrink-0">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white"
                style={{ background: stream.avatarColor }}
              >
                {stream.avatar}
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold leading-tight" style={{ color: '#efeff1' }}>
                  {stream.channel}
                </h1>
                <button
                  onClick={() => setFollowed((v) => !v)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-semibold transition-all"
                  style={{
                    background: followed ? 'transparent' : '#9146ff',
                    color: followed ? '#9146ff' : 'white',
                    border: followed ? '1px solid #9146ff' : '1px solid transparent',
                  }}
                >
                  <Bell size={13} />
                  {followed ? 'Following' : 'Follow'}
                </button>
                <button
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded text-sm font-semibold transition-opacity hover:opacity-90"
                  style={{ background: '#26262c', color: '#efeff1' }}
                >
                  <Star size={13} />
                  Subscribe
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors"
                  style={{ background: '#26262c', color: '#adadb8' }}
                >
                  <Share2 size={13} />
                </button>
              </div>
              <div className="text-sm mt-1" style={{ color: '#adadb8' }}>
                5.4K followers · 890 subscribers
              </div>
              <div className="mt-2">
                <div className="text-base font-semibold" style={{ color: '#efeff1' }}>
                  {stream.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className="text-sm font-medium"
                    style={{ color: '#9146ff', cursor: 'pointer' }}
                  >
                    {stream.game}
                  </span>
                  <span style={{ color: '#3a3a3f' }}>·</span>
                  {stream.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full text-xs"
                      style={{ background: '#26262c', color: '#adadb8' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 py-4 border-b" style={{ borderColor: '#2a2a2f' }}>
          <div
            className="text-sm leading-relaxed"
            style={{
              color: '#adadb8',
              maxHeight: descExpanded ? 'none' : '3.6em',
              overflow: 'hidden',
            }}
          >
            Live every day grinding to Challenger. Come hang out! Use !discord to join the community server.
            !schedule for next stream times. Sub for ad-free viewing, exclusive emotes, and sub-only chat modes.
            Business inquiries: booking@example.com
          </div>
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="flex items-center gap-1 text-xs mt-1 transition-colors"
            style={{ color: '#9146ff' }}
          >
            {descExpanded ? <><ChevronUp size={12} /> Show less</> : <><ChevronDown size={12} /> More</>}
          </button>
        </div>

        {/* Panel sections */}
        <div className="px-5 py-4 grid gap-4 border-b" style={{ borderColor: '#2a2a2f', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { label: '📅 Schedule', text: 'Mon–Sat, 2PM–10PM EST' },
            { label: '💬 About', text: 'Challenger ADC • Full-time streamer since 2019' },
            { label: '⭐ Subscribe', text: 'Unlock emotes + sub-only streams from $4.99/mo' },
          ].map((panel) => (
            <div
              key={panel.label}
              className="p-3 rounded-md"
              style={{ background: '#1f1f23', border: '1px solid #2a2a2f' }}
            >
              <div className="text-xs font-semibold mb-1" style={{ color: '#efeff1' }}>
                {panel.label}
              </div>
              <div className="text-xs leading-snug" style={{ color: '#adadb8' }}>
                {panel.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat clips */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Scissors size={16} style={{ color: '#9146ff' }} />
            <h3 className="text-base font-bold" style={{ color: '#efeff1' }}>Top Clips</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {clipPreviews.map((clip) => (
              <div key={clip.id} className="shrink-0 group cursor-pointer" style={{ width: '220px' }}>
                <div
                  className="relative overflow-hidden rounded-md"
                  style={{ aspectRatio: '16/9', background: clip.gradient }}
                >
                  <div
                    className="absolute inset-0 transition-opacity duration-200 opacity-0 group-hover:opacity-20"
                    style={{ background: 'white' }}
                  />
                  <div
                    className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium text-white"
                    style={{ background: 'rgba(0,0,0,0.75)' }}
                  >
                    {clip.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.7)' }}>
                      <Play size={18} color="white" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="text-xs font-semibold leading-snug truncate" style={{ color: '#efeff1' }}>
                    {clip.title}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: '#adadb8' }}>
                    {clip.views} views
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Chat Panel ── */}
      {chatVisible && (
        <div
          className="flex flex-col shrink-0 h-full"
          style={{
            width: '340px',
            background: '#1f1f23',
            borderLeft: '1px solid #2a2a2f',
          }}
        >
          {/* Chat header */}
          <div
            className="flex items-center justify-between px-4 py-3 shrink-0"
            style={{ borderBottom: '1px solid #2a2a2f' }}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={16} style={{ color: '#efeff1' }} />
              <span className="text-sm font-bold" style={{ color: '#efeff1' }}>
                Stream Chat
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded transition-colors hover:bg-white/10"
                style={{ color: '#adadb8' }}
              >
                <Settings size={15} />
              </button>
            </div>
          </div>

          {/* Chat modes (sub-only notice) */}
          <div
            className="flex items-center gap-2 px-4 py-2 text-xs shrink-0"
            style={{ background: 'rgba(145,70,255,0.08)', borderBottom: '1px solid #2a2a2f' }}
          >
            <span style={{ color: '#9146ff' }}>⭐</span>
            <span style={{ color: '#adadb8' }}>Slow mode (3s) is on</span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto py-2">
            {localMessages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input area */}
          <div
            className="p-3 shrink-0"
            style={{ borderTop: '1px solid #2a2a2f' }}
          >
            <div
              className="rounded overflow-hidden mb-2"
              style={{ border: '1px solid #3a3a3f' }}
            >
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder="Send a message"
                rows={2}
                className="w-full px-3 py-2 text-sm resize-none outline-none"
                style={{ background: '#0e0e10', color: '#efeff1' }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <button
                  className="p-1.5 rounded text-sm transition-colors hover:bg-white/10"
                  style={{ color: '#adadb8' }}
                  title="Bits"
                >
                  ✦
                </button>
                <button
                  className="p-1.5 rounded text-sm transition-colors hover:bg-white/10"
                  style={{ color: '#adadb8' }}
                  title="Emotes"
                >
                  😊
                </button>
              </div>
              <button
                onClick={sendMessage}
                disabled={!message.trim()}
                className="px-4 py-1.5 rounded text-sm font-semibold transition-opacity"
                style={{
                  background: message.trim() ? '#9146ff' : '#3a3a3f',
                  color: message.trim() ? 'white' : '#6a6a72',
                  cursor: message.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Chat
              </button>
            </div>
            <div className="text-xs mt-2" style={{ color: '#6a6a72' }}>
              Chat as <span style={{ color: '#9146ff' }}>Guest</span> ·{' '}
              <Link to="/" style={{ color: '#9146ff', textDecoration: 'none' }}>Sign in</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
