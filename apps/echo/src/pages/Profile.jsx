import { useState } from 'react'
import { ChevronLeft, MapPin, Link as LinkIcon, Calendar, Image, Heart, MessageCircle, RefreshCw } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import PostCard from '../components/PostCard'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'
import { useFollow } from '../hooks/useFollow.js'
import { useToast } from '../context/ToastContext.jsx'

// ── helpers ───────────────────────────────────────────────────────────────────
const fmtCount = n =>
  n >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
  : n >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
  : String(n)

const fmtTime = ts => {
  const d = Date.now() - ts, m = Math.floor(d / 6e4), h = Math.floor(d / 36e5), dy = Math.floor(d / 864e5)
  if (m < 1) return 'now'; if (h < 1) return `${m}m`; if (dy < 1) return `${h}h`
  if (dy < 30) return `${dy}d`; return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const TABS = ['Posts', 'Replies', 'Media', 'Likes']

// ── Verified badge ────────────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)">
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

// ── Loading skeleton ──────────────────────────────────────────────────────────
function ProfileSkeleton() {
  const bar = (w, h, radius = 6, mt = 0) => (
    <div style={{
      width: w, height: h, borderRadius: radius,
      background: 'var(--bg-hover)', marginTop: mt,
      animation: 'pulse 1.5s ease-in-out infinite',
    }} />
  )
  return (
    <div>
      {/* header */}
      <div style={{ height: 53, background: 'rgba(0,0,0,0.8)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg-hover)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bar(120, 14)}
          {bar(60, 11)}
        </div>
      </div>
      {/* banner */}
      <div style={{ height: 200, background: 'var(--bg-hover)' }} />
      {/* profile row */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: -40, left: 16, width: 80, height: 80, borderRadius: '50%', border: '4px solid var(--bg)', background: 'var(--bg-secondary)' }} />
        <div style={{ height: 40, display: 'flex', justifyContent: 'flex-end', paddingTop: 12 }}>
          {bar(120, 36, 9999)}
        </div>
        <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {bar(160, 20)}
          {bar(100, 14)}
          {bar(240, 14)}
          {bar(180, 14)}
        </div>
      </div>
    </div>
  )
}

// ── Edit Profile Modal ────────────────────────────────────────────────────────
function EditProfileModal({ user, onClose }) {
  const { addToast } = useToast()
  const [name, setName] = useState(user.name || '')
  const [bio, setBio] = useState(user.bio || '')
  const [location, setLocation] = useState(user.location || '')
  const [website, setWebsite] = useState(user.website || '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await db.users.put({ ...user, name, bio, location, website })
    setSaving(false)
    onClose()
    addToast('Profile updated', 'success')
  }

  const inputStyle = {
    width: '100%', boxSizing: 'border-box',
    background: 'var(--bg-input)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '10px 14px',
    fontSize: 15, color: 'var(--text-primary)',
    outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  }

  const labelStyle = { fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4, display: 'block' }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg)', borderRadius: 16, width: '100%', maxWidth: 560,
          maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Modal header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 16px', borderBottom: '1px solid var(--border)',
          position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 1,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', width: 34, height: 34, borderRadius: '50%', justifyContent: 'center' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              ✕
            </button>
            <span style={{ fontWeight: 700, fontSize: 19 }}>Edit profile</span>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              background: 'var(--text-primary)', color: 'var(--bg)',
              border: 'none', borderRadius: 9999, padding: '6px 18px',
              fontSize: 15, fontWeight: 700, cursor: saving ? 'default' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>

        {/* Avatar preview */}
        <div style={{ position: 'relative' }}>
          <div style={{ height: 96, background: user.bannerColor || 'var(--bg-secondary)' }} />
          <div style={{ position: 'absolute', bottom: -36, left: 16, border: '4px solid var(--bg)', borderRadius: '50%' }}>
            {user.avatar
              ? <img src={user.avatar} alt={user.name} style={{ width: 72, height: 72, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
              : <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, fontWeight: 700, color: '#fff' }}>{user.name?.[0]}</div>
            }
          </div>
        </div>

        {/* Form fields */}
        <div style={{ padding: '56px 16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Name</label>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={50}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div>
            <label style={labelStyle}>Bio</label>
            <textarea
              value={bio}
              onChange={e => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.5' }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
            <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right', marginTop: 4 }}>{bio.length}/160</div>
          </div>
          <div>
            <label style={labelStyle}>Location</label>
            <input
              value={location}
              onChange={e => setLocation(e.target.value)}
              maxLength={100}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <div>
            <label style={labelStyle}>Website</label>
            <input
              value={website}
              onChange={e => setWebsite(e.target.value)}
              maxLength={200}
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Follow button (needs its own scope for useFollow) ─────────────────────────
function FollowButton({ user }) {
  const { following, toggleFollow } = useFollow(user.id)
  const { addToast } = useToast()
  const [hovered, setHovered] = useState(false)

  async function handleClick() {
    await toggleFollow()
    if (following) {
      addToast(`Unfollowed @${user.handle}`, 'info')
    } else {
      addToast(`Following @${user.handle}`, 'success')
    }
  }

  const isFollowing = !!following

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: isFollowing ? 'transparent' : 'var(--text-primary)',
        color: isFollowing ? (hovered ? '#f4212e' : 'var(--text-primary)') : 'var(--bg)',
        border: isFollowing ? `1px solid ${hovered ? '#f4212e' : 'var(--border)'}` : '1px solid transparent',
        borderRadius: 9999, padding: '8px 18px',
        fontSize: 15, fontWeight: 700, cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {isFollowing ? (hovered ? 'Unfollow' : 'Following') : 'Follow'}
    </button>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────
function PostsTab({ userId }) {
  const posts = useLiveQuery(
    () => db.posts.where('userId').equals(userId).filter(p => !p.parentId).reverse().sortBy('timestamp'),
    [userId]
  )
  if (!posts) return <LoadingDots />
  if (!posts.length) return <EmptyState icon={<MessageCircle size={40} />} title="No posts yet" sub="When this user posts, it'll show up here." />
  return posts.map(p => <PostCard key={p.id} post={p} />)
}

function RepliesTab({ userId }) {
  const posts = useLiveQuery(
    () => db.posts.where('userId').equals(userId).filter(p => !!p.parentId).reverse().sortBy('timestamp'),
    [userId]
  )
  if (!posts) return <LoadingDots />
  if (!posts.length) return <EmptyState icon={<MessageCircle size={40} />} title="No replies yet" sub="When this user replies, it'll show up here." />
  return posts.map(p => <PostCard key={p.id} post={p} />)
}

function MediaTab({ userId }) {
  const posts = useLiveQuery(
    () => db.posts.where('userId').equals(userId).filter(p => !!p.mediaUrl).reverse().sortBy('timestamp'),
    [userId]
  )
  if (!posts) return <LoadingDots />
  if (!posts.length) return <EmptyState icon={<Image size={40} />} title="No media yet" sub="Photos and videos will appear here." />
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, padding: '2px 0' }}>
      {posts.map(p => (
        <div key={p.id} style={{ aspectRatio: '1', overflow: 'hidden' }}>
          <img
            src={p.mediaUrl}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
          />
        </div>
      ))}
    </div>
  )
}

function LikesTab({ userId }) {
  const posts = useLiveQuery(async () => {
    const likeRows = await db.likes.where('userId').equals(userId).toArray()
    if (!likeRows.length) return []
    const ids = likeRows.map(l => l.postId)
    const fetched = await Promise.all(ids.map(id => db.posts.get(id)))
    return fetched.filter(Boolean).sort((a, b) => b.timestamp - a.timestamp)
  }, [userId])

  if (!posts) return <LoadingDots />
  if (!posts.length) return <EmptyState icon={<Heart size={40} />} title="No likes yet" sub="Posts this user likes will appear here." />
  return posts.map(p => <PostCard key={p.id} post={p} />)
}

function LoadingDots() {
  return (
    <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 15 }}>
      Loading…
    </div>
  )
}

function EmptyState({ icon, title, sub }) {
  return (
    <div style={{ padding: '48px 32px', textAlign: 'center' }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 8 }}>{title}</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 15, maxWidth: 280, margin: '0 auto' }}>{sub}</div>
    </div>
  )
}

