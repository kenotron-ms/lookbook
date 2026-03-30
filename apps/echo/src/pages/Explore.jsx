import { useState } from 'react'
import { Search, TrendingUp, X } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'
import { useFollow } from '../hooks/useFollow.js'
import PostCard from '../components/PostCard'

const CATEGORIES = ['For You', 'Trending', 'Tech & Science', 'Design', 'Entertainment']

const TRENDING_TOPICS = [
  { category: 'Developer', topic: '#BuildInPublic', posts: '9.7K posts' },
  { category: 'Technology', topic: '#AIFirst', posts: '142K posts' },
  { category: 'Tech', topic: '#ParaNet', posts: '4.2K posts' },
  { category: 'Design', topic: '#DesignMatters', posts: '28.4K posts' },
  { category: 'Developer Tools', topic: '#TypeScript', posts: '51.1K posts' },
]

/* ── Follow button (calls useFollow hook per user) ─────────── */
function FollowButton({ userId }) {
  const { following, toggleFollow } = useFollow(userId)
  return (
    <button
      onClick={e => {
        e.stopPropagation()
        toggleFollow()
      }}
      onMouseEnter={e => {
        if (following) {
          e.currentTarget.style.background = 'rgba(249,24,128,0.1)'
          e.currentTarget.style.color = 'var(--like)'
          e.currentTarget.style.borderColor = 'var(--like)'
          e.currentTarget.textContent = 'Unfollow'
        } else {
          e.currentTarget.style.background = 'rgba(255,255,255,0.9)'
        }
      }}
      onMouseLeave={e => {
        if (following) {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.color = 'var(--text-primary)'
          e.currentTarget.style.borderColor = 'var(--border)'
          e.currentTarget.textContent = 'Following'
        } else {
          e.currentTarget.style.background = 'var(--text-primary)'
          e.currentTarget.style.color = 'var(--bg)'
        }
      }}
      style={{
        background: following ? 'transparent' : 'var(--text-primary)',
        color: following ? 'var(--text-primary)' : 'var(--bg)',
        border: following ? '1px solid var(--border)' : '1px solid transparent',
        borderRadius: '9999px',
        padding: '6px 16px',
        fontSize: '15px',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s',
        flexShrink: 0,
        whiteSpace: 'nowrap',
      }}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  )
}

/* ── Verified badge ────────────────────────────────────────── */
function VerifiedBadge() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.043-.643-.096-1.287-.396-1.855-.3-.567-.74-1.045-1.275-1.382-.136-.883-.632-1.677-1.371-2.198-.74-.52-1.651-.726-2.542-.576-.33-.535-.795-.967-1.348-1.25-.553-.282-1.172-.406-1.792-.357-.619.05-1.207.279-1.7.659-.494.38-.875.888-1.096 1.471-.64.112-1.235.434-1.685.914-.45.48-.733 1.095-.808 1.749-.601.25-1.122.67-1.494 1.209-.372.539-.574 1.175-.58 1.827.006.652.208 1.288.58 1.827.372.54.893.96 1.494 1.209.075.654.358 1.269.808 1.749.45.48 1.045.802 1.685.914.221.583.602 1.091 1.096 1.471.493.38 1.081.609 1.7.659.62.05 1.239-.075 1.792-.357.553-.282 1.018-.715 1.348-1.25.891.15 1.802-.057 2.542-.577.739-.52 1.235-1.314 1.371-2.198.535-.337.975-.815 1.275-1.382.3-.568.439-1.212.396-1.854.586-.275 1.084-.706 1.439-1.246.354-.54.551-1.17.57-1.816zm-9.81 5.032l-3.817-3.818 1.178-1.178 2.639 2.639 5.485-5.485 1.178 1.178z"
        fill="#6366f1"
      />
    </svg>
  )
}

/* ── Trending row ──────────────────────────────────────────── */
function TrendingRow({ rank, topic }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: '12px 16px',
        cursor: 'pointer',
        background: hovered ? 'var(--bg-hover)' : 'transparent',
        transition: 'background 0.15s',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 2 }}>
          {rank} · {topic.category} · Trending
        </div>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>
          {topic.topic}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>
          {topic.posts}
        </div>
      </div>
      <TrendingUp size={18} color="var(--text-muted)" />
    </div>
  )
}

