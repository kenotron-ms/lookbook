import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Editor from './pages/Editor.jsx'
import Work from './pages/Work.jsx'
import PenDetail from './pages/PenDetail.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/work" element={<Work />} />
        <Route path="/pen" element={<PenDetail />} />
      </Routes>
    </HashRouter>
  )
}
