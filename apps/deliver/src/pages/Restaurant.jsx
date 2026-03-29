import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Search, Share2, Heart, Info, Users, Plus, ShoppingBag } from 'lucide-react'
import { menuRestaurant } from '../data/restaurants.js'

const ACCENT = '#eb1700'

function Stars({ rating }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i <= Math.round(rating) ? '#fbbf24' : '#e5e7eb'}>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </span>
  )
}

const INITIAL_CART = [
  { id: 5, name: 'Classic Smash Burger', price: 12.99, qty: 2 },
  { id: 10, name: 'Sweet Potato Fries', price: 4.99, qty: 1 },
]

export default function Restaurant() {
  const navigate = useNavigate()
  const r = menuRestaurant
  const [activeTab, setActiveTab] = useState('appetizers')
  const [cart, setCart] = useState(INITIAL_CART)
  const [saved, setSaved] = useState(false)

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = 0
  const taxes = subtotal * 0.08875
  const total = subtotal + deliveryFee + taxes

  function addToCart(item) {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id)
      if (existing) return prev.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }]
    })
  }

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>

      {/* Restaurant Banner */}
      <div style={{ position: 'relative', height: '200px', background: r.gradient }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.6) 100%)' }} />

        {/* Nav icons */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 2 }}>
          <button onClick={() => navigate('/')} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={18} color="#191919" />
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[Search, Share2].map((Icon, i) => (
              <button key={i} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={17} color="#191919" />
              </button>
            ))}
            <button onClick={() => setSaved(!saved)} style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={17} color={saved ? ACCENT : '#191919'} fill={saved ? ACCENT : 'none'} />
            </button>
          </div>
        </div>

        {/* Restaurant name in banner */}
        <div style={{ position: 'absolute', bottom: '20px', left: '24px', zIndex: 2 }}>
          <h1 style={{ color: '#fff', fontSize: '28px', fontWeight: 900, letterSpacing: '-0.5px', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
            {r.name}
          </h1>
        </div>
      </div>

      {/* Restaurant Info Bar */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #ebebeb', padding: '16px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '13px', color: '#767676', marginBottom: '4px' }}>{r.cuisine}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#767676' }}>
              <Stars rating={r.rating} />
              <span style={{ color: '#191919', fontWeight: 700 }}>{r.rating}</span>
              <span>({r.reviewCount.toLocaleString()} ratings)</span>
              <span style={{ color: '#ebebeb' }}>·</span>
              <span>⏱ {r.deliveryTime}</span>
              <span style={{ color: '#ebebeb' }}>·</span>
              <span style={{ color: '#16a34a', fontWeight: 600 }}>{r.deliveryFee}</span>
            </div>
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '24px', border: '1px solid #ebebeb', backgroundColor: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', color: '#191919' }}>
            <Users size={15} />
            Group Order
          </button>
          <button style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #ebebeb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Info size={16} color="#767676" />
          </button>
        </div>
      </div>

      {/* Sticky Category Tabs */}
      <div style={{ position: 'sticky', top: '64px', zIndex: 50, backgroundColor: '#fff', borderBottom: '1px solid #ebebeb' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '0', overflowX: 'auto' }}>
          {r.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              style={{
                padding: '14px 20px',
                border: 'none',
                borderBottom: activeTab === cat.id ? `3px solid ${ACCENT}` : '3px solid transparent',
                backgroundColor: 'transparent',
                color: activeTab === cat.id ? ACCENT : '#767676',
                fontWeight: activeTab === cat.id ? 700 : 500,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content: Menu + Cart */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px', display: 'flex', gap: '24px', alignItems: 'flex-start' }}>

        {/* Menu */}
        <div style={{ flex: 1 }}>
          {r.categories.map((cat) => (
            <div key={cat.id} id={cat.id} style={{ marginBottom: '36px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#191919', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #ebebeb' }}>
                {cat.label}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cat.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      backgroundColor: '#fff',
                      border: '1px solid #ebebeb',
                      borderRadius: '12px',
                      padding: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                    }}
                  >
                    {/* Item image */}
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '10px',
                        background: item.gradient,
                        flexShrink: 0,
                      }}
                    />

                    {/* Item info */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontWeight: 700, fontSize: '15px', color: '#191919' }}>{item.name}</span>
                        {item.badge === 'Popular' && (
                          <span style={{ backgroundColor: '#fff7ed', color: '#ea580c', fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', border: '1px solid #fed7aa' }}>
                            🔥 Popular
                          </span>
                        )}
                        {item.badge === 'Spicy' && (
                          <span style={{ backgroundColor: '#fff1f2', color: ACCENT, fontSize: '10px', fontWeight: 700, padding: '2px 7px', borderRadius: '20px', border: '1px solid #fecdd3' }}>
                            🌶 Spicy
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: '13px', color: '#767676', lineHeight: '1.5', marginBottom: '8px' }}>{item.description}</p>
                      <span style={{ fontSize: '15px', fontWeight: 700, color: '#191919' }}>${item.price.toFixed(2)}</span>
                    </div>

                    {/* Add button */}
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: ACCENT,
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.1s',
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <Plus size={18} color="#fff" strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div
          style={{
            width: '340px',
            flexShrink: 0,
            position: 'sticky',
            top: '132px',
            backgroundColor: '#fff',
            border: '1px solid #ebebeb',
            borderRadius: '14px',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '18px 20px', borderBottom: '1px solid #ebebeb', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} color={ACCENT} />
            <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#191919' }}>Your Order</h3>
            <span style={{ marginLeft: 'auto', backgroundColor: ACCENT, color: '#fff', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800 }}>
              {cart.reduce((s, i) => s + i.qty, 0)}
            </span>
          </div>

          {/* Cart items */}
          <div style={{ padding: '16px 20px' }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#767676', fontSize: '14px', padding: '20px 0' }}>Your cart is empty</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                {cart.map((item) => (
                  <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '24px', height: '24px', borderRadius: '6px', backgroundColor: '#f8f8f8', border: '1px solid #ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: ACCENT, flexShrink: 0 }}>
                      {item.qty}
                    </span>
                    <span style={{ flex: 1, fontSize: '14px', color: '#191919' }}>{item.name}</span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#191919' }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Totals */}
            <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                { label: 'Delivery fee', value: 'Free', green: true },
                { label: 'Estimated taxes', value: `$${taxes.toFixed(2)}` },
              ].map((row) => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#767676' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, color: row.green ? '#16a34a' : '#191919' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', fontWeight: 800, color: '#191919', paddingTop: '8px', borderTop: '1px solid #ebebeb', marginTop: '4px' }}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '14px',
                backgroundColor: ACCENT,
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c91400'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACCENT}
            >
              Go to Checkout · ${total.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
