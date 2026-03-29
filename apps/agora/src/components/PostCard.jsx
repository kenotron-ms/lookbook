import { useState } from 'react'
import { ChevronUp, ChevronDown, MessageSquare, Share2, Bookmark, EyeOff, Flag } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function formatScore(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

export default function PostCard({ post }) {
  const [vote, setVote] = useState(null)
  const navigate = useNavigate()

  const score = post.score + (vote === 'up' ? 1 : vote === 'down' ? -1 : 0)

  function handleVote(dir) {
    setVote(prev => prev === dir ? null : dir)
  }

  return (
    <div
      style={{
        display: 'flex', background: '#1a1a1b',
        border: '1px solid #343536', borderRadius: 4,
        cursor: 'pointer', marginBottom: 10,
        transition: 'border-color 0.1s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#818384'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#343536'}
      onClick={() => navigate(`/post/${post.id}`)}
    >
      {/* Vote column */}
      <div style={{
        width: 40, minWidth: 40, background: '#161617',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '8px 4px', gap: 2, borderRadius: '4px 0 0 4px',
      }}>
        <button
          onClick={e => { e.stopPropagation(); handleVote('up'); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
            borderRadius: 2, color: vote === 'up' ? '#ff6314' : '#818384',
            transition: 'color 0.1s',
          }}
          onMouseEnter={e => { if (vote !== 'up') e.currentTarget.style.color = '#ff6314'; }}
          onMouseLeave={e => { if (vote !== 'up') e.currentTarget.style.color = '#818384'; }}
        >
          <ChevronUp size={18} strokeWidth={2.5} />
        </button>
        <span style={{
          fontSize: 12, fontWeight: 700, lineHeight: 1,
          color: vote === 'up' ? '#ff6314' : vote === 'down' ? '#9494ff' : '#d7dadc',
        }}>
          {formatScore(score)}
        </span>
        <button
          onClick={e => { e.stopPropagation(); handleVote('down'); }}
          style={{
            background: 'none', border: 'none', cursor: 'pointer', padding: 2,
            borderRadius: 2, color: vote === 'down' ? '#9494ff' : '#818384',
            transition: 'color 0.1s',
          }}
          onMouseEnter={e => { if (vote !== 'down') e.currentTarget.style.color = '#9494ff'; }}
          onMouseLeave={e => { if (vote !== 'down') e.currentTarget.style.color = '#818384'; }}
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </button>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '8px 12px 6px' }}>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
          <span
            style={{ fontSize: 12, fontWeight: 700, color: '#d7dadc', cursor: 'pointer' }}
            onClick={e => { e.stopPropagation(); navigate(`/g/${post.community}`); }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            g/{post.community}
          </span>
          <span style={{ color: '#343536', fontSize: 12 }}>•</span>
          <span style={{ fontSize: 12, color: '#818384' }}>
            Posted by <span style={{ color: '#818384', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
            >u/{post.author}</span>
          </span>
          <span style={{ fontSize: 12, color: '#818384' }}>{post.timeAgo}</span>
          {post.flair && (
            <span style={{
              fontSize: 11, fontWeight: 600, padding: '1px 8px', borderRadius: 12,
              background: post.flairBg, color: post.flairColor,
            }}>
              {post.flair}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 18, fontWeight: 500, color: '#d7dadc', lineHeight: 1.3,
          marginBottom: 6, cursor: 'pointer',
        }}>
          {post.title}
        </h2>

        {/* Preview */}
        {post.preview && (
          <p style={{
            fontSize: 14, color: '#818384', lineHeight: 1.5, marginBottom: 8,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {post.preview}
          </p>
        )}

        {/* Action row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 4 }}>
          {[
            { icon: <MessageSquare size={14} />, label: `${formatScore(post.commentCount)} Comments` },
            { icon: <Share2 size={14} />, label: 'Share' },
            { icon: <Bookmark size={14} />, label: 'Save' },
            { icon: <EyeOff size={14} />, label: 'Hide' },
            { icon: <Flag size={14} />, label: 'Report' },
          ].map(({ icon, label }) => (
            <button
              key={label}
              onClick={e => e.stopPropagation()}
              style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
                background: 'none', border: 'none', borderRadius: 2, cursor: 'pointer',
                color: '#818384', fontSize: 12, fontWeight: 700,
                transition: 'background 0.1s, color 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#272729'; e.currentTarget.style.color = '#d7dadc'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#818384'; }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
