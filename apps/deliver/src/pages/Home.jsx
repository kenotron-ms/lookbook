import { useNavigate } from 'react-router-dom'
import { Star, Clock, ChevronRight, Zap } from 'lucide-react'
import { restaurants } from '../data/restaurants.js'

const ACCENT = '#eb1700'

const CATEGORIES = [
  { label: 'Pizza', emoji: '🍕' },
  { label: 'Sushi', emoji: '🍣' },
  { label: 'Burgers', emoji: '🍔' },
  { label: 'Mexican', emoji: '🌮' },
  { label: 'Thai', emoji: '🍜' },
  { label: 'Indian', emoji: '🍛' },
  { label: 'Salads', emoji: '🥗' },
  { label: 'Sandwiches', emoji: '🥪' },
  { label: 'Dessert', emoji: '🍰' },
  { label: 'Chinese', emoji: '🥡' },
]

function Stars({ rating }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#fbbf24' : '#e5e7eb'}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  )
}

function BadgePill({ badge }) {
  if (!badge) return null
  const isDP = badge === 'DashPass'
  return (
    <span
      style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: isDP ? '#16a34a' : 'rgba(25,25,25,0.85)',
        color: '#fff',
        fontSize: '10px',
        fontWeight: 700,
        padding: '3px 8px',
        borderRadius: '20px',
        letterSpacing: '0.3px',
      }}
    >
      {isDP ? '✓ DashPass' : badge}
    </span>
  )
}

function RestaurantCard({ r, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        border: '1px solid #ebebeb',
        borderRadius: '12px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', height: '180px', background: r.gradient }}>
        <BadgePill badge={r.badge} />
        {r.discount && (
          <span
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              backgroundColor: ACCENT,
              color: '#fff',
              fontSize: '11px',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
            }}
          >
            {r.discount}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '12px' }}>
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#191919', marginBottom: '4px' }}>
          {r.name}
        </div>
        <div style={{ fontSize: '13px', color: '#767676', marginBottom: '8px' }}>{r.cuisine}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#767676' }}>
          <Stars rating={r.rating} />
          <span style={{ color: '#191919', fontWeight: 600 }}>{r.rating}</span>
          <span>·</span>
          <Clock size={12} />
          <span>{r.deliveryTime}</span>
          <span>·</span>
          <span>{r.deliveryFee === 'Free' ? <span style={{ color: '#16a34a', fontWeight: 600 }}>Free</span> : r.deliveryFee}</span>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, showLink }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#191919' }}>{title}</h2>
      {showLink && (
        <button style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: ACCENT, fontWeight: 600, fontSize: '14px', cursor: 'pointer' }}>
          See all <ChevronRight size={16} />
        </button>
      )}
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  const popularRestaurants = restaurants.slice(0, 8)
  const fastRestaurants = restaurants.slice(8, 16)

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      {/* Delivery sub-bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #ebebeb', padding: '10px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '13px', color: '#767676' }}>Delivering to <strong style={{ color: '#191919' }}>123 Main St, San Francisco</strong></span>
          <span style={{ color: '#ebebeb' }}>|</span>
          <span style={{ fontSize: '13px', color: '#767676' }}>ASAP <strong style={{ color: '#191919' }}>~25 min</strong></span>
          <button style={{ marginLeft: 'auto', fontSize: '13px', color: ACCENT, fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px 24px' }}>

        {/* Category chips */}
        <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '8px', marginBottom: '28px' }}>
          <div style={{ display: 'inline-flex', gap: '10px' }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  border: '1px solid #ebebeb',
                  backgroundColor: '#fff',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#191919',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#ebebeb'; e.currentTarget.style.color = '#191919' }}
              >
                <span style={{ fontSize: '18px' }}>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #eb1700 0%, #a31000 60%, #2d0000 100%)',
            borderRadius: '16px',
            padding: '32px 40px',
            marginBottom: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: 'absolute', right: '120px', top: '-40px', width: '180px', height: '180px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.06)' }} />
          <div style={{ position: 'absolute', right: '60px', bottom: '-50px', width: '220px', height: '220px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Zap size={16} color="#fbbf24" fill="#fbbf24" />
              <span style={{ color: '#fbbf24', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Limited Time Offer</span>
            </div>
            <h2 style={{ color: '#fff', fontSize: '30px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-0.5px' }}>
              20% Off Your First Order
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', marginBottom: '20px' }}>
              Use code <strong>DELIVER20</strong> at checkout · Min. order $15
            </p>
            <button
              style={{
                backgroundColor: '#fff',
                color: ACCENT,
                border: 'none',
                borderRadius: '24px',
                padding: '11px 24px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Order Now
            </button>
          </div>

          <div style={{ fontSize: '80px', opacity: 0.9, zIndex: 1 }}>🍔</div>
        </div>

        {/* Popular Near You */}
        <div style={{ marginBottom: '36px' }}>
          <SectionHeader title="Popular Near You" showLink />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {popularRestaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onClick={() => navigate('/restaurant')} />
            ))}
          </div>
        </div>

        {/* Offers & More */}
        <div style={{ marginBottom: '36px' }}>
          <SectionHeader title="Offers & More" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div
              style={{
                background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                borderRadius: '14px',
                padding: '24px 28px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '80px', opacity: 0.3 }}>🥗</div>
              <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.85 }}>DashPass Deal</div>
              <div style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>Free Delivery All Week</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>On orders over $12 from select restaurants</div>
            </div>
            <div
              style={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)',
                borderRadius: '14px',
                padding: '24px 28px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', fontSize: '80px', opacity: 0.3 }}>🍕</div>
              <div style={{ color: '#fff', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '6px', opacity: 0.85 }}>New Users</div>
              <div style={{ color: '#fff', fontSize: '22px', fontWeight: 800, marginBottom: '6px' }}>$0 Delivery, 3 Orders</div>
              <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px' }}>Sign up and save on your first three orders</div>
            </div>
          </div>
        </div>

        {/* 30 minutes or less */}
        <div style={{ marginBottom: '36px' }}>
          <SectionHeader title="30 Minutes or Less" showLink />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {fastRestaurants.map((r) => (
              <RestaurantCard key={r.id} r={r} onClick={() => navigate('/restaurant')} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
