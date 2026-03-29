import { useState, useRef, useEffect } from 'react'
import { GripVertical, Plus, Code2, Quote, Lightbulb, Minus, List, ListOrdered, Heading1, Heading2, AlignLeft, Hash } from 'lucide-react'

const BLOCK_TYPES = [
  { type: 'paragraph', icon: AlignLeft, label: 'Text', shortcut: 'p' },
  { type: 'h1', icon: Heading1, label: 'Heading 1', shortcut: 'h1' },
  { type: 'h2', icon: Heading2, label: 'Heading 2', shortcut: 'h2' },
  { type: 'h3', icon: Hash, label: 'Heading 3', shortcut: 'h3' },
  { type: 'bullet', icon: List, label: 'Bulleted List', shortcut: '-' },
  { type: 'numbered', icon: ListOrdered, label: 'Numbered List', shortcut: '1.' },
  { type: 'code', icon: Code2, label: 'Code', shortcut: '```' },
  { type: 'quote', icon: Quote, label: 'Quote', shortcut: '"' },
  { type: 'callout', icon: Lightbulb, label: 'Callout', shortcut: '!!' },
  { type: 'divider', icon: Minus, label: 'Divider', shortcut: '---' },
]

const INITIAL_BLOCKS = [
  { id: 1, type: 'h1', content: 'Feature Specifications' },
  { id: 2, type: 'h2', content: 'Overview' },
  { id: 3, type: 'paragraph', content: 'This document outlines the technical and product specifications for the upcoming feature release. It covers requirements, implementation details, and acceptance criteria for the development team.' },
  { id: 4, type: 'h2', content: 'Requirements' },
  { id: 5, type: 'bullet', content: 'User authentication must support OAuth 2.0 and SAML 2.0 providers' },
  { id: 6, type: 'bullet', content: 'Session tokens expire after 24 hours with sliding window refresh' },
  { id: 7, type: 'bullet', content: 'All API endpoints require rate limiting at 1000 req/min per user' },
  { id: 8, type: 'numbered', content: 'Initialize the authentication service with provider config' },
  { id: 9, type: 'numbered', content: 'Register callback URLs for each OAuth provider' },
  { id: 10, type: 'numbered', content: 'Implement token refresh logic in the middleware layer' },
  { id: 11, type: 'numbered', content: 'Add audit logging for all authentication events' },
  { id: 12, type: 'quote', content: 'The best security is the one that the user never notices — invisible, effective, and always present.' },
  { id: 13, type: 'h2', content: 'Technical Notes' },
  { id: 14, type: 'code', content: `// Auth middleware
async function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  
  const payload = await verifyJWT(token)
  req.user = payload
  next()
}` },
  { id: 15, type: 'divider', content: '' },
  { id: 16, type: 'callout', content: 'Remember to update the API documentation and notify the mobile team when changes to the auth flow are deployed to staging.' },
]

