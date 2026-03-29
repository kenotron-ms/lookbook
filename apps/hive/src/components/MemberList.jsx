import { users } from '../data/server'

function StatusDot({ status }) {
  const color = status === 'online' ? '#23a55a' : status === 'idle' ? '#f0b232' : '#80848e'
  return (
    <div style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: color,
      border: '2px solid #2b2d31',
      flexShrink: 0,
    }} />
  )
}

function MemberRow({ user }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '5px 8px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background 0.1s',
      marginBottom: '2px',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#35373c'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: user.status === 'offline' ? '#36393f' : user.avatarColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700,
          color: user.status === 'offline' ? '#80848e' : '#fff',
        }}>
          {user.avatar}
        </div>
        <div style={{ position: 'absolute', bottom: '-1px', right: '-1px' }}>
          <StatusDot status={user.status} />
        </div>
      </div>
      <span style={{
        fontSize: '14px',
        fontWeight: 500,
        color: user.status === 'offline' ? '#5c6068' : user.color,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}>
        {user.username}
      </span>
    </div>
  )
}

export default function MemberList() {
  const online = users.filter(u => u.status === 'online')
  const offline = users.filter(u => u.status === 'offline')

  return (
    <div style={{
      width: '240px',
      minWidth: '240px',
      background: '#2b2d31',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '16px 8px',
      borderLeft: '1px solid #1e1f22',
    }} className="scrollbar-thin">
      {/* Online header */}
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#80848e',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        padding: '4px 8px',
        marginBottom: '4px',
      }}>
        Online — {online.length}
      </div>

      {online.map(u => <MemberRow key={u.id} user={u} />)}

      {/* Offline header */}
      <div style={{
        fontSize: '11px',
        fontWeight: 700,
        color: '#80848e',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        padding: '4px 8px',
        marginTop: '16px',
        marginBottom: '4px',
      }}>
        Offline — {offline.length}
      </div>

      {offline.map(u => <MemberRow key={u.id} user={u} />)}
    </div>
  )
}
