import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Book from './pages/Book.jsx'
import Confirm from './pages/Confirm.jsx'
import Scheduled from './pages/Scheduled.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/scheduled" element={<Scheduled />} />
      </Routes>
    </HashRouter>
  )
}