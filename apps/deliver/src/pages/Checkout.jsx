import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, MessageSquare, CreditCard, ChevronRight, Check, Bike } from 'lucide-react'

const ACCENT = '#eb1700'

const ORDER_ITEMS = [
  { name: 'Classic Smash Burger', qty: 2, price: 12.99 },
  { name: 'Sweet Potato Fries', qty: 1, price: 4.99 },
  { name: 'Chocolate Milkshake', qty: 1, price: 6.99 },
]

const TIP_OPTIONS = [
  { label: '15%', value: 0.15 },
  { label: '18%', value: 0.18 },
  { label: '20%', value: 0.20 },
  { label: 'Custom', value: null },
]

export default function Checkout() {
  const navigate = useNavigate()
  const [selectedTip, setSelectedTip] = useState(1)
  const [instructions, setInstructions] = useState('')

  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const deliveryFee = 0
  const taxes = subtotal * 0.08875
  const tipAmount = TIP_OPTIONS[selectedTip].value ? subtotal * TIP_OPTIONS[selectedTip].value : 0
  const total = subtotal + deliveryFee + taxes + tipAmount

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>

        {/* Back button + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/restaurant')} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #ebebeb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={18} color="#191919" />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#191919' }}>Checkout</h1>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '20px', alignItems: 'flex-start' }}>

          {/* Left column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Delivery address */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MapPin size={18} color={ACCENT} />
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#191919' }}>Delivery Address</h3>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: '#f8f8f8', borderRadius: '10px', border: '1px solid #ebebeb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14px', color: '#191919' }}>123 Main Street</div>
                  <div style={{ fontSize: '13px', color: '#767676' }}>Apt 4B · San Francisco, CA 94105</div>
                </div>
                <ChevronRight size={16} color="#767676" />
              </div>
            </div>

            {/* Delivery instructions */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <MessageSquare size={18} color={ACCENT} />
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#191919' }}>Delivery Instructions</h3>
                <span style={{ marginLeft: 'auto', fontSize: '12px', color: '#767676' }}>Optional</span>
              </div>
              <textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Leave at door, ring doorbell, etc."
                style={{
                  width: '100%',
                  height: '80px',
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: '1px solid #ebebeb',
                  backgroundColor: '#f8f8f8',
                  fontSize: '14px',
                  color: '#191919',
                  resize: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Tip */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <Bike size={18} color={ACCENT} />
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#191919' }}>Tip Your Dasher</h3>
              </div>
              <p style={{ fontSize: '13px', color: '#767676', marginBottom: '14px' }}>100% of your tip goes directly to your Dasher</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {TIP_OPTIONS.map((tip, i) => (
                  <button
                    key={tip.label}
                    onClick={() => setSelectedTip(i)}
                    style={{
                      flex: 1,
                      padding: '10px 0',
                      borderRadius: '10px',
                      border: `2px solid ${selectedTip === i ? ACCENT : '#ebebeb'}`,
                      backgroundColor: selectedTip === i ? '#fff5f5' : '#fff',
                      color: selectedTip === i ? ACCENT : '#191919',
                      fontWeight: selectedTip === i ? 700 : 500,
                      fontSize: '14px',
                      cursor: 'pointer',
                    }}
                  >
                    {tip.label}
                    {tip.value && (
                      <div style={{ fontSize: '11px', opacity: 0.8 }}>${(subtotal * tip.value).toFixed(2)}</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '20px 22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <CreditCard size={18} color={ACCENT} />
                <h3 style={{ fontWeight: 700, fontSize: '15px', color: '#191919' }}>Payment Method</h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Visa ending in 4242', sub: 'Expires 08/27', icon: '💳' },
                  { label: 'Apple Pay', sub: 'Touch ID or Face ID', icon: '' },
                ].map((pm, i) => (
                  <div
                    key={pm.label}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: `2px solid ${i === 0 ? ACCENT : '#ebebeb'}`,
                      backgroundColor: i === 0 ? '#fff5f5' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontSize: '20px' }}>{pm.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#191919' }}>{pm.label}</div>
                      <div style={{ fontSize: '12px', color: '#767676' }}>{pm.sub}</div>
                    </div>
                    {i === 0 && (
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={12} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', overflow: 'hidden' }}>
              <div style={{ padding: '18px 20px', borderBottom: '1px solid #ebebeb' }}>
                <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#191919' }}>Order Summary</h3>
                <p style={{ fontSize: '13px', color: '#767676', marginTop: '2px' }}>The Burger Lab</p>
              </div>
              <div style={{ padding: '16px 20px' }}>
                {ORDER_ITEMS.map((item) => (
                  <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '10px' }}>
                    <span style={{ color: '#191919' }}>{item.qty}x {item.name}</span>
                    <span style={{ fontWeight: 600, color: '#191919' }}>${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '14px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
                    { label: 'Delivery fee', value: 'Free', green: true },
                    { label: `Tip (${TIP_OPTIONS[selectedTip].label})`, value: `$${tipAmount.toFixed(2)}` },
                    { label: 'Taxes & fees', value: `$${taxes.toFixed(2)}` },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: '#767676' }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: row.green ? '#16a34a' : '#191919' }}>{row.value}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 900, color: '#191919', paddingTop: '10px', borderTop: '1px solid #ebebeb', marginTop: '4px' }}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/tracking')}
                  style={{
                    width: '100%',
                    marginTop: '16px',
                    padding: '15px',
                    backgroundColor: ACCENT,
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 800,
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c91400'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ACCENT}
                >
                  Place Order · ${total.toFixed(2)}
                </button>

                <p style={{ textAlign: 'center', fontSize: '11px', color: '#767676', marginTop: '10px' }}>
                  By placing your order, you agree to our Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
