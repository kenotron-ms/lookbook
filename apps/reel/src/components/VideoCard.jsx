import { useNavigate } from 'react-router-dom'

export default function VideoCard({ video }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate('/watch')}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 10 }}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }}>
        <div style={{ width: '100%', height: '100%', background: video.gradient }} />
        {/* Duration badge */}
        <div style={{
          position: 'absolute', bottom: 6, right: 6,
          background: 'rgba(0,0,0,0.8)', color: '#fff',
          fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
        }}>
          {video.duration}
        </div>
      </div>

      {/* Info row */}
      <div style={{ display: 'flex', gap: 10 }}>
        {/* Channel avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #444, #666)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
        }}>
          {video.channelAvatar}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="line-clamp-2" style={{ fontSize: 14, fontWeight: 600, color: '#f1f1f1', lineHeight: 1.4, marginBottom: 4 }}>
            {video.title}
          </div>
          <div style={{ fontSize: 12, color: '#aaaaaa' }}>{video.channel}</div>
          <div style={{ fontSize: 12, color: '#aaaaaa' }}>{video.views} views · {video.timeAgo}</div>
        </div>
      </div>
    </div>
  )
}