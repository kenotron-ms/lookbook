import { useState } from 'react'
import { Bell, ChevronRight, Lock } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { portfolioValue, portfolioChange, portfolioChangePct, portfolioHistory, stocks, cryptos } from '../data/stocks.js'

const TIME_RANGES = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

function PortfolioChart({ history, range }) {
  const w = 400
  const h = 200
  const pad = { top: 12, bottom: 8, left: 0, right: 0 }

  const slice = (() => {
    switch (range) {
      case '1D': return history.slice(-8)
      case '1W': return history.slice(-14)
      case '1M': return history.slice(-30)
      case '3M': return history.slice(-45)
      default: return history
    }
  })()

  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const rangeVal = max - min || 1

  const xScale = (i) => pad.left + (i / (slice.length - 1)) * (w - pad.left - pad.right)
  const yScale = (v) => pad.top + ((max - v) / rangeVal) * (h - pad.top - pad.bottom)

  const positive = slice[slice.length - 1] >= slice[0]
  const lineColor = positive ? '#00c805' : '#ef4444'
  const gradId = `pg-${range}`

  const points = slice.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' L ')
  const linePath = `M ${points}`
  const fillPath = `${linePath} L ${xScale(slice.length - 1)},${h} L ${xScale(0)},${h} Z`

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.25" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function Sparkline({ history, positive }) {
  const w = 60
  const h = 24
  const min = Math.min(...history)
  const max = Math.max(...history)
  const rangeVal = max - min || 1
  const xScale = (i) => (i / (history.length - 1)) * w
  const yScale = (v) => 2 + ((max - v) / rangeVal) * (h - 4)
  const points = history.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' L ')
  const path = `M ${points}`
  const color = positive ? '#00c805' : '#ef4444'
  return (
    <svg width={w} height={h} style={{ display: 'block', flexShrink: 0 }}>
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function StockRow({ item, onPress }) {
  const positive = item.change >= 0
  const pctStr = `${positive ? '+' : ''}${item.changePct.toFixed(2)}%`
  const priceStr = item.price >= 1000
    ? item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : item.price.toFixed(2)

  return (
    <div
      onClick={() => onPress(item.ticker)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 16px',
        cursor: 'pointer',
        transition: 'background 0.1s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Logo circle */}
      <div style={{
        width: 40, height: 40, borderRadius: '50%',
        background: item.color, color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: 15, flexShrink: 0,
      }}>
        {item.ticker[0]}
      </div>

      {/* Name */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: '#1a1a1a' }}>{item.ticker}</div>
        <div style={{ fontSize: 12, color: '#6b7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</div>
      </div>

      {/* Sparkline */}
      <Sparkline history={item.history.slice(-20)} positive={positive} />

      {/* Change + price */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1a1a' }}>${priceStr}</div>
        <div style={{ fontSize: 12, color: positive ? '#00c805' : '#ef4444', fontWeight: 500 }}>{pctStr}</div>
      </div>
    </div>
  )
}

export default function Home() {
  const [range, setRange] = useState('1D')
  const navigate = useNavigate()

  const portfolioStr = portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const changeStr = `+$${portfolioChange.toFixed(2)} (${portfolioChangePct.toFixed(2)}%) Today`

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '56px 16px 12px' }}>
        <div>
          <span style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a' }}>Good morning, Jordan</span>
        </div>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#1a1a1a' }}>
          <Bell size={22} />
        </button>
      </div>

      {/* Portfolio value */}
      <div style={{ padding: '0 16px 4px' }}>
        <div style={{ fontSize: 36, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-1px' }}>${portfolioStr}</div>
        <div style={{ fontSize: 14, color: '#00c805', fontWeight: 500, marginTop: 2 }}>{changeStr}</div>
      </div>

      {/* Portfolio chart */}
      <div style={{ padding: '12px 0 0' }}>
        <PortfolioChart history={portfolioHistory} range={range} />
      </div>

      {/* Time range selectors */}
      <div style={{ display: 'flex', padding: '8px 16px 0', gap: 2 }}>
        {TIME_RANGES.map(r => (
          <button
            key={r}
            onClick={() => setRange(r)}
            style={{
              flex: 1, padding: '6px 0',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, fontWeight: range === r ? 700 : 400,
              color: range === r ? '#00c805' : '#6b7280',
              borderBottom: range === r ? '2px solid #00c805' : '2px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Stocks Section */}
      <div style={{ marginTop: 24 }}>
        <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Stocks</span>
          <ChevronRight size={18} color="#6b7280" />
        </div>
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
          {stocks.slice(0, 5).map(s => (
            <div key={s.id}>
              <StockRow item={s} onPress={(ticker) => navigate(`/stock/${ticker}`)} />
              <div style={{ height: 1, background: '#f0f0f0', margin: '0 16px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Crypto Section */}
      <div style={{ marginTop: 20 }}>
        <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Crypto</span>
          <ChevronRight size={18} color="#6b7280" />
        </div>
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
          {cryptos.map(c => (
            <div key={c.id}>
              <StockRow item={c} onPress={() => {}} />
              <div style={{ height: 1, background: '#f0f0f0', margin: '0 16px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* Options Section */}
      <div style={{ marginTop: 20 }}>
        <div style={{ padding: '0 16px 8px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Options</span>
          <span style={{
            fontSize: 10, fontWeight: 700, color: '#fff',
            background: '#00c805', borderRadius: 4, padding: '2px 6px', letterSpacing: 0.5,
          }}>GOLD</span>
        </div>
        <div style={{
          margin: '0 16px', padding: 16, background: '#f9fafb',
          borderRadius: 12, border: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Lock size={20} color="#6b7280" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Upgrade to Trade Gold</div>
            <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Access options trading and more</div>
          </div>
        </div>
      </div>
    </div>
  )
}
