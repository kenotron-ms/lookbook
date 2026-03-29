import { Heart, Star, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, categoryTiles } from '../data/products.js';

function StarRating({ rating, reviews }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12 }}>
      <Star size={12} fill="#f16521" color="#f16521" />
      <span style={{ color: '#f16521', fontWeight: 600 }}>{rating.toFixed(1)}</span>
      <span style={{ color: '#878787' }}>({reviews.toLocaleString()})</span>
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <Link to="/product" style={{ textDecoration: 'none' }}>
      <div style={{
        backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)', cursor: 'pointer',
        transition: 'box-shadow 0.15s',
      }}>
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100%', paddingBottom: '100%',
            background: product.gradient, position: 'relative'
          }} />
          <button style={{
            position: 'absolute', top: 8, right: 8,
            backgroundColor: 'rgba(255,255,255,0.9)', border: 'none',
            borderRadius: 999, width: 32, height: 32,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
          }}>
            <Heart size={15} color="#595959" />
          </button>
        </div>

        {/* Info */}
        <div style={{ padding: '10px 12px 12px' }}>
          <p style={{ margin: '0 0 2px', fontSize: 13, color: '#222', fontWeight: 500, lineHeight: 1.4,
            overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.title}
          </p>
          <p style={{ margin: '0 0 6px', fontSize: 12, color: '#878787' }}>{product.shop}</p>
          <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 700, color: '#222' }}>
            ${product.price.toFixed(2)}
          </p>
          <StarRating rating={product.rating} reviews={product.reviews} />
          {product.freeShipping && (
            <span style={{
              display: 'inline-block', marginTop: 6,
              backgroundColor: '#e8f5e9', color: '#2e7d32',
              fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999
            }}>
              Free shipping
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

function SectionHeader({ title, link }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: '#222' }}>{title}</h2>
      {link && (
        <a href="#" style={{
          display: 'flex', alignItems: 'center', gap: 4,
          color: '#f16521', fontSize: 14, fontWeight: 600, textDecoration: 'none'
        }}>
          See all <ChevronRight size={16} />
        </a>
      )}
    </div>
  );
}

