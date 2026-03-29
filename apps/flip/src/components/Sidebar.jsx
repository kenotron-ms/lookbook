import { NavLink } from 'react-router-dom'
import { Zap, Home, Search, Users, UserCheck, Radio, User, MoreHorizontal } from 'lucide-react'

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Search, label: 'Explore' },
  { to: '#', icon: UserCheck, label: 'Following' },
  { to: '#', icon: Users, label: 'Friends' },
  { to: '#', icon: Radio, label: 'Live' },
  { to: '/profile', icon: User, label: 'Profile' },
  { to: '/studio', icon: MoreHorizontal, label: 'More' },
]

export default function Sidebar() {
  return (
    <div style={{
      width: 72,
      minWidth: 72,
      height: '100vh',
      background: '#000',
      borderRight: '1px solid #1a1a1a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 12,
      paddingBottom: 16,
      gap: 4,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ marginBottom: 20, marginTop: 4 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: 'linear-gradient(135deg, #fe2c55 0%, #25f4ee 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Zap size={22} color="#fff" fill="#fff" />
        </div>
      </div>

      {/* Nav items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, width: '100%', alignItems: 'center' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={label}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              padding: '10px 6px',
              borderRadius: 10,
              cursor: 'pointer',
              textDecoration: 'none',
              width: 58,
              color: isActive ? '#fe2c55' : 'rgba(255,255,255,0.6)',
              background: isActive ? 'rgba(254,44,85,0.08)' : 'transparent',
              transition: 'all 0.2s',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon size={22} color={isActive ? '#fe2c55' : 'rgba(255,255,255,0.65)'} />
                <span style={{ fontSize: 9, fontWeight: 500, letterSpacing: 0.2, color: isActive ? '#fe2c55' : 'rgba(255,255,255,0.5)' }}>
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Post button */}
      <NavLink
        to="/studio"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          borderRadius: 10,
          background: '#fe2c55',
          textDecoration: 'none',
          boxShadow: '0 0 16px rgba(254,44,85,0.4)',
          marginTop: 8,
        }}
      >
        <span style={{ color: '#fff', fontSize: 24, lineHeight: 1, fontWeight: 300 }}>+</span>
      </NavLink>
    </div>
  )
}
