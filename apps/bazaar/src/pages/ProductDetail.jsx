import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Zap, Shield, RotateCcw, ChevronDown } from 'lucide-react'
import { StarRating } from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

const product = products[0]

const reviews = [
  {
    name: 'Alex M.',
    avatar: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
    rating: 5,
    date: 'January 15, 2026',
    title: 'Absolutely love these headphones!',
    text: 'The noise cancellation is incredible. I use them daily for work calls and music. The battery life lasts me all day without needing a charge. Sound quality is top-notch — deep bass, clear highs. Worth every penny.',
    verified: true,
    helpful: 342,
  },
  {
    name: 'Jordan K.',
    avatar: 'linear-gradient(135deg, #00b894, #00cec9)',
    rating: 4,
    date: 'February 2, 2026',
    title: 'Great noise canceling, comfortable fit',
    text: 'Comfortable to wear for long periods. ANC is best-in-class. Slight battery drain when ANC is on high, but overall a phenomenal product. Would definitely recommend.',
    verified: true,
    helpful: 211,
  },
  {
    name: 'Riley T.',
    avatar: 'linear-gradient(135deg, #e17055, #fd79a8)',
    rating: 5,
    date: 'February 18, 2026',
    title: 'Best headphones I\'ve ever owned',
    text: 'Switched from Bose and I\'m not going back. The sound profile is much more neutral and accurate. The touch controls are intuitive once you get used to them. Highly recommended for audiophiles.',
    verified: true,
    helpful: 189,
  },
  {
    name: 'Sam L.',
    avatar: 'linear-gradient(135deg, #0984e3, #74b9ff)',
    rating: 3,
    date: 'March 1, 2026',
    title: 'Good but not perfect',
    text: 'Sound quality is great but the mic quality during calls could be better. In loud environments people sometimes have trouble hearing me. Still a solid buy for music listening.',
    verified: true,
    helpful: 87,
  },
  {
    name: 'Casey P.',
    avatar: 'linear-gradient(135deg, #f39c12, #f1c40f)',
    rating: 5,
    date: 'March 8, 2026',
    title: 'Perfect for WFH!',
    text: 'These have transformed my home office experience. The noise canceling blocks out everything — construction outside, household noise, everything. Paired with Bazaar fast shipping, couldn\'t be happier.',
    verified: false,
    helpful: 63,
  },
  {
    name: 'Morgan D.',
    avatar: 'linear-gradient(135deg, #27ae60, #2ecc71)',
    rating: 4,
    date: 'March 15, 2026',
    title: 'Premium feel, premium sound',
    text: 'Build quality feels very premium. Foldable design is great for travel. The case is nice too. Only minor gripe is no physical volume dial — you use touch gestures instead which takes getting used to.',
    verified: true,
    helpful: 45,
  },
]

const ratingBreakdown = [
  { stars: 5, pct: 64 },
  { stars: 4, pct: 20 },
  { stars: 3, pct: 8 },
  { stars: 2, pct: 4 },
  { stars: 1, pct: 4 },
]

