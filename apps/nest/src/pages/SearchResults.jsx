import { useState } from 'react'
import { Heart, Star, SlidersHorizontal, MapPin, Plus, Minus, X } from 'lucide-react'
import { listings, gradients } from '../data/listings'
import { useNavigate } from 'react-router-dom'

const pins = [
  { id: 1, x: 28, y: 38, price: '$420' },
  { id: 2, x: 55, y: 22, price: '$185' },
  { id: 3, x: 72, y: 55, price: '$210' },
  { id: 4, x: 18, y: 65, price: '$295' },
  { id: 5, x: 48, y: 70, price: '$165' },
  { id: 6, x: 83, y: 35, price: '$340' },
  { id: 7, x: 35, y: 50, price: '$380' },
  { id: 8, x: 62, y: 78, price: '$245' },
]

const filterPills = ['Price range', 'Type of place', 'Rooms & beds', 'Amenities', 'Top rated', 'Free cancellation']

export default function SearchResults() {
  const [savedIds, setSavedIds] = useState([])
  const [activePin, setActivePin] = useState(null)
  const [activeFilter, setActiveFilter] = useState(null)
  const navigate = useNavigate()

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  const subset = listings.slice(0, 8)

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      {/* Filters Bar */}
      <div
        style={{
          borderBottom: '1px solid #ebebeb',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          background: '#ffffff',
          flexShrink: 0,
        }}
      >
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 16px',
            border: '1px solid #222222',
            borderRadius: '8px',
            background: '#ffffff',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 600,
            color: '#222222',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          <SlidersHorizontal size={15} />
          Filters
        </button>
        {filterPills.map(pill => (
          <button
            key={pill}
            onClick={() => setActiveFilter(activeFilter === pill ? null : pill)}
            style={{
              padding: '10px 16px',
              border: `1px solid ${activeFilter === pill ? '#222222' : '#dddddd'}`,
              borderRadius: '24px',
              background: activeFilter === pill ? '#f7f7f7' : '#ffffff',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: activeFilter === pill ? 600 : 400,
              color: '#222222',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Split View */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', height: 'calc(100vh - 140px)' }}>
        {/* Left Panel — Listings */}
        <div
          style={{
            width: '60%',
            overflowY: 'auto',
            padding: '24px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#717171', marginBottom: '20px' }}>
            300+ stays worldwide
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {subset.map(listing => (
              <div
                key={listing.id}
                style={{
                  display: 'flex',
                  gap: '16px',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  padding: '8px',
                  transition: 'background 0.15s',
                }}
                onClick={() => navigate('/listing')}
                onMouseEnter={e => (e.currentTarget.style.background = '#f7f7f7')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Image */}
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '240px',
                      height: '160px',
                      background: gradients[listing.gradientIndex],
                      borderRadius: '10px',
                    }}
                  />
                  <button
                    onClick={e => {
                      e.stopPropagation()
                      toggleSave(listing.id)
                    }}
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px',
                    }}
                  >
                    <Heart
                      size={20}
                      color={savedIds.includes(listing.id) ? '#ff385c' : 'white'}
                      fill={savedIds.includes(listing.id) ? '#ff385c' : 'rgba(0,0,0,0.4)'}
                    />
                  </button>
                  {listing.guestFavorite && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        left: '8px',
                        background: '#ffffff',
                        borderRadius: '16px',
                        padding: '3px 8px',
                        fontSize: '10px',
                        fontWeight: 700,
                        color: '#222222',
                      }}
                    >
                      Guest favorite
                    </div>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <div style={{ fontSize: '14px', color: '#717171' }}>{listing.location}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Star size={12} fill="#222222" color="#222222" />
                        <span style={{ fontSize: '13px', fontWeight: 500 }}>{listing.rating}</span>
                        <span style={{ fontSize: '13px', color: '#717171' }}>({listing.reviews})</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: 600, color: '#222222', marginBottom: '4px' }}>
                      {listing.title}
                    </div>
                    <div style={{ fontSize: '13px', color: '#717171', marginBottom: '8px' }}>
                      {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths
                    </div>
                    {listing.superhost && (
                      <span
                        style={{
                          display: 'inline-block',
                          background: '#222222',
                          color: '#ffffff',
                          borderRadius: '12px',
                          padding: '2px 8px',
                          fontSize: '11px',
                          fontWeight: 600,
                        }}
                      >
                        Superhost
                      </span>
                    )}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', color: '#717171' }}>{listing.dates}</div>
                    <div style={{ fontSize: '15px', color: '#222222', marginTop: '2px' }}>
                      <span style={{ fontWeight: 700 }}>${listing.price}</span>
                      <span style={{ fontWeight: 400 }}> night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel — Map */}
        <div
          style={{
            width: '40%',
            position: 'relative',
            background: 'linear-gradient(160deg, #c8dfc8 0%, #a8c8a8 30%, #d4e8d4 60%, #b8d4b8 100%)',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          {/* Map texture */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            {/* Roads */}
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
              <line x1="0" y1="35%" x2="100%" y2="42%" stroke="#b0c8b0" strokeWidth="8" />
              <line x1="0" y1="60%" x2="100%" y2="58%" stroke="#b0c8b0" strokeWidth="6" />
              <line x1="25%" y1="0" x2="30%" y2="100%" stroke="#b0c8b0" strokeWidth="5" />
              <line x1="65%" y1="0" x2="62%" y2="100%" stroke="#b0c8b0" strokeWidth="5" />
              <line x1="0" y1="20%" x2="60%" y2="25%" stroke="#c0d4c0" strokeWidth="3" />
              <rect x="35%" y="40%" width="18%" height="14%" fill="#90b890" rx="2" />
              <rect x="10%" y="55%" width="14%" height="10%" fill="#90b890" rx="2" />
              <circle cx="70%" cy="30%" r="6%" fill="#88c888" opacity="0.5" />
            </svg>
          </div>

          {/* Price Pins */}
          {pins.map(pin => (
            <div
              key={pin.id}
              onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
              style={{
                position: 'absolute',
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: 'translate(-50%, -50%)',
                background: activePin === pin.id ? '#222222' : '#ffffff',
                color: activePin === pin.id ? '#ffffff' : '#222222',
                borderRadius: '20px',
                padding: '6px 12px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                zIndex: activePin === pin.id ? 10 : 5,
                transition: 'all 0.15s',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {pin.price}
            </div>
          ))}

          {/* Zoom Controls */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            {[Plus, Minus].map((Icon, i) => (
              <button
                key={i}
                style={{
                  width: '36px',
                  height: '36px',
                  background: '#ffffff',
                  border: 'none',
                  borderRadius: i === 0 ? '8px 8px 0 0' : '0 0 8px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              >
                <Icon size={16} color="#222222" />
              </button>
            ))}
          </div>

          {/* Map Label */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#ffffff',
              borderRadius: '20px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#222222',
              boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
            }}
          >
            <MapPin size={14} color="#ff385c" fill="#ff385c" />
            Search as map moves
          </div>
        </div>
      </div>
    </div>
  )
}
