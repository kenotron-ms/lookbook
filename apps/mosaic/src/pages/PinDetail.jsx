import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Share2, ExternalLink, MoreHorizontal, ChevronDown, ArrowLeft } from 'lucide-react'
import { pins } from '../data/pins.js'

const featuredPin = pins[5] // Ocean Wave Architecture — tall and dramatic

function SmallPinCard({ pin }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ cursor: 'pointer', breakInside: 'avoid', marginBottom: 12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: pin.height * 0.55,
          background: pin.gradient,
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {hovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: 8,
              borderRadius: 12,
            }}
          >
            <button
              style={{
                padding: '6px 12px',
                background: '#e60023',
                color: '#fff',
                border: 'none',
                borderRadius: 24,
                fontWeight: 700,
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </div>
        )}
      </div>
      <p style={{ fontSize: 12, fontWeight: 600, color: '#111', marginTop: 4, lineHeight: 1.3 }}>
        {pin.title}
      </p>
    </div>
  )
}

export default function PinDetail() {
  const [saved, setSaved] = useState(false)
  const [selectedBoard, setSelectedBoard] = useState('Architecture Wonders')

  const relatedPins = pins.filter(p => p.id !== featuredPin.id).slice(0, 6)
  const morePins = pins.filter(p => p.creator.name === featuredPin.creator.name && p.id !== featuredPin.id).slice(0, 6)
  const morePinsToShow = morePins.length >= 4 ? morePins : [...morePins, ...relatedPins].slice(0, 6)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 24px' }}>
      {/* Back link */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#767676',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 20,
        }}
      >
        <ArrowLeft size={16} /> Back
      </Link>

      {/* Pin detail card */}
      <div
        style={{
          display: 'flex',
          gap: 0,
          background: '#fff',
          borderRadius: 32,
          boxShadow: '0 4px 40px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          marginBottom: 48,
        }}
      >
        {/* Left — large pin image */}
        <div
          style={{
            flex: '0 0 480px',
            minHeight: 600,
            background: featuredPin.gradient,
          }}
        />

        {/* Right — detail panel */}
        <div style={{ flex: 1, padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Action row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid #e0e0e0',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Share2 size={18} color="#111" />
            </button>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid #e0e0e0',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ExternalLink size={18} color="#111" />
            </button>
            <button
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                border: '1px solid #e0e0e0',
                background: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MoreHorizontal size={18} color="#111" />
            </button>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
              {/* Board selector */}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 16px',
                  background: '#f0f0f0',
                  border: 'none',
                  borderRadius: 24,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                  color: '#111',
                }}
              >
                {selectedBoard}
                <ChevronDown size={14} />
              </button>

              {/* Save button */}
              <button
                onClick={() => setSaved(!saved)}
                style={{
                  padding: '10px 24px',
                  background: saved ? '#ad081b' : '#e60023',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 24,
                  fontWeight: 700,
                  fontSize: 15,
                  cursor: 'pointer',
                }}
              >
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* Creator card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '16px 0',
              borderTop: '1px solid #f0f0f0',
              borderBottom: '1px solid #f0f0f0',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: featuredPin.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: '#fff',
                flexShrink: 0,
              }}
            >
              {featuredPin.creator.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 700, fontSize: 15, color: '#111' }}>{featuredPin.creator.name}</p>
              <p style={{ fontSize: 13, color: '#767676' }}>14.2k followers</p>
            </div>
            <button
              style={{
                padding: '10px 20px',
                background: 'transparent',
                border: '2px solid #e60023',
                borderRadius: 24,
                color: '#e60023',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              Follow
            </button>
          </div>

          {/* Pin title & description */}
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 10, lineHeight: 1.2 }}>
              {featuredPin.title}
            </h1>
            <p style={{ fontSize: 15, color: '#444', lineHeight: 1.6 }}>
              {featuredPin.description}. This design exemplifies the harmony between organic form and structural integrity — a masterwork of contemporary architectural vision that redefines the urban skyline.
            </p>
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {featuredPin.tags.map(tag => (
              <span
                key={tag}
                style={{
                  padding: '6px 14px',
                  background: '#f0f0f0',
                  borderRadius: 24,
                  fontSize: 13,
                  color: '#111',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Saves count */}
          <p style={{ fontSize: 13, color: '#767676' }}>
            <strong style={{ color: '#111' }}>{featuredPin.saves.toLocaleString()}</strong> people saved this
          </p>
        </div>
      </div>

      {/* More from creator */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 20 }}>
          More from {featuredPin.creator.name}
        </h2>
        <div className="masonry-grid">
          {morePinsToShow.map(pin => (
            <SmallPinCard key={pin.id} pin={pin} />
          ))}
        </div>
      </section>

      {/* More like this */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 20 }}>
          More like this
        </h2>
        <div className="masonry-grid">
          {relatedPins.map(pin => (
            <SmallPinCard key={`related-${pin.id}`} pin={pin} />
          ))}
        </div>
      </section>

      <div style={{ height: 60 }} />
    </div>
  )
}
