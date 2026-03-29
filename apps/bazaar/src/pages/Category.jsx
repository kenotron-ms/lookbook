import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ChevronUp, Filter } from 'lucide-react'
import { StarRating } from '../components/ProductCard.jsx'
import { products, categories } from '../data/products.js'

const brands = ['Sony', 'Apple', 'Samsung', 'Anker', 'Nike', 'Instant Pot', 'Ninja', 'KitchenAid', 'Bowflex', 'Patagonia']
const priceRanges = ['Under $25', '$25 to $50', '$50 to $100', '$100 to $200', 'Over $200']
const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Avg. Customer Review', 'Newest Arrivals']

function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid #e7e7e7', paddingBottom: '16px', marginBottom: '16px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: open ? '12px' : 0 }}>
        <span style={{ fontWeight: 700, fontSize: '14px', color: '#0f1111' }}>{title}</span>
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {open && children}
    </div>
  )
}

function StarFilter({ stars, selected, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '6px' }}>
      <input type="checkbox" checked={selected} onChange={onChange} style={{ accentColor: '#ff9900' }} />
      <div style={{ display: 'flex', gap: '1px' }}>
        {Array(5).fill(0).map((_, i) => (
          <span key={i} style={{ color: i < stars ? '#ff9900' : '#ddd', fontSize: '14px' }}>★</span>
        ))}
      </div>
      <span style={{ fontSize: '13px', color: '#007185' }}>& Up</span>
    </label>
  )
}

function ResultCard({ product }) {
  const [added, setAdded] = useState(false)
  const savings = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div style={{
        background: 'white',
        borderRadius: '4px',
        padding: '16px',
        display: 'flex',
        gap: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        transition: 'box-shadow 0.2s',
        alignItems: 'flex-start',
      }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)'}>

        {/* Image */}
        <div style={{
          width: '160px',
          height: '160px',
          background: product.gradient,
          borderRadius: '4px',
          flexShrink: 0,
          position: 'relative',
        }}>
          {savings > 0 && (
            <div style={{ position: 'absolute', top: '6px', left: '6px', background: '#cc0c39', color: 'white', fontSize: '10px', fontWeight: 700, padding: '2px 5px', borderRadius: '3px' }}>
              -{savings}%
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{ fontSize: '16px', color: '#007185', fontWeight: 500, marginBottom: '6px', lineHeight: 1.4 }}>
            {product.title}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <StarRating rating={product.rating} count={product.reviews} size={14} />
          </div>
          <div style={{ fontSize: '12px', color: '#565959', marginBottom: '8px' }}>
            by <span style={{ color: '#007185' }}>{product.brand}</span>
            {' · '}
            <span style={{ color: '#007185' }}>{product.category}</span>
          </div>

          {/* Price row */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
            <span style={{ fontSize: '22px', fontWeight: 400 }}>
              <span style={{ fontSize: '13px', verticalAlign: 'super' }}>$</span>
              {product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '13px', color: '#565959', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {savings > 0 && (
              <span style={{ fontSize: '13px', color: '#cc0c39', fontWeight: 600 }}>({savings}% off)</span>
            )}
          </div>

          {product.prime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <span style={{ background: '#002c73', color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', fontStyle: 'italic' }}>prime</span>
              <span style={{ fontSize: '12px', color: '#007600' }}>FREE Delivery by Tomorrow</span>
            </div>
          )}

          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
            style={{
              background: '#ff9900',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              color: '#0f1111',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e88b00'}
            onMouseLeave={e => e.currentTarget.style.background = '#ff9900'}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default function Category() {
  const [sortBy, setSortBy] = useState('Featured')
  const [selectedCat, setSelectedCat] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedPrime, setSelectedPrime] = useState(false)
  const [selectedStars, setSelectedStars] = useState([])
  const [priceRange, setPriceRange] = useState('')

  const toggleArr = (arr, val) => arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]

  let filtered = [...products]
  if (selectedCat.length > 0) filtered = filtered.filter(p => selectedCat.includes(p.category))
  if (selectedBrands.length > 0) filtered = filtered.filter(p => selectedBrands.includes(p.brand))
  if (selectedPrime) filtered = filtered.filter(p => p.prime)
  if (selectedStars.length > 0) filtered = filtered.filter(p => Math.floor(p.rating) >= Math.min(...selectedStars))

  if (sortBy === 'Price: Low to High') filtered.sort((a, b) => a.price - b.price)
  else if (sortBy === 'Price: High to Low') filtered.sort((a, b) => b.price - a.price)
  else if (sortBy === 'Avg. Customer Review') filtered.sort((a, b) => b.rating - a.rating)

  return (
    <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 16px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

      {/* Left Filter Panel */}
      <div style={{ width: '230px', flexShrink: 0, background: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Filter size={16} />
          <span style={{ fontWeight: 700, fontSize: '16px' }}>Filters</span>
        </div>

        {/* Department */}
        <FilterSection title="Department">
          {categories.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={selectedCat.includes(cat)}
                onChange={() => setSelectedCat(prev => toggleArr(prev, cat))}
                style={{ accentColor: '#ff9900' }}
              />
              {cat}
              <span style={{ color: '#565959', fontSize: '11px' }}>
                ({products.filter(p => p.category === cat).length})
              </span>
            </label>
          ))}
        </FilterSection>

        {/* Customer Reviews */}
        <FilterSection title="Customer Reviews">
          {[4, 3, 2, 1].map(stars => (
            <StarFilter
              key={stars}
              stars={stars}
              selected={selectedStars.includes(stars)}
              onChange={() => setSelectedStars(prev => toggleArr(prev, stars))}
            />
          ))}
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price">
          {priceRanges.map(range => (
            <label key={range} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="radio"
                name="priceRange"
                checked={priceRange === range}
                onChange={() => setPriceRange(range)}
                style={{ accentColor: '#ff9900' }}
              />
              {range}
            </label>
          ))}
        </FilterSection>

        {/* Prime Eligibility */}
        <FilterSection title="Prime Eligibility">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px' }}>
            <input
              type="checkbox"
              checked={selectedPrime}
              onChange={() => setSelectedPrime(p => !p)}
              style={{ accentColor: '#ff9900' }}
            />
            <span style={{ background: '#002c73', color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', fontStyle: 'italic' }}>prime</span>
            Eligible
          </label>
        </FilterSection>

        {/* Brand */}
        <FilterSection title="Brand" defaultOpen={false}>
          {brands.map(brand => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => setSelectedBrands(prev => toggleArr(prev, brand))}
                style={{ accentColor: '#ff9900' }}
              />
              {brand}
            </label>
          ))}
        </FilterSection>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Sort bar */}
        <div style={{ background: '#f5f5f5', borderRadius: '4px', padding: '12px 16px', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #e7e7e7' }}>
          <div style={{ fontSize: '14px', color: '#565959' }}>
            <span style={{ color: '#0f1111', fontWeight: 600 }}>{filtered.length.toLocaleString()} results</span>
            {' '}for{' '}
            <span style={{ color: '#cc0c39', fontWeight: 600 }}>"electronics, home & more"</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <span style={{ color: '#565959' }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ border: '1px solid #888', borderRadius: '4px', padding: '4px 8px', fontSize: '14px', cursor: 'pointer', outline: 'none', background: 'white' }}>
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>

        {/* Results grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {filtered.map(product => (
            <ResultCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#565959', background: 'white', borderRadius: '4px' }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No results found</p>
            <p style={{ fontSize: '14px' }}>Try adjusting your filters</p>
          </div>
        )}
      </div>
    </main>
  )
}
