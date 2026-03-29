import { useState } from 'react'
import { Flame, Sparkles, TrendingUp, ArrowUpRight, Users, ExternalLink, Globe } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
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

export default function Home() {
  const [sort, setSort] = useState('hot')
  const navigate = useNavigate()

  return (
    <div style={{ background: '#1a1a1b', minHeight: '100vh' }}>
      <Header />

      <div style={{
        display: 'flex', maxWidth: 1200, margin: '0 auto',
        paddingTop: 64, paddingLeft: 16, paddingRight: 16, gap: 24,
      }}>
        {/* Left Sidebar */}
        <aside style={{ width: 250, minWidth: 250, paddingTop: 16 }}>
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden',
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6314 0%, #c0392b 100%)',
              height: 48, display: 'flex', alignItems: 'center',
              padding: '0 16px',
            }}>
              <span style={{ fontWeight: 700, color: '#fff', fontSize: 13 }}>Communities</span>
            </div>
            <div style={{ padding: '4px 0' }}>
              {communities.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/g/${c.id}`)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 16px', cursor: 'pointer',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#272729'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 14, width: 20, textAlign: 'center' }}>{i + 1}</span>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, flexShrink: 0,
                  }}>
                    {c.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#d7dadc' }}>g/{c.name}</div>
                    <div style={{ fontSize: 11, color: '#818384' }}>{formatNum(c.members)} members</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #343536' }}>
              <button
                onClick={() => navigate('/submit')}
                style={{
                  width: '100%', padding: '8px 0', background: '#ff6314',
                  border: 'none', borderRadius: 20, color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e55a10'}
                onMouseLeave={e => e.currentTarget.style.background = '#ff6314'}
              >
                Create Post
              </button>
            </div>
          </div>

          {/* Policy links */}
          <div style={{ padding: '16px 4px', fontSize: 12, color: '#818384', lineHeight: 2 }}>
            {['Help', 'About', 'Careers', 'Press', 'Blog', 'Rules', 'Privacy Policy', 'User Agreement'].map(l => (
              <span key={l} style={{ marginRight: 8, cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
              >{l}</span>
            ))}
            <div style={{ marginTop: 8 }}>Agora Inc © 2025. All rights reserved.</div>
          </div>
        </aside>

        {/* Center Feed */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 16 }}>
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
                  fontWeight: 700, fontSize: 14, transition: 'all 0.1s',
                }}
                onMouseEnter={e => { if (sort !== opt.id) { e.currentTarget.style.background = '#272729'; e.currentTarget.style.color = '#d7dadc'; } }}
                onMouseLeave={e => { if (sort !== opt.id) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#818384'; } }}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>

          {/* Posts */}
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>

        {/* Right Sidebar */}
        <aside style={{ width: 312, minWidth: 312, paddingTop: 16 }}>
          {/* Home card */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6314 0%, #c0392b 100%)',
              height: 80, display: 'flex', alignItems: 'flex-end', padding: '12px 16px',
            }}>
              <Globe size={32} color="#fff" strokeWidth={1.5} />
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#d7dadc', marginBottom: 8 }}>Home</div>
              <p style={{ fontSize: 14, color: '#d7dadc', lineHeight: 1.6, marginBottom: 16 }}>
                Your personal Agora frontpage. Come here to check in with your favorite communities.
              </p>
              <button
                onClick={() => navigate('/submit')}
                style={{
                  width: '100%', padding: '8px 0', background: '#ff6314',
                  border: 'none', borderRadius: 20, color: '#fff',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', marginBottom: 8,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#e55a10'}
                onMouseLeave={e => e.currentTarget.style.background = '#ff6314'}
              >
                Create Post
              </button>
              <button style={{
                width: '100%', padding: '8px 0', background: 'transparent',
                border: '1px solid #818384', borderRadius: 20, color: '#d7dadc',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#d7dadc'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#818384'}
              >
                Create Community
              </button>
            </div>
          </div>

          {/* Top Communities */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid #343536' }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#d7dadc' }}>Top Communities</span>
            </div>
            {communities.slice(0, 5).map((c, i) => (
              <div
                key={c.id}
                onClick={() => navigate(`/g/${c.id}`)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 16px', cursor: 'pointer',
                  transition: 'background 0.1s',
                  borderBottom: i < 4 ? '1px solid #272729' : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#272729'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{ fontSize: 13, color: '#818384', width: 16 }}>#{i + 1}</span>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#d7dadc' }}>g/{c.name}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 1 }}>
                    <Users size={11} color="#818384" />
                    <span style={{ fontSize: 11, color: '#818384' }}>{formatNum(c.members)}</span>
                  </div>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); navigate(`/g/${c.id}`); }}
                  style={{
                    padding: '3px 12px', background: 'transparent',
                    border: '1px solid #ff6314', borderRadius: 20, color: '#ff6314',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,99,20,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                >
                  Join
                </button>
              </div>
            ))}
          </div>

          {/* Ad placeholder */}
          <div style={{
            background: '#272729', border: '1px dashed #343536',
            borderRadius: 4, height: 180,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <ExternalLink size={20} color="#343536" />
            <span style={{ fontSize: 12, color: '#343536' }}>Advertisement</span>
          </div>
        </aside>
      </div>
    </div>
  )
}
