import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Sparkles, ChevronDown } from 'lucide-react'
import { MODELS, DEFAULT_MODEL } from '../db/seed.js'

export default function InputBar({ onSend, disabled = false, placeholder = 'Message Sage...' }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [currentModel, setCurrentModel] = useState(
    MODELS.find((m) => m.id === DEFAULT_MODEL) || MODELS[0]
  )
  const [modelOpen, setModelOpen] = useState(false)
  const textareaRef = useRef(null)

  const hasText = text.trim().length > 0

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const handleChange = (e) => {
    setText(e.target.value)
    // Auto-resize
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 200) + 'px'
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  const submit = () => {
    if (!hasText || disabled) return
    onSend(text.trim())
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.focus()
    }
  }

  return (
    <div style={{
      padding: '12px 24px 20px',
      background: 'linear-gradient(to bottom, transparent, var(--bg) 30%)',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Input box */}
      <div
        style={{
          width: '100%',
          maxWidth: 680,
          background: 'var(--bg-input)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: focused ? 'var(--shadow-input-focus)' : 'var(--shadow-input)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          transition: 'box-shadow 0.15s',
        }}
      >
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={1}
          style={{
            width: '100%',
            resize: 'none',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '14px 16px 8px',
            fontSize: 15,
            lineHeight: 1.5,
            color: 'var(--text-primary)',
            minHeight: 52,
            maxHeight: 200,
            overflow: 'auto',
            display: 'block',
            opacity: disabled ? 0.6 : 1,
          }}
        />

        {/* Bottom toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px 10px',
        }}>
          {/* Left: model selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setModelOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 5,
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'none',
                fontSize: 13,
                color: 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              <Sparkles size={13} />
              {currentModel.label}
              <ChevronDown size={11} />
            </button>

            {/* Model dropdown */}
            {modelOpen && (
              <ModelDropdown
                models={MODELS}
                current={currentModel}
                onSelect={(m) => { setCurrentModel(m); setModelOpen(false) }}
                onClose={() => setModelOpen(false)}
              />
            )}
          </div>

          {/* Right: send button */}
          <button
            onClick={submit}
            disabled={!hasText || disabled}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: hasText && !disabled ? 'var(--text-primary)' : 'var(--border)',
              border: 'none',
              cursor: hasText && !disabled ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
          >
            <ArrowUp
              size={16}
              color={hasText && !disabled ? 'var(--bg)' : 'var(--text-muted)'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

function ModelDropdown({ models, current, onSelect, onClose }) {
  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('[data-model-dropdown]')) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      data-model-dropdown=""
      style={{
        position: 'absolute',
        bottom: 'calc(100% + 6px)',
        left: 0,
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-md)',
        minWidth: 200,
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {models.map((m) => (
        <ModelOption
          key={m.id}
          model={m}
          isSelected={m.id === current.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}

function ModelOption({ model, isSelected, onSelect }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={() => onSelect(model)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '100%',
        padding: '8px 12px',
        border: 'none',
        background: hover ? 'var(--bg-hover)' : 'transparent',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        transition: 'background 0.1s',
      }}
    >
      <span style={{
        fontSize: 13,
        fontWeight: isSelected ? 600 : 400,
        color: 'var(--text-primary)',
      }}>
        {model.label}
      </span>
      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
        {model.description}
      </span>
    </button>
  )
}
