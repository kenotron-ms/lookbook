import { useState } from 'react'
import StreamCard from '../components/StreamCard.jsx'
import { streams, formatViewers } from '../data/streams.js'

const TAGS = ['English', 'FPS', 'Battle Royale', 'Ranked', 'Tournament', 'Drops Enabled']

export default function Directory() {
  const [activeTag, setActiveTag] = useState(null)

  const categoryGradient = 'linear-gradient(135deg, #1a0533 0%, #3d1a6e 50%, #6b21a8 100%)'

  return (
    <div>
      {/* Category header hero */}
      <div
        className="relative"
        style={{ background: categoryGradient, height: '200px' }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%)' }}
        />
        <div className="relative flex items-end gap-6 px-8 pb-6 h-full">
          {/* Box art */}
          <div
            className="w-28 rounded-md overflow-hidden shadow-xl shrink-0"
            style={{ aspectRatio: '3/4', background: 'linear-gradient(180deg, #5a2d8f 0%, #2d1459 100%)', border: '2px solid rgba(255,255,255,0.15)' }}
          >
            <div className="flex items-center justify-center h-full text-4xl">🎮</div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
              Category
            </div>
            <h1 className="text-3xl font-extrabold text-white leading-tight">Just Chatting</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5 text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: '#e91916' }}
                />
                {formatViewers(284500)} viewers
              </div>
              <div className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                14,800 live channels
              </div>
            </div>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              {['IRL', 'Talk Show', 'Entertainment', 'Community'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(255,255,255,0.15)', color: 'white' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Filter bar */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium" style={{ color: '#adadb8' }}>Tags:</span>
          {TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className="px-3 py-1 rounded-full text-xs font-medium transition-colors"
              style={{
                background: activeTag === tag ? '#9146ff' : '#26262c',
                color: activeTag === tag ? 'white' : '#adadb8',
                border: activeTag === tag ? '1px solid #9146ff' : '1px solid #3a3a3f',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Streams grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm" style={{ color: '#adadb8' }}>
              {streams.length} streams
            </span>
            <select
              className="text-sm px-3 py-1.5 rounded outline-none"
              style={{ background: '#26262c', color: '#efeff1', border: '1px solid #3a3a3f' }}
            >
              <option>Viewer Count (High to Low)</option>
              <option>Newest</option>
              <option>Recommended</option>
            </select>
          </div>
          <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {streams.map((stream) => (
              <StreamCard key={stream.id} stream={stream} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
