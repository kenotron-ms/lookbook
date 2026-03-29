import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { gradients } from '../data/listings'

export default function ListingCard({ listing }) {
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/listing')}
    >
      {/* Photo */}
      <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', marginBottom: '10px' }}>
        <div
          style={{
            background: gradients[listing.gradientIndex],
            aspectRatio: '16/9',
            width: '100%',
          }}
        />

        {/* Heart */}
        <button
          onClick={e => {
            e.stopPropagation()
            setSaved(!saved)
          }}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart
            size={22}
            color={saved ? '#ff385c' : 'white'}
            fill={saved ? '#ff385c' : 'rgba(0,0,0,0.4)'}
            strokeWidth={2}
          />
        </button>

        {/* Guest Favorite Badge */}
        {listing.guestFavorite && (
          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '4px 10px',
              fontSize: '11px',
              fontWeight: 700,
              color: '#222222',
            }}
          >
            Guest favorite
          </div>
        )}

        {/* Carousel Dots */}
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '4px',
          }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              style={{
                width: i === 0 ? '8px' : '6px',
                height: i === 0 ? '8px' : '6px',
                borderRadius: '50%',
                background: i === 0 ? '#ffffff' : 'rgba(255,255,255,0.55)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontSize: '14px', fontWeight: 600, color: '#222222', flex: 1, marginRight: '8px' }}>
            {listing.location}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
            <Star size={12} fill="#222222" color="#222222" />
            <span style={{ fontSize: '13px', color: '#222222', fontWeight: 500 }}>
              {listing.rating}
            </span>
          </div>
        </div>
        <div style={{ fontSize: '13px', color: '#717171' }}>{listing.distance}</div>
        <div style={{ fontSize: '13px', color: '#717171' }}>{listing.dates}</div>
        <div style={{ fontSize: '14px', color: '#222222', marginTop: '2px' }}>
          <span style={{ fontWeight: 700 }}>${listing.price}</span>
          <span style={{ fontWeight: 400 }}> night</span>
        </div>
      </div>
    </div>
  )
}
