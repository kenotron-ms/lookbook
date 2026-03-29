import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Shield } from 'lucide-react'
import { products } from '../data/products.js'

const initialCartItems = [
  { ...products[0], qty: 1 },
  { ...products[1], qty: 2 },
  { ...products[4], qty: 1 },
]

export default function Cart() {
  const [items, setItems] = useState(initialCartItems)

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty } : item))
  }

  const removeItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = subtotal > 35 ? 0 : 5.99
  const tax = subtotal * 0.0875
  const total = subtotal + shipping + tax

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 16px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 400, color: '#0f1111', marginBottom: '24px' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '20px', alignItems: 'start' }}>

        {/* Cart items */}
        <div style={{ background: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#565959' }}>
              <p style={{ fontSize: '18px', marginBottom: '12px' }}>Your cart is empty</p>
              <Link to="/">
                <button style={{ background: '#ff9900', border: 'none', borderRadius: '4px', padding: '10px 24px', fontWeight: 600, cursor: 'pointer' }}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div style={{ borderBottom: '1px solid #e7e7e7', marginBottom: '16px', paddingBottom: '12px', textAlign: 'right', fontSize: '14px', color: '#565959' }}>
                Price
              </div>

              {items.map((item, idx) => (
                <div key={item.id}>
                  <div style={{ display: 'flex', gap: '20px', padding: '16px 0' }}>
                    {/* Product image */}
                    <Link to="/product">
                      <div style={{
                        width: '120px',
                        height: '120px',
                        background: item.gradient,
                        borderRadius: '4px',
                        flexShrink: 0,
                        border: '1px solid #ddd',
                      }} />
                    </Link>

                    {/* Item info */}
                    <div style={{ flex: 1 }}>
                      <Link to="/product" style={{ fontSize: '16px', color: '#007185', fontWeight: 500, lineHeight: 1.4, display: 'block', marginBottom: '6px' }}>
                        {item.title}
                      </Link>
                      <div style={{ color: '#007600', fontSize: '13px', marginBottom: '6px' }}>In Stock</div>
                      {item.prime && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                          <span style={{ background: '#002c73', color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 5px', borderRadius: '3px', fontStyle: 'italic' }}>prime</span>
                          <span style={{ fontSize: '12px', color: '#007600' }}>FREE Delivery</span>
                        </div>
                      )}

                      {/* Quantity controls */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #888', borderRadius: '4px', overflow: 'hidden' }}>
                          <button
                            onClick={() => item.qty === 1 ? removeItem(item.id) : updateQty(item.id, item.qty - 1)}
                            style={{ width: '32px', height: '32px', border: 'none', background: '#f0f2f2', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f1111' }}>
                            {item.qty === 1 ? '🗑' : '−'}
                          </button>
                          <span style={{ width: '36px', textAlign: 'center', fontWeight: 600, fontSize: '14px' }}>{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, item.qty + 1)}
                            style={{ width: '32px', height: '32px', border: 'none', background: '#f0f2f2', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f1111' }}>
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          style={{ background: 'none', border: 'none', color: '#007185', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Trash2 size={13} /> Remove
                        </button>

                        <button style={{ background: 'none', border: 'none', color: '#007185', fontSize: '13px', cursor: 'pointer' }}>
                          Save for later
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '18px', color: '#0f1111', flexShrink: 0 }}>
                      ${(item.price * item.qty).toFixed(2)}
                      {item.qty > 1 && (
                        <div style={{ fontSize: '12px', color: '#565959', fontWeight: 400 }}>
                          (${item.price.toFixed(2)} each)
                        </div>
                      )}
                    </div>
                  </div>

                  {idx < items.length - 1 && (
                    <hr style={{ border: 'none', borderTop: '1px solid #e7e7e7' }} />
                  )}
                </div>
              ))}

              <div style={{ borderTop: '1px solid #e7e7e7', paddingTop: '16px', textAlign: 'right', fontSize: '16px' }}>
                Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items):
                {' '}
                <strong>${subtotal.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>

        {/* Order summary sidebar */}
        <div style={{ background: 'white', borderRadius: '4px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '16px' }}>Order Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#565959' }}>
                Items ({items.reduce((s, i) => s + i.qty, 0)})
              </span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#565959' }}>Shipping & handling</span>
              <span>{shipping === 0 ? <span style={{ color: '#007600' }}>FREE</span> : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#565959' }}>Estimated tax (8.75%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #e7e7e7', marginBottom: '16px' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '18px', fontWeight: 700, color: '#B12704' }}>
            <span>Order total:</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            background: '#ffd814',
            border: 'none',
            borderRadius: '20px',
            fontSize: '15px',
            fontWeight: 600,
            color: '#0f1111',
            cursor: 'pointer',
            marginBottom: '12px',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#f7ca00'}
            onMouseLeave={e => e.currentTarget.style.background = '#ffd814'}>
            Proceed to checkout ({items.reduce((s, i) => s + i.qty, 0)} items)
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center', fontSize: '12px', color: '#565959' }}>
            <Shield size={12} />
            Secure checkout
          </div>

          {/* Promo code */}
          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e7e7e7' }}>
            <p style={{ fontSize: '13px', color: '#565959', marginBottom: '8px' }}>Have a promo code?</p>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                placeholder="Enter code"
                style={{ flex: 1, border: '1px solid #888', borderRadius: '4px', padding: '6px 10px', fontSize: '13px', outline: 'none' }}
              />
              <button style={{ background: '#ff9900', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
