import { HashRouter, Routes, Route } from 'react-router-dom'
import MainView from './pages/MainView.jsx'
import StatusPage from './pages/StatusPage.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/status" element={<StatusPage />} />
      </Routes>
    </HashRouter>
  )
}
