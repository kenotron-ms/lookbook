import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Community from './pages/Community.jsx'
import PostDetail from './pages/PostDetail.jsx'
import Submit from './pages/Submit.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/g/:communityId" element={<Community />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/submit" element={<Submit />} />
      </Routes>
    </HashRouter>
  )
}
