import { useNavigate, useLocation } from 'react-router-dom'
import {
  Send,
  MessageCircle,
  Users,
  Bookmark,
  Settings,
  Moon,
  Radio,
} from 'lucide-react'
import { CURRENT_USER } from '../data/chats'

const NAV_ITEMS = [
  { icon: MessageCircle, label: 'Chats', path: '/' },
  { icon: Users, label: 'Contacts', path: '/contacts' },
  { icon: Bookmark, label: 'Saved', path: '/saved' },
  { icon: Radio, label: 'Channels', path: '/channels' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function LeftNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <nav
      className="flex flex-col items-center py-3 flex-shrink-0"
      style={{ width: 72, background: '#1c1c1e', borderRight: '1px solid rgba(255,255,255,0.04)' }}
    >
      {/* Logo / Brand */}
      <div
        className="flex items-center justify-center rounded-full mb-6 flex-shrink-0"
        style={{ width: 44, height: 44, background: '#2ca5e0' }}
      >
        <Send size={20} color="#fff" strokeWidth={2.5} />
      </div>

      {/* User Avatar */}
      <button
        className="flex items-center justify-center rounded-full mb-4 flex-shrink-0 text-sm font-semibold"
        style={{
          width: 44,
          height: 44,
          background: CURRENT_USER.avatarColor,
          color: '#fff',
          fontSize: 13,
        }}
        title={CURRENT_USER.name}
      >
        {CURRENT_USER.avatar}
      </button>

      <div className="flex-1 flex flex-col items-center gap-1 mt-2 w-full px-2">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const active = isActive(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              title={label}
              className="flex flex-col items-center justify-center rounded-xl w-full transition-all"
              style={{
                height: 52,
                gap: 3,
                background: active ? 'rgba(44,165,224,0.15)' : 'transparent',
                color: active ? '#2ca5e0' : '#8a9ab0',
              }}
            >
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
              <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
            </button>
          )
        })}
      </div>

      {/* Night mode toggle at bottom */}
      <button
        className="flex items-center justify-center rounded-xl transition-all"
        style={{ width: 44, height: 44, color: '#8a9ab0', marginBottom: 4 }}
        title="Toggle theme"
      >
        <Moon size={20} strokeWidth={2} />
      </button>
    </nav>
  )
}