import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Gavel, ShoppingCart, Bell, User, Search, ChevronDown } from 'lucide-react'

const CATEGORIES = ['All Categories', 'Electronics', 'Collectibles', 'Clothing', 'Automotive', 'Gaming', 'Home & Garden', 'Sports', 'Art']

export default function Header() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/search')
  }

  return (
    <header style={{ background: '#fff', borderBottom: '1px solid #e0e0e0', position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Main header row */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 64 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <Gavel size={28} color="#3665f3" />
            <span style={{ fontSize: 26, fontWeight: 900, letterSpacing: -1, lineHeight: 1 }}>
              <span style={{ color: '#3665f3' }}>B</span>
              <span style={{ color: '#e53935' }}>i</span>
              <span style={{ color: '#f5a623' }}>d</span>
            </span>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', maxWidth: 720 }}>
            <div style={{ display: 'flex', border: '2px solid #3665f3', borderRadius: 4, overflow: 'hidden', width: '100%' }}>
              {/* Category dropdown */}
              <div style={{ position: 'relative', borderRight: '1px solid #e0e0e0', flexShrink: 0 }}>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    border: 'none',
                    background: '#f7f7f7',
                    padding: '0 32px 0 10px',
                    height: 40,
                    fontSize: 13,
                    color: '#191919',
                    cursor: 'pointer',
                    appearance: 'none',
                    outline: 'none',
                    width: 140,
                  }}
                >
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown size={14} style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', color: '#767676', pointerEvents: 'none' }} />
              </div>
              {/* Search input */}
              <input
                type="text"
                placeholder="Search for anything"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  border: 'none',
                  padding: '0 12px',
                  fontSize: 14,
                  outline: 'none',
                  height: 40,
                }}
              />
              {/* Search button */}
              <button
                type="submit"
                style={{
                  background: '#3665f3',
                  color: '#fff',
                  border: 'none',
                  padding: '0 20px',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  height: 40,
                  flexShrink: 0,
                }}
              >
                Search
              </button>
            </div>
          </form>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto', flexShrink: 0 }}>
            <Link to="/search" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#191919', gap: 2 }}>
              <Bell size={20} />
              <span style={{ fontSize: 11, color: '#767676' }}>Notifications</span>
            </Link>
            <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#191919', gap: 2, position: 'relative' }}>
              <ShoppingCart size={20} />
              <span style={{ fontSize: 11, color: '#767676' }}>Cart</span>
              <span style={{
                position: 'absolute', top: -4, right: -6,
                background: '#e53935', color: '#fff',
                borderRadius: '50%', width: 16, height: 16,
                fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700,
              }}>3</span>
            </Link>
            <Link to="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#191919', gap: 2 }}>
              <User size={20} />
              <span style={{ fontSize: 11, color: '#767676' }}>Sign In</span>
            </Link>
          </div>
        </div>

        {/* Sub-nav */}
        <nav style={{ display: 'flex', gap: 24, paddingBottom: 8, fontSize: 13, color: '#767676', borderTop: '1px solid #e0e0e0', paddingTop: 6, overflowX: 'auto' }}>
          {['My eBay', 'Daily Deals', 'Brand Outlet', 'Help & Contact'].map(item => (
            <Link key={item} to="/" style={{ textDecoration: 'none', color: '#767676', whiteSpace: 'nowrap' }}
              onMouseEnter={e => e.target.style.color = '#3665f3'}
              onMouseLeave={e => e.target.style.color = '#767676'}
            >{item}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
