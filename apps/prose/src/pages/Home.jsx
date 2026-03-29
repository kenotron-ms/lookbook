import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Hand, MessageCircle, Bookmark, MoreHorizontal, ChevronDown } from 'lucide-react'
import { articles, suggestedAuthors } from '../data/articles.js'

const TOPICS = ['For You', 'Following', 'Design', 'Technology', 'Programming', 'Science', 'Business', 'Self-Improvement']

const RECOMMENDED_TAGS = [
  '#programming', '#design', '#technology', '#productivity', '#startups',
  '#machine-learning', '#ux-design', '#javascript', '#science', '#writing',
]

function ArticleCard({ article, onClick }) {
  const [bookmarked, setBookmarked] = useState(false)
  const [clapped, setClapped] = useState(false)

  const avatarColors = {
    SC: '#1a8917', MW: '#11998e', PN: '#f7971e', AP: '#ee0000',
    LM: '#4facfe', JE: '#a18cd1', TA: '#30cfd0', IT: '#0ba360',
    DK: '#61dafb', NC: '#fda085', ZH: '#264de4', OH: '#ee9ca7',
  }
  const color = avatarColors[article.authorAvatar] || '#1a8917'

  const formatClaps = (n) => n >= 1000 ? (n / 1000).toFixed(1) + 'K' : n

  return (
    <article
      onClick={onClick}
      style={{
        padding: '24px 0',
        borderBottom: '1px solid #f2f2f2',
        cursor: 'pointer',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 20,
        alignItems: 'start',
      }}
    >
      <div style={{ minWidth: 0 }}>
        {/* Author row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{
            width: 24, height: 24, borderRadius: '50%',
            background: color, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 600, flexShrink: 0,
          }}>{article.authorAvatar}</div>
          <span style={{ fontSize: 13, color: '#242424', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{article.author}</span>
          <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>in</span>
          <span style={{ fontSize: 13, color: '#242424', fontFamily: 'Inter, sans-serif' }}>{article.publication}</span>
          <span style={{ color: '#6b6b6b', fontSize: 13 }}>·</span>
          <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{article.date}</span>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: 20, fontWeight: 700, color: '#000000',
          lineHeight: 1.3, marginBottom: 8,
          fontFamily: 'Inter, sans-serif', letterSpacing: '-0.3px',
        }}>
          {article.title}
        </h2>

        {/* Subtitle */}
        <p style={{
          fontSize: 15, color: '#6b6b6b', lineHeight: 1.6,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          fontFamily: 'Inter, sans-serif',
        }}>
          {article.subtitle}
        </p>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Tag pill */}
          {article.tags[0] && (
            <span style={{
              background: '#f2f2f2', color: '#242424',
              borderRadius: 9999, fontSize: 12, padding: '4px 10px',
              marginRight: 8, fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}>{article.tags[0]}</span>
          )}
          <span style={{ fontSize: 13, color: '#6b6b6b', marginRight: 12, fontFamily: 'Inter, sans-serif' }}>{article.readTime}</span>

          <button
            onClick={e => { e.stopPropagation(); setClapped(v => !v) }}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: 'none', border: 'none',
              color: clapped ? '#1a8917' : '#6b6b6b',
              fontSize: 13, padding: '4px 8px', borderRadius: 4,
              fontFamily: 'Inter, sans-serif',
            }}>
            <Hand size={15} fill={clapped ? '#1a8917' : 'none'} />
            <span>{formatClaps(article.claps + (clapped ? 1 : 0))}</span>
          </button>

          <button style={{
            display: 'flex', alignItems: 'center', gap: 4,
            background: 'none', border: 'none', color: '#6b6b6b',
            fontSize: 13, padding: '4px 8px', borderRadius: 4,
            fontFamily: 'Inter, sans-serif',
          }}>
            <MessageCircle size={15} />
            <span>{article.comments}</span>
          </button>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
            <button
              onClick={e => { e.stopPropagation(); setBookmarked(v => !v) }}
              style={{
                background: 'none', border: 'none', padding: 6,
                color: bookmarked ? '#242424' : '#6b6b6b',
              }}>
              <Bookmark size={15} fill={bookmarked ? '#242424' : 'none'} />
            </button>
            <button onClick={e => e.stopPropagation()} style={{ background: 'none', border: 'none', padding: 6, color: '#6b6b6b' }}>
              <MoreHorizontal size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail */}
      <div style={{
        width: 88, height: 88, borderRadius: 4, flexShrink: 0,
        background: article.gradientSolid,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        marginTop: 4,
      }}>
        <div style={{
          width: '100%', height: '100%',
          background: article.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{
            fontSize: 28, fontWeight: 800, color: '#ffffff',
            fontFamily: 'Inter, sans-serif', opacity: 0.85,
            textShadow: '0 1px 4px rgba(0,0,0,0.15)',
          }}>
            {article.authorAvatar}
          </span>
        </div>
      </div>
    </article>
  )
}

