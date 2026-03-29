import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Share2, Bookmark, Star, Shield, Truck, RotateCcw, ChevronRight, Eye } from 'lucide-react'
import { listings, bidHistory } from '../data/listings'
import CountdownTimer from '../components/CountdownTimer'

const item = listings[0]

function formatPrice(p) {
  return '$' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export default function ListingDetail() {
  const [selectedThumb, setSelectedThumb] = useState(0)
  const [watched, setWatched] = useState(false)
  const [bidAmount, setBidAmount] = useState('')
  const [bidPlaced, setBidPlaced] = useState(false)

  const thumbnailGradients = [
    item.gradient,
    'linear-gradient(135deg, #2a2a2a 0%, #4a4a4a 100%)',
    'linear-gradient(135deg, #1a3a6e 0%, #3665f3 100%)',
    'linear-gradient(135deg, #2d4a2d 0%, #4a7a4a 100%)',
    'linear-gradient(135deg, #6a3a6a 0%, #9a5a9a 100%)',
  ]

  const handlePlaceBid = () => {
    if (bidAmount && parseFloat(bidAmount) > item.currentBid) {
      setBidPlaced(true)
    }
  }

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 16px 60px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#767676', marginBottom: 16 }}>
        <Link to="/" style={{ color: '#3665f3', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/search" style={{ color: '#3665f3', textDecoration: 'none' }}>Electronics</Link>
        <ChevronRight size={14} />
        <span>{item.title.slice(0, 40)}…</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '500px 1fr', gap: 40 }}>
        {/* Left: image gallery */}
        <div>
          {/* Main image */}
          <div style={{
            height: 400, background: thumbnailGradients[selectedThumb],
            borderRadius: 8, border: '1px solid #e0e0e0', marginBottom: 12,
          }} />
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 8 }}>
            {thumbnailGradients.map((grad, i) => (
              <div
                key={i}
                onClick={() => setSelectedThumb(i)}
                style={{
                  width: 72, height: 72, background: grad, borderRadius: 4,
                  cursor: 'pointer', border: selectedThumb === i ? '2px solid #3665f3' : '2px solid #e0e0e0',
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: info panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Condition */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{
              background: '#e8f0fe', color: '#3665f3', fontSize: 12, fontWeight: 600,
              padding: '3px 10px', borderRadius: 12,
            }}>{item.condition}</span>
            <span style={{ fontSize: 13, color: '#767676' }}>Brand new in original packaging</span>
          </div>

          {/* Title */}
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, lineHeight: 1.3, color: '#191919' }}>
            {item.title}
          </h1>

          {/* Watchers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#767676', fontSize: 13 }}>
            <Eye size={14} />
            <span><strong style={{ color: '#e53935' }}>{item.watchers.toLocaleString()}</strong> people are watching this</span>
          </div>

          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 16 }}>
            {/* Current bid */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, color: '#767676', marginBottom: 4 }}>Current bid:</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ fontSize: 32, fontWeight: 800, color: '#191919' }}>
                  {formatPrice(item.currentBid)}
                </span>
                <Link to="/bidhistory" style={{ fontSize: 13, color: '#3665f3', textDecoration: 'none' }}>
                  [{item.bids} bids]
                </Link>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 13 }}>
                <span style={{ color: '#767676' }}>Ends in:</span>
                <CountdownTimer initialTime={item.timeLeft} />
              </div>
            </div>

            {/* Bid input */}
            {!bidPlaced ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ color: '#767676', fontSize: 13 }}>Enter {formatPrice(item.currentBid + 5.00)} or more</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', borderRadius: 4, overflow: 'hidden', flex: 1, maxWidth: 180 }}>
                    <span style={{ padding: '0 12px', background: '#f7f7f7', borderRight: '1px solid #e0e0e0', fontSize: 15, fontWeight: 600, height: 44, display: 'flex', alignItems: 'center' }}>US $</span>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={bidAmount}
                      onChange={e => setBidAmount(e.target.value)}
                      style={{ border: 'none', padding: '0 12px', outline: 'none', fontSize: 15, width: '100%', height: 44 }}
                    />
                  </div>
                  <button
                    onClick={handlePlaceBid}
                    style={{
                      background: '#3665f3', color: '#fff', border: 'none',
                      borderRadius: 4, padding: '0 28px', fontSize: 15, fontWeight: 700,
                      cursor: 'pointer', height: 44,
                    }}
                  >
                    Place Bid
                  </button>
                </div>

                {/* BIN button */}
                {item.binPrice && (
                  <button style={{
                    background: '#fff', color: '#191919', border: '1px solid #e0e0e0',
                    borderRadius: 4, padding: '12px 0', fontSize: 15, fontWeight: 600,
                    cursor: 'pointer', width: '100%', marginTop: 4,
                  }}>
                    Buy It Now — {formatPrice(item.binPrice)}
                  </button>
                )}
              </div>
            ) : (
              <div style={{
                background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: 6,
                padding: 16, textAlign: 'center',
              }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#2e7d32', marginBottom: 4 }}>🎉 Bid Placed!</div>
                <div style={{ fontSize: 13, color: '#388e3c' }}>You're currently the highest bidder at ${bidAmount}</div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={() => setWatched(w => !w)} style={{
              display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e0e0e0',
              background: '#fff', padding: '8px 16px', borderRadius: 4, cursor: 'pointer',
              fontSize: 13, color: watched ? '#e53935' : '#191919',
            }}>
              <Heart size={15} fill={watched ? '#e53935' : 'none'} color={watched ? '#e53935' : '#767676'} />
              {watched ? 'Watching' : 'Watch'}
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e0e0e0',
              background: '#fff', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 13,
            }}>
              <Share2 size={15} color="#767676" /> Share
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 6, border: '1px solid #e0e0e0',
              background: '#fff', padding: '8px 16px', borderRadius: 4, cursor: 'pointer', fontSize: 13,
            }}>
              <Bookmark size={15} color="#767676" /> Save
            </button>
          </div>

          {/* Shipping */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: 6, padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Truck size={16} color="#3665f3" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#191919' }}>{item.shipping}</div>
                <div style={{ fontSize: 13, color: '#767676' }}>{item.deliveryEstimate}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <RotateCcw size={16} color="#767676" />
              <span style={{ fontSize: 13, color: '#767676' }}>{item.returnPolicy}</span>
            </div>
          </div>

          {/* Seller info */}
          <div style={{ border: '1px solid #e0e0e0', borderRadius: 6, padding: 16 }}>
            <div style={{ fontSize: 13, color: '#767676', marginBottom: 10, fontWeight: 600 }}>About the Seller</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, #3665f3 0%, #5580f7 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 16, flexShrink: 0,
              }}>
                {item.sellerName[0].toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: '#3665f3' }}>{item.sellerName}</div>
                <div style={{ fontSize: 13, color: '#767676' }}>{item.feedbackPercent}% positive feedback</div>
              </div>
            </div>
            {item.topRated && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                background: '#e8f5e9', color: '#2e7d32', borderRadius: 4,
                padding: '4px 10px', fontSize: 12, fontWeight: 700, marginBottom: 10,
              }}>
                <Star size={12} fill="#2e7d32" color="#2e7d32" /> Top Rated Seller
              </div>
            )}
            <div>
              <button style={{
                background: 'none', border: '1px solid #3665f3', color: '#3665f3',
                borderRadius: 4, padding: '7px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              }}>Contact Seller</button>
            </div>
          </div>
        </div>
      </div>

      {/* Item description */}
      <div style={{ borderTop: '1px solid #e0e0e0', marginTop: 40, paddingTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px' }}>Item Description</h2>
        <div style={{ fontSize: 14, lineHeight: 1.8, color: '#191919', maxWidth: 800 }}>
          <p>The {item.title} is a top-tier product in excellent condition. This listing comes from a verified seller with outstanding feedback and a proven track record of reliable shipping.</p>
          <p>Key features include premium build quality, full functionality verified before listing, and original packaging where applicable. Photos show actual item. Please review all images carefully before bidding.</p>
          <p><strong>Condition:</strong> {item.condition}<br />
          <strong>Category:</strong> {item.category}<br />
          <strong>Shipping:</strong> {item.shipping}</p>
          <p>Seller ships within 1 business day of payment. We take pride in secure, professional packaging to ensure your item arrives safely.</p>
        </div>
      </div>

      {/* Bid history */}
      <div style={{ borderTop: '1px solid #e0e0e0', marginTop: 40, paddingTop: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Bid History</h2>
          <Link to="/bidhistory" style={{ color: '#3665f3', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Full bid history →</Link>
        </div>
        <div style={{ border: '1px solid #e0e0e0', borderRadius: 6, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f7f7f7', borderBottom: '1px solid #e0e0e0' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: '#767676' }}>Bidder</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#767676' }}>Bid Amount</th>
                <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, fontWeight: 600, color: '#767676' }}>Date/Time</th>
              </tr>
            </thead>
            <tbody>
              {bidHistory.map((bid, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid #e0e0e0',
                  background: i === 0 ? '#e8f5e9' : 'transparent',
                }}>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>
                    <span style={{ fontFamily: 'monospace' }}>{bid.bidder}</span>
                    {i === 0 && <span style={{ marginLeft: 8, fontSize: 11, color: '#2e7d32', fontWeight: 700 }}>HIGH BIDDER</span>}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 14, fontWeight: 600 }}>
                    {formatPrice(bid.amount)}
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', fontSize: 13, color: '#767676' }}>
                    {bid.time}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
