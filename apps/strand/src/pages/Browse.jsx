import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Info, ChevronDown } from 'lucide-react'
import { shows, continueWatching, top10Ids, heroShow } from '../data/content'
import ContentRow from '../components/ContentRow'

const progressMap = continueWatching.reduce((acc, item) => {
  acc[item.showId] = item.progress
  return acc
}, {})

const continueShows = continueWatching.map(cw => shows.find(s => s.id === cw.showId)).filter(Boolean)
const top10Shows = top10Ids.map(id => shows.find(s => s.id === id)).filter(Boolean)
const newReleases = shows.filter(s => s.year === 2024).slice(0, 6)
const actionShows = shows.filter(s => s.genre.includes('Action')).slice(0, 6)
const becauseYouWatched = shows.filter(s => s.genre.includes('Sci-Fi')).slice(0, 6)
const criticallyAcclaimed = shows.filter(s => s.rating === 'TV-MA').slice(0, 6)

export default function Browse() {
  const [muted, setMuted] = useState(true)

  return (
    <div style={{ background: '#141414', minHeight: '100vh' }}>
      {/* HERO */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        background: heroShow.gradient,
        overflow: 'hidden',
      }}>
        {/* Cinematic overlay grain */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(74,108,247,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Bottom fade to page bg */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '220px',
          background: 'linear-gradient(to bottom, transparent 0%, #141414 100%)',
          pointerEvents: 'none',
        }} />

        {/* Left fade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Hero Content */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '48px',
          maxWidth: '520px',
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '16px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(229,9,20,0.15)',
              border: '1px solid #e50914',
              borderRadius: '4px',
              padding: '3px 10px',
            }}>
              <span style={{
                fontSize: '11px',
                fontWeight: '800',
                color: '#e50914',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                #1 in ParaNet Today
              </span>
            </div>
            <span style={{
              fontSize: '11px',
              color: 'rgba(255,255,255,0.5)',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '3px 8px',
              borderRadius: '3px',
            }}>{heroShow.rating}</span>
          </div>

          {/* Show Title */}
          <div style={{
            fontSize: '58px',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '16px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
            letterSpacing: '-2px',
          }}>
            {heroShow.title}
          </div>

          {/* Meta */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '14px',
          }}>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{heroShow.year}</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>·</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{heroShow.seasons} Seasons</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>·</span>
            <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600' }}>97% Match</span>
          </div>

          {/* Description */}
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.5',
            marginBottom: '20px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {heroShow.description}
          </p>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/title">
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 24px',
                background: '#ffffff',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#000',
                cursor: 'pointer',
              }}>
                <Play size={18} fill="#000" />
                Play
              </button>
            </Link>
            <Link to="/title">
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: 'rgba(109,109,110,0.7)',
                border: 'none',
                borderRadius: '4px',
                fontSize: '15px',
                fontWeight: '700',
                color: '#fff',
                cursor: 'pointer',
                backdropFilter: 'blur(4px)',
              }}>
                <Info size={18} />
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* CONTENT ROWS */}
      <div style={{ marginTop: '-32px', paddingBottom: '48px' }}>
        <ContentRow
          title="Continue Watching for Jordan"
          shows={continueShows}
          progressMap={progressMap}
        />
        <ContentRow
          title="Top 10 in ParaNet Today"
          shows={top10Shows}
          rankList={top10Ids}
        />
        <ContentRow
          title="New Releases"
          shows={newReleases}
        />
        <ContentRow
          title="Action & Adventure"
          shows={actionShows}
        />
        <ContentRow
          title={`Because you watched ${heroShow.title}`}
          shows={becauseYouWatched}
        />
        <ContentRow
          title="Critically Acclaimed"
          shows={criticallyAcclaimed}
        />
      </div>
    </div>
  )
}
