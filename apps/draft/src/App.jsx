import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import DocEditor from './pages/DocEditor.jsx'
import Templates from './pages/Templates.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doc" element={<DocEditor />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  )
}