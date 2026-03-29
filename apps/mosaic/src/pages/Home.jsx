import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreHorizontal, Bookmark } from 'lucide-react'
import { pins, categories } from '../data/pins.js'

function PinCard({ pin }) {
  const [hovered, setHovered] = useState(false)
  const [saved, setSaved] = useState(false)

  return (
    <div
      className="pin-card"
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to="/pin" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="pin-image-wrap" style={{ height: pin.height }}>
          {/* Gradient image */}
          <div
            style={{
              width: '100%',
              height: '100%',
              background: pin.gradient,
              borderRadius: 16,
            }}
          />

          {/* Hover overlay */}
          <div className="pin-overlay" />

          {/* Hover action layer */}
          <div className="pin-hover-actions">
            {/* Top row: Save + More */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start', gap: 8 }}>
              {pin.sponsored && (
                <span
                  style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: '#111',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: 12,
                    marginRight: 'auto',
                  }}
                >
                  Sponsored
                </span>
              )}
              <button
                onClick={e => {
                  e.preventDefault()
                  setSaved(!saved)
                }}
                style={{
                  padding: '8px 16px',
                  background: saved ? '#ad081b' : '#e60023',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {saved ? 'Saved' : 'Save'}
              </button>
              <button
                onClick={e => e.preventDefault()}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MoreHorizontal size={16} color="#111" />
              </button>
            </div>

            {/* Bottom row: board selector hint */}
            <div />
          </div>
        </div>
      </Link>

      {/* Pin info below image */}
      <div style={{ padding: '8px 4px 4px' }}>
        {pin.title && (
          <p style={{ fontWeight: 600, fontSize: 13, color: '#111111', marginBottom: 2, lineHeight: 1.3 }}>
            {pin.title}
          </p>
        )}
        {pin.saves && (
          <p style={{ fontSize: 12, color: '#767676' }}>
            {pin.saves.toLocaleString()} saves
          </p>
        )}
        {/* Creator row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: pin.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 9,
              fontWeight: 700,
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {pin.creator.avatar}
          </div>
          <span style={{ fontSize: 12, color: '#767676', fontWeight: 500 }}>{pin.creator.name}</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredPins =
    activeCategory === 'All'
      ? pins
      : pins.filter(p =>
          p.tags.some(t => t.toLowerCase().includes(activeCategory.toLowerCase())) ||
          (activeCategory === 'Home Decor' && p.tags.some(t => t.includes('home') || t.includes('interior') || t.includes('decor'))) ||
          (activeCategory === 'DIY' && p.tags.some(t => t.includes('DIY') || t.includes('craft'))) ||
          (activeCategory === 'Your style' && p.tags.some(t => t.includes('fashion') || t.includes('style')))
        )

  return (
    <div style={{ padding: '0 16px' }}>
      {/* Category chips */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          padding: '16px 0',
          scrollbarWidth: 'none',
          flexWrap: 'nowrap',
        }}
      >
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 24,
              border: 'none',
              background: activeCategory === cat ? '#111111' : '#f0f0f0',
              color: activeCategory === cat ? '#ffffff' : '#111111',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="masonry-grid">
        {filteredPins.map(pin => (
          <PinCard key={pin.id} pin={pin} />
        ))}
      </div>

      {/* Bottom padding */}
      <div style={{ height: 40 }} />
    </div>
  )
}
