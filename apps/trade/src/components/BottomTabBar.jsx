import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Search, TrendingUp, Newspaper, User } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, path: '/' },
  { label: 'Discover', icon: Search, path: '/search' },
  { label: 'Trade', icon: TrendingUp, path: '/trade' },
  { label: 'News', icon: Newspaper, path: '/news' },
  { label: 'Account', icon: User, path: '/account' },
]

export default function BottomTabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: 448,
      background: '#ffffff',
      borderTop: '1px solid #f0f0f0',
      display: 'flex',
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      zIndex: 100,
    }}>
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = location.pathname === path ||
          (path === '/' && location.pathname === '/')
        return (
          <button
            key={label}
            onClick={() => navigate(path)}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              padding: '10px 0 12px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: active ? '#00c805' : '#6b7280',
              transition: 'color 0.15s',
            }}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, letterSpacing: 0.2 }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
