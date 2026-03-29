import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function highlight(code) {
  // Simple syntax highlighting via span wrapping
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  return escaped
    // Comments
    .replace(/(\/\/.*?)(\n|$)/g, '<span class="code-comment">$1</span>$2')
    // Strings (double and single quote)
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span class="code-string">$1</span>')
    // Keywords
    .replace(/\b(import|export|default|from|const|let|var|function|return|if|else|switch|case|break|new|class|extends|typeof|async|await|try|catch|for|of|in|while|do)\b/g, '<span class="code-keyword">$1</span>')
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="code-num">$1</span>')
    // JSX tags
    .replace(/(&lt;\/?[A-Z][A-Za-z0-9]*)/g, '<span class="code-tag">$1</span>')
}

export default function CodeBlock({ language, content }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      style={{
        background: '#1e1e2e',
        border: '1px solid #383838',
        borderRadius: '8px',
        marginTop: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderBottom: '1px solid #383838',
          background: 'rgba(255,255,255,0.03)',
        }}
      >
        <span style={{ fontSize: '12px', color: '#9b9b9b', fontFamily: 'monospace' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            color: copied ? '#10a37f' : '#9b9b9b',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px 4px',
            borderRadius: '4px',
            transition: 'color 0.2s',
          }}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      {/* Code */}
      <pre
        style={{
          margin: 0,
          padding: '16px',
          overflowX: 'auto',
          fontSize: '13px',
          lineHeight: '1.7',
          fontFamily: "'Fira Code', 'Cascadia Code', 'Courier New', monospace",
          color: '#d4d4d4',
        }}
        dangerouslySetInnerHTML={{ __html: highlight(content) }}
      />
    </div>
  )
}
