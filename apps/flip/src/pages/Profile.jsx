import { useState } from 'react'
import { Play, Grid3X3, Heart, Bookmark, Repeat2, Share2 } from 'lucide-react'
import { videos } from '../data/videos.js'

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'K'
  return n
}

const stats = [
  { label: 'Following', value: '284' },
  { label: 'Followers', value: '2.4M' },
  { label: 'Likes', value: '18.3M' },
]

const tabs = [
  { id: 'videos', label: 'Videos', icon: Grid3X3 },
  { id: 'liked', label: 'Liked', icon: Heart },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'reposts', label: 'Reposts', icon: Repeat2 },
]

export default function Profile() {
  const [activeTab, setActiveTab] = useState('videos')

  const gridVideos = videos.slice(0, 12)

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Header */}
      <div style={{ padding: '20px 20px 0', flexShrink: 0 }}>
        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fe2c55, #25f4ee)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            fontWeight: 800,
            color: '#fff',
            flexShrink: 0,
            border: '2px solid rgba(255,255,255,0.15)',
          }}>
            ZM
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', marginBottom: 2 }}>@zaramoon</div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>Zara Moon · Creator</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
          {stats.map(s => (
            <div key={s.label} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 14 }}>
          ✨ Making the internet a better place one video at a time<br />
          🎬 Content creator · café hunter · boba enthusiast<br />
          💌 zara@flipcreators.net
        </p>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          <button style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: 8,
            border: '1.5px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Edit Profile
          </button>
          <button style={{
            flex: 1,
            padding: '9px 0',
            borderRadius: 8,
            border: '1.5px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            Share Profile
          </button>
          <button style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            border: '1.5px solid rgba(255,255,255,0.2)',
            background: 'transparent',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}>
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            style={{
              flex: 1,
              padding: '10px 0',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === id ? '2px solid #fe2c55' : '2px solid transparent',
              color: activeTab === id ? '#fff' : 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Icon size={16} color={activeTab === id ? '#fe2c55' : 'rgba(255,255,255,0.4)'} />
            <span style={{ fontSize: 11, fontWeight: activeTab === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="custom-scroll" style={{ flex: 1, overflow: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
          {gridVideos.map(v => (
            <div key={v.id} style={{ position: 'relative', aspectRatio: '9/16', cursor: 'pointer' }}>
              <div style={{ position: 'absolute', inset: 0, background: v.gradient }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 4,
                left: 4,
                display: 'flex',
                alignItems: 'center',
                gap: 3,
              }}>
                <Play size={10} color="#fff" fill="#fff" />
                <span style={{ fontSize: 10, color: '#fff', fontWeight: 600 }}>{formatCount(v.likes)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
