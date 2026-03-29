import { NavLink } from 'react-router-dom'
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  User,
  MoreHorizontal,
  AudioWaveform,
  Feather,
} from 'lucide-react'
import { CURRENT_USER } from '../data/posts'

const NAV_ITEMS = [
  { icon: Home, label: 'Home', to: '/', end: true },
  { icon: Search, label: 'Explore', to: '/explore' },
  { icon: Bell, label: 'Notifications', to: '/notifications', badge: 3 },
  { icon: Mail, label: 'Messages', to: '/messages', badge: 1 },
  { icon: Bookmark, label: 'Bookmarks', to: '/bookmarks' },
  { icon: User, label: 'Profile', to: '/profile' },
]

export default function LeftSidebar() {
  return (
    <aside
      style={{
        width: '275px',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        padding: '0 8px',
        overflowY: 'auto',
      }}
    >
      {/* Echo Logo */}
      <div style={{ paddingTop: '4px' }}>
        <LogoButton />
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, paddingTop: '4px' }}>
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.label} {...item} />
        ))}
        <MoreButton />
      </nav>

      {/* Post Button */}
      <div style={{ padding: '16px 4px' }}>
        <button
          style={{
            width: '100%',
            padding: '14px 24px',
            background: '#6366f1',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#5254cc')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#6366f1')}
        >
          Post
        </button>
      </div>

      {/* User Account */}
      <UserAccount />
    </aside>
  )
}

function LogoButton() {
  return (
    <div
      style={{
        width: '52px',
        height: '52px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        cursor: 'pointer',
        margin: '0 4px',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.12)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <AudioWaveform size={30} color="#6366f1" strokeWidth={2.5} />
    </div>
  )
}

function NavItem({ icon: Icon, label, to, end, badge }) {
  const baseStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '12px 16px',
    borderRadius: '9999px',
    cursor: 'pointer',
    textDecoration: 'none',
    color: '#e7e9ea',
    fontSize: '20px',
    margin: '2px 0',
    transition: 'background 0.2s',
    position: 'relative',
  }

  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        ...baseStyle,
        fontWeight: isActive ? '700' : '400',
      })}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#16181c')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {({ isActive }) => (
        <>
          <span style={{ position: 'relative' }}>
            <Icon size={27} strokeWidth={isActive ? 2.5 : 1.75} />
            {badge && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  background: '#6366f1',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '11px',
                  fontWeight: '700',
                  minWidth: '18px',
                  height: '18px',
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
          </span>
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

function MoreButton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        padding: '12px 16px',
        borderRadius: '9999px',
        cursor: 'pointer',
        fontSize: '20px',
        fontWeight: '400',
        color: '#e7e9ea',
        margin: '2px 0',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#16181c')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <MoreHorizontal size={27} strokeWidth={1.75} />
      <span>More</span>
    </div>
  )
}

function UserAccount() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '9999px',
        cursor: 'pointer',
        marginBottom: '16px',
        transition: 'background 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#16181c')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <Avatar initials={CURRENT_USER.initials} bg={CURRENT_USER.avatarBg} size={40} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: '700',
            fontSize: '15px',
            color: '#e7e9ea',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {CURRENT_USER.name}
        </div>
        <div
          style={{
            fontSize: '15px',
            color: '#71767b',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          @{CURRENT_USER.handle}
        </div>
      </div>
      <MoreHorizontal size={18} color="#71767b" />
    </div>
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
