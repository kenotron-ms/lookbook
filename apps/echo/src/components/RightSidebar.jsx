import { useState, useRef } from 'react'
import { Search, RefreshCw } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'
import { useFollow } from '../hooks/useFollow.js'
import { useToast } from '../context/ToastContext.jsx'

// ── helpers ───────────────────────────────────────────────────────────────────
const fmtCount = n =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  : String(n)

// ── Trending data ─────────────────────────────────────────────────────────────
const TRENDING = [
  { category: 'Developer · Trending', topic: '#BuildInPublic', posts: '12.4K' },
  { category: 'Technology · Trending', topic: '#AIFirst',       posts: '89K'   },
  { category: 'Startup · Trending',   topic: '#ParaNet',        posts: '234K'  },
  { category: 'Developer Tools',      topic: '#TypeScript',     posts: '156K'  },
  { category: 'Design · Trending',    topic: '#DesignMatters',  posts: '41K'   },
]

// ── Verified badge (small) ────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="var(--accent)" style={{ flexShrink: 0 }}>
      <path
        d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Section wrapper ───────────────────────────────────────────────────────────
function Section({ title, titleExtra, children }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', borderRadius: 16,
      marginBottom: 16, overflow: 'hidden',
    }}>
      <div style={{
        padding: '16px 16px 4px', fontSize: 19, fontWeight: 800,
        color: 'var(--text-primary)', letterSpacing: '-0.02em',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{title}</span>
        {titleExtra}
      </div>
      {children}
    </div>
  )
}

// ── Show more link ────────────────────────────────────────────────────────────
function ShowMore({ to = '#' }) {
  return (
    <div style={{ padding: '12px 16px' }}>
      <Link
        to={to}
        style={{ color: 'var(--accent)', fontSize: 15, textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
      >
        Show more
      </Link>
    </div>
  )
}

// ── Trending item ─────────────────────────────────────────────────────────────
function TrendingItem({ category, topic, posts }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '10px 16px', cursor: 'pointer',
        background: hovered ? 'var(--bg-hover)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 1 }}>{category}</div>
      <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 1 }}>{topic}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{posts} posts</div>
    </div>
  )
}

