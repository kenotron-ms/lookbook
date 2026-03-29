import { useState } from 'react'
import { cryptos } from '../data/crypto.js'

const TABS = ['Top Gainers', 'Trending', 'New', 'High Volume']

function Sparkline({ positive }) {
  // Simple inline sparkline
  const pts = []
  let v = 50
  for (let i = 0; i < 12; i++) {
    v += (Math.random() - (positive ? 0.42 : 0.58)) * 8
    v = Math.max(10, Math.min(90, v))
    pts.push(v)
  }
  const W = 60, H = 30
  const min = Math.min(...pts), max = Math.max(...pts)
  const range = max - min || 1
  const path = pts.map((p, i) => {
    const x = (i / (pts.length - 1)) * W
    const y = H - ((p - min) / range) * (H - 4) - 2
    return `${i === 0 ? 'M' : 'L'}${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} style={{ display: 'block' }}>
      <path d={path} fill="none" stroke={positive ? '#05b169' : '#fa3d33'} strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function fmtMktCap(n) {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`
  return `$${n.toLocaleString()}`
}

function fmtPrice(p) {
  if (p >= 1000) return `$${p.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  if (p >= 1) return `$${p.toFixed(2)}`
  return `$${p.toFixed(4)}`
}

export default function Explore() {
  const [activeTab, setActiveTab] = useState('Top Gainers')

  const sorted = [...cryptos].sort((a, b) => {
    if (activeTab === 'Top Gainers') return b.change24h - a.change24h
    if (activeTab === 'Trending') return b.marketCap - a.marketCap
    if (activeTab === 'High Volume') return b.volume24h - a.volume24h
    return 0
  })

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: '#0a0b0d', margin: 0, marginBottom: 4 }}>
          Explore Markets
        </h1>
        <p style={{ fontSize: 14, color: '#8a919e', margin: 0 }}>
          Prices, trends, and market data for top cryptocurrencies
        </p>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24,
      }}>
        {[
          { label: 'Total Market Cap', value: '$1.72T', change: '+1.4%', pos: true },
          { label: '24h Volume', value: '$68.4B', change: '+8.2%', pos: true },
          { label: 'BTC Dominance', value: '49.2%', change: '-0.3%', pos: false },
          { label: 'Active Coins', value: '22,483', change: '+12', pos: true },
        ].map(s => (
          <div key={s.label} style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 10, padding: '14px 16px',
          }}>
            <div style={{ fontSize: 12, color: '#8a919e', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#0a0b0d' }}>{s.value}</div>
            <div style={{ fontSize: 12, fontWeight: 500, marginTop: 2, color: s.pos ? '#05b169' : '#fa3d33' }}>
              {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Table panel */}
      <div style={{
        background: '#ffffff', border: '1px solid #e6e8ea', borderRadius: 12, overflow: 'hidden',
      }}>
        {/* Tabs */}
        <div style={{
          display: 'flex', borderBottom: '1px solid #e6e8ea', padding: '0 20px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '14px 16px', border: 'none', background: 'transparent',
                fontSize: 13, fontWeight: tab === activeTab ? 600 : 400,
                color: tab === activeTab ? '#1652f0' : '#8a919e',
                borderBottom: `2px solid ${tab === activeTab ? '#1652f0' : 'transparent'}`,
                cursor: 'pointer', marginBottom: -1, transition: 'all 0.15s',
              }}
            >{tab}</button>
          ))}
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '40px 2fr 130px 100px 150px 130px 80px',
          gap: 8, padding: '10px 20px',
          background: '#f9fafb', borderBottom: '1px solid #e6e8ea',
        }}>
          {['#', 'Coin', 'Price', '24h %', 'Market Cap', 'Volume (24h)', 'Trend'].map(h => (
            <div key={h} style={{ fontSize: 11, fontWeight: 600, color: '#8a919e', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {sorted.map((coin, idx) => {
          const pos = coin.change24h >= 0
          return (
            <div
              key={coin.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '40px 2fr 130px 100px 150px 130px 80px',
                gap: 8, padding: '13px 20px',
                borderBottom: '1px solid #f5f7fa',
                alignItems: 'center',
                transition: 'background 0.1s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {/* Rank */}
              <div style={{ fontSize: 13, color: '#8a919e', fontWeight: 500 }}>{idx + 1}</div>

              {/* Coin */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: coin.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, color: coin.color }}>{coin.symbol}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0a0b0d' }}>{coin.name}</div>
                  <div style={{ fontSize: 11, color: '#8a919e' }}>{coin.symbol}</div>
                </div>
              </div>

              {/* Price */}
              <div style={{ fontSize: 13, fontWeight: 600, color: '#0a0b0d' }}>
                {fmtPrice(coin.price)}
              </div>

              {/* 24h % */}
              <div>
                <span style={{
                  display: 'inline-block', fontSize: 12, fontWeight: 600,
                  padding: '3px 8px', borderRadius: 4,
                  background: pos ? '#e6f9f0' : '#fef0f0',
                  color: pos ? '#05b169' : '#fa3d33',
                }}>
                  {pos ? '+' : ''}{coin.change24h.toFixed(2)}%
                </span>
              </div>

              {/* Market Cap */}
              <div style={{ fontSize: 13, color: '#0a0b0d' }}>{fmtMktCap(coin.marketCap)}</div>

              {/* Volume */}
              <div style={{ fontSize: 13, color: '#0a0b0d' }}>{fmtMktCap(coin.volume24h)}</div>

              {/* Sparkline */}
              <div>
                <Sparkline positive={pos} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
