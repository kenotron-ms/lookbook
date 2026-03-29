import { Scissors, Search, ShoppingCart, Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data/products.js';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {/* Main header bar */}
      <div style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e8e0d8', padding: '10px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8,
              backgroundColor: '#f16521', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Scissors size={20} color="#ffffff" />
            </div>
            <span style={{ fontSize: 22, fontWeight: 700, color: '#f16521', letterSpacing: '-0.5px' }}>Craft</span>
          </Link>

          {/* Search bar */}
          <div style={{ flex: 1, position: 'relative', maxWidth: 640 }}>
            <input
              type="text"
              placeholder="Search for anything..."
              style={{
                width: '100%', padding: '10px 48px 10px 16px',
                border: '2px solid #f16521', borderRadius: 999,
                fontSize: 14, outline: 'none', backgroundColor: '#fffaf7',
                color: '#222', fontFamily: 'inherit',
              }}
            />
            <button
              onClick={() => navigate('/product')}
              style={{
                position: 'absolute', right: 4, top: '50%', transform: 'translateY(-50%)',
                backgroundColor: '#f16521', border: 'none', borderRadius: 999,
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Search size={16} color="#fff" />
            </button>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 6,
              color: '#595959', fontSize: 13, fontFamily: 'inherit', padding: '6px 8px',
            }}>
              <Heart size={18} />
              <span>Favorites</span>
            </button>
            <Link to="/cart">
              <button style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 6,
                color: '#595959', fontSize: 13, fontFamily: 'inherit', padding: '6px 8px',
                position: 'relative'
              }}>
                <ShoppingCart size={18} />
                <span>Cart</span>
                <span style={{
                  position: 'absolute', top: 2, right: 18,
                  backgroundColor: '#f16521', color: '#fff',
                  borderRadius: 999, width: 16, height: 16,
                  fontSize: 10, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>2</span>
              </button>
            </Link>
            <button style={{
              background: 'none', border: '1px solid #d0c8c0', borderRadius: 999,
              cursor: 'pointer', color: '#222', fontSize: 13,
              fontFamily: 'inherit', padding: '7px 16px'
            }}>
              Sign in
            </button>
            <button style={{
              backgroundColor: '#f16521', border: 'none', borderRadius: 999,
              cursor: 'pointer', color: '#fff', fontSize: 13, fontWeight: 600,
              fontFamily: 'inherit', padding: '7px 16px'
            }}>
              Register
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e8e0d8', padding: '0 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', gap: 0, overflowX: 'auto' }}>
          {categories.map(cat => (
            <Link
              key={cat}
              to="/"
              style={{
                padding: '10px 16px', fontSize: 13, fontWeight: 500,
                whiteSpace: 'nowrap', borderBottom: cat === 'Home Decor' ? '2px solid #f16521' : '2px solid transparent',
                color: cat === 'Home Decor' ? '#f16521' : '#595959',
              }}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
