import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, MapPin, Phone, MessageCircle } from 'lucide-react'

const ACCENT = '#eb1700'

const STEPS = [
  { label: 'Order Placed', sub: '12:34 PM', status: 'done' },
  { label: 'Preparing', sub: 'In kitchen', status: 'active' },
  { label: 'Driver Assigned', sub: 'Pending', status: 'upcoming' },
  { label: 'On the Way', sub: 'Pending', status: 'upcoming' },
  { label: 'Delivered', sub: 'Estimated 1:05 PM', status: 'upcoming' },
]

const ORDER_ITEMS = [
  { name: 'Classic Smash Burger', qty: 2, price: 12.99 },
  { name: 'Sweet Potato Fries', qty: 1, price: 4.99 },
  { name: 'Chocolate Milkshake', qty: 1, price: 6.99 },
]

function StepCircle({ status }) {
  if (status === 'done') {
    return (
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
        <CheckCircle size={18} color="#fff" fill="none" strokeWidth={2.5} />
      </div>
    )
  }
  if (status === 'active') {
    return (
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${ACCENT}`, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1 }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: ACCENT, animation: 'pulse 1.5s infinite' }} />
      </div>
    )
  }
  return (
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid #e5e7eb', backgroundColor: '#fff', flexShrink: 0, zIndex: 1 }} />
  )
}

export default function Tracking() {
  const navigate = useNavigate()
  const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0)
  const taxes = subtotal * 0.08875
  const tip = subtotal * 0.18
  const total = subtotal + taxes + tip

  return (
    <div style={{ backgroundColor: '#f8f8f8', minHeight: '100vh' }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px' }}>

        {/* Back */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button onClick={() => navigate('/')} style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #ebebeb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ArrowLeft size={18} color="#191919" />
          </button>
          <h1 style={{ fontSize: '24px', fontWeight: 900, color: '#191919' }}>Track Order</h1>
        </div>

        {/* Status Hero */}
        <div
          style={{
            background: `linear-gradient(135deg, ${ACCENT} 0%, #a31000 100%)`,
            borderRadius: '16px',
            padding: '28px 32px',
            marginBottom: '20px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: '13px', fontWeight: 600, opacity: 0.85, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Live Order Status
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.3px' }}>
              Your order is being prepared
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', opacity: 0.9, fontSize: '14px' }}>
              <Clock size={14} />
              <span>Estimated arrival: <strong>1:05 PM</strong> (about 28 min)</span>
            </div>
          </div>
          <div style={{ fontSize: '56px' }}>👨‍🍳</div>
        </div>

        {/* Progress Steps */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '28px 32px', marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#191919', marginBottom: '24px' }}>Order Progress</h3>
          <div style={{ position: 'relative' }}>
            {/* Connecting line */}
            <div
              style={{
                position: 'absolute',
                left: '15px',
                top: '16px',
                bottom: '16px',
                width: '2px',
                backgroundColor: '#e5e7eb',
                zIndex: 0,
              }}
            />
            {/* Done portion of line */}
            <div
              style={{
                position: 'absolute',
                left: '15px',
                top: '16px',
                height: '20%',
                width: '2px',
                backgroundColor: ACCENT,
                zIndex: 0,
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {STEPS.map((step, i) => (
                <div key={step.label} style={{ display: 'flex', alignItems: 'center', gap: '16px', position: 'relative' }}>
                  <StepCircle status={step.status} />
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontWeight: step.status === 'upcoming' ? 500 : 700,
                        fontSize: '15px',
                        color: step.status === 'upcoming' ? '#767676' : '#191919',
                      }}
                    >
                      {step.label}
                      {step.status === 'active' && (
                        <span style={{ marginLeft: '8px', backgroundColor: '#fff7ed', color: '#ea580c', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', border: '1px solid #fed7aa' }}>
                          In Progress
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '13px', color: step.status === 'done' ? ACCENT : '#767676', marginTop: '1px' }}>
                      {step.sub}
                    </div>
                  </div>
                  {step.status === 'done' && (
                    <span style={{ fontSize: '20px' }}>✓</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div
          style={{
            backgroundColor: '#fff',
            border: '1px solid #ebebeb',
            borderRadius: '14px',
            overflow: 'hidden',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              height: '220px',
              background: 'linear-gradient(135deg, #bbf7d0 0%, #86efac 40%, #4ade80 70%, #22c55e 100%)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Route line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 800 220" preserveAspectRatio="none">
              <path
                d="M 100 160 C 200 160, 250 80, 380 80 C 510 80, 580 120, 700 100"
                stroke="#16a34a"
                strokeWidth="4"
                strokeDasharray="12,6"
                fill="none"
                opacity="0.8"
              />
            </svg>

            {/* Restaurant pin */}
            <div style={{ position: 'absolute', left: '120px', top: '130px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', border: `2px solid ${ACCENT}` }}>
                <span style={{ fontSize: '16px' }}>🍔</span>
              </div>
              <div style={{ backgroundColor: ACCENT, color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap' }}>Restaurant</div>
            </div>

            {/* Driver dot (moving) */}
            <div style={{ position: 'absolute', left: '370px', top: '52px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', border: '2px solid #16a34a' }}>
                <span style={{ fontSize: '18px' }}>🛵</span>
              </div>
              <div style={{ backgroundColor: '#16a34a', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap' }}>Carlos M.</div>
            </div>

            {/* Destination pin */}
            <div style={{ position: 'absolute', right: '100px', top: '70px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.18)', border: '2px solid #767676' }}>
                <MapPin size={16} color="#191919" />
              </div>
              <div style={{ backgroundColor: '#191919', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', whiteSpace: 'nowrap' }}>Your Address</div>
            </div>

            {/* Map label */}
            <div style={{ position: 'absolute', top: '12px', right: '14px', backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: '8px', padding: '4px 10px', fontSize: '12px', fontWeight: 600, color: '#191919' }}>
              Live Map
            </div>
          </div>

          {/* Driver info */}
          <div style={{ padding: '18px 22px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #34d399, #059669)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                flexShrink: 0,
              }}
            >
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 800, fontSize: '16px', color: '#191919' }}>Carlos M.</div>
              <div style={{ fontSize: '13px', color: '#767676', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span>⭐ 4.97</span>
                <span>·</span>
                <span>1,243 deliveries</span>
                <span>·</span>
                <span style={{ color: ACCENT, fontWeight: 600 }}>ETA: 28 min</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #ebebeb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Phone size={18} color="#191919" />
              </button>
              <button style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid #ebebeb', backgroundColor: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={18} color="#191919" />
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #ebebeb', borderRadius: '14px', padding: '22px', marginBottom: '20px' }}>
          <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#191919', marginBottom: '14px' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            {ORDER_ITEMS.map((item) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                <span style={{ color: '#191919' }}>{item.qty}× {item.name}</span>
                <span style={{ fontWeight: 600, color: '#191919' }}>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid #ebebeb', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
              { label: 'Delivery fee', value: 'Free', green: true },
              { label: 'Tip (18%)', value: `$${tip.toFixed(2)}` },
              { label: 'Taxes & fees', value: `$${taxes.toFixed(2)}` },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ color: '#767676' }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: row.green ? '#16a34a' : '#191919' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 900, color: '#191919', paddingTop: '8px', borderTop: '1px solid #ebebeb', marginTop: '4px' }}>
              <span>Total Charged</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