function SlashMenu({ onSelect, onClose }) {
  const [query, setQuery] = useState('')
  const filtered = BLOCK_TYPES.filter(b =>
    b.label.toLowerCase().includes(query.toLowerCase()) ||
    b.type.includes(query.toLowerCase())
  )

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div style={{
      position: 'absolute',
      top: '100%',
      left: 0,
      zIndex: 100,
      background: '#1e1e1e',
      border: '1px solid #3d3d3d',
      borderRadius: 8,
      width: 280,
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      overflow: 'hidden',
    }}>
      <div style={{ padding: '8px 12px', borderBottom: '1px solid #2d2d2d' }}>
        <input
          autoFocus
          placeholder="Search block types..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            background: 'transparent', border: 'none', outline: 'none',
            color: '#e6e6e6', fontSize: 13, width: '100%',
          }}
        />
      </div>
      <div style={{ maxHeight: 280, overflowY: 'auto', padding: '4px 0' }}>
        {filtered.length === 0 && (
          <div style={{ padding: '8px 12px', color: '#555', fontSize: 13 }}>No results</div>
        )}
        {filtered.map(bt => {
          const Icon = bt.icon
          return (
            <div
              key={bt.type}
              onClick={() => onSelect(bt.type)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '7px 12px', cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2d2d2d'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 4,
                background: '#252525', border: '1px solid #3d3d3d',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={13} color="#9333ea" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#e6e6e6' }}>{bt.label}</div>
              </div>
              <span style={{ fontSize: 11, color: '#555', fontFamily: 'monospace', background: '#252525', padding: '1px 5px', borderRadius: 3 }}>
                {bt.shortcut}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Block({ block, index }) {
  const [hovered, setHovered] = useState(false)
  const [showSlash, setShowSlash] = useState(false)
  const containerRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === '/') {
      setTimeout(() => setShowSlash(true), 50)
    }
  }

  const renderContent = () => {
    switch (block.type) {
      case 'h1':
        return (
          <h1
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 26, fontWeight: 700, color: '#e6e6e6',
              outline: 'none', lineHeight: 1.3, width: '100%',
            }}
          >
            {block.content}
          </h1>
        )
      case 'h2':
        return (
          <h2
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 20, fontWeight: 600, color: '#e6e6e6',
              outline: 'none', lineHeight: 1.4, width: '100%',
              marginTop: 8,
            }}
          >
            {block.content}
          </h2>
        )
      case 'h3':
        return (
          <h3
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 16, fontWeight: 600, color: '#e6e6e6',
              outline: 'none', lineHeight: 1.4, width: '100%',
            }}
          >
            {block.content}
          </h3>
        )
      case 'bullet':
        return (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', width: '100%' }}>
            <span style={{ marginTop: 6, width: 5, height: 5, borderRadius: '50%', background: '#9333ea', flexShrink: 0 }} />
            <div
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              style={{ fontSize: 14, color: '#d4d4d4', outline: 'none', lineHeight: 1.6, flex: 1 }}
            >
              {block.content}
            </div>
          </div>
        )
      case 'numbered':
        return (
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', width: '100%' }}>
            <span style={{ marginTop: 1, minWidth: 20, color: '#9333ea', fontSize: 14, fontWeight: 600 }}>{index + 1}.</span>
            <div
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              style={{ fontSize: 14, color: '#d4d4d4', outline: 'none', lineHeight: 1.6, flex: 1 }}
            >
              {block.content}
            </div>
          </div>
        )
      case 'quote':
        return (
          <div style={{
            display: 'flex', gap: 0, width: '100%',
            borderLeft: '3px solid #9333ea',
          }}>
            <div
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              style={{
                fontSize: 15, color: '#aaa', fontStyle: 'italic',
                outline: 'none', lineHeight: 1.7, paddingLeft: 16,
              }}
            >
              {block.content}
            </div>
          </div>
        )
      case 'code':
        return (
          <div style={{
            width: '100%',
            background: '#0d0d0d',
            border: '1px solid #2d2d2d',
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 14px',
              background: '#161616',
              borderBottom: '1px solid #2d2d2d',
            }}>
              <Code2 size={12} color="#9333ea" />
              <span style={{ fontSize: 11, color: '#555', fontFamily: 'monospace' }}>javascript</span>
            </div>
            <pre
              contentEditable
              suppressContentEditableWarning
              style={{
                fontSize: 12.5, fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                color: '#cdd6f4', outline: 'none',
                padding: '14px 16px',
                lineHeight: 1.65,
                overflowX: 'auto',
                margin: 0,
              }}
            >
              {block.content}
            </pre>
          </div>
        )
      case 'callout':
        return (
          <div style={{
            display: 'flex', gap: 12, width: '100%',
            background: '#1e1a2e',
            border: '1px solid #3d2d5e',
            borderRadius: 6,
            padding: '12px 16px',
          }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
            <div
              contentEditable
              suppressContentEditableWarning
              onKeyDown={handleKeyDown}
              style={{
                fontSize: 14, color: '#c4b5fd',
                outline: 'none', lineHeight: 1.6, flex: 1,
              }}
            >
              {block.content}
            </div>
          </div>
        )
      case 'divider':
        return (
          <div style={{
            width: '100%', height: 1,
            background: '#2d2d2d',
            margin: '8px 0',
          }} />
        )
      default:
        return (
          <div
            contentEditable
            suppressContentEditableWarning
            onKeyDown={handleKeyDown}
            style={{
              fontSize: 14, color: '#d4d4d4',
              outline: 'none', lineHeight: 1.7, width: '100%',
            }}
          >
            {block.content || <span style={{ color: '#444' }}>Type '/' for commands...</span>}
          </div>
        )
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setShowSlash(false) }}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 4,
        padding: '3px 0',
        borderRadius: 4,
        background: hovered ? '#1e1e1e' : 'transparent',
        transition: 'background 0.1s',
      }}
    >
      {/* Left controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.15s',
        flexShrink: 0,
        paddingTop: block.type === 'h1' ? 6 : block.type === 'h2' ? 4 : 3,
      }}>
        <button
          title="Add block"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: '#666', padding: 2, borderRadius: 3, display: 'flex',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2d2d2d'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Plus size={13} />
        </button>
        <button
          title="Drag to move"
          style={{
            background: 'transparent', border: 'none', cursor: 'grab',
            color: '#666', padding: 2, borderRadius: 3, display: 'flex',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#2d2d2d'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <GripVertical size={13} />
        </button>
      </div>

      {/* Block content */}
      <div style={{ flex: 1, position: 'relative', minWidth: 0 }}>
        {renderContent()}
        {showSlash && (
          <SlashMenu
            onSelect={(type) => {
              setShowSlash(false)
            }}
            onClose={() => setShowSlash(false)}
          />
        )}
      </div>
    </div>
  )
}

