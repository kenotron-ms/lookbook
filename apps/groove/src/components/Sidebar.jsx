import { NavLink, useNavigate } from 'react-router-dom'
import { Music2, Home, Search, Library, Heart, Plus } from 'lucide-react'
import { PLAYLISTS, CURRENT_USER } from '../data/music'

const ACCENT = '#1db954'

function NavItem({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '8px 12px',
        borderRadius: '6px',
        textDecoration: 'none',
        color: isActive ? '#ffffff' : '#b3b3b3',
        fontWeight: isActive ? '700' : '500',
        fontSize: '14px',
        transition: 'color 0.15s',
        background: 'transparent',
      })}
    >
      {({ isActive }) => (
        <>
          <Icon size={24} color={isActive ? ACCENT : '#b3b3b3'} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const navigate = useNavigate()

  return (
    <aside style={{
      width: '240px',
      minWidth: '240px',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto',
      padding: '0 0 8px 0',
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '24px 20px 20px',
          cursor: 'pointer',
        }}
      >
        <Music2 size={28} color={ACCENT} />
        <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          Groove
        </span>
      </div>

      {/* Main Nav */}
      <nav style={{ padding: '0 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <NavItem to="/" icon={Home} label="Home" />
        <NavItem to="/search" icon={Search} label="Search" />
        <NavItem to="/library" icon={Library} label="Your Library" />
      </nav>

      {/* Your Library Section */}
      <div style={{ marginTop: '24px', flex: 1 }}>
        <div style={{
          padding: '0 20px 8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <span style={{ fontSize: '12px', fontWeight: '700', color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Your Library
          </span>
          <Plus size={16} color='#b3b3b3' style={{ cursor: 'pointer' }} />
        </div>

        {/* Liked Songs */}
        <NavLink
          to="/playlist/liked"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 20px',
            textDecoration: 'none',
            background: isActive ? '#ffffff1a' : 'transparent',
            transition: 'background 0.15s',
          })}
        >
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            background: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Heart size={18} color="#ffffff" fill="#ffffff" />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              Liked Songs
            </div>
            <div style={{ fontSize: '12px', color: '#b3b3b3' }}>Playlist</div>
          </div>
        </NavLink>

        {/* Playlists */}
        {PLAYLISTS.filter(p => p.id !== 'liked').map(playlist => (
          <NavLink
            key={playlist.id}
            to={`/playlist/${playlist.id}`}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              textDecoration: 'none',
              background: isActive ? '#ffffff1a' : 'transparent',
              transition: 'background 0.15s',
            })}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '4px',
              background: playlist.gradient,
              flexShrink: 0,
            }} />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '14px', color: '#ffffff', fontWeight: '500', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {playlist.name}
              </div>
              <div style={{ fontSize: '12px', color: '#b3b3b3' }}>Playlist</div>
            </div>
          </NavLink>
        ))}
      </div>

      {/* User Row */}
      <div style={{
        padding: '16px 20px',
        borderTop: '1px solid #282828',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginTop: 'auto',
      }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: ACCENT,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700',
          color: '#000000',
          flexShrink: 0,
        }}>
          {CURRENT_USER.avatar}
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>{CURRENT_USER.name}</div>
          <div style={{ fontSize: '11px', color: '#1db954', fontWeight: '600' }}>{CURRENT_USER.plan}</div>
        </div>
      </div>
    </aside>
  )
}
