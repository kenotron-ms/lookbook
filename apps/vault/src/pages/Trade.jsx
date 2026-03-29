import { useState, useMemo } from 'react'
import { ChevronDown, ArrowUpDown } from 'lucide-react'
import { cryptos, generateChartData } from '../data/crypto.js'

const TIMEFRAMES = ['1H', '1D', '1W', '1M', '1Y']

function SparkLine({ data, positive }) {
  const W = 760, H = 280
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W
    const y = H - ((v - min) / range) * (H - 20) - 10
    return `${x},${y}`
  })
  const linePath = `M${pts.join(' L')}`
  const fillPath = `M${pts[0]} L${pts.join(' L')} L${W},${H} L0,${H} Z`
  const gradId = positive ? 'blueGrad' : 'redGrad'
  const lineColor = positive ? '#1652f0' : '#fa3d33'
  const stopColor = positive ? '#1652f0' : '#fa3d33'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stopColor} stopOpacity="0.18" />
          <stop offset="100%" stopColor={stopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill={`url(#${gradId})`} />
      <path d={linePath} fill="none" stroke={lineColor} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {/* Current price dot */}
      <circle cx={W} cy={pts[pts.length - 1].split(',')[1]} r="4" fill={lineColor} />
    </svg>
  )
}

export default function Trade() {
  const [selectedCoin, setSelectedCoin] = useState(cryptos[0])
  const [timeframe, setTimeframe] = useState('1D')
  const [tab, setTab] = useState('buy')
  const [amount, setAmount] = useState('')
  const [inputMode, setInputMode] = useState('usd')

  const chartData = useMemo(() => generateChartData(timeframe), [timeframe])
  const chartStart = chartData[0]
  const chartEnd = chartData[chartData.length - 1]
  const positive = chartEnd >= chartStart

  const priceChange = selectedCoin.change24h
  const priceChangeAmt = (selectedCoin.price * Math.abs(priceChange) / 100).toFixed(2)
  const usdAmount = parseFloat(amount) || 0
  const coinAmount = inputMode === 'usd' ? (usdAmount / selectedCoin.price).toFixed(6) : (usdAmount * selectedCoin.price).toFixed(2)
  const fee = (usdAmount * 0.015).toFixed(2)
  const networkFee = '0.59'
  const total = (usdAmount + parseFloat(fee) + parseFloat(networkFee)).toFixed(2)

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24 }}>

        {/* Chart panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Asset selector */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: '#ffffff', border: '1px solid #e6e8ea', borderRadius: 12, padding: '14px 20px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: selectedCoin.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: selectedCoin.color }}>{selectedCoin.symbol}</span>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#0a0b0d' }}>{selectedCoin.symbol}</div>
                <div style={{ fontSize: 12, color: '#8a919e' }}>{selectedCoin.name}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <select
                style={{ border: 'none', background: 'transparent', fontSize: 13, color: '#1652f0', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
                value={selectedCoin.id}
                onChange={e => setSelectedCoin(cryptos.find(c => c.id === e.target.value))}
              >
                {cryptos.map(c => <option key={c.id} value={c.id}>{c.symbol} — {c.name}</option>)}
              </select>
              <ChevronDown size={15} color="#1652f0" />
            </div>
          </div>

          {/* Chart */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea', borderRadius: 12,
            padding: '20px 0 0 0', overflow: 'hidden',
          }}>
            {/* Timeframe selectors */}
            <div style={{ display: 'flex', gap: 4, padding: '0 20px', marginBottom: 12 }}>
              {TIMEFRAMES.map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  style={{
                    padding: '4px 14px', borderRadius: 6, fontSize: 13, fontWeight: 500,
                    border: 'none', cursor: 'pointer',
                    background: tf === timeframe ? '#1652f0' : 'transparent',
                    color: tf === timeframe ? '#ffffff' : '#8a919e',
                    transition: 'all 0.15s',
                  }}
                >{tf}</button>
              ))}
            </div>

            {/* Chart area */}
            <div style={{ padding: '0 0' }}>
              <SparkLine data={chartData} positive={positive} />
            </div>
          </div>

          {/* Price display */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea', borderRadius: 12, padding: '16px 20px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', color: '#0a0b0d' }}>
                ${selectedCoin.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
              <div style={{ fontSize: 13, color: priceChange >= 0 ? '#05b169' : '#fa3d33', marginTop: 3, fontWeight: 500 }}>
                {priceChange >= 0 ? '+' : '−'}${Math.abs(parseFloat(priceChangeAmt)).toLocaleString()} ({priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%) today
              </div>
            </div>
            <div style={{
              padding: '4px 10px', borderRadius: 6,
              background: priceChange >= 0 ? '#e6f9f0' : '#fef0f0',
              fontSize: 12, fontWeight: 600,
              color: priceChange >= 0 ? '#05b169' : '#fa3d33',
            }}>
              {priceChange >= 0 ? '▲' : '▼'} {Math.abs(priceChange).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Buy/Sell Panel */}
        <div style={{
          background: '#ffffff', border: '1px solid #e6e8ea', borderRadius: 12,
          padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, alignSelf: 'start',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            background: '#f5f7fa', borderRadius: 8, padding: 3,
          }}>
            {['buy', 'sell'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: '8px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontWeight: 600, fontSize: 14, textTransform: 'capitalize',
                  background: tab === t ? '#ffffff' : 'transparent',
                  color: tab === t ? (t === 'buy' ? '#1652f0' : '#fa3d33') : '#8a919e',
                  boxShadow: tab === t ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all 0.15s',
                }}
              >{t === 'buy' ? 'Buy' : 'Sell'}</button>
            ))}
          </div>

          {/* Amount Input */}
          <div>
            <div style={{ fontSize: 12, color: '#8a919e', marginBottom: 6, fontWeight: 500 }}>Amount</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              border: '1.5px solid #e6e8ea', borderRadius: 8, padding: '10px 14px',
              background: '#ffffff',
            }}>
              <span style={{ fontSize: 18, color: '#8a919e' }}>{inputMode === 'usd' ? '$' : ''}</span>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 20, fontWeight: 600, color: '#0a0b0d', background: 'transparent',
                }}
              />
              <button
                onClick={() => setInputMode(m => m === 'usd' ? 'coin' : 'usd')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px',
                  borderRadius: 6, border: '1px solid #e6e8ea', background: '#f5f7fa',
                  fontSize: 12, fontWeight: 600, color: '#0a0b0d', cursor: 'pointer',
                }}
              >
                {inputMode === 'usd' ? 'USD' : selectedCoin.symbol}
                <ArrowUpDown size={11} />
              </button>
            </div>
          </div>

          {/* Estimated preview */}
          {amount && (
            <div style={{
              background: '#f5f7fa', borderRadius: 8, padding: '12px 14px',
              fontSize: 13, color: '#8a919e',
            }}>
              <span>≈ </span>
              {inputMode === 'usd' ? (
                <><strong style={{ color: '#0a0b0d' }}>{coinAmount}</strong> {selectedCoin.symbol}</>
              ) : (
                <><strong style={{ color: '#0a0b0d' }}>${parseFloat(coinAmount).toLocaleString()}</strong> USD</>
              )}
            </div>
          )}

          {/* Buy Button */}
          <button style={{
            width: '100%', padding: '14px', borderRadius: 8,
            background: tab === 'buy' ? '#1652f0' : '#fa3d33',
            color: '#ffffff', fontWeight: 700, fontSize: 15,
            border: 'none', cursor: 'pointer',
            transition: 'opacity 0.15s',
          }}>
            {tab === 'buy' ? `Buy ${selectedCoin.symbol}` : `Sell ${selectedCoin.symbol}`}
          </button>

          {/* Order summary */}
          {amount && (
            <div style={{ borderTop: '1px solid #e6e8ea', paddingTop: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#8a919e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 10 }}>
                Order Summary
              </div>
              {[
                { label: 'Vault fee (1.5%)', value: `$${fee}` },
                { label: 'Network fee', value: `$${networkFee}` },
                { label: 'Total', value: `$${total}`, bold: true },
              ].map(row => (
                <div key={row.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '6px 0', borderBottom: row.label !== 'Total' ? '1px solid #f5f7fa' : 'none',
                }}>
                  <span style={{ fontSize: 13, color: '#8a919e' }}>{row.label}</span>
                  <span style={{ fontSize: 13, fontWeight: row.bold ? 700 : 500, color: '#0a0b0d' }}>{row.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Payment method */}
          <div style={{
            border: '1px solid #e6e8ea', borderRadius: 8, padding: '10px 14px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div style={{ fontSize: 13, color: '#8a919e' }}>Pay with</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{
                width: 20, height: 14, borderRadius: 2, background: '#1652f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 7, fontWeight: 700, color: '#fff' }}>VISA</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#0a0b0d' }}>•••• 4242</span>
              <ChevronDown size={13} color="#8a919e" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
