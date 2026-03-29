import { useState } from 'react'

const REACTIONS = [
  { key: 'like', emoji: '👍', label: 'Like', color: '#1877f2' },
  { key: 'love', emoji: '❤️', label: 'Love', color: '#f44336' },
  { key: 'haha', emoji: '😆', label: 'Haha', color: '#fdd835' },
  { key: 'wow', emoji: '😲', label: 'Wow', color: '#fdd835' },
  { key: 'sad', emoji: '😢', label: 'Sad', color: '#fdd835' },
  { key: 'angry', emoji: '😡', label: 'Angry', color: '#ff9800' },
]

export default function ReactionPicker({ onReact, currentReaction }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '100%',
        left: 0,
        marginBottom: 6,
        backgroundColor: '#fff',
        borderRadius: 999,
        boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        padding: '6px 10px',
        display: 'flex',
        gap: 4,
        alignItems: 'center',
        zIndex: 100,
        whiteSpace: 'nowrap',
      }}
    >
      {REACTIONS.map((r) => (
        <button
          key={r.key}
          onClick={() => onReact(r.key)}
          onMouseEnter={() => setHovered(r.key)}
          onMouseLeave={() => setHovered(null)}
          title={r.label}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            transform: hovered === r.key ? 'scale(1.4) translateY(-4px)' : 'scale(1)',
            transition: 'transform 0.15s ease',
          }}
        >
          <span style={{ fontSize: 26, lineHeight: 1 }}>{r.emoji}</span>
          {hovered === r.key && (
            <span style={{ fontSize: 10, fontWeight: 600, color: '#65676b', backgroundColor: '#f0f2f5', borderRadius: 8, padding: '1px 5px' }}>
              {r.label}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
