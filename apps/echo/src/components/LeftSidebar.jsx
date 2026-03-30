import { useState } from 'react'
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
  Settings,
} from 'lucide-react'
import { useCurrentUser } from '../hooks/useUser.js'
import { useCompose } from '../context/ComposeContext.jsx'

const NAV_ITEMS = [
  { icon: Home, label: 'Home', to: '/', end: true },
  { icon: Search, label: 'Explore', to: '/explore' },
  { icon: Bell, label: 'Notifications', to: '/notifications', badge: 3 },
  { icon: Mail, label: 'Messages', to: '/messages', badge: 1 },
  { icon: Bookmark, label: 'Bookmarks', to: '/bookmarks' },
  { icon: User, label: 'Profile', to: '/profile' },
  { icon: Settings, label: 'Settings', to: '/settings' },
]

export default function LeftSidebar() {
  const { openCompose } = useCompose()

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
          onClick={() => openCompose()}
          style={{
            width: '100%',
            padding: '14px 24px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            fontSize: '17px',
            fontWeight: '700',
            cursor: 'pointer',
            letterSpacing: '-0.01em',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent)')}
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
      <AudioWaveform size={30} color="var(--accent)" strokeWidth={2.5} />
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
    color: 'var(--text-primary)',
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
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
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
                  background: 'var(--accent)',
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
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setShowDropdown(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '12px 16px',
          borderRadius: '9999px',
          cursor: 'pointer',
          fontSize: '20px',
          fontWeight: '400',
          color: 'var(--text-primary)',
          margin: '2px 0',
          transition: 'background 0.2s',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <MoreHorizontal size={27} strokeWidth={1.75} />
        <span>More</span>
      </div>

      {showDropdown && (
        <div
          style={{
            position: 'absolute',
            bottom: '110%',
            left: 0,
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '4px 0',
            zIndex: 200,
            minWidth: 200,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
          onClick={() => setShowDropdown(false)}
        >
          {['Topics', 'Lists', 'Spaces'].map(label => (
            <button
              key={label}
              style={{
                display: 'block',
                width: '100%',
                padding: '12px 16px',
                background: 'none',
                border: 'none',
                textAlign: 'left',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 400,
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-hover)'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function UserAccount() {
  const user = useCurrentUser()
  if (!user) return null

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
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-secondary)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
        />
      ) : (
        <Avatar initials={user.name?.[0] || 'J'} bg="var(--accent)" size={40} />
      )}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontWeight: '700',
            fontSize: '15px',
            color: 'var(--text-primary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user.name}
        </div>
        <div
          style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          @{user.handle}
        </div>
      </div>
      <MoreHorizontal size={18} color="var(--text-secondary)" />
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
