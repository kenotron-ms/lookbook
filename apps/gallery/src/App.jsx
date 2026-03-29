import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ShotDetail from './pages/ShotDetail'
import Designers from './pages/Designers'
import Hire from './pages/Hire'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shot" element={<ShotDetail />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/hire" element={<Hire />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
