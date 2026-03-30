import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  ChevronLeft, Heart, Repeat2, Bookmark, Share,
  MessageCircle, BarChart2,
} from 'lucide-react'
import db from '../db/index.js'
import { useLike } from '../hooks/useLike.js'
import { useEcho } from '../hooks/useEcho.js'
import { useBookmark } from '../hooks/useBookmark.js'
import PostCard from '../components/PostCard'
import PostComposer from '../components/PostComposer'

const fmtCount = n =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  : String(n)

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
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        color,
        padding: '0',
        fontSize: '15px',
        fontWeight: active ? '700' : '400',
        transition: 'color 0.2s',
      }}
    >
      <span
        style={{
          width: 42,
          height: 42,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: hovered ? hoverBg : 'transparent',
          transition: 'background 0.2s',
        }}
      >
        <Icon
          size={22}
          strokeWidth={1.75}
          fill={fillWhenActive && active ? color : 'none'}
          color={color}
        />
      </span>
      {count !== undefined && <span>{fmtCount(count)}</span>}
    </button>
  )
}

export default function PostDetail() {
  const { postId } = useParams()
  const navigate = useNavigate()

  // Wrap result so we can distinguish "loading" (undefined) from "not found" (null)
  const postQuery = useLiveQuery(
    async () => {
      const found = await db.posts.get(Number(postId))
      return found ?? null
    },
    [postId],
  )

  const post = postQuery === null ? null : postQuery // undefined while loading, null=not found, object=found

  const author = useLiveQuery(
    () => (post ? db.users.get(post.userId) : undefined),
    [post?.userId],
  )

  const parentPost = useLiveQuery(
    () => (post?.parentId ? db.posts.get(post.parentId) : undefined),
    [post?.parentId],
  )

  const parentAuthor = useLiveQuery(
    () => (parentPost ? db.users.get(parentPost.userId) : undefined),
    [parentPost?.userId],
  )

  const replies = useLiveQuery(
    () => db.posts.where('parentId').equals(Number(postId)).sortBy('timestamp'),
    [postId],
  )

  // Hooks must be called unconditionally — use safe fallback id
  const safeId = post?.id ?? -1
  const { liked, toggleLike } = useLike(safeId)
  const { echoed, toggleEcho } = useEcho(safeId)
  const { bookmarked, toggleBookmark } = useBookmark(safeId)

  /* ── Loading state ──────────────────────────────────────── */
  if (postQuery === undefined) {
    return (
      <div style={{ padding: 48, color: 'var(--text-secondary)', textAlign: 'center' }}>
        Loading…
      </div>
    )
  }

  /* ── Not found ──────────────────────────────────────────── */
  if (post === null) {
    return (
      <div>
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            height: 53,
          }}
        >
          <button
            onClick={() => navigate(-1)}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              borderRadius: '50%',
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Post</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px 32px',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 52 }}>🔍</span>
          <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            Post not found
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0, textAlign: 'center' }}>
            This post may have been deleted or the link is incorrect.
          </p>
        </div>
      </div>
    )
  }

  const fullTime = new Date(post.timestamp).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div>
      {/* ── Sticky header ──────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          height: 53,
        }}
      >
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: 34,
            height: 34,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s',
          }}
        >
          <ChevronLeft size={20} />
        </button>
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Post</span>
      </div>

      {/* ── "Replying to" context ───────────────────────────── */}
      {post.parentId && parentAuthor && (
        <div style={{ padding: '12px 16px 0', fontSize: 14, color: 'var(--text-muted)' }}>
          Replying to{' '}
          <Link
            to={`/profile/${parentAuthor.handle}`}
            style={{ color: 'var(--accent)', textDecoration: 'none' }}
          >
            @{parentAuthor.handle}
          </Link>
        </div>
      )}

      {/* ── Main post (large view) ─────────────────────────── */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          {author?.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
          ) : (
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              {author?.name?.[0] || '?'}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              <Link
                to={`/profile/${author?.handle}`}
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
              >
                {author?.name ?? '…'}
              </Link>
              {author?.verified && <VerifiedBadge />}
            </div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
              @{author?.handle ?? '…'}
            </div>
          </div>
        </div>

        {/* Post content */}
        <p
          style={{
            fontSize: 17,
            lineHeight: '26px',
            color: 'var(--text-primary)',
            marginBottom: 16,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {post.content}
        </p>

        {/* Media */}
        {post.mediaUrl && (
          <img
            src={post.mediaUrl}
            alt=""
            style={{
              width: '100%',
              borderRadius: 16,
              marginBottom: 16,
              maxHeight: 480,
              objectFit: 'cover',
            }}
          />
        )}

        {/* Full timestamp */}
        <div
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
            paddingBottom: 12,
            borderBottom: '1px solid var(--border)',
          }}
        >
          {fullTime}
        </div>

        {/* Stats row */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            padding: '12px 0',
            borderBottom: '1px solid var(--border)',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>
            <strong>{fmtCount(post.likes)}</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Likes</span>
          </span>
          <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>
            <strong>{fmtCount(post.echoes)}</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Reposts</span>
          </span>
          <span style={{ fontSize: 15, color: 'var(--text-primary)' }}>
            <strong>{fmtCount(post.views)}</strong>{' '}
            <span style={{ color: 'var(--text-secondary)' }}>Views</span>
          </span>
        </div>

        {/* Action bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '4px 0',
            borderBottom: '1px solid var(--border)',
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
            count={post.echoes}
            active={echoed}
            activeColor="var(--echo-color)"
            hoverColor="var(--echo-color)"
            hoverBg="rgba(0,186,124,0.1)"
            onClick={e => {
              e.stopPropagation()
              toggleEcho()
            }}
          />
          <ActionBtn
            icon={Heart}
            count={post.likes}
            active={liked}
            activeColor="var(--like)"
            hoverColor="var(--like)"
            hoverBg="rgba(249,24,128,0.1)"
            onClick={e => {
              e.stopPropagation()
              toggleLike()
            }}
            fillWhenActive
          />
          <ActionBtn
            icon={BarChart2}
            count={post.views}
            hoverColor="#1d9bf0"
            hoverBg="rgba(29,155,240,0.1)"
          />
          <ActionBtn
            icon={Bookmark}
            active={bookmarked}
            activeColor="var(--accent)"
            hoverColor="var(--accent)"
            hoverBg="rgba(99,102,241,0.1)"
            onClick={e => {
              e.stopPropagation()
              toggleBookmark()
            }}
          />
          <ActionBtn icon={Share} hoverColor="#1d9bf0" hoverBg="rgba(29,155,240,0.1)" />
        </div>
      </div>

      {/* ── Reply composer ──────────────────────────────────── */}
      <PostComposer placeholder="Post your reply" />

      {/* ── Replies divider ─────────────────────────────────── */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-primary)' }}>
          Replies
        </span>
      </div>

      {/* ── Replies list ────────────────────────────────────── */}
      {replies === undefined ? (
        <div style={{ padding: 32, textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading replies…
        </div>
      ) : replies.length === 0 ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '48px 32px',
            gap: 8,
          }}
        >
          <MessageCircle
            size={40}
            color="var(--text-muted)"
            style={{ marginBottom: 4 }}
          />
          <p
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            No replies yet.
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
            Be the first to reply.
          </p>
        </div>
      ) : (
        replies.map(r => <PostCard key={r.id} post={r} />)
      )}
    </div>
  )
}
