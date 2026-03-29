import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import TitleBar from './components/TitleBar'
import ActivityBar from './components/ActivityBar'
import FileExplorer from './components/FileExplorer'
import SearchPanel from './components/SearchPanel'
import ExtensionsPanel from './components/ExtensionsPanel'
import EditorArea from './components/EditorArea'
import StatusBar from './components/StatusBar'

function StudioLayout({ panel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <TitleBar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ActivityBar activePanel={panel} />
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {panel === 'explorer' && <FileExplorer />}
          {panel === 'search' && <SearchPanel />}
          {panel === 'extensions' && <ExtensionsPanel />}
          <EditorArea />
        </div>
      </div>
      <StatusBar />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<StudioLayout panel="explorer" />} />
        <Route path="/search" element={<StudioLayout panel="search" />} />
        <Route path="/extensions" element={<StudioLayout panel="extensions" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
