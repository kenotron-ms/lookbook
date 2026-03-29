import { useState } from 'react'
import { Hash, Users, Search, Inbox, HelpCircle, Plus, Smile, Gift, Sticker, AtSign, Smile as SmileIcon } from 'lucide-react'
import { messages, users } from '../data/server'

function getUserById(id) {
  return users.find(u => u.id === id) || { username: 'Unknown', avatar: '?', avatarColor: '#36393f', color: '#dbdee1' }
}

function Avatar({ user, size = 40 }) {
  return (
    <div style={{
      width: size, height: size,
      borderRadius: '50%',
      background: user.avatarColor,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.3, fontWeight: 700, color: '#fff',
      flexShrink: 0,
      alignSelf: 'flex-start',
    }}>
      {user.avatar}
    </div>
  )
}

function ReactionPill({ emoji, count }) {
  const [active, setActive] = useState(false)
  return (
    <button
      onClick={() => setActive(!active)}
      className="reaction-pill"
      style={{
        background: active ? '#3c3249' : '#2b2d31',
        borderColor: active ? '#7c3aed' : '#3f4147',
        color: active ? '#c4b5fd' : '#dbdee1',
      }}
    >
      <span>{emoji}</span>
      <span style={{ fontSize: '12px', fontWeight: 600, color: active ? '#c4b5fd' : '#80848e' }}>{count}</span>
    </button>
  )
}

function CodeBlock({ code }) {
  return (
    <pre style={{
      background: '#1e1f22',
      borderRadius: '6px',
      padding: '12px 16px',
      fontFamily: "'Consolas', 'Monaco', monospace",
      fontSize: '13px',
      lineHeight: 1.6,
      overflowX: 'auto',
      marginTop: '4px',
      borderLeft: '4px solid #7c3aed',
      color: '#dbdee1',
      whiteSpace: 'pre',
    }}>
      {code}
    </pre>
  )
}

function ImageAttachment() {
  return (
    <div style={{
      marginTop: '8px',
      width: '300px',
      height: '180px',
      borderRadius: '8px',
      background: 'linear-gradient(135deg, #7c3aed, #1d4ed8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'rgba(255,255,255,0.6)',
      fontSize: '13px',
    }}>
      relay-handler-diagram.png
    </div>
  )
}

