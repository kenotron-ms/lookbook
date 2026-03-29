import { useNavigate } from 'react-router-dom'
import { Mic, Headphones, Settings } from 'lucide-react'
import { currentUser } from '../data/server'

export default function UserPanel() {
  const navigate = useNavigate()

  return (
    <div style={{
      height: '52px',
      background: '#232428',
      display: 'flex',
      alignItems: 'center',
      padding: '0 8px',
      gap: '8px',
      flexShrink: 0,
      borderTop: '1px solid #1e1f22',
    }}>
      {/* Avatar + status */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '32px', height: '32px',
          borderRadius: '50%',
          background: currentUser.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '11px', fontWeight: 700, color: '#fff',
          cursor: 'pointer',
        }}>
          {currentUser.avatar}
        </div>
        <div style={{
          position: 'absolute', bottom: '-1px', right: '-1px',
          width: '10px', height: '10px',
          borderRadius: '50%',
          background: '#23a55a',
          border: '2px solid #232428',
        }} />
      </div>

      {/* Name + tag */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: '#dbdee1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {currentUser.username}
        </div>
        <div style={{ fontSize: '11px', color: '#80848e' }}>Online</div>
      </div>

      {/* Action icons */}
      <div style={{ display: 'flex', gap: '2px', color: '#80848e' }}>
        <button
          style={{ padding: '5px', borderRadius: '4px', color: '#80848e', transition: 'background 0.1s, color 0.1s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}
          title="Mute"
        >
          <Mic size={16} />
        </button>
        <button
          style={{ padding: '5px', borderRadius: '4px', color: '#80848e', transition: 'background 0.1s, color 0.1s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}
          title="Deafen"
        >
          <Headphones size={16} />
        </button>
        <button
          onClick={() => navigate('/settings')}
          style={{ padding: '5px', borderRadius: '4px', color: '#80848e', transition: 'background 0.1s, color 0.1s' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#404249'; e.currentTarget.style.color = '#dbdee1' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}
          title="User Settings"
        >
          <Settings size={16} />
        </button>
      </div>
    </div>
  )
}
