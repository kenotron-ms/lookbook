import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import Home from './pages/Home'
import Editor from './pages/Editor'
import Prototype from './pages/Prototype'
import Community from './pages/Community'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/prototype" element={<Prototype />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  )
}
