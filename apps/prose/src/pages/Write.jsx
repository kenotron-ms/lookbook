import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PenLine, Bold, Italic, Heading1, Heading2,
  Quote, Link, Image, Plus, Code, Minus, Hash,
} from 'lucide-react'

function FloatingToolbar({ visible, position }) {
  if (!visible) return null
  const tools = [
    { icon: <Bold size={15} />, label: 'Bold' },
    { icon: <Italic size={15} />, label: 'Italic' },
    { icon: <Heading1 size={15} />, label: 'H1' },
    { icon: <Heading2 size={15} />, label: 'H2' },
    { icon: <Quote size={15} />, label: 'Quote' },
    { icon: <Link size={15} />, label: 'Link' },
    { icon: <Image size={15} />, label: 'Image' },
  ]

  return (
    <div style={{
      position: 'fixed',
      top: position.y - 48,
      left: Math.max(40, position.x - 160),
      background: '#1a1a1a',
      borderRadius: 4,
      display: 'flex',
      alignItems: 'center',
      padding: '6px 4px',
      gap: 2,
      zIndex: 200,
      boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
    }}>
      {tools.map((tool, i) => (
        <button key={i} title={tool.label} style={{
          background: 'none', border: 'none',
          color: '#ffffff', padding: '4px 8px',
          cursor: 'pointer', borderRadius: 3,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#333'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          {tool.icon}
        </button>
      ))}
      {/* Dividers between groups */}
    </div>
  )
}

function AddMediaButton({ show, position }) {
  const [open, setOpen] = useState(false)
  if (!show) return null

  const options = [
    { icon: <Image size={18} />, label: 'Insert image' },
    { icon: <Code size={18} />, label: 'Code block' },
    { icon: <Minus size={18} />, label: 'Divider' },
    { icon: <Hash size={18} />, label: 'Embed' },
  ]

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: 30, height: 30, borderRadius: '50%',
          border: '1px solid #9b9b9b', background: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#9b9b9b', transition: 'all 0.2s',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>
        <Plus size={16} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)',
          display: 'flex', gap: 8, background: '#fff',
          border: '1px solid #e0e0e0', borderRadius: 4, padding: '6px 8px',
          zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        }}>
          {options.map((opt, i) => (
            <button key={i} title={opt.label} style={{
              background: 'none', border: 'none', color: '#6b6b6b',
              cursor: 'pointer', padding: 8, borderRadius: 4,
              display: 'flex', alignItems: 'center',
            }}
              onMouseEnter={e => e.currentTarget.style.color = '#000'}
              onMouseLeave={e => e.currentTarget.style.color = '#6b6b6b'}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Write() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [showToolbar, setShowToolbar] = useState(false)
  const [toolbarPos, setToolbarPos] = useState({ x: 0, y: 0 })
  const [focusedLine, setFocusedLine] = useState(null)
  const bodyRef = useRef(null)

  const handleSelect = () => {
    const sel = window.getSelection()
    if (sel && sel.toString().length > 0) {
      const range = sel.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      setToolbarPos({ x: rect.left + rect.width / 2, y: rect.top })
      setShowToolbar(true)
    } else {
      setShowToolbar(false)
    }
  }

  const handleBodyClick = (e) => {
    const rect = bodyRef.current?.getBoundingClientRect()
    if (rect) setFocusedLine(e.clientY)
    setShowToolbar(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Write Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#ffffff', borderBottom: '1px solid #e8e8e8',
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
          <PenLine size={24} color="#000000" strokeWidth={2} />
          <span style={{ fontSize: 18, fontWeight: 800, color: '#000000', fontFamily: 'Inter, sans-serif' }}>Prose</span>
          {(title || body) && <span style={{ fontSize: 14, color: '#9b9b9b', marginLeft: 8, fontFamily: 'Inter, sans-serif' }}>Draft in Personal</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {(title || body) && (
            <span style={{ fontSize: 14, color: '#9b9b9b', fontFamily: 'Inter, sans-serif' }}>Saved just now</span>
          )}
          <button style={{
            background: 'none', border: '1px solid #e0e0e0',
            borderRadius: 9999, fontSize: 14, fontWeight: 400,
            padding: '7px 18px', cursor: 'pointer', color: '#6b6b6b',
            fontFamily: 'Inter, sans-serif',
          }}>Save draft</button>
          <button style={{
            background: '#1a8917', color: '#ffffff',
            border: 'none', borderRadius: 9999,
            fontSize: 14, fontWeight: 500,
            padding: '8px 20px', cursor: 'pointer',
            fontFamily: 'Inter, sans-serif',
          }}>Publish</button>
        </div>
      </header>

      {/* Floating toolbar */}
      <FloatingToolbar visible={showToolbar} position={toolbarPos} />

      {/* Editor area */}
      <div style={{
        maxWidth: 740, margin: '0 auto', padding: '80px 40px 120px',
        paddingTop: 104,
      }}>
        {/* Publication selector */}
        <div style={{ marginBottom: 32 }}>
          <button style={{
            background: 'none', border: '1px solid #e0e0e0',
            borderRadius: 9999, fontSize: 13, color: '#6b6b6b',
            padding: '5px 14px', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>
            + Add to publication
          </button>
        </div>

        {/* Title input */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <textarea
            value={title}
            onChange={e => setTitle(e.target.value)}
            onSelect={handleSelect}
            placeholder="Title"
            style={{
              width: '100%', border: 'none', outline: 'none',
              fontSize: 42, fontWeight: 800, color: '#000000',
              lineHeight: 1.2, resize: 'none', overflow: 'hidden',
              fontFamily: 'Inter, sans-serif', letterSpacing: '-1.5px',
              caretColor: '#1a8917',
              background: 'transparent',
              '::placeholder': { color: '#e0e0e0' },
            }}
            rows={1}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
          />
          {!title && (
            <div style={{
              position: 'absolute', top: 0, left: 0, pointerEvents: 'none',
              fontSize: 42, fontWeight: 800, color: '#e0e0e0',
              lineHeight: 1.2, fontFamily: 'Inter, sans-serif',
              letterSpacing: '-1.5px',
            }}>Title</div>
          )}
        </div>

        {/* Subtitle input */}
        <div style={{ position: 'relative', marginBottom: 32 }}>
          <textarea
            placeholder=""
            style={{
              width: '100%', border: 'none', outline: 'none',
              fontSize: 26, color: '#6b6b6b',
              lineHeight: 1.4, resize: 'none', overflow: 'hidden',
              fontFamily: 'Georgia, Times New Roman, serif',
              caretColor: '#1a8917',
              background: 'transparent',
            }}
            rows={1}
            onInput={e => {
              e.target.style.height = 'auto'
              e.target.style.height = e.target.scrollHeight + 'px'
            }}
          />
          {true && (
            <div style={{
              position: 'absolute', top: 0, left: 0, pointerEvents: 'none',
              fontSize: 26, color: '#e0e0e0',
              lineHeight: 1.4, fontFamily: 'Georgia, Times New Roman, serif',
            }}>Subtitle (optional)</div>
          )}
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: '#f0f0f0', marginBottom: 32 }} />

        {/* Body */}
        <div style={{ position: 'relative' }}>
          {/* Add media button - shown when cursor is on empty line */}
          <div style={{ position: 'absolute', left: -50, top: 4 }}>
            <AddMediaButton show={body === '' || body.endsWith('\n')} />
          </div>

          <div style={{ position: 'relative' }}>
            <textarea
              ref={bodyRef}
              value={body}
              onChange={e => setBody(e.target.value)}
              onSelect={handleSelect}
              onClick={handleBodyClick}
              placeholder=""
              style={{
                width: '100%', border: 'none', outline: 'none',
                fontSize: 21, color: '#242424',
                lineHeight: 1.75, resize: 'none',
                fontFamily: 'Georgia, Times New Roman, serif',
                minHeight: 400, caretColor: '#1a8917',
                background: 'transparent',
              }}
              onInput={e => {
                e.target.style.height = 'auto'
                e.target.style.height = e.target.scrollHeight + 'px'
              }}
            />
            {!body && (
              <div style={{
                position: 'absolute', top: 0, left: 0, pointerEvents: 'none',
                fontSize: 21, color: '#c8c8c8',
                lineHeight: 1.75, fontFamily: 'Georgia, Times New Roman, serif',
              }}>Tell your story...</div>
            )}
          </div>
        </div>

        {/* Writing tips */}
        {!title && !body && (
          <div style={{ marginTop: 64, padding: '24px', background: '#fafafa', borderRadius: 4 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: '#242424', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
              Writing tips
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                'Start with a story, not a thesis.',
                'Write your first draft without editing.',
                'A strong opening is your most important sentence.',
                'Use subheadings to guide readers through long pieces.',
              ].map((tip, i) => (
                <li key={i} style={{ fontSize: 14, color: '#6b6b6b', marginBottom: 8, fontFamily: 'Inter, sans-serif', display: 'flex', gap: 8 }}>
                  <span style={{ color: '#1a8917', fontWeight: 600 }}>→</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}