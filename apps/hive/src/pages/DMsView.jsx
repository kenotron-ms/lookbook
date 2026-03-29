import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Plus, Phone, Video, Users, Inbox, HelpCircle } from 'lucide-react'
import ServerList from '../components/ServerList'
import UserPanel from '../components/UserPanel'
import { dmUsers, dmMessages, currentUser } from '../data/server'

function StatusDot({ status }) {
  const color = status === 'online' ? '#23a55a' : status === 'idle' ? '#f0b232' : '#5c6068'
  return (
    <div style={{
      width: '10px', height: '10px', borderRadius: '50%',
      background: color, border: '2px solid #2b2d31', flexShrink: 0,
    }} />
  )
}

function DMRow({ user, active, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', margin: '1px 8px',
        background: active ? '#404249' : (hovered ? '#35373c' : 'transparent'),
        transition: 'background 0.1s',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '50%', background: user.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700, color: '#fff',
        }}>
          {user.avatar}
        </div>
        <div style={{ position: 'absolute', bottom: '-1px', right: '-1px' }}>
          <StatusDot status={user.status} />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: active ? '#fff' : '#dbdee1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {user.username}
        </div>
        <div style={{ fontSize: '12px', color: '#80848e', textTransform: 'capitalize' }}>{user.status}</div>
      </div>
      {user.unread > 0 && (
        <div style={{
          background: '#da3453', color: '#fff', borderRadius: '10px',
          minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center',
          justifyContent: 'center', fontSize: '11px', fontWeight: 700, padding: '0 5px',
        }}>
          {user.unread}
        </div>
      )}
    </div>
  )
}

function DMMessage({ msg }) {
  return (
    <div style={{
      display: 'flex', gap: '16px',
      padding: msg.isGrouped ? '2px 16px' : '8px 16px 4px',
    }}>
      {msg.isGrouped ? (
        <div style={{ width: '40px', flexShrink: 0 }} />
      ) : (
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%', background: msg.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '12px', fontWeight: 700, color: '#fff', flexShrink: 0, alignSelf: 'flex-start',
        }}>
          {msg.avatar}
        </div>
      )}
      <div style={{ flex: 1 }}>
        {!msg.isGrouped && (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '2px' }}>
            <span style={{ fontWeight: 600, fontSize: '15px', color: msg.fromMe ? '#dbdee1' : '#dbdee1' }}>
              {msg.username}
            </span>
            <span style={{ fontSize: '12px', color: '#80848e' }}>{msg.timestamp}</span>
          </div>
        )}
        <div style={{ fontSize: '15px', color: '#dbdee1', lineHeight: 1.5 }}>{msg.content}</div>
      </div>
    </div>
  )
}

export default function DMsView() {
  const navigate = useNavigate()
  const [activeUser, setActiveUser] = useState(dmUsers[0])
  const [inputVal, setInputVal] = useState('')

  const processedMessages = dmMessages.map((msg, i) => ({
    ...msg,
    isGrouped: i > 0 && dmMessages[i - 1].fromMe === msg.fromMe,
  }))

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', overflow: 'hidden' }}>
      {/* Column 1: Server list */}
      <ServerList activePath="/dms" />

      {/* Column 2: DM list */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '240px', minWidth: '240px', background: '#2b2d31' }}>
        {/* DM header */}
        <div style={{ height: '48px', display: 'flex', alignItems: 'center', padding: '0 16px', borderBottom: '1px solid #1e1f22', flexShrink: 0 }}>
          <div style={{
            flex: 1, background: '#1e1f22', borderRadius: '4px', padding: '4px 8px',
            display: 'flex', alignItems: 'center', gap: '6px', cursor: 'text',
          }}>
            <Search size={14} color="#80848e" />
            <span style={{ fontSize: '13px', color: '#80848e' }}>Find or start a conversation</span>
          </div>
        </div>

        {/* DM list scroll */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }} className="scrollbar-thin">
          <div style={{ padding: '4px 16px 4px', fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            Direct Messages
            <Plus size={14} style={{ cursor: 'pointer' }} />
          </div>
          {dmUsers.map(u => (
            <DMRow key={u.id} user={u} active={activeUser.id === u.id} onClick={() => setActiveUser(u)} />
          ))}
        </div>

        <UserPanel />
      </div>

      {/* Column 3: DM conversation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#313338', overflow: 'hidden', minWidth: 0 }}>
        {/* DM header */}
        <div style={{
          height: '48px', display: 'flex', alignItems: 'center',
          padding: '0 16px', borderBottom: '1px solid #1e1f22', gap: '12px', flexShrink: 0,
        }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '50%', background: activeUser.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '9px', fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {activeUser.avatar}
          </div>
          <span style={{ fontWeight: 700, fontSize: '15px', color: '#dbdee1' }}>{activeUser.username}</span>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', gap: '8px', color: '#80848e' }}>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <Phone size={18} />
            </button>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <Video size={18} />
            </button>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <Users size={18} />
            </button>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <Search size={18} />
            </button>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <Inbox size={18} />
            </button>
            <button style={{ padding: '4px', borderRadius: '4px' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}>
              <HelpCircle size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: '16px', paddingBottom: '8px' }} className="scrollbar-thin">
          {/* DM intro */}
          <div style={{ padding: '24px 16px 32px' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', background: activeUser.avatarColor,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '28px', fontWeight: 700, color: '#fff', marginBottom: '16px',
            }}>
              {activeUser.avatar}
            </div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#dbdee1', marginBottom: '4px' }}>{activeUser.username}</div>
            <div style={{ fontSize: '15px', color: '#80848e' }}>This is the beginning of your direct message history with <strong style={{ color: '#dbdee1' }}>{activeUser.username}</strong>.</div>
          </div>

          {processedMessages.map(msg => (
            <DMMessage key={msg.id} msg={msg} />
          ))}
          <div style={{ height: '8px' }} />
        </div>

        {/* Input */}
        <div style={{ padding: '0 16px 24px', flexShrink: 0 }}>
          <div style={{
            background: '#383a40', borderRadius: '8px',
            display: 'flex', alignItems: 'center', padding: '0 12px', gap: '8px',
          }}>
            <button style={{ color: '#80848e', padding: '4px', display: 'flex' }}>
              <Plus size={22} />
            </button>
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder={`Message @${activeUser.username}`}
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                color: '#dbdee1', fontSize: '15px', padding: '12px 0',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
