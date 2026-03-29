import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, MapPin, Search, ChevronDown, Menu, RotateCcw } from 'lucide-react'

const categories = ['All', 'Electronics', 'Kitchen', 'Books', 'Clothing', 'Sports', 'Prime']

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/category')
  }

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      {/* Top bar */}
      <div style={{ background: '#131921', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, padding: '4px 8px', borderRadius: '4px', border: '1px solid transparent' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
          <ShoppingCart size={28} color="#ff9900" />
          <div>
            <span style={{ color: 'white', fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px' }}>Bazaar</span>
            <div style={{ color: '#ff9900', fontSize: '10px', fontWeight: 600, letterSpacing: '0.5px', marginTop: '-2px' }}>
              .paranet
            </div>
          </div>
        </Link>

        {/* Delivery address */}
        <Link to="/" style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', color: 'white', flexShrink: 0, padding: '4px 6px', borderRadius: '4px', border: '1px solid transparent' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
          <MapPin size={18} color="#ccc" style={{ marginBottom: '2px' }} />
          <div>
            <div style={{ color: '#ccc', fontSize: '11px' }}>Deliver to</div>
            <div style={{ fontWeight: 700, fontSize: '13px' }}>ParaNet HQ</div>
          </div>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', height: '40px', borderRadius: '4px', overflow: 'hidden' }}>
          <select
            value={selectedCat}
            onChange={e => setSelectedCat(e.target.value)}
            style={{
              background: '#f3f3f3',
              border: 'none',
              padding: '0 8px',
              fontSize: '12px',
              color: '#0f1111',
              cursor: 'pointer',
              borderRight: '1px solid #ccc',
              outline: 'none',
              minWidth: '90px',
              borderRadius: '4px 0 0 4px',
            }}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search Bazaar"
            style={{
              flex: 1,
              border: 'none',
              padding: '0 12px',
              fontSize: '14px',
              outline: 'none',
              color: '#0f1111',
            }}
          />
          <button
            type="submit"
            style={{
              background: '#ff9900',
              border: 'none',
              padding: '0 14px',
              cursor: 'pointer',
              borderRadius: '0 4px 4px 0',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#e88b00'}
            onMouseLeave={e => e.currentTarget.style.background = '#ff9900'}>
            <Search size={20} color="#131921" />
          </button>
        </form>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
          {/* Returns & Orders */}
          <Link to="/" style={{ color: 'white', padding: '4px 8px', borderRadius: '4px', border: '1px solid transparent', display: 'flex', alignItems: 'center', gap: '6px' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
            <RotateCcw size={22} color="#ccc" />
            <div>
              <div style={{ fontSize: '11px', color: '#ccc' }}>Returns</div>
              <div style={{ fontWeight: 700, fontSize: '13px' }}>&amp; Orders</div>
            </div>
          </Link>

          {/* Cart */}
          <Link to="/cart" style={{ color: 'white', padding: '4px 8px', borderRadius: '4px', border: '1px solid transparent', display: 'flex', alignItems: 'center', gap: '4px' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={32} />
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ff9900',
                color: '#131921',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>3</span>
            </div>
            <div style={{ fontWeight: 700, fontSize: '13px', alignSelf: 'flex-end', paddingBottom: '2px' }}>Cart</div>
          </Link>
        </div>
      </div>

      {/* Second row nav */}
      <div style={{ background: '#232f3e', padding: '4px 16px', display: 'flex', gap: '4px', alignItems: 'center' }}>
        <Link to="/category" style={{ color: 'white', padding: '6px 10px', borderRadius: '3px', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', border: '1px solid transparent' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
          <Menu size={18} /> All
        </Link>
        {['Today\'s Deals', 'Fresh', 'Electronics', 'Prime', 'Buy Again', 'Gift Cards'].map(item => (
          <Link key={item} to="/category" style={{ color: 'white', padding: '6px 10px', borderRadius: '3px', fontSize: '13px', border: '1px solid transparent', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'white'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'transparent'}>
            {item}
          </Link>
        ))}
      </div>
    </header>
  )
}
