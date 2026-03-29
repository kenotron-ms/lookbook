import StreamCard from '../components/StreamCard.jsx'
import { streams, followingChannels, formatViewers } from '../data/streams.js'
import { Link } from 'react-router-dom'

const liveStreams = streams.slice(0, 6)
const vodStreams = streams.slice(6, 10)

function VideoCard({ stream }) {
  return (
    <Link to="/watch" style={{ textDecoration: 'none' }} className="group block">
      <div
        className="relative overflow-hidden rounded-md"
        style={{ aspectRatio: '16/9', background: stream.gradient }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />
        <div
          className="absolute inset-0 transition-opacity duration-200 group-hover:opacity-20 opacity-0"
          style={{ background: 'white' }}
        />
        {/* Duration badge */}
        <div
          className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-xs font-medium text-white"
          style={{ background: 'rgba(0,0,0,0.75)' }}
        >
          2:34:17
        </div>
        {/* Channel avatar */}
        <div className="absolute -bottom-3 left-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
            style={{ background: stream.avatarColor, borderColor: '#0e0e10' }}
          >
            {stream.avatar}
          </div>
        </div>
      </div>
      <div className="pt-5 pb-2">
        <div className="text-sm font-semibold truncate" style={{ color: '#efeff1' }}>
          {stream.title}
        </div>
        <div className="text-xs mt-0.5" style={{ color: '#adadb8' }}>{stream.channel}</div>
        <div className="text-xs" style={{ color: '#9146ff' }}>{stream.game}</div>
        <div className="text-xs mt-0.5" style={{ color: '#adadb8' }}>
          {formatViewers(stream.viewers)} views · 2 days ago
        </div>
      </div>
    </Link>
  )
}

export default function Following() {
  return (
    <div className="p-6 space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#efeff1' }}>Following</h1>
        <p className="text-sm mt-1" style={{ color: '#adadb8' }}>
          Channels and creators you follow
        </p>
      </div>

      {/* Live Channels */}
      <section>
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-base font-bold" style={{ color: '#efeff1' }}>
            Live Channels
          </h2>
          <span
            className="px-2 py-0.5 rounded text-xs font-bold text-white"
            style={{ background: '#e91916' }}
          >
            LIVE
          </span>
          <span className="text-sm" style={{ color: '#adadb8' }}>
            {followingChannels.filter((c) => c.live).length} channels live
          </span>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {liveStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Videos from followed */}
      <section>
        <h2 className="text-base font-bold mb-5" style={{ color: '#efeff1' }}>
          Videos from Followed Channels
        </h2>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {vodStreams.map((stream) => (
            <VideoCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Offline channels */}
      <section>
        <h2 className="text-base font-bold mb-4" style={{ color: '#efeff1' }}>
          Offline Channels
        </h2>
        <div className="flex flex-col gap-1">
          {followingChannels
            .filter((c) => !c.live)
            .map((ch) => (
              <Link
                key={ch.id}
                to="/watch"
                className="flex items-center gap-3 px-3 py-2 rounded transition-colors"
                style={{ textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#26262c')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white opacity-60"
                  style={{ background: ch.avatarColor }}
                >
                  {ch.avatar}
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: '#adadb8' }}>
                    {ch.channel}
                  </div>
                  <div className="text-xs" style={{ color: '#6a6a72' }}>
                    Offline · {ch.game}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
