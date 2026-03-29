import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, ThumbsUp, ThumbsDown, Plus, Info, Check } from 'lucide-react'

export default function ContentCard({ show, progress, rank, wide = false }) {
  const [hovered, setHovered] = useState(false)
  const [inList, setInList] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const cardWidth = wide ? '220px' : '200px'
  const cardHeight = wide ? '124px' : '113px'

  return (
    <div
      className="card-hover"
      style={{
        position: 'relative',
        flexShrink: 0,
        width: cardWidth,
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Rank number (for Top 10) */}
      {rank && (
        <div style={{
          position: 'absolute',
          left: '-28px',
          bottom: '-8px',
          fontSize: '80px',
          fontWeight: '900',
          color: '#141414',
          WebkitTextStroke: '3px rgba(255,255,255,0.25)',
          lineHeight: 1,
          zIndex: 1,
          userSelect: 'none',
        }}>
          {rank}
        </div>
      )}

      {/* Thumbnail */}
      <div style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: '4px',
        background: show.gradient,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: hovered ? '0 0 0 2px rgba(255,255,255,0.2)' : 'none',
        transition: 'box-shadow 0.3s',
      }}>
        {/* Show title overlay on thumbnail */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '20px 12px 8px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <span style={{
            fontSize: '10px',
            fontWeight: '700',
            color: show.accentColor || '#fff',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            opacity: 0.9,
          }}>
            {show.genre?.[0]}
          </span>
        </div>

        {/* Accent bar */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: show.accentColor || '#e50914',
          opacity: 0.7,
        }} />

        {/* Progress bar */}
        {progress !== undefined && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'rgba(255,255,255,0.2)',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: '#e50914',
            }} />
          </div>
        )}
      </div>

      {/* Hover panel */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: rank ? '0' : '-10px',
          right: rank ? '0' : '-10px',
          background: '#1f1f1f',
          borderRadius: '0 0 4px 4px',
          padding: '10px 12px',
          zIndex: 20,
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderTop: 'none',
        }}>
          {/* Title */}
          <div style={{
            fontSize: '12px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '6px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {show.title}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Link to="/title">
              <button style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#fff',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}>
                <Play size={12} color="#000" fill="#000" />
              </button>
            </Link>
            <button
              onClick={() => setInList(l => !l)}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}>
              {inList ? <Check size={12} /> : <Plus size={12} />}
            </button>
            <button
              onClick={() => { setLiked(l => !l); setDisliked(false) }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: liked ? '#e50914' : 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}>
              <ThumbsUp size={11} />
            </button>
            <button
              onClick={() => { setDisliked(d => !d); setLiked(false) }}
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}>
              <ThumbsDown size={11} />
            </button>
            <Link to="/title" style={{ marginLeft: 'auto' }}>
              <button style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '2px solid rgba(255,255,255,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#fff',
              }}>
                <Info size={12} />
              </button>
            </Link>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontSize: '10px',
              color: '#4ade80',
              fontWeight: '700',
            }}>97% Match</span>
            <span style={{
              fontSize: '10px',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '1px 4px',
              borderRadius: '2px',
            }}>{show.rating}</span>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>
              {show.type === 'series' ? `${show.seasons}S` : `${show.runtime}m`}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
