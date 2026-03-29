import { HashRouter, Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Clapperboard, Search, Bookmark, Menu, Star, ChevronDown } from 'lucide-react'
import Home from './pages/Home.jsx'
import TitleDetail from './pages/TitleDetail.jsx'
import Charts from './pages/Charts.jsx'
import SearchResults from './pages/Search.jsx'
import { useState } from 'react'

const NAV_LINKS = ['Movies', 'TV Shows', 'Awards', 'Watch', 'Celeb', 'Events', 'News']

function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    if (e.key === 'Enter' && query.trim()) {
      navigate('/search')
    }
  }

  return (
    <header style={{ background: '#121212', borderBottom: '1px solid #2a2a2a', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '0 24px', height: 52 }}>
        {/* Logo */}
        <NavLink to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', flexShrink: 0 }}>
          <div style={{ background: '#f5c518', borderRadius: 4, padding: '4px 6px', display: 'flex', alignItems: 'center' }}>
            <Clapperboard size={18} color="#000" />
          </div>
          <span style={{ color: '#f5c518', fontWeight: 900, fontSize: 20, letterSpacing: '-0.5px' }}>Screen</span>
        </NavLink>

        {/* Search bar */}
        <div style={{ flex: 1, display: 'flex', maxWidth: 640 }}>
          <input
            className="search-input"
            style={{ width: '100%', borderRadius: '4px 0 0 4px', borderRight: 'none' }}
            placeholder="Titles, people, companies"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleSearch}
          />
          <button
            onClick={() => navigate('/search')}
            style={{ background: '#f5c518', border: 'none', padding: '0 14px', borderRadius: '0 4px 4px 0', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Search size={16} color="#000" />
          </button>
        </div>

        {/* Right nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginLeft: 'auto', flexShrink: 0 }}>
          <NavLink to="/charts" style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#f5f5f5', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
            <Bookmark size={15} />
            Watchlist
          </NavLink>
          <button className="btn-outline" style={{ padding: '5px 14px', fontSize: 13 }}>Sign In</button>
          <button style={{ background: 'transparent', border: 'none', color: '#f5f5f5', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13 }}>
            <Menu size={18} />
            Menu
          </button>
        </div>
      </div>

      {/* Second nav row */}
      <div style={{ background: '#1f1f1f', padding: '0 24px', height: 40, display: 'flex', alignItems: 'center', gap: 4, overflowX: 'auto' }}>
        {NAV_LINKS.map(link => (
          <button
            key={link}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#d5d5d5',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              padding: '0 14px',
              height: '100%',
              whiteSpace: 'nowrap',
              borderBottom: '2px solid transparent',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderBottomColor = '#f5c518' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#d5d5d5'; e.currentTarget.style.borderBottomColor = 'transparent' }}
          >
            {link}
          </button>
        ))}
      </div>
    </header>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Header />
      <div style={{ paddingTop: 92 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/title" element={<TitleDetail />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
