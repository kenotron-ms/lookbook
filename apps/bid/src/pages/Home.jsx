import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Clock, Package } from 'lucide-react'
import { listings, categories } from '../data/listings'
import CountdownTimer from '../components/CountdownTimer'

function formatPrice(p) {
  return '$' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function StarRating({ rating }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={10} fill={i <= Math.round(rating) ? '#f5a623' : 'none'} color={i <= Math.round(rating) ? '#f5a623' : '#ccc'} />
      ))}
    </span>
  )
}

function ListingCard({ item }) {
  const [watched, setWatched] = useState(false)

  return (
    <Link to="/listing" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden',
        background: '#fff', cursor: 'pointer', transition: 'box-shadow 0.2s',
        height: '100%', display: 'flex', flexDirection: 'column',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
      >
        {/* Image */}
        <div style={{ position: 'relative', paddingTop: '100%', background: item.gradient, flexShrink: 0 }}>
          <button
            onClick={e => { e.preventDefault(); setWatched(w => !w) }}
            style={{
              position: 'absolute', top: 8, right: 8,
              background: 'rgba(255,255,255,0.85)', border: 'none',
              borderRadius: '50%', width: 30, height: 30,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 2,
            }}
          >
            <Heart size={16} fill={watched ? '#e53935' : 'none'} color={watched ? '#e53935' : '#767676'} />
          </button>
          {item.type === 'bin' && (
            <div style={{
              position: 'absolute', top: 8, left: 8,
              background: '#4caf50', color: '#fff', fontSize: 10, fontWeight: 700,
              padding: '2px 6px', borderRadius: 3,
            }}>BUY IT NOW</div>
          )}
          {item.timeLeft && item.timeLeft.h < 1 && (
            <div style={{
              position: 'absolute', bottom: 8, left: 8,
              background: '#e53935', color: '#fff', fontSize: 10, fontWeight: 700,
              padding: '2px 6px', borderRadius: 3,
            }}>ENDING SOON</div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.4, color: '#191919',
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {item.title}
          </p>

          {/* Price */}
          {item.type === 'auction' ? (
            <div>
              <span style={{ fontSize: 11, color: '#767676' }}>Current bid: </span>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#191919' }}>{formatPrice(item.currentBid)}</span>
            </div>
          ) : (
            <div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#191919' }}>{formatPrice(item.binPrice)}</span>
            </div>
          )}

          {/* Bids + time */}
          {item.type === 'auction' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, color: '#767676' }}>{item.bids} bids</span>
              <span style={{ color: '#e0e0e0' }}>·</span>
              <Clock size={11} color={item.timeLeft && item.timeLeft.h < 1 ? '#e53935' : '#767676'} />
              <CountdownTimer initialTime={item.timeLeft} />
            </div>
          )}

          {/* Shipping */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Package size={11} color="#767676" />
            <span style={{ fontSize: 12, color: item.shippingCost === 0 ? '#4caf50' : '#767676' }}>
              {item.shipping}
            </span>
          </div>

          {/* Seller rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <StarRating rating={item.sellerRating} />
            <span style={{ fontSize: 11, color: '#767676' }}>{item.feedbackPercent}%</span>
            {item.topRated && (
              <span style={{ fontSize: 10, color: '#4caf50', fontWeight: 600 }}>✓ Top Rated</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

const todaysDeals = listings.slice(0, 4)
const recommendedItems = listings.slice(8, 12)

export default function Home() {
  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px 40px' }}>
      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #3665f3 0%, #5580f7 40%, #f0f4ff 100%)',
        borderRadius: 8, padding: '36px 48px', margin: '20px 0',
        display: 'flex', flexDirection: 'column', gap: 12, minHeight: 160,
      }}>
        <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: '#fff' }}>Deals for You</h1>
        <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.9)' }}>Win what you want — auctions ending every minute</p>
        <button style={{
          background: '#fff', color: '#3665f3', border: 'none', borderRadius: 4,
          padding: '10px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer',
          alignSelf: 'flex-start', marginTop: 4,
        }}>
          Browse Today's Deals
        </button>
      </div>

      {/* Trending categories */}
      <section style={{ marginBottom: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#191919' }}>Trending Categories</h2>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <Link key={cat.label} to="/search" style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                border: '1px solid #e0e0e0', borderRadius: 24,
                padding: '8px 16px', cursor: 'pointer', background: '#fff',
                transition: 'all 0.2s', fontSize: 14, color: '#191919',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#3665f3'; e.currentTarget.style.color = '#3665f3' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#191919' }}
              >
                <span style={{ fontSize: 18 }}>{cat.icon}</span>
                <span style={{ fontWeight: 500 }}>{cat.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Deals carousel */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#191919' }}>Today's Deals</h2>
          <Link to="/search" style={{ fontSize: 14, color: '#3665f3', textDecoration: 'none', fontWeight: 600 }}>See all deals →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {todaysDeals.map(item => (
            <Link key={item.id} to="/listing" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{
                border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden',
                background: '#fff', cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
              >
                <div style={{ height: 160, background: item.gradient }} />
                <div style={{ padding: 12 }}>
                  <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 600, lineHeight: 1.4,
                    overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {item.title}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#191919' }}>
                      {item.type === 'auction' ? formatPrice(item.currentBid) : formatPrice(item.binPrice)}
                    </span>
                    {item.type === 'auction' && item.timeLeft && (
                      <span style={{ fontSize: 12, color: item.timeLeft.h < 1 ? '#e53935' : '#767676' }}>
                        <CountdownTimer initialTime={item.timeLeft} />
                      </span>
                    )}
                  </div>
                  {item.type === 'auction' && (
                    <span style={{ fontSize: 12, color: '#767676' }}>{item.bids} bids</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Main listing grid */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: '#191919' }}>All Listings</h2>
          <Link to="/search" style={{ fontSize: 14, color: '#3665f3', textDecoration: 'none', fontWeight: 600 }}>View all →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {listings.map(item => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Recommended section */}
      <section>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px', color: '#191919' }}>Recommended for You</h2>
        <p style={{ margin: '0 0 16px', fontSize: 13, color: '#767676' }}>Based on your viewing history</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {recommendedItems.map(item => (
            <ListingCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </main>
  )
}
