import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Headphones, Plus, Compass, MessageSquare } from 'lucide-react'
import { servers } from '../data/server'

function Tooltip({ label }) {
  return (
    <div style={{
      position: 'absolute',
      left: '64px',
      background: '#111214',
      color: '#dbdee1',
      fontSize: '14px',
      fontWeight: 600,
      padding: '8px 12px',
      borderRadius: '6px',
      whiteSpace: 'nowrap',
      zIndex: 100,
      pointerEvents: 'none',
      boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
    }}>
      {label}
    </div>
  )
}

function Pill({ active }) {
  if (!active) return null
  return (
    <div style={{
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      width: '4px',
      height: active ? '40px' : '8px',
      background: '#fff',
      borderRadius: '0 4px 4px 0',
      transition: 'height 0.2s ease',
    }} />
  )
}

function ServerIcon({ server, active, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ position: 'relative', display: 'flex', alignItems: 'center', margin: '4px 0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Pill active={active || hovered} />
      <div
        onClick={onClick}
        className={`server-icon${active ? ' active' : ''}`}
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 700,
          color: '#fff',
          margin: '0 auto',
          background: server.gradient || server.color || '#36393f',
          borderRadius: (active || hovered) ? '30%' : '50%',
          transition: 'border-radius 0.15s ease',
          flexShrink: 0,
        }}
        title={server.label}
      >
        {server.initials}
      </div>
      {hovered && <Tooltip label={server.label} />}
    </div>
  )
}

export default function ServerList({ activePath }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isDMs = location.pathname === '/dms' || activePath === '/dms'

  return (
    <div style={{
      width: '72px',
      minWidth: '72px',
      background: '#1e1f22',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 0',
      gap: '2px',
      overflowY: 'auto',
      overflowX: 'hidden',
    }} className="scrollbar-none">
      {/* Hive Logo */}
      <div style={{ position: 'relative', margin: '4px 0' }}>
        <div
          onClick={() => navigate('/')}
          className="server-icon"
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
            borderRadius: (!isDMs && location.pathname === '/') ? '30%' : '50%',
            transition: 'border-radius 0.15s ease',
            margin: '0 auto',
          }}
          title="Hive Home"
        >
          <Headphones size={24} color="#fff" />
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '32px', height: '2px', background: '#3f4147', borderRadius: '1px', margin: '4px auto' }} />

      {/* DM Icon */}
      <div style={{ position: 'relative', margin: '4px 0', display: 'flex', alignItems: 'center' }}>
        {isDMs && <Pill active={true} />}
        <div
          onClick={() => navigate('/dms')}
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: isDMs ? '#7c3aed' : '#36393f',
            borderRadius: isDMs ? '30%' : '50%',
            transition: 'all 0.15s ease',
            margin: '0 auto',
          }}
          title="Direct Messages"
        >
          <MessageSquare size={22} color={isDMs ? '#fff' : '#80848e'} />
        </div>
      </div>

      {/* Server list */}
      {servers.map((server) => (
        <ServerIcon
          key={server.id}
          server={server}
          active={!isDMs && location.pathname === '/' && server.active}
          onClick={() => navigate('/')}
        />
      ))}

      {/* Divider */}
      <div style={{ width: '32px', height: '2px', background: '#3f4147', borderRadius: '1px', margin: '4px auto' }} />

      {/* Add server */}
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: '#313338',
          borderRadius: '50%',
          transition: 'all 0.15s ease',
          margin: '4px auto',
          color: '#23a55a',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#23a55a'; e.currentTarget.style.borderRadius = '30%'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#313338'; e.currentTarget.style.borderRadius = '50%'; e.currentTarget.style.color = '#23a55a' }}
        title="Add a Server"
      >
        <Plus size={24} />
      </div>

      {/* Explore */}
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          background: '#313338',
          borderRadius: '50%',
          transition: 'all 0.15s ease',
          margin: '4px auto',
          color: '#23a55a',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#23a55a'; e.currentTarget.style.borderRadius = '30%'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#313338'; e.currentTarget.style.borderRadius = '50%'; e.currentTarget.style.color = '#23a55a' }}
        title="Explore Public Servers"
      >
        <Compass size={22} />
      </div>
    </div>
  )
}
