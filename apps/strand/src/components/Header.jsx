import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Film, Search, Bell, ChevronDown, User, LogOut, Settings, HelpCircle } from 'lucide-react'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'TV Shows', path: '/?filter=series' },
  { label: 'Movies', path: '/?filter=movie' },
  { label: 'New & Popular', path: '/?filter=new' },
  { label: 'My List', path: '/mylist' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [avatarOpen, setAvatarOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? 'rgba(20,20,20,0.97)'
          : 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)',
        transition: 'background 0.4s ease',
        backdropFilter: scrolled ? 'blur(4px)' : 'none',
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        padding: '0 48px',
        height: '68px',
        maxWidth: '100%',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <Film size={26} color="#e50914" strokeWidth={2.5} />
          <span style={{
            fontSize: '22px',
            fontWeight: '800',
            color: '#e50914',
            letterSpacing: '-0.5px',
          }}>Strand</span>
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {navLinks.map(link => {
            const isActive = link.path === '/' ? location.pathname === '/' : location.pathname === link.path.split('?')[0]
            return (
              <Link
                key={link.label}
                to={link.path}
                style={{
                  fontSize: '13px',
                  fontWeight: isActive ? '700' : '400',
                  color: isActive ? '#ffffff' : 'rgba(255,255,255,0.75)',
                  transition: 'color 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/search" style={{ color: 'rgba(255,255,255,0.85)', display: 'flex' }}>
            <Search size={20} />
          </Link>
          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.85)', display: 'flex', position: 'relative' }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#e50914',
            }} />
          </button>

          {/* Avatar dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setAvatarOpen(o => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '4px',
                background: 'linear-gradient(135deg, #e50914, #8b0000)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: '700',
                color: '#fff',
              }}>J</div>
              <ChevronDown size={14} style={{ opacity: 0.8, transform: avatarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {avatarOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                background: '#1a1a1a',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                minWidth: '180px',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}>
                {[
                  { icon: User, label: 'Jordan Reeves' },
                  { icon: Settings, label: 'Account' },
                  { icon: HelpCircle, label: 'Help Center' },
                  { icon: LogOut, label: 'Sign out of Strand' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      width: '100%',
                      padding: '10px 16px',
                      background: 'none',
                      border: 'none',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.07)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    onClick={() => setAvatarOpen(false)}
                  >
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
