import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Watch from './pages/Watch'
import Search from './pages/Search'
import Shorts from './pages/Shorts'
import Channel from './pages/Channel'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="watch" element={<Watch />} />
          <Route path="search" element={<Search />} />
          <Route path="shorts" element={<Shorts />} />
          <Route path="channel" element={<Channel />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}