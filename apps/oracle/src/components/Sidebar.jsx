import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Sparkles,
  PenSquare,
  ChevronDown,
  Pencil,
  Trash2,
  Settings,
  Store,
  User,
} from 'lucide-react'
import { conversationStubs } from '../data/conversations.js'

const GROUPS = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days']

export default function Sidebar({ activeConvoId, onSelectConvo, onNewChat }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [modelOpen, setModelOpen] = useState(false)
  const [hoveredId, setHoveredId] = useState(null)

  const grouped = GROUPS.reduce((acc, group) => {
    acc[group] = conversationStubs.filter((c) => c.group === group)
    return acc
  }, {})

  return (
    <div
      style={{
        width: '260px',
        minWidth: '260px',
        background: '#171717',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #383838',
        overflow: 'hidden',
      }}
    >
      {/* Top — logo + new chat */}
      <div style={{ padding: '12px 10px 8px' }}>
        {/* Logo row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
            padding: '0 6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '6px',
                background: '#10a37f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkles size={15} color="#fff" />
            </div>
            <span style={{ color: '#ececec', fontWeight: 600, fontSize: '15px' }}>Oracle</span>
          </div>
        </div>

        {/* New Chat button */}
        <button
          onClick={() => { onNewChat(); navigate('/') }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 10px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid #383838',
            borderRadius: '8px',
            color: '#ececec',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          <PenSquare size={15} />
          New chat
        </button>

        {/* Model selector */}
        <div style={{ position: 'relative', marginTop: '8px' }}>
          <button
            onClick={() => setModelOpen(!modelOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '7px 10px',
              background: 'none',
              border: '1px solid #383838',
              borderRadius: '8px',
              color: '#ececec',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <span>Oracle 4</span>
            <ChevronDown size={14} color="#9b9b9b" style={{ transform: modelOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
          {modelOpen && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 4px)',
                left: 0,
                right: 0,
                background: '#2f2f2f',
                border: '1px solid #383838',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: 10,
              }}
            >
              {['Oracle 4', 'Oracle 3.5', 'Oracle 3 Mini'].map((m) => (
                <button
                  key={m}
                  onClick={() => setModelOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '9px 12px',
                    background: 'none',
                    border: 'none',
                    color: m === 'Oracle 4' ? '#10a37f' : '#ececec',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontWeight: m === 'Oracle 4' ? 600 : 400,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Conversation list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 8px' }}>
        {GROUPS.map((group) => {
          const convos = grouped[group]
          if (!convos.length) return null
          return (
            <div key={group} style={{ marginBottom: '4px' }}>
              <p
                style={{
                  fontSize: '11px',
                  color: '#9b9b9b',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  padding: '10px 8px 4px',
                }}
              >
                {group}
              </p>
              {convos.map((c) => (
                <div
                  key={c.id}
                  className="convo-item"
                  onClick={() => { onSelectConvo(c.id); navigate('/') }}
                  onMouseEnter={() => setHoveredId(c.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '7px 8px',
                    cursor: 'pointer',
                    background: activeConvoId === c.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      color: activeConvoId === c.id ? '#ececec' : '#c5c5c5',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      flex: 1,
                    }}
                  >
                    {c.title}
                  </span>
                  <div
                    className="convo-actions"
                    style={{
                      display: hoveredId === c.id ? 'flex' : 'none',
                      alignItems: 'center',
                      gap: '2px',
                      flexShrink: 0,
                      marginLeft: '4px',
                    }}
                  >
                    <button
                      onClick={(e) => { e.stopPropagation() }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9b9b9b',
                        padding: '2px 3px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation() }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9b9b9b',
                        padding: '2px 3px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#e74c3c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Bottom: Store + Settings + User */}
      <div style={{ borderTop: '1px solid #383838', padding: '8px' }}>
        <button
          onClick={() => navigate('/store')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 10px',
            background: location.pathname === '/store' ? 'rgba(255,255,255,0.07)' : 'none',
            border: 'none',
            borderRadius: '8px',
            color: '#c5c5c5',
            cursor: 'pointer',
            fontSize: '13px',
            marginBottom: '2px',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = location.pathname === '/store' ? 'rgba(255,255,255,0.07)' : 'none'}
        >
          <Store size={16} />
          Model Store
        </button>

        <button
          onClick={() => navigate('/settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            padding: '8px 10px',
            background: location.pathname === '/settings' ? 'rgba(255,255,255,0.07)' : 'none',
            border: 'none',
            borderRadius: '8px',
            color: '#c5c5c5',
            cursor: 'pointer',
            fontSize: '13px',
            marginBottom: '4px',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = location.pathname === '/settings' ? 'rgba(255,255,255,0.07)' : 'none'}
        >
          <Settings size={16} />
          Settings
        </button>

        {/* User row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 10px',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: '#10a37f',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <User size={14} color="#fff" />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '13px', color: '#ececec', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              ken@paranet.ai
            </div>
            <div style={{ fontSize: '11px', color: '#9b9b9b' }}>Oracle Pro</div>
          </div>
        </div>
      </div>
    </div>
  )
}
