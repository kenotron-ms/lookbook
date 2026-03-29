import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search as SearchIcon, X, Play } from 'lucide-react'
import { shows, categories } from '../data/content'

const topSearches = shows.slice(0, 8)

export default function Search() {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? shows.filter(s =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.genre.some(g => g.toLowerCase().includes(query.toLowerCase()))
      )
    : []

  return (
    <div style={{ background: '#141414', minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <div style={{ padding: '0 48px' }}>
        {/* Search Input */}
        <div style={{
          position: 'relative',
          marginBottom: '40px',
          maxWidth: '600px',
        }}>
          <SearchIcon
            size={20}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'rgba(255,255,255,0.4)',
            }}
          />
          <input
            type="text"
            placeholder="Search titles, genres, characters..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              padding: '14px 16px 14px 48px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '6px',
              color: '#fff',
              fontSize: '16px',
              fontFamily: 'inherit',
              outline: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onFocus={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.4)'
              e.target.style.background = 'rgba(255,255,255,0.12)'
            }}
            onBlur={e => {
              e.target.style.borderColor = 'rgba(255,255,255,0.15)'
              e.target.style.background = 'rgba(255,255,255,0.08)'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                display: 'flex',
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Search Results */}
        {query.trim() && (
          <div>
            <h2 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#e5e5e5',
              marginBottom: '20px',
            }}>
              {results.length > 0 ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : `No results for "${query}"`}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '8px',
            }}>
              {results.map(show => (
                <Link to="/title" key={show.id}>
                  <div
                    style={{
                      borderRadius: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{
                      width: '100%',
                      paddingBottom: '56.25%',
                      background: show.gradient,
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '8px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
                      }}>
                        <span style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#fff',
                          textShadow: '0 1px 4px rgba(0,0,0,0.6)',
                        }}>{show.title}</span>
                      </div>
                      <div style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.6)',
                        borderRadius: '3px',
                        padding: '2px 6px',
                        fontSize: '9px',
                        color: 'rgba(255,255,255,0.7)',
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}>
                        {show.rating}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty state: Top Searches + Genre Grid */}
        {!query.trim() && (
          <>
            {/* Top Searches */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#e5e5e5',
                marginBottom: '16px',
              }}>Top Searches</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {topSearches.map(show => (
                  <Link to="/title" key={show.id}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                    >
                      {/* Thumbnail */}
                      <div style={{
                        width: '100px',
                        height: '56px',
                        borderRadius: '3px',
                        background: show.gradient,
                        flexShrink: 0,
                      }} />

                      {/* Info */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#e5e5e5', marginBottom: '3px' }}>{show.title}</div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {show.genre.slice(0, 2).map(g => (
                            <span key={g} style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{g}</span>
                          ))}
                        </div>
                      </div>

                      {/* Play icon */}
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Play size={14} color="rgba(255,255,255,0.7)" fill="rgba(255,255,255,0.7)" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Genre Grid */}
            <div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#e5e5e5',
                marginBottom: '16px',
              }}>Browse by Genre</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
              }}>
                {categories.map(cat => (
                  <div
                    key={cat.name}
                    style={{
                      height: '80px',
                      borderRadius: '6px',
                      background: cat.gradient,
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <span style={{
                      fontSize: '16px',
                      fontWeight: '800',
                      color: cat.textColor,
                      textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                    }}>
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