export default function ProductDetail() {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [selectedImg, setSelectedImg] = useState(0)

  const savings = product.originalPrice - product.price
  const savingsPct = Math.round((savings / product.originalPrice) * 100)

  const thumbGradients = [
    product.gradient,
    'linear-gradient(135deg, #2c3e50 0%, #3498db 100%)',
    'linear-gradient(135deg, #dfe6e9 0%, #636e72 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
  ]

  return (
    <main style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 16px' }}>

      {/* Breadcrumb */}
      <nav style={{ marginBottom: '16px', fontSize: '12px', color: '#565959' }}>
        <Link to="/" style={{ color: '#007185' }}>Home</Link>
        {' › '}
        <Link to="/category" style={{ color: '#007185' }}>Electronics</Link>
        {' › '}
        <Link to="/category" style={{ color: '#007185' }}>Headphones</Link>
        {' › '}
        <span>{product.title.slice(0, 40)}...</span>
      </nav>

      {/* Main product section */}
      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr 280px', gap: '24px', marginBottom: '32px' }}>

        {/* Left: Image gallery */}
        <div>
          {/* Main image */}
          <div style={{
            background: thumbGradients[selectedImg],
            borderRadius: '4px',
            height: '340px',
            border: '1px solid #ddd',
            marginBottom: '12px',
          }} />
          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {thumbGradients.map((g, i) => (
              <button
                key={i}
                onClick={() => setSelectedImg(i)}
                style={{
                  width: '60px',
                  height: '60px',
                  background: g,
                  border: i === selectedImg ? '2px solid #ff9900' : '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Middle: Product info */}
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 500, color: '#0f1111', marginBottom: '8px', lineHeight: 1.3 }}>
            {product.title}
          </h1>

          <div style={{ marginBottom: '8px', fontSize: '13px' }}>
            <span style={{ color: '#565959' }}>Brand: </span>
            <Link to="/category" style={{ color: '#007185' }}>{product.brand}</Link>
            {' · '}
            <Link to="/category" style={{ color: '#007185' }}>Visit the Bazaar Store</Link>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <StarRating rating={product.rating} size={16} />
            <span style={{ color: '#565959', fontSize: '14px' }}>{product.rating} out of 5</span>
            <Link to="#reviews" style={{ color: '#007185', fontSize: '14px' }}>2,847 ratings</Link>
          </div>

          {/* 5K badge */}
          <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', padding: '6px 12px', display: 'inline-block', fontSize: '13px', color: '#856404', marginBottom: '16px', fontWeight: 600 }}>
            🔥 5K+ bought in past month
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e7e7e7', marginBottom: '16px' }} />

          {/* Price */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', color: '#565959' }}>Price: </span>
              <span style={{ fontSize: '28px', fontWeight: 400, color: '#0f1111' }}>
                <span style={{ fontSize: '16px', verticalAlign: 'super' }}>$</span>
                {product.price.toFixed(2)}
              </span>
            </div>
            <div style={{ fontSize: '13px', color: '#565959' }}>
              List Price: <span style={{ textDecoration: 'line-through' }}>${product.originalPrice.toFixed(2)}</span>
              {' '}
              <span style={{ background: '#cc0c39', color: 'white', fontSize: '11px', padding: '1px 6px', borderRadius: '3px', fontWeight: 700 }}>
                Save {savingsPct}% (${savings.toFixed(2)})
              </span>
            </div>
          </div>

          {/* Prime */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ background: '#002c73', color: 'white', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontStyle: 'italic' }}>prime</span>
            <span style={{ color: '#007600', fontSize: '14px', fontWeight: 500 }}>
              FREE delivery <strong>Tuesday, April 1</strong>
            </span>
          </div>

          {/* Feature bullets */}
          <hr style={{ border: 'none', borderTop: '1px solid #e7e7e7', marginBottom: '16px' }} />
          <div style={{ marginBottom: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '10px' }}>About this item</h3>
            <ul style={{ paddingLeft: '20px', fontSize: '14px', lineHeight: '1.8', color: '#0f1111' }}>
              <li>Industry-leading noise canceling with Dual Noise Sensor Technology</li>
              <li>Next-level music with Integrated Processor V1</li>
              <li>Up to 30-hour battery life with quick charging (3 min = 3 hours)</li>
              <li>Redesigned comfortable, lightweight body</li>
              <li>Touch Sensor controls to easily adjust music, volume, calls</li>
              <li>Premium 30 mm driver, newly developed for XM5</li>
            </ul>
          </div>
        </div>

        {/* Right: Buy box */}
        <div style={{ border: '1px solid #ddd', borderRadius: '4px', padding: '20px', background: 'white', height: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '24px', fontWeight: 400, marginBottom: '8px' }}>
            <span style={{ fontSize: '14px', verticalAlign: 'super' }}>$</span>
            {product.price.toFixed(2)}
          </div>

          <div style={{ color: '#007600', fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>In Stock</div>
          <div style={{ color: '#565959', fontSize: '13px', marginBottom: '16px' }}>
            Ships from and sold by <span style={{ color: '#007185' }}>Bazaar</span>
          </div>

          {/* Qty selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <label style={{ fontSize: '13px' }}>Qty:</label>
            <select
              value={qty}
              onChange={e => setQty(Number(e.target.value))}
              style={{ border: '1px solid #888', borderRadius: '4px', padding: '4px 8px', fontSize: '14px', cursor: 'pointer', outline: 'none' }}>
              {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => { setAdded(true); setTimeout(() => setAdded(false), 2000) }}
            style={{
              width: '100%',
              padding: '10px',
              background: added ? '#e88b00' : '#ff9900',
              border: 'none',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0f1111',
              cursor: 'pointer',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}>
            <ShoppingCart size={16} />
            {added ? 'Added to Cart!' : 'Add to Cart'}
          </button>

          {/* Buy Now */}
          <button style={{
            width: '100%',
            padding: '10px',
            background: '#ffd814',
            border: 'none',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#0f1111',
            cursor: 'pointer',
            marginBottom: '16px',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f7ca00'}
            onMouseLeave={e => e.currentTarget.style.background = '#ffd814'}>
            <Zap size={14} style={{ display: 'inline', marginRight: '6px' }} />
            Buy Now
          </button>

          <div style={{ fontSize: '12px', color: '#565959', lineHeight: 1.6 }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
              <Shield size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>Secure transaction</span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <RotateCcw size={14} style={{ flexShrink: 0, marginTop: '1px' }} />
              <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div id="reviews" style={{ background: 'white', borderRadius: '4px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '24px' }}>Customer reviews</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '40px', marginBottom: '32px' }}>
          {/* Overall rating */}
          <div>
            <div style={{ fontSize: '60px', fontWeight: 300, lineHeight: 1 }}>{product.rating}</div>
            <StarRating rating={product.rating} size={20} />
            <div style={{ color: '#565959', fontSize: '13px', marginTop: '4px' }}>out of 5</div>

            <div style={{ marginTop: '16px' }}>
              {ratingBreakdown.map(({ stars, pct }) => (
                <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <Link to="#reviews" style={{ color: '#007185', fontSize: '12px', whiteSpace: 'nowrap', width: '36px' }}>
                    {stars} star
                  </Link>
                  <div style={{ flex: 1, background: '#e7e7e7', borderRadius: '3px', height: '16px', overflow: 'hidden' }}>
                    <div style={{ width: pct + '%', background: '#ff9900', height: '100%', borderRadius: '3px' }} />
                  </div>
                  <span style={{ color: '#007185', fontSize: '12px', width: '30px' }}>{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ color: '#565959', fontSize: '14px', paddingTop: '8px' }}>
            <p>2,847 global ratings</p>
          </div>
        </div>

        {/* Individual reviews */}
        <div style={{ borderTop: '1px solid #e7e7e7', paddingTop: '24px' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ marginBottom: '28px', paddingBottom: '28px', borderBottom: i < reviews.length - 1 ? '1px solid #e7e7e7' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: r.avatar, flexShrink: 0 }} />
                <span style={{ fontWeight: 600, fontSize: '14px' }}>{r.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <StarRating rating={r.rating} size={14} />
                {r.verified && (
                  <span style={{ fontSize: '11px', color: '#c45500', fontWeight: 500 }}>✓ Verified Purchase</span>
                )}
              </div>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>{r.title}</div>
              <div style={{ color: '#565959', fontSize: '12px', marginBottom: '8px' }}>Reviewed on {r.date}</div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#0f1111' }}>{r.text}</p>
              <div style={{ marginTop: '10px', fontSize: '12px', color: '#565959' }}>
                {r.helpful} people found this helpful
                <button style={{ marginLeft: '12px', background: 'none', border: '1px solid #888', borderRadius: '3px', padding: '3px 10px', cursor: 'pointer', fontSize: '12px', color: '#0f1111' }}>Helpful</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
