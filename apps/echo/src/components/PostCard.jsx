import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, Repeat2, Heart, BarChart2, Bookmark, Share, MoreHorizontal } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'
import { useLike } from '../hooks/useLike.js'
import { useEcho } from '../hooks/useEcho.js'
import { useBookmark } from '../hooks/useBookmark.js'
import { useToast } from '../context/ToastContext.jsx'
import { useCompose } from '../context/ComposeContext.jsx'

const fmtCount = n =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  : String(n)

function formatTime(timestamp) {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60_000)
  const hours = Math.floor(diff / 3_600_000)
  const days = Math.floor(diff / 86_400_000)
  if (minutes < 1) return 'now'
  if (hours < 1) return `${minutes}m`
  if (days < 1) return `${hours}h`
  if (days < 30) return `${days}d`
  return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function DropdownItem({ label, color, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'block',
        width: '100%',
        padding: '12px 16px',
        background: 'none',
        border: 'none',
        textAlign: 'left',
        color: color || 'var(--text-primary)',
        cursor: 'pointer',
        fontSize: 15,
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
      onMouseLeave={e => e.currentTarget.style.background = 'none'}
    >
      {label}
    </button>
  )
}

export default function PostCard({ post }) {
  const [hovered, setHovered] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { openCompose } = useCompose()

  // Live post data so counts stay in sync
  const livePost = useLiveQuery(() => db.posts.get(post.id), [post.id]) ?? post
  const author = useLiveQuery(() => db.users.get(post.userId), [post.userId])

  const { liked, toggleLike } = useLike(post.id)
  const { echoed, toggleEcho } = useEcho(post.id)
  const { bookmarked, toggleBookmark } = useBookmark(post.id)

  const handleLike     = (e) => { e.stopPropagation(); toggleLike() }
  const handleEcho     = (e) => { e.stopPropagation(); toggleEcho() }
  const handleBookmark = (e) => { e.stopPropagation(); toggleBookmark() }
  const handleReply    = (e) => { e.stopPropagation(); openCompose(livePost) }
  const handleShare    = (e) => { e.stopPropagation(); addToast('Link copied to clipboard', 'info') }

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowMore(false) }}
      onClick={() => navigate(`/post/${post.id}`)}
      style={{
        display: 'flex',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border)',
        background: hovered ? 'var(--bg-hover)' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      {/* Avatar */}
      <div style={{ flexShrink: 0, paddingTop: '2px' }} onClick={e => e.stopPropagation()}>
        {author?.avatar ? (
          <img
            src={author.avatar}
            alt={author.name}
            style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            width: 48, height: 48, borderRadius: '50%', background: 'var(--accent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 16,
          }}>
            {author?.name?.[0] || '?'}
          </div>
        )}
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
            <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
              {author?.name ?? '…'}
            </span>
            {author?.verified && <VerifiedBadge />}
            <span style={{ fontSize: '15px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              @{author?.handle ?? '…'}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>·</span>
            <span style={{ fontSize: '15px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              {formatTime(livePost.timestamp)}
            </span>
          </div>

          {/* MoreHorizontal with dropdown */}
          <div style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setShowMore(v => !v) }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '34px',
                height: '34px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(29,155,240,0.1)'
                e.currentTarget.style.color = '#1d9bf0'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--text-secondary)'
              }}
            >
              <MoreHorizontal size={18} />
            </button>

            {showMore && (
              <div
                style={{
                  position: 'absolute',
                  top: 34,
                  right: 0,
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '4px 0',
                  zIndex: 100,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                }}
                onClick={e => e.stopPropagation()}
              >
                {livePost.userId === CURRENT_USER_ID ? (
                  <>
                    <DropdownItem
                      label="Delete post"
                      color="var(--danger)"
                      onClick={async () => {
                        await db.posts.delete(post.id)
                        setShowMore(false)
                        addToast('Post deleted', 'error')
                      }}
                    />
                    <DropdownItem label="Pin to profile" onClick={() => setShowMore(false)} />
                  </>
                ) : (
                  <>
                    <DropdownItem label="Not interested in this post" onClick={() => setShowMore(false)} />
                    <DropdownItem label={`Follow @${author?.handle}`} onClick={() => setShowMore(false)} />
                    <DropdownItem label="Block" color="var(--danger)" onClick={() => setShowMore(false)} />
                    <DropdownItem label="Report post" color="var(--danger)" onClick={() => setShowMore(false)} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post text */}
        <p
          style={{
            fontSize: '15px',
            lineHeight: '20px',
            color: 'var(--text-primary)',
            marginBottom: '12px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {livePost.content}
        </p>

        {/* Media */}
        {livePost.mediaUrl && (
          <img
            src={livePost.mediaUrl}
            alt=""
            style={{
              width: '100%',
              borderRadius: '16px',
              marginBottom: '12px',
              maxHeight: '400px',
              objectFit: 'cover',
            }}
          />
        )}

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
            count={livePost.replies}
            hoverColor="#1d9bf0"
            hoverBg="rgba(29,155,240,0.1)"
            onClick={handleReply}
          />
          <ActionBtn
            icon={Repeat2}
            count={livePost.echoes}
            active={echoed}
            activeColor="var(--echo-color)"
            hoverColor="var(--echo-color)"
            hoverBg="rgba(0,186,124,0.1)"
            onClick={handleEcho}
          />
          <ActionBtn
            icon={Heart}
            count={livePost.likes}
            active={liked}
            activeColor="var(--like)"
            hoverColor="var(--like)"
            hoverBg="rgba(249,24,128,0.1)"
            onClick={handleLike}
            fillWhenActive
          />
          <ActionBtn
            icon={BarChart2}
            count={livePost.views}
            hoverColor="#1d9bf0"
            hoverBg="rgba(29,155,240,0.1)"
            onClick={e => e.stopPropagation()}
          />
          <div style={{ display: 'flex', gap: '4px' }}>
            <ActionBtn
              icon={Bookmark}
              active={bookmarked}
              activeColor="var(--accent)"
              hoverColor="var(--accent)"
              hoverBg="var(--accent-subtle)"
              onClick={handleBookmark}
            />
            <ActionBtn
              icon={Share}
              hoverColor="#1d9bf0"
              hoverBg="rgba(29,155,240,0.1)"
              onClick={handleShare}
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

  const color = active ? activeColor : hovered ? hoverColor : 'var(--text-secondary)'

  return (
    <button
      onClick={onClick ?? (e => e.stopPropagation())}
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
        <span style={{ minWidth: '16px' }}>{fmtCount(count)}</span>
      )}
    </button>
  )
}

function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.043-.643-.096-1.287-.396-1.855-.3-.567-.74-1.045-1.275-1.382-.136-.883-.632-1.677-1.371-2.198-.74-.52-1.651-.726-2.542-.576-.33-.535-.795-.967-1.348-1.25-.553-.282-1.172-.406-1.792-.357-.619.05-1.207.279-1.7.659-.494.38-.875.888-1.096 1.471-.64.112-1.235.434-1.685.914-.45.48-.733 1.095-.808 1.749-.601.25-1.122.67-1.494 1.209-.372.539-.574 1.175-.58 1.827.006.652.208 1.288.58 1.827.372.54.893.96 1.494 1.209.075.654.358 1.269.808 1.749.45.48 1.045.802 1.685.914.221.583.602 1.091 1.096 1.471.493.38 1.081.609 1.7.659.62.05 1.239-.075 1.792-.357.553-.282 1.018-.715 1.348-1.25.891.15 1.802-.057 2.542-.577.739-.52 1.235-1.314 1.371-2.198.535-.337.975-.815 1.275-1.382.3-.568.439-1.212.396-1.854.586-.275 1.084-.706 1.439-1.246.354-.54.551-1.17.57-1.816zm-9.81 5.032l-3.817-3.818 1.178-1.178 2.639 2.639 5.485-5.485 1.178 1.178z"
        fill="var(--verified)"
      />
    </svg>
  )
}
