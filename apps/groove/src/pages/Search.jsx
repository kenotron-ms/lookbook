import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { SEARCH_CATEGORIES } from '../data/music'

export default function Search() {
  const [query, setQuery] = useState('')

  return (
    <div style={{ padding: '24px 32px', minHeight: '100%' }}>
      <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', marginBottom: '20px' }}>
        Search
      </h1>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '36px', maxWidth: '360px' }}>
        <SearchIcon
          size={18}
          color='#121212'
          style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="What do you want to play?"
          style={{
            width: '100%',
            padding: '12px 16px 12px 44px',
            background: '#ffffff',
            border: 'none',
            borderRadius: '500px',
            fontSize: '14px',
            color: '#121212',
            outline: 'none',
            fontFamily: 'inherit',
            fontWeight: '500',
          }}
        />
      </div>

      {/* Browse All */}
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', marginBottom: '20px' }}>
        Browse all
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '16px',
      }}>
        {SEARCH_CATEGORIES.map(cat => (
          <CategoryCard key={cat.name} category={cat} />
        ))}
      </div>
    </div>
  )
}

function CategoryCard({ category }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: category.color,
        borderRadius: '8px',
        padding: '20px 16px 16px',
        height: '120px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.15s',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <span style={{
        fontSize: '16px',
        fontWeight: '800',
        color: '#ffffff',
        textShadow: '0 1px 4px rgba(0,0,0,0.3)',
        display: 'block',
        lineHeight: 1.2,
      }}>
        {category.name}
      </span>
      {/* Decorative circle */}
      <div style={{
        position: 'absolute',
        bottom: '-12px',
        right: '-12px',
        width: '72px',
        height: '72px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '8px',
        right: '8px',
        width: '52px',
        height: '52px',
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.2)',
        transform: 'rotate(20deg)',
      }} />
    </div>
  )
}
