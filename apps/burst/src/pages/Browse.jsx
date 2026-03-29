import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import StreamCard from '../components/StreamCard.jsx'
import { streams, categories, formatViewers } from '../data/streams.js'

const TABS = ['All', 'Live Channels', 'Categories', 'Events']

export default function Browse() {
  const [activeTab, setActiveTab] = useState('All')

  const featured = streams[0]

  return (
    <div className="p-6 space-y-10">
      {/* Tabs */}
      <div className="flex items-center gap-1 border-b" style={{ borderColor: '#2a2a2f' }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2.5 text-sm font-medium relative transition-colors"
            style={{
              color: activeTab === tab ? '#efeff1' : '#adadb8',
              borderBottom: activeTab === tab ? '2px solid #9146ff' : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured stream */}
      <section>
        <div
          className="relative overflow-hidden rounded-lg"
          style={{ maxWidth: '60%', aspectRatio: '16/9', background: featured.gradient }}
        >
          {/* Simulated stream content */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)
              `,
            }}
          />

          {/* Top badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span
              className="px-2 py-1 rounded text-xs font-bold text-white tracking-wide"
              style={{ background: '#e91916' }}
            >
              LIVE
            </span>
            <span
              className="px-2 py-1 rounded text-xs font-medium text-white"
              style={{ background: 'rgba(0,0,0,0.6)' }}
            >
              🎮 Featured
            </span>
          </div>

          {/* Viewer count */}
          <div
            className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded text-xs font-medium text-white"
            style={{ background: 'rgba(0,0,0,0.7)' }}
          >
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: '#e91916' }} />
            {formatViewers(featured.viewers)} viewers
          </div>

          {/* Bottom overlay */}
          <div
            className="absolute bottom-0 left-0 right-0 p-4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
          >
            <div className="flex items-end gap-3">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white shrink-0"
                style={{ background: featured.avatarColor, border: '2px solid rgba(255,255,255,0.3)' }}
              >
                {featured.avatar}
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">{featured.title}</div>
                <div className="text-white/80 text-sm mt-0.5">{featured.channel} · {featured.game}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Channels Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: '#efeff1' }}>
            Recommended Channels
          </h2>
          <Link
            to="/directory"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: '#adadb8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#9146ff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#adadb8')}
          >
            Browse all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {streams.slice(0, 8).map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      </section>

      {/* Categories horizontal scroll */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold" style={{ color: '#efeff1' }}>
            Top Categories
          </h2>
          <Link
            to="/directory"
            className="flex items-center gap-1 text-sm font-medium"
            style={{ color: '#adadb8' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#9146ff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#adadb8')}
          >
            See all <ChevronRight size={14} />
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to="/directory"
              className="shrink-0 group"
              style={{ textDecoration: 'none', width: '140px' }}
            >
              {/* Box art */}
              <div
                className="rounded-md overflow-hidden transition-transform duration-200 group-hover:scale-105"
                style={{ aspectRatio: '3/4', background: cat.gradient }}
              >
                <div
                  className="w-full h-full flex items-end p-3"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                  }}
                >
                  <span className="text-white font-bold text-sm leading-tight">{cat.name}</span>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-sm font-semibold truncate" style={{ color: '#efeff1' }}>
                  {cat.name}
                </div>
                <div className="text-xs" style={{ color: '#adadb8' }}>
                  {formatViewers(cat.viewers)} viewers
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
