import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronUp, ChevronDown, Check, Share2, Edit3, Star, Flag, MessageSquare, Bookmark } from 'lucide-react'
import { fullQuestion } from '../data/questions'

function Tag({ name }) {
  return <span className="tag-pill">{name}</span>
}

function CodeBlock({ code }) {
  return <pre className="code-block">{code}</pre>
}

function BodyRenderer({ body }) {
  const lines = body.split('\n')
  const elements = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      // code block
      let code = ''
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        code += lines[i] + '\n'
        i++
      }
      elements.push(<CodeBlock key={key++} code={code.trimEnd()} />)
      i++ // skip closing ```
    } else if (line.trim() === '') {
      elements.push(<div key={key++} style={{ height: 8 }} />)
      i++
    } else {
      // parse inline markdown in line: **bold**, `code`
      const parsed = parseInline(line)
      elements.push(
        <p key={key++} style={{ margin: '0 0 8px 0', fontSize: 13, lineHeight: 1.6, color: '#232629' }}>
          {parsed}
        </p>
      )
      i++
    }
  }

  return <div>{elements}</div>
}

function parseInline(text) {
  const result = []
  const regex = /(\*\*(.+?)\*\*|`(.+?)`)/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index))
    }
    if (match[2]) {
      result.push(<strong key={match.index}>{match[2]}</strong>)
    } else if (match[3]) {
      result.push(<code key={match.index} className="inline-code">{match[3]}</code>)
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex))
  }

  return result.length > 0 ? result : text
}

function UserCard({ user, label }) {
  return (
    <div style={{
      background: '#d9eaf7',
      borderRadius: 3,
      padding: '8px 10px',
      minWidth: 180,
      maxWidth: 220,
    }}>
      <div style={{ fontSize: 11, color: '#6a737c', marginBottom: 4 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 3, background: '#f48024',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, fontWeight: 700, flexShrink: 0,
        }}>
          {user.avatar}
        </div>
        <div>
          <a href="#" style={{ fontSize: 12, color: '#0074cc', fontWeight: 500, display: 'block' }}>{user.name}</a>
          <div style={{ fontSize: 11, color: '#6a737c', display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
            <span style={{ color: '#232629', fontWeight: 600 }}>{user.reputation.toLocaleString()}</span>
            <BadgeDot color="#f0c040" count={user.gold} />
            <BadgeDot color="#b4b8bc" count={user.silver} />
            <BadgeDot color="#c18b57" count={user.bronze} />
          </div>
        </div>
      </div>
    </div>
  )
}

function BadgeDot({ color, count }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'inline-block' }} />
      <span style={{ fontSize: 11 }}>{count}</span>
    </span>
  )
}

