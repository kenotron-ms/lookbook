import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { X, Copy, Check, Code2, FileText } from 'lucide-react'

export default function ArtifactsPanel({ artifact, onClose }) {
  const [copied, setCopied] = useState(false)
  const [closeBtnHover, setCloseBtnHover] = useState(false)
  const [copyBtnHover, setCopyBtnHover] = useState(false)

  const Icon = artifact.type === 'code' ? Code2 : FileText

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(artifact.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div style={{
      width: 400,
      flexShrink: 0,
      height: '100vh',
      background: 'var(--bg-artifact)',
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        background: 'var(--bg-artifact-header)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexShrink: 0,
      }}>
        {/* Icon */}
        <Icon size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />

        {/* Title + language badge */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {artifact.title}
          </span>
          {artifact.language && (
            <span style={{
              fontSize: 11,
              padding: '2px 7px',
              borderRadius: 99,
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)',
              flexShrink: 0,
            }}>
              {artifact.language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          onMouseEnter={() => setCopyBtnHover(true)}
          onMouseLeave={() => setCopyBtnHover(false)}
          title={copied ? 'Copied!' : 'Copy'}
          style={{
            width: 28,
            height: 28,
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            background: copyBtnHover ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: copied ? '#7ECBA0' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>

        {/* Close button */}
        <button
          onClick={onClose}
          onMouseEnter={() => setCloseBtnHover(true)}
          onMouseLeave={() => setCloseBtnHover(false)}
          title="Close"
          style={{
            width: 28,
            height: 28,
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            background: closeBtnHover ? 'rgba(255,255,255,0.1)' : 'transparent',
            color: 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
        >
          <X size={15} />
        </button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto', padding: '16px 20px' }}>
        {artifact.type === 'code' ? (
          <CodeContent content={artifact.content} language={artifact.language} />
        ) : (
          <DocumentContent content={artifact.content} />
        )}
      </div>
    </div>
  )
}

function CodeContent({ content, language }) {
  return (
    <pre style={{
      margin: 0,
      fontFamily: "'SF Mono', 'Fira Code', Menlo, monospace",
      fontSize: 13,
      lineHeight: 1.6,
      color: 'var(--text-code)',
      background: 'transparent',
      overflow: 'visible',
      whiteSpace: 'pre',
      wordBreak: 'normal',
    }}>
      <code style={{
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        background: 'none',
        padding: 0,
      }}>
        {content}
      </code>
    </pre>
  )
}

function DocumentContent({ content }) {
  return (
    <div style={{
      color: 'rgba(255,255,255,0.8)',
      fontSize: 14,
      lineHeight: 1.7,
    }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={darkMdComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

// Dark-adapted markdown styles for the artifact panel (document type)
const darkMdComponents = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: '1.4em', fontWeight: 700, margin: '0 0 0.8em', color: 'rgba(255,255,255,0.9)' }}>
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 style={{ fontSize: '1.15em', fontWeight: 700, margin: '1.2em 0 0.5em', color: 'rgba(255,255,255,0.9)' }}>
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: '1em', fontWeight: 600, margin: '1em 0 0.4em', color: 'rgba(255,255,255,0.9)' }}>
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p style={{ margin: '0 0 0.85em', color: 'rgba(255,255,255,0.75)' }}>{children}</p>
  ),
  ul: ({ children }) => (
    <ul style={{ margin: '0.6em 0 0.9em 1.4em', color: 'rgba(255,255,255,0.75)' }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ margin: '0.6em 0 0.9em 1.4em', color: 'rgba(255,255,255,0.75)' }}>{children}</ol>
  ),
  li: ({ children }) => <li style={{ margin: '0.3em 0' }}>{children}</li>,
  strong: ({ children }) => (
    <strong style={{ fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{
      borderLeft: '3px solid rgba(255,255,255,0.15)',
      paddingLeft: '1em',
      color: 'rgba(255,255,255,0.5)',
      margin: '0.8em 0',
    }}>
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <table style={{
      width: '100%',
      borderCollapse: 'collapse',
      margin: '0.8em 0',
      fontSize: '0.9em',
      color: 'rgba(255,255,255,0.75)',
    }}>
      {children}
    </table>
  ),
  th: ({ children }) => (
    <th style={{
      padding: '8px 12px',
      border: '1px solid rgba(255,255,255,0.12)',
      textAlign: 'left',
      fontWeight: 600,
      background: 'rgba(255,255,255,0.05)',
      color: 'rgba(255,255,255,0.9)',
    }}>
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td style={{
      padding: '8px 12px',
      border: '1px solid rgba(255,255,255,0.12)',
    }}>
      {children}
    </td>
  ),
  code: ({ node, className, children, ...props }) => {
    const isBlock = className?.startsWith('language-')
    if (isBlock) {
      return (
        <code style={{
          fontFamily: "'SF Mono', 'Fira Code', Menlo, monospace",
          fontSize: 12,
          color: 'var(--text-code)',
          background: 'rgba(0,0,0,0.3)',
          padding: '12px 16px',
          display: 'block',
          borderRadius: 6,
          lineHeight: 1.6,
          overflowX: 'auto',
          whiteSpace: 'pre',
        }}>
          {children}
        </code>
      )
    }
    return (
      <code style={{
        fontFamily: "'SF Mono', 'Fira Code', Menlo, monospace",
        fontSize: '0.87em',
        background: 'rgba(255,255,255,0.1)',
        color: 'rgba(255,255,255,0.85)',
        padding: '2px 5px',
        borderRadius: 4,
      }} {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => (
    <div style={{
      background: 'rgba(0,0,0,0.3)',
      borderRadius: 6,
      margin: '0.8em 0',
      overflow: 'auto',
    }}>
      <pre style={{ margin: 0, padding: '12px 16px' }}>{children}</pre>
    </div>
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '1.2em 0' }} />
  ),
}
