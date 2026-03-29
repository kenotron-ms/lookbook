import { TrendingUp, ArrowDownLeft, ArrowUpRight, RefreshCw, Send, Download } from 'lucide-react'
import { portfolio, myAssets, watchlist, marketStats } from '../data/crypto.js'

function CoinIcon({ color, bg, symbol }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: '50%',
      background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 11, fontWeight: 700, color }}>{symbol}</span>
    </div>
  )
}

function PctBadge({ value }) {
  const pos = value >= 0
  return (
    <span style={{
      fontSize: 12, fontWeight: 600, padding: '2px 7px', borderRadius: 4,
      background: pos ? '#e6f9f0' : '#fef0f0',
      color: pos ? '#05b169' : '#fa3d33',
    }}>
      {pos ? '+' : ''}{value.toFixed(2)}%
    </span>
  )
}

function QuickAction({ icon: Icon, label }) {
  return (
    <button style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      background: '#f5f7fa', border: '1px solid #e6e8ea',
      borderRadius: 10, padding: '14px 20px', cursor: 'pointer',
      transition: 'background 0.15s',
    }}>
      <div style={{
        width: 40, height: 40, borderRadius: 8, background: '#1652f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color="#fff" strokeWidth={2} />
      </div>
      <span style={{ fontSize: 13, fontWeight: 500, color: '#0a0b0d' }}>{label}</span>
    </button>
  )
}

function AssetRow({ coin, owned }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 0', borderBottom: '1px solid #f5f7fa',
    }}>
      <CoinIcon color={coin.color} bg={coin.bg} symbol={coin.symbol} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>{coin.name}</div>
        <div style={{ fontSize: 12, color: '#8a919e', marginTop: 1 }}>{coin.symbol}</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <PctBadge value={coin.change24h} />
      </div>
      <div style={{ textAlign: 'right', minWidth: 80 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#0a0b0d' }}>
          ${coin.price.toLocaleString('en-US', { minimumFractionDigits: coin.price < 10 ? 4 : 2, maximumFractionDigits: coin.price < 10 ? 4 : 2 })}
        </div>
        {owned && (
          <div style={{ fontSize: 12, color: '#8a919e', marginTop: 1 }}>
            ${coin.holdingsValue.toLocaleString()}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { totalValue, change24hAmount, change24hPct, allocation } = portfolio

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 24px' }}>

      {/* Portfolio Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 13, color: '#8a919e', marginBottom: 6, fontWeight: 500 }}>Portfolio value</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12 }}>
          <span style={{ fontSize: 42, fontWeight: 700, letterSpacing: '-1px', color: '#0a0b0d' }}>
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <TrendingUp size={15} color="#05b169" />
            <span style={{ fontSize: 14, color: '#05b169', fontWeight: 600 }}>
              +${change24hAmount.toFixed(2)} ({change24hPct.toFixed(2)}%)
            </span>
            <span style={{ fontSize: 13, color: '#8a919e' }}>past 24h</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Allocation Chart */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d', marginBottom: 16 }}>
              Portfolio Allocation
            </div>
            {/* Horizontal bar */}
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 14 }}>
              {allocation.map((seg, i) => (
                <div
                  key={seg.symbol}
                  style={{
                    width: `${seg.pct}%`,
                    background: seg.color,
                    borderRadius: i === 0 ? '6px 0 0 6px' : i === allocation.length - 1 ? '0 6px 6px 0' : 0,
                  }}
                />
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
              {allocation.map(seg => (
                <div key={seg.symbol} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: seg.color }} />
                  <span style={{ fontSize: 12, color: '#8a919e' }}>{seg.symbol}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#0a0b0d' }}>{seg.pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d', marginBottom: 16 }}>
              Quick Actions
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <QuickAction icon={ArrowDownLeft} label="Buy" />
              <QuickAction icon={ArrowUpRight} label="Sell" />
              <QuickAction icon={RefreshCw} label="Convert" />
              <QuickAction icon={Send} label="Send" />
              <QuickAction icon={Download} label="Receive" />
            </div>
          </div>

          {/* My Assets */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>My Assets</div>
              <button style={{ fontSize: 12, color: '#1652f0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                View all
              </button>
            </div>
            {/* Column headers */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0', borderBottom: '1px solid #e6e8ea', marginBottom: 4,
            }}>
              <div style={{ flex: 1, fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Asset</div>
              <div style={{ fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>24h</div>
              <div style={{ textAlign: 'right', minWidth: 80, fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price / Value</div>
            </div>
            {myAssets.map(coin => <AssetRow key={coin.id} coin={coin} owned />)}
          </div>

          {/* Watchlist */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>Watchlist</div>
              <button style={{ fontSize: 12, color: '#1652f0', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                Edit
              </button>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '8px 0', borderBottom: '1px solid #e6e8ea', marginBottom: 4,
            }}>
              <div style={{ flex: 1, fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Asset</div>
              <div style={{ fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>24h</div>
              <div style={{ textAlign: 'right', minWidth: 80, fontSize: 11, color: '#8a919e', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Price</div>
            </div>
            {watchlist.map(coin => <AssetRow key={coin.id} coin={coin} owned={false} />)}
          </div>
        </div>

        {/* Right column — Market Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d', marginBottom: 16 }}>Market Overview</div>
            {[
              { label: 'Market Cap', value: marketStats.marketCap },
              { label: '24h Volume', value: marketStats.volume24h },
              { label: 'BTC Dominance', value: marketStats.btcDominance },
            ].map(stat => (
              <div key={stat.label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: '1px solid #f5f7fa',
              }}>
                <span style={{ fontSize: 13, color: '#8a919e' }}>{stat.label}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d' }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* News / Info card */}
          <div style={{
            background: '#eef1fe', border: '1px solid #c5cef8',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1652f0', marginBottom: 8 }}>
              Vault Rewards
            </div>
            <div style={{ fontSize: 13, color: '#0a0b0d', lineHeight: 1.6, marginBottom: 16 }}>
              Earn up to <strong>18.5% APY</strong> by staking your crypto with Vault. No minimums on ETH staking.
            </div>
            <button style={{
              width: '100%', padding: '10px', borderRadius: 8,
              background: '#1652f0', color: '#ffffff',
              fontWeight: 600, fontSize: 13, border: 'none', cursor: 'pointer',
            }}>
              Start Earning
            </button>
          </div>

          {/* Your balances */}
          <div style={{
            background: '#ffffff', border: '1px solid #e6e8ea',
            borderRadius: 12, padding: '20px 24px',
          }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: '#0a0b0d', marginBottom: 16 }}>Your Balances</div>
            {myAssets.map(coin => (
              <div key={coin.id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: '1px solid #f5f7fa',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: coin.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: coin.color }}>{coin.symbol}</span>
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#0a0b0d' }}>{coin.symbol}</div>
                    <div style={{ fontSize: 11, color: '#8a919e' }}>{coin.holdings} {coin.symbol}</div>
                  </div>
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#0a0b0d' }}>
                  ${coin.holdingsValue.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
