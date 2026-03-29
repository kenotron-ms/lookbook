import { useNavigate } from 'react-router-dom'
import { Plus, Play, Star, ChevronRight, TrendingUp } from 'lucide-react'
import { titles, boxOffice } from '../data/titles.js'

function StarRating({ score }) {
  const full = Math.floor(score / 2)
  const half = score / 2 - full >= 0.5 ? 1 : 0
  const empty = 5 - full - half
  return (
    <span className="stars">
      {'★'.repeat(full)}{'½'.repeat(half)}{'☆'.repeat(empty)}
    </span>
  )
}

function PosterCard({ title, onClick }) {
  return (
    <div className="poster-card" onClick={onClick}>
      <div className="poster-art" style={{ background: title.gradient }}>
        <span className="score-badge">⭐ {title.score}</span>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: '24px 10px 10px' }}>
          <div className="poster-title">{title.title}</div>
        </div>
      </div>
      <div className="poster-meta">
        <div style={{ marginBottom: 2 }}>{title.year} · {title.genre[0]}</div>
        <div style={{ color: '#f5c518', fontSize: 11 }}>
          {'★'.repeat(Math.floor(title.score / 2))} {title.score}
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const featured = titles[0]
  const topPicks = titles.slice(1, 6)
  const fanFavs = titles.slice(6, 11)
  const recent = titles.slice(11, 15)
  const topRated = [...titles].sort((a, b) => b.score - a.score).slice(0, 10)

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      {/* Featured Carousel */}
      <section style={{ height: 600, position: 'relative', overflow: 'hidden', background: featured.gradient }}>
        {/* Overlay gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 40%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120, background: 'linear-gradient(to top, #1a1a1a 0%, transparent 100%)' }} />

        {/* Content */}
        <div style={{ position: 'relative', padding: '80px 60px', maxWidth: 640 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
            {featured.genre.map(g => <span className="genre-tag" key={g}>{g}</span>)}
          </div>
          <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.1, color: '#fff', marginBottom: 12, textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
            {featured.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: '#f5c518', fontSize: 20 }}>★</span>
              <span style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{featured.score}</span>
              <span style={{ color: '#9c9c9c', fontSize: 14 }}>/ 10</span>
            </span>
            <span className="tag">{featured.rating}</span>
            <span style={{ color: '#9c9c9c', fontSize: 14 }}>{featured.duration}</span>
            <span style={{ color: '#9c9c9c', fontSize: 14 }}>{featured.year}</span>
          </div>
          <p style={{ color: '#d0d0d0', fontSize: 15, lineHeight: 1.6, marginBottom: 28, maxWidth: 520 }}>
            {featured.description}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-accent" onClick={() => navigate('/title')}>
              <Plus size={16} /> Add to Watchlist
            </button>
            <button className="btn-outline">
              <Play size={16} /> Play Trailer
            </button>
          </div>
        </div>

        {/* Carousel dots */}
        <div style={{ position: 'absolute', bottom: 28, right: 40, display: 'flex', gap: 6 }}>
          {[0,1,2,3,4].map(i => (
            <div key={i} style={{ width: i===0?24:8, height: 8, borderRadius: 4, background: i===0?'#f5c518':'rgba(255,255,255,0.3)' }} />
          ))}
        </div>
      </section>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>

        {/* Screen Charts + Box Office */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 32, marginBottom: 48 }}>
          <div>
            <div className="section-heading">
              <TrendingUp size={20} color="#f5c518" />
              Screen Charts
              <span className="see-all" onClick={() => navigate('/charts')}>See all →</span>
            </div>
            <div style={{ background: '#252525', borderRadius: 8, border: '1px solid #3a3a3a', overflow: 'hidden' }}>
              {topRated.slice(0, 5).map((t, i) => (
                <div
                  key={t.id}
                  onClick={() => navigate('/title')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
                    borderBottom: i < 4 ? '1px solid #3a3a3a' : 'none',
                    cursor: 'pointer', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span className="rank-num" style={{ fontSize: 18, minWidth: 28 }}>#{i+1}</span>
                  <div style={{ width: 38, height: 54, borderRadius: 4, background: t.gradient, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: '#f5f5f5' }}>{t.title}</div>
                    <div style={{ fontSize: 12, color: '#9c9c9c' }}>{t.year} · {t.genre[0]}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ color: '#f5c518', fontSize: 14 }}>★</span>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{t.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Box Office */}
          <div>
            <div className="section-heading" style={{ fontSize: 16 }}>
              Top Box Office
            </div>
            <div style={{ background: '#252525', borderRadius: 8, border: '1px solid #3a3a3a', overflow: 'hidden' }}>
              {boxOffice.map((entry, i) => (
                <div
                  key={entry.rank}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
                    borderBottom: i < boxOffice.length-1 ? '1px solid #3a3a3a' : 'none',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#9c9c9c', minWidth: 20 }}>{entry.rank}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f5f5' }}>{entry.title}</div>
                    <div style={{ fontSize: 11, color: '#9c9c9c' }}>Wk {entry.weeks} · Total: {entry.total}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#f5c518' }}>{entry.weekend}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#666', marginTop: 8, textAlign: 'right' }}>Weekend estimates</p>
          </div>
        </div>

        {/* Top Picks for You */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            Top Picks for You
            <span className="see-all">See all →</span>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 14 }}>
            {topPicks.map(t => (
              <PosterCard key={t.id} title={t} onClick={() => navigate('/title')} />
            ))}
          </div>
        </section>

        {/* Fan Favorites */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            Fan Favorites
            <span className="see-all">See all →</span>
          </div>
          <div className="scroll-x" style={{ display: 'flex', gap: 14 }}>
            {fanFavs.map(t => (
              <div
                key={t.id}
                className="poster-card"
                style={{ width: 180 }}
                onClick={() => navigate('/title')}
              >
                <div className="poster-art" style={{ background: t.gradient }}>
                  <span className="score-badge">⭐ {t.score}</span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)', padding: '24px 10px 10px' }}>
                    <div className="poster-title">{t.title}</div>
                  </div>
                </div>
                <div className="poster-meta">
                  <div style={{ marginBottom: 4 }}>{t.year} · {t.genre[0]}</div>
                  <StarRating score={t.score} />
                  <span style={{ color: '#f5c518', fontSize: 12, marginLeft: 4 }}>{t.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Released */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            Recently Released
            <span className="see-all">See all →</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {recent.map(t => (
              <div
                key={t.id}
                style={{ background: '#252525', borderRadius: 8, border: '1px solid #3a3a3a', overflow: 'hidden', cursor: 'pointer', transition: 'transform 0.2s' }}
                onClick={() => navigate('/title')}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ height: 200, background: t.gradient, position: 'relative' }}>
                  <span className="score-badge" style={{ position: 'absolute', top: 8, left: 8 }}>⭐ {t.score}</span>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)', padding: '30px 12px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{t.title}</div>
                  </div>
                </div>
                <div style={{ padding: '10px 12px' }}>
                  <div style={{ fontSize: 12, color: '#9c9c9c', marginBottom: 4 }}>{t.year} · {t.duration}</div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {t.genre.slice(0, 2).map(g => <span className="genre-tag" key={g} style={{ fontSize: 10 }}>{g}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Rated Movies List */}
        <section style={{ marginBottom: 48 }}>
          <div className="section-heading">
            Top Rated Movies
            <span className="see-all" onClick={() => navigate('/charts')}>Full list →</span>
          </div>
          <div style={{ background: '#252525', borderRadius: 8, border: '1px solid #3a3a3a', overflow: 'hidden' }}>
            {topRated.map((t, i) => (
              <div
                key={t.id}
                onClick={() => navigate('/title')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px',
                  borderBottom: i < 9 ? '1px solid #3a3a3a' : 'none',
                  cursor: 'pointer', transition: 'background 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="rank-num">{i+1}</span>
                <div style={{ width: 42, height: 60, borderRadius: 4, background: t.gradient, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: '#f5f5f5', fontSize: 14 }}>{t.title}</div>
                  <div style={{ fontSize: 12, color: '#9c9c9c' }}>{t.year} · {t.director}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <StarRating score={t.score} />
                    <span style={{ fontWeight: 700, fontSize: 14, color: '#f5c518' }}>{t.score}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#9c9c9c' }}>{t.genre[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer style={{ background: '#111', borderTop: '1px solid #2a2a2a', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ background: '#f5c518', borderRadius: 4, padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 14 }}>🎬</span>
          </div>
          <span style={{ color: '#f5c518', fontWeight: 900, fontSize: 16 }}>Screen</span>
        </div>
        <p style={{ color: '#555', fontSize: 12 }}>Every story ever told. A ParaNet service.</p>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16 }}>
          {['Help', 'Site Index', 'IMDbPro', 'Box Office Mojo', 'License'].map(l => (
            <span key={l} style={{ color: '#666', fontSize: 12, cursor: 'pointer' }}>{l}</span>
          ))}
        </div>
      </footer>
    </div>
  )
}
