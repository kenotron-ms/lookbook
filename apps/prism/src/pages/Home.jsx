import { useState } from 'react'
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Plus } from 'lucide-react'
import { POSTS, STORIES, CURRENT_USER } from '../data/posts'
import { Avatar } from '../components/LeftSidebar'

const ACCENT = '#f43f5e'
const BORDER = '#262626'
const SECONDARY = '#8e8e8e'

export default function Home() {
  return (
    <div style={{ padding: '0 24px', paddingTop: '8px' }}>
      <StoriesRow />
      <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: '8px' }} />
      <FeedPosts />
    </div>
  )
}

function StoriesRow() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        overflowX: 'auto',
        paddingTop: '16px',
        paddingBottom: '16px',
        scrollbarWidth: 'none',
      }}
    >
      {STORIES.map((s) => (
        <StoryCircle key={s.id} story={s} />
      ))}
    </div>
  )
}

function StoryCircle({ story }) {
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
      {/* Ring + circle */}
      <div
        style={{
          width: '58px',
          height: '58px',
          borderRadius: '50%',
          background: story.isOwn
            ? 'transparent'
            : `linear-gradient(45deg, ${ACCENT}, #fb923c, #8b5cf6)`,
          padding: story.isOwn ? '0' : '2px',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: story.isOwn ? '#262626' : '#000',
            padding: story.isOwn ? '0' : '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: story.isOwn ? '54px' : '50px',
              height: story.isOwn ? '54px' : '50px',
              borderRadius: '50%',
              background: story.bg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontWeight: '700',
              color: 'white',
            }}
          >
            {story.initials}
          </div>
        </div>

        {story.isOwn && (
          <div
            style={{
              position: 'absolute',
              bottom: '0px',
              right: '0px',
              width: '20px',
              height: '20px',
              background: ACCENT,
              borderRadius: '50%',
              border: '2px solid #000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Plus size={12} color="white" strokeWidth={3} />
          </div>
        )}
      </div>
      <span
        style={{
          fontSize: '12px',
          color: story.isOwn ? '#e7e9ea' : SECONDARY,
          maxWidth: '64px',
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}
      >
        {story.handle}
      </span>
    </div>
  )
}

function FeedPosts() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
      {POSTS.map((post) => (
        <FeedPost key={post.id} post={post} />
      ))}
    </div>
  )
}

function FeedPost({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [headerHovered, setHeaderHovered] = useState(false)

  return (
    <article style={{ borderBottom: `1px solid ${BORDER}`, paddingBottom: '4px', marginBottom: '4px', maxWidth: '468px' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '14px 4px',
          gap: '10px',
        }}
      >
        <Avatar initials={post.user.initials} bg={post.user.avatarBg} size={34} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#e7e9ea' }}>{post.user.handle}</div>
          {post.location && (
            <div style={{ fontSize: '12px', color: SECONDARY }}>{post.location}</div>
          )}
        </div>
        <div
          style={{ cursor: 'pointer', padding: '4px', color: SECONDARY }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#e7e9ea')}
          onMouseLeave={(e) => (e.currentTarget.style.color = SECONDARY)}
        >
          <MoreHorizontal size={20} />
        </div>
      </div>

      {/* Image */}
      <div
        style={{
          width: '100%',
          height: '400px',
          background: post.gradient,
          borderRadius: '4px',
        }}
      />

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 2px', gap: '4px' }}>
        {/* Left: Heart, Comment, Send */}
        <ActionButton onClick={() => setLiked(!liked)}>
          <Heart
            size={24}
            color={liked ? ACCENT : '#e7e9ea'}
            fill={liked ? ACCENT : 'none'}
            strokeWidth={liked ? 0 : 1.75}
          />
        </ActionButton>
        <ActionButton>
          <MessageCircle size={24} color="#e7e9ea" strokeWidth={1.75} />
        </ActionButton>
        <ActionButton>
          <Send size={24} color="#e7e9ea" strokeWidth={1.75} />
        </ActionButton>
        {/* Right: Bookmark */}
        <div style={{ flex: 1 }} />
        <ActionButton onClick={() => setSaved(!saved)}>
          <Bookmark
            size={24}
            color={saved ? '#e7e9ea' : '#e7e9ea'}
            fill={saved ? '#e7e9ea' : 'none'}
            strokeWidth={1.75}
          />
        </ActionButton>
      </div>

      {/* Likes */}
      <div style={{ padding: '0 2px 6px', fontSize: '14px', fontWeight: '600', color: '#e7e9ea' }}>
        {(post.likes + (liked ? 1 : 0)).toLocaleString()} likes
      </div>

      {/* Caption */}
      <div style={{ padding: '0 2px 4px', fontSize: '14px', lineHeight: '1.5' }}>
        <span style={{ fontWeight: '600', color: '#e7e9ea', marginRight: '6px' }}>{post.user.handle}</span>
        <span style={{ color: '#e7e9ea' }}>{post.caption}</span>
      </div>

      {/* Comments */}
      <div
        style={{ padding: '0 2px 4px', fontSize: '14px', color: SECONDARY, cursor: 'pointer' }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#e7e9ea')}
        onMouseLeave={(e) => (e.currentTarget.style.color = SECONDARY)}
      >
        View all {post.comments} comments
      </div>

      {/* Timestamp */}
      <div style={{ padding: '0 2px 8px', fontSize: '11px', color: SECONDARY, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {post.timestamp}
      </div>
    </article>
  )
}

function ActionButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        border: 'none',
        cursor: 'pointer',
        padding: '6px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: hovered ? '#1a1a1a' : 'transparent',
        transition: 'background 0.2s, transform 0.15s',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}
