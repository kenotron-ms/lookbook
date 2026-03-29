import { HashRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import ChannelView from './pages/ChannelView'
import DMView from './pages/DMView'
import Canvas from './pages/Canvas'
import Settings from './pages/Settings'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#fff' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>
          <Routes>
            <Route path="/" element={<ChannelView />} />
            <Route path="/dm" element={<DMView />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
