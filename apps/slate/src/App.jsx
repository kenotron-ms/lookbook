import { HashRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Today from './pages/Today.jsx'
import Inbox from './pages/Inbox.jsx'
import Project from './pages/Project.jsx'
import Upcoming from './pages/Upcoming.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', background: '#1f1f1f', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Today />} />
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/project" element={<Project />} />
            <Route path="/upcoming" element={<Upcoming />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