// ── Main profile page ─────────────────────────────────────────────────────────
export default function Profile() {
  const { handle } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [editOpen, setEditOpen] = useState(false)

  const user = useLiveQuery(
    () => db.users.where('handle').equals(handle).first(),
    [handle]
  )

  const userPostCount = useLiveQuery(
    () => user ? db.posts.where('userId').equals(user.id).filter(p => !p.parentId).count() : 0,
    [user?.id]
  ) ?? 0

  // undefined = loading, null/undefined after query = not found
  if (user === undefined) return <ProfileSkeleton />
  if (!user) {
    return (
      <div style={{ padding: '48px 32px', textAlign: 'center' }}>
        <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--text-primary)', marginBottom: 8 }}>User not found</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 15 }}>@{handle} doesn't exist.</div>
      </div>
    )
  }

  const isOwn = user.id === CURRENT_USER_ID

  return (
    <div>
      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 16px', display: 'flex', alignItems: 'center', gap: 12, height: 53,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, borderRadius: '50%' }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <ChevronLeft size={22} />
        </button>
        <div>
          <div style={{ fontWeight: 700, fontSize: 17 }}>{user.name}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{fmtCount(userPostCount)} posts</div>
        </div>
      </div>

      {/* ── Banner ── */}
      <div style={{ height: 200, background: user.bannerColor || 'linear-gradient(135deg, #312e81, #6366f1, #818cf8)', position: 'relative' }} />

      {/* ── Profile row ── */}
      <div style={{ padding: '0 16px', position: 'relative' }}>
        {/* Avatar — absolute, bottom -40px of banner = top:-40px here */}
        <div style={{ position: 'absolute', top: -40, left: 16, border: '4px solid var(--bg)', borderRadius: '50%' }}>
          {user.avatar
            ? <img src={user.avatar} alt={user.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
            : <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, color: '#fff' }}>{user.name?.[0]}</div>
          }
        </div>

        {/* Edit / Follow button — right-aligned, 12px from top */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 12 }}>
          {isOwn ? (
            <button
              onClick={() => setEditOpen(true)}
              style={{
                background: 'transparent', color: 'var(--text-primary)',
                border: '1px solid var(--border)', borderRadius: 9999,
                padding: '8px 18px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Edit profile
            </button>
          ) : (
            <FollowButton user={user} />
          )}
        </div>

        {/* 60px spacer for avatar overlap */}
        <div style={{ height: 20 }} />

        {/* Name / handle / bio / meta */}
        <div style={{ paddingBottom: 12 }}>
          {/* Name + verified */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
            <span style={{ fontWeight: 800, fontSize: 20, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              {user.name}
            </span>
            {user.verified && <VerifiedBadge />}
          </div>

          <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 12 }}>
            @{user.handle}
          </div>

          {user.bio && (
            <p style={{ fontSize: 15, color: 'var(--text-primary)', marginBottom: 12, lineHeight: '1.5', margin: '0 0 12px' }}>
              {user.bio}
            </p>
          )}

          {/* Meta row */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12, marginTop: 4 }}>
            {user.location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 15 }}>
                <MapPin size={16} />
                <span>{user.location}</span>
              </div>
            )}
            {user.website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 15 }}>
                <LinkIcon size={16} color="var(--text-secondary)" />
                <a href={user.website} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                  {user.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {user.joinedDate && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 15 }}>
                <Calendar size={16} />
                <span>Joined {user.joinedDate}</span>
              </div>
            )}
          </div>

          {/* Following / Followers */}
          <div style={{ display: 'flex', gap: 20, marginBottom: 4 }}>
            {[
              { count: user.following ?? 0, label: 'Following' },
              { count: user.followers ?? 0, label: 'Followers' },
            ].map(({ count, label }) => (
              <button
                key={label}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', gap: 4, alignItems: 'baseline' }}
                onMouseEnter={e => { e.currentTarget.querySelector('span:last-child').style.textDecoration = 'underline' }}
                onMouseLeave={e => { e.currentTarget.querySelector('span:last-child').style.textDecoration = 'none' }}
              >
                <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>{fmtCount(count)}</span>
                <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex', borderBottom: '1px solid var(--border)',
        position: 'sticky', top: 53, background: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(12px)', zIndex: 9,
      }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              flex: 1, padding: '14px 4px',
              background: 'transparent', border: 'none',
              color: activeTab === i ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: 14, fontWeight: activeTab === i ? 700 : 500,
              cursor: 'pointer', position: 'relative', transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {tab}
            {activeTab === i && (
              <div style={{
                position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
                width: 40, height: 4, background: 'var(--accent)', borderRadius: 9999,
              }} />
            )}
          </button>
        ))}
      </div>

      {/* ── Tab content ── */}
      {activeTab === 0 && <PostsTab userId={user.id} />}
      {activeTab === 1 && <RepliesTab userId={user.id} />}
      {activeTab === 2 && <MediaTab userId={user.id} />}
      {activeTab === 3 && <LikesTab userId={user.id} />}

      {/* ── Edit profile modal ── */}
      {editOpen && <EditProfileModal user={user} onClose={() => setEditOpen(false)} />}
    </div>
  )
}
