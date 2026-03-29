import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import CategoryBar from './components/CategoryBar'
import Home from './pages/Home'
import ListingDetail from './pages/ListingDetail'
import SearchResults from './pages/SearchResults'
import BecomeHost from './pages/BecomeHost'

function AppContent() {
  const location = useLocation()
  const showCategoryBar = location.pathname === '/'

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#222222' }}>
      <Header />
      {showCategoryBar && <CategoryBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<ListingDetail />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/host" element={<BecomeHost />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}
