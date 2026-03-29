import { useState } from 'react'
import { UserPlus, MessageSquare, MoreHorizontal, MapPin, Briefcase, Heart, Camera } from 'lucide-react'
import { CURRENT_USER, FRIENDS, POSTS } from '../data/posts.js'
import PostCard from '../components/PostCard.jsx'

const ACCENT = '#1877f2'

const TABS = ['Posts', 'About', 'Friends', 'Photos', 'Videos', 'More']

function Avatar({ initials, color, size = 40 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontSize: size * 0.38, flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

function FriendCard({ friend }) {
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', overflow: 'hidden', cursor: 'pointer' }}>
      <div style={{ height: 100, background: `linear-gradient(135deg,${friend.color}88,${friend.color})` }} />
      <div style={{ padding: '8px 10px 12px' }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: '#050505', marginBottom: 2 }}>{friend.name}</div>
        <div style={{ fontSize: 11, color: '#65676b' }}>12 mutual friends</div>
      </div>
    </div>
  )
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('Posts')

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto' }}>
      {/* Cover + profile info */}
      <div style={{ backgroundColor: '#fff', borderRadius: '0 0 8px 8px', marginBottom: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.06)' }}>
        {/* Cover photo */}
        <div style={{
          height: 300,
          background: 'linear-gradient(135deg,#1877f2,#9c27b0,#e91e63)',
          borderRadius: '0 0 0 0',
          position: 'relative',
        }}>
          <button style={{
            position: 'absolute', bottom: 16, right: 16,
            backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: 6,
            padding: '7px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
            fontWeight: 600, fontSize: 13, color: '#050505',
          }}>
            <Camera size={15} />
            Edit cover photo
          </button>
        </div>

        {/* Profile photo + name row */}
        <div style={{ padding: '0 24px 16px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, marginTop: -40, marginBottom: 12 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 160, height: 160, borderRadius: '50%',
                backgroundColor: CURRENT_USER.color,
                border: '4px solid #fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 56,
              }}>
                {CURRENT_USER.initials}
              </div>
              <button style={{
                position: 'absolute', bottom: 6, right: 6,
                width: 36, height: 36, borderRadius: '50%',
                backgroundColor: '#e4e6eb', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Camera size={18} color="#050505" />
              </button>
            </div>
            <div style={{ flex: 1, paddingBottom: 8 }}>
              <h1 style={{ margin: '0 0 4px', fontSize: 28, fontWeight: 800, color: '#050505' }}>{CURRENT_USER.name}</h1>
              <div style={{ fontSize: 15, color: '#65676b', marginBottom: 10 }}>{CURRENT_USER.friends} friends</div>
              {/* Friend avatar strip */}
              <div style={{ display: 'flex', marginBottom: 4 }}>
                {FRIENDS.slice(0, 8).map((f, i) => (
                  <div key={f.id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: 8 - i }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: '50%',
                      backgroundColor: f.color,
                      border: '2px solid #fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 700, fontSize: 11,
                    }}>{f.initials}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 8, paddingBottom: 8 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', backgroundColor: ACCENT,
                color: '#fff', border: 'none', borderRadius: 6,
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>
                <UserPlus size={16} />
                Add friend
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 16px', backgroundColor: '#e4e6eb',
                color: '#050505', border: 'none', borderRadius: 6,
                fontWeight: 600, fontSize: 14, cursor: 'pointer',
              }}>
                <MessageSquare size={16} />
                Message
              </button>
              <button style={{
                padding: '8px 12px', backgroundColor: '#e4e6eb',
                color: '#050505', border: 'none', borderRadius: 6, cursor: 'pointer',
              }}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, backgroundColor: '#e4e6eb', marginBottom: 4 }} />

          {/* Tab bar */}
          <div style={{ display: 'flex', gap: 4 }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 16px', background: 'none', border: 'none',
                  cursor: 'pointer', fontWeight: 600, fontSize: 14,
                  borderBottom: activeTab === tab ? `3px solid ${ACCENT}` : '3px solid transparent',
                  color: activeTab === tab ? ACCENT : '#65676b',
                  borderRadius: '4px 4px 0 0',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 12, padding: '0 8px' }}>
        {/* Left column: intro */}
        <div style={{ width: 340, flexShrink: 0 }}>
          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '16px 16px', marginBottom: 12 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#050505' }}>Intro</h3>
            <div style={{ fontSize: 14, color: '#65676b', textAlign: 'center', marginBottom: 16, lineHeight: 1.5 }}>
              Sharing moments, building connections. Living in the present. 🌍
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: MapPin, text: 'Lives in Metro City' },
                { icon: Briefcase, text: 'Works at ParaNet Corp' },
                { icon: Heart, text: 'In a relationship' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#050505', fontSize: 14 }}>
                  <Icon size={18} color="#65676b" />
                  {text}
                </div>
              ))}
            </div>
            <button style={{
              width: '100%', marginTop: 14, padding: '8px 0',
              backgroundColor: '#e4e6eb', border: 'none', borderRadius: 6,
              fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#050505',
            }}>
              Edit bio
            </button>
          </div>

          {/* Friends preview */}
          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '16px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#050505' }}>Friends</h3>
                <div style={{ fontSize: 13, color: '#65676b' }}>{CURRENT_USER.friends} friends</div>
              </div>
              <button style={{ background: 'none', border: 'none', color: ACCENT, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>See all friends</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {FRIENDS.slice(0, 6).map(f => (
                <div key={f.id} style={{ cursor: 'pointer', textAlign: 'center' }}>
                  <div style={{ height: 90, borderRadius: 8, backgroundColor: f.color, marginBottom: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 22 }}>
                    {f.initials}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#050505', lineHeight: 1.2 }}>{f.name.split(' ')[0]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photos preview */}
          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '16px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#050505' }}>Photos</h3>
              <button style={{ background: 'none', border: 'none', color: ACCENT, fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>See all photos</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4 }}>
              {[
                'linear-gradient(135deg,#1a1a2e,#533483)',
                'linear-gradient(135deg,#1b1b2f,#474787)',
                'linear-gradient(135deg,#2d5a27,#6aaa56)',
                'linear-gradient(135deg,#bf8040,#e8b08f)',
                'linear-gradient(135deg,#f9a825,#fff176)',
                'linear-gradient(135deg,#b71c1c,#e53935)',
              ].map((g, i) => (
                <div key={i} style={{ aspectRatio: '1', borderRadius: 4, background: g, cursor: 'pointer' }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right column: posts */}
        <div style={{ flex: 1 }}>
          {/* Post composer */}
          <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '12px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <Avatar initials={CURRENT_USER.initials} color={CURRENT_USER.color} size={40} />
              <div style={{
                flex: 1, backgroundColor: '#f0f2f5', borderRadius: 999,
                padding: '8px 16px', fontSize: 15, color: '#65676b', cursor: 'pointer',
              }}>
                What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
              </div>
            </div>
          </div>

          {/* Posts feed */}
          {POSTS.slice(0, 6).map(post => <PostCard key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  )
}
