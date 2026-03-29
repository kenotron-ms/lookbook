import { useState } from 'react'
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Users } from 'lucide-react'
import ReactionPicker from './ReactionPicker.jsx'

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      backgroundColor: color, display: 'flex', alignItems: 'center',
      justifyContent: 'center', color: '#fff', fontWeight: 700,
      fontSize: size * 0.38, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function ReactionSummary({ reactions, total }) {
  const active = Object.entries(reactions).filter(([, v]) => v > 0)
  if (total === 0) return null
  const emojiMap = { like: '👍', love: '❤️', haha: '😆', wow: '😲', sad: '😢', angry: '😡' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#65676b', fontSize: 14 }}>
      <span style={{ display: 'flex', alignItems: 'center' }}>
        {active.slice(0, 3).map(([k]) => (
          <span key={k} style={{ fontSize: 15 }}>{emojiMap[k]}</span>
        ))}
      </span>
      <span>{total.toLocaleString()}</span>
    </div>
  )
}

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [reaction, setReaction] = useState(null)
  const [showPicker, setShowPicker] = useState(false)
  const [showComments, setShowComments] = useState(true)

  const reactionLabels = { like: 'Like', love: 'Love', haha: 'Haha', wow: 'Wow', sad: 'Sad', angry: 'Angry' }
  const reactionEmojis = { like: '👍', love: '❤️', haha: '😆', wow: '😲', sad: '😢', angry: '😡' }

  const handleReact = (key) => {
    setReaction(key === reaction ? null : key)
    setLiked(key !== reaction)
    setShowPicker(false)
  }

  const likeColor = reaction ? (reaction === 'love' ? '#f44336' : '#1877f2') : '#65676b'
  const likeLabel = reaction ? reactionLabels[reaction] : 'Like'
  const likeEmoji = reaction ? reactionEmojis[reaction] : null

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: 8,
      border: '1px solid #e4e6eb',
      marginBottom: 12,
    }}>
      {/* Post header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar initials={post.initials} color={post.avatarColor} size={42} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: '#050505', cursor: 'pointer' }}>{post.author}</span>
              {post.feeling && (
                <span style={{ fontSize: 13, color: '#65676b' }}>is {post.feeling}</span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#65676b', marginTop: 1 }}>
              <span>{post.time}</span>
              <span>·</span>
              {post.privacy === 'public' ? <Globe size={12} /> : <Users size={12} />}
            </div>
          </div>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 6, color: '#65676b' }}>
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Post content */}
      <div style={{ padding: '10px 16px', fontSize: 15, color: '#050505', lineHeight: '1.5' }}>
        {post.content}
      </div>

      {/* Link card */}
      {post.type === 'link' && post.linkTitle && (
        <div style={{ margin: '0 16px 10px', border: '1px solid #e4e6eb', borderRadius: 8, overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ height: 80, background: 'linear-gradient(135deg,#e8f4fd,#bbdefb)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 32 }}>🔗</span>
          </div>
          <div style={{ padding: '8px 12px', backgroundColor: '#f0f2f5' }}>
            <div style={{ fontSize: 11, color: '#65676b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{post.linkDomain}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#050505', marginTop: 2 }}>{post.linkTitle}</div>
          </div>
        </div>
      )}

      {/* Photo */}
      {post.hasPhoto && (
        <div style={{
          width: '100%', height: 280,
          background: post.photoGradient,
          cursor: 'pointer',
        }} />
      )}

      {/* Reactions + comment count */}
      <div style={{ padding: '8px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ReactionSummary reactions={post.reactions} total={post.totalReactions} />
        <button
          onClick={() => setShowComments(!showComments)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: '#65676b' }}
        >
          {post.comments.length} comments
        </button>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: '#e4e6eb', margin: '0 16px' }} />

      {/* Action row */}
      <div style={{ display: 'flex', padding: '2px 8px' }}>
        {/* Like with reaction picker */}
        <div className="like-btn-wrap" style={{ position: 'relative', flex: 1 }}>
          {showPicker && (
            <ReactionPicker onReact={handleReact} currentReaction={reaction} />
          )}
          <button
            onClick={() => handleReact('like')}
            onMouseEnter={() => setShowPicker(true)}
            onMouseLeave={() => setShowPicker(false)}
            style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '8px 0', borderRadius: 6, color: likeColor, fontWeight: 600, fontSize: 14,
            }}
          >
            {likeEmoji ? <span style={{ fontSize: 18 }}>{likeEmoji}</span> : <ThumbsUp size={18} />}
            {likeLabel}
          </button>
        </div>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 0', borderRadius: 6, color: '#65676b', fontWeight: 600, fontSize: 14,
          }}
        >
          <MessageCircle size={18} />
          Comment
        </button>

        <button
          style={{
            flex: 1, background: 'none', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            padding: '8px 0', borderRadius: 6, color: '#65676b', fontWeight: 600, fontSize: 14,
          }}
        >
          <Share2 size={18} />
          Share
        </button>
      </div>

      {/* Comments */}
      {showComments && post.comments.length > 0 && (
        <div style={{ padding: '4px 16px 12px' }}>
          {post.comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'flex-start' }}>
              <Avatar initials={c.initials} color={c.color} size={32} />
              <div style={{ flex: 1 }}>
                <div style={{ backgroundColor: '#f0f2f5', borderRadius: 18, padding: '8px 12px', display: 'inline-block', maxWidth: '100%' }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: '#050505', marginBottom: 2 }}>{c.author}</div>
                  <div style={{ fontSize: 14, color: '#050505' }}>{c.text}</div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 3, paddingLeft: 12, fontSize: 12, color: '#65676b' }}>
                  <span style={{ cursor: 'pointer', fontWeight: 600 }}>Like</span>
                  <span style={{ cursor: 'pointer', fontWeight: 600 }}>Reply</span>
                  <span>{c.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
