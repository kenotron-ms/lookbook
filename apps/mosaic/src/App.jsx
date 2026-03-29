import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import PinDetail from './pages/PinDetail.jsx'
import Create from './pages/Create.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <Header />
        <main style={{ paddingTop: 60 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pin" element={<PinDetail />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
