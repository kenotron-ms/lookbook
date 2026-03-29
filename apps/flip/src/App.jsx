import { HashRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Feed from './pages/Feed'
import Explore from './pages/Explore'
import Profile from './pages/Profile'
import Studio from './pages/Studio'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', background: '#000', overflow: 'hidden' }}>
        <Sidebar />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/studio" element={<Studio />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
