import { useState } from 'react'
import { Search, Edit, Radio, Eye, ChevronRight } from 'lucide-react'
import LeftNav from '../components/LeftNav'
import { chats, channelPosts } from '../data/chats'

function formatSubscribers(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n
}

function formatViews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

const channels = chats.filter((c) => c.type === 'channel')

export default function ChannelsPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const channelPosts_ = channelPosts.filter((p) => p.channel === selectedChannel?.name)

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftNav />

      {/* Channel list */}
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
            Channels
          </span>
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center rounded-full hover:bg-white/5" style={{ width: 34, height: 34 }}>
              <Search size={18} color="#8a9ab0" />
            </button>
            <button className="flex items-center justify-center rounded-full hover:bg-white/5" style={{ width: 34, height: 34 }}>
              <Edit size={18} color="#8a9ab0" />
            </button>
          </div>
        </div>

        {/* Discover banner */}
        <div
          className="mx-3 my-2 rounded-2xl px-4 py-3 flex items-center gap-3 cursor-pointer"
          style={{ background: 'linear-gradient(135deg,rgba(44,165,224,0.15),rgba(44,165,224,0.05))', border: '1px solid rgba(44,165,224,0.2)' }}
        >
          <Radio size={20} color="#2ca5e0" />
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#2ca5e0' }}>Discover Channels</p>
            <p style={{ fontSize: 11, color: '#8a9ab0' }}>Find channels that matter to you</p>
          </div>
          <ChevronRight size={16} color="#2ca5e0" style={{ marginLeft: 'auto' }} />
        </div>

        {/* Channel rows */}
        <div className="flex-1 overflow-y-auto">
          {channels.map((ch) => {
            const active = selectedChannel?.id === ch.id
            return (
              <button
                key={ch.id}
                onClick={() => setSelectedChannel(ch)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{
                  background: active ? 'rgba(44,165,224,0.12)' : 'transparent',
                  borderLeft: active ? '2px solid #2ca5e0' : '2px solid transparent',
                }}
              >
                <div
                  className="flex items-center justify-center text-white font-bold rounded-2xl flex-shrink-0"
                  style={{ width: 52, height: 52, background: ch.avatarColor, fontSize: 14 }}
                >
                  {ch.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span style={{ fontSize: 14, fontWeight: 600, color: active ? '#2ca5e0' : '#fff' }}>
                      {ch.name}
                    </span>
                    <span style={{ fontSize: 11, color: '#8a9ab0' }}>{ch.time}</span>
                  </div>
                  <p className="truncate" style={{ fontSize: 13, color: '#8a9ab0' }}>{ch.preview}</p>
                  <p style={{ fontSize: 11, color: '#5a6a7a', marginTop: 2 }}>
                    {formatSubscribers(ch.subscribers)} subscribers
                  </p>
                </div>
                {ch.unread > 0 && (
                  <div
                    className="flex items-center justify-center rounded-full font-semibold flex-shrink-0"
                    style={{ minWidth: 18, height: 18, padding: '0 5px', background: '#2ca5e0', fontSize: 11, color: '#fff' }}
                  >
                    {ch.unread}
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Channel post view */}
      <div className="flex-1 flex flex-col" style={{ background: '#0f1923' }}>
        {/* Header */}
        {selectedChannel && (
          <div
            className="flex items-center gap-3 px-6 flex-shrink-0"
            style={{ height: 56, background: '#17212b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
          >
            <div
              className="rounded-2xl flex items-center justify-center font-bold text-white"
              style={{ width: 38, height: 38, background: selectedChannel.avatarColor, fontSize: 12 }}
            >
              {selectedChannel.avatar}
            </div>
            <div>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#fff' }}>{selectedChannel.name}</p>
              <p style={{ fontSize: 12, color: '#8a9ab0' }}>
                {formatSubscribers(selectedChannel.subscribers)} subscribers
              </p>
            </div>
          </div>
        )}

        {/* Posts */}
        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4" style={{ scrollbarWidth: 'thin' }}>
          {channelPosts_.length === 0
            ? channelPosts.map((post) => (
                <ChannelPost key={post.id} post={post} formatViews={formatViews} />
              ))
            : channelPosts_.map((post) => (
                <ChannelPost key={post.id} post={post} formatViews={formatViews} />
              ))}
        </div>
      </div>
    </div>
  )
}

function ChannelPost({ post, formatViews }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#182533', maxWidth: 680 }}
    >
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div
          className="rounded-2xl flex items-center justify-center font-bold text-white flex-shrink-0"
          style={{ width: 40, height: 40, background: post.avatarColor, fontSize: 13 }}
        >
          {post.avatar}
        </div>
        <div className="flex-1">
          <p style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{post.channel}</p>
          <p style={{ fontSize: 12, color: '#8a9ab0' }}>{post.time}</p>
        </div>
        <div className="flex items-center gap-1" style={{ color: '#8a9ab0' }}>
          <Eye size={13} />
          <span style={{ fontSize: 12 }}>{formatViews(post.views)}</span>
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 py-4">
        <p style={{ fontSize: 14, color: '#e8eaed', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{post.text}</p>
      </div>

      {/* Reactions */}
      <div className="flex items-center gap-2 px-4 pb-3 flex-wrap">
        {post.reactions.map((r, i) => (
          <button
            key={i}
            className="flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors hover:opacity-80"
            style={{ background: 'rgba(44,165,224,0.1)', border: '1px solid rgba(44,165,224,0.2)' }}
          >
            <span style={{ fontSize: 16 }}>{r.emoji}</span>
            <span style={{ fontSize: 12, color: '#2ca5e0', fontWeight: 500 }}>{r.count.toLocaleString()}</span>
          </button>
        ))}
        <button
          className="flex items-center gap-1.5 rounded-full px-3 py-1 transition-colors hover:opacity-80"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        >
          <span style={{ fontSize: 16 }}>➕</span>
        </button>
      </div>
    </div>
  )
}