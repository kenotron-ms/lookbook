import { Link, useLocation } from 'react-router-dom'
import { BookMarked, Search, Menu } from 'lucide-react'

const navSections = [
  { label: 'World', href: '/' },
  { label: 'U.S.', href: '/' },
  { label: 'Politics', href: '/' },
  { label: 'Business', href: '/' },
  { label: 'Tech', href: '/' },
  { label: 'Science', href: '/' },
  { label: 'Sports', href: '/' },
  { label: 'Arts', href: '/' },
  { label: 'Opinion', href: '/' },
  { label: 'Cooking', href: '/cooking' },
  { label: 'Games', href: '/games' },
  { label: 'Podcasts', href: '/' },
]

export default function Header() {
  const location = useLocation()

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      {/* Top thin banner */}
      <div style={{ backgroundColor: '#1a2744' }} className="py-1 px-4 text-center">
        <span className="font-sans text-xs tracking-widest text-gray-300 uppercase">
          The Herald &nbsp;·&nbsp; Established 2025
        </span>
      </div>

      {/* Main header */}
      <div className="border-b border-gray-200 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: date */}
          <div className="hidden md:block font-sans text-xs text-gray-500 w-44 shrink-0">
            {today}
          </div>

          {/* Center: logo + name */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <BookMarked size={26} color="#121212" strokeWidth={1.5} />
            <span
              className="font-serif text-3xl font-bold tracking-tight text-gray-950 leading-none"
              style={{ letterSpacing: '-0.02em' }}
            >
              The Herald
            </span>
          </Link>

          {/* Right: search + subscribe */}
          <div className="flex items-center gap-3 w-44 justify-end shrink-0">
            <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              className="font-sans text-xs font-semibold uppercase tracking-wider text-white px-3 py-1.5 rounded-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#326891' }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Section nav */}
      <nav className="overflow-x-auto" style={{ borderBottom: '1px solid #e2e2e2' }}>
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center gap-0 whitespace-nowrap">
            {navSections.map((s) => {
              const active = (s.href === '/cooking' && location.pathname === '/cooking')
                || (s.href === '/games' && location.pathname === '/games')
                || (s.href === '/' && (location.pathname === '/' || location.pathname === '/article'))
              return (
                <li key={s.label}>
                  <Link
                    to={s.href}
                    className={`block font-sans text-xs font-semibold uppercase tracking-wider px-3 py-2.5 transition-colors border-b-2 ${
                      active
                        ? 'border-gray-900 text-gray-900'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-400'
                    }`}
                    style={{ textDecoration: 'none' }}
                  >
                    {s.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>
    </header>
  )
}
