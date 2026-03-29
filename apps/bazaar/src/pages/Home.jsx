import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import ProductCard from '../components/ProductCard.jsx'
import { products } from '../data/products.js'

const heroBanners = [
  {
    gradient: 'linear-gradient(135deg, #1a237e 0%, #283593 40%, #1565c0 100%)',
    title: 'End of Season Sale',
    subtitle: 'Up to 50% off on Electronics',
    cta: 'Shop Now',
    accent: '#64b5f6',
  },
  {
    gradient: 'linear-gradient(135deg, #bf360c 0%, #e64a19 40%, #ff9900 100%)',
    title: 'Prime Deals — Today Only',
    subtitle: 'Exclusive offers for Prime members',
    cta: 'Discover Deals',
    accent: '#ffcc80',
  },
  {
    gradient: 'linear-gradient(135deg, #004d40 0%, #00695c 40%, #00897b 100%)',
    title: 'Fresh Arrivals',
    subtitle: 'New products added daily — free delivery',
    cta: 'Explore Fresh',
    accent: '#80cbc4',
  },
]

function HeroBanner() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setActive(i => (i + 1) % heroBanners.length), 4000)
    return () => clearInterval(t)
  }, [])

  const banner = heroBanners[active]

  return (
    <div style={{ position: 'relative', width: '100%', height: '340px', background: banner.gradient, transition: 'background 0.6s ease', overflow: 'hidden' }}>
      {/* Overlay gradient */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 60%, transparent 100%)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: '60px 80px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: banner.accent, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
          Limited Time Offer
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: 800, color: 'white', marginBottom: '12px', lineHeight: 1.15 }}>
          {banner.title}
        </h1>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '28px' }}>
          {banner.subtitle}
        </p>
        <Link to="/category">
          <button style={{
            background: '#ff9900',
            border: 'none',
            borderRadius: '4px',
            padding: '12px 28px',
            fontSize: '15px',
            fontWeight: 700,
            color: '#131921',
            cursor: 'pointer',
            width: 'fit-content',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#e88b00'}
            onMouseLeave={e => e.currentTarget.style.background = '#ff9900'}>
            {banner.cta} →
          </button>
        </Link>
      </div>

      {/* Arrows */}
      <button onClick={() => setActive(i => (i - 1 + heroBanners.length) % heroBanners.length)}
        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => setActive(i => (i + 1) % heroBanners.length)}
        style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', zIndex: 3, background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
        {heroBanners.map((_, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{ width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === active ? '#ff9900' : 'rgba(255,255,255,0.5)', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
        ))}
      </div>
    </div>
  )
}

function SectionTitle({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
      <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f1111' }}>{title}</h2>
      <Link to="/category" style={{ color: '#007185', fontSize: '13px', fontWeight: 500 }}>
        See all &rsaquo;
      </Link>
    </div>
  )
}

export default function Home() {
  const todaysDeals = products.slice(0, 4)
  const recentViews = products.slice(4, 9)
  const recommended = products.slice(8, 20)

  return (
    <main>
      <HeroBanner />

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '24px 16px' }}>

        {/* Today's Deals */}
        <section style={{ background: 'white', borderRadius: '4px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <SectionTitle title="⚡ Today's Deals" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {todaysDeals.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Based on recent views */}
        <section style={{ background: 'white', borderRadius: '4px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <SectionTitle title="Based on your recent views" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
            {recentViews.map(p => (
              <ProductCard key={p.id} product={p} size="small" />
            ))}
          </div>
        </section>

        {/* Recommended for you */}
        <section style={{ background: 'white', borderRadius: '4px', padding: '20px', marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <SectionTitle title="Recommended for you" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {recommended.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
