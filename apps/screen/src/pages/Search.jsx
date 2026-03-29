import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Star, User, Film, Building, Tag } from 'lucide-react'
import { titles } from '../data/titles.js'

const TABS = ['All', 'Titles', 'People', 'Companies', 'Keywords']

const people = [
  { id: 'p1', name: 'Christopher Nolan', role: 'Director', known: 'Inception, The Dark Knight, Interstellar', initials: 'CN', avatar: 'linear-gradient(135deg, #0d1b2a 0%, #415a77 100%)' },
  { id: 'p2', name: 'Chris Evans', role: 'Actor', known: 'Captain America, Knives Out, The Gray Man', initials: 'CE', avatar: 'linear-gradient(135deg, #1b263b 0%, #778da9 100%)' },
  { id: 'p3', name: 'Christine Baranski', role: 'Actress', known: 'The Good Fight, Mamma Mia!, Cybill', initials: 'CB', avatar: 'linear-gradient(135deg, #2d0057 0%, #6b21a8 100%)' },
]

const mixedResults = [
  { type: 'person', data: people[0] },
  { type: 'title', data: titles[0] },
  { type: 'title', data: titles[4] },
  { type: 'person', data: people[1] },
  { type: 'title', data: titles[14] },
  { type: 'title', data: titles[7] },
  { type: 'person', data: people[2] },
  { type: 'title', data: titles[9] },
  { type: 'title', data: titles[19] },
  { type: 'title', data: titles[2] },
]

function PersonResult({ person, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px',
        background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8,
        cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
      onMouseLeave={e => e.currentTarget.style.background = '#252525'}
    >
      {/* Avatar */}
      <div style={{
        width: 64, height: 64, borderRadius: '50%', background: person.avatar,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.9)', flexShrink: 0,
      }}>
        {person.initials}
      </div>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, color: '#f5f5f5', fontSize: 16 }}>{person.name}</span>
          <span style={{ background: '#3a3a3a', color: '#9c9c9c', fontSize: 11, padding: '1px 6px', borderRadius: 3 }}>{person.role}</span>
        </div>
        <div style={{ fontSize: 13, color: '#9c9c9c' }}>
          <User size={11} style={{ display: 'inline', marginRight: 4 }} />
          Known for: <span style={{ color: '#d5d5d5' }}>{person.known}</span>
        </div>
      </div>
    </div>
  )
}

function TitleResult({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 20px',
        background: '#252525', border: '1px solid #3a3a3a', borderRadius: 8,
        cursor: 'pointer', transition: 'background 0.15s',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#2e2e2e'}
      onMouseLeave={e => e.currentTarget.style.background = '#252525'}
    >
      {/* Poster */}
      <div style={{ width: 50, height: 72, borderRadius: 4, background: title.gradient, flexShrink: 0 }} />

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontWeight: 700, color: '#f5f5f5', fontSize: 16 }}>{title.title}</span>
          <span style={{ color: '#9c9c9c', fontSize: 13 }}>({title.year})</span>
          <span className="tag" style={{ fontSize: 11 }}>{title.rating}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <Star size={13} color="#f5c518" fill="#f5c518" />
          <span style={{ fontWeight: 700, color: '#f5c518', fontSize: 13 }}>{title.score}</span>
          <span style={{ color: '#9c9c9c', fontSize: 12 }}>({title.votes} votes)</span>
          <span style={{ color: '#6a6a6a' }}>·</span>
          <span style={{ color: '#9c9c9c', fontSize: 12 }}>{title.duration}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {title.genre.map(g => <span className="genre-tag" key={g} style={{ fontSize: 11 }}>{g}</span>)}
        </div>
      </div>

      {/* Score badge */}
      <div style={{ textAlign: 'center', flexShrink: 0 }}>
        <div style={{ background: '#f5c518', color: '#000', fontWeight: 900, fontSize: 16, padding: '4px 10px', borderRadius: 4 }}>
          {title.score}
        </div>
        <div style={{ fontSize: 10, color: '#9c9c9c', marginTop: 3 }}>Screen</div>
      </div>
    </div>
  )
}

export default function SearchResults() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('All')

  const displayed = mixedResults.filter(r => {
    if (activeTab === 'All') return true
    if (activeTab === 'Titles') return r.type === 'title'
    if (activeTab === 'People') return r.type === 'person'
    return true
  })

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {/* Heading */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#f5f5f5', marginBottom: 4 }}>
            Showing results for{' '}
            <span style={{ color: '#f5c518' }}>"christopher nolan"</span>
          </h1>
          <p style={{ color: '#9c9c9c', fontSize: 14 }}>{displayed.length} results found</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {TABS.map(tab => (
            <button
              key={tab}
              className={`filter-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'Titles' && <Film size={13} style={{ display: 'inline', marginRight: 4 }} />}
              {tab === 'People' && <User size={13} style={{ display: 'inline', marginRight: 4 }} />}
              {tab === 'Companies' && <Building size={13} style={{ display: 'inline', marginRight: 4 }} />}
              {tab === 'Keywords' && <Tag size={13} style={{ display: 'inline', marginRight: 4 }} />}
              {tab}
            </button>
          ))}
        </div>

        {/* Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {displayed.map((result, i) => (
            result.type === 'person'
              ? <PersonResult key={i} person={result.data} onClick={() => navigate('/')} />
              : <TitleResult key={i} title={result.data} onClick={() => navigate('/title')} />
          ))}
        </div>

        {/* Pagination hint */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
          {[1,2,3,'...', 12].map((p, i) => (
            <button
              key={i}
              style={{
                width: 36, height: 36,
                background: p === 1 ? '#f5c518' : '#252525',
                color: p === 1 ? '#000' : '#9c9c9c',
                border: '1px solid #3a3a3a',
                borderRadius: 4,
                fontWeight: p === 1 ? 700 : 400,
                cursor: 'pointer',
                fontSize: 13,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
