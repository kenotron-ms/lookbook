import {
  Heart, SkipBack, Play, Pause, SkipForward,
  Shuffle, Repeat, Volume2, List
} from 'lucide-react'
import { formatDuration } from '../data/music'

const ACCENT = '#1db954'

export default function PlayerBar({
  track, isPlaying, setIsPlaying,
  progress, setProgress,
  volume, setVolume,
  shuffle, setShuffle,
  repeat, setRepeat,
  liked, setLiked,
}) {
  const elapsed = Math.floor((progress / 100) * track.duration)

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '72px',
      background: '#181818',
      borderTop: '1px solid #282828',
      display: 'flex',
      alignItems: 'center',
      padding: '0 16px',
      zIndex: 100,
      gap: '8px',
    }}>
      {/* LEFT ZONE - 30% */}
      <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '4px',
          background: track.gradient,
          flexShrink: 0,
        }} />
        <div style={{ overflow: 'hidden', flex: 1 }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '600',
            color: '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {track.title}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#b3b3b3',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            {track.artist}
          </div>
        </div>
        <button
          onClick={() => setLiked(!liked)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Heart
            size={16}
            color={liked ? ACCENT : '#b3b3b3'}
            fill={liked ? ACCENT : 'none'}
          />
        </button>
      </div>

      {/* CENTER ZONE - 40% */}
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
        {/* Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => setShuffle(!shuffle)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
          >
            <Shuffle size={16} color={shuffle ? ACCENT : '#b3b3b3'} />
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <SkipBack size={20} color='#e7e9ea' fill='#e7e9ea' />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {isPlaying
              ? <Pause size={16} color='#000000' fill='#000000' />
              : <Play size={16} color='#000000' fill='#000000' style={{ marginLeft: '2px' }} />
            }
          </button>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <SkipForward size={20} color='#e7e9ea' fill='#e7e9ea' />
          </button>
          <button
            onClick={() => setRepeat(!repeat)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}
          >
            <Repeat size={16} color={repeat ? ACCENT : '#b3b3b3'} />
          </button>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
          <span style={{ fontSize: '11px', color: '#b3b3b3', minWidth: '32px', textAlign: 'right' }}>
            {formatDuration(elapsed)}
          </span>
          <div style={{ flex: 1, position: 'relative', height: '4px', cursor: 'pointer' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setProgress(Math.max(0, Math.min(100, pct)))
            }}
          >
            {/* Track */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: '#4d4d4d',
              borderRadius: '2px',
            }} />
            {/* Fill */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: `${progress}%`,
              background: ACCENT,
              borderRadius: '2px',
              transition: 'width 0.1s',
            }} />
            {/* Thumb */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: `${progress}%`,
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#ffffff',
            }} />
          </div>
          <span style={{ fontSize: '11px', color: '#b3b3b3', minWidth: '32px' }}>
            {formatDuration(track.duration)}
          </span>
        </div>
      </div>

      {/* RIGHT ZONE - 30% */}
      <div style={{ width: '30%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
          <List size={16} color='#b3b3b3' />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
            <Volume2 size={16} color='#b3b3b3' />
          </button>
          <div style={{ position: 'relative', width: '80px', height: '4px', cursor: 'pointer' }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const pct = ((e.clientX - rect.left) / rect.width) * 100
              setVolume(Math.max(0, Math.min(100, pct)))
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: '#4d4d4d', borderRadius: '2px' }} />
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${volume}%`, background: ACCENT, borderRadius: '2px',
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: `${volume}%`,
              transform: 'translate(-50%, -50%)',
              width: '12px', height: '12px', borderRadius: '50%', background: '#ffffff',
            }} />
          </div>
        </div>
      </div>
    </div>
  )
}
