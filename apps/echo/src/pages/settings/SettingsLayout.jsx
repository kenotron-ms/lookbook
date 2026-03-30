import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { User, Key, Shield, Bell, Palette, ChevronLeft } from 'lucide-react'

const NAV = [
  { to: '/settings/profile',       icon: User,    label: 'Your account'                                },
  { to: '/settings/account',       icon: Key,     label: 'Security and account access'                 },
  { to: '/settings/privacy',       icon: Shield,  label: 'Privacy and safety'                          },
  { to: '/settings/notifications', icon: Bell,    label: 'Notifications'                               },
  { to: '/settings/display',       icon: Palette, label: 'Accessibility, display, and languages'       },
]

export default function SettingsLayout() {
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', borderRight: '1px solid var(--border)' }}>
      {/* Left nav */}
      <nav style={{ width: 220, borderRight: '1px solid var(--border)', flexShrink: 0 }}>
        {/* Header */}
        <div style={{
          padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
          borderBottom: '1px solid var(--border)',
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', borderRadius: '50%' }}
          >
            <ChevronLeft size={20} />
          </button>
          <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>Settings</span>
        </div>

        {/* Nav items */}
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px',
              color: isActive ? 'var(--accent)' : 'var(--text-primary)',
              borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              background: isActive ? 'var(--accent-subtle)' : 'transparent',
              fontWeight: isActive ? 700 : 400, fontSize: 15,
              textDecoration: 'none', transition: 'background 0.15s',
            })}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-hover)' }}
            onMouseLeave={e => {
              // keep active bg if active
              const isActive = e.currentTarget.getAttribute('aria-current') === 'page'
              e.currentTarget.style.background = isActive ? 'var(--accent-subtle)' : 'transparent'
            }}
          >
            <Icon size={18} />
            <span style={{ lineHeight: 1.3 }}>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Right content */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
