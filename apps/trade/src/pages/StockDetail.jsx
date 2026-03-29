import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star } from 'lucide-react'
import { stocks } from '../data/stocks.js'

const TIME_RANGES = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

function StockChart({ history, range, color }) {
  const w = 400
  const h = 300
  const pad = { top: 20, bottom: 20, left: 0, right: 48 }

  const slice = (() => {
    switch (range) {
      case '1D': return history.slice(-10)
      case '1W': return history.slice(-15)
      case '1M': return history.slice(-30)
      case '3M': return history.slice(-45)
      default: return history
    }
  })()

  const min = Math.min(...slice)
  const max = Math.max(...slice)
  const rangeVal = max - min || 1
  const positive = slice[slice.length - 1] >= slice[0]
  const lineColor = positive ? '#00c805' : '#ef4444'
  const gradId = `sc-${range}`

  const xScale = (i) => pad.left + (i / (slice.length - 1)) * (w - pad.left - pad.right)
  const yScale = (v) => pad.top + ((max - v) / rangeVal) * (h - pad.top - pad.bottom)

  const points = slice.map((v, i) => `${xScale(i)},${yScale(v)}`).join(' L ')
  const linePath = `M ${points}`
  const fillPath = `${linePath} L ${xScale(slice.length - 1)},${h - pad.bottom} L ${xScale(0)},${h - pad.bottom} Z`

  // Y-axis labels
  const yLabels = [max, (max + min) / 2, min].map((v, i) => ({
    value: v.toFixed(2),
    y: i === 0 ? pad.top + 4 : i === 1 ? h / 2 : h - pad.bottom,
  }))

  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {/* Crosshair dot at end */}
      <circle
        cx={xScale(slice.length - 1)}
        cy={yScale(slice[slice.length - 1])}
        r="4" fill={lineColor}
      />
      {/* Y-axis labels */}
      {yLabels.map((lbl, i) => (
        <text key={i} x={w - 4} y={lbl.y} textAnchor="end" fontSize="10" fill="#9ca3af" fontFamily="Inter, sans-serif">
          ${lbl.value}
        </text>
      ))}
    </svg>
  )
}

function EarningsBar({ label, value, max }) {
  const positive = value >= 0
  const barH = Math.abs(value / max) * 40
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1 }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: positive ? '#00c805' : '#ef4444' }}>
        ${Math.abs(value).toFixed(2)}
      </div>
      <div style={{ height: 48, display: 'flex', alignItems: 'flex-end' }}>
        <div style={{
          width: 24, height: barH,
          background: positive ? '#00c805' : '#ef4444',
          borderRadius: '3px 3px 0 0', minHeight: 4,
        }} />
      </div>
      <div style={{ fontSize: 10, color: '#6b7280' }}>{label}</div>
    </div>
  )
}

export default function StockDetail() {
  const { ticker } = useParams()
  const navigate = useNavigate()
  const [range, setRange] = useState('1D')
  const [starred, setStarred] = useState(false)

  const stock = stocks.find(s => s.ticker === ticker) || stocks[0]
  const positive = stock.change >= 0
  const changeStr = `${positive ? '+' : ''}$${Math.abs(stock.change).toFixed(2)} (${positive ? '+' : ''}${stock.changePct.toFixed(2)}%)`
  const priceStr = stock.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const earnings = [
    { label: 'Q1 23', value: 1.12 },
    { label: 'Q2 23', value: 1.26 },
    { label: 'Q3 23', value: -0.43 },
    { label: 'Q4 23', value: 1.68 },
    { label: 'Q1 24', value: 1.53 },
  ]
  const maxEps = Math.max(...earnings.map(e => Math.abs(e.value)))

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '56px 16px 12px',
      }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <ArrowLeft size={22} color="#1a1a1a" />
        </button>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>{stock.ticker}</div>
          <div style={{ fontSize: 12, color: '#6b7280' }}>{stock.name}</div>
        </div>
        <button onClick={() => setStarred(!starred)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <Star size={22} color={starred ? '#f59e0b' : '#6b7280'} fill={starred ? '#f59e0b' : 'none'} />
        </button>
      </div>

      {/* Price */}
      <div style={{ padding: '0 16px 16px' }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: '#1a1a1a', letterSpacing: '-1px' }}>${priceStr}</div>
        <div style={{ fontSize: 14, color: positive ? '#00c805' : '#ef4444', fontWeight: 500, marginTop: 2 }}>
          {changeStr} Today
        </div>
      </div>

      {/* Chart */}
      <div style={{ borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0', padding: '8px 0 0' }}>
        <StockChart history={stock.history} range={range} color={stock.color} />
        {/* Time ranges */}
        <div style={{ display: 'flex', padding: '4px 16px 8px', gap: 2 }}>
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
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Buy/Sell Buttons */}
      <div style={{ display: 'flex', gap: 12, padding: '16px 16px' }}>
        <button style={{
          flex: 1, padding: '14px 0', borderRadius: 10,
          background: '#00c805', color: '#fff', border: 'none',
          fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}>
          Buy {stock.ticker}
        </button>
        <button style={{
          flex: 1, padding: '14px 0', borderRadius: 10,
          background: '#f3f4f6', color: '#1a1a1a', border: 'none',
          fontWeight: 700, fontSize: 15, cursor: 'pointer',
        }}>
          Sell {stock.ticker}
        </button>
      </div>

      {/* Key Stats */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Key Statistics</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0' }}>
          {[
            { label: 'Open', value: `$${stock.open}` },
            { label: 'Market Cap', value: stock.marketCap },
            { label: 'High', value: `$${stock.high}` },
            { label: 'P/E Ratio', value: stock.pe },
            { label: 'Low', value: `$${stock.low}` },
            { label: 'Dividend', value: stock.dividend === '—' ? '—' : `$${stock.dividend}` },
            { label: '52W High', value: `$${stock.week52High}` },
            { label: '52W Low', value: `$${stock.week52Low}` },
          ].map(({ label, value }) => (
            <div key={label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '10px 0', borderBottom: '1px solid #f0f0f0',
            }}>
              <span style={{ fontSize: 13, color: '#6b7280' }}>{label}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>About</div>
        <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6 }}>
          {stock.description}
        </p>
        <button style={{ background: 'none', border: 'none', color: '#00c805', fontSize: 13, fontWeight: 600, padding: '6px 0', cursor: 'pointer' }}>
          Show more
        </button>
      </div>

      {/* Earnings */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>Earnings per Share</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, paddingBottom: 4 }}>
          {earnings.map(e => (
            <EarningsBar key={e.label} label={e.label} value={e.value} max={maxEps} />
          ))}
        </div>
      </div>

      {/* News */}
      <div style={{ padding: '0 16px', marginBottom: 24 }}>
        <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>News</div>
        {[
          { headline: `${stock.name} beats analyst expectations with strong quarterly results`, source: 'Bloomberg', time: '2h ago' },
          { headline: `Wall Street upgrades ${stock.ticker} following strong product pipeline`, source: 'Reuters', time: '5h ago' },
          { headline: `${stock.name} expands into new markets amid growing demand`, source: 'WSJ', time: '1d ago' },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '12px 0',
            borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', lineHeight: 1.5, marginBottom: 4 }}>
              {item.headline}
            </div>
            <div style={{ fontSize: 11, color: '#9ca3af' }}>
              {item.source} · {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
