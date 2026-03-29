import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Play, Shuffle, Download, MoreHorizontal, Clock, Heart } from 'lucide-react'
import { PLAYLISTS, SONGS, formatDuration } from '../data/music'

const ACCENT = '#1db954'

export default function Playlist() {
  const { id } = useParams()
  const playlist = PLAYLISTS.find(p => p.id === id) || PLAYLISTS[0]
  const [hoveredRow, setHoveredRow] = useState(null)
  const [likedTracks, setLikedTracks] = useState(new Set([1, 3, 7, 11]))
  const [isPlaying, setIsPlaying] = useState(false)

  const tracks = [...SONGS].slice(0, 15)

  const toggleLike = (id) => {
    setLikedTracks(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div style={{ minHeight: '100%' }}>
      {/* Header with gradient */}
      <div style={{
        background: `linear-gradient(180deg, ${extractGradientColor(playlist.gradient)} 0%, #121212 100%)`,
        padding: '40px 32px 24px',
        display: 'flex',
        alignItems: 'flex-end',
        gap: '24px',
      }}>
        {/* Art */}
        <div style={{
          width: '232px',
          height: '232px',
          borderRadius: '8px',
          background: playlist.gradient,
          flexShrink: 0,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {id === 'liked' && (
            <Heart size={72} color="#ffffff" fill="#ffffff" />
          )}
        </div>
        {/* Info */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '700', color: '#ffffff', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Playlist
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#ffffff', lineHeight: 1.1, marginBottom: '16px' }}>
            {playlist.name}
          </h1>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '12px' }}>
            {playlist.description}
          </p>
          <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', fontWeight: '700' }}>{playlist.owner}</span>
            <span>·</span>
            <span>{playlist.count} songs</span>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div style={{
        padding: '24px 32px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 100%)',
      }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: ACCENT,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(29,185,84,0.4)',
          }}
        >
          <Play size={22} color="#000" fill="#000" style={{ marginLeft: '3px' }} />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <Shuffle size={28} color='#b3b3b3' />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <Download size={24} color='#b3b3b3' />
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <MoreHorizontal size={28} color='#b3b3b3' />
        </button>
      </div>

      {/* Track List */}
      <div style={{ padding: '0 32px 32px' }}>
        {/* Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '48px 1fr 1fr 120px 60px',
          gap: '16px',
          padding: '8px 16px',
          borderBottom: '1px solid #282828',
          marginBottom: '8px',
        }}>
          <span style={{ fontSize: '12px', color: '#b3b3b3', textAlign: 'center' }}>#</span>
          <span style={{ fontSize: '12px', color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '1px' }}>Title</span>
          <span style={{ fontSize: '12px', color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '1px' }}>Album</span>
          <span style={{ fontSize: '12px', color: '#b3b3b3', textTransform: 'uppercase', letterSpacing: '1px' }}>Date added</span>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Clock size={14} color='#b3b3b3' />
          </div>
        </div>

        {/* Tracks */}
        {tracks.map((track, i) => (
          <TrackRow
            key={track.id}
            track={track}
            index={i + 1}
            hovered={hoveredRow === track.id}
            onHover={setHoveredRow}
            liked={likedTracks.has(track.id)}
            onLike={() => toggleLike(track.id)}
          />
        ))}
      </div>
    </div>
  )
}

function TrackRow({ track, index, hovered, onHover, liked, onLike }) {
  const DATES = ['Jan 12, 2024', 'Feb 3, 2024', 'Mar 18, 2024', 'Apr 5, 2024', 'May 22, 2024', 'Jun 10, 2024', 'Jul 8, 2024']
  const dateAdded = DATES[index % DATES.length]

  return (
    <div
      onMouseEnter={() => onHover(track.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr 1fr 120px 60px',
        gap: '16px',
        padding: '8px 16px',
        borderRadius: '6px',
        background: hovered ? '#ffffff1a' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', fontSize: '14px', color: hovered ? '#1db954' : '#b3b3b3', fontWeight: hovered ? '700' : '400' }}>
        {hovered ? <Play size={14} color={ACCENT} fill={ACCENT} style={{ margin: '0 auto' }} /> : index}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '4px',
          background: track.gradient,
          flexShrink: 0,
        }} />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {track.title}
          </div>
          <div style={{ fontSize: '13px', color: '#b3b3b3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {track.artist}
          </div>
        </div>
      </div>
      <div style={{ fontSize: '14px', color: '#b3b3b3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {track.album}
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3' }}>
        {dateAdded}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
        {hovered && (
          <button onClick={e => { e.stopPropagation(); onLike() }} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px', display: 'flex' }}>
            <Heart size={14} color={liked ? '#1db954' : '#b3b3b3'} fill={liked ? '#1db954' : 'none'} />
          </button>
        )}
        <span style={{ fontSize: '14px', color: '#b3b3b3' }}>{formatDuration(track.duration)}</span>
      </div>
    </div>
  )
}

function extractGradientColor(gradient) {
  // pull first color from gradient string for background
  const match = gradient.match(/#[0-9a-f]{6}/i)
  return match ? match[0] + '88' : '#1e1e1e88'
}
