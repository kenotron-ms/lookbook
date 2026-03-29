import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Results from './pages/Results'
import Property from './pages/Property'
import Confirm from './pages/Confirm'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#f2f2f2' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/property" element={<Property />} />
          <Route path="/confirm" element={<Confirm />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
