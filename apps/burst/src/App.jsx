import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Browse from './pages/Browse.jsx'
import Watch from './pages/Watch.jsx'
import Following from './pages/Following.jsx'
import Directory from './pages/Directory.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#0e0e10', color: '#efeff1' }}>
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto" style={{ background: '#0e0e10' }}>
            <Routes>
              <Route path="/" element={<Browse />} />
              <Route path="/watch" element={<Watch />} />
              <Route path="/following" element={<Following />} />
              <Route path="/directory" element={<Directory />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
