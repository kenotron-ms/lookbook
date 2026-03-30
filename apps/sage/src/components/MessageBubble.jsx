import { useState, useEffect, useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark-dimmed.css'
import { Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Code2, FileText, Globe } from 'lucide-react'
import ThinkingBlock from './ThinkingBlock'
import ToolCallCard from './ToolCallCard'
import { ArtifactContext } from './Layout'

// ── Streaming text (word-by-word reveal) ─────────────────────────────────
function StreamingText({ text }) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    let pos = 0
    const words = text.split(' ')
    const go = () => {
      pos = Math.min(pos + 4, words.length)
      setDisplayed(words.slice(0, pos).join(' ') + (pos < words.length ? '' : ''))
      if (pos < words.length) requestAnimationFrame(go)
    }
    requestAnimationFrame(go)
  }, [text])
  return <div className="sage-prose" style={{ whiteSpace: 'pre-wrap' }}>{displayed}</div>
}

// ── Copy button for code blocks ────────────────────────────────────────────
function CopyCodeButton({ getText }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(getText())
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }}
      style={{
        position: 'absolute', top: 10, right: 10,
        width: 28, height: 28, borderRadius: 6,
        border: 'none', background: 'rgba(255,255,255,0.1)',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.7)', transition: 'all 0.1s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
    >
      {copied ? <Check size={12} color="#7ECBA0" /> : <Copy size={12} />}
    </button>
  )
}

// ── Markdown component overrides ──────────────────────────────────────────
const mdComponents = {
  pre({ children }) {
    const ref = { current: null }
    return (
      <div style={{ position: 'relative', marginBottom: 4 }}>
        <CopyCodeButton getText={() => ref.current?.textContent ?? ''} />
        <pre ref={ref}>{children}</pre>
      </div>
    )
  },
}

// ── Artifact card (inline in message) ─────────────────────────────────────
function ArtifactCard({ artifact }) {
  const { setArtifact } = useContext(ArtifactContext)
  const Icon = artifact.type === 'html' ? Globe : artifact.type === 'code' ? Code2 : FileText
  const versionCount = (artifact.versions?.length ?? 0) + 1
  return (
    <button
      onClick={() => setArtifact(artifact)}
      style={{
        marginTop: 14, padding: '12px 14px',
        borderRadius: 12,
        border: '1px solid #E4E4E7',
        background: '#FFFFFF',
        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
        width: '100%', textAlign: 'left', transition: 'border-color 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#D4D4D8'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#E4E4E7'}
    >
      {/* Icon container — #F4F4F5 bg */}
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={16} style={{ color: '#18181B' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#18181B', fontFamily: "'Inter', sans-serif" }}>
          {artifact.title}
        </div>
        <div style={{ fontSize: 12, color: '#71717A', fontFamily: "'Inter', sans-serif" }}>
          {artifact.type === 'html' ? 'Interactive artifact' : artifact.type === 'code' ? `${artifact.language} · ${versionCount} version${versionCount > 1 ? 's' : ''}` : `Document · ${versionCount} version${versionCount > 1 ? 's' : ''}`}
        </div>
      </div>
    </button>
  )
}

// ── Action row (copy, thumbs, retry) ─────────────────────────────────────
function ActionRow({ content }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div
      style={{ display: 'flex', gap: 2, marginTop: 12 }}
    >
      {[
        { icon: copied ? Check : Copy, action: handleCopy, color: copied ? '#7ECBA0' : undefined },
        { icon: ThumbsUp },
        { icon: ThumbsDown },
        { icon: RotateCcw, title: 'Retry' },
      ].map(({ icon: Icon, action, color, title }, i) => (
        <button key={i} onClick={action} title={title} style={{
          width: 28, height: 28, borderRadius: 6, border: 'none',
          background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: color || '#9CA3AF', transition: 'all 0.1s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#EFEFED'; e.currentTarget.style.color = '#1A1A1A' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = color || '#9CA3AF' }}>
          <Icon size={14} />
        </button>
      ))}
    </div>
  )
}

// ── Main MessageBubble export ─────────────────────────────────────────────
export default function MessageBubble({ message, isStreaming = false }) {
  if (message.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <div style={{
          background: '#F0EFEA',      /* warm beige — exact from screenshot */
          borderRadius: 14,
          padding: '12px 16px',
          maxWidth: '65%',
          fontSize: 15,
          lineHeight: 1.6,
          color: '#1A1A1A',
          fontFamily: "'Inter', sans-serif",
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {message.content}
        </div>
      </div>
    )
  }

  // ── Assistant message — NO BUBBLE, bare on page background ─────────────
  return (
    <div style={{ marginBottom: 32, paddingRight: 40 }} className={isStreaming ? 'message-appear' : ''}>

      {/* 1. Thinking block (bare gray text) */}
      {message.thinking && (
        <ThinkingBlock thinking={message.thinking} isLive={isStreaming && !message.content} />
      )}
      {isStreaming && !message.thinking && !message.content && (
        <ThinkingBlock thinking={null} isLive={true} />
      )}

      {/* 2. Tool call cards — only show after streaming */}
      {!isStreaming && message.toolCalls?.map((tc, i) => (
        <ToolCallCard key={i} toolCall={tc} />
      ))}

      {/* 3. Prose — Lora serif, NO bubble, bare on background */}
      {isStreaming ? (
        <StreamingText text={message.content} />
      ) : (
        <div className="sage-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={mdComponents}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      )}

      {/* 4. Artifact card */}
      {!isStreaming && message.artifact && (
        <ArtifactCard artifact={message.artifact} />
      )}

      {/* 5. Action row */}
      {!isStreaming && (
        <ActionRow content={message.content} />
      )}
    </div>
  )
}
