import { useNavigate } from 'react-router-dom'
import {
  Files,
  Search,
  GitBranch,
  Bug,
  Puzzle,
  Settings,
  UserCircle2,
} from 'lucide-react'

const topItems = [
  { icon: Files, label: 'Explorer', panel: 'explorer', route: '/' },
  { icon: Search, label: 'Search', panel: 'search', route: '/search' },
  { icon: GitBranch, label: 'Source Control', panel: 'git', route: '/' },
  { icon: Bug, label: 'Run and Debug', panel: 'debug', route: '/' },
  { icon: Puzzle, label: 'Extensions', panel: 'extensions', route: '/extensions' },
]

const bottomItems = [
  { icon: UserCircle2, label: 'Account', route: '/' },
  { icon: Settings, label: 'Settings', route: '/' },
]

export default function ActivityBar({ activePanel }) {
  const navigate = useNavigate()

  return (
    <div style={{
      width: 48,
      background: '#333333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
      paddingTop: 4,
      paddingBottom: 8,
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {topItems.map(({ icon: Icon, label, panel, route }) => {
          const isActive = activePanel === panel
          return (
            <button
              key={label}
              title={label}
              onClick={() => navigate(route)}
              style={{
                width: 48,
                height: 48,
                background: 'none',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                color: isActive ? '#ffffff' : '#858585',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#cccccc' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#858585' }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  bottom: 4,
                  width: 2,
                  background: '#ffffff',
                  borderRadius: '0 1px 1px 0',
                }} />
              )}
              <Icon size={22} strokeWidth={1.5} />
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
        {bottomItems.map(({ icon: Icon, label, route }) => (
          <button
            key={label}
            title={label}
            onClick={() => navigate(route)}
            style={{
              width: 48,
              height: 48,
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#858585',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#cccccc'}
            onMouseLeave={e => e.currentTarget.style.color = '#858585'}
          >
            <Icon size={22} strokeWidth={1.5} />
          </button>
        ))}
      </div>
    </div>
  )
}
