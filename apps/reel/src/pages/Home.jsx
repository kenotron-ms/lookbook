import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videos, shorts } from '../data/videos'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '24px 24px 48px' }}>
      {/* Featured Banner */}
      <div
        onClick={() => navigate('/watch')}
        style={{
          width: '100%', height: 300, borderRadius: 12, overflow: 'hidden',
          background: 'linear-gradient(135deg, #0d0d2b 0%, #1a0050 30%, #3d0099 60%, #6600cc 100%)',
          position: 'relative', cursor: 'pointer', marginBottom: 32,
          display: 'flex', alignItems: 'flex-end',
        }}
      >
        {/* Overlay gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)',
        }} />

        {/* Center play button */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 72, height: 72, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid rgba(255,255,255,0.3)',
        }}>
          <Play size={32} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
        </div>

        {/* Text overlay */}
        <div style={{ position: 'relative', padding: '0 28px 24px', zIndex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#ff4444', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
            ▶ FEATURED
          </div>
          <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.25, maxWidth: 560 }}>
            The Most Ambitious Space Documentary Ever Made
          </div>
          <div style={{ fontSize: 13, color: '#aaa', marginTop: 6 }}>
            CinemaScope · 12.4M views · Released this week
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f1f1f1' }}>Recommended</h2>
      </div>

      {/* Video grid — 4 columns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px 16px',
        marginBottom: 40,
      }}>
        {videos.map(video => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>

      {/* Shorts Section */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 4, height: 20, background: '#ff0000', borderRadius: 2 }} />
          <h2 style={{ fontSize: 18, fontWeight: 700, color: '#f1f1f1' }}>Shorts</h2>
        </div>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 8 }}>
          {shorts.map(short => (
            <div
              key={short.id}
              onClick={() => navigate('/shorts')}
              style={{
                flexShrink: 0, width: 120,
                cursor: 'pointer',
              }}
            >
              {/* 9:16 ratio */}
              <div style={{
                width: 120, height: 213, borderRadius: 10, overflow: 'hidden',
                background: short.gradient, position: 'relative', marginBottom: 8,
              }}>
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                }} />
                <div style={{
                  position: 'absolute', bottom: 8, left: 8, right: 8,
                  fontSize: 10, fontWeight: 600, color: '#fff', lineHeight: 1.3,
                }}>
                  {short.title}
                </div>
              </div>
              <div style={{ fontSize: 11, color: '#aaaaaa' }}>{short.views} views</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}