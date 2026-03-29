import { Star, MapPin, Heart, MessageCircle, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, shopData } from '../data/products.js';

function StarRow({ rating, size = 12 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? '#f16521' : 'none'} color="#f16521" />
      ))}
    </div>
  );
}

export default function Shop() {
  const featuredItems = products.slice(0, 4);
  const allListings = products.slice(0, 12);

  return (
    <div style={{ backgroundColor: '#f4ede3', minHeight: '100vh' }}>

      {/* Shop header cover */}
      <div style={{ height: 240, background: shopData.cover, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.08)' }} />
      </div>

      {/* Shop identity bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e0d8', padding: '0 24px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Avatar (overlaps cover) */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, marginTop: -48 }}>
            <div style={{
              width: 96, height: 96, borderRadius: 999,
              background: shopData.avatar,
              border: '4px solid #fff',
              flexShrink: 0,
              boxShadow: '0 2px 12px rgba(0,0,0,0.15)'
            }} />

            <div style={{ paddingTop: 56, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#222' }}>{shopData.name}</h1>
                <span style={{
                  backgroundColor: '#fff8e1', color: '#b8860b',
                  fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                  display: 'inline-flex', alignItems: 'center', gap: 4
                }}>
                  ⭐ Star Seller
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 8, flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#595959' }}>
                  <MapPin size={13} /> {shopData.location}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#595959' }}>
                  <Package size={13} /> {shopData.sales.toLocaleString()} sales
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#595959' }}>
                  <Users size={13} /> 2,108 admirers
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StarRow rating={4.9} size={13} />
                  <span style={{ fontSize: 13, color: '#595959' }}>4.9 average</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: 10, paddingTop: 56, flexShrink: 0 }}>
              <button style={{
                padding: '9px 20px', backgroundColor: '#fff', border: '1px solid #d0c8c0',
                borderRadius: 999, cursor: 'pointer', color: '#222', fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit'
              }}>
                <Heart size={14} /> Follow
              </button>
              <button style={{
                padding: '9px 20px', backgroundColor: '#fff', border: '1px solid #d0c8c0',
                borderRadius: 999, cursor: 'pointer', color: '#222', fontSize: 13,
                display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit'
              }}>
                <MessageCircle size={14} /> Message
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Shop nav tabs */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e0d8', padding: '0 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex' }}>
          {['Items', 'About', 'Reviews', 'Policies'].map((tab, i) => (
            <button key={tab} style={{
              padding: '12px 20px', background: 'none', border: 'none',
              borderBottom: i === 0 ? '2px solid #f16521' : '2px solid transparent',
              color: i === 0 ? '#f16521' : '#595959', fontSize: 14, fontWeight: 500,
              cursor: 'pointer', fontFamily: 'inherit'
            }}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>

        {/* Featured items */}
        <section style={{ marginBottom: 52 }}>
          <h2 style={{ margin: '0 0 20px', fontSize: 20, fontWeight: 700, color: '#222' }}>Featured items</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {featuredItems.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                    <button style={{
                      position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none', borderRadius: 999, width: 32, height: 32,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer'
                    }}>
                      <Heart size={14} color="#595959" />
                    </button>
                  </div>
                  <div style={{ padding: '10px 12px 14px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#222', lineHeight: 1.4 }}>{p.title}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 12, color: '#878787' }}>{p.shop}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#222' }}>${p.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} fill="#f16521" color="#f16521" />
                      <span style={{ fontSize: 12, color: '#595959' }}>{p.rating} ({p.reviews.toLocaleString()})</span>
                    </div>
                    {p.freeShipping && (
                      <span style={{ display: 'inline-block', marginTop: 6, backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999 }}>
                        Free shipping
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* All listings */}
        <section style={{ marginBottom: 52 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#222' }}>
              All items <span style={{ fontWeight: 400, color: '#878787', fontSize: 16 }}>({allListings.length})</span>
            </h2>
            <div style={{ display: 'flex', gap: 10 }}>
              <select style={{
                padding: '8px 12px', border: '1px solid #d0c8c0', borderRadius: 6,
                backgroundColor: '#fff', fontSize: 13, color: '#222', cursor: 'pointer', fontFamily: 'inherit'
              }}>
                <option>Sort: Most recent</option>
                <option>Price: Low to high</option>
                <option>Price: High to low</option>
                <option>Top reviews</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {allListings.map(p => (
              <Link key={p.id} to="/product" style={{ textDecoration: 'none' }}>
                <div style={{ backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '100%', paddingBottom: '100%', background: p.gradient }} />
                    <button style={{
                      position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.9)',
                      border: 'none', borderRadius: 999, width: 32, height: 32,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                    }}>
                      <Heart size={14} color="#595959" />
                    </button>
                  </div>
                  <div style={{ padding: '10px 12px 14px' }}>
                    <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 500, color: '#222', lineHeight: 1.4 }}>{p.title}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#222' }}>${p.price.toFixed(2)}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Star size={11} fill="#f16521" color="#f16521" />
                      <span style={{ fontSize: 12, color: '#595959' }}>{p.rating}</span>
                    </div>
                    {p.freeShipping && (
                      <span style={{ display: 'inline-block', marginTop: 6, backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: 10, fontWeight: 600, padding: '2px 6px', borderRadius: 999 }}>
                        Free shipping
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* About section */}
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: 28 }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#222' }}>About {shopData.name}</h2>
              <p style={{ margin: '0 0 16px', fontSize: 14, color: '#595959', lineHeight: 1.8 }}>
                {shopData.story}
              </p>
              <div style={{ display: 'flex', gap: 16, paddingTop: 16, borderTop: '1px solid #f0e8e0' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#f16521' }}>{shopData.sales.toLocaleString()}</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#878787' }}>Sales</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#f16521' }}>4.9</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#878787' }}>Avg rating</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#f16521' }}>2019</p>
                  <p style={{ margin: 0, fontSize: 12, color: '#878787' }}>Member since</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: 28 }}>
              <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: '#222' }}>Shop policies</h2>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: '#595959', lineHeight: 1.7 }}>
                {shopData.policies}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'Returns & exchanges', detail: 'Accepted within 30 days' },
                  { label: 'Custom orders', detail: 'Message seller before buying' },
                  { label: 'Processing time', detail: '3–5 business days' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 10, borderBottom: '1px solid #f0e8e0', fontSize: 13 }}>
                    <span style={{ color: '#222', fontWeight: 500 }}>{item.label}</span>
                    <span style={{ color: '#595959' }}>{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
