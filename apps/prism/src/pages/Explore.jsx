import { useState } from 'react'
import { Search, Heart, MessageCircle, X } from 'lucide-react'
import { EXPLORE_CARDS } from '../data/posts'

const SECONDARY = '#8e8e8e'
const BORDER = '#262626'

export default function Explore() {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ padding: '16px 24px' }}>
      {/* Search bar */}
      <div
        style={{
          position: 'relative',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#1a1a1a',
            border: `1px solid ${focused ? '#555' : BORDER}`,
            borderRadius: '10px',
            padding: '10px 16px',
            transition: 'border-color 0.2s',
          }}
        >
          <Search size={18} color={focused ? '#e7e9ea' : SECONDARY} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search"
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#e7e9ea',
              fontSize: '16px',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: SECONDARY,
                border: 'none',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <X size={12} color="#000" strokeWidth={2.5} />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <ExploreGrid />
    </div>
  )
}

function ExploreGrid() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridAutoRows: '220px',
        gap: '3px',
      }}
    >
      {EXPLORE_CARDS.map((card) => (
        <ExploreCard key={card.id} card={card} />
      ))}
    </div>
  )
}

function ExploreCard({ card }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{
        gridRow: card.span ? `span ${card.span}` : 'span 1',
        background: card.gradient,
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover overlay */}
      {hovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', fontWeight: '600', fontSize: '16px' }}>
            <Heart size={20} fill="white" strokeWidth={0} />
            {card.likes.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'white', fontWeight: '600', fontSize: '16px' }}>
            <MessageCircle size={20} fill="white" strokeWidth={0} />
            {card.comments.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  )
}
