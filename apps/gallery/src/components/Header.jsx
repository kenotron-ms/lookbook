import { Palette, Search, Upload, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      height: '64px',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0 }}>
        <Palette size={28} color="#ea4c89" />
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#0d0c22', letterSpacing: '-0.5px' }}>Gallery</span>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '8px' }}>
        {[
          { label: 'Shots', path: '/' },
          { label: 'Designers', path: '/designers' },
          { label: 'Teams', path: '/' },
          { label: 'Hiring', path: '/hire' },
          { label: 'Blog', path: '/' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.path}
            style={{
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: '500',
              color: '#6e6d7a',
              textDecoration: 'none',
              borderRadius: '8px',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { e.target.style.color = '#0d0c22'; e.target.style.background = '#f8f7f4'; }}
            onMouseLeave={e => { e.target.style.color = '#6e6d7a'; e.target.style.background = 'transparent'; }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Search bar */}
      <div style={{
        flex: 1,
        maxWidth: '360px',
        marginLeft: '8px',
        position: 'relative',
      }}>
        <Search size={16} color="#6e6d7a" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
        <input
          placeholder="Search"
          style={{
            width: '100%',
            padding: '8px 12px 8px 36px',
            fontSize: '14px',
            border: '1px solid #e8e8e8',
            borderRadius: '24px',
            background: '#f8f7f4',
            color: '#0d0c22',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Upload button */}
        <button
          onClick={() => {}}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px',
            backgroundColor: '#ea4c89',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#d63678'}
          onMouseLeave={e => e.currentTarget.style.background = '#ea4c89'}
        >
          <Upload size={15} />
          Upload
        </button>

        {/* Sign in / Sign up */}
        <button style={{ fontSize: '14px', fontWeight: '500', color: '#6e6d7a', background: 'none', border: 'none', cursor: 'pointer' }}>
          Sign in
        </button>
        <button style={{
          fontSize: '14px', fontWeight: '600', color: '#0d0c22',
          background: 'none', border: '1px solid #e8e8e8',
          borderRadius: '8px', padding: '7px 16px', cursor: 'pointer',
        }}>
          Sign up
        </button>
      </div>
    </header>
  )
}
