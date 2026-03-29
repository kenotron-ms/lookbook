import { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Forward } from 'lucide-react'
import { shorts, videos } from '../data/videos'

// Build a larger list of shorts from shorts + some videos as faux shorts
const allShorts = [
  ...shorts,
  { id: 201, title: "How to wire a 3-way switch in 45 seconds", channel: "DevFlow", views: "3.7M", gradient: "linear-gradient(180deg, #141e30 0%, #243b55 100%)" },
  { id: 202, title: "The most satisfying cake decoration ever 🎂", channel: "WanderBite", views: "11.2M", gradient: "linear-gradient(180deg, #f7971e 0%, #ffd200 100%)" },
  { id: 203, title: "Bioluminescent waves at night 🌊", channel: "FrameShot", views: "7.4M", gradient: "linear-gradient(180deg, #004e6b 0%, #0099cc 100%)" },
  { id: 204, title: "This AI can finish your sentences better than your friends", channel: "PixelMind", views: "5.1M", gradient: "linear-gradient(180deg, #667eea 0%, #764ba2 100%)" },
]

export default function Shorts() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [likes, setLikes] = useState({})

  function toggleLike(id) {
    setLikes(l => ({ ...l, [id]: !l[id] }))
  }

  const short = allShorts[activeIndex]

  return (
    <div style={{
      height: 'calc(100vh - 56px)',
      background: '#000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Shorts strip — vertically scrollable feel using absolute cards */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}>
        {/* Left nav arrow */}
        <button
          onClick={() => setActiveIndex(i => Math.max(0, i - 1))}
          disabled={activeIndex === 0}
          style={{
            position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
            color: activeIndex === 0 ? '#555' : '#fff', width: 48, height: 48,
            borderRadius: '50%', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ↑
        </button>

        {/* Short card */}
        <div style={{ position: 'relative', height: '100%', maxHeight: 'calc(100vh - 56px)', aspectRatio: '9/16', maxWidth: 400 }}>
          {/* Gradient background */}
          <div style={{ width: '100%', height: '100%', background: short.gradient }} />

          {/* Bottom overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 50%)',
          }} />

          {/* Text overlay */}
          <div style={{
            position: 'absolute', bottom: 80, left: 16, right: 72,
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginBottom: 10,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: short.gradient,
                border: '2px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff',
              }}>
                {short.channel.slice(0, 1)}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{short.channel}</span>
              <button style={{
                padding: '2px 10px', border: '1px solid #fff', borderRadius: 12,
                background: 'none', color: '#fff', fontSize: 12, cursor: 'pointer',
              }}>
                Follow
              </button>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', lineHeight: 1.4, marginBottom: 6 }}>
              {short.title}
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              {short.views} views
            </div>
          </div>

          {/* Right-side action icons */}
          <div style={{
            position: 'absolute', right: 12, bottom: 80,
            display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center',
          }}>
            {[
              {
                icon: <ThumbsUp size={26} fill={likes[short.id] ? '#ff0000' : 'none'} color={likes[short.id] ? '#ff0000' : '#fff'} />,
                label: likes[short.id] ? (parseInt(short.views) > 1 ? short.views : '1') : short.views.split('.')[0] + 'K',
                onClick: () => toggleLike(short.id),
              },
              { icon: <ThumbsDown size={26} color="#fff" />, label: 'Dislike', onClick: () => {} },
              { icon: <MessageCircle size={26} color="#fff" />, label: '4.2K', onClick: () => {} },
              { icon: <Share2 size={26} color="#fff" />, label: 'Share', onClick: () => {} },
              { icon: <Forward size={26} color="#fff" />, label: 'More', onClick: () => {} },
            ].map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}
              >
                {action.icon}
                <span style={{ fontSize: 11, color: '#fff', fontWeight: 500 }}>{action.label}</span>
              </button>
            ))}

            {/* Channel avatar at bottom */}
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: short.gradient,
              border: '3px solid #fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff',
              marginTop: 4,
            }}>
              {short.channel.slice(0, 1)}
            </div>
          </div>

          {/* Progress dots */}
          <div style={{
            position: 'absolute', top: 12, left: 12, right: 12,
            display: 'flex', gap: 4,
          }}>
            {allShorts.map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: 2, borderRadius: 2,
                  background: i === activeIndex ? '#fff' : 'rgba(255,255,255,0.3)',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: 60, left: 0, right: 0,
            height: 2, background: 'rgba(255,255,255,0.3)',
          }}>
            <div style={{ width: '38%', height: '100%', background: '#fff' }} />
          </div>
        </div>

        {/* Right nav arrow */}
        <button
          onClick={() => setActiveIndex(i => Math.min(allShorts.length - 1, i + 1))}
          disabled={activeIndex === allShorts.length - 1}
          style={{
            position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.1)', border: 'none', cursor: 'pointer',
            color: activeIndex === allShorts.length - 1 ? '#555' : '#fff',
            width: 48, height: 48, borderRadius: '50%', fontSize: 20,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ↓
        </button>
      </div>
    </div>
  )
}