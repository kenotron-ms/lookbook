import { useState } from 'react'
import { Star, Wifi, Car, Waves, Wind, Utensils, Dumbbell, MapPin, Check, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { roomTypes, reviews } from '../data/hotels'

function StarRow({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={14} color={i <= count ? '#f5a623' : '#ddd'} fill={i <= count ? '#f5a623' : 'none'} />
      ))}
    </div>
  )
}

const facilities = [
  { icon: Wifi, label: 'Free WiFi' },
  { icon: Car, label: 'Parking' },
  { icon: Waves, label: 'Pool' },
  { icon: Wind, label: 'Air conditioning' },
  { icon: Utensils, label: 'Restaurant' },
  { icon: Dumbbell, label: 'Fitness center' },
]

const galleryGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
]

export default function PropertyPage() {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState(null)

  const scoreBreakdown = [
    { label: 'Staff', score: 9.2 },
    { label: 'Facilities', score: 8.8 },
    { label: 'Cleanliness', score: 9.4 },
    { label: 'Comfort', score: 9.0 },
    { label: 'Value for money', score: 8.6 },
    { label: 'Location', score: 9.3 },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/results')}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'none', border: 'none', color: '#006ce4',
          fontSize: 14, cursor: 'pointer', marginBottom: 16, padding: 0,
          fontWeight: 500,
        }}
      >
        <ChevronLeft size={16} />
        Back to search results
      </button>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: '#333', marginBottom: 8 }}>
              The Grand Meridian Hotel
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <StarRow count={5} />
              <div style={{
                background: '#003580', color: '#fff',
                fontSize: 14, fontWeight: 700, padding: '4px 8px',
                borderRadius: '6px 6px 6px 0', display: 'inline-flex', alignItems: 'center',
              }}>
                8.9
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#333' }}>Superb</span>
              <span style={{ fontSize: 13, color: '#6b6b6b' }}>2,847 reviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#006ce4', fontSize: 14 }}>
              <MapPin size={14} />
              <span>Paris, France · 0.5 km from city center</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 4 }}>Starting from</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#333' }}>$289</div>
            <div style={{ fontSize: 13, color: '#6b6b6b' }}>per night</div>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gridTemplateRows: 'auto auto', gap: 6, marginBottom: 28, borderRadius: 8, overflow: 'hidden', height: 380 }}>
        {/* Main photo */}
        <div style={{ background: galleryGradients[0], gridRow: '1 / 3', borderRadius: '8px 0 0 8px' }} />
        {/* 4 small photos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 6, gridRow: '1 / 3' }}>
          {galleryGradients.slice(1).map((g, i) => (
            <div key={i} style={{
              background: g,
              borderRadius: i === 1 ? '0 8px 0 0' : i === 3 ? '0 0 8px 0' : 0,
              position: 'relative',
              cursor: 'pointer',
            }}>
              {i === 3 && (
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 14, fontWeight: 600,
                }}>
                  +23 photos
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* App banner */}
      <div style={{
        background: 'linear-gradient(135deg, #003580 0%, #005bb5 100%)',
        borderRadius: 8,
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 28,
        gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 8, padding: 10 }}>
            <Star size={24} color="#febb02" fill="#febb02" />
          </div>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Reserve our app and save</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13 }}>Download the Reserve app for exclusive deals and instant booking</div>
          </div>
        </div>
        <button style={{
          background: '#fff', color: '#003580', border: 'none',
          borderRadius: 4, padding: '10px 20px', fontSize: 14, fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap',
        }}>
          Get the app
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'flex-start' }}>
        <div>
          {/* Most popular facilities */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '20px 24px', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 16 }}>Most popular facilities</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {facilities.map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ background: '#e8f0fb', borderRadius: 6, padding: 8 }}>
                    <Icon size={18} color="#006ce4" />
                  </div>
                  <span style={{ fontSize: 14, color: '#333' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '20px 24px', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 16 }}>Location</h2>
            <div style={{
              background: 'linear-gradient(135deg, #a8edea 0%, #84fab0 100%)',
              borderRadius: 8,
              height: 200,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                background: '#cc0000',
                borderRadius: '50% 50% 50% 0',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(-45deg)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              }}>
                <MapPin size={14} color="#fff" style={{ transform: 'rotate(45deg)' }} />
              </div>
              <div style={{
                position: 'absolute',
                bottom: 12, right: 12,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: 4,
                padding: '4px 10px',
                fontSize: 12,
                color: '#333',
                fontWeight: 500,
              }}>
                Paris, France
              </div>
            </div>
          </div>

          {/* Room selection */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '20px 24px', marginBottom: 24 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#333', marginBottom: 16 }}>Available rooms</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ background: '#003580' }}>
                    {['Room type', 'Sleeps', 'Price for stay', 'Choices', 'Select rooms'].map(h => (
                      <th key={h} style={{
                        padding: '10px 12px',
                        color: '#fff',
                        fontWeight: 600,
                        textAlign: 'left',
                        fontSize: 13,
                        whiteSpace: 'nowrap',
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roomTypes.map((room, idx) => (
                    <tr key={room.id} style={{ background: idx % 2 === 0 ? '#f7f9fc' : '#fff', borderBottom: '1px solid #e7e8e9' }}>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 600, color: '#006ce4', marginBottom: 4 }}>{room.name}</div>
                        <div style={{ color: '#28a745', fontSize: 12, marginBottom: 6 }}>{room.cancellation}</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                          {room.features.map(f => (
                            <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#333' }}>
                              <Check size={12} color="#28a745" />
                              {f}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                        <div style={{ fontSize: 16 }}>{'👤'.repeat(room.sleeps)}</div>
                        <div style={{ fontSize: 11, color: '#6b6b6b' }}>x{room.sleeps}</div>
                      </td>
                      <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>${room.total}</div>
                        <div style={{ fontSize: 12, color: '#6b6b6b' }}>${room.price}/night · 3 nights</div>
                        <div style={{ fontSize: 12, color: '#28a745', marginTop: 4 }}>Includes taxes & fees</div>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="room"
                            value={room.id}
                            checked={selectedRoom === room.id}
                            onChange={() => setSelectedRoom(room.id)}
                            style={{ accentColor: '#006ce4' }}
                          />
                          <span style={{ fontSize: 13, color: '#333' }}>Select</span>
                        </label>
                      </td>
                      <td style={{ padding: '14px 12px' }}>
                        <button
                          onClick={() => navigate('/confirm')}
                          style={{
                            background: '#006ce4',
                            color: '#fff',
                            border: 'none',
                            borderRadius: 4,
                            padding: '10px 16px',
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          I'll reserve
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guest reviews */}
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#333' }}>Guest reviews</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, color: '#333', fontWeight: 600 }}>Superb</div>
                  <div style={{ fontSize: 12, color: '#6b6b6b' }}>2,847 reviews</div>
                </div>
                <div style={{
                  background: '#003580', color: '#fff',
                  fontSize: 20, fontWeight: 700, padding: '8px 12px',
                  borderRadius: '8px 8px 8px 0',
                }}>
                  8.9
                </div>
              </div>
            </div>

            {/* Score breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 24, padding: '16px', background: '#f7f9fc', borderRadius: 8 }}>
              {scoreBreakdown.map(item => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, color: '#333' }}>{item.label}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{item.score}</span>
                  </div>
                  <div style={{ background: '#e7e8e9', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                    <div style={{ background: '#003580', height: '100%', width: `${(item.score / 10) * 100}%`, borderRadius: 4 }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Review cards */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {reviews.map(review => (
                <div key={review.id} style={{
                  border: '1px solid #e7e8e9',
                  borderRadius: 8,
                  padding: 16,
                  background: '#fff',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0,
                    }}>
                      {review.author[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>{review.author}</div>
                      <div style={{ fontSize: 12, color: '#6b6b6b' }}>{review.country} · {review.stayType}</div>
                    </div>
                    <div style={{
                      background: '#003580', color: '#fff',
                      fontSize: 13, fontWeight: 700,
                      padding: '3px 7px', borderRadius: '4px 4px 4px 0',
                    }}>
                      {review.rating}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: '#333', marginBottom: 6 }}>{review.title}</div>
                  <div style={{ fontSize: 13, color: '#6b6b6b', lineHeight: 1.5 }}>
                    {review.comment.length > 160 ? review.comment.slice(0, 160) + '...' : review.comment}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b6b6b', marginTop: 10 }}>{review.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky booking sidebar */}
        <div style={{ position: 'sticky', top: 80 }}>
          <div style={{ background: '#fff', borderRadius: 8, border: '2px solid #e7e8e9', padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginBottom: 16 }}>Your reservation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Check-in', value: 'Thu, Apr 10, 2026' },
                { label: 'Check-out', value: 'Sun, Apr 13, 2026' },
                { label: 'Duration', value: '3 nights' },
                { label: 'Guests', value: '2 adults' },
                { label: 'Rooms', value: '1 room' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#6b6b6b' }}>{label}</span>
                  <span style={{ fontWeight: 500, color: '#333' }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #e7e8e9', paddingTop: 14, marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#333' }}>Total</span>
                <span style={{ fontWeight: 700, fontSize: 22, color: '#333' }}>$867</span>
              </div>
              <div style={{ fontSize: 12, color: '#6b6b6b', textAlign: 'right' }}>Includes taxes &amp; fees</div>
            </div>
            <button
              onClick={() => navigate('/confirm')}
              style={{
                background: '#006ce4',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '13px',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                width: '100%',
                marginBottom: 10,
              }}
            >
              Reserve now
            </button>
            <p style={{ fontSize: 12, color: '#28a745', textAlign: 'center', fontWeight: 500 }}>
              ✓ Free cancellation before Apr 5
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
