import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Trash2, Film } from 'lucide-react'
import { shows } from '../data/content'

const initialList = shows.slice(0, 12)

export default function MyList() {
  const [list, setList] = useState(initialList)

  const removeItem = (id) => setList(l => l.filter(s => s.id !== id))

  return (
    <div style={{ background: '#141414', minHeight: '100vh', paddingTop: '88px', paddingBottom: '60px' }}>
      <div style={{ padding: '0 48px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#fff',
            marginBottom: '6px',
          }}>My List</h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)' }}>
            {list.length} title{list.length !== 1 ? 's' : ''} saved
          </p>
        </div>

        {list.length === 0 ? (
          /* Empty state */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '40vh',
            gap: '16px',
            color: 'rgba(255,255,255,0.3)',
          }}>
            <Film size={56} strokeWidth={1} />
            <p style={{ fontSize: '20px', fontWeight: '600' }}>Your list is empty</p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.25)' }}>
              Add titles by clicking the + icon on any show or movie
            </p>
            <Link to="/">
              <button style={{
                marginTop: '8px',
                padding: '10px 24px',
                background: '#e50914',
                border: 'none',
                borderRadius: '4px',
                color: '#fff',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
              }}>
                Browse Content
              </button>
            </Link>
          </div>
        ) : (
          /* Grid */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '12px',
          }}>
            {list.map(show => (
              <div
                key={show.id}
                style={{
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: '#1a1a1a',
                  position: 'relative',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.querySelector('.remove-btn').style.opacity = '1'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.querySelector('.remove-btn').style.opacity = '0'
                }}
              >
                {/* Thumbnail */}
                <Link to="/title">
                  <div style={{
                    width: '100%',
                    paddingBottom: '56.25%',
                    background: show.gradient,
                    position: 'relative',
                  }}>
                    {/* Play overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0,0,0,0)',
                      transition: 'background 0.2s',
                    }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255,255,255,0.5)',
                      }}>
                        <Play size={18} color="#fff" fill="#fff" />
                      </div>
                    </div>

                    {/* Rating badge */}
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.65)',
                      borderRadius: '3px',
                      padding: '2px 7px',
                      fontSize: '10px',
                      color: 'rgba(255,255,255,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}>
                      {show.rating}
                    </div>
                  </div>
                </Link>

                {/* Remove button */}
                <button
                  className="remove-btn"
                  onClick={() => removeItem(show.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.7)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'rgba(255,255,255,0.7)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <Trash2 size={13} />
                </button>

                {/* Card info */}
                <div style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#e5e5e5' }}>{show.title}</span>
                    <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600', marginLeft: '8px', flexShrink: 0 }}>
                      {Math.floor(Math.random() * 15) + 84}%
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{show.year}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                      {show.type === 'series' ? `${show.seasons} Seasons` : `${show.runtime}m`}
                    </span>
                    {show.genre.slice(0, 1).map(g => (
                      <span key={g} style={{
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.35)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        padding: '1px 6px',
                        borderRadius: '10px',
                      }}>{g}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
