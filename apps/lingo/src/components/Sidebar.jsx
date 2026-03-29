import { Link, useLocation } from 'react-router-dom'
import { BookOpen, Trophy, Target, ShoppingBag, User } from 'lucide-react'

const navItems = [
  { to: '/',        icon: BookOpen,     label: 'Course'      },
  { to: '/league',  icon: Trophy,       label: 'Leaderboard' },
  { to: '/quests',  icon: Target,       label: 'Quests'      },
  { to: '/shop',    icon: ShoppingBag,  label: 'Shop'        },
  { to: '/profile', icon: User,         label: 'Profile'     },
]

export default function Sidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden lg:flex flex-col gap-1 w-52 flex-shrink-0 pt-4">
      {/* Mascot area */}
      <div className="flex flex-col items-center mb-4 px-2">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-2"
          style={{ background: '#d7f0b6', border: '3px solid #58cc02' }}
        >
          🦉
        </div>
        <p className="text-xs font-bold" style={{ color: '#afafaf' }}>Your guide</p>
        <p className="text-sm font-extrabold" style={{ color: '#4b4b4b' }}>Ollie the Owl</p>
      </div>

      {navItems.map(({ to, icon: Icon, label }) => {
        const active = pathname === to
        return (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all font-extrabold text-sm no-underline"
            style={{
              background: active ? '#d7f0b6' : 'transparent',
              color: active ? '#58cc02' : '#afafaf',
            }}
          >
            <Icon
              size={22}
              strokeWidth={2.5}
              color={active ? '#58cc02' : '#afafaf'}
            />
            {label}
          </Link>
        )
      })}
    </aside>
  )
}
