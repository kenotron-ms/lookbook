import { Outlet } from 'react-router-dom'
import Header from './Header'

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', background: '#141414' }}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
