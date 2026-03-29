import { useState, useCallback } from 'react';
import { Grid3x3, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { sharedFiles } from '../data/files.js';
import ContextMenu from '../components/ContextMenu.jsx';

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

function SharedFileCard({ file, selected, onClick, onContextMenu }) {
  return (
    <div
      className={`file-card ${selected ? 'selected' : ''} flex flex-col`}
      onClick={onClick}
      onContextMenu={e => { e.preventDefault(); onContextMenu(e, file); }}
    >
      {/* Preview area */}
      <div
        className={`h-28 bg-gradient-to-br ${file.gradient} flex items-center justify-center relative`}
        style={{ borderRadius: '8px 8px 0 0' }}
      >
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <div className="w-5 h-5 bg-white/90 rounded-full" />
        </div>
        {/* Shared by badge */}
        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full backdrop-blur-sm">
          Shared
        </div>
      </div>
      {/* Info */}
      <div className="p-3 flex-1 flex flex-col gap-1">
        <p className="text-sm font-medium text-[#202124] truncate">{file.name}</p>
        <p className="text-xs text-[#5f6368]">{typeLabel[file.type]}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-medium shrink-0"
            style={{ background: typeColors[file.type] }}
          >
            {file.sharedBy[0]}
          </div>
          <p className="text-xs text-[#5f6368] truncate">Shared by {file.sharedBy}</p>
        </div>
      </div>
    </div>
  );
}

function SharedListRow({ file, selected, onClick, onContextMenu }) {
  return (
    <div
      className={`list-row ${selected ? 'selected' : ''}`}
      onClick={onClick}
      onContextMenu={e => { e.preventDefault(); onContextMenu(e, file); }}
    >
      <div className="w-8 h-8 rounded flex items-center justify-center shrink-0 mr-3" style={{ background: `${typeColors[file.type]}20` }}>
        <div className="w-3 h-3 rounded-full" style={{ background: typeColors[file.type] }} />
      </div>
      <span className="flex-1 text-sm text-[#202124] font-medium truncate mr-8">{file.name}</span>
      <span className="text-xs text-[#5f6368] w-40 shrink-0">{file.sharedBy}</span>
      <span className="text-xs text-[#5f6368] w-36 shrink-0">{file.modified}</span>
      <span className="text-xs text-[#5f6368] w-20 shrink-0 text-right">{file.size}</span>
    </div>
  );
}

export default function SharedWithMe() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedId, setSelectedId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();

  const handleContextMenu = useCallback((e, file) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, file });
    setSelectedId(file.id);
  }, []);

  return (
    <div className="p-6" onClick={() => { setSelectedId(null); setContextMenu(null); }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-normal text-[#202124]">Shared with me</h2>
        <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* People section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#5f6368] mb-3">People who shared with you</h3>
        <div className="flex gap-3 flex-wrap">
          {['Alex Chen', 'Maya Rodriguez', 'Sam Park', 'Jordan Lee', 'Priya Nair'].map((name, i) => {
            const colors = ['#1967d2', '#1e8e3e', '#f9ab00', '#d93025', '#7627bb'];
            return (
              <div key={name} className="flex flex-col items-center gap-1.5 cursor-pointer group">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-medium transition-shadow group-hover:shadow-md"
                  style={{ background: colors[i] }}
                >
                  {name[0]}
                </div>
                <p className="text-xs text-[#5f6368] text-center">{name.split(' ')[0]}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#e0e0e0] mb-5" />

      {/* Files */}
      <h3 className="text-sm font-medium text-[#5f6368] mb-3">Files shared with you</h3>

      {viewMode === 'grid' ? (
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
          {sharedFiles.map(file => (
            <SharedFileCard
              key={file.id}
              file={file}
              selected={selectedId === file.id}
              onClick={() => setSelectedId(file.id)}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
      ) : (
        <div>
          <div className="flex items-center px-3 py-2 text-xs font-medium text-[#5f6368] border-b border-[#e0e0e0] mb-1">
            <div className="w-8 mr-3" />
            <span className="flex-1">Name</span>
            <span className="w-40">Shared by</span>
            <span className="w-36">Last modified</span>
            <span className="w-20 text-right">Size</span>
          </div>
          {sharedFiles.map(file => (
            <SharedListRow
              key={file.id}
              file={file}
              selected={selectedId === file.id}
              onClick={() => setSelectedId(file.id)}
              onContextMenu={handleContextMenu}
            />
          ))}
        </div>
      )}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          file={contextMenu.file}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
}
