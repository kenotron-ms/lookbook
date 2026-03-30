import { useState, useRef, useEffect } from 'react'
import {
  ArrowUp, ChevronDown, Plus, Globe, Paperclip, Mic,
  Camera, FolderPlus, Github, Zap, PlugZap, Pen,
  MessageSquare, Search, Check, Square,
} from 'lucide-react'

// ── Tool menu definition ───────────────────────────────────────────────────
const TOOL_MENU = [
  { id: 'add_files',   icon: Paperclip,      label: 'Add files or photos', shortcut: '⌘U',  type: 'action' },
  { id: 'screenshot',  icon: Camera,         label: 'Take a screenshot',                    type: 'action' },
  { id: 'add_project', icon: FolderPlus,     label: 'Add to project',                       type: 'action' },
  { id: 'github',      icon: Github,         label: 'Add from GitHub',                      type: 'submenu', separator_after: true },
  { id: 'skills',      icon: Zap,            label: 'Skills',                               type: 'submenu' },
  { id: 'connectors',  icon: PlugZap,        label: 'Connectors',                           type: 'submenu', separator_after: true },
  { id: 'ask_ms',      icon: MessageSquare,  label: 'Ask Microsoft',                        type: 'toggle' },
  { id: 'research',    icon: Search,         label: 'Research',                             type: 'toggle' },
  { id: 'web_search',  icon: Globe,          label: 'Web search',                           type: 'toggle', separator_after: true },
  { id: 'use_style',   icon: Pen,            label: 'Use style',                            type: 'submenu' },
]

// ── InputBar ───────────────────────────────────────────────────────────────
export default function InputBar({ onSend, disabled = false, placeholder = 'How can I help you?' }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTools, setActiveTools] = useState(new Set(['web_search']))
  const [modelOpen, setModelOpen] = useState(false)

  const textareaRef = useRef(null)
  const menuRef = useRef(null)
  const modelRef = useRef(null)

  const hasText = text.trim().length > 0

  // Focus textarea on mount
  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  // Close + menu on outside click
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  // Close model dropdown on outside click
  useEffect(() => {
    if (!modelOpen) return
    const handler = (e) => {
      if (modelRef.current && !modelRef.current.contains(e.target)) setModelOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [modelOpen])

  const handleChange = (e) => {
    setText(e.target.value)
    const ta = e.target
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
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

  const toggleTool = (id) => {
    setActiveTools(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div style={{
      padding: '12px 24px 20px',
      background: 'linear-gradient(to bottom, transparent, #F8F8F6 30%)',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* ── Input box ── */}
      <div style={{
        width: '100%',
        maxWidth: 800,
        background: '#FFFFFF',
        borderRadius: 16,
        boxShadow: focused
          ? '0 0 0 2px rgba(200,95,71,0.15), 0 4px 12px rgba(0,0,0,0.05)'
          : '0 4px 12px rgba(0,0,0,0.05)',
        border: '1px solid #E0E0E0',
        overflow: 'visible',
        transition: 'box-shadow 0.15s',
        position: 'relative',
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
            padding: '16px 16px 8px',
            fontSize: 15,
            lineHeight: 1.5,
            color: '#1A1A1A',
            minHeight: 52,
            maxHeight: 160,
            overflow: 'auto',
            display: 'block',
            opacity: disabled ? 0.6 : 1,
            boxSizing: 'border-box',
            fontFamily: 'inherit',
            borderRadius: '16px 16px 0 0',
          }}
        />

        {/* ── Bottom toolbar ── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '6px 10px 10px',
          gap: 6,
        }}>

          {/* Left: + button */}
          <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                width: 32, height: 32, borderRadius: '50%',
                border: 'none',
                background: menuOpen ? '#E0E0E0' : '#F2F2F2',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#3D3D3D',
                transition: 'background 0.1s',
                flexShrink: 0,
              }}
              onMouseEnter={e => { if (!menuOpen) e.currentTarget.style.background = '#E8E8E8' }}
              onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.background = '#F2F2F2' }}
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>

            {/* + Menu popover */}
            {menuOpen && (
              <div style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                left: 0,
                background: '#FFFFFF',
                border: '1px solid #E8E8E8',
                borderRadius: 12,
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                minWidth: 280,
                zIndex: 300,
                overflow: 'hidden',
                padding: '4px 0',
              }}>
                {TOOL_MENU.map((item, i) => (
                  <ToolMenuItem
                    key={item.id}
                    item={item}
                    isActive={activeTools.has(item.id)}
                    onToggle={() => item.type === 'toggle' && toggleTool(item.id)}
                    onAction={() => item.type !== 'toggle' && setMenuOpen(false)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Center: Model selector */}
          <div ref={modelRef} style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <button
              onClick={() => setModelOpen(o => !o)}
              style={{
                display: 'flex', alignItems: 'center', gap: 4,
                padding: '4px 8px',
                borderRadius: 8,
                border: 'none',
                background: 'none',
                fontSize: 14,
                color: '#1A1A1A',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F2F2F2' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none' }}
            >
              Sonnet 4.6 Extended
              <ChevronDown size={13} style={{ color: '#707070' }} />
            </button>
          </div>

          {/* Right: Voice button */}
          <button
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: 'none', background: '#F2F2F2',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#707070',
              transition: 'background 0.1s',
              flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8E8E8' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F2F2F2' }}
          >
            <Mic size={15} />
          </button>

          {/* Far right: Send button */}
          <button
            onClick={submit}
            disabled={!hasText || disabled}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              background: hasText && !disabled ? '#1A1A1A' : '#E0E0E0',
              border: 'none',
              cursor: hasText && !disabled ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
              flexShrink: 0,
            }}
          >
            <ArrowUp
              size={16}
              color={hasText && !disabled ? '#FFFFFF' : '#9CA3AF'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

// ── ToolMenuItem ───────────────────────────────────────────────────────────
function ToolMenuItem({ item, isActive, onToggle, onAction }) {
  const [hover, setHover] = useState(false)
  const Icon = item.icon
  const isBlue = item.type === 'toggle' && isActive

  return (
    <>
      <button
        onClick={() => {
          if (item.type === 'toggle') onToggle()
          else onAction()
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          width: '100%',
          padding: '10px 16px',
          border: 'none',
          background: hover ? '#F5F5F5' : 'transparent',
          cursor: 'pointer',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          transition: 'background 0.1s',
        }}
      >
        {/* Icon */}
        <Icon size={16} style={{ color: isBlue ? '#2563EB' : '#5F5F63', flexShrink: 0 }} />

        {/* Label */}
        <span style={{
          flex: 1,
          fontSize: 14,
          color: isBlue ? '#2563EB' : '#1A1A1A',
          fontWeight: 400,
        }}>
          {item.label}
        </span>

        {/* Right decoration */}
        {item.shortcut && (
          <span style={{ fontSize: 12, color: '#9CA3AF' }}>{item.shortcut}</span>
        )}
        {item.type === 'submenu' && (
          <ChevronDown
            size={13}
            style={{ color: '#9CA3AF', transform: 'rotate(-90deg)' }}
          />
        )}
        {item.type === 'toggle' && isActive && (
          <Check size={15} style={{ color: '#2563EB' }} />
        )}
        {item.type === 'toggle' && !isActive && (
          <Square size={14} style={{ color: '#D1D5DB' }} />
        )}
      </button>

      {/* Separator */}
      {item.separator_after && (
        <div style={{
          height: 1,
          background: '#F0F0F0',
          margin: '4px 0',
        }} />
      )}
    </>
  )
}
