import { useState } from 'react'
import PostComposer from '../components/PostComposer'
import PostCard from '../components/PostCard'
import { POSTS, FOLLOWING_POSTS } from '../data/posts'

const TABS = ['For You', 'Following']

export default function Home() {
  const [activeTab, setActiveTab] = useState(0)
  const posts = activeTab === 0 ? POSTS : FOLLOWING_POSTS

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
        {/* Title row */}
        <div
          style={{
            padding: '12px 16px',
            fontSize: '20px',
            fontWeight: '800',
            color: '#e7e9ea',
            letterSpacing: '-0.02em',
          }}
        >
          Home
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #2f3336' }}>
          {TABS.map((tab, i) => (
            <Tab
              key={tab}
              label={tab}
              active={activeTab === i}
              onClick={() => setActiveTab(i)}
            />
          ))}
        </div>
      </div>

      {/* Composer */}
      <PostComposer />

      {/* Feed */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {/* Load more sentinel */}
      <div
        style={{
          padding: '24px 16px',
          textAlign: 'center',
          color: '#71767b',
          fontSize: '15px',
        }}
      >
        You're all caught up — check back later.
      </div>
    </div>
  )
}

function Tab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '16px',
        background: 'transparent',
        border: 'none',
        color: active ? '#e7e9ea' : '#71767b',
        fontSize: '15px',
        fontWeight: active ? '700' : '500',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {label}
      {active && (
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '56px',
            height: '4px',
            background: '#6366f1',
            borderRadius: '9999px',
          }}
        />
      )}
    </button>
  )
}
