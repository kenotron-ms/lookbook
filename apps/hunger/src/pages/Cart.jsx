import { useState } from 'react';
import { ArrowLeft, Plus, Minus, MapPin, Tag, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cartItems } from '../data/restaurants.js';

function QuantityControl({ qty, onInc, onDec }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDec}
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#2a2a2a', color: '#fff' }}
      >
        <Minus size={13} />
      </button>
      <span className="text-white font-bold w-5 text-center text-sm">{qty}</span>
      <button
        onClick={onInc}
        className="w-7 h-7 rounded-full flex items-center justify-center"
        style={{ backgroundColor: '#06c167', color: '#fff' }}
      >
        <Plus size={13} />
      </button>
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems);
  const [tip, setTip] = useState(2);
  const [promoCode, setPromoCode] = useState('');

  const updateQty = (id, delta) => {
    setItems(prev => prev
      .map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const delivery = 0.99;
  const serviceFee = 1.49;
  const total = subtotal + delivery + serviceFee + tip;

  const tipOptions = [0, 1, 2, 3, 5];

  return (
    <div className="min-h-screen pb-32" style={{ backgroundColor: '#000000' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 flex items-center gap-4 px-4 h-16"
        style={{ backgroundColor: '#141414', borderBottom: '1px solid #2a2a2a' }}
      >
        <button onClick={() => navigate('/restaurant')}>
          <ArrowLeft size={22} color="#fff" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1">Your order</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Restaurant name */}
        <div className="flex items-center justify-between">
          <p className="font-semibold text-white">Urban Burger Co.</p>
          <button
            onClick={() => navigate('/restaurant')}
            className="text-sm font-medium"
            style={{ color: '#06c167' }}
          >
            + Add items
          </button>
        </div>

        {/* Items */}
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          {items.map((item, i) => (
            <div key={item.id}>
              <div className="p-4 flex items-start gap-3">
                <QuantityControl
                  qty={item.quantity}
                  onInc={() => updateQty(item.id, 1)}
                  onDec={() => updateQty(item.id, -1)}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-sm">{item.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#8d8d8d' }}>{item.customization}</p>
                </div>
                <p className="font-bold text-white text-sm shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
              {i < items.length - 1 && <div style={{ height: 1, backgroundColor: '#2a2a2a' }} />}
            </div>
          ))}
        </div>

        {/* Delivery details */}
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white text-sm">Delivery details</p>
          <div className="flex items-center gap-3">
            <MapPin size={16} style={{ color: '#06c167' }} />
            <div className="flex-1">
              <p className="text-sm text-white">123 Main St, Apt 4B</p>
              <p className="text-xs" style={{ color: '#8d8d8d' }}>New York, NY 10001</p>
            </div>
            <ChevronRight size={16} style={{ color: '#8d8d8d' }} />
          </div>
          <div style={{ height: 1, backgroundColor: '#2a2a2a' }} />
          <div>
            <p className="text-sm text-white mb-1">Delivery instructions</p>
            <input
              type="text"
              placeholder="Leave at door, ring bell..."
              className="w-full px-3 py-2 rounded-xl text-sm outline-none text-white placeholder-gray-600"
              style={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}
            />
          </div>
        </div>

        {/* Promo */}
        <div className="rounded-2xl p-4 flex items-center gap-3" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <Tag size={16} style={{ color: '#06c167' }} />
          <input
            type="text"
            placeholder="Add promo code"
            value={promoCode}
            onChange={e => setPromoCode(e.target.value)}
            className="flex-1 text-sm outline-none text-white placeholder-gray-600"
            style={{ backgroundColor: 'transparent' }}
          />
          {promoCode && (
            <button className="text-sm font-bold" style={{ color: '#06c167' }}>Apply</button>
          )}
        </div>

        {/* Tip */}
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white text-sm">Tip your driver</p>
          <div className="flex gap-2">
            {tipOptions.map(t => (
              <button
                key={t}
                onClick={() => setTip(t)}
                className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                style={{
                  backgroundColor: tip === t ? '#06c167' : '#2a2a2a',
                  color: '#fff',
                  border: `1px solid ${tip === t ? '#06c167' : '#3a3a3a'}`,
                }}
              >
                {t === 0 ? 'None' : `$${t}`}
              </button>
            ))}
          </div>
        </div>

        {/* Price breakdown */}
        <div className="rounded-2xl p-4 space-y-3" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white text-sm">Order summary</p>
          {[
            ['Subtotal', `$${subtotal.toFixed(2)}`],
            ['Delivery fee', `$${delivery.toFixed(2)}`],
            ['Service fee', `$${serviceFee.toFixed(2)}`],
            ['Tip', tip === 0 ? 'None' : `$${tip.toFixed(2)}`],
          ].map(([label, val]) => (
            <div key={label} className="flex justify-between text-sm">
              <span style={{ color: '#8d8d8d' }}>{label}</span>
              <span className="text-white">{val}</span>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: '#2a2a2a' }} />
          <div className="flex justify-between font-bold text-base">
            <span className="text-white">Total</span>
            <span className="text-white">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Place order button */}
      <div className="fixed bottom-0 left-0 right-0 p-4" style={{ backgroundColor: '#000000', borderTop: '1px solid #2a2a2a' }}>
        <button
          onClick={() => navigate('/tracking')}
          className="w-full max-w-lg mx-auto flex items-center justify-between px-6 py-4 rounded-2xl font-bold text-base text-white"
          style={{ backgroundColor: '#06c167', display: 'flex' }}
        >
          <span>Place order</span>
          <span>${total.toFixed(2)}</span>
        </button>
      </div>
    </div>
  );
}
