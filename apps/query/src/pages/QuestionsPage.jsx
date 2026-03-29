import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Filter, ChevronDown, TrendingUp, Flame, Clock, Eye } from 'lucide-react'
import { questions } from '../data/questions'

const filterTabs = ['Interesting', 'Bountied', 'Hot', 'Week', 'Month']
const sortOptions = ['Newest', 'Frequent', 'Score', 'Unanswered']

const blogPosts = [
  { title: 'How do large language models handle context windows?', tag: 'AI/ML' },
  { title: 'The hidden cost of technical debt in startup engineering', tag: 'Engineering' },
  { title: 'Why your API documentation is failing your users', tag: 'DevEx' },
]

const hotMeta = [
  { title: 'Should we allow links to AI-generated content in answers?', votes: 234 },
  { title: 'Revisiting our policy on duplicate questions', votes: 187 },
  { title: 'New tag proposal: server-actions for Next.js 14', votes: 89 },
]

function formatNumber(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'm'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return n.toString()
}

function VoteBox({ votes }) {
  const cls = votes > 0 ? 'vote-score-positive' : votes < 0 ? 'vote-score-negative' : 'vote-score-zero'
  return (
    <div style={{ textAlign: 'center', minWidth: 36 }}>
      <div className={cls} style={{ fontSize: 16 }}>{votes}</div>
      <div style={{ fontSize: 10, color: '#6a737c', marginTop: 1 }}>votes</div>
    </div>
  )
}

function AnswerBox({ count, hasAccepted }) {
  const cls = hasAccepted ? 'answer-count-accepted' : count > 0 ? 'answer-count-has' : 'answer-count-zero'
  return (
    <div className={cls} style={{ textAlign: 'center', minWidth: 36, padding: '2px 4px' }}>
      <div style={{ fontSize: 16, fontWeight: 600 }}>{count}</div>
      <div style={{ fontSize: 10, marginTop: 1 }}>{hasAccepted ? 'accepted' : 'answers'}</div>
    </div>
  )
}

function ViewBox({ views }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 36 }}>
      <div style={{ fontSize: 13, color: '#6a737c', fontWeight: 500 }}>{formatNumber(views)}</div>
      <div style={{ fontSize: 10, color: '#6a737c', marginTop: 1 }}>views</div>
    </div>
  )
}

