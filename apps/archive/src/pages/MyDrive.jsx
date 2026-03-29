import { useState, useCallback } from 'react';
import { Grid3x3, List, ChevronRight, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockFiles, breadcrumbs } from '../data/files.js';
import FileCard from '../components/FileCard.jsx';
import ContextMenu from '../components/ContextMenu.jsx';

function FileTypeIcon({ type, color }) {
  const icons = {
    folder: '📁',
    doc: '📄',
    sheet: '📊',
    slide: '📑',
    pdf: '📕',
    image: '🖼',
  };
  return null;
}

function ListRow({ file, selected, onClick, onContextMenu }) {
  const typeColors = {
    folder: '#1967d2',
    doc: '#4285f4',
    sheet: '#1e8e3e',
    slide: '#f9ab00',
    pdf: '#d93025',
    image: '#e91e8c',
  };
  const typeLabel = {
    folder: 'Folder',
    doc: 'Google Doc',
    sheet: 'Google Sheet',
    slide: 'Google Slides',
    pdf: 'PDF',
    image: 'Image',
  };

  return (
    <div
      className={`list-row ${selected ? 'selected' : ''}`}
      onClick={onClick}
      onContextMenu={e => { e.preventDefault(); onContextMenu(e, file); }}
    >
      {/* Color dot indicator */}
      <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mr-3" style={{ background: `${typeColors[file.type]}20` }}>
        <div className="w-3 h-3 rounded-full" style={{ background: typeColors[file.type] }} />
      </div>
      {/* Name */}
      <span className="flex-1 text-sm text-[#202124] font-medium truncate mr-8">{file.name}</span>
      {/* Type */}
      <span className="text-xs text-[#5f6368] w-32 shrink-0">{typeLabel[file.type]}</span>
      {/* Modified */}
      <span className="text-xs text-[#5f6368] w-36 shrink-0">{file.modified}</span>
      {/* Size */}
      <span className="text-xs text-[#5f6368] w-20 shrink-0 text-right">{file.size}</span>
    </div>
  );
}

export default function MyDrive() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedId, setSelectedId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

  const handleContextMenu = useCallback((e, file) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
    setSelectedId(file.id);
  }, []);

  const handleCloseContextMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  function handleFileClick(file) {
    setSelectedId(file.id);
    if (file.type !== 'folder') {
      // double-click would navigate, single click just selects
    }
  }

  function handleFileDoubleClick(file) {
    if (file.type !== 'folder') {
      navigate('/preview', { state: { file } });
    }
  }

  return (
    <div className="p-6" onClick={() => { setSelectedId(null); setContextMenu(null); }}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 mb-6">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb} className="flex items-center gap-1">
            {i > 0 && <ChevronRight size={16} className="text-[#5f6368]" />}
            <button
              className={`text-sm font-medium px-2 py-1 rounded-full hover:bg-[#f1f3f4] transition-colors ${i === breadcrumbs.length - 1 ? 'text-[#202124]' : 'text-[#1967d2]'}`}
            >
              {crumb}
            </button>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-normal text-[#202124]">My Drive</h2>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex items-center border border-[#dadce0] rounded-lg overflow-hidden">
            <button
              onClick={e => { e.stopPropagation(); setViewMode('grid'); }}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#e8f0fe]' : 'hover:bg-[#f8f9fa]'}`}
            >
              <Grid3x3 size={18} style={{ color: viewMode === 'grid' ? '#1967d2' : '#5f6368' }} />
            </button>
            <button
              onClick={e => { e.stopPropagation(); setViewMode('list'); }}
              className={`w-9 h-9 flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#e8f0fe]' : 'hover:bg-[#f8f9fa]'}`}
            >
              <List size={18} style={{ color: viewMode === 'list' ? '#1967d2' : '#5f6368' }} />
            </button>
          </div>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors">
            <Info size={18} className="text-[#5f6368]" />
          </button>
        </div>
      </div>

      {/* Suggested section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#5f6368] mb-3">Suggested</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {mockFiles.filter(f => f.type !== 'folder').slice(0, 5).map(file => (
            <div
              key={file.id}
              className="flex items-center gap-3 bg-white rounded-xl border border-[#e0e0e0] px-3 py-2.5 hover:shadow-md transition-shadow cursor-pointer shrink-0"
              style={{ minWidth: 200 }}
              onClick={e => { e.stopPropagation(); navigate('/preview', { state: { file } }); }}
            >
              <div className="w-8 h-8 rounded flex items-center justify-center shrink-0" style={{ background: `${file.color}20` }}>
                <div className="w-3 h-3 rounded-full" style={{ background: file.color }} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-[#202124] truncate">{file.name}</p>
                <p className="text-xs text-[#5f6368]">Opened {file.modified}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#e0e0e0] mb-5" />

      {/* Folders section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#5f6368] mb-3">Folders</h3>
        {viewMode === 'grid' ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {mockFiles.filter(f => f.type === 'folder').map(file => (
              <FileCard
                key={file.id}
                file={file}
                selected={selectedId === file.id}
                onClick={() => { handleFileClick(file); }}
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
        ) : (
          <div>
            <div className="flex items-center px-3 py-2 text-xs font-medium text-[#5f6368] border-b border-[#e0e0e0] mb-1">
              <div className="w-8 mr-3" />
              <span className="flex-1">Name</span>
              <span className="w-32">Type</span>
              <span className="w-36">Last modified</span>
              <span className="w-20 text-right">File size</span>
            </div>
            {mockFiles.filter(f => f.type === 'folder').map(file => (
              <ListRow key={file.id} file={file} selected={selectedId === file.id} onClick={() => handleFileClick(file)} onContextMenu={handleContextMenu} />
            ))}
          </div>
        )}
      </div>

      {/* Files section */}
      <div>
        <h3 className="text-sm font-medium text-[#5f6368] mb-3">Files</h3>
        {viewMode === 'grid' ? (
          <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
            {mockFiles.filter(f => f.type !== 'folder').map(file => (
              <FileCard
                key={file.id}
                file={file}
                selected={selectedId === file.id}
                onClick={() => handleFileClick(file)}
                onContextMenu={handleContextMenu}
              />
            ))}
          </div>
        ) : (
          <div>
            {!mockFiles.find(f => f.type === 'folder') && (
              <div className="flex items-center px-3 py-2 text-xs font-medium text-[#5f6368] border-b border-[#e0e0e0] mb-1">
                <div className="w-8 mr-3" />
                <span className="flex-1">Name</span>
                <span className="w-32">Type</span>
                <span className="w-36">Last modified</span>
                <span className="w-20 text-right">File size</span>
              </div>
            )}
            {mockFiles.filter(f => f.type !== 'folder').map(file => (
              <ListRow key={file.id} file={file} selected={selectedId === file.id} onClick={() => handleFileClick(file)} onContextMenu={handleContextMenu} />
            ))}
          </div>
        )}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          file={contextMenu.file}
          onClose={handleCloseContextMenu}
        />
      )}
    </div>
  );
}
