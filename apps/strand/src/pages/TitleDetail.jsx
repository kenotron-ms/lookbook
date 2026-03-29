import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Download, ThumbsUp, ThumbsDown, Plus, Share2, Check, Star, ChevronDown } from 'lucide-react'
import { shows, heroShow, castMembers, episodes } from '../data/content'
import ContentCard from '../components/ContentCard'

const show = heroShow
const moreLikeThis = shows.filter(s => s.id !== show.id && s.genre.some(g => show.genre.includes(g))).slice(0, 6)

export default function TitleDetail() {
  const [inList, setInList] = useState(false)
  const [liked, setLiked] = useState(false)
  const [selectedSeason, setSelectedSeason] = useState('Season 1')

  return (
    <div style={{ background: '#141414', minHeight: '100vh', paddingBottom: '60px' }}>
      {/* Hero Header */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '420px',
        background: show.gradient,
        overflow: 'hidden',
      }}>
        {/* Accent glow */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 40% 50%, ${show.accentColor}22 0%, transparent 70%)`,
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '250px',
          background: 'linear-gradient(to bottom, transparent 0%, #141414 100%)',
        }} />
        {/* Left fade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 70%)',
        }} />

        {/* Back nav */}
        <Link to="/" style={{
          position: 'absolute',
          top: '80px',
          left: '48px',
          fontSize: '13px',
          color: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          ← Back to Browse
        </Link>

        {/* Title area */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '48px',
          right: '48px',
        }}>
          <div style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '-1.5px',
            marginBottom: '12px',
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            {show.title}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '13px',
              color: '#f1c40f',
              fontWeight: '700',
            }}>
              <Star size={13} fill="#f1c40f" /> 8.7
            </span>
            <span style={{
              fontSize: '11px',
              border: '1px solid rgba(255,255,255,0.4)',
              padding: '2px 7px',
              borderRadius: '3px',
              color: 'rgba(255,255,255,0.8)',
            }}>{show.rating}</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{show.year}</span>
            <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>{show.seasons} Seasons</span>
            <span style={{ fontSize: '13px', color: '#4ade80', fontWeight: '600' }}>97% Match</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ padding: '0 48px', maxWidth: '1100px' }}>
        {/* Action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 28px',
            background: '#e50914',
            border: 'none',
            borderRadius: '4px',
            fontSize: '15px',
            fontWeight: '700',
            color: '#fff',
            cursor: 'pointer',
          }}>
            <Play size={18} fill="#fff" />
            Play
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '11px 20px',
            background: 'rgba(109,109,110,0.7)',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: '600',
            color: '#fff',
            cursor: 'pointer',
          }}>
            <Download size={16} />
            Download
          </button>
          {[
            { icon: inList ? Check : Plus, action: () => setInList(l => !l), active: inList, label: 'My List' },
            { icon: ThumbsUp, action: () => { setLiked(l => !l) }, active: liked, label: 'Like' },
            { icon: ThumbsDown, action: () => {}, active: false, label: 'Dislike' },
            { icon: Share2, action: () => {}, active: false, label: 'Share' },
          ].map(({ icon: Icon, action, active, label }) => (
            <button
              key={label}
              onClick={action}
              title={label}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: active ? 'rgba(229,9,20,0.2)' : 'rgba(255,255,255,0.1)',
                border: `2px solid ${active ? '#e50914' : 'rgba(255,255,255,0.35)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: active ? '#e50914' : 'rgba(255,255,255,0.8)',
                transition: 'all 0.2s',
              }}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Description */}
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.8)',
          lineHeight: '1.65',
          marginBottom: '32px',
          maxWidth: '680px',
        }}>
          {show.description}
        </p>

        {/* Genres */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {show.genre.map(g => (
            <span key={g} style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '4px 12px',
              borderRadius: '20px',
            }}>{g}</span>
          ))}
        </div>

        {/* Cast */}
        <div style={{ marginBottom: '40px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#e5e5e5',
            marginBottom: '16px',
          }}>Cast</h3>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {castMembers.map(member => (
              <div key={member.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.color}66, ${member.color}33)`,
                  border: `2px solid ${member.color}66`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#fff',
                }}>
                  {member.initials}
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: '#e5e5e5', whiteSpace: 'nowrap' }}>{member.name}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '36px' }} />

        {/* Episodes */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#e5e5e5' }}>Episodes</h3>
            <div style={{ position: 'relative' }}>
              <select
                value={selectedSeason}
                onChange={e => setSelectedSeason(e.target.value)}
                style={{
                  appearance: 'none',
                  background: '#2a2a2a',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '4px',
                  color: '#e5e5e5',
                  fontSize: '13px',
                  padding: '8px 36px 8px 14px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                {Array.from({ length: show.seasons }, (_, i) => (
                  <option key={i} value={`Season ${i + 1}`}>Season {i + 1}</option>
                ))}
              </select>
              <ChevronDown size={14} style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(255,255,255,0.6)',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {episodes.map(ep => (
              <div
                key={ep.num}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {/* Episode number */}
                <div style={{
                  width: '32px',
                  textAlign: 'center',
                  fontSize: '18px',
                  fontWeight: '300',
                  color: 'rgba(255,255,255,0.4)',
                  flexShrink: 0,
                  paddingTop: '2px',
                }}>
                  {ep.num}
                </div>

                {/* Thumbnail */}
                <div style={{
                  width: '130px',
                  height: '73px',
                  borderRadius: '4px',
                  background: show.gradient,
                  flexShrink: 0,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <Play size={13} color="#fff" fill="#fff" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#e5e5e5' }}>{ep.title}</span>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginLeft: '16px', flexShrink: 0 }}>{ep.runtime}m</span>
                  </div>
                  <p style={{
                    fontSize: '12px',
                    color: 'rgba(255,255,255,0.55)',
                    lineHeight: '1.5',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {ep.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Like This */}
        <div>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#e5e5e5',
            marginBottom: '16px',
          }}>More Like This</h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}>
            {moreLikeThis.map(s => (
              <div
                key={s.id}
                style={{
                  background: '#1a1a1a',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                {/* Thumbnail */}
                <div style={{
                  width: '100%',
                  paddingBottom: '56.25%',
                  background: s.gradient,
                  position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: 'rgba(0,0,0,0.6)',
                    borderRadius: '3px',
                    padding: '2px 6px',
                    fontSize: '10px',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}>
                    {s.rating}
                  </div>
                </div>

                {/* Card info */}
                <div style={{ padding: '12px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '6px',
                  }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#e5e5e5' }}>{s.title}</span>
                    <span style={{ fontSize: '11px', color: '#4ade80', fontWeight: '600' }}>94%</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>{s.year}</span>
                    <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)' }}>
                      {s.type === 'series' ? `${s.seasons} Seasons` : `${s.runtime}m`}
                    </span>
                  </div>
                  <p style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