function MessageGroup({ msg, isGrouped }) {
  const [hovered, setHovered] = useState(false)
  const user = getUserById(msg.userId)

  return (
    <div
      className="message-row"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        gap: '16px',
        padding: isGrouped ? '2px 16px 2px 16px' : '8px 16px 4px 16px',
        position: 'relative',
        minHeight: isGrouped ? '22px' : 'auto',
      }}
    >
      {/* Avatar or timestamp spacer */}
      {isGrouped ? (
        <div style={{ width: '40px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {hovered && (
            <span style={{ fontSize: '10px', color: '#80848e', whiteSpace: 'nowrap' }}>
              {msg.timestamp.split('at ')[1]}
            </span>
          )}
        </div>
      ) : (
        <Avatar user={user} />
      )}

      {/* Message content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {!isGrouped && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontWeight: 600, fontSize: '15px', color: user.color, cursor: 'pointer' }}>
              {user.username}
            </span>
            {user.role === 'Admin' && (
              <span style={{
                fontSize: '10px', fontWeight: 700, color: '#f0b232',
                background: 'rgba(240,178,50,0.15)', padding: '1px 5px',
                borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.3px'
              }}>Admin</span>
            )}
            {user.role === 'Moderator' && (
              <span style={{
                fontSize: '10px', fontWeight: 700, color: '#5865f2',
                background: 'rgba(88,101,242,0.15)', padding: '1px 5px',
                borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.3px'
              }}>Mod</span>
            )}
            <span style={{ fontSize: '12px', color: '#80848e' }}>{msg.timestamp}</span>
          </div>
        )}

        <div style={{ fontSize: '15px', color: '#dbdee1', lineHeight: 1.5, wordBreak: 'break-word' }}>
          {msg.content}
        </div>

        {msg.code && <CodeBlock code={msg.code} />}
        {msg.hasImage && <ImageAttachment />}

        {msg.reactions && msg.reactions.length > 0 && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '6px', flexWrap: 'wrap' }}>
            {msg.reactions.map((r, i) => (
              <ReactionPill key={i} emoji={r.emoji} count={r.count} />
            ))}
          </div>
        )}
      </div>

      {/* Hover action bar */}
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-14px',
          right: '16px',
          background: '#2b2d31',
          border: '1px solid #3f4147',
          borderRadius: '6px',
          display: 'flex',
          gap: '2px',
          padding: '3px',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        }}>
          {['😀', '👍', '💬', '✏️', '⋯'].map((action, i) => (
            <button
              key={i}
              style={{
                width: '28px', height: '28px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '4px',
                fontSize: '14px',
                color: '#80848e',
                transition: 'background 0.1s, color 0.1s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}
            >
              {action}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ChatArea() {
  const [inputVal, setInputVal] = useState('')

  // Group consecutive messages by same user
  const groupedMessages = messages.map((msg, i) => ({
    ...msg,
    isGrouped: i > 0 && messages[i - 1].userId === msg.userId,
  }))

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: '#313338',
      overflow: 'hidden',
      minWidth: 0,
    }}>
      {/* Channel header */}
      <div style={{
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid #1e1f22',
        gap: '12px',
        flexShrink: 0,
        background: '#313338',
      }}>
        <Hash size={22} color="#80848e" strokeWidth={2.5} />
        <span style={{ fontWeight: 700, fontSize: '15px', color: '#dbdee1' }}>general</span>
        <div style={{ width: '1px', height: '24px', background: '#3f4147', margin: '0 4px' }} />
        <span style={{ fontSize: '13px', color: '#80848e', flex: 1 }}>ParaNet community discussion, dev talk, and random banter</span>
        <div style={{ display: 'flex', gap: '8px', color: '#80848e', alignItems: 'center' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 6px', borderRadius: '4px', color: '#80848e', fontSize: '13px' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
            <Users size={18} />
            <span>12</span>
          </button>
          <button style={{ padding: '4px', borderRadius: '4px', color: '#80848e' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
            <Search size={18} />
          </button>
          <button style={{ padding: '4px', borderRadius: '4px', color: '#80848e' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
            <Inbox size={18} />
          </button>
          <button style={{ padding: '4px', borderRadius: '4px', color: '#80848e' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
            <HelpCircle size={18} />
          </button>
        </div>
      </div>

      {/* Messages scroll area */}
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: '16px', paddingBottom: '8px' }} className="scrollbar-thin">
        {/* Channel intro */}
        <div style={{ padding: '16px 16px 24px', borderBottom: '1px solid #3f4147', marginBottom: '16px' }}>
          <div style={{
            width: '68px', height: '68px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px',
          }}>
            <Hash size={36} color="#fff" />
          </div>
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#dbdee1', marginBottom: '8px' }}>Welcome to #general!</div>
          <div style={{ fontSize: '15px', color: '#80848e' }}>This is the start of the #general channel. Say hi!</div>
        </div>

        {groupedMessages.map((msg) => (
          <MessageGroup key={msg.id} msg={msg} isGrouped={msg.isGrouped} />
        ))}

        {/* Bottom padding */}
        <div style={{ height: '8px' }} />
      </div>

      {/* Message input */}
      <div style={{ padding: '0 16px 24px', flexShrink: 0 }}>
        <div style={{
          background: '#383a40',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '8px',
        }}>
          <button style={{ color: '#80848e', padding: '4px', display: 'flex' }}
            onMouseEnter={e => e.currentTarget.style.color = '#dbdee1'}
            onMouseLeave={e => e.currentTarget.style.color = '#80848e'}>
            <Plus size={22} />
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Message #general"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#dbdee1',
              fontSize: '15px',
              padding: '12px 0',
              caretColor: '#dbdee1',
            }}
          />

          <div style={{ display: 'flex', gap: '4px', color: '#80848e' }}>
            <button style={{ display: 'flex', padding: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#dbdee1'}
              onMouseLeave={e => e.currentTarget.style.color = '#80848e'}>
              <Gift size={20} />
            </button>
            <button style={{ display: 'flex', padding: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#dbdee1'}
              onMouseLeave={e => e.currentTarget.style.color = '#80848e'}>
              <AtSign size={20} />
            </button>
            <button style={{ display: 'flex', padding: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#dbdee1'}
              onMouseLeave={e => e.currentTarget.style.color = '#80848e'}>
              <Sticker size={20} />
            </button>
            <button style={{ display: 'flex', padding: '4px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#dbdee1'}
              onMouseLeave={e => e.currentTarget.style.color = '#80848e'}>
              <SmileIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
