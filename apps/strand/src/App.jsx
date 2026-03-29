import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Browse from './pages/Browse'
import TitleDetail from './pages/TitleDetail'
import Search from './pages/Search'
import MyList from './pages/MyList'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Browse />} />
          <Route path="/title" element={<TitleDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mylist" element={<MyList />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
