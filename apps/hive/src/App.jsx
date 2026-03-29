import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import ServerView from './pages/ServerView'
import DMsView from './pages/DMsView'
import SettingsView from './pages/SettingsView'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<ServerView />} />
        <Route path="/dms" element={<DMsView />} />
        <Route path="/settings" element={<SettingsView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
