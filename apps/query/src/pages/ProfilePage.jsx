import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Globe, Calendar, Edit2 } from 'lucide-react'
import { profileData } from '../data/questions'

const TABS = ['Summary', 'Answers', 'Questions', 'Tags', 'Badges', 'Bounties', 'Following']

function BadgeDot({ color, count, label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ width: 14, height: 14, borderRadius: '50%', background: color, flexShrink: 0 }} />
      <span style={{ fontSize: 16, fontWeight: 600, color: '#232629' }}>{count}</span>
      <span style={{ fontSize: 12, color: '#6a737c' }}>{label}</span>
    </div>
  )
}

function StatCard({ label, value }) {
  return (
    <div style={{ textAlign: 'center', padding: '16px 24px', border: '1px solid #e3e6e8', borderRadius: 3, background: '#fff', minWidth: 120 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: '#232629' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#6a737c', marginTop: 2 }}>{label}</div>
    </div>
  )
}

function AnswerCard({ answer }) {
  return (
    <div style={{ border: '1px solid #e3e6e8', borderRadius: 3, padding: 16, background: '#fff' }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        {/* Score box */}
        <div style={{
          minWidth: 48, padding: '8px',
          border: '1px solid #2e7d32', borderRadius: 3,
          textAlign: 'center', flexShrink: 0,
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#2e7d32' }}>{answer.score}</div>
          <div style={{ fontSize: 10, color: '#6a737c' }}>score</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link to="/question" style={{ fontSize: 14, color: '#0074cc', fontWeight: 500, display: 'block', marginBottom: 6, lineHeight: 1.4 }}>
            {answer.title}
          </Link>
          <p style={{ margin: '0 0 8px 0', fontSize: 12, color: '#6a737c', lineHeight: 1.5,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {answer.preview}
          </p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {answer.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function TopTagRow({ tag }) {
  const barWidth = Math.min(100, (tag.score / 10000) * 100)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 60px', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f1f2f3' }}>
      <span className="tag-pill" style={{ justifySelf: 'start' }}>{tag.name}</span>
      <div style={{ background: '#e3e6e8', borderRadius: 2, height: 8 }}>
        <div style={{ background: '#f48024', height: '100%', borderRadius: 2, width: barWidth + '%', transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 12, color: '#6a737c', textAlign: 'right' }}>{tag.posts} posts</span>
      <span style={{ fontSize: 12, color: '#6a737c', textAlign: 'right' }}>{tag.score.toLocaleString()}</span>
    </div>
  )
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Summary')
  const p = profileData

  return (
    <div style={{ padding: 24, maxWidth: 960 }}>
      {/* Profile header */}
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', marginBottom: 24, padding: 24, background: '#fff', border: '1px solid #d6d9dc', borderRadius: 3 }}>
        {/* Avatar */}
        <div style={{
          width: 96, height: 96, borderRadius: 3, background: '#f48024',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 32, fontWeight: 700, flexShrink: 0,
        }}>
          {p.avatar}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 400, color: '#232629' }}>{p.name}</h1>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', background: '#fff', border: '1px solid #bbc0c4', borderRadius: 3, fontSize: 12, color: '#6a737c', cursor: 'pointer' }}>
              <Edit2 size={11} /> Edit profile
            </button>
          </div>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', fontSize: 12, color: '#6a737c' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Calendar size={13} /> Member for {p.memberFor}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={13} /> {p.location}
            </span>
            <a href={p.website} style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#0074cc', textDecoration: 'none' }}>
              <Globe size={13} /> {p.website.replace('https://', '')}
            </a>
          </div>
        </div>

        {/* Reputation */}
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div style={{ fontSize: 32, fontWeight: 700, color: '#232629', lineHeight: 1 }}>
            {p.reputation.toLocaleString()}
          </div>
          <div style={{ fontSize: 12, color: '#6a737c', marginBottom: 8 }}>reputation</div>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <BadgeDot color="#f0c040" count={p.gold} label="gold" />
            <BadgeDot color="#b4b8bc" count={p.silver} label="silver" />
            <BadgeDot color="#c18b57" count={p.bronze} label="bronze" />
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        <StatCard label="questions asked" value={p.stats.questions} />
        <StatCard label="answers" value={p.stats.answers} />
        <StatCard label="people reached" value={p.stats.reached} />
        <div style={{ flex: 1 }} />
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #d6d9dc', marginBottom: 20, display: 'flex', gap: 0 }}>
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 16px', fontSize: 13, cursor: 'pointer',
              background: 'none', border: 'none',
              color: activeTab === tab ? '#232629' : '#6a737c',
              fontWeight: activeTab === tab ? 600 : 400,
              borderBottom: activeTab === tab ? '2px solid #f48024' : '2px solid transparent',
              marginBottom: -1,
              transition: 'color 0.1s',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Summary Tab Content */}
      {activeTab === 'Summary' && (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
          {/* Left column */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Top Answers */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#232629' }}>Top Answers</h2>
                <Link to="/" style={{ fontSize: 12, color: '#39739d' }}>View all answers</Link>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {p.topAnswers.map(a => <AnswerCard key={a.id} answer={a} />)}
              </div>
            </div>

            {/* Top Tags */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500, color: '#232629' }}>Top Tags</h2>
                <Link to="/tags" style={{ fontSize: 12, color: '#39739d' }}>Browse all tags</Link>
              </div>
              <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', padding: '8px 16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 80px 60px', gap: 12, padding: '4px 0 8px 0', borderBottom: '1px solid #e3e6e8' }}>
                  <span style={{ fontSize: 11, color: '#6a737c', fontWeight: 600 }}>Tag</span>
                  <span style={{ fontSize: 11, color: '#6a737c', fontWeight: 600 }}>Score bar</span>
                  <span style={{ fontSize: 11, color: '#6a737c', fontWeight: 600, textAlign: 'right' }}>Posts</span>
                  <span style={{ fontSize: 11, color: '#6a737c', fontWeight: 600, textAlign: 'right' }}>Score</span>
                </div>
                {p.topTags.map(tag => <TopTagRow key={tag.name} tag={tag} />)}
              </div>
            </div>
          </div>

          {/* Right column — badges */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ padding: '10px 15px', background: '#f8f9f9', borderBottom: '1px solid #e3e6e8' }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Badges</span>
              </div>
              <div style={{ padding: '12px 15px', display: 'flex', gap: 16, justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#f0c040', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{p.gold}</div>
                  <div style={{ fontSize: 11, color: '#6a737c' }}>gold</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#b4b8bc', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{p.silver}</div>
                  <div style={{ fontSize: 11, color: '#6a737c' }}>silver</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#c18b57', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: 18, fontWeight: 700 }}>{p.bronze}</div>
                  <div style={{ fontSize: 11, color: '#6a737c' }}>bronze</div>
                </div>
              </div>
            </div>

            {/* Communities */}
            <div style={{ border: '1px solid #d6d9dc', borderRadius: 3, background: '#fff', overflow: 'hidden' }}>
              <div style={{ padding: '10px 15px', background: '#f8f9f9', borderBottom: '1px solid #e3e6e8' }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: '#232629' }}>Communities</span>
              </div>
              <div style={{ padding: '8px 0' }}>
                {[
                  { name: 'Stack Overflow', rep: 48293 },
                  { name: 'Server Fault', rep: 1203 },
                  { name: 'Super User', rep: 892 },
                  { name: 'Code Review', rep: 234 },
                ].map((c, i) => (
                  <div key={i} style={{ padding: '6px 15px', display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <a href="#" style={{ color: '#0074cc', textDecoration: 'none' }}>{c.name}</a>
                    <span style={{ color: '#232629', fontWeight: 600 }}>{c.rep.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'Summary' && (
        <div style={{ padding: 48, textAlign: 'center', color: '#6a737c', background: '#fff', border: '1px solid #d6d9dc', borderRadius: 3, fontSize: 14 }}>
          {activeTab} tab content would appear here.
        </div>
      )}
    </div>
  )
}
