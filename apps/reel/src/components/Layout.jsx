import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react'

export default function Layout() {
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    function handleResize() {
      setCollapsed(window.innerWidth < 1200)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isShortsPage = location.pathname === '/shorts'

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', marginTop: 56 }}>
        {!isShortsPage && <Sidebar collapsed={collapsed} />}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            marginLeft: isShortsPage ? 0 : 72,
            background: '#0f0f0f',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  )
}