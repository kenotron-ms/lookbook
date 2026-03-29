import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Hand, MessageCircle, Bookmark, Share2, MoreHorizontal, Twitter, Linkedin, Link } from 'lucide-react'
import { featuredArticle, articles, suggestedAuthors } from '../data/articles.js'

function ClapButton({ count }) {
  const [claps, setClaps] = useState(count)
  const [active, setActive] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleClap = () => {
    setActive(true)
    setClaps(c => c + 1)
    setAnimating(true)
    setTimeout(() => setAnimating(false), 300)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button
        onClick={handleClap}
        style={{
          width: 40, height: 40, borderRadius: '50%',
          border: `1px solid ${active ? '#1a8917' : '#e0e0e0'}`,
          background: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: active ? '#1a8917' : '#6b6b6b',
          transform: animating ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.2s',
        }}>
        <Hand size={18} fill={active ? '#1a8917' : 'none'} />
      </button>
      <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{claps.toLocaleString()}</span>
    </div>
  )
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.text}</p>
    case 'h2':
      return <h2>{block.text}</h2>
    case 'blockquote':
      return <blockquote>{block.text}</blockquote>
    case 'code':
      return <pre><code>{block.text}</code></pre>
    default:
      return null
  }
}

export default function Article() {
  const navigate = useNavigate()
  const [bookmarked, setBookmarked] = useState(false)
  const [following, setFollowing] = useState(false)
  const article = featuredArticle
  const relatedArticles = articles.slice(1, 4)

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* Article top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#ffffff', borderBottom: '1px solid #e8e8e8',
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => navigate('/')}
            style={{ background: 'none', border: 'none', color: '#242424', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 6 }}>
            <ArrowLeft size={20} />
          </button>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#242424', fontFamily: 'Inter, sans-serif' }}>
            {article.publication}
          </span>
        </div>
        <button style={{
          background: '#1a8917', color: '#ffffff',
          border: 'none', borderRadius: 9999,
          fontSize: 14, fontWeight: 500,
          padding: '8px 20px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>
          Subscribe
        </button>
      </div>

      {/* Main content area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 260px',
        maxWidth: 1100,
        margin: '0 auto',
        paddingTop: 64,
      }}>
        {/* Article column */}
        <div style={{ padding: '60px 64px 80px 40px', maxWidth: 740 }}>
          {/* Title */}
          <h1 style={{
            fontSize: 40, fontWeight: 800, color: '#000000',
            lineHeight: 1.2, marginBottom: 20,
            fontFamily: 'Inter, sans-serif', letterSpacing: '-1px',
          }}>
            {article.title}
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 22, color: '#6b6b6b', lineHeight: 1.6,
            marginBottom: 32, fontFamily: 'Georgia, Times New Roman, serif',
            fontStyle: 'normal',
          }}>
            {article.subtitle}
          </p>

          {/* Author card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            paddingBottom: 24, borderBottom: '1px solid #f2f2f2',
            marginBottom: 0,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: '50%',
              background: '#1a8917', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, fontWeight: 600, flexShrink: 0,
              fontFamily: 'Inter, sans-serif',
            }}>SC</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#000', fontFamily: 'Inter, sans-serif' }}>
                  {article.author}
                </span>
                <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>·</span>
                <button
                  onClick={() => setFollowing(v => !v)}
                  style={{
                    background: 'none', border: 'none',
                    color: following ? '#6b6b6b' : '#1a8917',
                    fontSize: 14, fontWeight: 500, cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif', padding: 0,
                  }}>
                  {following ? 'Following' : 'Follow'}
                </button>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>
                  {article.readTime}
                </span>
                <span style={{ color: '#6b6b6b' }}>·</span>
                <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>
                  {article.date}
                </span>
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 0',
            borderBottom: '1px solid #f2f2f2',
            marginBottom: 48,
          }}>
            <ClapButton count={article.claps} />

            <button style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'none', border: 'none', color: '#6b6b6b',
              cursor: 'pointer', padding: '4px 0',
            }}>
              <MessageCircle size={18} />
              <span style={{ fontSize: 13, fontFamily: 'Inter, sans-serif' }}>{article.comments}</span>
            </button>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: 12 }}>
              <button
                onClick={() => setBookmarked(v => !v)}
                style={{
                  background: 'none', border: 'none',
                  color: bookmarked ? '#242424' : '#6b6b6b', cursor: 'pointer', padding: 4,
                }}>
                <Bookmark size={18} fill={bookmarked ? '#242424' : 'none'} />
              </button>
              <button style={{ background: 'none', border: 'none', color: '#6b6b6b', cursor: 'pointer', padding: 4 }}>
                <Share2 size={18} />
              </button>
              <button style={{ background: 'none', border: 'none', color: '#6b6b6b', cursor: 'pointer', padding: 4 }}>
                <MoreHorizontal size={18} />
              </button>
            </div>
          </div>

          {/* Article body */}
          <div className="prose-body">
            {article.content.map((block, i) => (
              <ContentBlock key={i} block={block} />
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 48, paddingTop: 32, borderTop: '1px solid #f2f2f2' }}>
            {['Design', 'UX', 'Product Design', 'Software'].map(tag => (
              <span key={tag} style={{
                background: '#f2f2f2', color: '#242424',
                borderRadius: 9999, fontSize: 14, padding: '8px 16px',
                fontFamily: 'Inter, sans-serif', cursor: 'pointer',
              }}>{tag}</span>
            ))}
          </div>

          {/* Clap section */}
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 12, padding: '48px 0', borderBottom: '1px solid #f2f2f2',
          }}>
            <ClapButton count={article.claps} />
            <p style={{ fontSize: 14, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>
              {article.claps.toLocaleString()} claps · {article.comments} responses
            </p>
          </div>

          {/* Responses */}
          <div style={{ padding: '40px 0' }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#000', marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
              {article.comments} responses
            </h3>
            {/* Comment input */}
            <div style={{
              border: '1px solid #e0e0e0', borderRadius: 4, padding: 16, marginBottom: 32,
            }}>
              <textarea
                placeholder="What are your thoughts?"
                style={{
                  width: '100%', border: 'none', outline: 'none',
                  resize: 'none', fontFamily: 'Georgia, Times New Roman, serif',
                  fontSize: 16, color: '#242424', minHeight: 80, lineHeight: 1.6,
                }} />
            </div>

            {/* Sample comments */}
            {[
              { name: 'Jordan K.', avatar: 'JK', text: 'This perfectly articulates something I\'ve felt for years but couldn\'t express. The distinction between functional correctness and experiential quality is huge.', time: '2h ago' },
              { name: 'Yuki Tanaka', avatar: 'YT', text: 'The notification example really landed for me. We rebuilt ours last year and the "attention as resource" framing changed everything.', time: '5h ago' },
            ].map(comment => (
              <div key={comment.name} style={{ marginBottom: 28, paddingBottom: 28, borderBottom: '1px solid #f2f2f2' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: '#e0e0e0', color: '#6b6b6b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, fontFamily: 'Inter, sans-serif',
                  }}>{comment.avatar}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#000', fontFamily: 'Inter, sans-serif' }}>{comment.name}</div>
                    <div style={{ fontSize: 12, color: '#9b9b9b', fontFamily: 'Inter, sans-serif' }}>{comment.time}</div>
                  </div>
                </div>
                <p style={{
                  fontSize: 16, color: '#242424', lineHeight: 1.7,
                  fontFamily: 'Georgia, Times New Roman, serif',
                }}>{comment.text}</p>
              </div>
            ))}
          </div>

          {/* More from author */}
          <div style={{ paddingTop: 40, borderTop: '1px solid #e8e8e8' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#000', marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
              More from {article.author} in {article.publication}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {relatedArticles.slice(0, 2).map(a => (
                <div
                  key={a.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate('/article')}
                >
                  <div style={{
                    height: 120, borderRadius: 4, marginBottom: 12,
                    background: a.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 24, fontWeight: 800, color: '#fff', fontFamily: 'Inter, sans-serif', opacity: 0.8 }}>{a.authorAvatar}</span>
                  </div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#000', lineHeight: 1.4, fontFamily: 'Inter, sans-serif', marginBottom: 6 }}>
                    {a.title.slice(0, 60)}{a.title.length > 60 ? '…' : ''}
                  </h4>
                  <span style={{ fontSize: 13, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{a.readTime}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Author sidebar */}
        <div style={{
          paddingTop: 60, borderLeft: '1px solid #f2f2f2', paddingLeft: 40,
          position: 'sticky', top: 64, alignSelf: 'start', height: 'fit-content',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: 32 }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: '#1a8917', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 600, marginBottom: 12,
              fontFamily: 'Inter, sans-serif',
            }}>SC</div>
            <span style={{ fontSize: 16, fontWeight: 700, color: '#000', marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
              {article.author}
            </span>
            <span style={{ fontSize: 13, color: '#6b6b6b', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              12.4K followers
            </span>
            <p style={{ fontSize: 14, color: '#6b6b6b', lineHeight: 1.6, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
              Designer, writer, and product thinker. Writing about the intersection of craft and technology.
            </p>
            <button
              onClick={() => setFollowing(v => !v)}
              style={{
                background: following ? '#fff' : '#1a8917',
                color: following ? '#1a8917' : '#fff',
                border: `1px solid ${following ? '#1a8917' : 'transparent'}`,
                borderRadius: 9999, fontSize: 14, fontWeight: 500,
                padding: '8px 20px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}>
              {following ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* More from publication */}
          <div style={{ borderTop: '1px solid #f2f2f2', paddingTop: 24 }}>
            <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#000', marginBottom: 16, fontFamily: 'Inter, sans-serif' }}>
              More from {article.publication}
            </h4>
            {relatedArticles.map(a => (
              <div
                key={a.id}
                style={{ marginBottom: 20, cursor: 'pointer' }}
                onClick={() => navigate('/article')}
              >
                <div style={{ fontSize: 14, fontWeight: 600, color: '#000', lineHeight: 1.4, marginBottom: 4, fontFamily: 'Inter, sans-serif' }}>
                  {a.title.slice(0, 55)}{a.title.length > 55 ? '…' : ''}
                </div>
                <span style={{ fontSize: 12, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>{a.readTime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}