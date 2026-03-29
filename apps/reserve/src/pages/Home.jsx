import { useState } from 'react'
import { Search, MapPin, Calendar, Users, Building2, Home, Palmtree, Castle, TrendingUp, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { destinations } from '../data/hotels'

export default function HomePage() {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [checkin, setCheckin] = useState('2026-04-10')
  const [checkout, setCheckout] = useState('2026-04-13')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const propertyTypes = [
    { label: 'Hotels', icon: Building2, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', count: '24,631' },
    { label: 'Apartments', icon: Home, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', count: '18,204' },
    { label: 'Resorts', icon: Palmtree, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', count: '4,872' },
    { label: 'Villas', icon: Castle, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', count: '9,145' },
  ]

  return (
    <div>
      {/* HERO */}
      <div style={{
        background: 'linear-gradient(160deg, #003580 0%, #00264d 60%, #001a36 100%)',
        minHeight: 600,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: -80, right: -80,
          width: 300, height: 300, borderRadius: '50%',
          background: 'rgba(0,108,228,0.15)',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -60,
          width: 240, height: 240, borderRadius: '50%',
          background: 'rgba(0,108,228,0.1)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 860 }}>
          <h1 style={{ color: '#fff', fontSize: 40, fontWeight: 700, textAlign: 'center', marginBottom: 8 }}>
            Find your next stay
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 18, textAlign: 'center', marginBottom: 32 }}>
            Find your perfect stay — hotels, apartments, resorts and more
          </p>

          {/* Search form */}
          <div style={{
            background: '#fff',
            borderRadius: 8,
            padding: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0,
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            border: '3px solid #febb02',
          }}>
            {/* Destination */}
            <div style={{ flex: '1 1 200px', borderRight: '1px solid #e7e8e9', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <MapPin size={18} color="#6b6b6b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Destination</div>
                <input
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  placeholder="Where are you going?"
                  style={{
                    width: '100%', border: 'none', outline: 'none',
                    fontSize: 14, color: '#333', background: 'transparent',
                    padding: 0,
                  }}
                />
              </div>
            </div>

            {/* Check-in */}
            <div style={{ flex: '0 1 150px', borderRight: '1px solid #e7e8e9', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="#6b6b6b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Check-in</div>
                <input
                  type="date"
                  value={checkin}
                  onChange={e => setCheckin(e.target.value)}
                  style={{
                    width: '100%', border: 'none', outline: 'none',
                    fontSize: 14, color: '#333', background: 'transparent',
                    padding: 0, cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Check-out */}
            <div style={{ flex: '0 1 150px', borderRight: '1px solid #e7e8e9', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={18} color="#6b6b6b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Check-out</div>
                <input
                  type="date"
                  value={checkout}
                  onChange={e => setCheckout(e.target.value)}
                  style={{
                    width: '100%', border: 'none', outline: 'none',
                    fontSize: 14, color: '#333', background: 'transparent',
                    padding: 0, cursor: 'pointer',
                  }}
                />
              </div>
            </div>

            {/* Guests */}
            <div style={{ flex: '0 1 180px', borderRight: '1px solid #e7e8e9', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} color="#6b6b6b" />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Guests & Rooms</div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 13, color: '#333' }}>
                  <select value={adults} onChange={e => setAdults(+e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: '#333', fontSize: 13 }}>
                    {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <span style={{ color: '#6b6b6b' }}>adults</span>
                  <select value={rooms} onChange={e => setRooms(+e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: '#333', fontSize: 13 }}>
                    {[1,2,3,4].map(n => <option key={n}>{n}</option>)}
                  </select>
                  <span style={{ color: '#6b6b6b' }}>rooms</span>
                </div>
              </div>
            </div>

            {/* Search button */}
            <button
              onClick={() => navigate('/results')}
              style={{
                background: '#006ce4',
                color: '#fff',
                border: 'none',
                borderRadius: 4,
                padding: '0 24px',
                fontSize: 16,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                margin: 4,
                whiteSpace: 'nowrap',
              }}
            >
              <Search size={18} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px' }}>

        {/* Property types */}
        <section style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333', marginBottom: 20 }}>
            Explore by property type
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {propertyTypes.map(({ label, icon: Icon, gradient, count }) => (
              <div
                key={label}
                onClick={() => navigate('/results')}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                  background: '#fff',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)' }}
              >
                <div style={{ background: gradient, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={52} color="rgba(255,255,255,0.9)" strokeWidth={1.5} />
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#333' }}>{label}</div>
                  <div style={{ color: '#6b6b6b', fontSize: 13, marginTop: 2 }}>{count} properties</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending destinations */}
        <section style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <TrendingUp size={22} color="#003580" />
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#333' }}>Trending destinations</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {destinations.map(dest => (
              <div
                key={dest.name}
                onClick={() => navigate('/results')}
                style={{
                  borderRadius: 8,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  height: 160,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  transition: 'transform 0.15s, box-shadow 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)' }}
              >
                <div style={{ background: dest.gradient, width: '100%', height: '100%' }} />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.65))',
                  padding: '20px 16px 14px',
                }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{dest.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13 }}>
                    {dest.country} · {dest.properties.toLocaleString()} properties
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Business banner */}
        <section>
          <div style={{
            background: 'linear-gradient(135deg, #003580 0%, #00264d 100%)',
            borderRadius: 8,
            padding: '32px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <div style={{
                background: 'rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: 16,
              }}>
                <Briefcase size={36} color="#fff" />
              </div>
              <div>
                <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>
                  Reserve.com for Business
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, maxWidth: 460 }}>
                  Save time and money on your company's travel. Get exclusive business rates, centralized billing, and dedicated support for corporate bookings.
                </p>
              </div>
            </div>
            <button style={{
              background: '#006ce4',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}>
              Learn more
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
