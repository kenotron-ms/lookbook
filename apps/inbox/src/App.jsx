import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import EmailList from './pages/EmailList'
import EmailThread from './pages/EmailThread'
import Compose from './pages/Compose'
import Settings from './pages/Settings'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<EmailList />} />
          <Route path="email" element={<EmailThread />} />
          <Route path="compose" element={<Compose />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
