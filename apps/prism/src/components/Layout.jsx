import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

export default function Layout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#000' }}>
      <LeftSidebar />
      <main
        style={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '100%', maxWidth: '935px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
