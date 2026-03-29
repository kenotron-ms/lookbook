import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import KanbanBoard from './pages/KanbanBoard.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Templates from './pages/Templates.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/board" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/board" element={<KanbanBoard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
