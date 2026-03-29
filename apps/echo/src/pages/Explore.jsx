import { useState } from 'react'
import { Search, TrendingUp } from 'lucide-react'
import PostCard from '../components/PostCard'
import { POSTS } from '../data/posts'

const CATEGORIES = ['For You', 'Trending', 'Tech', 'Design', 'Sports', 'Entertainment']

const TRENDING_TOPICS = [
  { rank: 1, category: 'Technology', topic: '#AIFirst', posts: '142K posts', hot: true },
  { rank: 2, category: 'Developer Tools', topic: '#ViteJS', posts: '18.1K posts', hot: false },
  { rank: 3, category: 'Design', topic: 'Design Systems', posts: '28.4K posts', hot: false },
  { rank: 4, category: 'Startup', topic: '#BuildInPublic', posts: '9.7K posts', hot: true },
  { rank: 5, category: 'Tech', topic: 'React 19', posts: '44.2K posts', hot: false },
  { rank: 6, category: 'Developer', topic: '#OpenSource', posts: '31.8K posts', hot: false },
  { rank: 7, category: 'Design', topic: 'Figma Variables', posts: '7.4K posts', hot: false },
  { rank: 8, category: 'Trending in US', topic: '#IndieHacker', posts: '12.9K posts', hot: false },
]

const EXPLORE_POSTS = [...POSTS].sort(() => Math.random() - 0.5).slice(0, 6)

export default function Explore() {
  const [searchVal, setSearchVal] = useState('')
  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <div>
      {/* Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #2f3336',
        }}
      >
        {/* Search */}
        <div style={{ padding: '8px 16px', position: 'relative' }}>
          <Search
            size={18}
            color="#71767b"
            style={{
              position: 'absolute',
              left: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
            }}
          />
          <input
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search Echo"
            style={{
              width: '100%',
              background: '#16181c',
              border: '1px solid transparent',
              borderRadius: '9999px',
              padding: '10px 16px 10px 42px',
              fontSize: '15px',
              color: '#e7e9ea',
              outline: 'none',
              fontFamily: 'inherit',
            }}
            onFocus={(e) => {
              e.target.style.background = '#000'
              e.target.style.borderColor = '#6366f1'
            }}
            onBlur={(e) => {
              e.target.style.background = '#16181c'
              e.target.style.borderColor = 'transparent'
            }}
          />
        </div>

        {/* Category tabs */}
        <div
          style={{
            display: 'flex',
            overflowX: 'auto',
            borderBottom: '1px solid #2f3336',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(i)}
              style={{
                padding: '16px 20px',
                background: 'transparent',
                border: 'none',
                color: activeCategory === i ? '#e7e9ea' : '#71767b',
                fontSize: '15px',
                fontWeight: activeCategory === i ? '700' : '500',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                position: 'relative',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = 'transparent')
              }
            >
              {cat}
              {activeCategory === i && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '40px',
                    height: '4px',
                    background: '#6366f1',
                    borderRadius: '9999px',
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Trending section header */}
      <div
        style={{
          padding: '16px 16px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <TrendingUp size={20} color="#6366f1" />
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#e7e9ea', letterSpacing: '-0.02em' }}>
          Trending now
        </span>
      </div>

      {/* Trending list */}
      {TRENDING_TOPICS.map((t) => (
        <TrendingRow key={t.rank} topic={t} />
      ))}

      {/* Divider */}
      <div style={{ borderTop: '8px solid #16181c', marginTop: '8px' }} />

      {/* Posts */}
      <div style={{ padding: '16px 16px 8px' }}>
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#e7e9ea', letterSpacing: '-0.02em' }}>
          What's happening
        </span>
      </div>
      {EXPLORE_POSTS.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

function TrendingRow({ topic }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
        borderBottom: '1px solid #2f3336',
      }}
    >
      <div>
        <div style={{ fontSize: '13px', color: '#71767b', marginBottom: '2px' }}>
          {topic.rank} · {topic.category} {topic.hot && '🔥'}
        </div>
        <div style={{ fontWeight: '700', fontSize: '15px', color: '#e7e9ea' }}>
          {topic.topic}
        </div>
        <div style={{ fontSize: '13px', color: '#71767b', marginTop: '2px' }}>
          {topic.posts}
        </div>
      </div>
      <TrendingUp size={18} color="#71767b" />
    </div>
  )
}
