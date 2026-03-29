import { HashRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'
import Payments from './pages/Payments'
import Customers from './pages/Customers'
import Developers from './pages/Developers'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', background: '#f5f5f5', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', minWidth: 0 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
