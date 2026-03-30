import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { ComposeProvider, useCompose } from '../context/ComposeContext.jsx'
import ComposeModal from './ComposeModal.jsx'

function LayoutInner() {
  const { open, replyTo, closeCompose } = useCompose()

  return (
    <>
      <div
        style={{
          display: 'flex',
          maxWidth: 1265,
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        <LeftSidebar />
        <main
          style={{
            flex: 1,
            maxWidth: 600,
            borderLeft: '1px solid var(--border)',
            borderRight: '1px solid var(--border)',
            minHeight: '100vh',
          }}
        >
          <Outlet />
        </main>
        <RightSidebar />
      </div>
      <ComposeModal open={open} onClose={closeCompose} replyTo={replyTo} />
    </>
  )
}

export default function Layout() {
  return (
    <ComposeProvider>
      <LayoutInner />
    </ComposeProvider>
  )
}
