import { Star, Heart, Share2, ShoppingCart, Truck, RotateCcw, Shield, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, shopData } from '../data/products.js';

const product = products[0];
const relatedProducts = products.slice(4, 8);

const reviews = [
  { name: "Sarah M.", rating: 5, date: "Dec 12, 2024", text: "Absolutely love this mug. The weight feels perfect in hand and the glaze has such a beautiful depth. Shipped fast and packed so carefully. Will definitely order again.", photos: 2 },
  { name: "James T.", rating: 5, date: "Nov 28, 2024", text: "Gifted this to my sister and she was thrilled. It's even more beautiful in person — the speckled glaze is stunning. The seller included a sweet handwritten note too.", photos: 0 },
  { name: "Priya L.", rating: 4, date: "Nov 14, 2024", text: "Really lovely quality. One small air bubble in the clay but barely noticeable. The seller responded immediately when I messaged with a question.", photos: 1 },
  { name: "Marco F.", rating: 5, date: "Oct 31, 2024", text: "Third mug I've bought from this shop. Each one is slightly different which I love — proves it's truly handmade. My morning coffee tastes better from it.", photos: 0 },
  { name: "Anita K.", rating: 5, date: "Oct 19, 2024", text: "Perfect gift for my partner. Arrived in beautiful packaging and the mug is exactly as pictured. Highly recommend this seller.", photos: 3 },
];

function StarRow({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? '#f16521' : 'none'} color="#f16521" />
      ))}
    </div>
  );
}

