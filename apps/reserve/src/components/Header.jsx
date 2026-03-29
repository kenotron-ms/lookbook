import { Hotel, Plane, Car, MapPin, UserCircle } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { label: 'Stays', icon: Hotel, path: '/' },
    { label: 'Flights', icon: Plane, path: '/flights' },
    { label: 'Cars', icon: Car, path: '/cars' },
    { label: 'Attractions', icon: MapPin, path: '/attractions' },
  ]

  return (
    <header style={{ background: '#003580', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, paddingBottom: 8 }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/')}
            style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          >
            <div style={{
              background: '#006ce4',
              borderRadius: 8,
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Hotel size={22} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: '-0.3px' }}>Reserve</span>
          </div>

          {/* Auth buttons */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.6)',
              color: '#fff',
              borderRadius: 4,
              padding: '7px 16px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}>Register</button>
            <button style={{
              background: '#fff',
              border: 'none',
              color: '#003580',
              borderRadius: 4,
              padding: '7px 16px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}>Sign in</button>
          </div>
        </div>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: 4, paddingBottom: 0 }}>
          {navLinks.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path && label === 'Stays'
            return (
              <button
                key={label}
                onClick={() => label === 'Stays' ? navigate('/') : null}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#fff',
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(255,255,255,0.5)' : '1px solid transparent',
                  borderRadius: '20px 20px 0 0',
                  padding: '8px 16px',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  cursor: 'pointer',
                  marginBottom: -1,
                }}
              >
                <Icon size={16} />
                {label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
