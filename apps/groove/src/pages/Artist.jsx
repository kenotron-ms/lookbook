import { useState } from 'react'
import { Play, MoreHorizontal } from 'lucide-react'
import { ARTISTS, SONGS, ALBUMS, formatDuration } from '../data/music'

const ACCENT = '#1db954'
const ARTIST = ARTISTS[0] // Synthwave Dreams

export default function Artist() {
  const [isFollowing, setIsFollowing] = useState(false)
  const [hoveredTrack, setHoveredTrack] = useState(null)
  const popularTracks = SONGS.filter(s => s.artistId === 1 || s.artist === ARTIST.name).slice(0, 5)
  const fallbackTracks = SONGS.slice(0, 5)
  const tracks = popularTracks.length >= 5 ? popularTracks : fallbackTracks

  return (
    <div style={{ minHeight: '100%' }}>
      {/* Banner */}
      <div style={{
        height: '300px',
        background: ARTIST.gradient,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '24px 32px',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 100%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: ACCENT,
            padding: '4px 12px',
            borderRadius: '500px',
            marginBottom: '12px',
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffffff' }} />
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#000000', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Verified Artist
            </span>
          </div>
          <h1 style={{
            fontSize: '72px',
            fontWeight: '900',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '12px',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}>
            {ARTIST.name}
          </h1>
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', fontWeight: '600' }}>
            {ARTIST.listeners} monthly listeners
          </div>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <button style={{
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
          }}>
            <Play size={22} color="#000" fill="#000" style={{ marginLeft: '3px' }} />
          </button>
          <button
            onClick={() => setIsFollowing(!isFollowing)}
            style={{
              padding: '8px 24px',
              borderRadius: '500px',
              border: `1px solid ${isFollowing ? 'transparent' : '#b3b3b3'}`,
              background: isFollowing ? ACCENT : 'transparent',
              color: isFollowing ? '#000000' : '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.15s',
            }}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <MoreHorizontal size={28} color='#b3b3b3' />
          </button>
        </div>

        {/* Popular Tracks */}
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>Popular</h2>
          {tracks.map((track, i) => (
            <PopularTrackRow
              key={track.id}
              track={track}
              index={i + 1}
              hovered={hoveredTrack === track.id}
              onHover={setHoveredTrack}
            />
          ))}
        </section>

        {/* Discography */}
        <section style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>Discography</h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#b3b3b3', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Show all
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
            {ALBUMS.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </section>

        {/* Related Artists */}
        <section>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>Fans also like</h2>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#b3b3b3', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Show all
            </span>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {ARTISTS.slice(1, 7).map(artist => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function PopularTrackRow({ track, index, hovered, onHover }) {
  return (
    <div
      onMouseEnter={() => onHover(track.id)}
      onMouseLeave={() => onHover(null)}
      style={{
        display: 'grid',
        gridTemplateColumns: '48px 1fr auto auto',
        gap: '16px',
        padding: '8px 16px',
        borderRadius: '6px',
        background: hovered ? '#ffffff1a' : 'transparent',
        cursor: 'pointer',
        transition: 'background 0.15s',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center', fontSize: '14px', color: '#b3b3b3' }}>
        {hovered
          ? <Play size={14} color={ACCENT} fill={ACCENT} style={{ margin: '0 auto' }} />
          : index
        }
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '4px',
          background: track.gradient, flexShrink: 0,
        }} />
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#ffffff', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {track.title}
          </div>
        </div>
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3' }}>{track.plays}</div>
      <div style={{ fontSize: '14px', color: '#b3b3b3' }}>{formatDuration(track.duration)}</div>
    </div>
  )
}

function AlbumCard({ album }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: '160px', flexShrink: 0, cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <div style={{
          width: '160px', height: '160px', borderRadius: '6px',
          background: album.gradient,
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.2s',
        }} />
        {hovered && (
          <div style={{
            position: 'absolute', bottom: '8px', right: '8px',
            width: '40px', height: '40px', borderRadius: '50%',
            background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
          }}>
            <Play size={18} color="#000" fill="#000" style={{ marginLeft: '2px' }} />
          </div>
        )}
      </div>
      <div style={{ fontSize: '14px', fontWeight: '700', color: '#e7e9ea', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {album.title}
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3' }}>{album.year} · Album</div>
    </div>
  )
}

function ArtistCard({ artist }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: '160px', cursor: 'pointer', textAlign: 'center' }}
    >
      <div style={{ position: 'relative', marginBottom: '12px', display: 'inline-block' }}>
        <div style={{
          width: '160px', height: '160px', borderRadius: '50%',
          background: artist.gradient,
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : 'none',
          transition: 'box-shadow 0.2s',
        }} />
        {hovered && (
          <div style={{
            position: 'absolute', bottom: '8px', right: '8px',
            width: '40px', height: '40px', borderRadius: '50%',
            background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Play size={18} color="#000" fill="#000" style={{ marginLeft: '2px' }} />
          </div>
        )}
      </div>
      <div style={{ fontSize: '14px', fontWeight: '700', color: '#e7e9ea', marginBottom: '4px' }}>
        {artist.name}
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3' }}>Artist</div>
    </div>
  )
}
