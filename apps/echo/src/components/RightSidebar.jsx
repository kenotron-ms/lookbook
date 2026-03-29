import { useState } from 'react'
import { Search } from 'lucide-react'
import { Avatar } from './LeftSidebar'

const TRENDING = [
  { category: 'Technology · Trending', topic: '#AIFirst', posts: '142K' },
  { category: 'Design · Trending', topic: 'Design Systems', posts: '28.4K' },
  { category: 'Developer Tools · Trending', topic: '#ViteJS', posts: '18.1K' },
  { category: 'Startup · Trending', topic: 'Indie Hacker', posts: '12.9K' },
  { category: 'Trending in US', topic: '#BuildInPublic', posts: '9.7K' },
]

const SUGGESTED = [
  { name: 'Vercel', handle: 'vercel', initials: 'V', bg: '#000', border: true },
  { name: 'Evan You', handle: 'youyuxi', initials: 'EY', bg: '#42b883' },
  { name: 'Kent C. Dodds', handle: 'kentcdodds', initials: 'KD', bg: '#e44d26' },
]

export default function RightSidebar() {
  const [searchVal, setSearchVal] = useState('')
  const [following, setFollowing] = useState({})

  const toggleFollow = (handle) =>
    setFollowing((f) => ({ ...f, [handle]: !f[handle] }))

  return (
    <aside
      style={{
        width: '350px',
        flexShrink: 0,
        padding: '0 0 0 24px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
        paddingTop: '8px',
      }}
    >
      {/* Search bar */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search
          size={18}
          color="#71767b"
          style={{
            position: 'absolute',
            left: '14px',
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
            transition: 'border-color 0.2s, background 0.2s',
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

      {/* Trending */}
      <Section title="What's happening">
        {TRENDING.map((t, i) => (
          <TrendingItem key={i} {...t} />
        ))}
        <ShowMoreBtn />
      </Section>

      {/* Who to follow */}
      <Section title="Who to follow">
        {SUGGESTED.map((u) => (
          <SuggestedUser
            key={u.handle}
            user={u}
            isFollowing={following[u.handle]}
            onFollow={() => toggleFollow(u.handle)}
          />
        ))}
        <ShowMoreBtn />
      </Section>

      {/* Footer links */}
      <div
        style={{
          padding: '16px 0',
          fontSize: '13px',
          color: '#71767b',
          lineHeight: '20px',
        }}
      >
        {[
          'Terms of Service',
          'Privacy Policy',
          'Cookie Policy',
          'Accessibility',
          'Ads info',
          'More',
        ].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              marginRight: '8px',
              color: '#71767b',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
          >
            {l}
          </a>
        ))}
        <div style={{ marginTop: '4px' }}>© 2025 Echo Corp.</div>
      </div>
    </aside>
  )
}

function Section({ title, children }) {
  return (
    <div
      style={{
        background: '#16181c',
        borderRadius: '16px',
        marginBottom: '16px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '16px',
          fontSize: '20px',
          fontWeight: '800',
          color: '#e7e9ea',
          letterSpacing: '-0.02em',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  )
}

function TrendingItem({ category, topic, posts }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '12px 16px',
        cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ fontSize: '13px', color: '#71767b', marginBottom: '2px' }}>
        {category}
      </div>
      <div style={{ fontWeight: '700', fontSize: '15px', color: '#e7e9ea', marginBottom: '2px' }}>
        {topic}
      </div>
      <div style={{ fontSize: '13px', color: '#71767b' }}>{posts} posts</div>
    </div>
  )
}

function SuggestedUser({ user, isFollowing, onFollow }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        cursor: 'pointer',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div
        style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: user.bg,
          border: user.border ? '1px solid #2f3336' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '700',
          color: 'white',
          flexShrink: 0,
        }}
      >
        {user.initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: '700',
            fontSize: '15px',
            color: '#e7e9ea',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {user.name}
        </div>
        <div style={{ fontSize: '15px', color: '#71767b' }}>@{user.handle}</div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation()
          onFollow()
        }}
        style={{
          background: isFollowing ? 'transparent' : '#e7e9ea',
          color: isFollowing ? '#e7e9ea' : '#000',
          border: isFollowing ? '1px solid #536471' : '1px solid transparent',
          borderRadius: '9999px',
          padding: '6px 16px',
          fontSize: '15px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (isFollowing) {
            e.currentTarget.textContent = 'Unfollow'
            e.currentTarget.style.borderColor = '#f4212e'
            e.currentTarget.style.color = '#f4212e'
          }
        }}
        onMouseLeave={(e) => {
          if (isFollowing) {
            e.currentTarget.textContent = 'Following'
            e.currentTarget.style.borderColor = '#536471'
            e.currentTarget.style.color = '#e7e9ea'
          }
        }}
      >
        {isFollowing ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}

function ShowMoreBtn() {
  return (
    <div
      style={{
        padding: '16px',
        cursor: 'pointer',
        color: '#6366f1',
        fontSize: '15px',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      Show more
    </div>
  )
}
