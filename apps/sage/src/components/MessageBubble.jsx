import { useState, useContext } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark-dimmed.css'
import { Copy, Check, ThumbsUp, ThumbsDown, RotateCcw, Code2, FileText } from 'lucide-react'
import { ArtifactContext } from './Layout'

// ─── Text extraction from React children ─────────────────────────────────────
function extractText(children) {
  if (typeof children === 'string') return children
  if (typeof children === 'number') return String(children)
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children?.props?.children) return extractText(children.props.children)
  return ''
}

// ─── Copy button for code blocks ──────────────────────────────────────────────
function CopyCodeButton({ getText }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getText())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy code"
      style={{
        position: 'absolute',
        top: 8,
        right: 8,
        width: 28,
        height: 28,
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        background: 'rgba(255,255,255,0.07)',
        color: copied ? '#7ECBA0' : 'rgba(255,255,255,0.45)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        zIndex: 2,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  )
}

// ─── Custom markdown components ───────────────────────────────────────────────
function buildMdComponents() {
  return {
    pre({ children }) {
      const text = extractText(children)
      return (
        <div style={{ position: 'relative', marginBottom: 4 }}>
          <CopyCodeButton getText={() => text} />
          <pre>{children}</pre>
        </div>
      )
    },
    code({ node, className, children, ...props }) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    },
  }
}

const mdComponents = buildMdComponents()

// ─── ArtifactCard ─────────────────────────────────────────────────────────────
function ArtifactCard({ artifact }) {
  const { setArtifact } = useContext(ArtifactContext)
  const [hover, setHover] = useState(false)
  const Icon = artifact.type === 'code' ? Code2 : FileText

  return (
    <div
      onClick={() => setArtifact(artifact)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        marginTop: 12,
        padding: '12px 14px',
        borderRadius: 'var(--radius-md)',
        border: hover ? '1px solid var(--accent-dim)' : '1px solid var(--border)',
        background: hover ? 'var(--accent-subtle)' : 'var(--bg)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        transition: 'all 0.15s',
      }}
    >
      <Icon size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {artifact.title}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          {artifact.type === 'code'
            ? `${artifact.language} • Click to view`
            : 'Document • Click to view'}
        </div>
      </div>
    </div>
  )
}

// ─── IconBtn ──────────────────────────────────────────────────────────────────
function IconBtn({ icon: Icon, onClick, title }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={onClick}
      title={title}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 28,
        height: 28,
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: hover ? 'var(--bg-hover)' : 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: hover ? 'var(--text-primary)' : 'var(--text-muted)',
        transition: 'all 0.1s',
      }}
    >
      <Icon size={14} />
    </button>
  )
}

// ─── ActionRow ────────────────────────────────────────────────────────────────
function ActionRow({ message }) {
  const [copied, setCopied] = useState(false)
  const [rowHover, setRowHover] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div
      onMouseEnter={() => setRowHover(true)}
      onMouseLeave={() => setRowHover(false)}
      style={{
        display: 'flex',
        gap: 2,
        marginTop: 10,
        opacity: rowHover ? 1 : 0.5,
        transition: 'opacity 0.15s',
      }}
    >
      <IconBtn icon={copied ? Check : Copy} onClick={handleCopy} title="Copy" />
      <IconBtn icon={ThumbsUp} title="Good response" />
      <IconBtn icon={ThumbsDown} title="Bad response" />
      <IconBtn icon={RotateCcw} title="Regenerate" />
    </div>
  )
}

// ─── MessageBubble ────────────────────────────────────────────────────────────
export default function MessageBubble({ message }) {
  const { role, content, artifact } = message

  if (role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
        <div style={{
          background: 'var(--bg-user-msg)',
          border: '1px solid var(--border-message)',
          borderRadius: 'var(--radius-xl)',
          padding: '12px 16px',
          maxWidth: 'min(520px, 85%)',
          boxShadow: 'var(--shadow-sm)',
          fontSize: 15,
          lineHeight: 1.6,
          color: 'var(--text-primary)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}>
          {content}
        </div>
      </div>
    )
  }

  // Assistant message
  return (
    <div
      className="message-appear"
      style={{ display: 'flex', gap: 12, marginBottom: 24 }}
    >
      {/* Sage avatar */}
      <div style={{ flexShrink: 0, paddingTop: 2 }}>
        <img
          src="./sage-logo.jpg"
          alt="Sage"
          style={{ width: 22, height: 22, borderRadius: 4, objectFit: 'cover' }}
        />
      </div>

      {/* Content column */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Sender name */}
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
          Sage
        </div>

        {/* Markdown prose */}
        <div className="sage-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={mdComponents}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Artifact card */}
        {artifact && <ArtifactCard artifact={artifact} />}

        {/* Action row */}
        <ActionRow message={message} />
      </div>
    </div>
  )
}
