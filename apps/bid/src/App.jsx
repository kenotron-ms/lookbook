import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ListingDetail from './pages/ListingDetail'
import Search from './pages/Search'
import BidHistory from './pages/BidHistory'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<ListingDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/bidhistory" element={<BidHistory />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
