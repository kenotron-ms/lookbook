import { useState, useEffect } from 'react';
import { ArrowLeft, MessageCircle, Star, Check, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  { id: 1, label: 'Order confirmed', done: true },
  { id: 2, label: 'Preparing your food', done: true },
  { id: 3, label: 'Driver on the way', done: false },
  { id: 4, label: 'Delivered', done: false },
];

function ProgressDot({ done, active }) {
  return (
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
      style={{
        backgroundColor: done ? '#06c167' : active ? '#06c16733' : '#2a2a2a',
        border: active ? '2px solid #06c167' : 'none',
      }}
    >
      {done ? <Check size={14} color="#fff" /> : (
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: active ? '#06c167' : '#3a3a3a' }} />
      )}
    </div>
  );
}

export default function Tracking() {
  const navigate = useNavigate();
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => {
        if (s === 0) {
          setMinutes(m => Math.max(0, m - 1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 400);
    return () => clearTimeout(t);
  }, [minutes]);

  const activeStep = STEPS.findIndex(s => !s.done);

  return (
    <div className="min-h-screen pb-10" style={{ backgroundColor: '#000000' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-50 flex items-center gap-4 px-4 h-16"
        style={{ backgroundColor: '#141414', borderBottom: '1px solid #2a2a2a' }}
      >
        <button onClick={() => navigate('/')}>
          <ArrowLeft size={22} color="#fff" />
        </button>
        <h1 className="text-lg font-bold text-white flex-1">Order confirmed</h1>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">

        {/* Animated checkmark */}
        <div className="flex flex-col items-center py-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: '#06c16722', border: '2px solid #06c167' }}
          >
            <Check size={36} style={{ color: '#06c167' }} strokeWidth={3} />
          </div>
          <h2 className="text-2xl font-bold text-white">Order placed!</h2>
          <p className="text-sm mt-1" style={{ color: '#8d8d8d' }}>Urban Burger Co. is preparing your food</p>
        </div>

        {/* ETA countdown */}
        <div
          className="rounded-2xl p-5 flex items-center justify-between"
          style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
        >
          <div>
            <p className="text-sm" style={{ color: '#8d8d8d' }}>Estimated arrival</p>
            <p
              className="text-4xl font-bold mt-1 transition-transform"
              style={{ color: '#06c167', transform: pulse ? 'scale(1.05)' : 'scale(1)' }}
            >
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
          <div className="flex items-center gap-2" style={{ color: '#8d8d8d' }}>
            <Clock size={18} />
            <span className="text-sm">~25 min</span>
          </div>
        </div>

        {/* Status progress */}
        <div className="rounded-2xl p-5 space-y-4" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white">Order status</p>
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i === activeStep;
              return (
                <div key={step.id} className="flex items-center gap-4">
                  <ProgressDot done={step.done} active={isActive} />
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: step.done || isActive ? '#fff' : '#8d8d8d' }}
                    >
                      {step.label}
                    </p>
                    {isActive && (
                      <p className="text-xs mt-0.5" style={{ color: '#06c167' }}>In progress</p>
                    )}
                  </div>
                  {step.done && (
                    <span className="text-xs" style={{ color: '#8d8d8d' }}>Done</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver profile */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white mb-4">Your driver</p>
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold shrink-0"
              style={{ background: 'linear-gradient(135deg, #06c167 0%, #049a51 100%)', color: '#fff' }}
            >
              M
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">Marcus J.</p>
              <p className="text-sm mt-0.5" style={{ color: '#8d8d8d' }}>Toyota Camry · Silver</p>
              <div className="flex items-center gap-1 mt-1">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={12} fill="#06c167" style={{ color: '#06c167' }} />
                ))}
                <span className="text-xs ml-1" style={{ color: '#8d8d8d' }}>4.97</span>
              </div>
            </div>
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#2a2a2a', color: '#06c167' }}
            >
              <MessageCircle size={18} />
            </button>
          </div>
        </div>

        {/* Dark map placeholder */}
        <div
          className="rounded-2xl overflow-hidden relative"
          style={{ backgroundColor: '#1e1e1e', height: 200, border: '1px solid #2a2a2a' }}
        >
          {/* Simulated map roads */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
            <line x1="0" y1="60" x2="400" y2="60" stroke="#3a3a3a" strokeWidth="8" />
            <line x1="0" y1="130" x2="400" y2="130" stroke="#3a3a3a" strokeWidth="5" />
            <line x1="80" y1="0" x2="80" y2="200" stroke="#3a3a3a" strokeWidth="8" />
            <line x1="220" y1="0" x2="220" y2="200" stroke="#3a3a3a" strokeWidth="5" />
            <line x1="320" y1="0" x2="320" y2="200" stroke="#3a3a3a" strokeWidth="4" />
          </svg>
          {/* Delivery path */}
          <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
            <polyline points="80,170 80,130 220,130 220,60 280,60" stroke="#06c167" strokeWidth="3" fill="none" strokeDasharray="8 4" />
            {/* Start dot */}
            <circle cx="80" cy="170" r="6" fill="#06c167" />
            {/* Current position */}
            <circle cx="220" cy="130" r="8" fill="#06c167" opacity="0.9" />
            <circle cx="220" cy="130" r="14" fill="#06c167" opacity="0.2" />
            {/* End dot */}
            <circle cx="280" cy="60" r="6" fill="#06c167" opacity="0.6" />
          </svg>
          {/* Map label */}
          <div className="absolute bottom-3 left-3">
            <span
              className="text-xs px-2 py-1 rounded-lg font-medium"
              style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#8d8d8d' }}
            >
              Live tracking
            </span>
          </div>
          {/* Destination */}
          <div className="absolute top-2.5 right-3 flex items-center gap-1">
            <MapPin size={13} style={{ color: '#06c167' }} />
            <span className="text-xs text-white font-medium">123 Main St</span>
          </div>
        </div>

        {/* Order summary */}
        <div className="rounded-2xl p-5 space-y-3" style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}>
          <p className="font-semibold text-white">Order summary</p>
          {[
            ['Classic Smash Burger × 2', '$29.98'],
            ['Truffle Fries × 1', '$7.99'],
            ['Classic Milkshake × 1', '$6.99'],
          ].map(([name, price]) => (
            <div key={name} className="flex justify-between text-sm">
              <span style={{ color: '#8d8d8d' }}>{name}</span>
              <span className="text-white">{price}</span>
            </div>
          ))}
          <div style={{ height: 1, backgroundColor: '#2a2a2a' }} />
          <div className="flex justify-between font-bold">
            <span className="text-white">Total paid</span>
            <span style={{ color: '#06c167' }}>$52.43</span>
          </div>
        </div>

        {/* Help button */}
        <button
          className="w-full py-4 rounded-2xl font-semibold text-sm"
          style={{ backgroundColor: '#1e1e1e', color: '#8d8d8d', border: '1px solid #2a2a2a' }}
        >
          Get help with this order
        </button>

      </div>
    </div>
  );
}
