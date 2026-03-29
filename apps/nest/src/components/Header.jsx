import { Home, Search, Globe, Menu, User, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #ebebeb',
        height: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        {/* Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexShrink: 0 }}
          onClick={() => navigate('/')}
        >
          <Home size={28} color="#ff385c" strokeWidth={2.5} fill="#ff385c" />
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#ff385c', letterSpacing: '-0.5px' }}>
            nest
          </span>
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: '1',
            maxWidth: '580px',
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #dddddd',
            borderRadius: '40px',
            boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
            cursor: 'pointer',
            overflow: 'hidden',
          }}
          onClick={() => navigate('/search')}
        >
          <div
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRight: '1px solid #dddddd',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#222222' }}>Anywhere</div>
            <div style={{ fontSize: '12px', color: '#717171' }}>Destination</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRight: '1px solid #dddddd',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#222222' }}>Any week</div>
            <div style={{ fontSize: '12px', color: '#717171' }}>Add dates</div>
          </div>
          <div
            style={{
              flex: 1,
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#222222' }}>Add guests</div>
              <div style={{ fontSize: '12px', color: '#717171' }}>Who?</div>
            </div>
            <div
              style={{
                background: '#ff385c',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Search size={14} color="white" strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Right Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button
            onClick={() => navigate('/host')}
            style={{
              padding: '10px 14px',
              background: 'transparent',
              border: 'none',
              borderRadius: '22px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              color: '#222222',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            Nest your home
          </button>
          <button
            style={{
              padding: '10px',
              background: 'transparent',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <Globe size={18} color="#222222" />
          </button>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #dddddd',
              borderRadius: '22px',
              padding: '6px 6px 6px 12px',
              cursor: 'pointer',
              background: '#ffffff',
            }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)')}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
          >
            <Menu size={16} color="#222222" />
            <div
              style={{
                width: '30px',
                height: '30px',
                background: '#717171',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <User size={16} color="white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
