import { useState } from 'react'
import { Link, Grid3x3, Film, Tag } from 'lucide-react'
import { CURRENT_USER, PROFILE_GRID, HIGHLIGHTS } from '../data/posts'

const ACCENT = '#f43f5e'
const BORDER = '#262626'
const SECONDARY = '#8e8e8e'

const TABS = [
  { id: 'posts',  icon: Grid3x3, label: 'Posts' },
  { id: 'reels',  icon: Film,    label: 'Reels' },
  { id: 'tagged', icon: Tag,     label: 'Tagged' },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts')
  const [following, setFollowing] = useState(false)

  return (
    <div style={{ padding: '24px' }}>
      {/* Profile header */}
      <ProfileHeader following={following} setFollowing={setFollowing} />

      {/* Highlights */}
      <HighlightsRow />

      {/* Tabs */}
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Grid */}
      {activeTab === 'posts' && <PostsGrid />}
      {activeTab === 'reels' && <ReelsGrid />}
      {activeTab === 'tagged' && <TaggedEmpty />}
    </div>
  )
}

function ProfileHeader({ following, setFollowing }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Top row: avatar + stats */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px', marginBottom: '20px' }}>
        {/* Avatar */}
        <div
          style={{
            width: '86px',
            height: '86px',
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${ACCENT}, #fb923c, #8b5cf6)`,
            padding: '3px',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: '#000',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                background: CURRENT_USER.avatarBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '700',
                color: 'white',
              }}
            >
              {CURRENT_USER.initials}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '36px', flex: 1 }}>
          <StatItem label="posts" value={CURRENT_USER.posts} />
          <StatItem label="followers" value={CURRENT_USER.followers.toLocaleString()} />
          <StatItem label="following" value={CURRENT_USER.following} />
        </div>
      </div>

      {/* Bio section */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#e7e9ea', marginBottom: '2px' }}>
          {CURRENT_USER.name}
        </div>
        <div style={{ fontSize: '14px', color: '#e7e9ea', lineHeight: '1.5', marginBottom: '2px' }}>
          {CURRENT_USER.bio}
        </div>
        <div style={{ fontSize: '14px', color: SECONDARY, lineHeight: '1.5', marginBottom: '4px' }}>
          {CURRENT_USER.bio2}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#4d9bf0' }}>
          <Link size={14} />
          <a href="#" style={{ color: '#4d9bf0' }}>{CURRENT_USER.website}</a>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          style={{
            flex: 1,
            padding: '7px 16px',
            background: '#1a1a1a',
            color: '#e7e9ea',
            border: `1px solid ${BORDER}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#262626')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1a1a')}
        >
          Edit Profile
        </button>
        <button
          style={{
            flex: 1,
            padding: '7px 16px',
            background: '#1a1a1a',
            color: '#e7e9ea',
            border: `1px solid ${BORDER}`,
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#262626')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#1a1a1a')}
        >
          View Archive
        </button>
      </div>
    </div>
  )
}

function StatItem({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
      <span style={{ fontSize: '18px', fontWeight: '700', color: '#e7e9ea' }}>{value}</span>
      <span style={{ fontSize: '14px', color: '#e7e9ea' }}>{label}</span>
    </div>
  )
}

function HighlightsRow() {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          paddingBottom: '4px',
        }}
      >
        {HIGHLIGHTS.map((h) => (
          <HighlightCircle key={h.id} highlight={h} />
        ))}
      </div>
    </div>
  )
}

function HighlightCircle({ highlight }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        flexShrink: 0,
        opacity: hovered ? 0.8 : 1,
        transition: 'opacity 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: highlight.bg,
          border: `2px solid ${BORDER}`,
        }}
      />
      <span style={{ fontSize: '12px', color: '#e7e9ea' }}>{highlight.label}</span>
    </div>
  )
}

function ProfileTabs({ activeTab, setActiveTab }) {
  return (
    <div
      style={{
        display: 'flex',
        borderTop: `1px solid ${BORDER}`,
        marginBottom: '3px',
      }}
    >
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '14px',
            background: 'transparent',
            border: 'none',
            borderTop: activeTab === tab.id ? `1px solid #e7e9ea` : '1px solid transparent',
            color: activeTab === tab.id ? '#e7e9ea' : SECONDARY,
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginTop: '-1px',
            transition: 'color 0.15s',
          }}
        >
          <tab.icon size={14} />
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function PostsGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3px',
      }}
    >
      {PROFILE_GRID.map((item) => (
        <GridCard key={item.id} item={item} />
      ))}
    </div>
  )
}

function ReelsGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '3px',
      }}
    >
      {PROFILE_GRID.slice(0, 6).map((item) => (
        <GridCard key={item.id} item={item} tall />
      ))}
    </div>
  )
}

function GridCard({ item, tall }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        aspectRatio: tall ? '9/16' : '1/1',
        background: item.gradient,
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
          }}
        />
      )}
    </div>
  )
}

function TaggedEmpty() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: '12px',
        color: SECONDARY,
      }}
    >
      <Tag size={48} strokeWidth={1} />
      <div style={{ fontSize: '16px', fontWeight: '600', color: '#e7e9ea' }}>No Tagged Posts</div>
      <div style={{ fontSize: '14px', textAlign: 'center' }}>
        Photos and videos you're tagged in will appear here.
      </div>
    </div>
  )
}
