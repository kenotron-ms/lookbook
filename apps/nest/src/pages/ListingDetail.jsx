import { useState } from 'react'
import { Star, Share2, Heart, Wifi, UtensilsCrossed, Waves, Car, Wind, Tv, Thermometer, Dumbbell, ChevronLeft, ChevronRight } from 'lucide-react'
import { listings, reviews, gradients } from '../data/listings'
import { useNavigate } from 'react-router-dom'

const listing = listings[0]

const amenities = [
  { icon: Wifi, label: 'Fast WiFi' },
  { icon: UtensilsCrossed, label: 'Full kitchen' },
  { icon: Waves, label: 'Private pool' },
  { icon: Car, label: 'Free parking' },
  { icon: Wind, label: 'Air conditioning' },
  { icon: Tv, label: 'Smart TV' },
  { icon: Thermometer, label: 'Heating' },
  { icon: Dumbbell, label: 'Gym access' },
]

const ratingCategories = [
  { label: 'Cleanliness', score: 4.9 },
  { label: 'Accuracy', score: 4.8 },
  { label: 'Communication', score: 5.0 },
  { label: 'Location', score: 4.9 },
  { label: 'Check-in', score: 4.8 },
  { label: 'Value', score: 4.7 },
]

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function Calendar() {
  const [checkIn, setCheckIn] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const today = new Date()
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' })
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  const handleDay = (d) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(d)
      setCheckOut(null)
    } else {
      if (d > checkIn) setCheckOut(d)
      else { setCheckIn(d); setCheckOut(null) }
    }
  }

  const inRange = (d) => checkIn && checkOut && d > checkIn && d < checkOut

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
          <ChevronLeft size={18} color="#222222" />
        </button>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#222222' }}>{monthName}</span>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
          <ChevronRight size={18} color="#222222" />
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
        {days.map(d => (
          <div key={d} style={{ fontSize: '11px', fontWeight: 600, color: '#717171', padding: '6px 0' }}>{d}</div>
        ))}
        {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const d = i + 1
          const isCheckIn = checkIn === d
          const isCheckOut = checkOut === d
          const isSelected = isCheckIn || isCheckOut
          const isInRange = inRange(d)
          const isPast = d < today.getDate()
          return (
            <button
              key={d}
              onClick={() => !isPast && handleDay(d)}
              style={{
                padding: '8px 0',
                border: 'none',
                background: isSelected ? '#222222' : isInRange ? '#f0f0f0' : 'transparent',
                color: isSelected ? '#ffffff' : isPast ? '#dddddd' : '#222222',
                borderRadius: isCheckIn ? '50% 0 0 50%' : isCheckOut ? '0 50% 50% 0' : isSelected ? '50%' : '4px',
                cursor: isPast ? 'default' : 'pointer',
                fontSize: '13px',
                fontWeight: isSelected ? 700 : 400,
                transition: 'background 0.1s',
              }}
            >
              {d}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default function ListingDetail() {
  const [saved, setSaved] = useState(false)
  const [showAllDesc, setShowAllDesc] = useState(false)
  const [guests, setGuests] = useState(2)
  const navigate = useNavigate()

  const nights = 5
  const fee = Math.round(listing.price * nights * 0.14)

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#ffffff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px 80px' }}>

        {/* Title row */}
        <div style={{ marginBottom: '16px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 700, color: '#222222', marginBottom: '8px' }}>
            {listing.title}
          </h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Star size={14} fill="#222222" color="#222222" />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{listing.rating}</span>
              </div>
              <span style={{ color: '#717171' }}>·</span>
              <span style={{ fontSize: '14px', color: '#222222', textDecoration: 'underline', cursor: 'pointer' }}>
                {listing.reviews} reviews
              </span>
              <span style={{ color: '#717171' }}>·</span>
              {listing.superhost && (
                <span style={{ background: '#222222', color: '#ffffff', borderRadius: '12px', padding: '2px 8px', fontSize: '11px', fontWeight: 600 }}>
                  Superhost
                </span>
              )}
              <span style={{ fontSize: '14px', color: '#222222', textDecoration: 'underline', cursor: 'pointer' }}>
                {listing.location}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#222222', textDecoration: 'underline' }}>
                <Share2 size={16} />
                Share
              </button>
              <button
                onClick={() => setSaved(!saved)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 500, color: '#222222', textDecoration: 'underline' }}
              >
                <Heart size={16} fill={saved ? '#ff385c' : 'transparent'} color={saved ? '#ff385c' : '#222222'} />
                Save
              </button>
            </div>
          </div>
        </div>

        {/* Photo Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', borderRadius: '16px', overflow: 'hidden', marginBottom: '40px', height: '420px' }}>
          <div style={{ background: gradients[0], height: '100%', gridRow: '1 / 3' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', height: '100%', gridRow: '1 / 3', alignContent: 'stretch' }}>
            {[1, 2, 3, 4].map(i => (
              <div key={i} style={{ background: gradients[i], minHeight: '0' }} />
            ))}
          </div>
        </div>

        {/* Content + Sidebar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '80px', alignItems: 'flex-start' }}>

          {/* Left Content */}
          <div>
            {/* Host Info */}
            <div style={{ paddingBottom: '32px', borderBottom: '1px solid #ebebeb', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#222222', marginBottom: '4px' }}>
                    Hosted by {listing.host}
                  </h2>
                  <div style={{ fontSize: '14px', color: '#717171' }}>
                    {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds · {listing.baths} baths
                  </div>
                </div>
                <div style={{ width: '56px', height: '56px', background: gradients[5], borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff' }}>
                    {listing.host[0]}
                  </span>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div style={{ paddingBottom: '32px', borderBottom: '1px solid #ebebeb', marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <Star size={28} color="#222222" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#222222' }}>{listing.host} is a Superhost</div>
                  <div style={{ fontSize: '14px', color: '#717171' }}>Superhosts are experienced, highly rated hosts.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <Wifi size={28} color="#222222" />
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: '#222222' }}>Great communication</div>
                  <div style={{ fontSize: '14px', color: '#717171' }}>100% response rate · typically replies within an hour</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ paddingBottom: '32px', borderBottom: '1px solid #ebebeb', marginBottom: '32px' }}>
              <p style={{ fontSize: '15px', lineHeight: 1.6, color: '#222222' }}>
                {showAllDesc
                  ? `Perched dramatically on the cliffs above the Amalfi Coast, this stunning villa offers an unparalleled luxury experience. Wake up each morning to panoramic views of the shimmering Mediterranean and the colorful villages dotted along the coastline. The infinity pool appears to merge seamlessly with the sea below, creating one of the most dramatic settings in all of Italy. The interior is equally breathtaking — high vaulted ceilings, handcrafted terracotta tiles, and locally-sourced furniture blend seamlessly with modern comforts. Five spacious bedrooms each have their own private terrace. The fully equipped kitchen uses appliances sourced from top Italian brands. In the evenings, the rooftop pergola is the perfect spot for dinner under the stars, with fresh herbs from the garden and local wines.`
                  : `Perched dramatically on the cliffs above the Amalfi Coast, this stunning villa offers an unparalleled luxury experience. Wake up each morning to panoramic views of the shimmering Mediterranean and the colorful villages dotted along the coastline. The infinity pool appears to merge seamlessly with the sea below...`}
              </p>
              <button
                onClick={() => setShowAllDesc(!showAllDesc)}
                style={{ marginTop: '12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 600, color: '#222222', textDecoration: 'underline', padding: 0 }}
              >
                {showAllDesc ? 'Show less' : 'Show more →'}
              </button>
            </div>

            {/* Amenities */}
            <div style={{ paddingBottom: '32px', borderBottom: '1px solid #ebebeb', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#222222', marginBottom: '20px' }}>
                What this place offers
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {amenities.map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={22} color="#222222" />
                    <span style={{ fontSize: '15px', color: '#222222' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                <Star size={20} fill="#222222" color="#222222" />
                <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#222222' }}>
                  {listing.rating} · {listing.reviews} reviews
                </h2>
              </div>

              {/* Rating bars */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
                {ratingCategories.map(({ label, score }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '13px', color: '#222222', flex: 1 }}>{label}</span>
                    <div style={{ width: '100px', height: '4px', background: '#ebebeb', borderRadius: '2px', flexShrink: 0 }}>
                      <div style={{ width: `${(score / 5) * 100}%`, height: '100%', background: '#222222', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '13px', color: '#222222', fontWeight: 500, flexShrink: 0 }}>{score}</span>
                  </div>
                ))}
              </div>

              {/* Review cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {reviews.map(review => (
                  <div key={review.id}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, #c9624f, #e8956d)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#ffffff',
                        }}
                      >
                        {review.avatar}
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#222222' }}>{review.name}</div>
                        <div style={{ fontSize: '12px', color: '#717171' }}>{review.date}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#222222' }}>
                      {review.comment.slice(0, 160)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div
            style={{
              position: 'sticky',
              top: '104px',
              border: '1px solid #dddddd',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }}
          >
            {/* Price */}
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#222222' }}>${listing.price}</span>
              <span style={{ fontSize: '16px', color: '#717171' }}> night</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                <Star size={12} fill="#222222" color="#222222" />
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{listing.rating}</span>
                <span style={{ fontSize: '13px', color: '#717171' }}>· {listing.reviews} reviews</span>
              </div>
            </div>

            {/* Date Picker */}
            <div style={{ border: '1px solid #dddddd', borderRadius: '10px', marginBottom: '12px', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid #dddddd' }}>
                <div style={{ padding: '10px 12px', borderRight: '1px solid #dddddd' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#222222', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Check-in</div>
                  <div style={{ fontSize: '13px', color: '#222222' }}>Jun 15, 2025</div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 700, color: '#222222', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Check-out</div>
                  <div style={{ fontSize: '13px', color: '#222222' }}>Jun 20, 2025</div>
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <Calendar />
              </div>
            </div>

            {/* Guests */}
            <div style={{ border: '1px solid #dddddd', borderRadius: '10px', padding: '10px 12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#222222', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Guests</div>
                <div style={{ fontSize: '13px', color: '#222222' }}>{guests} guest{guests > 1 ? 's' : ''}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={() => setGuests(g => Math.max(1, g - 1))}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #dddddd', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#222222' }}
                >
                  −
                </button>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#222222', minWidth: '16px', textAlign: 'center' }}>{guests}</span>
                <button
                  onClick={() => setGuests(g => Math.min(listing.guests, g + 1))}
                  style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #dddddd', background: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#222222' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Reserve */}
            <button
              style={{
                width: '100%',
                padding: '14px',
                background: 'linear-gradient(135deg, #ff385c, #e91e63)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 700,
                cursor: 'pointer',
                marginBottom: '16px',
              }}
            >
              Reserve
            </button>
            <p style={{ textAlign: 'center', fontSize: '13px', color: '#717171', marginBottom: '16px' }}>
              You won't be charged yet
            </p>

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#222222', textDecoration: 'underline' }}>${listing.price} × {nights} nights</span>
                <span style={{ fontSize: '14px', color: '#222222' }}>${listing.price * nights}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#222222', textDecoration: 'underline' }}>Cleaning fee</span>
                <span style={{ fontSize: '14px', color: '#222222' }}>$120</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '14px', color: '#222222', textDecoration: 'underline' }}>Nest service fee</span>
                <span style={{ fontSize: '14px', color: '#222222' }}>${fee}</span>
              </div>
              <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#222222' }}>Total before taxes</span>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#222222' }}>${listing.price * nights + 120 + fee}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
