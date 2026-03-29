import { useState } from 'react'
import { Play } from 'lucide-react'
import { PLAYLISTS } from '../data/music'
import { useNavigate } from 'react-router-dom'

const FILTERS = ['Playlists', 'Podcasts', 'Artists', 'Albums']
const ACCENT = '#1db954'

export default function Library() {
  const [activeFilter, setActiveFilter] = useState('Playlists')
  const navigate = useNavigate()

  const allPlaylists = [
    ...PLAYLISTS,
    { id: '6', name: 'Workout Beats', description: 'High energy tracks', owner: 'Groove', count: 38, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { id: '7', name: 'Acoustic Sessions', description: 'Unplugged and raw', owner: 'Jordan Blake', count: 19, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
    { id: '8', name: 'Instrumental Flows', description: 'No words needed', owner: 'Groove', count: 64, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    { id: '9', name: 'Weekend Mood', description: 'Saturdays and Sundays', owner: 'Jordan Blake', count: 27, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { id: '10', name: 'Night Owl', description: 'Late night selections', owner: 'Jordan Blake', count: 45, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  ]

  return (
    <div style={{ padding: '24px 32px', minHeight: '100%' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '20px' }}>
        Your Library
      </h1>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '8px 16px',
              borderRadius: '500px',
              border: 'none',
              background: activeFilter === f ? '#ffffff' : '#2a2a2a',
              color: activeFilter === f ? '#000000' : '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Playlist List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {allPlaylists.map(playlist => (
          <PlaylistRow
            key={playlist.id}
            playlist={playlist}
            onClick={() => navigate(`/playlist/${playlist.id}`)}
          />
        ))}
      </div>
    </div>
  )
}

function PlaylistRow({ playlist, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 12px',
        borderRadius: '6px',
        background: hovered ? '#ffffff1a' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '4px',
          background: playlist.gradient,
        }} />
        {hovered && (
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '4px',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Play size={16} color="#fff" fill="#fff" style={{ marginLeft: '2px' }} />
          </div>
        )}
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ fontSize: '15px', fontWeight: '600', color: '#ffffff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {playlist.name}
        </div>
        <div style={{ fontSize: '13px', color: '#b3b3b3' }}>
          Playlist · {playlist.owner}
        </div>
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3', flexShrink: 0 }}>
        {playlist.count} songs
      </div>
    </div>
  )
}
