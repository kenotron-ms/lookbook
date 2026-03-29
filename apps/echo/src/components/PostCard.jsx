import { useState } from 'react'
import { MessageCircle, Repeat2, Heart, BarChart2, Bookmark, Share, MoreHorizontal } from 'lucide-react'
import { Avatar } from './LeftSidebar'

function formatCount(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
  return n.toString()
}

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(post.liked)
  const [likeCount, setLikeCount] = useState(post.likes)
  const [echoed, setEchoed] = useState(post.echoed)
  const [echoCount, setEchoCount] = useState(post.echoes)
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false)
  const [hovered, setHovered] = useState(false)

  const handleLike = (e) => {
    e.stopPropagation()
    setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    setLiked(!liked)
  }

  const handleEcho = (e) => {
    e.stopPropagation()
    setEchoCount(echoed ? echoCount - 1 : echoCount + 1)
    setEchoed(!echoed)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    setBookmarked(!bookmarked)
  }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid #2f3336',
        background: hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0, paddingTop: '2px' }}>
        <Avatar
          initials={post.user.initials}
          bg={post.user.avatarBg}
          size={48}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '4px',
            marginBottom: '2px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              minWidth: 0,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontWeight: '700',
                fontSize: '15px',
                color: '#e7e9ea',
                whiteSpace: 'nowrap',
              }}
            >
              {post.user.name}
            </span>
            {post.user.verified && <VerifiedBadge />}
            <span style={{ fontSize: '15px', color: '#71767b', whiteSpace: 'nowrap' }}>
              @{post.user.handle}
            </span>
            <span style={{ color: '#71767b', fontSize: '15px' }}>·</span>
            <span style={{ fontSize: '15px', color: '#71767b', whiteSpace: 'nowrap' }}>
              {post.timestamp}
            </span>
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#71767b',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(29,155,240,0.1)'
              e.currentTarget.style.color = '#1d9bf0'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#71767b'
            }}
          >
            <MoreHorizontal size={18} />
          </button>
        </div>

        {/* Post text */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: '20px',
            color: '#e7e9ea',
            marginBottom: '12px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {post.content}
        </p>

        {/* Action row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: '430px',
            marginLeft: '-8px',
          }}
        >
          <ActionBtn
            icon={MessageCircle}
            count={post.replies}
            hoverColor="#1d9bf0"
            hoverBg="rgba(29,155,240,0.1)"
          />
          <ActionBtn
            icon={Repeat2}
            count={echoCount}
            active={echoed}
            activeColor="#00ba7c"
            hoverColor="#00ba7c"
            hoverBg="rgba(0,186,124,0.1)"
            onClick={handleEcho}
          />
          <ActionBtn
            icon={Heart}
            count={likeCount}
            active={liked}
            activeColor="#f91880"
            hoverColor="#f91880"
            hoverBg="rgba(249,24,128,0.1)"
            onClick={handleLike}
            fillWhenActive
          />
          <ActionBtn
            icon={BarChart2}
            count={post.views}
            hoverColor="#1d9bf0"
            hoverBg="rgba(29,155,240,0.1)"
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            <ActionBtn
              icon={Bookmark}
              active={bookmarked}
              activeColor="#6366f1"
              hoverColor="#6366f1"
              hoverBg="rgba(99,102,241,0.1)"
              onClick={handleBookmark}
            />
            <ActionBtn
              icon={Share}
              hoverColor="#1d9bf0"
              hoverBg="rgba(29,155,240,0.1)"
            />
          </div>
        </div>
      </div>
    </article>
  )
}

function ActionBtn({
  icon: Icon,
  count,
  active,
  activeColor,
  hoverColor,
  hoverBg,
  onClick,
  fillWhenActive,
}) {
  const [hovered, setHovered] = useState(false)

  const color = active ? activeColor : hovered ? hoverColor : '#71767b'

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color,
        padding: '0',
        fontSize: '13px',
        fontWeight: active ? '700' : '400',
        transition: 'color 0.2s',
      }}
    >
      <span
        style={{
          width: '34px',
          height: '34px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: hovered ? hoverBg : 'transparent',
          transition: 'background 0.2s',
        }}
      >
        <Icon
          size={18}
          strokeWidth={1.75}
          fill={fillWhenActive && active ? color : 'none'}
          color={color}
        />
      </span>
      {count !== undefined && (
        <span style={{ minWidth: '16px' }}>{formatCount(count)}</span>
      )}
    </button>
  )
}

function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.043-.643-.096-1.287-.396-1.855-.3-.567-.74-1.045-1.275-1.382-.136-.883-.632-1.677-1.371-2.198-.74-.52-1.651-.726-2.542-.576-.33-.535-.795-.967-1.348-1.25-.553-.282-1.172-.406-1.792-.357-.619.05-1.207.279-1.7.659-.494.38-.875.888-1.096 1.471-.64.112-1.235.434-1.685.914-.45.48-.733 1.095-.808 1.749-.601.25-1.122.67-1.494 1.209-.372.539-.574 1.175-.58 1.827.006.652.208 1.288.58 1.827.372.54.893.96 1.494 1.209.075.654.358 1.269.808 1.749.45.48 1.045.802 1.685.914.221.583.602 1.091 1.096 1.471.493.38 1.081.609 1.7.659.62.05 1.239-.075 1.792-.357.553-.282 1.018-.715 1.348-1.25.891.15 1.802-.057 2.542-.577.739-.52 1.235-1.314 1.371-2.198.535-.337.975-.815 1.275-1.382.3-.568.439-1.212.396-1.854.586-.275 1.084-.706 1.439-1.246.354-.54.551-1.17.57-1.816zm-9.81 5.032l-3.817-3.818 1.178-1.178 2.639 2.639 5.485-5.485 1.178 1.178z"
        fill="#6366f1"
      />
    </svg>
  )
}