/* ── Compact user card for "You might like" ────────────────── */
function UserCard({ user }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/profile/${user.handle}`)}
      onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        cursor: 'pointer',
        transition: 'background 0.15s',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {user.name?.[0] || '?'}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--text-primary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.name}
          </span>
          {user.verified && <VerifiedBadge />}
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 2 }}>
          @{user.handle}
        </div>
        {user.bio && (
          <div
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user.bio}
          </div>
        )}
      </div>
      <FollowButton userId={user.id} />
    </div>
  )
}

/* ── Main Explore component ────────────────────────────────── */
export default function Explore() {
  const [searchVal, setSearchVal] = useState('')
  const [activeCategory, setActiveCategory] = useState(0)
  const [inputFocused, setInputFocused] = useState(false)

  // Suggested users (3 non-current-user)
  const suggestedUsers = useLiveQuery(
    () => db.users.filter(u => u.id !== CURRENT_USER_ID).limit(6).toArray(),
    [],
  )

  // Live search
  const searchResults = useLiveQuery(async () => {
    if (!searchVal.trim()) return null
    const q = searchVal.toLowerCase()
    const [users, posts] = await Promise.all([
      db.users.filter(u => u.name.toLowerCase().includes(q) || u.handle.toLowerCase().includes(q)).limit(5).toArray(),
      db.posts.filter(p => p.content.toLowerCase().includes(q)).limit(8).toArray(),
    ])
    return { users, posts }
  }, [searchVal])

  const isSearching = searchVal.trim().length > 0

  return (
    <div>
      {/* ── Sticky header ─────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.85)',
          backdropFilter: 'blur(12px)',
          borderBottom: isSearching ? '1px solid var(--border)' : 'none',
        }}
      >
        {/* Search bar */}
        <div style={{ padding: '8px 16px', position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: 30,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: inputFocused ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'color 0.15s',
            }}
          />
          <input
            value={searchVal}
            onChange={e => setSearchVal(e.target.value)}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            placeholder="Search Echo"
            style={{
              width: '100%',
              background: inputFocused ? 'var(--bg)' : 'var(--bg-input)',
              border: `1px solid ${inputFocused ? 'var(--accent)' : 'transparent'}`,
              borderRadius: '9999px',
              padding: '10px 40px 10px 44px',
              fontSize: '15px',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
              transition: 'background 0.15s, border-color 0.15s',
              boxSizing: 'border-box',
            }}
          />
          {searchVal && (
            <button
              onClick={() => setSearchVal('')}
              style={{
                position: 'absolute',
                right: 28,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--accent)',
                border: 'none',
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <X size={12} color="#fff" strokeWidth={3} />
            </button>
          )}
        </div>

        {/* Category tabs — hidden while searching */}
        {!isSearching && (
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              borderBottom: '1px solid var(--border)',
              scrollbarWidth: 'none',
            }}
          >
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(i)}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                style={{
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  color: activeCategory === i ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontSize: '15px',
                  fontWeight: activeCategory === i ? '700' : '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  transition: 'background 0.15s',
                }}
              >
                {cat}
                {activeCategory === i && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 40,
                      height: 4,
                      background: 'var(--accent)',
                      borderRadius: '9999px',
                    }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════ */}
      {/* SEARCH RESULTS                                          */}
      {/* ═══════════════════════════════════════════════════════ */}
      {isSearching && (
        <div>
          {searchResults === undefined ? (
            <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)' }}>
              Searching…
            </div>
          ) : searchResults.users.length === 0 && searchResults.posts.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '72px 32px',
                gap: 8,
                textAlign: 'center',
              }}
            >
              <Search size={40} color="var(--text-muted)" style={{ marginBottom: 4 }} />
              <p style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
                No results for &ldquo;{searchVal}&rdquo;
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
                Try different keywords or check the spelling.
              </p>
            </div>
          ) : (
            <>
              {/* People */}
              {searchResults.users.length > 0 && (
                <div>
                  <div
                    style={{
                      padding: '16px 16px 8px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      People
                    </span>
                  </div>
                  {searchResults.users.slice(0, 3).map(user => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>
              )}

              {/* Posts */}
              {searchResults.posts.length > 0 && (
                <div>
                  <div
                    style={{
                      padding: '16px 16px 8px',
                      borderBottom: '1px solid var(--border)',
                      borderTop: searchResults.users.length > 0 ? '8px solid var(--bg-secondary)' : 'none',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 20,
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      Posts
                    </span>
                  </div>
                  {searchResults.posts.slice(0, 6).map(post => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════ */}
      {/* NO-SEARCH STATE: Trending + You might like             */}
      {/* ═══════════════════════════════════════════════════════ */}
      {!isSearching && (
        <>
          {/* Trends for you */}
          <div
            style={{
              padding: '16px 16px 8px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <TrendingUp size={20} color="var(--accent)" />
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              Trends for you
            </span>
          </div>

          {TRENDING_TOPICS.map((t, i) => (
            <TrendingRow key={t.topic} rank={i + 1} topic={t} />
          ))}

          {/* Divider */}
          <div style={{ height: 8, background: 'var(--bg-secondary)', margin: '8px 0' }} />

          {/* You might like */}
          <div style={{ padding: '16px 16px 8px' }}>
            <span
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              You might like
            </span>
          </div>

          {suggestedUsers === undefined ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-secondary)', fontSize: 14 }}>
              Loading…
            </div>
          ) : (
            suggestedUsers.slice(0, 3).map(user => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </>
      )}
    </div>
  )
}
