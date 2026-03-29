import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Play, Pause, Volume2, Subtitles, Settings, Maximize,
  PictureInPicture2, ThumbsUp, ThumbsDown, Share2,
  Download, Bookmark, MoreHorizontal, Bell, ChevronDown, ChevronUp,
} from 'lucide-react'
import { videos, comments } from '../data/videos'

export default function Watch() {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [liked, setLiked] = useState(false)
  const [progress, setProgress] = useState(23)
  const [expanded, setExpanded] = useState(false)

  const video = videos[0]
  const relatedVideos = videos.slice(1)

  return (
    <div style={{ display: 'flex', gap: 24, padding: '24px 24px 48px', minHeight: '100%' }}>
      {/* Left: Main content (70%) */}
      <div style={{ flex: '0 0 70%', minWidth: 0 }}>
        {/* Video Player */}
        <div
          style={{
            width: '100%', height: 560, background: '#000',
            borderRadius: 8, overflow: 'hidden', position: 'relative',
            cursor: 'pointer', marginBottom: 16,
          }}
          onClick={() => setPlaying(p => !p)}
        >
          {/* Gradient preview overlay */}
          <div style={{ width: '100%', height: '100%', background: video.gradient, opacity: playing ? 0.15 : 0.4, transition: 'opacity 0.3s' }} />

          {/* Play/Pause center icon */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80, height: 80, borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: playing ? 0 : 1, transition: 'opacity 0.2s',
          }}>
            <Play size={36} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
          </div>

          {/* Controls bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
            padding: '12px 16px 10px',
          }}
            onClick={e => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div
              style={{
                width: '100%', height: 4, background: 'rgba(255,255,255,0.3)',
                borderRadius: 2, marginBottom: 10, cursor: 'pointer', position: 'relative',
              }}
              onClick={e => {
                const rect = e.currentTarget.getBoundingClientRect()
                const pct = ((e.clientX - rect.left) / rect.width) * 100
                setProgress(Math.max(0, Math.min(100, pct)))
              }}
            >
              <div style={{ width: `${progress}%`, height: '100%', background: '#ff0000', borderRadius: 2 }} />
              <div style={{
                position: 'absolute', top: '50%', left: `${progress}%`,
                transform: 'translate(-50%, -50%)',
                width: 12, height: 12, borderRadius: '50%', background: '#ff0000',
              }} />
            </div>

            {/* Control icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <button
                onClick={() => setPlaying(p => !p)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}
              >
                {playing ? <Pause size={22} /> : <Play size={22} fill="#fff" />}
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}>
                <Volume2 size={22} />
              </button>
              <span style={{ fontSize: 12, color: '#fff', marginLeft: 4 }}>
                {Math.floor(progress * 18.24 / 100).toString().padStart(2, '0')}:{Math.floor((progress * 18.24 / 100 % 1) * 60).toString().padStart(2, '0')} / 18:24
              </span>
              <div style={{ flex: 1 }} />
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}>
                <Subtitles size={20} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}>
                <Settings size={20} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}>
                <PictureInPicture2 size={20} />
              </button>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', padding: 4 }}>
                <Maximize size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Video Title */}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#f1f1f1', lineHeight: 1.3, marginBottom: 8 }}>
          {video.title}
        </h1>

        {/* Stats */}
        <div style={{ fontSize: 13, color: '#aaaaaa', marginBottom: 16 }}>
          {video.views} views · Uploaded March 2025
        </div>

        {/* Action row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          {/* Like/Dislike group */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: '#272727', borderRadius: 20, overflow: 'hidden',
          }}>
            <button
              onClick={() => setLiked(l => !l)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: liked ? '#ff0000' : '#f1f1f1', fontSize: 13, fontWeight: 500,
                borderRight: '1px solid #3d3d3d',
              }}
            >
              <ThumbsUp size={18} fill={liked ? '#ff0000' : 'none'} />
              <span>47K</span>
            </button>
            <button style={{
              display: 'flex', alignItems: 'center', padding: '8px 14px',
              background: 'none', border: 'none', cursor: 'pointer', color: '#f1f1f1',
            }}>
              <ThumbsDown size={18} />
            </button>
          </div>

          {[
            { icon: Share2, label: 'Share' },
            { icon: Download, label: 'Download' },
            { icon: Bookmark, label: 'Save' },
            { icon: MoreHorizontal, label: '' },
          ].map(({ icon: Icon, label }) => (
            <button key={label || 'more'} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '8px 16px', borderRadius: 20,
              background: '#272727', border: 'none', cursor: 'pointer',
              color: '#f1f1f1', fontSize: 13, fontWeight: 500,
            }}>
              <Icon size={18} />
              {label && <span>{label}</span>}
            </button>
          ))}
        </div>

        {/* Channel row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 0', borderTop: '1px solid #3d3d3d', borderBottom: '1px solid #3d3d3d',
          marginBottom: 16,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            CS
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: '#f1f1f1' }}>CinemaScope</div>
            <div style={{ fontSize: 12, color: '#aaaaaa' }}>2.4M subscribers</div>
          </div>
          <button
            onClick={() => setSubscribed(s => !s)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '10px 20px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: subscribed ? '#272727' : '#ff0000',
              color: '#fff', fontSize: 14, fontWeight: 600,
              transition: 'background 0.2s',
            }}
          >
            {subscribed && <Bell size={16} />}
            <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
          </button>
        </div>

        {/* Description */}
        <div style={{
          background: '#272727', borderRadius: 12, padding: 16, marginBottom: 24, cursor: 'pointer',
        }}
          onClick={() => setExpanded(e => !e)}
        >
          <div style={{ fontSize: 13, color: '#aaaaaa', marginBottom: 8 }}>
            <span style={{ color: '#f1f1f1', fontWeight: 600 }}>{video.views} views</span>
            {' · '}
            <span>March 14, 2025</span>
          </div>
          <div
            className={expanded ? '' : 'line-clamp-3'}
            style={{ fontSize: 14, color: '#f1f1f1', lineHeight: 1.6 }}
          >
            This documentary explores the forgotten art of patience in filmmaking — how directors like Tarkovsky,
            Kubrick, and Wong Kar-wai used long takes, silence, and stillness to create unforgettable emotional
            resonance. We look at 15 films across 6 decades, speak with cinematographers, and examine whether
            the attention economy has permanently altered our relationship with slow cinema.
            <br /><br />
            Shot over 18 months across 9 countries. Interviews conducted in English, French, and Japanese with
            subtitles provided. Score composed by Elara Voss. Color grading by Studio Lumière, Paris.
          </div>
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#f1f1f1', fontSize: 13, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 4, marginTop: 8, padding: 0,
          }}>
            {expanded ? <><ChevronUp size={16} /> Show less</> : <><ChevronDown size={16} /> Show more</>}
          </button>
        </div>

        {/* Comments section */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#f1f1f1' }}>
              {comments.length * 1200 + 847} Comments
            </h3>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#f1f1f1', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M7 12h10M10 18h4" /></svg>
              Sort by
            </button>
          </div>

          {/* Comment composer */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #ff0000, #cc0000)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>K</div>
            <input
              type="text"
              placeholder="Add a comment..."
              style={{
                flex: 1, background: 'none',
                border: 'none', borderBottom: '1px solid #3d3d3d',
                color: '#f1f1f1', fontSize: 14, padding: '8px 0', outline: 'none',
              }}
            />
          </div>

          {/* Comments list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {comments.map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `hsl(${comment.id * 37}, 55%, 40%)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
                }}>
                  {comment.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', marginBottom: 4 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#f1f1f1' }}>@{comment.user}</span>
                    <span style={{ fontSize: 12, color: '#aaaaaa' }}>{comment.time}</span>
                  </div>
                  <div style={{ fontSize: 14, color: '#f1f1f1', lineHeight: 1.5, marginBottom: 8 }}>
                    {comment.text}
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaaaaa', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                      <ThumbsUp size={14} /> {comment.likes.toLocaleString()}
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaaaaa', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
                      <ThumbsDown size={14} />
                    </button>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaaaaa', fontSize: 12 }}>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right sidebar (30%) */}
      <div style={{ flex: '0 0 30%', minWidth: 0 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: '#f1f1f1', marginBottom: 12 }}>Up next</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {relatedVideos.map(v => (
            <div
              key={v.id}
              onClick={() => navigate('/watch')}
              style={{ display: 'flex', gap: 8, cursor: 'pointer', borderRadius: 8, padding: 4 }}
              onMouseEnter={e => e.currentTarget.style.background = '#212121'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              {/* Thumbnail */}
              <div style={{
                flexShrink: 0, width: 120, height: 68, borderRadius: 6,
                background: v.gradient, position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', bottom: 4, right: 4,
                  background: 'rgba(0,0,0,0.8)', color: '#fff',
                  fontSize: 10, padding: '1px 4px', borderRadius: 3,
                }}>
                  {v.duration}
                </div>
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0, padding: '2px 0' }}>
                <div className="line-clamp-2" style={{ fontSize: 13, fontWeight: 600, color: '#f1f1f1', lineHeight: 1.3, marginBottom: 4 }}>
                  {v.title}
                </div>
                <div style={{ fontSize: 11, color: '#aaaaaa' }}>{v.channel}</div>
                <div style={{ fontSize: 11, color: '#aaaaaa' }}>{v.views} views · {v.timeAgo}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}