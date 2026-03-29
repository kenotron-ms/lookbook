import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Image, Smile, Video, Calendar, Users, ShoppingBag, PlaySquare, ChevronDown, Cake, Dot } from 'lucide-react'
import { CURRENT_USER, POSTS, FRIENDS, STORIES } from '../data/posts.js'
import PostCard from '../components/PostCard.jsx'

const ACCENT = '#1877f2'

function Avatar({ initials, color, size = 40, online = false }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        width: size, height: size, borderRadius: '50%',
        backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: size * 0.38,
      }}>
        {initials}
      </div>
      {online && (
        <div style={{
          position: 'absolute', bottom: 1, right: 1,
          width: 10, height: 10, borderRadius: '50%',
          backgroundColor: '#31a24c', border: '2px solid #fff',
        }} />
      )}
    </div>
  )
}

function StoryCard({ story }) {
  if (story.isCreate) {
    return (
      <div style={{
        width: 100, height: 160, borderRadius: 12, overflow: 'hidden',
        backgroundColor: '#fff', border: '1px solid #e4e6eb',
        flexShrink: 0, cursor: 'pointer', position: 'relative',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ flex: 1, background: '#e4e6eb' }} />
        <div style={{
          padding: '10px 8px 12px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 22, fontWeight: 700, marginTop: -24,
            border: '3px solid #fff',
          }}>+</div>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#050505', textAlign: 'center', lineHeight: 1.2 }}>Create Story</span>
        </div>
      </div>
    )
  }
  return (
    <div style={{
      width: 100, height: 160, borderRadius: 12, overflow: 'hidden',
      background: story.gradient, flexShrink: 0, cursor: 'pointer',
      position: 'relative', display: 'flex', alignItems: 'flex-end', padding: 8,
    }}>
      <div style={{
        position: 'absolute', top: 8, left: 8,
        width: 36, height: 36, borderRadius: '50%',
        backgroundColor: ACCENT, border: '3px solid ' + ACCENT,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 700, fontSize: 13,
      }}>{story.initials}</div>
      <span style={{ color: '#fff', fontSize: 12, fontWeight: 700, textShadow: '0 1px 3px rgba(0,0,0,0.5)', lineHeight: 1.2 }}>
        {story.user.split(' ')[0]}
      </span>
    </div>
  )
}

function PostComposer() {
  const [text, setText] = useState('')
  return (
    <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '12px 16px', marginBottom: 12 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <Avatar initials={CURRENT_USER.initials} color={CURRENT_USER.color} size={40} />
        <div
          style={{
            flex: 1, backgroundColor: '#f0f2f5', borderRadius: 999,
            padding: '8px 16px', fontSize: 15, color: '#65676b', cursor: 'pointer',
          }}
          onClick={() => {}}
        >
          What's on your mind, {CURRENT_USER.name.split(' ')[0]}?
        </div>
      </div>
      <div style={{ height: 1, backgroundColor: '#e4e6eb', margin: '0 -4px 10px' }} />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {[
          { icon: Video, label: 'Live Video', color: '#f02849' },
          { icon: Image, label: 'Photo/Video', color: '#45bd62' },
          { icon: Smile, label: 'Feeling/Activity', color: '#f7b928' },
        ].map(({ icon: Icon, label, color }) => (
          <button key={label} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '6px 12px', borderRadius: 6, color: '#65676b',
            fontSize: 14, fontWeight: 600,
          }}>
            <Icon size={18} color={color} />
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function LeftSidebar() {
  const navigate = useNavigate()
  const shortcuts = [
    { icon: Calendar, label: 'Events', color: '#f02849' },
    { icon: Users, label: 'Groups', color: '#1877f2', path: '/groups' },
    { icon: ShoppingBag, label: 'Marketplace', color: '#f7b928', path: '/marketplace' },
    { icon: PlaySquare, label: 'Watch', color: '#1877f2' },
  ]
  return (
    <div style={{ width: 280, flexShrink: 0, padding: '16px 8px' }}>
      {/* Profile card */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', marginBottom: 4 }}
        onClick={() => navigate('/profile')}
      >
        <Avatar initials={CURRENT_USER.initials} color={CURRENT_USER.color} size={36} />
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, color: '#050505' }}>{CURRENT_USER.name}</div>
          <div style={{ fontSize: 12, color: '#65676b' }}>{CURRENT_USER.friends} friends</div>
        </div>
      </div>

      {/* Explore */}
      <div style={{ marginTop: 12 }}>
        {shortcuts.map(({ icon: Icon, label, color, path }) => (
          <div
            key={label}
            onClick={() => path && navigate(path)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px',
              borderRadius: 8, cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#050505',
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 8, backgroundColor: '#e4e6eb',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon size={20} color={color} />
            </div>
            {label}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 14, color: '#65676b', fontWeight: 600 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, backgroundColor: '#e4e6eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronDown size={20} color="#65676b" />
          </div>
          See more
        </div>
      </div>

      {/* Shortcuts */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 17, color: '#050505', padding: '0 12px 8px' }}>Your shortcuts</div>
        {['Photography Collective', 'Indie Dev Community', 'Foodies of Metro City'].map(name => (
          <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 12px', borderRadius: 8, cursor: 'pointer' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'linear-gradient(135deg,#1877f2,#00bcd4)' }} />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#050505' }}>{name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RightSidebar() {
  return (
    <div style={{ width: 280, flexShrink: 0, padding: '16px 8px' }}>
      {/* Birthdays */}
      <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '12px 16px', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <Cake size={20} color="#f02849" />
          <span style={{ fontSize: 14, color: '#050505' }}>
            <b>Priya Nair</b> and <b>2 others</b> have birthdays today.
          </span>
        </div>
      </div>

      {/* Contacts */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 8px 8px', marginBottom: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#65676b' }}>Contacts</span>
        </div>
        {FRIENDS.map(friend => (
          <div key={friend.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px', borderRadius: 8, cursor: 'pointer' }}>
            <Avatar initials={friend.initials} color={friend.color} size={36} online={friend.online} />
            <span style={{ fontSize: 14, fontWeight: 500, color: '#050505' }}>{friend.name}</span>
          </div>
        ))}
      </div>

      {/* Sponsored */}
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#65676b', padding: '0 8px 8px' }}>Sponsored</div>
        <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', overflow: 'hidden', cursor: 'pointer' }}>
          <div style={{ height: 100, background: 'linear-gradient(135deg,#1877f2,#9c27b0)' }} />
          <div style={{ padding: '8px 12px' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#050505' }}>ParaNet Premium</div>
            <div style={{ fontSize: 12, color: '#65676b' }}>paranet.social</div>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div style={{ marginTop: 16, padding: '0 8px', fontSize: 11, color: '#65676b', lineHeight: 2 }}>
        Privacy · Terms · Advertising · Cookies · More · Commons © 2025
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', maxWidth: 1200, margin: '0 auto', padding: '0 8px' }}>
      <LeftSidebar />
      {/* Center feed */}
      <div style={{ flex: 1, maxWidth: 590, padding: '16px 8px' }}>
        {/* Stories */}
        <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', padding: '12px 16px', marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
            <StoryCard story={{ isCreate: true }} />
            {STORIES.map(s => <StoryCard key={s.id} story={s} />)}
          </div>
        </div>

        <PostComposer />

        {POSTS.map(post => <PostCard key={post.id} post={post} />)}
      </div>
      <RightSidebar />
    </div>
  )
}