function StaffPickCard({ article, onClick }) {
  const avatarColors = {
    SC: '#1a8917', MW: '#11998e', PN: '#f7971e', AP: '#ee0000',
    LM: '#4facfe', JE: '#a18cd1', TA: '#30cfd0', IT: '#0ba360',
    DK: '#61dafb', NC: '#fda085', ZH: '#264de4', OH: '#ee9ca7',
  }
  const color = avatarColors[article.authorAvatar] || '#1a8917'
  return (
    <div onClick={onClick} style={{ cursor: 'pointer', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 20, height: 20, borderRadius: '50%',
          background: color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 600, flexShrink: 0,
        }}>{article.authorAvatar}</div>
        <span style={{ fontSize: 13, color: '#242424', fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>{article.author}</span>
        <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>·</span>
        <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{article.date}</span>
      </div>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: '#000', lineHeight: 1.35, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
        {article.title}
      </h3>
      <p style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{article.readTime}</p>
    </div>
  )
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState('For You')
  const navigate = useNavigate()

  const mainArticles = articles.slice(0, 8)
  const staffPicks = articles.slice(8, 11)
  const savedArticles = articles.slice(0, 2)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      {/* Topics bar */}
      <div style={{
        position: 'sticky', top: 64, zIndex: 50,
        background: '#ffffff',
        borderBottom: '1px solid #f2f2f2',
        display: 'flex', alignItems: 'center',
        gap: 4, overflowX: 'auto', padding: '12px 0',
        scrollbarWidth: 'none',
      }}>
        {TOPICS.map(topic => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`topic-chip${activeTopic === topic ? ' active' : ''}`}
          >
            {topic}
          </button>
        ))}
      </div>

      {/* Main layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 0,
        marginTop: 0,
      }}>
        {/* LEFT: Main feed */}
        <div style={{ paddingRight: 64, paddingTop: 24 }}>
          {mainArticles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
              onClick={() => navigate('/article')}
            />
          ))}

          {/* Staff Picks */}
          <div style={{ marginTop: 40, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#000', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif' }}>⭐ Staff Picks</span>
            </div>
            {staffPicks.map(article => (
              <StaffPickCard
                key={article.id}
                article={article}
                onClick={() => navigate('/article')}
              />
            ))}
          </div>

          <button style={{
            background: 'none', border: '1px solid #e0e0e0',
            borderRadius: 9999, fontSize: 14, color: '#6b6b6b',
            padding: '10px 24px', cursor: 'pointer', marginBottom: 60,
            fontFamily: 'Inter, sans-serif',
          }}>
            Load more stories
          </button>
        </div>

        {/* RIGHT: Sidebar */}
        <div style={{
          paddingTop: 24, paddingLeft: 24,
          borderLeft: '1px solid #f2f2f2',
          position: 'sticky',
          top: 112,
          alignSelf: 'start',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}>
          {/* Recommended Topics */}
          <section style={{ marginBottom: 36 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              Recommended topics
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {RECOMMENDED_TAGS.map(tag => (
                <button key={tag} style={{
                  background: '#f2f2f2', color: '#242424',
                  border: 'none', borderRadius: 9999,
                  fontSize: 13, padding: '6px 14px', cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'background 0.15s',
                }}
                  onMouseEnter={e => e.target.style.background = '#e6e6e6'}
                  onMouseLeave={e => e.target.style.background = '#f2f2f2'}
                >
                  {tag}
                </button>
              ))}
            </div>
            <button style={{
              background: 'none', border: 'none', color: '#1a8917',
              fontSize: 14, padding: '12px 0', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}>See more topics</button>
          </section>

          {/* Who to Follow */}
          <section style={{ marginBottom: 36 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              Who to follow
            </h3>
            {suggestedAuthors.map((author) => (
              <div key={author.name} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 20,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: author.avatarColor, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 600, flexShrink: 0,
                  fontFamily: 'Inter, sans-serif',
                }}>{author.avatar}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#000', fontFamily: 'Inter, sans-serif' }}>{author.name}</div>
                  <div style={{
                    fontSize: 12, color: '#6b6b6b', fontFamily: 'Inter, sans-serif',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>{author.bio}</div>
                </div>
                <button style={{
                  background: '#000', color: '#fff', border: 'none',
                  borderRadius: 9999, fontSize: 13, padding: '6px 14px',
                  cursor: 'pointer', flexShrink: 0,
                  fontFamily: 'Inter, sans-serif', fontWeight: 500,
                }}>Follow</button>
              </div>
            ))}
            <button style={{ background: 'none', border: 'none', color: '#1a8917', fontSize: 14, padding: '0', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              See more suggestions
            </button>
          </section>

          {/* Reading List */}
          <section style={{ marginBottom: 36 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#000', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              Your reading list
            </h3>
            {savedArticles.map(article => (
              <div
                key={article.id}
                style={{
                  display: 'flex', gap: 10, marginBottom: 14,
                  cursor: 'pointer', alignItems: 'flex-start',
                }}
                onClick={() => navigate('/article')}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 4, flexShrink: 0,
                  background: article.gradientSolid,
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#000', lineHeight: 1.35, fontFamily: 'Inter, sans-serif', marginBottom: 2 }}>
                    {article.title.slice(0, 50)}{article.title.length > 50 ? '…' : ''}
                  </div>
                  <div style={{ fontSize: 12, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{article.readTime}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Footer links */}
          <div style={{ fontSize: 12, color: '#9b9b9b', fontFamily: 'Inter, sans-serif', lineHeight: 2 }}>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Help</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Status</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Writers</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Blog</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Careers</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Privacy</span>
            <span style={{ marginRight: 12, cursor: 'pointer' }}>Terms</span>
            <div style={{ marginTop: 4 }}>Prose © 2025</div>
          </div>
        </div>
      </div>
    </div>
  )
}