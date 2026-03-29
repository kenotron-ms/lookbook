import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Bookmark, Star, TrendingUp } from 'lucide-react'
import { titles } from '../data/titles.js'

const FILTERS = ['All', 'Movies', 'TV Series', 'Mini-Series']

export default function Charts() {
  const navigate = useNavigate()
  const [active, setActive] = useState('All')

  const filtered = [...titles]
    .filter(t => {
      if (active === 'All') return true
      if (active === 'Movies') return t.type === 'movie'
      if (active === 'TV Series') return t.type === 'series'
      if (active === 'Mini-Series') return t.type === 'mini'
      return true
    })
    .sort((a, b) => b.score - a.score)

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <TrendingUp size={24} color="#f5c518" />
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f5f5f5' }}>Screen Top 250</h1>
          </div>
          <p style={{ color: '#9c9c9c', fontSize: 14, lineHeight: 1.6 }}>
            The definitive list of the highest-rated films and series, as rated by Screen users.
            Updated weekly.
          </p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-tab ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Column headers */}
        <div style={{ display: 'grid', gridTemplateColumns: '52px 60px 1fr 120px 80px 40px', gap: 12, padding: '8px 16px', marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rank</span>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}></span>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Title</span>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'center' }}>Rating</span>
          <span style={{ fontSize: 11, color: '#666', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>Your Rating</span>
          <span />
        </div>

        {/* List */}
        <div style={{ background: '#252525', borderRadius: 10, border: '1px solid #3a3a3a', overflow: 'hidden' }}>
          {filtered.map((t, i) => (
            <div
              key={t.id}
              onClick={() => navigate('/title')}
              style={{
                display: 'grid',
                gridTemplateColumns: '52px 60px 1fr 120px 80px 40px',
                gap: 12,
                alignItems: 'center',
                padding: '14px 16px',
                borderBottom: i < filtered.length - 1 ? '1px solid #2e2e2e' : 'none',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {/* Rank */}
              <span style={{ fontSize: i < 3 ? 20 : 16, fontWeight: 700, color: i < 3 ? '#f5c518' : '#6a6a6a', textAlign: 'right', paddingRight: 4 }}>
                {i + 1}
              </span>

              {/* Poster */}
              <div style={{ width: 44, height: 62, borderRadius: 4, background: t.gradient, position: 'relative', flexShrink: 0 }}>
                {i < 3 && (
                  <div style={{
                    position: 'absolute', top: -4, right: -4, width: 16, height: 16,
                    background: '#f5c518', borderRadius: '50%', display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 8, fontWeight: 900, color: '#000' }}>★</span>
                  </div>
                )}
              </div>

              {/* Title + info */}
              <div>
                <div style={{ fontWeight: 600, color: '#f5f5f5', fontSize: 15, marginBottom: 3 }}>{t.title}</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: '#9c9c9c' }}>{t.year}</span>
                  <span className="tag" style={{ fontSize: 10 }}>{t.rating}</span>
                  <span style={{ fontSize: 12, color: '#9c9c9c' }}>{t.duration}</span>
                </div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  {t.genre.slice(0, 2).map(g => (
                    <span className="genre-tag" key={g} style={{ fontSize: 10, padding: '1px 6px' }}>{g}</span>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
                  <Star size={15} color="#f5c518" fill="#f5c518" />
                  <span style={{ fontWeight: 800, fontSize: 17, color: '#f5c518' }}>{t.score}</span>
                </div>
                <div style={{ fontSize: 11, color: '#9c9c9c' }}>{t.votes} votes</div>
              </div>

              {/* Your rating */}
              <div style={{ textAlign: 'right' }}>
                <button
                  onClick={e => e.stopPropagation()}
                  style={{
                    background: 'transparent', border: '1px solid #3a3a3a',
                    color: '#9c9c9c', fontSize: 11, padding: '4px 8px',
                    borderRadius: 4, cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: 3,
                  }}
                >
                  <Star size={11} />
                  Rate
                </button>
              </div>

              {/* Watchlist */}
              <button
                onClick={e => e.stopPropagation()}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#9c9c9c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                title="Add to Watchlist"
              >
                <Bookmark size={17} />
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: '#555', fontSize: 12, marginTop: 20 }}>
          Showing {filtered.length} of 250 titles · Ratings updated weekly
        </p>
      </div>
    </div>
  )
}
