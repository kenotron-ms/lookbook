import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'

function StarRating({ rating, count, size = 14 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  const empty = 5 - full - (half ? 1 : 0)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', gap: '1px' }}>
        {Array(full).fill(0).map((_, i) => (
          <span key={i} style={{ color: '#ff9900', fontSize: size + 'px' }}>★</span>
        ))}
        {half && <span style={{ color: '#ff9900', fontSize: size + 'px' }}>☆</span>}
        {Array(empty).fill(0).map((_, i) => (
          <span key={i} style={{ color: '#ddd', fontSize: size + 'px' }}>★</span>
        ))}
      </div>
      {count !== undefined && (
        <span style={{ color: '#007185', fontSize: '12px' }}>
          {count.toLocaleString()}
        </span>
      )}
    </div>
  )
}

export default function ProductCard({ product, size = 'normal' }) {
  const [added, setAdded] = useState(false)
  const imageSize = size === 'small' ? 140 : 180

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const savings = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          background: 'white',
          borderRadius: '4px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          transition: 'box-shadow 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.18)'}
        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)'}>

        {/* Product image area */}
        <div style={{
          width: '100%',
          height: imageSize + 'px',
          background: product.gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {savings > 0 && (
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              background: '#cc0c39',
              color: 'white',
              fontSize: '11px',
              fontWeight: 700,
              padding: '2px 6px',
              borderRadius: '3px',
            }}>-{savings}%</div>
          )}
        </div>

        {/* Card content */}
        <div style={{ padding: '10px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {/* Title */}
          <p style={{
            fontSize: '13px',
            fontWeight: 500,
            color: '#0f1111',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {product.title}
          </p>

          {/* Rating */}
          <StarRating rating={product.rating} count={product.reviews} size={13} />

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '16px', fontWeight: 700, color: '#0f1111' }}>
              <span style={{ fontSize: '11px', verticalAlign: 'super' }}>$</span>
              {product.price.toFixed(2)}
            </span>
            {product.originalPrice > product.price && (
              <span style={{ fontSize: '11px', color: '#565959', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Prime badge */}
          {product.prime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{
                background: '#002c73',
                color: 'white',
                fontSize: '10px',
                fontWeight: 700,
                padding: '1px 5px',
                borderRadius: '3px',
                fontStyle: 'italic',
              }}>prime</span>
              <span style={{ fontSize: '11px', color: '#007600' }}>FREE Delivery</span>
            </div>
          )}

          {/* Add to Cart button */}
          <button
            onClick={handleAdd}
            style={{
              marginTop: 'auto',
              paddingTop: '6px',
              width: '100%',
              padding: '7px',
              background: added ? '#e88b00' : '#ff9900',
              border: 'none',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              color: '#0f1111',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
              transition: 'background 0.15s',
              cursor: 'pointer',
              marginTop: '8px',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e88b00'}
            onMouseLeave={e => e.currentTarget.style.background = added ? '#e88b00' : '#ff9900'}>
            <ShoppingCart size={12} />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}

export { StarRating }