function VoteColumn({ votes, accepted }) {
  const [score, setScore] = useState(votes)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, paddingTop: 4, width: 36, flexShrink: 0 }}>
      <button
        onClick={() => setScore(s => s + 1)}
        style={{ background: 'none', border: '2px solid #bbc0c4', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6a737c' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#f48024'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#bbc0c4'}
      >
        <ChevronUp size={18} />
      </button>
      <span style={{ fontSize: 20, fontWeight: 600, color: score > 0 ? '#2e7d32' : score < 0 ? '#c62828' : '#6a737c' }}>
        {score}
      </span>
      <button
        onClick={() => setScore(s => s - 1)}
        style={{ background: 'none', border: '2px solid #bbc0c4', borderRadius: '50%', width: 34, height: 34, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6a737c' }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#f48024'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#bbc0c4'}
      >
        <ChevronDown size={18} />
      </button>
      {accepted && (
        <div title="Accepted answer" style={{ marginTop: 4 }}>
          <Check size={24} color="#2e7d32" strokeWidth={2.5} />
        </div>
      )}
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', marginTop: 4, color: '#bbc0c4' }} title="Bookmark">
        <Bookmark size={18} />
      </button>
    </div>
  )
}

function CommentList({ comments }) {
  return (
    <div style={{ borderTop: '1px solid #e3e6e8', marginTop: 12, paddingTop: 8 }}>
      {comments.map(c => (
        <div key={c.id} style={{ padding: '5px 0', fontSize: 12, color: '#6a737c', borderBottom: '1px dotted #e3e6e8' }}>
          <span style={{ color: '#232629' }}>{c.text}</span>
          {' – '}
          <a href="#" style={{ color: '#0074cc', fontSize: 11 }}>{c.user}</a>
          <span style={{ marginLeft: 8, color: '#bbc0c4' }}>{c.votes} votes</span>
        </div>
      ))}
      <button style={{ marginTop: 6, fontSize: 12, color: '#6a737c', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        Add a comment
      </button>
    </div>
  )
}

function ActionBar() {
  return (
    <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
      {[
        { icon: Share2, label: 'Share' },
        { icon: Edit3, label: 'Edit' },
        { icon: Star, label: 'Follow' },
        { icon: Flag, label: 'Flag' },
      ].map(({ icon: Icon, label }) => (
        <button key={label} style={{
          display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none',
          color: '#6a737c', fontSize: 12, cursor: 'pointer', padding: '2px 0',
        }}
          onMouseEnter={e => e.currentTarget.style.color = '#0074cc'}
          onMouseLeave={e => e.currentTarget.style.color = '#6a737c'}
        >
          <Icon size={13} />
          {label}
        </button>
      ))}
    </div>
  )
}

export default function QuestionDetailPage() {
  const q = fullQuestion
  const [yourAnswer, setYourAnswer] = useState('')

  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {/* Main column */}
      <div style={{ flex: 1, minWidth: 0, padding: '24px 24px 24px 24px', maxWidth: 860 }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: '#6a737c', marginBottom: 12 }}>
          <Link to="/" style={{ color: '#0074cc' }}>Questions</Link>
          {' › '}
          <span style={{ color: '#232629' }}>Why does React render twice in development mode...</span>
        </div>

        {/* Question title */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 12 }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 500, color: '#232629', lineHeight: 1.35, flex: 1 }}>
            {q.title}
          </h1>
          <Link to="/question" style={{
            padding: '9px 14px', background: '#f48024', color: '#fff',
            borderRadius: 3, fontSize: 13, fontWeight: 500, textDecoration: 'none', flexShrink: 0,
          }}>Ask Question</Link>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e3e6e8', fontSize: 12, color: '#6a737c' }}>
          <span><strong style={{ color: '#232629' }}>Asked</strong> {q.asked}</span>
          <span><strong style={{ color: '#232629' }}>Modified</strong> {q.modified}</span>
          <span><strong style={{ color: '#232629' }}>Viewed</strong> {q.views.toLocaleString()} times</span>
        </div>

        {/* Question body */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
          <VoteColumn votes={q.votes} accepted={false} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <BodyRenderer body={q.body} />
            {/* Tags */}
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 16, marginBottom: 12 }}>
              {q.tags.map(t => <Tag key={t} name={t} />)}
            </div>
            <ActionBar />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
              <div />
              <UserCard user={{ name: 'devmaster99', avatar: 'DM', reputation: 3421, gold: 0, silver: 4, bronze: 12 }} label={`asked ${q.asked}`} />
            </div>
            <CommentList comments={q.comments} />
          </div>
        </div>

        {/* Answers heading */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #e3e6e8' }}>
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 500, color: '#232629' }}>
            {q.answers.length} Answers
          </h2>
          <div style={{ display: 'flex', gap: 4, border: '1px solid #bbc0c4', borderRadius: 3, overflow: 'hidden' }}>
            {['Highest score (default)', 'Trending', 'Oldest'].map((opt, i) => (
              <button key={opt} style={{
                padding: '5px 10px', fontSize: 11, cursor: 'pointer',
                background: i === 0 ? '#e1ecf4' : '#fff',
                color: i === 0 ? '#39739d' : '#6a737c',
                border: 'none',
                borderRight: i < 2 ? '1px solid #bbc0c4' : 'none',
              }}>{opt}</button>
            ))}
          </div>
        </div>

        {/* Answers */}
        {q.answers.map((answer, idx) => (
          <div
            key={answer.id}
            style={{
              display: 'flex',
              gap: 20,
              marginBottom: 24,
              padding: 16,
              borderRadius: 3,
              background: answer.accepted ? '#dcf0dc' : '#fff',
              border: answer.accepted ? '1px solid #82c891' : '1px solid #e3e6e8',
            }}
          >
            <VoteColumn votes={answer.votes} accepted={answer.accepted} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <BodyRenderer body={answer.body} />
              <ActionBar />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 16 }}>
                <div />
                <UserCard user={answer.user} label={`answered ${answer.answered}`} />
              </div>
              <CommentList comments={answer.comments} />
            </div>
          </div>
        ))}

        {/* Your Answer */}
        <div style={{ marginTop: 32 }}>
          <h2 style={{ margin: '0 0 12px 0', fontSize: 17, fontWeight: 500, color: '#232629' }}>Your Answer</h2>

          {/* Toolbar */}
          <div style={{ border: '1px solid #bbc0c4', borderBottom: 'none', borderRadius: '3px 3px 0 0', padding: '6px 8px', background: '#f8f9f9', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['B', 'I', 'Code', '{ }', '"', '—', '🔗', '🖼️', 'OL', 'UL', '⏎', '?'].map(btn => (
              <button key={btn} style={{
                padding: '3px 7px', fontSize: 12, background: '#fff', border: '1px solid #bbc0c4',
                borderRadius: 2, cursor: 'pointer', color: '#6a737c', fontFamily: btn === 'B' ? 'serif' : undefined,
                fontWeight: btn === 'B' ? 700 : undefined, fontStyle: btn === 'I' ? 'italic' : undefined,
              }}>{btn}</button>
            ))}
          </div>
          <textarea
            value={yourAnswer}
            onChange={e => setYourAnswer(e.target.value)}
            placeholder="Write your answer here. Include code examples, explanations, and references where helpful..."
            style={{
              width: '100%',
              minHeight: 220,
              padding: 12,
              border: '1px solid #bbc0c4',
              borderRadius: '0 0 3px 3px',
              fontSize: 13,
              fontFamily: 'Roboto Mono, Courier New, monospace',
              resize: 'vertical',
              outline: 'none',
              color: '#232629',
              background: '#fff',
              lineHeight: 1.6,
            }}
            onFocus={e => e.target.style.borderColor = '#f48024'}
            onBlur={e => e.target.style.borderColor = '#bbc0c4'}
          />

          {/* Tips */}
          <div style={{ margin: '12px 0', padding: 12, background: '#fdf7f0', border: '1px solid #f4c285', borderRadius: 3, fontSize: 12, color: '#6a737c' }}>
            <strong style={{ color: '#232629' }}>Thanks for contributing an answer!</strong> Please be sure to answer the question. Provide details and share your research. Avoid answering questions with another question.
          </div>

          <button style={{
            padding: '10px 16px', background: '#f48024', color: '#fff', border: 'none',
            borderRadius: 3, fontSize: 13, fontWeight: 500, cursor: 'pointer',
          }}>
            Post Your Answer
          </button>
        </div>
      </div>

      {/* Right sidebar */}
      <aside style={{ width: 300, flexShrink: 0, padding: '24px 24px 24px 0' }}>
        {/* Linked */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', marginBottom: 16 }}>
          <div style={{ padding: '10px 15px', background: '#f8f9f9', borderBottom: '1px solid #e3e6e8' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Linked</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {[
              { votes: 234, title: 'How to avoid useEffect running on every render?' },
              { votes: 189, title: 'useEffect runs twice — React 18 concurrent mode' },
              { votes: 67, title: 'Cleanup functions in React hooks explained' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '6px 15px', display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#6a737c', minWidth: 24, textAlign: 'right' }}>{item.votes}</span>
                <a href="#" style={{ fontSize: 12, color: '#0074cc', lineHeight: 1.4, textDecoration: 'none' }}>{item.title}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', marginBottom: 16 }}>
          <div style={{ padding: '10px 15px', background: '#f8f9f9', borderBottom: '1px solid #e3e6e8' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Related</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {[
              { votes: 892, title: 'React hook\'s useEffect fires twice when the component mounts' },
              { votes: 445, title: 'Understanding when React re-renders components' },
              { votes: 312, title: 'How to fix infinite loop in useEffect with axios' },
              { votes: 287, title: 'When to use useLayoutEffect instead of useEffect' },
              { votes: 198, title: 'React Query vs useEffect for data fetching' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '6px 15px', display: 'flex', gap: 8 }}>
                <span style={{ fontSize: 11, color: '#6a737c', minWidth: 24, textAlign: 'right' }}>{item.votes}</span>
                <a href="#" style={{ fontSize: 12, color: '#0074cc', lineHeight: 1.4, textDecoration: 'none' }}>{item.title}</a>
              </div>
            ))}
          </div>
        </div>

        {/* Hot Network Questions */}
        <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff' }}>
          <div style={{ padding: '10px 15px', background: '#f8f9f9', borderBottom: '1px solid #e3e6e8' }}>
            <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Hot Network Questions</span>
          </div>
          <div style={{ padding: '8px 0' }}>
            {[
              'Why does Python\'s sort not use a key function for comparison?',
              'Is it possible to have a function that returns itself?',
              'What is the difference between null and undefined in JavaScript?',
              'How do database transactions handle concurrent writes?',
            ].map((title, i) => (
              <div key={i} style={{ padding: '6px 15px', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#bbc0c4', marginTop: 6, flexShrink: 0 }} />
                <a href="#" style={{ fontSize: 12, color: '#0074cc', lineHeight: 1.4, textDecoration: 'none' }}>{title}</a>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
