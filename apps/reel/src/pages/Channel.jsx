import { useState } from 'react'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import VideoCard from '../components/VideoCard'
import { videos, channels } from '../data/videos'

const tabs = ['Home', 'Videos', 'Shorts', 'Playlists', 'Community', 'About']

const channel = channels[0]

export default function Channel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Videos')
  const [subscribed, setSubscribed] = useState(false)

  return (
    <div style={{ paddingBottom: 48 }}>
      {/* Banner */}
      <div style={{
        width: '100%', height: 160,
        background: channel.bannerGradient,
        position: 'relative',
      }} />

      {/* Channel info */}
      <div style={{ padding: '0 24px', background: '#0f0f0f' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 20,
          marginTop: -28, marginBottom: 16,
        }}>
          {/* Large avatar 80px */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: channel.bannerGradient,
            border: '3px solid #0f0f0f',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, fontWeight: 700, color: '#fff', flexShrink: 0,
          }}>
            {channel.name.slice(0, 1)}
          </div>

          {/* Name + meta */}
          <div style={{ flex: 1, paddingBottom: 4 }}>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: '#f1f1f1', marginBottom: 4 }}>
              {channel.name}
            </h1>
            <div style={{ fontSize: 13, color: '#aaaaaa', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <span>{channel.handle}</span>
              <span>·</span>
              <span>{channel.subscribers} subscribers</span>
              <span>·</span>
              <span>{channel.videoCount} videos</span>
            </div>
          </div>

          {/* Subscribe button */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: 4 }}>
            <button
              onClick={() => setSubscribed(s => !s)}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 24px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: subscribed ? '#272727' : '#ff0000',
                color: '#fff', fontSize: 14, fontWeight: 600,
                transition: 'background 0.2s',
              }}
            >
              {subscribed && <Bell size={16} />}
              {subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
            {subscribed && (
              <button style={{
                padding: '10px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: '#272727', color: '#f1f1f1', fontSize: 14, fontWeight: 600,
              }}>
                Join
              </button>
            )}
            {!subscribed && (
              <button style={{
                padding: '10px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: '#272727', color: '#f1f1f1', fontSize: 14, fontWeight: 600,
              }}>
                Join
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: 'flex', gap: 0,
          borderBottom: '1px solid #3d3d3d',
          marginBottom: 24,
        }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 16px',
                background: 'none', border: 'none', cursor: 'pointer',
                color: activeTab === tab ? '#f1f1f1' : '#aaaaaa',
                fontSize: 14, fontWeight: activeTab === tab ? 600 : 400,
                borderBottom: activeTab === tab ? '2px solid #f1f1f1' : '2px solid transparent',
                transition: 'all 0.15s',
                marginBottom: -1,
              }}
              onMouseEnter={e => { if (activeTab !== tab) e.currentTarget.style.color = '#f1f1f1' }}
              onMouseLeave={e => { if (activeTab !== tab) e.currentTarget.style.color = '#aaaaaa' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Videos grid */}
        {activeTab === 'Videos' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px 16px',
          }}>
            {videos.map(v => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        )}

        {activeTab === 'Home' && (
          <div>
            {/* Featured video */}
            <div
              onClick={() => navigate('/watch')}
              style={{
                width: '100%', height: 200, borderRadius: 12,
                background: channel.bannerGradient,
                marginBottom: 24, cursor: 'pointer', position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'rgba(0,0,0,0.5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
              </div>
              <div style={{
                position: 'absolute', bottom: 16, left: 20,
                fontSize: 16, fontWeight: 700, color: '#fff',
              }}>
                Featured: The Art of Slow Cinema
              </div>
            </div>
            <h3 style={{ color: '#f1f1f1', fontWeight: 600, marginBottom: 16 }}>Recent uploads</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px 16px' }}>
              {videos.slice(0, 8).map(v => <VideoCard key={v.id} video={v} />)}
            </div>
          </div>
        )}

        {(activeTab === 'Shorts' || activeTab === 'Playlists' || activeTab === 'Community' || activeTab === 'About') && (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 200, color: '#aaaaaa', fontSize: 15,
          }}>
            {activeTab} content coming soon
          </div>
        )}
      </div>
    </div>
  )
}