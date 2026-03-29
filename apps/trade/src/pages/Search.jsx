import { useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { stocks, cryptos, popularLists, trendingStocks } from '../data/stocks.js'

const allAssets = [...stocks, ...cryptos]

export default function Search() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const results = query.length > 0
    ? allAssets.filter(a =>
        a.ticker.toLowerCase().includes(query.toLowerCase()) ||
        a.name.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '56px 16px 12px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>Discover</h1>

        {/* Search input */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#f3f4f6', borderRadius: 12, padding: '10px 14px',
        }}>
          <SearchIcon size={18} color="#9ca3af" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search stocks, ETFs, crypto..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 15, color: '#1a1a1a',
            }}
          />
          {query.length > 0 && (
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}>
              <X size={16} color="#9ca3af" />
            </button>
          )}
        </div>
      </div>

      {/* Search results */}
      {results.length > 0 && (
        <div style={{ borderTop: '1px solid #f0f0f0' }}>
          {results.map(item => {
            const positive = item.change >= 0
            return (
              <div
                key={item.id}
                onClick={() => stocks.find(s => s.id === item.id) ? navigate(`/stock/${item.ticker}`) : null}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px', cursor: 'pointer',
                  borderBottom: '1px solid #f0f0f0',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: item.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}>
                  {item.ticker[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{item.ticker}</div>
                  <div style={{ fontSize: 12, color: '#6b7280' }}>{item.name}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <div style={{ fontSize: 12, color: positive ? '#00c805' : '#ef4444' }}>
                    {positive ? '+' : ''}{item.changePct.toFixed(2)}%
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Trending */}
      {query.length === 0 && (
        <>
          <div style={{ padding: '4px 16px 10px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Trending</div>
            <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
              {trendingStocks.map(ticker => {
                const s = stocks.find(s => s.ticker === ticker)
                const positive = s?.change >= 0
                return (
                  <div
                    key={ticker}
                    onClick={() => navigate(`/stock/${ticker}`)}
                    style={{
                      flexShrink: 0, padding: '8px 14px',
                      background: '#f3f4f6', borderRadius: 20,
                      display: 'flex', alignItems: 'center', gap: 6,
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: s?.color, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 700,
                    }}>
                      {ticker[0]}
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{ticker}</span>
                    <span style={{ fontSize: 12, color: positive ? '#00c805' : '#ef4444' }}>
                      {positive ? '+' : ''}{s?.changePct.toFixed(2)}%
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Popular Lists */}
          <div style={{ padding: '16px 16px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>Popular Lists</div>
            <div style={{ borderTop: '1px solid #f0f0f0' }}>
              {popularLists.map(list => (
                <div key={list.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '12px 0', borderBottom: '1px solid #f0f0f0',
                  cursor: 'pointer',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: '#f3f4f6',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 22,
                  }}>
                    {list.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{list.name}</div>
                    <div style={{ fontSize: 12, color: '#6b7280' }}>{list.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Grid */}
          <div style={{ padding: '20px 16px 0' }}>
            <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>All Stocks &amp; ETFs</div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
            }}>
              {stocks.map(s => {
                const positive = s.change >= 0
                return (
                  <div
                    key={s.id}
                    onClick={() => navigate(`/stock/${s.ticker}`)}
                    style={{
                      padding: '14px 12px', borderRadius: 12,
                      border: '1px solid #f0f0f0', cursor: 'pointer',
                      transition: 'box-shadow 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                      <div style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: s.color, color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: 13,
                      }}>
                        {s.ticker[0]}
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{s.ticker}</div>
                        <div style={{ fontSize: 10, color: '#9ca3af', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 80 }}>{s.name.split(' ')[0]}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>
                      ${s.price >= 100 ? s.price.toFixed(0) : s.price.toFixed(2)}
                    </div>
                    <div style={{ fontSize: 12, color: positive ? '#00c805' : '#ef4444', fontWeight: 500 }}>
                      {positive ? '+' : ''}{s.changePct.toFixed(2)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
