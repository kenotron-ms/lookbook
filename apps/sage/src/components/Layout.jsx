import { useState, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import ArtifactsPanel from './ArtifactsPanel'

export const ArtifactContext = createContext(null)

export default function Layout() {
  const [artifact, setArtifact] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // Auto-collapse sidebar when artifact panel opens; restore on close
  const handleSetArtifact = (a) => {
    setArtifact(a)
    if (a) setSidebarCollapsed(true)
    else setSidebarCollapsed(false)
  }

  return (
    <ArtifactContext.Provider value={{ artifact, setArtifact: handleSetArtifact }}>
      <div style={{ display: 'flex', height: '100vh', background: '#F8F8F6', overflow: 'hidden' }}>
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(v => !v)}
        />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <Outlet />
        </main>
        {artifact && <ArtifactsPanel artifact={artifact} onClose={() => handleSetArtifact(null)} />}
      </div>
    </ArtifactContext.Provider>
  )
}
