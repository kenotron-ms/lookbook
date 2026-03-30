import { Bookmark } from 'lucide-react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'
import PostCard from '../components/PostCard'

export default function Bookmarks() {
  const bookmarkedPosts = useLiveQuery(async () => {
    const bms = await db.bookmarks.where('userId').equals(CURRENT_USER_ID).toArray()
    if (!bms.length) return []
    const ids = bms.map(b => b.postId)
    const posts = await db.posts.where('id').anyOf(ids).toArray()
    // Sort most-recently-bookmarked first
    const idOrder = [...ids].reverse()
    return idOrder.map(id => posts.find(p => p.id === id)).filter(Boolean)
  }, [])

  return (
    <div>
      {/* ── Sticky header ─────────────────────────────────────── */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 16px',
        }}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
          Bookmarks
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
          @jordanblake&apos;s Bookmarks
        </div>
      </div>

      {/* ── Loading ───────────────────────────────────────────── */}
      {bookmarkedPosts === undefined && (
        <div style={{ padding: 48, textAlign: 'center', color: 'var(--text-secondary)' }}>
          Loading…
        </div>
      )}

      {/* ── Empty state ───────────────────────────────────────── */}
      {bookmarkedPosts !== undefined && bookmarkedPosts.length === 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '72px 48px',
            gap: 12,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'var(--accent-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 4,
            }}
          >
            <Bookmark size={34} color="var(--accent)" strokeWidth={1.5} />
          </div>
          <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
            Save posts for later
          </p>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0, maxWidth: 300, lineHeight: 1.5 }}>
            Bookmark posts to easily find them again in the future.
          </p>
        </div>
      )}

      {/* ── Bookmarked posts list ─────────────────────────────── */}
      {bookmarkedPosts !== undefined && bookmarkedPosts.length > 0 &&
        bookmarkedPosts.map(post => <PostCard key={post.id} post={post} />)
      }
    </div>
  )
}
