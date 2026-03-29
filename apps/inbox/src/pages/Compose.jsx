import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X, Minus, Maximize2, Send, Paperclip, Image, Link, Smile,
  MoreVertical, Trash2, Bold, Italic, Underline, List, AlignLeft, ChevronDown,
} from 'lucide-react'

export default function Compose() {
  const navigate = useNavigate()
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [bcc, setBcc] = useState('')
  const [showCcBcc, setShowCcBcc] = useState(false)
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [suggestions] = useState([
    'sarah.chen@paranet.io',
    'marcus.webb@paranet.io',
    'priya.nair@paranet.io',
    'james.liu@investors.vc',
  ])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filtered, setFiltered] = useState([])

  const handleToChange = (val) => {
    setTo(val)
    if (val.length > 0) {
      setFiltered(suggestions.filter(s => s.includes(val.toLowerCase())))
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 100,
    }}>
      <div
        className="compose-window"
        style={{
          width: 600,
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#fff',
        }}
      >
        {/* Header */}
        <div style={{
          background: '#404040',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 500 }}>New Message</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {[
              { icon: Minus, label: 'Minimize' },
              { icon: Maximize2, label: 'Expand' },
              { icon: X, label: 'Close', action: () => navigate('/') },
            ].map(({ icon: Icon, label, action }) => (
              <button
                key={label}
                onClick={action}
                title={label}
                style={{
                  width: 28, height: 28, borderRadius: 4, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
                  color: '#fff',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>

        {/* To field */}
        <div style={{ position: 'relative', borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={{ fontSize: 14, color: '#5f6368', padding: '12px 16px', width: 48, flexShrink: 0 }}>To</label>
            <input
              type="text"
              value={to}
              onChange={e => handleToChange(e.target.value)}
              onFocus={() => to && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder=""
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#202124', padding: '12px 0' }}
            />
            <button
              onClick={() => setShowCcBcc(!showCcBcc)}
              style={{ padding: '0 16px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#5f6368' }}
            >
              Cc Bcc
            </button>
          </div>

          {/* Autocomplete */}
          {showSuggestions && filtered.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
              background: '#fff', border: '1px solid #e0e0e0', borderRadius: 4,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)', overflow: 'hidden',
            }}>
              {filtered.map(s => (
                <div
                  key={s}
                  onMouseDown={() => { setTo(s); setShowSuggestions(false) }}
                  style={{ padding: '10px 16px', fontSize: 14, color: '#202124', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cc / Bcc */}
        {showCcBcc && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
              <label style={{ fontSize: 14, color: '#5f6368', padding: '10px 16px', width: 48, flexShrink: 0 }}>Cc</label>
              <input
                type="text"
                value={cc}
                onChange={e => setCc(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#202124', padding: '10px 0' }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
              <label style={{ fontSize: 14, color: '#5f6368', padding: '10px 16px', width: 48, flexShrink: 0 }}>Bcc</label>
              <input
                type="text"
                value={bcc}
                onChange={e => setBcc(e.target.value)}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 14, color: '#202124', padding: '10px 0' }}
              />
            </div>
          </>
        )}

        {/* Subject */}
        <div style={{ borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject"
            style={{
              width: '100%', border: 'none', outline: 'none', fontSize: 14,
              color: '#202124', padding: '12px 16px', fontFamily: 'inherit',
            }}
          />
        </div>

        {/* Formatting Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 2,
          padding: '6px 12px', borderBottom: '1px solid #f0f0f0',
          flexShrink: 0,
        }}>
          {[Bold, Italic, Underline].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#5f6368',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon size={16} />
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: '#e0e0e0', margin: '0 4px' }} />
          {/* Font size */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 2, padding: '4px 8px', borderRadius: 4,
            border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 13, color: '#5f6368',
          }}>
            Normal <ChevronDown size={12} />
          </button>
          <div style={{ width: 1, height: 20, background: '#e0e0e0', margin: '0 4px' }} />
          {[List, AlignLeft].map((Icon, i) => (
            <button
              key={i}
              style={{
                width: 32, height: 32, borderRadius: 4, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#5f6368',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon size={16} />
            </button>
          ))}
          <div style={{ width: 1, height: 20, background: '#e0e0e0', margin: '0 4px' }} />
          <button style={{ width: 20, height: 14, borderRadius: 2, background: '#ea4335', border: 'none', cursor: 'pointer' }} title="Text color" />
        </div>

        {/* Body */}
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder="Write your message here..."
          style={{
            flex: 1,
            minHeight: 200,
            border: 'none',
            outline: 'none',
            resize: 'none',
            padding: '12px 16px',
            fontSize: 14,
            color: '#202124',
            lineHeight: 1.6,
            fontFamily: 'inherit',
          }}
        />

        {/* Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 16px', borderTop: '1px solid #e0e0e0', flexShrink: 0,
        }}>
          {/* Send button */}
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 20,
            border: 'none', background: '#1a73e8', color: '#fff',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#1558b0'}
          onMouseLeave={e => e.currentTarget.style.background = '#1a73e8'}
          >
            <Send size={16} />
            Send
          </button>
          <div style={{ flex: 1 }} />
          {/* Action icons */}
          {[
            { icon: Paperclip, label: 'Attach file' },
            { icon: Link, label: 'Insert link' },
            { icon: Image, label: 'Insert image' },
            { icon: Smile, label: 'Insert emoji' },
            { icon: MoreVertical, label: 'More options' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              title={label}
              style={{
                width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
                color: '#5f6368',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <Icon size={18} />
            </button>
          ))}
          <button
            title="Discard draft"
            style={{
              width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center',
              justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer',
              color: '#5f6368',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
