import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Repository from './pages/Repository.jsx'
import PullRequests from './pages/PullRequests.jsx'
import Issues from './pages/Issues.jsx'
import Profile from './pages/Profile.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#0d1117' }}>
        <Header />
        <main style={{ paddingTop: '60px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/repo" element={<Repository />} />
            <Route path="/pulls" element={<PullRequests />} />
            <Route path="/issues" element={<Issues />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}
