import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Share2, Globe, Settings } from 'lucide-react'
import { pins, boards } from '../data/pins.js'

function BoardCard({ board }) {
  const [p1, p2, p3] = board.pins

  return (
    <Link to="/pin" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{ cursor: 'pointer' }}>
        {/* Board collage */}
        <div className="board-collage" style={{ marginBottom: 8 }}>
          {/* Main large cell */}
          <div
            className="collage-main"
            style={{
              background: p1?.gradient || 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
            }}
          />
          {/* Two smaller cells */}
          <div
            style={{
              background: p2?.gradient || 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
            }}
          />
          <div
            style={{
              background: p3?.gradient || 'linear-gradient(135deg, #f0f0f0, #e0e0e0)',
            }}
          />
        </div>

        {/* Board info */}
        <p style={{ fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 2 }}>{board.name}</p>
        <p style={{ fontSize: 12, color: '#767676' }}>{board.pinCount} pins</p>
      </div>
    </Link>
  )
}

function MiniPinCard({ pin }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ breakInside: 'avoid', marginBottom: 12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          height: pin.height * 0.6,
          background: pin.gradient,
          borderRadius: 12,
          position: 'relative',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {hovered && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.25)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: 8,
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

const TABS = ['Created', 'Saved', 'Tries']

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Created')

  const savedPins = pins.slice(0, 20)

  return (
    <div>
      {/* Cover / banner */}
      <div
        style={{
          height: 220,
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 30%, #fda085 60%, #f6d365 100%)',
          position: 'relative',
        }}
      />

      {/* Profile info */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
        {/* Avatar (overlapping banner) */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: -44 }}>
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #e60023 0%, #ff6584 100%)',
              border: '4px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              fontWeight: 800,
              color: '#fff',
              marginBottom: 14,
            }}
          >
            YT
          </div>

          {/* Name & bio */}
          <h1 style={{ fontSize: 26, fontWeight: 800, color: '#111', marginBottom: 6 }}>Yuki Tanaka</h1>
          <p style={{ fontSize: 14, color: '#767676', textAlign: 'center', maxWidth: 400, marginBottom: 10, lineHeight: 1.5 }}>
            Designer · Collector · Dreamer. Obsessed with aesthetics, typography, and the art of curation.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 16 }}>
            {[
              { label: 'Followers', value: '24.1k' },
              { label: 'Following', value: '318' },
              { label: 'Monthly views', value: '1.2M' },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: 800, fontSize: 17, color: '#111' }}>{stat.value}</p>
                <p style={{ fontSize: 12, color: '#767676' }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Website */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
            <Globe size={14} color="#767676" />
            <span style={{ fontSize: 13, color: '#767676' }}>yukitanaka.design</span>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: 24,
                background: '#fff',
                fontWeight: 600,
                fontSize: 14,
                color: '#111',
                cursor: 'pointer',
              }}
            >
              <Share2 size={15} />
              Share profile
            </button>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 20px',
                border: '2px solid #e0e0e0',
                borderRadius: 24,
                background: '#fff',
                fontWeight: 600,
                fontSize: 14,
                color: '#111',
                cursor: 'pointer',
              }}
            >
              <Settings size={15} />
              Edit profile
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0,
            marginTop: 28,
            marginBottom: 28,
            borderBottom: '1px solid #e0e0e0',
          }}
        >
          {TABS.map(tab => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 28px',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #e60023' : '3px solid transparent',
                  background: 'transparent',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 15,
                  color: isActive ? '#e60023' : '#767676',
                  cursor: 'pointer',
                  transition: 'color 0.15s',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        {activeTab === 'Created' && (
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 16,
                marginBottom: 48,
              }}
            >
              {boards.map(board => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Saved' && (
          <div className="masonry-grid">
            {savedPins.map(pin => (
              <MiniPinCard key={pin.id} pin={pin} />
            ))}
          </div>
        )}

        {activeTab === 'Tries' && (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#767676' }}>
            <p style={{ fontSize: 24, marginBottom: 8 }}>🎯</p>
            <p style={{ fontWeight: 700, fontSize: 16, color: '#111', marginBottom: 6 }}>No tries yet</p>
            <p style={{ fontSize: 14 }}>When you try a pin, it will appear here</p>
          </div>
        )}

        <div style={{ height: 60 }} />
      </div>
    </div>
  )
}
