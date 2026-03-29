import { useState } from 'react'
import { Heart, Eye, Bookmark, Share2, MessageCircle, MapPin, Briefcase, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { shots, designers, comments } from '../data/shots'

const paletteColors = [
  '#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe',
]

const relatedShots = shots.slice(4, 8)

export default function ShotDetail() {
  const location = useLocation()
  const navigate = useNavigate()
  const shot = location.state?.shot || shots[0]
  const designer = designers.find(d => d.name === shot.designer) || designers[0]
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [following, setFollowing] = useState(false)

  return (
    <main style={{ paddingTop: '64px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 32px' }}>
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '14px', color: '#6e6d7a', fontWeight: '500',
            background: 'none', border: 'none', cursor: 'pointer',
            marginBottom: '24px', padding: '0',
          }}
        >
          <ArrowLeft size={16} /> Back to shots
        </button>

        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
          {/* Left: 70% */}
          <div style={{ flex: '0 0 70%', maxWidth: '70%' }}>
            {/* Shot title */}
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#0d0c22', margin: '0 0 16px 0' }}>
              {shot.title}
            </h1>

            {/* Shot preview */}
            <div style={{
              width: '100%',
              paddingBottom: '75%',
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              background: shot.gradient,
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
            }}>
              {/* Decorative UI elements inside shot */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', opacity: 0.2 }}>
                <div style={{ width: '30%', height: '60%', borderRadius: '12px', background: 'rgba(255,255,255,0.7)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '35%' }}>
                  <div style={{ height: '14px', borderRadius: '8px', background: 'rgba(255,255,255,0.7)' }} />
                  <div style={{ height: '14px', width: '80%', borderRadius: '8px', background: 'rgba(255,255,255,0.5)' }} />
                  <div style={{ height: '14px', width: '60%', borderRadius: '8px', background: 'rgba(255,255,255,0.5)' }} />
                  <div style={{ height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.6)', marginTop: '8px' }} />
                </div>
              </div>
            </div>

            {/* Color palette */}
            <div style={{ marginTop: '24px' }}>
              <p style={{ fontSize: '13px', fontWeight: '600', color: '#6e6d7a', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Color Palette
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {paletteColors.map((color, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      backgroundColor: color,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }} />
                    <span style={{ fontSize: '11px', color: '#6e6d7a', fontFamily: 'monospace' }}>{color}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div style={{ marginTop: '40px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0d0c22', marginBottom: '20px' }}>
                {comments.length} Comments
              </h3>
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: c.avatar, flexShrink: 0 }} />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '600', color: '#0d0c22' }}>{c.user}</span>
                      <span style={{ fontSize: '12px', color: '#6e6d7a' }}>{c.time}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#4a4a5a', lineHeight: '1.5', margin: 0 }}>{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Related shots */}
            <div style={{ marginTop: '48px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0d0c22', marginBottom: '20px' }}>Related Shots</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {relatedShots.map(s => (
                  <div key={s.id} onClick={() => navigate('/shot', { state: { shot: s } })} style={{ cursor: 'pointer' }}>
                    <div style={{
                      paddingBottom: '75%', position: 'relative',
                      borderRadius: '10px', overflow: 'hidden',
                      background: s.gradient,
                    }} />
                    <p style={{ fontSize: '12px', color: '#6e6d7a', marginTop: '6px', fontWeight: '500' }}>{s.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: 30% */}
          <div style={{ flex: '0 0 30%', maxWidth: '30%' }}>
            {/* Designer card */}
            <div style={{
              background: '#f8f7f4',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                backgroundColor: designer.avatar,
                margin: '0 auto 12px',
              }} />
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0d0c22', margin: '0 0 4px' }}>{designer.name}</h3>
              <p style={{ fontSize: '13px', color: '#6e6d7a', margin: '0 0 8px' }}>{designer.headline}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                <MapPin size={12} color="#6e6d7a" />
                <span style={{ fontSize: '12px', color: '#6e6d7a' }}>{designer.location}</span>
              </div>
              {designer.openToWork && (
                <span style={{
                  display: 'inline-block', padding: '3px 10px',
                  background: '#d1fae5', color: '#065f46',
                  borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                  marginBottom: '12px',
                }}>
                  ● Open to work
                </span>
              )}
              <button
                onClick={() => setFollowing(!following)}
                style={{
                  width: '100%', padding: '8px',
                  background: following ? '#f8f7f4' : '#ea4c89',
                  color: following ? '#0d0c22' : '#ffffff',
                  border: following ? '1px solid #e8e8e8' : 'none',
                  borderRadius: '8px', fontSize: '14px', fontWeight: '600',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {following ? 'Following' : 'Follow'}
              </button>
              <p style={{ fontSize: '12px', color: '#6e6d7a', marginTop: '10px' }}>
                {designer.followers.toLocaleString()} followers
              </p>
            </div>

            {/* Shot description */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '14px', color: '#4a4a5a', lineHeight: '1.6', margin: 0 }}>
                A clean, modern interface design exploring bold color theory and spatial layouts.
                Crafted with precision in Figma — every pixel intentional, every interaction considered.
              </p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {shot.tags.map(tag => (
                <span key={tag} style={{
                  padding: '5px 12px',
                  background: '#f8f7f4',
                  color: '#6e6d7a',
                  borderRadius: '20px',
                  fontSize: '12px', fontWeight: '500',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button
                onClick={() => setLiked(!liked)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: liked ? '#fdf2f7' : '#f8f7f4',
                  border: liked ? '1px solid #ea4c89' : '1px solid #e8e8e8',
                  color: liked ? '#ea4c89' : '#6e6d7a',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                <Heart size={15} fill={liked ? '#ea4c89' : 'none'} />
                {liked ? shot.hearts + 1 : shot.hearts}
              </button>
              <button
                onClick={() => setSaved(!saved)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: '#f8f7f4', border: '1px solid #e8e8e8',
                  color: '#6e6d7a', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                <Bookmark size={15} fill={saved ? '#0d0c22' : 'none'} />
                Save
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 14px', borderRadius: '8px',
                background: '#f8f7f4', border: '1px solid #e8e8e8',
                color: '#6e6d7a', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              }}>
                <Share2 size={15} />
                Share
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', gap: '24px',
              padding: '16px',
              background: '#f8f7f4', borderRadius: '12px',
            }}>
              {[
                { icon: <Heart size={14} />, label: 'Likes', value: shot.hearts.toLocaleString() },
                { icon: <Eye size={14} />, label: 'Views', value: shot.views.toLocaleString() },
                { icon: <MessageCircle size={14} />, label: 'Comments', value: comments.length },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', color: '#6e6d7a', marginBottom: '4px' }}>
                    {stat.icon}
                  </div>
                  <p style={{ fontSize: '16px', fontWeight: '700', color: '#0d0c22', margin: '0 0 2px' }}>{stat.value}</p>
                  <p style={{ fontSize: '11px', color: '#6e6d7a', margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
