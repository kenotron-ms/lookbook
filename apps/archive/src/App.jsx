import { HashRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header.jsx';
import Sidebar from './components/Sidebar.jsx';
import MyDrive from './pages/MyDrive.jsx';
import FilePreview from './pages/FilePreview.jsx';
import SharedWithMe from './pages/SharedWithMe.jsx';
import SearchResults from './pages/SearchResults.jsx';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex pt-16">
          <Sidebar />
          <main style={{ marginLeft: 240, flex: 1, minHeight: 'calc(100vh - 64px)' }}>
            <Routes>
              <Route path="/" element={<MyDrive />} />
              <Route path="/preview" element={<FilePreview />} />
              <Route path="/shared" element={<SharedWithMe />} />
              <Route path="/search" element={<SearchResults query={searchQuery} />} />
              <Route path="*" element={<MyDrive />} />
            </Routes>
          </main>
        </div>
      </div>
    </HashRouter>
  );
}
