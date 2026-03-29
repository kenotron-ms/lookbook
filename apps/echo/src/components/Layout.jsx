import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'

export default function Layout() {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#e7e9ea' }}>
      <div
        style={{
          display: 'flex',
          maxWidth: '1265px',
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        <LeftSidebar />
        <main
          style={{
            flex: 1,
            maxWidth: '600px',
            borderLeft: '1px solid #2f3336',
            borderRight: '1px solid #2f3336',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </main>
        <RightSidebar />
      </div>
    </div>
  )
}