export default function Product() {
  const thumbnails = [products[1], products[2], products[3]];

  return (
    <div style={{ backgroundColor: '#f4ede3', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

        {/* Breadcrumb */}
        <p style={{ fontSize: 13, color: '#878787', marginBottom: 24 }}>
          <Link to="/" style={{ color: '#595959' }}>Home Decor</Link>
          {' › '}
          <Link to="/" style={{ color: '#595959' }}>Mugs & Cups</Link>
          {' › '}
          <span style={{ color: '#222' }}>{product.title}</span>
        </p>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 440px', gap: 48, alignItems: 'start' }}>

          {/* Left: Image gallery */}
          <div>
            <div style={{ display: 'flex', gap: 12 }}>
              {/* Thumbnails */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{
                  width: 72, height: 72, borderRadius: 6, overflow: 'hidden',
                  border: '2px solid #f16521', cursor: 'pointer'
                }}>
                  <div style={{ width: '100%', height: '100%', background: product.gradient }} />
                </div>
                {thumbnails.map(t => (
                  <div key={t.id} style={{
                    width: 72, height: 72, borderRadius: 6, overflow: 'hidden',
                    border: '2px solid #e8e0d8', cursor: 'pointer'
                  }}>
                    <div style={{ width: '100%', height: '100%', background: t.gradient }} />
                  </div>
                ))}
              </div>

              {/* Main image */}
              <div style={{
                flex: 1, aspectRatio: '1', borderRadius: 10, overflow: 'hidden',
                background: product.gradient,
                minHeight: 480
              }} />
            </div>
          </div>

          {/* Right: Product info */}
          <div>
            {/* Title & rating */}
            <h1 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, color: '#222', lineHeight: 1.3 }}>
              {product.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <StarRow rating={product.rating} />
              <a href="#reviews" style={{ fontSize: 13, color: '#595959' }}>
                {product.reviews.toLocaleString()} reviews
              </a>
              <span style={{ color: '#d0c8c0' }}>|</span>
              <span style={{ fontSize: 13, color: '#595959' }}>5,234 sales</span>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: 28, fontWeight: 800, color: '#222' }}>
              ${product.price.toFixed(2)}
            </p>

            {/* Free shipping badge */}
            {product.freeShipping && (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 20,
                backgroundColor: '#e8f5e9', color: '#2e7d32',
                padding: '6px 14px', borderRadius: 999, fontSize: 13, fontWeight: 600
              }}>
                <Truck size={14} />
                Free shipping
              </div>
            )}

            {/* Quantity */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#222', marginBottom: 8 }}>
                Quantity
              </label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d0c8c0', borderRadius: 6, width: 'fit-content', overflow: 'hidden' }}>
                <button style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#595959' }}>−</button>
                <span style={{ padding: '8px 16px', borderLeft: '1px solid #e0d8d0', borderRight: '1px solid #e0d8d0', fontSize: 14, minWidth: 40, textAlign: 'center' }}>1</span>
                <button style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: '#595959' }}>+</button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              <button style={{
                width: '100%', padding: '14px', backgroundColor: '#f16521',
                border: 'none', borderRadius: 999, color: '#fff',
                fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Add to cart
              </button>
              <button style={{
                width: '100%', padding: '14px', backgroundColor: '#fffaf7',
                border: '2px solid #f16521', borderRadius: 999, color: '#f16521',
                fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Buy it now
              </button>
            </div>

            {/* Add to collection */}
            <button style={{
              display: 'flex', alignItems: 'center', gap: 8, background: 'none',
              border: 'none', cursor: 'pointer', color: '#595959', fontSize: 13, fontFamily: 'inherit',
              marginBottom: 24, padding: 0
            }}>
              <Heart size={16} /> Add to collection
            </button>

            <hr style={{ border: 'none', borderTop: '1px solid #e8e0d8', marginBottom: 20 }} />

            {/* About this listing */}
            <div style={{ marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700, color: '#222' }}>About this listing</h3>
              <p style={{ margin: 0, fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
                Each mug is individually wheel-thrown in our Portland studio, making every piece truly one of a kind.
                The speckled clay body is fired to cone 6, resulting in a durable, food-safe finish.
                Holds approximately 12 oz. Dishwasher safe, though hand-washing is recommended to preserve the glaze.
                Available in three colorways — shown here in our Harvest Tan glaze.
              </p>
            </div>

            {/* Shipping info */}
            <div style={{ backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <Truck size={16} color="#595959" style={{ flexShrink: 0, marginTop: 2 }} />
                <div>
                  <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: '#222' }}>Ships from Portland, OR</p>
                  <p style={{ margin: 0, fontSize: 13, color: '#595959' }}>Estimated delivery: Jan 8–14 · Ready to ship in 3–5 business days</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <RotateCcw size={16} color="#595959" style={{ flexShrink: 0, marginTop: 2 }} />
                <p style={{ margin: 0, fontSize: 13, color: '#595959' }}>
                  Returns & exchanges accepted within 30 days.{' '}
                  <a href="#" style={{ color: '#f16521' }}>See details</a>
                </p>
              </div>
            </div>

            {/* Purchase protection */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#595959' }}>
              <Shield size={14} color="#2e7d32" />
              <span>Protected by Craft's <a href="#" style={{ color: '#f16521' }}>Purchase Protection</a></span>
            </div>
          </div>
        </div>

        {/* Shop section */}
        <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: 24, marginTop: 48, display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <Link to="/shop">
            <div style={{
              width: 64, height: 64, borderRadius: 999, background: shopData.avatar,
              flexShrink: 0, cursor: 'pointer'
            }} />
          </Link>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <Link to="/shop" style={{ fontSize: 17, fontWeight: 700, color: '#222', textDecoration: 'none' }}>
                {shopData.name}
              </Link>
              <span style={{
                backgroundColor: '#fff8e1', color: '#b8860b',
                fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                display: 'inline-flex', alignItems: 'center', gap: 4
              }}>
                ⭐ Star Seller
              </span>
            </div>
            <p style={{ margin: '0 0 2px', fontSize: 13, color: '#595959' }}>{shopData.sales.toLocaleString()} sales · {shopData.location}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <StarRow rating={4.9} size={12} />
              <span style={{ fontSize: 12, color: '#595959' }}>Shop avg 4.9 · Member since {shopData.joinedYear}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button style={{
              padding: '9px 20px', backgroundColor: '#fff', border: '1px solid #d0c8c0',
              borderRadius: 999, cursor: 'pointer', color: '#222', fontSize: 13,
              display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit'
            }}>
              <MessageCircle size={14} /> Message seller
            </button>
            <Link to="/shop">
              <button style={{
                padding: '9px 20px', backgroundColor: '#f16521', border: 'none',
                borderRadius: 999, cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 600, fontFamily: 'inherit'
              }}>
                Visit shop
              </button>
            </Link>
          </div>
        </div>

        {/* You may also like */}
        <section style={{ marginTop: 56 }}>
          <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 700, color: '#222' }}>You may also like</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {relatedProducts.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                  <div style={{ padding: '10px 12px 14px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#222', lineHeight: 1.4 }}>{p.title}</p>
                    <p style={{ margin: '0 0 6px', fontSize: 12, color: '#878787' }}>{p.shop}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#222' }}>${p.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} fill="#f16521" color="#f16521" />
                      <span style={{ fontSize: 12, color: '#595959' }}>{p.rating} ({p.reviews.toLocaleString()})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" style={{ marginTop: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                <span style={{ fontSize: 56, fontWeight: 800, color: '#222' }}>{product.rating}</span>
                <div>
                  <StarRow rating={product.rating} size={20} />
                  <p style={{ margin: '4px 0 0', fontSize: 13, color: '#595959' }}>{product.reviews.toLocaleString()} reviews</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {reviews.map((r, i) => (
              <div key={i} style={{ backgroundColor: '#fff', borderRadius: 8, padding: 20, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 999,
                      background: `linear-gradient(135deg, ${['#f5e6d3','#e8f0e0','#f0e8f0','#d8e8f0','#fce8e8'][i]}, ${['#e8c9a0','#c4dbb8','#d8b8d8','#90b8d8','#f0a8a8'][i]})`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: '#5a3e2b'
                    }}>
                      {r.name[0]}
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: '#222' }}>{r.name}</p>
                      <StarRow rating={r.rating} size={12} />
                    </div>
                  </div>
                  <span style={{ fontSize: 12, color: '#878787' }}>{r.date}</span>
                </div>
                <p style={{ margin: '0 0 8px', fontSize: 14, color: '#595959', lineHeight: 1.6 }}>{r.text}</p>
                {r.photos > 0 && (
                  <p style={{ margin: 0, fontSize: 12, color: '#f16521' }}>📷 {r.photos} photo{r.photos > 1 ? 's' : ''} attached</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
