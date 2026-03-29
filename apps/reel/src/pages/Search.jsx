import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Filter, Users } from 'lucide-react'
import { videos, channels } from '../data/videos'

const filterChips = ['All', 'Video', 'Channel', 'Playlist', 'Short', 'Movie']
const sortOptions = ['Relevance', 'Upload date', 'View count', 'Rating']

export default function Search() {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Relevance')

  const results = videos.slice(0, 10)
  const channelResults = channels.slice(0, 2)

  return (
    <div style={{ padding: '20px 24px 48px', maxWidth: 900 }}>
      {/* Filter chips + sort */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {filterChips.map(chip => (
          <button
            key={chip}
            onClick={() => setActiveFilter(chip)}
            style={{
              padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeFilter === chip ? '#f1f1f1' : '#272727',
              color: activeFilter === chip ? '#0f0f0f' : '#f1f1f1',
              fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
            }}
          >
            {chip}
          </button>
        ))}

        {/* Sort dropdown */}
        <div style={{ marginLeft: 'auto', position: 'relative' }}>
          <button
            onClick={() => setSortOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 14px', borderRadius: 20,
              background: '#272727', border: 'none', cursor: 'pointer',
              color: '#f1f1f1', fontSize: 13, fontWeight: 500,
            }}
          >
            <Filter size={14} />
            Sort: {sortBy}
          </button>
          {sortOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 4,
              background: '#212121', border: '1px solid #3d3d3d',
              borderRadius: 8, overflow: 'hidden', zIndex: 10, minWidth: 160,
            }}>
              {sortOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => { setSortBy(opt); setSortOpen(false) }}
                  style={{
                    display: 'block', width: '100%', padding: '10px 16px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: '#f1f1f1', fontSize: 13, textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#272727'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Channel results (2 cards — special style) */}
      {channelResults.map(ch => (
        <div
          key={ch.id}
          onClick={() => navigate('/channel')}
          style={{
            display: 'flex', alignItems: 'center', gap: 20,
            padding: 20, marginBottom: 12, borderRadius: 12,
            background: '#212121', cursor: 'pointer', border: '1px solid #3d3d3d',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2a2a2a'}
          onMouseLeave={e => e.currentTarget.style.background = '#212121'}
        >
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: ch.bannerGradient, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, fontWeight: 700, color: '#fff',
          }}>
            {ch.name.slice(0, 1)}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 17, fontWeight: 700, color: '#f1f1f1' }}>{ch.name}</span>
              <span style={{
                background: '#f1f1f1', color: '#0f0f0f', fontSize: 9, fontWeight: 700,
                padding: '2px 6px', borderRadius: 4, letterSpacing: 0.5,
              }}>CHANNEL</span>
            </div>
            <div style={{ fontSize: 13, color: '#aaaaaa', marginBottom: 6 }}>
              {ch.handle} · {ch.subscribers} subscribers · {ch.videoCount} videos
            </div>
            <div style={{ fontSize: 13, color: '#aaaaaa' }}>
              Premium content on cinema, storytelling, and the art of visual narrative.
            </div>
          </div>
          <button style={{
            padding: '9px 20px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: '#ff0000', color: '#fff', fontSize: 14, fontWeight: 600,
          }}>
            Subscribe
          </button>
        </div>
      ))}

      {/* Video results list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {results.map(video => (
          <div
            key={video.id}
            onClick={() => navigate('/watch')}
            style={{
              display: 'flex', gap: 16, cursor: 'pointer',
              borderRadius: 12, padding: 8,
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#212121'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            {/* Landscape thumbnail 246px */}
            <div style={{
              flexShrink: 0, width: 246, height: 138, borderRadius: 8,
              background: video.gradient, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', bottom: 6, right: 6,
                background: 'rgba(0,0,0,0.85)', color: '#fff',
                fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
              }}>
                {video.duration}
              </div>
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: 0, paddingTop: 4 }}>
              <div className="line-clamp-2" style={{ fontSize: 16, fontWeight: 600, color: '#f1f1f1', lineHeight: 1.35, marginBottom: 8 }}>
                {video.title}
              </div>
              <div style={{ fontSize: 12, color: '#aaaaaa', marginBottom: 8 }}>
                {video.views} views · {video.timeAgo}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <div style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #444, #666)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9, fontWeight: 700, color: '#fff',
                }}>
                  {video.channelAvatar}
                </div>
                <span style={{ fontSize: 12, color: '#aaaaaa' }}>{video.channel}</span>
              </div>
              <div className="line-clamp-3" style={{ fontSize: 13, color: '#aaaaaa', lineHeight: 1.55 }}>
                An in-depth exploration of {video.title.toLowerCase()} — covering everything from fundamentals
                to advanced techniques. Watch to discover what most people get completely wrong about this topic.
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}