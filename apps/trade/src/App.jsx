import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import StockDetail from './pages/StockDetail.jsx'
import Search from './pages/Search.jsx'
import Account from './pages/Account.jsx'
import BottomTabBar from './components/BottomTabBar.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ maxWidth: 448, margin: '0 auto', position: 'relative', minHeight: '100vh', background: '#fff' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock/:ticker" element={<StockDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <BottomTabBar />
      </div>
    </HashRouter>
  )
}
