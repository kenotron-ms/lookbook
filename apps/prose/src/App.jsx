import { BrowserRouter, Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { PenLine, Search, Bell, Bookmark, User } from 'lucide-react'
import { useState } from 'react'
import Home from './pages/Home.jsx'
import Article from './pages/Article.jsx'
import Write from './pages/Write.jsx'
import Profile from './pages/Profile.jsx'

function Header({ loggedIn, onToggleLogin }) {
  const navigate = useNavigate()
  const location = useLocation()
  const isWrite = location.pathname === '/write'

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #e8e8e8',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
    }}>
      {/* Left: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
        onClick={() => navigate('/')}>
        <PenLine size={28} color="#000000" strokeWidth={2} />
        <span style={{ fontSize: 22, fontWeight: 800, color: '#000000', letterSpacing: '-0.5px', fontFamily: 'Inter, sans-serif' }}>
          Prose
        </span>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {loggedIn ? (
          <>
            <button style={{ background: 'none', border: 'none', color: '#6b6b6b', display: 'flex', alignItems: 'center', padding: 8, borderRadius: 4 }}
              onClick={() => navigate('/')}>
              <Search size={20} />
            </button>
            <button
              onClick={() => navigate('/write')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none',
                color: '#6b6b6b', fontSize: 14, fontWeight: 400,
                padding: '8px 12px', borderRadius: 4,
                fontFamily: 'Inter, sans-serif',
              }}>
              <PenLine size={16} />
              Write
            </button>
            <button style={{ background: 'none', border: 'none', color: '#6b6b6b', display: 'flex', alignItems: 'center', padding: 8 }}>
              <Bell size={20} />
            </button>
            <button
              onClick={() => navigate('/profile')}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: '#1a8917', color: '#fff',
                border: 'none', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 13, fontWeight: 600,
                fontFamily: 'Inter, sans-serif',
              }}>
              SC
            </button>
          </>
        ) : (
          <>
            <button style={{ background: 'none', border: 'none', color: '#6b6b6b', display: 'flex', alignItems: 'center', padding: 8 }}>
              <Search size={20} />
            </button>
            <button
              onClick={() => navigate('/write')}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'none', border: 'none',
                color: '#6b6b6b', fontSize: 14, fontWeight: 400,
                padding: '8px 12px', borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}>
              <PenLine size={16} />
              Write
            </button>
            <button
              onClick={onToggleLogin}
              style={{
                background: 'none', border: 'none',
                color: '#242424', fontSize: 14,
                padding: '8px 12px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}>
              Sign In
            </button>
            <button
              onClick={onToggleLogin}
              style={{
                background: '#242424', color: '#ffffff',
                border: 'none', borderRadius: 9999,
                fontSize: 14, fontWeight: 500,
                padding: '8px 20px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
              }}>
              Get started
            </button>
          </>
        )}
      </div>
    </header>
  )
}

function AppInner() {
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const isWrite = location.pathname === '/write'

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {!isWrite && <Header loggedIn={loggedIn} onToggleLogin={() => setLoggedIn(v => !v)} />}
      {isWrite && (
        <WriteHeader loggedIn={loggedIn} />
      )}
      <div style={{ paddingTop: isWrite ? 0 : 64 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/write" element={<Write />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  )
}

function WriteHeader({ loggedIn }) {
  const navigate = useNavigate()
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: '#ffffff', borderBottom: '1px solid #e8e8e8',
      height: 64, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => navigate('/')}>
        <PenLine size={24} color="#000000" strokeWidth={2} />
        <span style={{ fontSize: 18, fontWeight: 800, color: '#000000', fontFamily: 'Inter, sans-serif' }}>Prose</span>
        <span style={{ fontSize: 14, color: '#6b6b6b', marginLeft: 8, fontFamily: 'Inter, sans-serif' }}>Draft</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, color: '#6b6b6b', fontFamily: 'Inter, sans-serif' }}>Saved</span>
        <button style={{
          background: 'none', border: '1px solid #e0e0e0',
          borderRadius: 9999, fontSize: 14, fontWeight: 500,
          padding: '7px 18px', cursor: 'pointer', color: '#6b6b6b',
          fontFamily: 'Inter, sans-serif',
        }}>Save draft</button>
        <button style={{
          background: '#1a8917', color: '#ffffff',
          border: 'none', borderRadius: 9999,
          fontSize: 14, fontWeight: 500,
          padding: '8px 20px', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif',
        }}>Publish</button>
      </div>
    </header>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}