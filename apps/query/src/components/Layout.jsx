import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import {
  HelpCircle, Search, MessageSquare, Tag, Users, Building2,
  CircleHelp, Briefcase, Users2, ChevronDown
} from 'lucide-react'

const navItems = [
  { label: 'Questions', icon: MessageSquare, to: '/' },
  { label: 'Tags', icon: Tag, to: '/tags' },
  { label: 'Users', icon: Users, to: '/profile' },
  { label: 'Companies', icon: Building2, to: '#' },
  { label: 'Unanswered', icon: CircleHelp, to: '#' },
  { label: 'Jobs', icon: Briefcase, to: '#' },
  { label: 'Teams', icon: Users2, to: '#' },
]

export default function Layout() {
  const location = useLocation()
  const [search, setSearch] = useState('')

  const isActive = (to) => {
    if (to === '/') return location.pathname === '/' || location.hash === '#/'
    return location.hash.startsWith('#' + to)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9f9' }}>
      {/* Fixed Header */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 50,
        background: '#fff',
        borderBottom: '1px solid #d6d9dc',
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: 12,
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 6, textDecoration: 'none', flexShrink: 0 }}>
          <HelpCircle size={26} color="#f48024" strokeWidth={2.5} />
          <span style={{ fontWeight: 700, fontSize: 18, color: '#232629', letterSpacing: '-0.3px' }}>Query</span>
        </Link>

        {/* Products link */}
        <button style={{
          background: 'none', border: 'none', cursor: 'pointer', fontSize: 12,
          color: '#6a737c', display: 'flex', alignItems: 'center', gap: 2, padding: '0 8px',
          flexShrink: 0,
        }}>
          Products <ChevronDown size={12} />
        </button>

        {/* Search */}
        <div style={{ flex: 1, position: 'relative', maxWidth: 680 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#bbc0c4' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search…"
            style={{
              width: '100%',
              height: 33,
              paddingLeft: 32,
              paddingRight: 12,
              border: '1px solid #bbc0c4',
              borderRadius: 3,
              fontSize: 13,
              outline: 'none',
              color: '#232629',
              background: '#fff',
            }}
            onFocus={e => e.target.style.borderColor = '#f48024'}
            onBlur={e => e.target.style.borderColor = '#bbc0c4'}
          />
        </div>

        {/* Ask Question */}
        <Link to="/question" style={{
          padding: '7px 14px',
          background: '#f48024',
          color: '#fff',
          borderRadius: 3,
          fontSize: 13,
          fontWeight: 500,
          textDecoration: 'none',
          flexShrink: 0,
          transition: 'background 0.15s',
          whiteSpace: 'nowrap',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#da6e1a'}
          onMouseLeave={e => e.currentTarget.style.background = '#f48024'}
        >
          Ask Question
        </Link>

        {/* Login / Signup */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <button style={{
            padding: '7px 11px', background: '#e1ecf4', color: '#39739d',
            border: '1px solid #7aa7c7', borderRadius: 3, fontSize: 13, cursor: 'pointer',
          }}>Log in</button>
          <button style={{
            padding: '7px 11px', background: '#0074cc', color: '#fff',
            border: 'none', borderRadius: 3, fontSize: 13, cursor: 'pointer',
          }}>Sign up</button>
        </div>
      </header>

      {/* Body */}
      <div style={{ display: 'flex', paddingTop: 50 }}>
        {/* Left Sidebar */}
        <aside style={{
          width: 180,
          flexShrink: 0,
          position: 'fixed',
          top: 50,
          left: 0,
          bottom: 0,
          overflowY: 'auto',
          borderRight: '1px solid #d6d9dc',
          background: '#fff',
          paddingTop: 16,
          paddingBottom: 24,
        }}>
          {/* Home */}
          <NavLink to="/" exact label="Home" isActive={isActive('/')} />
          
          {/* PUBLIC section */}
          <div style={{ padding: '12px 8px 4px 8px', fontSize: 11, fontWeight: 600, color: '#6a737c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Public
          </div>
          
          {navItems.map(item => (
            <NavLink key={item.label} to={item.to} label={item.label} icon={item.icon} isActive={isActive(item.to)} />
          ))}

          {/* TEAMS section */}
          <div style={{ padding: '20px 8px 4px 8px', fontSize: 11, fontWeight: 600, color: '#6a737c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Collectives
          </div>
          <NavLink to="#" label="Explore Collectives" />
          
          <div style={{ padding: '20px 8px 4px 8px', fontSize: 11, fontWeight: 600, color: '#6a737c', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Teams
          </div>
          <NavLink to="#" label="Create a team" />
        </aside>

        {/* Main content */}
        <main style={{ marginLeft: 180, flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function NavLink({ to, label, icon: Icon, isActive, exact }) {
  return (
    <Link
      to={to}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '6px 8px 6px 16px',
        fontSize: 13,
        color: isActive ? '#232629' : '#6a737c',
        fontWeight: isActive ? 700 : 400,
        background: isActive ? '#f1f2f3' : 'transparent',
        borderRight: isActive ? '3px solid #f48024' : '3px solid transparent',
        textDecoration: 'none',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#f8f9f9' }}
      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
    >
      {Icon && <Icon size={14} />}
      {label}
    </Link>
  )
}
