import { useState } from 'react'
import { Search, TrendingUp, Play } from 'lucide-react'
import { videos, trendingHashtags } from '../data/videos.js'

const categories = ['All', 'Beauty', 'Gaming', 'Sports', 'Dance', 'Comedy', 'Cooking']

const trendCards = [
  { tag: '#DanceChallenge', count: '12.3B', gradient: 'linear-gradient(135deg, #1a0533, #0d001a)' },
  { tag: '#FoodTok', count: '8.9B', gradient: 'linear-gradient(135deg, #1a0a00, #2d0000)' },
  { tag: '#GymBro', count: '6.4B', gradient: 'linear-gradient(135deg, #001a0d, #002211)' },
  { tag: '#TechTok', count: '5.1B', gradient: 'linear-gradient(135deg, #001a1a, #002222)' },
  { tag: '#BookTok', count: '4.7B', gradient: 'linear-gradient(135deg, #1a001a, #110011)' },
  { tag: '#CookingTips', count: '3.9B', gradient: 'linear-gradient(135deg, #1a1000, #221500)' },
  { tag: '#PetVibes', count: '3.2B', gradient: 'linear-gradient(135deg, #0a1628, #001433)' },
  { tag: '#Aesthetic', count: '2.8B', gradient: 'linear-gradient(135deg, #1a0505, #200000)' },
]

const miniVideos = videos.slice(0, 9)

function formatViews(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

export default function Explore() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Search bar */}
      <div style={{ padding: '16px 16px 12px', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#1a1a1a',
          borderRadius: 24,
          padding: '10px 16px',
          border: '1px solid #2a2a2a',
        }}>
          <Search size={16} color="rgba(255,255,255,0.4)" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search creators, sounds, hashtags..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 14,
              flex: 1,
            }}
          />
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ flexShrink: 0, paddingBottom: 12 }}>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                background: activeCategory === cat ? '#fe2c55' : '#1a1a1a',
                color: activeCategory === cat ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: 13,
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="custom-scroll" style={{ flex: 1, overflow: 'auto', padding: '0 16px 24px' }}>

        {/* Trending hashtags */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <TrendingUp size={16} color="#fe2c55" />
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Trending Hashtags</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {trendCards.map(t => (
              <div
                key={t.tag}
                style={{
                  background: t.gradient,
                  borderRadius: 12,
                  padding: '14px 14px',
                  cursor: 'pointer',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 700, color: '#25f4ee', marginBottom: 2 }}>{t.tag}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{t.count} views</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Now */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Trending Now</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
            {miniVideos.map(v => (
              <div key={v.id} style={{ cursor: 'pointer' }}>
                {/* 9:16 card */}
                <div style={{
                  aspectRatio: '9/16',
                  background: v.gradient,
                  borderRadius: 8,
                  position: 'relative',
                  overflow: 'hidden',
                  marginBottom: 6,
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                  }} />
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}>
                    <Play size={20} color="rgba(255,255,255,0.7)" fill="rgba(255,255,255,0.7)" />
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 4,
                    left: 4,
                    fontSize: 10,
                    color: '#fff',
                    fontWeight: 600,
                  }}>
                    {formatViews(v.likes + v.comments)}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.3 }}>{v.handle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
