import { useState, createContext } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import ArtifactsPanel from './ArtifactsPanel'

export const ArtifactContext = createContext(null)

export default function Layout() {
  const [artifact, setArtifact] = useState(null)

  return (
    <ArtifactContext.Provider value={{ artifact, setArtifact }}>
      <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
          <Outlet />
        </main>
        {artifact && <ArtifactsPanel artifact={artifact} onClose={() => setArtifact(null)} />}
      </div>
    </ArtifactContext.Provider>
  )
}
