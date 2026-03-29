import { X, Minus, Plus, Shield, Tag, ChevronRight, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products.js';

const cartItems = [
  { ...products[0], qty: 1 },
  { ...products[6], qty: 2 },
];

export default function Cart() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = cartItems.some(i => i.freeShipping) ? 0 : 8.95;
  const estimatedTax = subtotal * 0.08;
  const total = subtotal + shipping + estimatedTax;

  return (
    <div style={{ backgroundColor: '#f4ede3', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>

        <h1 style={{ margin: '0 0 32px', fontSize: 28, fontWeight: 800, color: '#222' }}>
          Your cart <span style={{ fontSize: 16, fontWeight: 400, color: '#878787' }}>({cartItems.reduce((s,i) => s + i.qty, 0)} items)</span>
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>

          {/* Cart items */}
          <div>
            {/* Group by shop */}
            {['ClayAndKilnStudio', 'NeedleAndNestStudio'].map((shopName, si) => {
              const shopItems = cartItems.filter(i => i.shop === shopName);
              if (!shopItems.length) return null;
              return (
                <div key={shopName} style={{ backgroundColor: '#fff', borderRadius: 10, padding: 24, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                  <p style={{ margin: '0 0 20px', fontSize: 13, color: '#595959' }}>
                    Sold by{' '}
                    <Link to="/shop" style={{ color: '#f16521', fontWeight: 600 }}>{shopName}</Link>
                  </p>

                  {shopItems.map((item, i) => (
                    <div key={item.id}>
                      {i > 0 && <hr style={{ border: 'none', borderTop: '1px solid #f0e8e0', margin: '20px 0' }} />}
                      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>

                        {/* Product image */}
                        <Link to="/product">
                          <div style={{
                            width: 96, height: 96, borderRadius: 8, flexShrink: 0,
                            background: item.gradient, cursor: 'pointer'
                          }} />
                        </Link>

                        {/* Item details */}
                        <div style={{ flex: 1 }}>
                          <Link to="/product" style={{ textDecoration: 'none' }}>
                            <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.4 }}>
                              {item.title}
                            </p>
                          </Link>
                          <p style={{ margin: '0 0 8px', fontSize: 13, color: '#878787' }}>
                            By <Link to="/shop" style={{ color: '#595959' }}>{item.shop}</Link>
                          </p>
                          {item.freeShipping && (
                            <span style={{
                              display: 'inline-block', marginBottom: 12,
                              backgroundColor: '#e8f5e9', color: '#2e7d32',
                              fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 999
                            }}>
                              Free shipping
                            </span>
                          )}

                          {/* Qty + remove */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d0c8c0', borderRadius: 6, overflow: 'hidden' }}>
                              <button style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#595959' }}>
                                <Minus size={14} />
                              </button>
                              <span style={{ padding: '6px 12px', borderLeft: '1px solid #e0d8d0', borderRight: '1px solid #e0d8d0', fontSize: 14, minWidth: 36, textAlign: 'center' }}>
                                {item.qty}
                              </span>
                              <button style={{ padding: '6px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#595959' }}>
                                <Plus size={14} />
                              </button>
                            </div>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#878787', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'inherit' }}>
                              <X size={14} /> Remove
                            </button>
                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#595959', fontSize: 13, fontFamily: 'inherit' }}>
                              Save for later
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#222' }}>
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                          {item.qty > 1 && (
                            <p style={{ margin: '2px 0 0', fontSize: 12, color: '#878787' }}>
                              ${item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Promo code */}
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, border: '1px solid #d0c8c0', borderRadius: 6, padding: '0 14px' }}>
                  <Tag size={14} color="#878787" />
                  <input
                    type="text"
                    placeholder="Enter promo or gift card code"
                    style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit', background: 'none', color: '#222', padding: '10px 0' }}
                  />
                </div>
                <button style={{
                  padding: '10px 20px', backgroundColor: '#f16521', border: 'none',
                  borderRadius: 6, color: '#fff', fontSize: 13, fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit'
                }}>
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div>
            <div style={{ backgroundColor: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', marginBottom: 16 }}>
              <h2 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#222' }}>Order summary</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#595959' }}>Items ({cartItems.reduce((s,i) => s + i.qty, 0)})</span>
                  <span style={{ color: '#222', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#595959' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#2e7d32' : '#222', fontWeight: 500 }}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#595959' }}>Estimated tax</span>
                  <span style={{ color: '#222', fontWeight: 500 }}>${estimatedTax.toFixed(2)}</span>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #f0e8e0', paddingTop: 16, marginBottom: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#222' }}>Order total</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: '#222' }}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* How you'll pay */}
              <div style={{ marginBottom: 20 }}>
                <p style={{ margin: '0 0 10px', fontSize: 13, fontWeight: 600, color: '#222' }}>How you'll pay</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map(method => (
                    <div key={method} style={{
                      padding: '6px 12px', border: '1px solid #e0d8d0', borderRadius: 4,
                      fontSize: 12, color: '#595959', backgroundColor: '#fafafa'
                    }}>
                      {method}
                    </div>
                  ))}
                </div>
              </div>

              <button style={{
                width: '100%', padding: '15px', backgroundColor: '#f16521',
                border: 'none', borderRadius: 999, color: '#fff',
                fontSize: 16, fontWeight: 700, cursor: 'pointer',
                fontFamily: 'inherit', marginBottom: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
                <Lock size={16} /> Proceed to checkout
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: '#878787' }}>
                <Shield size={13} color="#878787" />
                Protected by Craft Purchase Protection
              </div>
            </div>

            {/* Keep shopping */}
            <Link to="/">
              <button style={{
                width: '100%', padding: '12px', backgroundColor: '#fff',
                border: '1px solid #d0c8c0', borderRadius: 999, color: '#595959',
                fontSize: 14, cursor: 'pointer', fontFamily: 'inherit',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
              }}>
                Continue shopping <ChevronRight size={16} />
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
