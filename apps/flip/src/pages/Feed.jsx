import { useState, useRef, useEffect } from 'react'
import { Heart, MessageCircle, Bookmark, Share2, Music, Plus } from 'lucide-react'
import { videos } from '../data/videos.js'

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

function VideoCard({ video, index, total, isActive }) {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(video.likes)
  const [bouncing, setBouncing] = useState(false)

  const handleLike = () => {
    if (!liked) {
      setLikeCount(c => c + 1)
      setBouncing(true)
      setTimeout(() => setBouncing(false), 400)
    } else {
      setLikeCount(c => c - 1)
    }
    setLiked(l => !l)
  }

  const avatarColors = ['#fe2c55', '#25f4ee', '#ff6b6b', '#4ecdc4', '#a8e6cf', '#ffd93d', '#6c5ce7', '#fd79a8']
  const avatarColor = avatarColors[index % avatarColors.length]
  const initials = video.creator.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <div className="video-card" style={{ background: video.gradient }}>
      {/* Cinematic overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 40%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top: Tab bar + progress */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        padding: '16px 16px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        zIndex: 10,
      }}>
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
          {videos.slice(0, Math.min(total, 8)).map((_, i) => (
            <div key={i} style={{
              width: i === index ? 16 : 6,
              height: 3,
              borderRadius: 2,
              background: i === index ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>

      {/* Right action bar */}
      <div style={{
        position: 'absolute',
        right: 12,
        bottom: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        zIndex: 10,
      }}>
        {/* Avatar + follow */}
        <div style={{ position: 'relative', marginBottom: 4 }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 15,
            fontWeight: 700,
            color: '#fff',
            border: '2px solid #fff',
          }}>
            {initials}
          </div>
          <div style={{
            position: 'absolute',
            bottom: -8,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: '#fe2c55',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid #000',
          }}>
            <Plus size={11} color="#fff" />
          </div>
        </div>

        {/* Like */}
        <button onClick={handleLike} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div className={bouncing ? 'like-bounce' : ''} style={{ transition: 'color 0.2s' }}>
            <Heart
              size={32}
              color={liked ? '#fe2c55' : '#fff'}
              fill={liked ? '#fe2c55' : 'transparent'}
              strokeWidth={liked ? 0 : 1.5}
            />
          </div>
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{formatCount(likeCount)}</span>
        </button>

        {/* Comment */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <MessageCircle size={30} color="#fff" strokeWidth={1.5} />
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{formatCount(video.comments)}</span>
        </button>

        {/* Bookmark */}
        <button onClick={() => setBookmarked(b => !b)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Bookmark
            size={30}
            color={bookmarked ? '#fe2c55' : '#fff'}
            fill={bookmarked ? '#fe2c55' : 'transparent'}
            strokeWidth={bookmarked ? 0 : 1.5}
          />
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{formatCount(video.saves)}</span>
        </button>

        {/* Share */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Share2 size={28} color="#fff" strokeWidth={1.5} />
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{formatCount(video.shares)}</span>
        </button>

        {/* Flip / re-flip */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fe2c55, #25f4ee)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>F</span>
          </div>
          <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>Flip</span>
        </button>
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 64,
        padding: '0 16px 20px',
        zIndex: 10,
      }}>
        {/* Handle */}
        <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
          {video.handle}
        </div>
        {/* Caption */}
        <div style={{
          fontSize: 13,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.4,
          marginBottom: 10,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {video.caption}
        </div>
        {/* Sound */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Music size={12} color="#fff" />
          <div style={{
            overflow: 'hidden',
            flex: 1,
          }}>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap' }}>
              {video.sound}
            </span>
          </div>
          {/* Spinning disk */}
          <div className="disk-spin" style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #333, #111)',
            border: '2px solid #444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#000',
              border: '1.5px solid #666',
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Feed() {
  const [activeTab, setActiveTab] = useState('foryou')
  const [currentIndex, setCurrentIndex] = useState(0)
  const feedRef = useRef(null)

  useEffect(() => {
    const container = feedRef.current
    if (!container) return
    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight)
      setCurrentIndex(idx)
    }
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Tab bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        display: 'flex',
        justifyContent: 'center',
        gap: 32,
        padding: '14px 0 0',
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        {[{ id: 'foryou', label: 'For You' }, { id: 'following', label: 'Following' }].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.55)',
              fontSize: 15,
              fontWeight: activeTab === tab.id ? 700 : 400,
              paddingBottom: 8,
              borderBottom: activeTab === tab.id ? '2px solid #fff' : '2px solid transparent',
              transition: 'all 0.2s',
              pointerEvents: 'all',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div ref={feedRef} className="feed-container">
        {videos.map((video, i) => (
          <VideoCard
            key={video.id}
            video={video}
            index={i}
            total={videos.length}
            isActive={i === currentIndex}
          />
        ))}
      </div>
    </div>
  )
}
