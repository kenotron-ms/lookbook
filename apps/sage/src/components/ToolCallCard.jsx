import { useState } from 'react'
import { Globe, Terminal, ChevronDown, ChevronRight } from 'lucide-react'

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Deterministic domain → color */
function domainColor(domain) {
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']
  let hash = 0
  for (const c of domain) hash = (hash * 31 + c.charCodeAt(0)) % colors.length
  return colors[hash]
}

// ─── SourceCard ──────────────────────────────────────────────────────────────

function SourceCard({ result }) {
  return (
    <div
      style={{
        padding: '8px 10px',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg-input)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        gap: 10,
      }}
    >
      {/* Favicon placeholder — colored circle based on domain initial */}
      <div
        style={{
          width: 16,
          height: 16,
          borderRadius: 3,
          flexShrink: 0,
          marginTop: 2,
          background: domainColor(result.domain),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 9,
          fontWeight: 700,
          color: '#fff',
        }}
      >
        {result.domain[0].toUpperCase()}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {result.title}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 3 }}>
          {result.domain}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {result.excerpt}
        </div>
      </div>
    </div>
  )
}

// ─── WebSearchCard ───────────────────────────────────────────────────────────

function WebSearchCard({ toolCall, expanded, setExpanded }) {
  return (
    <div
      style={{
        marginBottom: 12,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--bg-hover)',
        fontSize: 13,
      }}
    >
      {/* Header */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <Globe size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
        <span style={{ flex: 1, color: 'var(--text-primary)', fontWeight: 500 }}>
          Searched for{' '}
          <em style={{ fontStyle: 'normal', color: 'var(--text-secondary)' }}>
            &ldquo;{toolCall.query}&rdquo;
          </em>
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {toolCall.status === 'running' ? (
            <span>Searching…</span>
          ) : (
            <span>{toolCall.results?.length ?? 0} sources</span>
          )}
        </span>
        {toolCall.status === 'done' &&
          (expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
      </div>

      {/* Expanded results */}
      {expanded && toolCall.results && (
        <div
          style={{
            borderTop: '1px solid var(--border)',
            padding: '8px 10px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
          }}
        >
          {toolCall.results.map((r, i) => (
            <SourceCard key={i} result={r} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── CodeExecutionCard ───────────────────────────────────────────────────────

function CodeExecutionCard({ toolCall, expanded, setExpanded }) {
  return (
    <div
      style={{
        marginBottom: 12,
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        background: 'var(--bg-hover)',
        fontSize: 13,
      }}
    >
      {/* Header */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', cursor: 'pointer' }}
        onClick={() => setExpanded(e => !e)}
      >
        <Terminal size={13} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
        <span style={{ flex: 1, color: 'var(--text-primary)', fontWeight: 500 }}>
          {toolCall.status === 'running' ? 'Running code…' : `Ran ${toolCall.language} code`}
        </span>
        <span
          style={{
            fontSize: 11,
            padding: '2px 7px',
            borderRadius: 'var(--radius-pill)',
            background:
              toolCall.status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
            color: toolCall.status === 'error' ? '#ef4444' : '#10b981',
          }}
        >
          {toolCall.status === 'running' ? '…' : toolCall.status === 'error' ? 'Error' : 'Done'}
        </span>
        {toolCall.status === 'done' &&
          (expanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />)}
      </div>

      {/* Expanded code + output */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {/* Code block (dark) */}
          <div
            style={{
              background: 'var(--bg-code)',
              padding: '12px 14px',
              fontFamily: "'SF Mono','Fira Code',Menlo,monospace",
              fontSize: 12,
              lineHeight: 1.6,
              color: 'var(--text-code)',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11, marginBottom: 6 }}>
              ▶ {toolCall.language}
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {toolCall.code}
            </pre>
          </div>

          {/* Output */}
          <div style={{ padding: '10px 14px', background: 'var(--bg-hover)' }}>
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-muted)',
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Output
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: 12,
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                fontFamily: "'SF Mono','Fira Code',Menlo,monospace",
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {toolCall.output}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Default export — dispatches to correct card type ────────────────────────

export default function ToolCallCard({ toolCall }) {
  const [expanded, setExpanded] = useState(false)

  if (toolCall.type === 'web_search') {
    return <WebSearchCard toolCall={toolCall} expanded={expanded} setExpanded={setExpanded} />
  }
  if (toolCall.type === 'code_execution') {
    return <CodeExecutionCard toolCall={toolCall} expanded={expanded} setExpanded={setExpanded} />
  }
  return null
}
