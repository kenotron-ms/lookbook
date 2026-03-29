import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Flame, Sparkles, TrendingUp, ArrowUpRight, Users, Shield, Calendar, ChevronRight } from 'lucide-react'
import Header from '../components/Header.jsx'
import PostCard from '../components/PostCard.jsx'
import { posts, communities } from '../data/posts.js'

function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

const sortOptions = [
  { id: 'hot', label: 'Hot', icon: <Flame size={15} /> },
  { id: 'new', label: 'New', icon: <Sparkles size={15} /> },
  { id: 'top', label: 'Top', icon: <TrendingUp size={15} /> },
  { id: 'rising', label: 'Rising', icon: <ArrowUpRight size={15} /> },
]

export default function Community() {
  const { communityId } = useParams()
  const navigate = useNavigate()
  const [sort, setSort] = useState('hot')
  const [joined, setJoined] = useState(false)

  const community = communities.find(c => c.id === communityId) || communities[0]
  const communityPosts = posts.filter(p => p.community === community.id)

  return (
    <div style={{ background: '#1a1a1b', minHeight: '100vh' }}>
      <Header />

      {/* Banner */}
      <div style={{
        marginTop: 48, height: 160,
        background: community.banner,
        position: 'relative',
      }} />

      {/* Community header */}
      <div style={{ background: '#1a1a1b', borderBottom: '1px solid #343536' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, paddingBottom: 12 }}>
            {/* Community icon */}
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: community.color, border: '4px solid #1a1a1b',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, marginTop: -24, flexShrink: 0,
            }}>
              {community.icon}
            </div>
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <h1 style={{ fontSize: 28, fontWeight: 700, color: '#d7dadc', lineHeight: 1 }}>
                g/{community.name}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={14} color="#818384" />
                  <span style={{ fontSize: 13, color: '#818384', fontWeight: 700 }}>{formatNum(community.members)}</span>
                  <span style={{ fontSize: 13, color: '#818384' }}>members</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#46d160' }} />
                  <span style={{ fontSize: 13, color: '#818384', fontWeight: 700 }}>{formatNum(community.online)}</span>
                  <span style={{ fontSize: 13, color: '#818384' }}>online</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, paddingBottom: 4 }}>
              <button
                onClick={() => navigate('/submit')}
                style={{
                  padding: '7px 20px', background: 'transparent',
                  border: '1px solid #818384', borderRadius: 20, color: '#d7dadc',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#d7dadc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#818384'}
              >
                Create Post
              </button>
              <button
                onClick={() => setJoined(j => !j)}
                style={{
                  padding: '7px 24px',
                  background: joined ? 'transparent' : '#ff6314',
                  border: joined ? '1px solid #818384' : '1px solid #ff6314',
                  borderRadius: 20,
                  color: joined ? '#d7dadc' : '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
              >
                {joined ? 'Leave' : 'Join'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex', maxWidth: 1200, margin: '0 auto',
        padding: '16px 16px 0', gap: 24,
      }}>
        {/* Feed */}
        <main style={{ flex: 1, minWidth: 0 }}>
          {/* Sort bar */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
            padding: '6px 12px', display: 'flex', gap: 8, marginBottom: 12,
          }}>
            {sortOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => setSort(opt.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 12px', borderRadius: 2, border: 'none', cursor: 'pointer',
                  background: sort === opt.id ? 'rgba(255,99,20,0.12)' : 'transparent',
                  color: sort === opt.id ? '#ff6314' : '#818384',
                  fontWeight: 700, fontSize: 14,
                }}
                onMouseEnter={e => { if (sort !== opt.id) { e.currentTarget.style.background = '#272729'; e.currentTarget.style.color = '#d7dadc'; } }}
                onMouseLeave={e => { if (sort !== opt.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#818384'; } }}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          {communityPosts.length > 0 ? communityPosts.map(post => (
            <PostCard key={post.id} post={post} />
          )) : (
            <div style={{
              background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
              padding: 40, textAlign: 'center', color: '#818384',
            }}>
              <p style={{ fontSize: 18, fontWeight: 700, color: '#d7dadc', marginBottom: 8 }}>No posts yet</p>
              <p>Be the first to post in g/{community.name}!</p>
              <button
                onClick={() => navigate('/submit')}
                style={{
                  marginTop: 16, padding: '8px 24px', background: '#ff6314',
                  border: 'none', borderRadius: 20, color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
              >
                Create Post
              </button>
            </div>
          )}
        </main>

        {/* Right sidebar */}
        <aside style={{ width: 312, minWidth: 312 }}>
          {/* About */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{
              background: community.color, padding: '10px 16px',
            }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>About g/{community.name}</span>
            </div>
            <div style={{ padding: 16 }}>
              <p style={{ fontSize: 14, color: '#d7dadc', lineHeight: 1.6, marginBottom: 16 }}>
                {community.description}
              </p>
              <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#d7dadc' }}>{formatNum(community.members)}</div>
                  <div style={{ fontSize: 12, color: '#818384' }}>Members</div>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#46d160' }}>{formatNum(community.online)}</div>
                  <div style={{ fontSize: 12, color: '#818384' }}>Online</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Calendar size={14} color="#818384" />
                <span style={{ fontSize: 13, color: '#818384' }}>Created {community.created}</span>
              </div>
              <button
                onClick={() => setJoined(j => !j)}
                style={{
                  width: '100%', padding: '8px 0',
                  background: joined ? 'transparent' : '#ff6314',
                  border: joined ? '1px solid #818384' : '1px solid #ff6314',
                  borderRadius: 20, color: joined ? '#d7dadc' : '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
              >
                {joined ? 'Joined ✓' : 'Join Community'}
              </button>
            </div>
          </div>

          {/* Rules */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #343536' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#d7dadc' }}>g/{community.name} Rules</span>
            </div>
            {community.rules.map((rule, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '10px 16px',
                borderBottom: i < community.rules.length - 1 ? '1px solid #272729' : 'none',
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#ff6314', minWidth: 18 }}>{i + 1}.</span>
                <span style={{ fontSize: 13, color: '#d7dadc', lineHeight: 1.5 }}>{rule}</span>
              </div>
            ))}
          </div>

          {/* Mods */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden',
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #343536' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#d7dadc' }}>Moderators</span>
            </div>
            {community.mods.map((mod, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 16px',
                borderBottom: i < community.mods.length - 1 ? '1px solid #272729' : 'none',
              }}>
                <Shield size={13} color="#ff6314" />
                <span style={{ fontSize: 13, color: '#ff6314', cursor: 'pointer' }}
                  onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                  onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
                >{mod}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
