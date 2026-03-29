import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Twitter, Globe, Hand, MessageCircle, Bookmark, MoreHorizontal } from 'lucide-react'
import { articles } from '../data/articles.js'

const TABS = ['Home', 'About']

function ProfileArticleCard({ article, navigate }) {
  const [clapped, setClapped] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const formatClaps = n => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n

  return (
    <article
      style={{
        paddingBottom: 36,
        marginBottom: 36,
        borderBottom: '1px solid #f2f2f2',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 24,
      }}
      onClick={() => navigate('/article')}
    >
      <div>
        {/* Date */}
        <div style={{ fontSize: 13, color: '#9b9b9b', marginBottom: 10, fontFamily: 'Inter, sans-serif' }}>
          {article.date}
        </div>
        {/* Title */}
        <h2 style={{
          fontSize: 22, fontWeight: 700, color: '#000', lineHeight: 1.3,
          marginBottom: 10, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px',
        }}>
          {article.title}
        </h2>
        {/* Subtitle */}
        <p style={{
          fontSize: 16, color: '#6b6b6b', lineHeight: 1.6, marginBottom: 16,
          display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
        }}>
          {article.subtitle}
        </p>
        {/* Meta row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{article.readTime}</span>
          <button
            onClick={e => { e.stopPropagation(); setClapped(v => !v) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none',
              color: clapped ? '#1a8917' : '#6b6b6b', fontSize: 13,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
            }}>
            <Hand size={14} fill={clapped ? '#1a8917' : 'none'} />
            <span>{formatClaps(article.claps)}</span>
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', color: '#6b6b6b',
            fontSize: 13, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
          }}>
            <MessageCircle size={14} />
            <span>{article.comments}</span>
          </button>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button
              onClick={e => { e.stopPropagation(); setBookmarked(v => !v) }}
              style={{ background: 'none', border: 'none', color: bookmarked ? '#242424' : '#6b6b6b', cursor: 'pointer', padding: 4 }}>
              <Bookmark size={14} fill={bookmarked ? '#242424' : 'none'} />
            </button>
            <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', color: '#6b6b6b', cursor: 'pointer', padding: 4 }}>
              <MoreHorizontal size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div style={{
        width: 100, height: 100, borderRadius: 4,
        background: article.gradientSolid, flexShrink: 0, marginTop: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: article.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', opacity: 0.85, fontFamily: 'Inter, sans-serif' }}>
            {article.authorAvatar}
          </span>
        </div>
      </div>
    </article>
  )
}

export default function Profile() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Home')
  const [following, setFollowing] = useState(false)

  const authorArticles = articles.slice(0, 5)

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Profile header */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px 0' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'none', border: 'none', color: '#6b6b6b',
            display: 'flex', alignItems: 'center', gap: 6,
            cursor: 'pointer', marginBottom: 40,
            fontFamily: 'Inter, sans-serif', fontSize: 14,
          }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Profile hero */}
        <div style={{ display: 'flex', gap: 48, marginBottom: 0, alignItems: 'flex-start' }}>
          {/* Left: Main content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #f2f2f2', marginBottom: 0 }}>
              <div style={{ display: 'flex', gap: 0 }}>
                {TABS.map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    background: 'none', border: 'none',
                    borderBottom: `2px solid ${activeTab === tab ? '#000' : 'transparent'}`,
                    padding: '12px 20px', fontSize: 15, cursor: 'pointer',
                    color: activeTab === tab ? '#000' : '#6b6b6b',
                    fontFamily: 'Inter, sans-serif', fontWeight: activeTab === tab ? 600 : 400,
                    marginBottom: -1,
                  }}>
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            {activeTab === 'Home' && (
              <div style={{ paddingTop: 40 }}>
                {authorArticles.map(article => (
                  <ProfileArticleCard key={article.id} article={article} navigate={navigate} />
                ))}
              </div>
            )}

            {activeTab === 'About' && (
              <div style={{ paddingTop: 40, maxWidth: 560 }}>
                <p style={{
                  fontSize: 18, color: '#242424', lineHeight: 1.75, marginBottom: 32,
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}>
                  Designer, writer, and product thinker. I spend my time at the intersection of craft and technology — writing about what it means to build things that feel thoughtful, not just functional.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6b6b6b' }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: 15, fontFamily: 'Inter, sans-serif' }}>San Francisco, CA</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6b6b6b' }}>
                    <Twitter size={16} />
                    <span style={{ fontSize: 15, fontFamily: 'Inter, sans-serif', color: '#1a8917' }}>@sarahchen</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6b6b6b' }}>
                    <Globe size={16} />
                    <span style={{ fontSize: 15, fontFamily: 'Inter, sans-serif', color: '#1a8917' }}>sarahchen.design</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right sidebar: author card */}
          <div style={{
            width: 280, flexShrink: 0, paddingTop: 24,
          }}>
            {/* Avatar */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 24 }}>
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: '#1a8917', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, fontWeight: 700, marginBottom: 16,
                fontFamily: 'Inter, sans-serif',
              }}>SC</div>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: '#000', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
                Sarah Chen
              </h1>
              <p style={{ fontSize: 14, color: '#6b6b6b', marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
                Designer, writer, and product thinker.
              </p>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 24, marginBottom: 20 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#000', fontFamily: 'Inter, sans-serif' }}>12.4K</div>
                  <div style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>Followers</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#000', fontFamily: 'Inter, sans-serif' }}>203</div>
                  <div style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>Following</div>
                </div>
              </div>

              <button
                onClick={() => setFollowing(v => !v)}
                style={{
                  background: following ? '#fff' : '#1a8917',
                  color: following ? '#1a8917' : '#fff',
                  border: `1px solid ${following ? '#1a8917' : 'transparent'}`,
                  borderRadius: 9999, fontSize: 15, fontWeight: 500,
                  padding: '9px 28px', cursor: 'pointer', width: '100%',
                  fontFamily: 'Inter, sans-serif', marginBottom: 8,
                }}>
                {following ? 'Following' : 'Follow'}
              </button>
              {!following && (
                <button style={{
                  background: 'none', border: '1px solid #e0e0e0',
                  borderRadius: 9999, fontSize: 14, color: '#6b6b6b',
                  padding: '8px 28px', cursor: 'pointer', width: '100%',
                  fontFamily: 'Inter, sans-serif',
                }}>Subscribe</button>
              )}
            </div>

            {/* Publications */}
            <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: 20, marginBottom: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9b9b9b', marginBottom: 12, fontFamily: 'Inter, sans-serif' }}>
                Publication
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 4,
                  background: '#f2f2f2', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#000', fontFamily: 'Inter, sans-serif' }}>UX</span>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#000', fontFamily: 'Inter, sans-serif' }}>UX Collective</div>
                  <div style={{ fontSize: 12, color: '#9b9b9b', fontFamily: 'Inter, sans-serif' }}>38.2K followers</div>
                </div>
              </div>
            </div>

            {/* Location & links */}
            <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b6b6b' }}>
                  <MapPin size={14} />
                  <span style={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }}>San Francisco, CA</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Globe size={14} color="#6b6b6b" />
                  <span style={{ fontSize: 13, fontFamily: 'Inter, sans-serif', color: '#1a8917' }}>sarahchen.design</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}