// ── Suggestion row — each one isolated so useFollow works per-user ─────────────
function SuggestionRow({ user }) {
  const navigate = useNavigate()
  const { following, toggleFollow } = useFollow(user.id)
  const { addToast } = useToast()
  const [hovered, setHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)

  const isFollowing = !!following

  async function handleFollow(e) {
    e.stopPropagation()
    await toggleFollow()
    addToast(isFollowing ? `Unfollowed @${user.handle}` : `Following @${user.handle}`, isFollowing ? 'info' : 'success')
  }

  function goToProfile(e) {
    e.stopPropagation()
    navigate(`/profile/${user.handle}`)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 16px', cursor: 'pointer',
        background: hovered ? 'var(--bg-hover)' : 'transparent',
        transition: 'background 0.15s',
      }}
      onClick={goToProfile}
    >
      {/* Avatar */}
      <div onClick={goToProfile} style={{ flexShrink: 0 }}>
        {user.avatar
          ? <img src={user.avatar} alt={user.name} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
          : (
            <div style={{
              width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 15, fontWeight: 700, color: '#fff',
            }}>
              {user.name?.[0]}
            </div>
          )
        }
      </div>

      {/* Name + handle */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <span style={{
            fontWeight: 700, fontSize: 14, color: 'var(--text-primary)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {user.name}
          </span>
          {user.verified && <VerifiedBadge />}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          @{user.handle}
        </div>
      </div>

      {/* Follow button */}
      <button
        onClick={handleFollow}
        onMouseEnter={() => setBtnHovered(true)}
        onMouseLeave={() => setBtnHovered(false)}
        style={{
          background: isFollowing ? 'transparent' : 'var(--text-primary)',
          color: isFollowing ? (btnHovered ? '#f4212e' : 'var(--text-primary)') : 'var(--bg)',
          border: isFollowing ? `1px solid ${btnHovered ? '#f4212e' : 'var(--border)'}` : '1px solid transparent',
          borderRadius: 9999, padding: '5px 14px',
          fontSize: 13, fontWeight: 700, cursor: 'pointer',
          flexShrink: 0, transition: 'all 0.2s', whiteSpace: 'nowrap',
        }}
      >
        {isFollowing ? (btnHovered ? 'Unfollow' : 'Following') : 'Follow'}
      </button>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RightSidebar() {
  const navigate = useNavigate()
  const [searchVal, setSearchVal] = useState('')
  const inputRef = useRef(null)

  // Fetch suggestions: users current user doesn't follow yet
  const suggestions = useLiveQuery(async () => {
    const follows = await db.follows.where('followerId').equals(CURRENT_USER_ID).toArray()
    const followingIds = new Set(follows.map(f => f.followingId))
    followingIds.add(CURRENT_USER_ID)
    const allUsers = await db.users.toArray()
    return allUsers.filter(u => !followingIds.has(u.id)).slice(0, 4)
  })

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter' && searchVal.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchVal.trim())}`)
    }
  }

  function handleSearchClick() {
    navigate('/explore')
  }

  return (
    <aside style={{
      width: 350, paddingLeft: 24, position: 'sticky',
      top: 0, height: '100vh', overflowY: 'auto', paddingTop: 12,
      scrollbarWidth: 'none',
    }}>
      {/* ── Search bar ── */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search
          size={18}
          color="var(--text-muted)"
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          ref={inputRef}
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          onClick={handleSearchClick}
          placeholder="Search Echo"
          style={{
            width: '100%', boxSizing: 'border-box',
            background: 'var(--bg-input)', border: '1px solid transparent',
            borderRadius: 9999, padding: '10px 16px 10px 44px',
            fontSize: 15, color: 'var(--text-primary)',
            outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.2s, background 0.2s', cursor: 'text',
          }}
          onFocus={e => { e.target.style.background = 'var(--bg)'; e.target.style.borderColor = 'var(--accent)' }}
          onBlur={e => { e.target.style.background = 'var(--bg-input)'; e.target.style.borderColor = 'transparent' }}
        />
      </div>

      {/* ── Subscribe to Premium card ── */}
      <div style={{
        background: 'linear-gradient(135deg, #312e81 0%, #6366f1 60%, #818cf8 100%)',
        borderRadius: 16, padding: '20px 16px', marginBottom: 16,
      }}>
        <div style={{ fontWeight: 800, fontSize: 18, color: '#fff', marginBottom: 6, letterSpacing: '-0.01em' }}>
          Get the full Echo experience
        </div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', marginBottom: 14, lineHeight: '1.4' }}>
          Unlock longer posts, edit history, priority replies, and more.
        </div>
        <button
          style={{
            background: '#fff', color: '#6366f1',
            border: 'none', borderRadius: 9999,
            padding: '8px 20px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Subscribe to Premium
        </button>
      </div>

      {/* ── Trends for you ── */}
      <Section
        title="Trends for you"
        titleExtra={
          <button
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 4, borderRadius: '50%' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.background = 'var(--accent-subtle)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'none' }}
          >
            <RefreshCw size={16} />
          </button>
        }
      >
        {TRENDING.map((t, i) => <TrendingItem key={i} {...t} />)}
        <ShowMore to="/explore" />
      </Section>

      {/* ── Who to follow ── */}
      <Section title="Who to follow">
        {!suggestions && (
          <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: 14 }}>Loading…</div>
        )}
        {suggestions && suggestions.length === 0 && (
          <div style={{ padding: '16px', color: 'var(--text-muted)', fontSize: 14 }}>You're following everyone!</div>
        )}
        {suggestions && suggestions.map(u => <SuggestionRow key={u.id} user={u} />)}
        <ShowMore to="/explore" />
      </Section>

      {/* ── Footer ── */}
      <div style={{ padding: '8px 4px 32px', fontSize: 13, color: 'var(--text-muted)', lineHeight: '22px' }}>
        {['Terms', 'Privacy', 'Cookie', 'Accessibility', 'More'].map(l => (
          <a
            key={l}
            href="#"
            style={{ marginRight: 10, color: 'var(--text-muted)', textDecoration: 'none' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            {l}
          </a>
        ))}
        <div style={{ marginTop: 2 }}>© 2026 Echo Corp</div>
      </div>
    </aside>
  )
}
