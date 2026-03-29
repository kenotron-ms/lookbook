import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, Package, Bookmark, SlidersHorizontal } from 'lucide-react'
import { listings } from '../data/listings'
import CountdownTimer from '../components/CountdownTimer'

function formatPrice(p) {
  return '$' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function StarRating({ rating }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={11} fill={i <= Math.round(rating) ? '#f5a623' : 'none'} color={i <= Math.round(rating) ? '#f5a623' : '#ccc'} />
      ))}
    </span>
  )
}

const SORT_OPTIONS = ['Best Match', 'Price + Shipping: Lowest', 'Price: Low to High', 'Time: Ending Soonest']
const CONDITIONS = ['New', 'Used - Like New', 'Used - Good', 'Used - Very Good']
const FORMATS = ['Auction', 'Buy It Now']
const SHIPPING_OPTIONS = ['Free shipping', 'Local pickup']

export default function Search() {
  const [sort, setSort] = useState('Best Match')
  const [selectedConditions, setSelectedConditions] = useState([])
  const [selectedFormats, setSelectedFormats] = useState([])
  const [selectedShipping, setSelectedShipping] = useState([])
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [searchSaved, setSearchSaved] = useState(false)

  const toggleFilter = (arr, setArr, val) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val])
  }

  const displayListings = listings.slice(0, 12)

  const Checkbox = ({ label, checked, onChange }) => (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#191919', marginBottom: 6 }}>
      <input type="checkbox" checked={checked} onChange={onChange}
        style={{ accentColor: '#3665f3', width: 14, height: 14 }} />
      {label}
    </label>
  )

  const FilterSection = ({ title, children }) => (
    <div style={{ borderBottom: '1px solid #e0e0e0', paddingBottom: 16, marginBottom: 16 }}>
      <h4 style={{ margin: '0 0 10px', fontSize: 14, fontWeight: 700, color: '#191919' }}>{title}</h4>
      {children}
    </div>
  )

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px 60px', display: 'flex', gap: 24 }}>
      {/* Sidebar */}
      <aside style={{ width: 220, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
          <SlidersHorizontal size={16} color="#767676" />
          <span style={{ fontWeight: 700, fontSize: 15 }}>Filter Results</span>
        </div>

        <FilterSection title="Category">
          {['Electronics', 'Collectibles', 'Clothing', 'Automotive', 'Gaming', 'Home & Garden'].map(cat => (
            <Checkbox key={cat} label={cat} checked={false} onChange={() => {}} />
          ))}
        </FilterSection>

        <FilterSection title="Condition">
          {CONDITIONS.map(c => (
            <Checkbox key={c} label={c}
              checked={selectedConditions.includes(c)}
              onChange={() => toggleFilter(selectedConditions, setSelectedConditions, c)} />
          ))}
        </FilterSection>

        <FilterSection title="Price Range">
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <input
              type="number"
              placeholder="Min"
              value={priceMin}
              onChange={e => setPriceMin(e.target.value)}
              style={{
                border: '1px solid #e0e0e0', borderRadius: 4, padding: '5px 8px',
                width: 80, fontSize: 13, outline: 'none',
              }}
            />
            <span style={{ color: '#767676', fontSize: 12 }}>to</span>
            <input
              type="number"
              placeholder="Max"
              value={priceMax}
              onChange={e => setPriceMax(e.target.value)}
              style={{
                border: '1px solid #e0e0e0', borderRadius: 4, padding: '5px 8px',
                width: 80, fontSize: 13, outline: 'none',
              }}
            />
          </div>
          <button style={{
            marginTop: 8, width: '100%', background: '#3665f3', color: '#fff',
            border: 'none', borderRadius: 4, padding: '7px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>Apply</button>
        </FilterSection>

        <FilterSection title="Buy Format">
          {FORMATS.map(f => (
            <Checkbox key={f} label={f}
              checked={selectedFormats.includes(f)}
              onChange={() => toggleFilter(selectedFormats, setSelectedFormats, f)} />
          ))}
        </FilterSection>

        <FilterSection title="Shipping">
          {SHIPPING_OPTIONS.map(s => (
            <Checkbox key={s} label={s}
              checked={selectedShipping.includes(s)}
              onChange={() => toggleFilter(selectedShipping, setSelectedShipping, s)} />
          ))}
        </FilterSection>

        <FilterSection title="Seller">
          <Checkbox label="Top Rated Sellers Only" checked={false} onChange={() => {}} />
          <Checkbox label="Authorized Sellers" checked={false} onChange={() => {}} />
        </FilterSection>

        <FilterSection title="Location">
          {['US Only', 'North America', 'Worldwide'].map(l => (
            <Checkbox key={l} label={l} checked={false} onChange={() => {}} />
          ))}
        </FilterSection>
      </aside>

      {/* Results */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#191919' }}>
              {displayListings.length.toLocaleString()} results
            </span>
            <span style={{ fontSize: 13, color: '#767676', marginLeft: 8 }}>for "electronics headphones"</span>
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button
              onClick={() => setSearchSaved(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: searchSaved ? '#e8f0fe' : '#fff',
                border: '1px solid ' + (searchSaved ? '#3665f3' : '#e0e0e0'),
                borderRadius: 4, padding: '7px 14px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', color: searchSaved ? '#3665f3' : '#191919',
              }}
            >
              <Bookmark size={14} fill={searchSaved ? '#3665f3' : 'none'} />
              {searchSaved ? 'Saved' : 'Save this search'}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#767676' }}>Sort by:</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                style={{
                  border: '1px solid #e0e0e0', borderRadius: 4, padding: '7px 12px',
                  fontSize: 13, color: '#191919', outline: 'none', background: '#fff', cursor: 'pointer',
                }}
              >
                {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Listing rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {displayListings.map((item, i) => (
            <Link key={item.id} to="/listing" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                display: 'flex', gap: 16, padding: '16px 0',
                borderBottom: '1px solid #e0e0e0',
                cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f7f7f7'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {/* Image */}
                <div style={{
                  width: 140, height: 140, background: item.gradient,
                  borderRadius: 4, flexShrink: 0, border: '1px solid #e0e0e0',
                }} />

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 600, color: '#191919', lineHeight: 1.4 }}>
                      {item.title}
                    </p>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{
                        background: '#f0f0f0', color: '#767676', fontSize: 11,
                        padding: '2px 8px', borderRadius: 12, fontWeight: 500,
                      }}>{item.condition}</span>
                      <span style={{ color: '#e0e0e0' }}>|</span>
                      <span style={{ fontSize: 12, color: '#767676' }}>{item.category}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Package size={12} color={item.shippingCost === 0 ? '#4caf50' : '#767676'} />
                      <span style={{ fontSize: 13, color: item.shippingCost === 0 ? '#4caf50' : '#767676' }}>
                        {item.shipping}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <StarRating rating={item.sellerRating} />
                      <span style={{ fontSize: 12, color: '#767676' }}>{item.feedbackPercent}%</span>
                      {item.topRated && (
                        <span style={{ fontSize: 11, color: '#2e7d32', fontWeight: 600 }}>✓ Top Rated</span>
                      )}
                    </div>
                  </div>

                  {/* Price column */}
                  <div style={{ width: 160, flexShrink: 0, textAlign: 'right' }}>
                    {item.type === 'auction' ? (
                      <>
                        <div style={{ fontSize: 11, color: '#767676' }}>Current bid</div>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#191919' }}>{formatPrice(item.currentBid)}</div>
                        <div style={{ fontSize: 12, color: '#767676', marginTop: 2 }}>{item.bids} bids</div>
                        {item.timeLeft && (
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4, marginTop: 4 }}>
                            <Clock size={11} color={item.timeLeft.h < 1 ? '#e53935' : '#767676'} />
                            <CountdownTimer initialTime={item.timeLeft} />
                          </div>
                        )}
                        <Link to="/listing">
                          <button style={{
                            marginTop: 10, background: '#3665f3', color: '#fff', border: 'none',
                            borderRadius: 4, padding: '8px 16px', fontSize: 13, fontWeight: 700,
                            cursor: 'pointer', width: '100%',
                          }}>Place Bid</button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <div style={{ fontSize: 22, fontWeight: 800, color: '#191919' }}>{formatPrice(item.binPrice)}</div>
                        <div style={{ fontSize: 12, color: '#767676', marginTop: 2 }}>Buy It Now</div>
                        <button style={{
                          marginTop: 10, background: '#3665f3', color: '#fff', border: 'none',
                          borderRadius: 4, padding: '8px 16px', fontSize: 13, fontWeight: 700,
                          cursor: 'pointer', width: '100%',
                        }}>Buy It Now</button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
