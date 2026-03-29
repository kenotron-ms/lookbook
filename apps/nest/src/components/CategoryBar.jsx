import { useState } from 'react'

const categories = [
  { icon: '🌊', label: 'Beachfront' },
  { icon: '🏔️', label: 'Mountains' },
  { icon: '🏡', label: 'Countryside' },
  { icon: '🌆', label: 'Cities' },
  { icon: '🏊', label: 'Pools' },
  { icon: '🌴', label: 'Tropical' },
  { icon: '🏜️', label: 'Desert' },
  { icon: '🏰', label: 'Historic' },
  { icon: '🛶', label: 'Lakefront' },
  { icon: '🎿', label: 'Skiing' },
]

export default function CategoryBar() {
  const [active, setActive] = useState('Beachfront')

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: 0,
        right: 0,
        zIndex: 40,
        background: '#ffffff',
        borderBottom: '1px solid #ebebeb',
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          height: '72px',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat.label}
            onClick={() => setActive(cat.label)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 4px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              flexShrink: 0,
              borderBottom: active === cat.label ? '2px solid #222222' : '2px solid transparent',
              opacity: active === cat.label ? 1 : 0.65,
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              if (active !== cat.label) e.currentTarget.style.opacity = '1'
            }}
            onMouseLeave={e => {
              if (active !== cat.label) e.currentTarget.style.opacity = '0.65'
            }}
          >
            <span style={{ fontSize: '22px', lineHeight: 1 }}>{cat.icon}</span>
            <span style={{ fontSize: '11px', fontWeight: 600, color: '#222222', whiteSpace: 'nowrap' }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