export default function Home() {
  const editorsPicks = products.slice(0, 4);
  const homeDecorBestsellers = products.slice(4, 9);
  const giftCards = products.slice(9, 13);
  const recentlyViewed = products.slice(13, 18);

  return (
    <div style={{ backgroundColor: '#f4ede3', minHeight: '100vh' }}>

      {/* Hero banner */}
      <div style={{
        background: 'linear-gradient(135deg, #e8c4a0 0%, #f4ede3 45%, #d4905a 100%)',
        padding: '64px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 48 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600, color: '#f16521', textTransform: 'uppercase', letterSpacing: 1 }}>
              Over 100 million handmade items
            </p>
            <h1 style={{ margin: '0 0 16px', fontSize: 44, fontWeight: 800, color: '#2a1a0e', lineHeight: 1.15 }}>
              Discover handcrafted<br />goods, made with care
            </h1>
            <p style={{ margin: '0 0 28px', fontSize: 16, color: '#5a3e2b', lineHeight: 1.6 }}>
              Shop directly from independent makers, artisans, and vintage collectors — each piece tells a story.
            </p>
            <div style={{ display: 'flex', gap: 0, maxWidth: 460 }}>
              <input
                type="text"
                placeholder="What are you looking for?"
                style={{
                  flex: 1, padding: '13px 18px',
                  border: '2px solid #d4905a', borderRight: 'none',
                  borderRadius: '999px 0 0 999px',
                  fontSize: 14, outline: 'none',
                  backgroundColor: '#fffaf7', fontFamily: 'inherit', color: '#222'
                }}
              />
              <button style={{
                padding: '13px 24px',
                backgroundColor: '#f16521', border: '2px solid #f16521',
                borderRadius: '0 999px 999px 0',
                color: '#fff', fontWeight: 700, fontSize: 14,
                cursor: 'pointer', fontFamily: 'inherit'
              }}>
                Search
              </button>
            </div>
          </div>

          {/* Hero card stack */}
          <div style={{ display: 'flex', gap: 12, flexShrink: 0 }}>
            {products.slice(0, 3).map((p, i) => (
              <div key={p.id} style={{
                width: 140, borderRadius: 10, overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                transform: i === 1 ? 'translateY(-12px)' : 'none',
                backgroundColor: '#fff'
              }}>
                <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                <div style={{ padding: '8px 10px' }}>
                  <p style={{ margin: 0, fontSize: 11, color: '#595959', fontWeight: 600, lineHeight: 1.3 }}>
                    {p.title}
                  </p>
                  <p style={{ margin: '4px 0 0', fontSize: 13, fontWeight: 700, color: '#222' }}>
                    ${p.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>

        {/* Editor's Picks */}
        <section style={{ marginBottom: 56 }}>
          <SectionHeader title="Editor's Picks" link />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {editorsPicks.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>

        {/* Bestsellers in Home Decor — horizontal scroll */}
        <section style={{ marginBottom: 56 }}>
          <SectionHeader title="Our bestsellers in Home Decor" link />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {homeDecorBestsellers.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none', flexShrink: 0, width: 200 }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                  <div style={{ padding: '8px 12px 12px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 12, color: '#222', fontWeight: 500, lineHeight: 1.4 }}>
                      {p.title}
                    </p>
                    <p style={{ margin: '0 0 4px', fontSize: 11, color: '#878787' }}>{p.shop}</p>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#222' }}>${p.price.toFixed(2)}</p>
                    {p.freeShipping && (
                      <span style={{ display: 'inline-block', marginTop: 4, backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999 }}>
                        Free shipping
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Gifts for every occasion */}
        <section style={{ marginBottom: 56 }}>
          <SectionHeader title="Gifts for every occasion" link />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {giftCards.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none' }}>
                <div style={{
                  borderRadius: 10, overflow: 'hidden',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  backgroundColor: '#fff',
                }}>
                  <div style={{ width: '100%', paddingBottom: '75%', background: p.gradient, position: 'relative' }}>
                    <div style={{
                      position: 'absolute', bottom: 12, left: 12,
                      backgroundColor: 'rgba(255,255,255,0.9)',
                      borderRadius: 6, padding: '4px 10px',
                      fontSize: 12, fontWeight: 700, color: '#222'
                    }}>
                      {p.price < 30 ? 'Under $30' : p.price < 60 ? 'Under $60' : 'Splurge-worthy'}
                    </div>
                  </div>
                  <div style={{ padding: '10px 14px 14px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: '#222' }}>{p.title}</p>
                    <p style={{ margin: 0, fontSize: 13, color: '#595959' }}>${p.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Category tiles */}
        <section style={{ marginBottom: 56 }}>
          <SectionHeader title="Shop by category" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { label: 'Jewelry & Accessories', gradient: 'linear-gradient(135deg, #f5e0c8, #e8a878)', sub: '4.2M items' },
              { label: 'Home & Living', gradient: 'linear-gradient(135deg, #c8dcc4, #88b880)', sub: '8.1M items' },
              { label: 'Vintage Finds', gradient: 'linear-gradient(135deg, #f0d8c0, #c8905a)', sub: '2.3M items' },
              { label: 'Art & Collectibles', gradient: 'linear-gradient(135deg, #dcd0f0, #b090d8)', sub: '1.7M items' },
              { label: 'Clothing & Shoes', gradient: 'linear-gradient(135deg, #c8d8ec, #88acd4)', sub: '5.4M items' },
              { label: 'Gifts & Occasions', gradient: 'linear-gradient(135deg, #fce8e8, #e8a8a8)', sub: '3.9M items' },
            ].map(cat => (
              <Link key={cat.label} to="/" style={{ textDecoration: 'none' }}>
                <div style={{
                  background: cat.gradient, borderRadius: 10,
                  padding: '40px 28px',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  minHeight: 160, cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  transition: 'transform 0.15s',
                }}>
                  <h3 style={{ margin: '0 0 4px', fontSize: 18, fontWeight: 700, color: '#2a1a0e' }}>
                    {cat.label}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13, color: 'rgba(42,26,14,0.6)' }}>{cat.sub}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recently Viewed */}
        <section>
          <SectionHeader title="Recently viewed" />
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
            {recentlyViewed.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none', flexShrink: 0, width: 170 }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                  <div style={{ padding: '8px 10px 10px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 12, color: '#222', fontWeight: 500, lineHeight: 1.3 }}>{p.title}</p>
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: '#222' }}>${p.price.toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2a1a0e', color: '#c8b8a8', padding: '48px 24px 32px', marginTop: 32 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32 }}>
            <div style={{ width: 30, height: 30, backgroundColor: '#f16521', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontSize: 14 }}>✂</span>
            </div>
            <span style={{ color: '#f16521', fontSize: 20, fontWeight: 700 }}>Craft</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, opacity: 0.6 }}>
            Made with love, found with ease. © 2025 Craft Marketplace, ParaNet Universe.
          </p>
        </div>
      </footer>
    </div>
  );
}
