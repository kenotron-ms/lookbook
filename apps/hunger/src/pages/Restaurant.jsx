import { useState } from 'react';
import { ArrowLeft, Search, Heart, Star, Clock, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { detailedRestaurant } from '../data/restaurants.js';

const CART_TOTAL = '$44.96';
const CART_COUNT = 4;

function MenuItemCard({ item }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl"
      style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a' }}
    >
      {/* Gradient image */}
      <div
        className="w-20 h-20 rounded-xl shrink-0"
        style={{ background: item.gradient }}
      />
      {/* Details */}
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-white text-sm leading-snug">{item.name}</h4>
        <p className="text-xs mt-1 leading-relaxed line-clamp-2" style={{ color: '#8d8d8d' }}>{item.description}</p>
        <p className="font-bold text-sm mt-2 text-white">${item.price.toFixed(2)}</p>
      </div>
      {/* Add button */}
      <button
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-lg"
        style={{ backgroundColor: '#06c167', color: '#fff' }}
      >
        +
      </button>
    </div>
  );
}

export default function Restaurant() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('All');
  const r = detailedRestaurant;

  const visibleSections = activeCategory === 'All'
    ? Object.keys(r.menu)
    : (r.menu[activeCategory] ? [activeCategory] : []);

  return (
    <div className="min-h-screen pb-28" style={{ backgroundColor: '#000000' }}>
      {/* Banner */}
      <div className="relative h-52" style={{ background: r.gradient }}>
        <div className="absolute inset-0 flex items-end p-4" style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.85))' }}>
          <div className="flex items-center justify-between w-full">
            <button onClick={() => navigate('/')} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
              <ArrowLeft size={18} color="#fff" />
            </button>
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <Search size={16} color="#fff" />
              </button>
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <Heart size={16} color="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant info */}
      <div className="px-4 py-4" style={{ backgroundColor: '#141414', borderBottom: '1px solid #2a2a2a' }}>
        <h1 className="text-2xl font-bold text-white">{r.name}</h1>
        <p className="text-sm mt-1" style={{ color: '#8d8d8d' }}>{r.cuisine}</p>
        <div className="flex items-center gap-4 mt-3">
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#06c167' }}>
            <Star size={14} fill="#06c167" />
            <span className="font-bold text-white">{r.rating}</span>
            <span style={{ color: '#8d8d8d' }}>({r.reviews.toLocaleString()})</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#8d8d8d' }}>
            <Clock size={14} />
            {r.deliveryTime}
          </span>
          <span className="text-sm" style={{ color: '#8d8d8d' }}>{r.deliveryFee} delivery</span>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            className="px-5 py-2 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#06c167', color: '#fff' }}
          >
            Delivery
          </button>
          <button
            className="px-5 py-2 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: '#1e1e1e', color: '#8d8d8d', border: '1px solid #2a2a2a' }}
          >
            Pickup
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div
        className="px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide sticky top-0 z-10"
        style={{ backgroundColor: '#141414', borderBottom: '1px solid #2a2a2a' }}
      >
        {r.categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: activeCategory === cat ? '#06c167' : '#1e1e1e',
              color: activeCategory === cat ? '#fff' : '#8d8d8d',
              border: `1px solid ${activeCategory === cat ? '#06c167' : '#2a2a2a'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu sections */}
      <div className="px-4 py-4 space-y-8">
        {visibleSections.map(section => (
          <section key={section}>
            <h2 className="text-lg font-bold text-white mb-3">{section}</h2>
            <div className="space-y-3">
              {r.menu[section].map(item => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Floating cart button */}
      <div className="fixed bottom-6 left-4 right-4 z-50">
        <button
          onClick={() => navigate('/cart')}
          className="w-full flex items-center justify-between px-5 py-4 rounded-2xl font-semibold text-white shadow-2xl"
          style={{ backgroundColor: '#06c167' }}
        >
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold"
            style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
          >
            {CART_COUNT}
          </span>
          <span className="text-base">View cart</span>
          <span className="text-base font-bold">{CART_TOTAL}</span>
        </button>
      </div>
    </div>
  );
}