export default function QuestionsPage() {
  const [activeFilter, setActiveFilter] = useState('Interesting')
  const [activeSort, setActiveSort] = useState('Newest')

  return (
    <div style={{ display: 'flex', gap: 24, padding: '24px 24px 24px 24px', maxWidth: 1264, alignItems: 'flex-start' }}>
      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 400, color: '#232629' }}>All Questions</h1>
          <Link to="/question" style={{
            padding: '9px 14px', background: '#f48024', color: '#fff',
            borderRadius: 3, fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>Ask Question</Link>
        </div>

        {/* Filter tabs + sort */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 13, color: '#6a737c' }}>
            {(1_847_392).toLocaleString()} questions
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {/* Filter tabs */}
            <div style={{ display: 'flex', border: '1px solid #bbc0c4', borderRadius: 3, overflow: 'hidden', marginRight: 8 }}>
              {filterTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                    background: activeFilter === tab ? '#f48024' : '#fff',
                    color: activeFilter === tab ? '#fff' : '#6a737c',
                    border: 'none',
                    borderRight: tab !== 'Month' ? '1px solid #bbc0c4' : 'none',
                    fontWeight: activeFilter === tab ? 600 : 400,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            {/* Sort */}
            <div style={{ display: 'flex', border: '1px solid #bbc0c4', borderRadius: 3, overflow: 'hidden' }}>
              {sortOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setActiveSort(opt)}
                  style={{
                    padding: '6px 10px', fontSize: 12, cursor: 'pointer',
                    background: activeSort === opt ? '#e1ecf4' : '#fff',
                    color: activeSort === opt ? '#39739d' : '#6a737c',
                    border: 'none',
                    borderRight: opt !== 'Unanswered' ? '1px solid #bbc0c4' : 'none',
                    fontWeight: activeSort === opt ? 600 : 400,
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question list */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', overflow: 'hidden' }}>
          {questions.map((q, i) => (
            <div
              key={q.id}
              style={{
                display: 'flex',
                gap: 16,
                padding: '16px',
                borderBottom: i < questions.length - 1 ? '1px solid #e3e6e8' : 'none',
                alignItems: 'flex-start',
              }}
            >
              {/* Stats column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center', flexShrink: 0, paddingTop: 2 }}>
                <VoteBox votes={q.votes} />
                <AnswerBox count={q.answers} hasAccepted={q.hasAccepted} />
                <ViewBox views={q.views} />
              </div>

              {/* Main content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <Link
                  to="/question"
                  style={{ fontSize: 15, color: '#0074cc', fontWeight: 500, display: 'block', marginBottom: 4, lineHeight: 1.4 }}
                >
                  {q.title}
                </Link>
                <p style={{ margin: '0 0 8px 0', fontSize: 12, color: '#6a737c', lineHeight: 1.5,
                  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {q.excerpt}
                </p>
                {/* Footer: tags + user info */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {q.tags.map(tag => (
                      <span key={tag} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: 11, color: '#6a737c', whiteSpace: 'nowrap' }}>
                    asked {q.askedAgo} by{' '}
                    <Link to="/profile" style={{ color: '#0074cc', textDecoration: 'none' }}>{q.user.name}</Link>
                    {' '}
                    <span style={{ color: '#6a737c' }}>{q.user.reputation.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', gap: 4, marginTop: 16, alignItems: 'center' }}>
          {[1,2,3,'…',48923].map((p, i) => (
            <button key={i} style={{
              padding: '5px 10px', fontSize: 13,
              background: p === 1 ? '#f48024' : '#fff',
              color: p === 1 ? '#fff' : '#6a737c',
              border: '1px solid #d6d9dc',
              borderRadius: 3, cursor: 'pointer',
            }}>{p}</button>
          ))}
          <span style={{ fontSize: 12, color: '#6a737c', marginLeft: 8 }}>15 per page</span>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Custom Filters */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, overflow: 'hidden', background: '#fff' }}>
          <div style={{ padding: '12px 15px', borderBottom: '1px solid #e3e6e8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Custom Filters</span>
            <button style={{ fontSize: 12, color: '#39739d', background: 'none', border: 'none', cursor: 'pointer' }}>
              + Create a filter
            </button>
          </div>
          <div style={{ padding: '12px 15px', fontSize: 12, color: '#6a737c' }}>
            No custom filters yet. Create one to save your favorite question combinations.
          </div>
        </div>

        {/* The Overflow Blog */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, overflow: 'hidden', background: '#fff' }}>
          <div style={{ padding: '12px 15px', borderBottom: '1px solid #e3e6e8', background: '#f8f9f9' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>The Overflow Blog</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {blogPosts.map((post, i) => (
              <div key={i} style={{ padding: '8px 15px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#f48024', marginTop: 6, flexShrink: 0 }} />
                <div>
                  <a href="#" style={{ fontSize: 12, color: '#0074cc', lineHeight: 1.4, display: 'block', textDecoration: 'none' }}>
                    {post.title}
                  </a>
                  <span style={{ fontSize: 11, color: '#6a737c' }}>{post.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Meta Posts */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, overflow: 'hidden', background: '#fff' }}>
          <div style={{ padding: '12px 15px', borderBottom: '1px solid #e3e6e8', background: '#f8f9f9' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Hot Meta Posts</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {hotMeta.map((post, i) => (
              <div key={i} style={{ padding: '8px 15px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{
                  fontSize: 12, fontWeight: 600, color: '#6a737c', minWidth: 28, textAlign: 'right', flexShrink: 0
                }}>{post.votes}</div>
                <a href="#" style={{ fontSize: 12, color: '#0074cc', lineHeight: 1.4, textDecoration: 'none' }}>
                  {post.title}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Linked */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, overflow: 'hidden', background: '#fff' }}>
          <div style={{ padding: '10px 15px', borderBottom: '1px solid #e3e6e8', background: '#f8f9f9' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Watched Tags</span>
          </div>
          <div style={{ padding: '12px 15px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {['react', 'typescript', 'next.js', 'javascript'].map(t => (
                <span key={t} className="tag-pill">{t}</span>
              ))}
            </div>
            <a href="#" style={{ fontSize: 12, color: '#39739d' }}>Edit watched tags</a>
          </div>
        </div>
      </aside>
    </div>
  )
}
