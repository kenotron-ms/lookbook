import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import Home from './pages/Home.jsx'
import PageEditor from './pages/PageEditor.jsx'
import DatabaseTable from './pages/DatabaseTable.jsx'
import BoardView from './pages/BoardView.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', background: '#191919', color: '#e6e6e6', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', background: '#191919' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/page/feature-specs" element={<PageEditor />} />
            <Route path="/database/roadmap" element={<DatabaseTable />} />
            <Route path="/board/roadmap" element={<BoardView />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
