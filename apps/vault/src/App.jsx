import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Trade from './pages/Trade.jsx'
import Explore from './pages/Explore.jsx'
import Earn from './pages/Earn.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ background: '#ffffff', minHeight: '100vh', color: '#0a0b0d' }}>
        <Header />
        <main style={{ paddingTop: 64 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/earn" element={<Earn />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
