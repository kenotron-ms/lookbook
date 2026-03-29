import { useState } from 'react';
import { Search, Star, Clock, ChevronRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.jsx';
import { categories, featuredPromos, offerBanners, quickAffordable, popularNearYou } from '../data/restaurants.js';

function RestaurantCard({ restaurant, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
      style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a', minWidth: 220 }}
    >
      {/* Thumbnail */}
      <div className="h-36 relative" style={{ background: restaurant.gradient }}>
        {restaurant.promo && (
          <div
            className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-xs font-bold"
            style={{ backgroundColor: '#06c167', color: '#fff' }}
          >
            {restaurant.promo}
          </div>
        )}
      </div>
      {/* Info */}
      <div className="p-3">
        <h3 className="font-semibold text-white text-sm">{restaurant.name}</h3>
        <p className="text-xs mt-0.5" style={{ color: '#8d8d8d' }}>{restaurant.cuisine}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs" style={{ color: '#06c167' }}>
            <Star size={11} fill="#06c167" />
            {restaurant.rating}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: '#8d8d8d' }}>
            <Clock size={11} />
            {restaurant.deliveryTime}
          </span>
          <span className="text-xs" style={{ color: '#8d8d8d' }}>{restaurant.deliveryFee}</span>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, showAll }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {showAll && (
        <button className="flex items-center gap-1 text-sm font-medium" style={{ color: '#06c167' }}>
          See all <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#000000' }}>
      <Header cartCount={3} />

      {/* Main content */}
      <main className="pt-16">
        {/* Hero Search */}
        <div className="px-4 py-8" style={{ backgroundColor: '#141414' }}>
          <p className="text-2xl font-bold text-white mb-4">What are you craving?</p>
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#8d8d8d' }} />
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-2xl text-sm outline-none text-white placeholder-gray-500"
              style={{ backgroundColor: '#2a2a2a', border: '1px solid #3a3a3a' }}
            />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-6 space-y-10">

          {/* Featured Promos */}
          <section>
            <SectionHeader title="Featured" />
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {featuredPromos.map(promo => (
                <div
                  key={promo.id}
                  className="rounded-2xl p-5 shrink-0 cursor-pointer transition-transform hover:scale-[1.02]"
                  style={{ background: promo.gradient, border: '1px solid #2a2a2a', minWidth: 280, maxWidth: 340 }}
                >
                  <p className="text-xs font-medium mb-1" style={{ color: promo.accentColor }}>{promo.restaurant}</p>
                  <h3 className="text-2xl font-bold text-white">{promo.title}</h3>
                  <p className="text-sm mt-1" style={{ color: '#8d8d8d' }}>{promo.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Category Pills */}
          <section>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className="shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: activeCategory === cat.id ? '#06c167' : '#1e1e1e',
                    color: activeCategory === cat.id ? '#fff' : '#ffffff',
                    border: `1px solid ${activeCategory === cat.id ? '#06c167' : '#2a2a2a'}`,
                  }}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          {/* Quick and Affordable */}
          <section>
            <SectionHeader title="Quick and affordable" showAll />
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
              {quickAffordable.map(r => (
                <RestaurantCard key={r.id} restaurant={r} onClick={() => navigate('/restaurant')} />
              ))}
            </div>
          </section>

          {/* Popular Near You */}
          <section>
            <SectionHeader title="Popular near you" showAll />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {popularNearYou.map(r => (
                <RestaurantCard key={r.id} restaurant={r} onClick={() => navigate('/restaurant')} />
              ))}
            </div>
          </section>

          {/* Offers */}
          <section>
            <SectionHeader title="Offers for you" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offerBanners.map(offer => (
                <div
                  key={offer.id}
                  className="rounded-2xl p-6 cursor-pointer transition-transform hover:scale-[1.01]"
                  style={{ background: offer.gradient, border: '1px solid #2a2a2a' }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: offer.accent + '22' }}
                    >
                      <Tag size={18} style={{ color: offer.accent }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{offer.title}</h3>
                      <p className="text-sm mt-0.5" style={{ color: '#8d8d8d' }}>{offer.subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Extra bottom padding */}
          <div className="h-4" />
        </div>
      </main>
    </div>
  );
}
