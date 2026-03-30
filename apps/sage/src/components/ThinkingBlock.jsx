import { useState } from 'react'
import { Brain, ChevronDown, ChevronRight } from 'lucide-react'

export default function ThinkingBlock({ thinking, isLive = false }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Header — always visible, click to expand/collapse */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px 0',
          color: 'var(--text-muted)',
          fontSize: 13,
        }}
      >
        <Brain size={14} style={{ color: 'var(--accent)', opacity: 0.8 }} />
        <span style={{ fontWeight: 500 }}>
          {isLive ? 'Thinking…' : `Thought for ${thinking.durationSeconds} seconds`}
        </span>
        {isLive ? (
          /* Animated dots while live */
          <span style={{ display: 'flex', gap: 3, alignItems: 'center', marginLeft: 2 }}>
            <ThinkingDot delay={0} />
            <ThinkingDot delay={0.16} />
            <ThinkingDot delay={0.32} />
          </span>
        ) : (
          expanded ? <ChevronDown size={13} /> : <ChevronRight size={13} />
        )}
      </button>

      {/* Expanded content */}
      {expanded && !isLive && (
        <div
          style={{
            marginTop: 8,
            padding: '12px 14px',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(0,0,0,0.025)',
            border: '1px solid var(--border-light)',
            borderLeft: '2px solid var(--accent)',
            fontSize: 13,
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            whiteSpace: 'pre-wrap',
            fontStyle: 'italic',
            maxHeight: 280,
            overflowY: 'auto',
          }}
        >
          {thinking.text}
        </div>
      )}
    </div>
  )
}

function ThinkingDot({ delay }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: 'var(--text-muted)',
        animation: `thinking-pulse 1.4s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}
