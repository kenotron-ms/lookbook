import { useState } from 'react'
import { Search, Plus, Heart, MapPin } from 'lucide-react'
import { LISTINGS } from '../data/posts.js'

const ACCENT = '#1877f2'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'vehicles', label: 'Vehicles' },
  { id: 'garden', label: 'Garden' },
  { id: 'electronics', label: 'Electronics' },
  { id: 'family', label: 'Family' },
  { id: 'clothing', label: 'Clothing' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'furniture', label: 'Furniture' },
]

function ListingCard({ listing }) {
  const [saved, setSaved] = useState(false)
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb',
      overflow: 'hidden', cursor: 'pointer',
    }}>
      <div style={{ position: 'relative' }}>
        <div style={{ width: '100%', aspectRatio: '1', background: listing.gradient }} />
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved) }}
          style={{
            position: 'absolute', top: 8, right: 8,
            width: 32, height: 32, borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <Heart size={16} fill={saved ? '#f02849' : 'none'} color={saved ? '#f02849' : '#65676b'} />
        </button>
      </div>
      <div style={{ padding: '8px 10px 12px' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: '#050505', marginBottom: 2 }}>{listing.price}</div>
        <div style={{ fontSize: 13, color: '#050505', marginBottom: 4, lineHeight: 1.3 }}>{listing.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#65676b', marginBottom: 4 }}>
          <MapPin size={11} />
          {listing.location}
        </div>
        {listing.mutualFriends > 0 && (
          <div style={{ fontSize: 11, color: '#65676b' }}>
            Liked by {listing.mutualFriends === 1 ? '1 mutual friend' : `${listing.mutualFriends} mutual friends`}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Marketplace() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  return (
    <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '0 8px', minHeight: 'calc(100vh - 56px)' }}>
      {/* Left sidebar */}
      <div style={{ width: 280, flexShrink: 0, backgroundColor: '#fff', borderRight: '1px solid #e4e6eb', padding: '16px 12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#050505' }}>Marketplace</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#f0f2f5', borderRadius: 999, padding: '8px 14px', marginBottom: 16 }}>
          <Search size={16} color="#65676b" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search Marketplace"
            style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#050505', flex: 1 }}
          />
        </div>
        <button style={{
          width: '100%', padding: '10px 0', backgroundColor: ACCENT,
          color: '#fff', border: 'none', borderRadius: 8,
          fontWeight: 700, fontSize: 15, cursor: 'pointer', marginBottom: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <Plus size={18} />
          Sell something
        </button>

        <div style={{ fontWeight: 700, fontSize: 14, color: '#65676b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Categories</div>
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '8px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              backgroundColor: activeCategory === cat.id ? '#e7f3ff' : 'transparent',
              color: activeCategory === cat.id ? ACCENT : '#050505',
              fontWeight: activeCategory === cat.id ? 700 : 500, fontSize: 14, textAlign: 'left',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#050505' }}>Today's picks</h3>
          <span style={{ fontSize: 13, color: '#65676b' }}>Sorted by: Relevance</span>
        </div>

        {/* Category filter chips */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              style={{
                padding: '6px 14px', borderRadius: 999,
                border: `1px solid ${activeCategory === cat.id ? ACCENT : '#e4e6eb'}`,
                backgroundColor: activeCategory === cat.id ? '#e7f3ff' : '#fff',
                color: activeCategory === cat.id ? ACCENT : '#050505',
                fontWeight: 600, fontSize: 13, cursor: 'pointer',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {LISTINGS.map(listing => <ListingCard key={listing.id} listing={listing} />)}
        </div>

        {/* Nearby section */}
        <div style={{ marginTop: 32 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#050505', marginBottom: 16 }}>More near you</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[...LISTINGS].reverse().map(listing => <ListingCard key={listing.id + 'r'} listing={listing} />)}
          </div>
        </div>
      </div>
    </div>
  )
}