export default function PageEditor() {
  const [blocks] = useState(INITIAL_BLOCKS)
  const [titleHovered, setTitleHovered] = useState(false)

  // Renumber only numbered list items
  let numberedCount = 0
  const numberedIndexes = {}
  blocks.forEach((b, i) => {
    if (b.type === 'numbered') {
      numberedCount++
      numberedIndexes[b.id] = numberedCount
    } else {
      numberedCount = 0
    }
  })

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 60px 120px' }}>
      {/* Page icon */}
      <div
        style={{
          fontSize: 52, marginBottom: 12, cursor: 'pointer', display: 'inline-block',
          padding: '4px 6px', borderRadius: 6,
        }}
        onMouseEnter={e => e.currentTarget.style.background = '#252525'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        title="Change icon"
      >
        🎯
      </div>

      {/* Page title */}
      <div
        onMouseEnter={() => setTitleHovered(true)}
        onMouseLeave={() => setTitleHovered(false)}
        style={{ marginBottom: 32 }}
      >
        <div
          contentEditable
          suppressContentEditableWarning
          style={{
            fontSize: 36, fontWeight: 800, color: '#e6e6e6',
            outline: 'none', lineHeight: 1.2,
            borderBottom: titleHovered ? '1px solid #3d3d3d' : '1px solid transparent',
            paddingBottom: 6,
            transition: 'border-color 0.15s',
          }}
        >
          Feature Specs
        </div>
        {titleHovered && (
          <div style={{ display: 'flex', gap: 16, marginTop: 10, flexWrap: 'wrap' }}>
            {[
              { label: 'Add cover' },
              { label: 'Add icon' },
              { label: 'Add comment' },
            ].map(a => (
              <button
                key={a.label}
                style={{
                  background: 'transparent', border: 'none',
                  color: '#555', fontSize: 12, cursor: 'pointer', padding: 0,
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#888'}
                onMouseLeave={e => e.currentTarget.style.color = '#555'}
              >
                {a.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {blocks.map((block, i) => (
          <Block
            key={block.id}
            block={block}
            index={block.type === 'numbered' ? (numberedIndexes[block.id] - 1) : i}
          />
        ))}
      </div>

      {/* New block prompt */}
      <div
        style={{
          marginTop: 16,
          padding: '8px 0',
          color: '#444',
          fontSize: 13,
          cursor: 'text',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#666'}
        onMouseLeave={e => e.currentTarget.style.color = '#444'}
      >
        Click to add a block, or press '/' for commands...
      </div>
    </div>
  )
}
