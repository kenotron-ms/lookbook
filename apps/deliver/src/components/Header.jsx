import { Package, Search, MapPin, ShoppingCart, ChevronDown } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const ACCENT = '#eb1700'

export default function Header() {
  const navigate = useNavigate()
  const [cartCount] = useState(3)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ebebeb',
        height: '64px',
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
          gap: '20px',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <Package size={28} color={ACCENT} strokeWidth={2} />
          <span
            style={{
              fontWeight: 800,
              fontSize: '20px',
              color: '#191919',
              letterSpacing: '-0.3px',
            }}
          >
            Deliver
          </span>
        </Link>

        {/* Location */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#f8f8f8',
            border: '1px solid #ebebeb',
            borderRadius: '8px',
            padding: '8px 12px',
            cursor: 'pointer',
            flexShrink: 0,
            fontSize: '14px',
            color: '#191919',
          }}
        >
          <MapPin size={16} color={ACCENT} />
          <span style={{ fontWeight: 600 }}>Deliver to:</span>
          <span style={{ color: '#767676' }}>123 Main St</span>
          <ChevronDown size={14} color="#767676" />
        </button>

        {/* Search bar */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            maxWidth: '560px',
          }}
        >
          <Search
            size={18}
            color="#767676"
            style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search for restaurants, cuisines"
            style={{
              width: '100%',
              height: '42px',
              paddingLeft: '42px',
              paddingRight: '16px',
              borderRadius: '24px',
              border: '1px solid #ebebeb',
              backgroundColor: '#f8f8f8',
              fontSize: '14px',
              color: '#191919',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Cart */}
        <button
          onClick={() => navigate('/checkout')}
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: ACCENT,
            color: '#ffffff',
            border: 'none',
            borderRadius: '24px',
            padding: '10px 18px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          <ShoppingCart size={18} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span
              style={{
                backgroundColor: '#ffffff',
                color: ACCENT,
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                fontWeight: 800,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
