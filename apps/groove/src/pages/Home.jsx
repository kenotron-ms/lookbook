import { useState } from 'react'
import { Play } from 'lucide-react'
import { RECENTLY_PLAYED, MADE_FOR_YOU, NEW_RELEASES, CURRENT_USER } from '../data/music'

const ACCENT = '#1db954'

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

function AlbumCard({ item, size = 160 }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: `${size}px`,
        flexShrink: 0,
        cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <div style={{
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '6px',
          background: item.gradient,
          boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.2s',
        }} />
        {hovered && (
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: ACCENT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
            animation: 'fadeIn 0.15s ease',
          }}>
            <Play size={18} color="#000" fill="#000" style={{ marginLeft: '2px' }} />
          </div>
        )}
      </div>
      <div style={{ fontSize: '14px', fontWeight: '700', color: '#e7e9ea', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.title || item.name}
      </div>
      <div style={{ fontSize: '13px', color: '#b3b3b3', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.description || item.artist}
      </div>
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>{title}</h2>
      <span style={{ fontSize: '12px', fontWeight: '700', color: '#b3b3b3', cursor: 'pointer', letterSpacing: '1px', textTransform: 'uppercase' }}>
        Show all
      </span>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ padding: '24px 32px', minHeight: '100%' }}>
      <style>{`@keyframes fadeIn { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); } }`}</style>

      {/* Greeting */}
      <h1 style={{
        fontSize: '28px',
        fontWeight: '800',
        color: '#ffffff',
        marginBottom: '24px',
      }}>
        {getGreeting()}, {CURRENT_USER.name.split(' ')[0]}
      </h1>

      {/* Recently Played */}
      <div style={{ marginBottom: '40px' }}>
        <SectionHeader title="Recently played" />
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {RECENTLY_PLAYED.map(item => (
            <AlbumCard key={item.id} item={item} size={160} />
          ))}
        </div>
      </div>

      {/* Made For You */}
      <div style={{ marginBottom: '40px' }}>
        <SectionHeader title="Made For You" />
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {MADE_FOR_YOU.map(item => (
            <AlbumCard key={item.id} item={item} size={160} />
          ))}
        </div>
      </div>

      {/* New Releases */}
      <div style={{ marginBottom: '40px' }}>
        <SectionHeader title="New releases" />
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
          {NEW_RELEASES.map(item => (
            <AlbumCard key={item.id} item={item} size={160} />
          ))}
        </div>
      </div>
    </div>
  )
}
