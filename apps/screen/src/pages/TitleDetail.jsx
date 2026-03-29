import { useNavigate } from 'react-router-dom'
import { Plus, Play, Star, Award, Film, Users, ChevronRight, ThumbsUp } from 'lucide-react'
import { titles, castMembers, ratingDistribution, reviews } from '../data/titles.js'

const movie = titles[0]

function MetascoreColor(score) {
  if (score >= 80) return 'green'
  if (score >= 60) return 'yellow'
  return 'red'
}

export default function TitleDetail() {
  const navigate = useNavigate()
  const maxPct = Math.max(...ratingDistribution.map(r => r.pct))

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      {/* Title hero */}
      <div style={{ background: '#111', borderBottom: '1px solid #2a2a2a' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 24px' }}>
          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
            <div>
              <h1 style={{ fontSize: 38, fontWeight: 900, color: '#f5f5f5', lineHeight: 1.1, marginBottom: 8 }}>{movie.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <span style={{ color: '#9c9c9c', fontSize: 14 }}>{movie.year}</span>
                <span className="tag">{movie.rating}</span>
                <span style={{ color: '#9c9c9c', fontSize: 14 }}>{movie.duration}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  {movie.genre.map(g => <span className="genre-tag" key={g}>{g}</span>)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
              <button className="btn-accent">
                <Plus size={15} /> Add to Watchlist
              </button>
              <button className="btn-outline">
                <Play size={15} /> Play Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40 }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Rating row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '20px 0', borderBottom: '1px solid #3a3a3a', marginBottom: 24 }}>
            {/* Score */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#9c9c9c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Screen Rating</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                <Star size={20} color="#f5c518" fill="#f5c518" />
                <span style={{ fontSize: 32, fontWeight: 900, color: '#f5c518' }}>{movie.score}</span>
                <span style={{ color: '#9c9c9c', fontSize: 16 }}>/10</span>
              </div>
              <div style={{ fontSize: 12, color: '#9c9c9c' }}>{movie.votes} votes</div>
            </div>

            <div style={{ width: 1, height: 60, background: '#3a3a3a' }} />

            {/* Metascore */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#9c9c9c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Metascore</div>
              <span className={`metascore ${MetascoreColor(movie.metascore)}`} style={{ fontSize: 28, padding: '4px 12px' }}>{movie.metascore}</span>
              <div style={{ fontSize: 12, color: '#9c9c9c', marginTop: 4 }}>Critic reviews</div>
            </div>

            <div style={{ width: 1, height: 60, background: '#3a3a3a' }} />

            {/* Awards */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#9c9c9c', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Awards</div>
              <Award size={24} color="#f5c518" style={{ margin: '0 auto 4px' }} />
              <div style={{ fontSize: 12, color: '#f5c518', fontWeight: 600 }}>3 Oscars</div>
            </div>
          </div>

          {/* Summary */}
          <p style={{ color: '#d5d5d5', fontSize: 15, lineHeight: 1.7, marginBottom: 24, borderBottom: '1px solid #3a3a3a', paddingBottom: 24 }}>
            {movie.description}
          </p>

          {/* Credits grid */}
          <div style={{ marginBottom: 28, borderBottom: '1px solid #3a3a3a', paddingBottom: 24 }}>
            {[
              { label: 'Director', value: movie.director },
              { label: 'Writers', value: 'Constance Bell, Marcus Obi' },
              { label: 'Stars', value: castMembers.slice(0, 3).map(c => c.name).join(', ') },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', gap: 16, padding: '10px 0', borderBottom: '1px solid #2e2e2e' }}>
                <span style={{ color: '#9c9c9c', fontSize: 14, minWidth: 80, flexShrink: 0 }}>{row.label}</span>
                <span style={{ color: '#f5c518', fontSize: 14, cursor: 'pointer' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Cast */}
          <div style={{ marginBottom: 36 }}>
            <div className="section-heading" style={{ fontSize: 18 }}>
              <Users size={18} color="#f5c518" />
              Top Cast
            </div>
            <div className="scroll-x" style={{ display: 'flex', gap: 16 }}>
              {castMembers.map(cast => (
                <div
                  key={cast.id}
                  style={{
                    flexShrink: 0, width: 100, textAlign: 'center', cursor: 'pointer',
                    padding: '12px 8px', background: '#252525', borderRadius: 8,
                    border: '1px solid #3a3a3a',
                  }}
                >
                  <div className="cast-avatar" style={{ background: cast.avatar, width: 64, height: 64 }}>
                    {cast.initials}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#f5f5f5', marginBottom: 2 }}>{cast.name}</div>
                  <div style={{ fontSize: 11, color: '#9c9c9c' }}>{cast.character}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Histogram */}
          <div style={{ marginBottom: 36 }}>
            <div className="section-heading" style={{ fontSize: 18 }}>
              <Star size={18} color="#f5c518" />
              Rating Distribution
            </div>
            <div style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
                {ratingDistribution.map(row => (
                  <div key={row.rating} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div
                      className="histogram-bar"
                      style={{ width: '100%', height: `${(row.pct / maxPct) * 80}px` }}
                      title={`${row.pct}% rated ${row.rating}`}
                    />
                    <span style={{ fontSize: 10, color: '#9c9c9c' }}>{row.rating}</span>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 12, color: '#9c9c9c' }}>
                {movie.votes} ratings · Average: {movie.score}
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div style={{ marginBottom: 36 }}>
            <div className="section-heading" style={{ fontSize: 18 }}>
              <Film size={18} color="#f5c518" />
              Reviews
            </div>

            {/* Critic reviews */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#9c9c9c', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Critic Reviews</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {reviews.critic.map((r, i) => (
                  <div key={i} style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, color: '#f5f5f5', fontSize: 14 }}>{r.source}</span>
                        <span style={{ color: '#9c9c9c', fontSize: 12, marginLeft: 8 }}>by {r.author}</span>
                      </div>
                      <span style={{ background: '#f5c518', color: '#000', fontSize: 12, fontWeight: 700, padding: '2px 8px', borderRadius: 4 }}>{r.score}</span>
                    </div>
                    <p style={{ color: '#c5c5c5', fontSize: 13, lineHeight: 1.6, fontStyle: 'italic' }}>{r.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* User reviews */}
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#9c9c9c', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>User Reviews</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {reviews.user.map((r, i) => (
                  <div key={i} style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '16px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: '#f5c518', fontSize: 13 }}>@{r.author}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Star size={13} color="#f5c518" fill="#f5c518" />
                        <span style={{ fontWeight: 700, fontSize: 13 }}>{r.score}</span>
                      </div>
                    </div>
                    <p style={{ color: '#c5c5c5', fontSize: 13, lineHeight: 1.6 }}>{r.text}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                      <ThumbsUp size={13} color="#9c9c9c" />
                      <span style={{ fontSize: 12, color: '#9c9c9c' }}>Helpful?</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Videos/Photos */}
          <div>
            <div className="section-heading" style={{ fontSize: 18 }}>Videos & Photos</div>
            <div className="scroll-x" style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Official Trailer', gradient: movie.gradient },
                { label: 'Behind the Scenes', gradient: titles[1].gradient },
                { label: 'Featurette', gradient: titles[2].gradient },
                { label: 'TV Spot', gradient: titles[3].gradient },
              ].map((v, i) => (
                <div key={i} className="video-thumb" style={{ background: v.gradient }}>
                  <div className="play-btn"><Play size={16} /></div>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.7)', padding: '6px 10px' }}>
                    <div style={{ fontSize: 11, color: '#f5f5f5' }}>{v.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Box Office */}
          <div style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f5', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #3a3a3a' }}>Box Office</div>
            {[
              { label: 'Budget', value: movie.boxOffice.budget },
              { label: 'Domestic', value: movie.boxOffice.domestic },
              { label: 'Worldwide', value: movie.boxOffice.worldwide },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2a2a2a' }}>
                <span style={{ fontSize: 13, color: '#9c9c9c' }}>{item.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#f5c518' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Technical Info */}
          <div style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f5', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #3a3a3a' }}>Technical Specs</div>
            {[
              { label: 'Runtime', value: movie.duration },
              { label: 'Color', value: 'Color' },
              { label: 'Sound', value: 'Dolby Atmos' },
              { label: 'Aspect Ratio', value: '2.39 : 1' },
              { label: 'Language', value: 'English' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #2a2a2a' }}>
                <span style={{ fontSize: 13, color: '#9c9c9c' }}>{item.label}</span>
                <span style={{ fontSize: 13, color: '#f5f5f5' }}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f5', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #3a3a3a' }}>Awards & Recognition</div>
            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <Award size={28} color="#f5c518" />
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#f5c518' }}>3 Oscars</div>
                <div style={{ fontSize: 12, color: '#9c9c9c' }}>Best Picture, Cinematography, Score</div>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#9c9c9c', marginBottom: 10, lineHeight: 1.5 }}>{movie.awards}</p>
            <button style={{ background: 'transparent', border: 'none', color: '#f5c518', fontSize: 13, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, padding: 0 }}>
              See more awards <ChevronRight size={13} />
            </button>
          </div>

          {/* More like this */}
          <div style={{ background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8, padding: '18px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#f5f5f5', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid #3a3a3a' }}>More Like This</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {titles.slice(2, 6).map(t => (
                <div key={t.id} style={{ display: 'flex', gap: 10, cursor: 'pointer', padding: '4px 0' }}>
                  <div style={{ width: 40, height: 56, borderRadius: 4, background: t.gradient, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#f5f5f5' }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: '#9c9c9c' }}>{t.year}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                      <Star size={10} color="#f5c518" fill="#f5c518" />
                      <span style={{ fontSize: 11, color: '#f5c518', fontWeight: 700 }}>{t.score}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
