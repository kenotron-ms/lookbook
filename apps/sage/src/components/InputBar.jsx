import { useState, useRef, useEffect } from 'react'
import { ArrowUp, Sparkles, ChevronDown, Plus, Globe, Terminal, Paperclip, X as XIcon } from 'lucide-react'
import { MODELS, DEFAULT_MODEL } from '../db/seed.js'

const TOOLS = [
  { id: 'web_search',  icon: Globe,     label: 'Web search',  desc: 'Search the internet for current info' },
  { id: 'code_exec',  icon: Terminal,  label: 'Run code',    desc: 'Execute Python, JS, or bash' },
  { id: 'file_upload', icon: Paperclip, label: 'Attach file', desc: 'Upload a PDF, doc, image, or CSV' },
]

export default function InputBar({ onSend, disabled = false, placeholder = 'Message Sage...' }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [currentModel, setCurrentModel] = useState(
    MODELS.find((m) => m.id === DEFAULT_MODEL) || MODELS[0]
  )
  const [modelOpen, setModelOpen] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [activeTool, setActiveTool] = useState(null)

  const textareaRef = useRef(null)
  const toolsRef = useRef(null)

  const hasText = text.trim().length > 0

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Close tools popover on outside click
  useEffect(() => {
    if (!toolsOpen) return
    const handler = (e) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [toolsOpen])

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

  const handleToolSelect = (tool) => {
    setActiveTool(tool)
    setToolsOpen(false)
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
      <div style={{
        width: '100%',
        maxWidth: 680,
        background: 'var(--bg-input)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: focused ? 'var(--shadow-input-focus)' : 'var(--shadow-input)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        transition: 'box-shadow 0.15s',
      }}>
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

        {/* Active tool chip — between textarea and toolbar */}
        {activeTool && (
          <ActiveToolChip tool={activeTool} onClear={() => setActiveTool(null)} />
        )}

        {/* Bottom toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '6px 10px 10px',
        }}>
          {/* Left: "+" tool button + model selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>

            {/* Tool menu button */}
            <div ref={toolsRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setToolsOpen(o => !o)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 'var(--radius-sm)',
                  border: toolsOpen ? '1px solid var(--border)' : '1px solid transparent',
                  background: toolsOpen ? 'var(--bg-hover)' : 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: 20,
                  fontWeight: 300,
                  lineHeight: 1,
                  transition: 'all 0.15s',
                }}
              >
                <Plus size={16} />
              </button>

              {/* Tool popover */}
              {toolsOpen && (
                <div style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  left: 0,
                  background: 'var(--bg-input)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  minWidth: 220,
                  zIndex: 200,
                  overflow: 'hidden',
                }}>
                  {TOOLS.map(tool => (
                    <ToolMenuItem key={tool.id} tool={tool} onSelect={handleToolSelect} />
                  ))}
                </div>
              )}
            </div>

            {/* Model selector */}
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

function ActiveToolChip({ tool, onClear }) {
  const Icon = tool.icon
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '3px 8px 3px 6px',
      margin: '0 16px 8px',
      borderRadius: '100px',
      background: 'var(--accent-subtle)',
      border: '1px solid var(--accent-dim)',
      fontSize: 12,
      color: 'var(--accent)',
      width: 'fit-content',
    }}>
      <Icon size={11} />
      {tool.label}
      <button
        onClick={onClear}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--accent)',
          display: 'flex',
          padding: 0,
        }}
      >
        <XIcon size={11} />
      </button>
    </div>
  )
}

function ToolMenuItem({ tool, onSelect }) {
  const Icon = tool.icon
  return (
    <button
      onClick={() => onSelect(tool)}
      style={{
        width: '100%',
        padding: '10px 14px',
        border: 'none',
        background: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)' }}
      onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
    >
      <Icon size={15} style={{ color: 'var(--text-secondary)', flexShrink: 0 }} />
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{tool.label}</div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tool.desc}</div>
      </div>
    </button>
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
