import { useState } from 'react'
import { Heart, MessageCircle, Send, MoreHorizontal, Music } from 'lucide-react'
import { REELS } from '../data/posts'
import { Avatar } from '../components/LeftSidebar'

const ACCENT = '#f43f5e'
const SECONDARY = '#8e8e8e'

export default function Reels() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        padding: '24px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        {REELS.map((reel) => (
          <ReelCard key={reel.id} reel={reel} />
        ))}
      </div>
    </div>
  )
}

function ReelCard({ reel }) {
  const [liked, setLiked] = useState(false)

  return (
    <div
      style={{
        width: '100%',
        height: '700px',
        background: reel.gradient,
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: '24px',
        flexShrink: 0,
      }}
    >
      {/* Bottom overlay */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 60px 24px 16px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
        }}
      >
        {/* User row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <Avatar initials={reel.user.initials} bg={reel.user.avatarBg} size={36} />
          <span style={{ fontWeight: '600', fontSize: '14px', color: 'white' }}>
            {reel.user.handle}
          </span>
          <FollowButton />
        </div>

        {/* Caption */}
        <div style={{ fontSize: '14px', color: 'white', marginBottom: '10px', lineHeight: '1.4' }}>
          {reel.caption}
        </div>

        {/* Track */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
          <Music size={14} />
          <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {reel.track}
          </span>
        </div>
      </div>

      {/* Right side buttons */}
      <div
        style={{
          position: 'absolute',
          right: '12px',
          bottom: '80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <ReelButton onClick={() => setLiked(!liked)}>
          <Heart
            size={28}
            color={liked ? ACCENT : 'white'}
            fill={liked ? ACCENT : 'none'}
            strokeWidth={liked ? 0 : 1.75}
          />
          <span style={{ fontSize: '12px', color: 'white', fontWeight: '600' }}>
            {(reel.likes + (liked ? 1 : 0)).toLocaleString()}
          </span>
        </ReelButton>

        <ReelButton>
          <MessageCircle size={28} color="white" strokeWidth={1.75} />
          <span style={{ fontSize: '12px', color: 'white', fontWeight: '600' }}>
            {reel.comments.toLocaleString()}
          </span>
        </ReelButton>

        <ReelButton>
          <Send size={28} color="white" strokeWidth={1.75} />
        </ReelButton>

        <ReelButton>
          <MoreHorizontal size={28} color="white" strokeWidth={1.75} />
        </ReelButton>
      </div>
    </div>
  )
}

function FollowButton() {
  const [following, setFollowing] = useState(false)
  return (
    <button
      onClick={() => setFollowing(!following)}
      style={{
        padding: '4px 14px',
        background: following ? 'transparent' : 'transparent',
        color: 'white',
        border: '1px solid white',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

function ReelButton({ onClick, children }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      style={{
        background: hovered ? 'rgba(255,255,255,0.15)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        padding: '8px',
        borderRadius: '50%',
        transition: 'background 0.15s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  )
}
