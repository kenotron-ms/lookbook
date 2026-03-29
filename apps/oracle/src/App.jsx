import { HashRouter, Routes, Route } from 'react-router-dom'
import Chat from './pages/Chat.jsx'
import Settings from './pages/Settings.jsx'
import Store from './pages/Store.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </HashRouter>
  )
}
