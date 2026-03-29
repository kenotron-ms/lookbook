import { useState } from 'react'
import { Upload, Music, Lock, Users, Globe, Clock, Zap, X } from 'lucide-react'
import { trendingSounds } from '../data/videos.js'

const privacyOptions = [
  { id: 'everyone', label: 'Everyone', icon: Globe },
  { id: 'friends', label: 'Friends', icon: Users },
  { id: 'private', label: 'Only me', icon: Lock },
]

const suggestedTags = ['#fyp', '#foryou', '#trending', '#viral', '#dance', '#music', '#comedy', '#food', '#beauty', '#gaming']

export default function Studio() {
  const [caption, setCaption] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedSound, setSelectedSound] = useState(null)
  const [privacy, setPrivacy] = useState('everyone')
  const [scheduled, setScheduled] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [posted, setPosted] = useState(false)

  const toggleTag = tag => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])
  }

  const handlePost = () => {
    setPosted(true)
    setTimeout(() => setPosted(false), 3000)
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#000' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid #1a1a1a', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #fe2c55, #25f4ee)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Zap size={16} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#fff' }}>Creator Studio</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Upload & publish your Flip</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="custom-scroll" style={{ flex: 1, overflow: 'auto', padding: '16px 20px 24px' }}>

        {/* Upload area */}
        <div
          onDragOver={e => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={e => { e.preventDefault(); setDragOver(false) }}
          style={{
            border: `2px dashed ${dragOver ? '#fe2c55' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 16,
            padding: '32px 20px',
            textAlign: 'center',
            marginBottom: 20,
            background: dragOver ? 'rgba(254,44,85,0.05)' : 'rgba(255,255,255,0.02)',
            transition: 'all 0.2s',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'rgba(254,44,85,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px',
          }}>
            <Upload size={24} color="#fe2c55" />
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
            Drag and drop videos here
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
            MP4, MOV, AVI · Up to 10 minutes · Max 4GB
          </div>
          <button style={{
            padding: '10px 24px',
            borderRadius: 24,
            border: 'none',
            background: '#fe2c55',
            color: '#fff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(254,44,85,0.3)',
          }}>
            Select File
          </button>
        </div>

        {/* Caption */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 8 }}>
            Caption
          </label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Write a caption... add hashtags to reach more people"
            maxLength={2200}
            rows={3}
            style={{
              width: '100%',
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: 12,
              padding: '12px 14px',
              color: '#fff',
              fontSize: 13,
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <div style={{ textAlign: 'right', fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
            {caption.length}/2200
          </div>
        </div>

        {/* Hashtags */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 8 }}>
            Hashtags
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {suggestedTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 20,
                  border: `1.5px solid ${selectedTags.includes(tag) ? '#fe2c55' : 'rgba(255,255,255,0.15)'}`,
                  background: selectedTags.includes(tag) ? 'rgba(254,44,85,0.15)' : 'transparent',
                  color: selectedTags.includes(tag) ? '#fe2c55' : 'rgba(255,255,255,0.55)',
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                {tag}
                {selectedTags.includes(tag) && <X size={10} />}
              </button>
            ))}
          </div>
        </div>

        {/* Sound picker */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 8 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Music size={13} />
              Trending Sounds
            </span>
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {trendingSounds.map((sound, i) => (
              <div
                key={i}
                onClick={() => setSelectedSound(sound.title)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: `1.5px solid ${selectedSound === sound.title ? '#fe2c55' : 'rgba(255,255,255,0.08)'}`,
                  background: selectedSound === sound.title ? 'rgba(254,44,85,0.08)' : '#111',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #333, #111)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  ...(selectedSound === sound.title ? { animation: 'spin-disk 3s linear infinite' } : {}),
                }}>
                  <Music size={14} color="#25f4ee" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{sound.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{sound.artist} · {sound.uses} uses</div>
                </div>
                {selectedSound === sound.title && (
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fe2c55' }} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: 8 }}>
            Who can view this
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {privacyOptions.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setPrivacy(id)}
                style={{
                  flex: 1,
                  padding: '10px 8px',
                  borderRadius: 10,
                  border: `1.5px solid ${privacy === id ? '#fe2c55' : 'rgba(255,255,255,0.12)'}`,
                  background: privacy === id ? 'rgba(254,44,85,0.12)' : '#111',
                  color: privacy === id ? '#fe2c55' : 'rgba(255,255,255,0.5)',
                  fontSize: 11,
                  fontWeight: privacy === id ? 700 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  transition: 'all 0.2s',
                }}
              >
                <Icon size={16} color={privacy === id ? '#fe2c55' : 'rgba(255,255,255,0.5)'} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule toggle */}
        <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={15} color="rgba(255,255,255,0.5)" />
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Schedule</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Post at the best time for your audience</div>
            </div>
          </div>
          <button
            onClick={() => setScheduled(s => !s)}
            style={{
              width: 44,
              height: 24,
              borderRadius: 12,
              border: 'none',
              background: scheduled ? '#fe2c55' : '#333',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <div style={{
              position: 'absolute',
              top: 3,
              left: scheduled ? 23 : 3,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: '#fff',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        {/* Post button */}
        <button
          onClick={handlePost}
          style={{
            width: '100%',
            padding: '14px 0',
            borderRadius: 12,
            border: 'none',
            background: posted ? '#25f4ee' : 'linear-gradient(135deg, #fe2c55, #ff6b6b)',
            color: posted ? '#000' : '#fff',
            fontSize: 15,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: posted ? '0 0 24px rgba(37,244,238,0.4)' : '0 0 24px rgba(254,44,85,0.35)',
            transition: 'all 0.3s',
            letterSpacing: 0.3,
          }}
        >
          {posted ? '✓ Posted to Flip!' : 'Post Now'}
        </button>
      </div>
    </div>
  )
}
