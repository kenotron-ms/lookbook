import { useState } from 'react'
import { Search } from 'lucide-react'
import { tags } from '../data/questions'

const sortOptions = ['Popular', 'Name', 'New', 'Synonyms']

function formatCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'm'
  if (n >= 1000) return (n / 1000).toFixed(0) + 'k'
  return n.toString()
}

export default function TagsPage() {
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Popular')

  const filtered = tags
    .filter(t => t.name.includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'Popular') return b.count - a.count
      if (sort === 'Name') return a.name.localeCompare(b.name)
      return 0
    })

  return (
    <div style={{ padding: 24, maxWidth: 960 }}>
      {/* Header */}
      <h1 style={{ margin: '0 0 8px 0', fontSize: 20, fontWeight: 400, color: '#232629' }}>Tags</h1>
      <p style={{ margin: '0 0 20px 0', fontSize: 13, color: '#6a737c', maxWidth: 640 }}>
        A tag is a keyword or label that categorizes your question with other, similar questions.
        Using the right tags makes it easier for others to find and answer your question.
      </p>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: '#bbc0c4' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Filter by tag name"
            style={{
              paddingLeft: 28, paddingRight: 12, height: 34, width: 220,
              border: '1px solid #bbc0c4', borderRadius: 3, fontSize: 13, outline: 'none',
              color: '#232629',
            }}
            onFocus={e => e.target.style.borderColor = '#f48024'}
            onBlur={e => e.target.style.borderColor = '#bbc0c4'}
          />
        </div>

        {/* Sort tabs */}
        <div style={{ display: 'flex', border: '1px solid #bbc0c4', borderRadius: 3, overflow: 'hidden' }}>
          {sortOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              style={{
                padding: '6px 12px', fontSize: 12, cursor: 'pointer',
                background: sort === opt ? '#f48024' : '#fff',
                color: sort === opt ? '#fff' : '#6a737c',
                border: 'none',
                borderRight: opt !== 'Synonyms' ? '1px solid #bbc0c4' : 'none',
                fontWeight: sort === opt ? 600 : 400,
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Tag grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 12,
      }}>
        {filtered.map(tag => (
          <div
            key={tag.name}
            style={{
              border: '1px solid #d6d9dc',
              borderRadius: 3,
              padding: 16,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            {/* Tag pill */}
            <div>
              <span className="tag-pill" style={{ fontSize: 12 }}>{tag.name}</span>
            </div>
            {/* Description */}
            <p style={{
              margin: 0,
              fontSize: 12,
              color: '#6a737c',
              lineHeight: 1.5,
              flex: 1,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}>
              {tag.description}
            </p>
            {/* Count */}
            <div style={{ fontSize: 11, color: '#6a737c', marginTop: 4 }}>
              <span style={{ fontWeight: 600, color: '#232629' }}>{formatCount(tag.count)}</span> questions
              <span style={{ marginLeft: 8, color: '#bbc0c4' }}>·</span>
              <span style={{ marginLeft: 8 }}>asked this week: {Math.floor(Math.random() * 500 + 10)}</span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 48, color: '#6a737c', fontSize: 14 }}>
          No tags found matching "{search}"
        </div>
      )}
    </div>
  )
}
