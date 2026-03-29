import { Utensils, MapPin, ShoppingBag, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ cartCount = 0 }) {
  const navigate = useNavigate();

  return (
    <header
      style={{ backgroundColor: '#141414', borderBottom: '1px solid #2a2a2a' }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
    >
      <div className="max-w-6xl mx-auto px-4 h-full flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: '#06c167' }}
          >
            <Utensils size={18} color="#fff" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Hunger</span>
        </Link>

        {/* Address */}
        <button
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl transition-colors"
          style={{ backgroundColor: '#1e1e1e' }}
        >
          <MapPin size={14} style={{ color: '#06c167' }} />
          <span className="text-sm text-white font-medium hidden sm:block">123 Main St</span>
          <ChevronDown size={13} style={{ color: '#8d8d8d' }} />
        </button>

        {/* Cart */}
        <button
          onClick={() => navigate('/cart')}
          className="relative flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-colors"
          style={{ backgroundColor: '#06c167', color: '#fff' }}
        >
          <ShoppingBag size={16} />
          <span className="hidden sm:block">Cart</span>
          {cartCount > 0 && (
            <span
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
              style={{ backgroundColor: '#fff', color: '#06c167' }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
