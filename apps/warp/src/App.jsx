import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import MainView from './pages/MainView'
import ChannelsPage from './pages/ChannelsPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainView />} />
        <Route path="/channels" element={<ChannelsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}