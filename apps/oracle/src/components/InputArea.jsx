import { useState, useRef } from 'react'
import { Send, Paperclip, Image } from 'lucide-react'

export default function InputArea({ onSend, disabled }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const submit = () => {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleInput = (e) => {
    setText(e.target.value)
    // Auto-grow
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 180) + 'px'
  }

  const hasText = text.trim().length > 0

  return (
    <div style={{ padding: '12px 16px 20px', background: '#212121' }}>
      <div
        style={{
          maxWidth: '760px',
          margin: '0 auto',
          background: '#2f2f2f',
          borderRadius: '16px',
          border: '1px solid #383838',
          padding: '10px 12px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Left icons */}
        <div style={{ display: 'flex', gap: '2px', paddingBottom: '2px' }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9b9b9b',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
            title="Attach file"
          >
            <Paperclip size={17} />
          </button>
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9b9b9b',
              padding: '6px',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
            title="Add image"
          >
            <Image size={17} />
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Message Oracle..."
          rows={1}
          style={{
            flex: 1,
            minHeight: '24px',
            maxHeight: '180px',
            overflowY: 'auto',
            lineHeight: '1.5',
            paddingTop: '4px',
          }}
        />

        {/* Send button */}
        <button
          onClick={submit}
          disabled={!hasText || disabled}
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: hasText && !disabled ? 'pointer' : 'default',
            background: hasText && !disabled ? '#10a37f' : '#383838',
            color: hasText && !disabled ? '#fff' : '#9b9b9b',
            transition: 'background 0.2s, color 0.2s',
            flexShrink: 0,
            marginBottom: '2px',
          }}
        >
          <Send size={15} />
        </button>
      </div>
      <p style={{ textAlign: 'center', fontSize: '11px', color: '#9b9b9b', marginTop: '8px' }}>
        Oracle can make mistakes. Verify important information.
      </p>
    </div>
  )
}
