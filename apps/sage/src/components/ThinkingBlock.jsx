import { useState } from 'react'

export default function ThinkingBlock({ thinking, isLive = false }) {
  const [expanded, setExpanded] = useState(false)

  if (isLive) {
    // While generating: just the dots
    return (
      <div style={{ marginBottom: 8 }}>
        <span className="thinking-dot" />
        <span className="thinking-dot" />
        <span className="thinking-dot" />
      </div>
    )
  }

  // After generating: "Summary text ›" inline gray text
  // Get first ~80 chars of thinking text as the summary
  const summary = thinking.text.split('\n')[0].slice(0, 90).trim()

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Single line: "summary text ›" */}
      <button
        onClick={() => setExpanded(e => !e)}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: '#808080', fontSize: 14, padding: 0,
          display: 'flex', alignItems: 'center', gap: 4,
          textAlign: 'left',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <span>{summary}</span>
        <span style={{
          fontSize: 16, lineHeight: 1,
          transform: expanded ? 'rotate(90deg)' : 'none',
          display: 'inline-block',
          transition: 'transform 0.15s',
        }}>›</span>
      </button>

      {/* Expanded: full thinking text */}
      {expanded && (
        <div style={{
          marginTop: 8,
          paddingLeft: 12,
          borderLeft: '2px solid #E0E0E0',
          color: '#808080',
          fontSize: 13,
          lineHeight: 1.7,
          fontStyle: 'italic',
          fontFamily: "'Inter', sans-serif",
          whiteSpace: 'pre-wrap',
          maxHeight: 260,
          overflowY: 'auto',
        }}>
          {thinking.text}
        </div>
      )}
    </div>
  )
}
