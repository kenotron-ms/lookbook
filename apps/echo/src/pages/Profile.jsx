import { useState } from 'react'
import { ArrowLeft, Link, MapPin, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'
import { Avatar } from '../components/LeftSidebar'
import { useCurrentUser, useUserPosts } from '../hooks/useUser.js'
import { CURRENT_USER_ID } from '../db/seed.js'

const PROFILE_TABS = ['Posts', 'Replies', 'Highlights', 'Media', 'Likes']

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0)
  const [editOpen, setEditOpen] = useState(false)
  const navigate = useNavigate()

  const user = useCurrentUser()
  const myPosts = useUserPosts(CURRENT_USER_ID)

  if (!user) {
    return (
      <div style={{ padding: '32px 16px', textAlign: 'center', color: '#71767b' }}>
        Loading...
      </div>
    )
  }

  // Filter out replies for the Posts tab
  const topLevelPosts = myPosts ? myPosts.filter(p => !p.parentId) : []

  return (
    <div>
      {/* Header nav */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          borderBottom: '1px solid #2f3336',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#e7e9ea',
            cursor: 'pointer',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#16181c')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div style={{ fontWeight: '800', fontSize: '19px', color: '#e7e9ea', letterSpacing: '-0.02em' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '13px', color: '#71767b' }}>
            {topLevelPosts.length} posts
          </div>
        </div>
      </div>

      {/* Cover photo */}
      <div
        style={{
          height: '200px',
          background: user.bannerColor || 'linear-gradient(135deg, #312e81, #6366f1, #818cf8)',
          position: 'relative',
        }}
      />

      {/* Profile section */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        {/* Avatar */}
        <div
          style={{
            position: 'absolute',
            top: '-48px',
            border: '4px solid #000',
            borderRadius: '50%',
          }}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <Avatar initials={user.name?.[0] || 'J'} bg="#6366f1" size={80} />
          )}
        </div>

        {/* Edit button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '12px' }}>
          <button
            onClick={() => setEditOpen(true)}
            style={{
              background: 'transparent',
              color: '#e7e9ea',
              border: '1px solid #536471',
              borderRadius: '9999px',
              padding: '8px 18px',
              fontSize: '15px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            Edit profile
          </button>
        </div>

        {/* Name + handle */}
        <div style={{ marginTop: '48px', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#e7e9ea', letterSpacing: '-0.02em' }}>
              {user.name}
            </span>
          </div>
          <div style={{ fontSize: '15px', color: '#71767b', marginBottom: '12px' }}>
            @{user.handle}
          </div>

          {/* Bio */}
          {user.bio && (
            <p style={{ fontSize: '15px', color: '#e7e9ea', marginBottom: '12px', lineHeight: '20px' }}>
              {user.bio}
            </p>
          )}

          {/* Meta */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {[
              user.location && { icon: MapPin, text: user.location },
              user.website && { icon: Link, text: user.website, accent: true },
              user.joinedDate && { icon: Calendar, text: `Joined ${user.joinedDate}` },
            ].filter(Boolean).map(({ icon: Icon, text, accent }) => (
              <div
                key={text}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71767b', fontSize: '15px' }}
              >
                <Icon size={16} color="#71767b" />
                <span style={{ color: accent ? '#6366f1' : '#71767b' }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Followers row */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '4px' }}>
            {[
              { count: user.following, label: 'Following' },
              { count: user.followers, label: 'Followers' },
            ].map(({ count, label }) => (
              <button
                key={label}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'baseline',
                }}
              >
                <span style={{ fontWeight: '700', fontSize: '15px', color: '#e7e9ea' }}>
                  {(count ?? 0).toLocaleString()}
                </span>
                <span style={{ fontSize: '15px', color: '#71767b' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid #2f3336',
          position: 'sticky',
          top: '57px',
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 9,
        }}
      >
        {PROFILE_TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1,
              padding: '14px 4px',
              background: 'transparent',
              border: 'none',
              color: activeTab === i ? '#e7e9ea' : '#71767b',
              fontSize: '14px',
              fontWeight: activeTab === i ? '700' : '500',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')
            }
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            {tab}
            {activeTab === i && (
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

      {/* Posts */}
      {activeTab === 0 && !myPosts && (
        <div style={{ padding: '32px 16px', textAlign: 'center', color: '#71767b' }}>
          Loading...
        </div>
      )}
      {activeTab === 0 &&
        topLevelPosts.map((post) => <PostCard key={post.id} post={post} />)}

      {activeTab !== 0 && (
        <div
          style={{
            padding: '48px 32px',
            textAlign: 'center',
            color: '#71767b',
            fontSize: '15px',
          }}
        >
          Nothing here yet.
        </div>
      )}
    </div>
  )
}
