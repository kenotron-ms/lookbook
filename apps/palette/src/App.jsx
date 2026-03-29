import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Brand from './pages/Brand.jsx'
import Templates from './pages/Templates.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#ffffff' }}>
        <Header />
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/templates" element={<Templates />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}
