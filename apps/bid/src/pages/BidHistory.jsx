import { Link } from 'react-router-dom'
import { ChevronRight, Trophy, Clock } from 'lucide-react'
import { bidHistory, listings } from '../data/listings'
import CountdownTimer from '../components/CountdownTimer'

const item = listings[0]

function formatPrice(p) {
  return '$' + p.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// Extended bid history with more entries for the full page
const fullBidHistory = [
  ...bidHistory,
  { bidder: 'a***1', amount: 115.00, time: '2025-04-01 06:55:11' },
  { bidder: 'r***d', amount: 105.00, time: '2025-04-01 05:40:27' },
  { bidder: 'g***8', amount: 95.00, time: '2025-04-01 04:22:09' },
  { bidder: 'n***s', amount: 82.00, time: '2025-04-01 02:14:55' },
  { bidder: 'w***v', amount: 75.00, time: '2025-04-01 01:03:44' },
  { bidder: 'f***2', amount: 60.00, time: '2025-03-31 23:51:30' },
]

export default function BidHistory() {
  return (
    <main style={{ maxWidth: 900, margin: '0 auto', padding: '20px 16px 60px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: '#767676', marginBottom: 20 }}>
        <Link to="/" style={{ color: '#3665f3', textDecoration: 'none' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/listing" style={{ color: '#3665f3', textDecoration: 'none' }}>Listing</Link>
        <ChevronRight size={14} />
        <span>Bid History</span>
      </div>

      <h1 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 24px', color: '#191919' }}>Bid History</h1>

      {/* Auction item header */}
      <div style={{
        border: '1px solid #e0e0e0', borderRadius: 8, padding: 20,
        display: 'flex', gap: 20, marginBottom: 32,
        background: '#fafafa',
      }}>
        <div style={{
          width: 100, height: 100, background: item.gradient,
          borderRadius: 6, flexShrink: 0,
        }} />
        <div style={{ flex: 1 }}>
          <Link to="/listing" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700, color: '#3665f3', lineHeight: 1.4 }}>
              {item.title}
            </h2>
          </Link>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: '#767676', marginBottom: 2 }}>Current bid</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#191919' }}>{formatPrice(item.currentBid)}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#767676', marginBottom: 2 }}>Total bids</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: '#191919' }}>{fullBidHistory.length}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#767676', marginBottom: 2 }}>Time remaining</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>
                <CountdownTimer initialTime={item.timeLeft} />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: '#767676', marginBottom: 2 }}>Condition</div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{item.condition}</div>
            </div>
          </div>
        </div>
      </div>

      {/* High bidder callout */}
      <div style={{
        background: '#e8f5e9', border: '1px solid #4caf50', borderRadius: 6,
        padding: '14px 20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Trophy size={18} color="#2e7d32" />
        <div>
          <span style={{ fontWeight: 700, color: '#2e7d32', fontSize: 14 }}>Current High Bidder: </span>
          <span style={{ fontFamily: 'monospace', fontSize: 14, color: '#191919' }}>{fullBidHistory[0].bidder}</span>
          <span style={{ fontSize: 13, color: '#767676', marginLeft: 12 }}>
            at {formatPrice(fullBidHistory[0].amount)}
          </span>
        </div>
      </div>

      {/* Bid history table */}
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{
          background: '#f7f7f7', padding: '14px 20px',
          borderBottom: '1px solid #e0e0e0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>All Bids</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#767676', fontSize: 13 }}>
            <Clock size={14} />
            <span>Times shown in your local timezone</span>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f7f7f7', borderBottom: '2px solid #e0e0e0' }}>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#767676' }}>#</th>
              <th style={{ padding: '12px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: '#767676' }}>Bidder</th>
              <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#767676' }}>Bid Amount</th>
              <th style={{ padding: '12px 20px', textAlign: 'right', fontSize: 13, fontWeight: 700, color: '#767676' }}>Date &amp; Time</th>
            </tr>
          </thead>
          <tbody>
            {fullBidHistory.map((bid, i) => (
              <tr key={i} style={{
                borderBottom: '1px solid #e0e0e0',
                background: i === 0 ? '#e8f5e9' : i % 2 === 0 ? '#fafafa' : '#ffffff',
                transition: 'background 0.15s',
              }}
                onMouseEnter={e => { if (i !== 0) e.currentTarget.style.background = '#f0f4ff' }}
                onMouseLeave={e => { e.currentTarget.style.background = i === 0 ? '#e8f5e9' : i % 2 === 0 ? '#fafafa' : '#ffffff' }}
              >
                <td style={{ padding: '13px 20px', fontSize: 13, color: '#767676' }}>
                  {i + 1}
                  {i === 0 && <Trophy size={13} color="#2e7d32" style={{ marginLeft: 6, verticalAlign: 'middle' }} />}
                </td>
                <td style={{ padding: '13px 20px', fontSize: 14 }}>
                  <span style={{ fontFamily: 'monospace', letterSpacing: 1 }}>{bid.bidder}</span>
                  {i === 0 && (
                    <span style={{
                      marginLeft: 10, background: '#4caf50', color: '#fff',
                      fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 10,
                    }}>HIGH BIDDER</span>
                  )}
                </td>
                <td style={{ padding: '13px 20px', textAlign: 'right', fontSize: 15, fontWeight: 700, color: '#191919' }}>
                  {formatPrice(bid.amount)}
                </td>
                <td style={{ padding: '13px 20px', textAlign: 'right', fontSize: 13, color: '#767676' }}>
                  {bid.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{
          padding: '14px 20px', background: '#f7f7f7',
          borderTop: '1px solid #e0e0e0', fontSize: 13, color: '#767676',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <span>Showing {fullBidHistory.length} bids</span>
          <span>Starting bid was $50.00</span>
        </div>
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <Link to="/listing">
          <button style={{
            background: '#3665f3', color: '#fff', border: 'none',
            borderRadius: 4, padding: '12px 32px', fontSize: 15, fontWeight: 700,
            cursor: 'pointer',
          }}>
            Place a Bid on This Item
          </button>
        </Link>
        <div style={{ marginTop: 10, fontSize: 13, color: '#767676' }}>
          Minimum bid: {formatPrice(item.currentBid + 5.00)}
        </div>
      </div>
    </main>
  )
}
