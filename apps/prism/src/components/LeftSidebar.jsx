import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Home,
  Search,
  Compass,
  Film,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  Camera,
} from 'lucide-react'
import { CURRENT_USER } from '../data/posts'

const ACCENT = '#f43f5e'

const NAV_ITEMS = [
  { icon: Home,          label: 'Home',          to: '/',          end: true },
  { icon: Search,        label: 'Search',        to: '/search' },
  { icon: Compass,       label: 'Explore',       to: '/explore' },
  { icon: Film,          label: 'Reels',         to: '/reels' },
  { icon: MessageCircle, label: 'Messages',      to: '/messages',  badge: 2 },
  { icon: Heart,         label: 'Notifications', to: '/notifications' },
  { icon: PlusSquare,    label: 'Create',        to: '/create' },
  { icon: User,          label: 'Profile',       to: '/profile' },
]

export default function LeftSidebar() {
  return (
    <aside
      style={{
        width: '65px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        position: 'sticky',
        top: 0,
        borderRight: '1px solid #262626',
        paddingTop: '8px',
        paddingBottom: '16px',
        gap: '4px',
      }}
    >
      {/* Logo */}
      <LogoButton />

      {/* Nav spacer */}
      <div style={{ height: '8px' }} />

      {/* Navigation */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', width: '100%', alignItems: 'center' }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
      </nav>

      {/* User avatar at bottom */}
      <UserAvatar />
    </aside>
  )
}

function LogoButton() {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => navigate('/')}
      style={{
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        cursor: 'pointer',
        background: hovered ? 'rgba(244,63,94,0.12)' : 'transparent',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Camera size={28} color={ACCENT} strokeWidth={2} />
    </div>
  )
}

function NavItem({ icon: Icon, label, to, end, badge }) {
  const [hovered, setHovered] = useState(false)

  return (
    <NavLink
      to={to}
      end={end}
      title={label}
      style={({ isActive }) => ({
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: isActive ? ACCENT : '#e7e9ea',
        background: hovered ? '#1a1a1a' : 'transparent',
        transition: 'background 0.2s',
        position: 'relative',
        flexShrink: 0,
      })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {({ isActive }) => (
        <>
          <Icon size={26} strokeWidth={isActive ? 2.5 : 1.75} color={isActive ? ACCENT : '#e7e9ea'} />
          {badge && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                background: ACCENT,
                color: 'white',
                borderRadius: '9999px',
                fontSize: '10px',
                fontWeight: '700',
                minWidth: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 3px',
                lineHeight: '1',
              }}
            >
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

function UserAvatar() {
  const [hovered, setHovered] = useState(false)
  return (
    <NavLink
      to="/profile"
      title="Profile"
      style={{
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        cursor: 'pointer',
        textDecoration: 'none',
        background: hovered ? '#1a1a1a' : 'transparent',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: CURRENT_USER.avatarBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          fontWeight: '700',
          color: 'white',
        }}
      >
        {CURRENT_USER.initials}
      </div>
    </NavLink>
  )
}

export function Avatar({ initials, bg, size = 48 }) {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${Math.round(size * 0.33)}px`,
        fontWeight: '700',
        color: 'white',
        flexShrink: 0,
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  )
}
