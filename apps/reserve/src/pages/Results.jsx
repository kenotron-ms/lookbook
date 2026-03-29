import { useState } from 'react'
import { Star, Wifi, Car, Waves, ChefHat, MapPin, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { hotels } from '../data/hotels'

function StarRow({ count }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={12} color={i <= count ? '#f5a623' : '#ddd'} fill={i <= count ? '#f5a623' : 'none'} />
      ))}
    </div>
  )
}

export default function ResultsPage() {
  const navigate = useNavigate()
  const [budget, setBudget] = useState(700)
  const [sortBy, setSortBy] = useState('top')
  const [selectedStars, setSelectedStars] = useState([])
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [selectedScore, setSelectedScore] = useState('')

  const toggleArr = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const FilterCheckbox = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 6 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ accentColor: '#006ce4', width: 16, height: 16, cursor: 'pointer' }}
      />
      <span style={{ fontSize: 14, color: '#333' }}>{label}</span>
    </label>
  )

  const sortOptions = [
    { value: 'top', label: 'Our Top Picks' },
    { value: 'price_asc', label: 'Price (low to high)' },
    { value: 'stars', label: 'Stars' },
    { value: 'rating', label: 'Guest Rating' },
  ]

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px', display: 'flex', gap: 24, alignItems: 'flex-start' }}>

      {/* Sidebar */}
      <aside style={{ width: 260, flexShrink: 0, background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: 20, position: 'sticky', top: 80 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#333', marginBottom: 20 }}>Filter by:</h3>

        {/* Budget */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #e7e8e9' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Your budget (per night)</div>
          <input
            type="range"
            min={50}
            max={1000}
            value={budget}
            onChange={e => setBudget(+e.target.value)}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: 13, color: '#6b6b6b' }}>$50</span>
            <span style={{ fontSize: 13, color: '#003580', fontWeight: 600 }}>Up to ${budget}</span>
          </div>
        </div>

        {/* Star rating */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #e7e8e9' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Star rating</div>
          {[5,4,3,2,1].map(s => (
            <FilterCheckbox
              key={s}
              label={
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <StarRow count={s} />
                </span>
              }
              checked={selectedStars.includes(s)}
              onChange={() => toggleArr(selectedStars, setSelectedStars, s)}
            />
          ))}
        </div>

        {/* Property type */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #e7e8e9' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Property type</div>
          {['Hotels','Apartments','Resorts','Villas'].map(t => (
            <FilterCheckbox
              key={t}
              label={t}
              checked={selectedTypes.includes(t)}
              onChange={() => toggleArr(selectedTypes, setSelectedTypes, t)}
            />
          ))}
        </div>

        {/* Amenities */}
        <div style={{ marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid #e7e8e9' }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Amenities</div>
          {['Free WiFi','Pool','Parking','Kitchen'].map(a => (
            <FilterCheckbox
              key={a}
              label={a}
              checked={selectedAmenities.includes(a)}
              onChange={() => toggleArr(selectedAmenities, setSelectedAmenities, a)}
            />
          ))}
        </div>

        {/* Review score */}
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#333', marginBottom: 12 }}>Review score</div>
          {[
            { value: '9', label: 'Superb: 9+' },
            { value: '8', label: 'Very Good: 8+' },
            { value: '7', label: 'Good: 7+' },
          ].map(opt => (
            <FilterCheckbox
              key={opt.value}
              label={opt.label}
              checked={selectedScore === opt.value}
              onChange={() => setSelectedScore(selectedScore === opt.value ? '' : opt.value)}
            />
          ))}
        </div>
      </aside>

      {/* Results */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Sort bar */}
        <div style={{
          background: '#fff',
          borderRadius: 8,
          border: '1px solid #e7e8e9',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 16,
        }}>
          <span style={{ fontSize: 14, color: '#6b6b6b', fontWeight: 500 }}>Sort by:</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {sortOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: sortBy === opt.value ? '1px solid #006ce4' : '1px solid #e7e8e9',
                  background: sortBy === opt.value ? '#e8f0fb' : '#fff',
                  color: sortBy === opt.value ? '#006ce4' : '#333',
                  fontSize: 13,
                  fontWeight: sortBy === opt.value ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#6b6b6b' }}>
            {hotels.length} properties found
          </span>
        </div>

        {/* Hotel cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {hotels.map(hotel => (
            <div
              key={hotel.id}
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1px solid #e7e8e9',
                overflow: 'hidden',
                display: 'flex',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
            >
              {/* Image */}
              <div style={{
                width: 220,
                flexShrink: 0,
                background: hotel.gradient,
                position: 'relative',
              }}>
                {hotel.breakfast && (
                  <div style={{
                    position: 'absolute',
                    top: 10, left: 10,
                    background: 'rgba(0,0,0,0.55)',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 7px',
                    borderRadius: 3,
                  }}>
                    Breakfast incl.
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '16px 20px', display: 'flex', gap: 16 }}>
                {/* Left: info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
                    <h3
                      onClick={() => navigate('/property')}
                      style={{ fontSize: 16, fontWeight: 700, color: '#006ce4', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      {hotel.name}
                    </h3>
                    <span style={{
                      background: '#f2f2f2',
                      color: '#6b6b6b',
                      fontSize: 11,
                      padding: '2px 6px',
                      borderRadius: 3,
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                      marginTop: 2,
                    }}>
                      {hotel.type}
                    </span>
                  </div>

                  {/* Stars */}
                  <div style={{ marginBottom: 6 }}>
                    <StarRow count={hotel.stars} />
                  </div>

                  {/* Location */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 10 }}>
                    <MapPin size={12} color="#6b6b6b" />
                    <span style={{ fontSize: 13, color: '#006ce4', textDecoration: 'underline', cursor: 'pointer' }}>{hotel.location}</span>
                    <span style={{ fontSize: 12, color: '#6b6b6b' }}>— {hotel.distance}</span>
                  </div>

                  {/* Facilities row */}
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                    {hotel.facilities.slice(0, 4).map(f => (
                      <span key={f} style={{
                        fontSize: 12,
                        color: '#333',
                        background: '#f2f2f2',
                        padding: '2px 8px',
                        borderRadius: 3,
                        border: '1px solid #e7e8e9',
                      }}>
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Cancellation */}
                  {hotel.cancellation && (
                    <div style={{ fontSize: 13, color: '#28a745', fontWeight: 500 }}>{hotel.cancellation}</div>
                  )}

                  {/* Urgency */}
                  {hotel.urgent && (
                    <div style={{ fontSize: 13, color: '#cc0000', fontWeight: 600, marginTop: 4 }}>
                      {hotel.urgentText}
                    </div>
                  )}
                </div>

                {/* Right: rating + price */}
                <div style={{ width: 160, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <div>
                    {/* Review score */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', marginBottom: 4 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#333' }}>{hotel.ratingLabel}</div>
                        <div style={{ fontSize: 12, color: '#6b6b6b' }}>{hotel.reviews.toLocaleString()} reviews</div>
                      </div>
                      <div style={{
                        background: '#003580',
                        color: '#fff',
                        fontSize: 15,
                        fontWeight: 700,
                        padding: '6px 8px',
                        borderRadius: '6px 6px 6px 0',
                        minWidth: 44,
                        textAlign: 'center',
                      }}>
                        {hotel.rating}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 700, color: '#333', marginBottom: 2 }}>
                      ${hotel.price}
                      <span style={{ fontSize: 13, fontWeight: 400, color: '#6b6b6b' }}> /night</span>
                    </div>
                    <div style={{ fontSize: 12, color: '#6b6b6b', marginBottom: 12 }}>
                      ${hotel.totalPrice} total ({hotel.nights} nights)
                    </div>
                    <button
                      onClick={() => navigate('/property')}
                      style={{
                        background: '#006ce4',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '10px 16px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%',
                      }}
                    >
                      See availability
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
