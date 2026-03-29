import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Groups from './pages/Groups.jsx'
import Marketplace from './pages/Marketplace.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <HashRouter>
      <Header />
      <div style={{ paddingTop: 56, minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
