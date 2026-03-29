import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Table2, Presentation, FileImage, Folder, Clock } from 'lucide-react';
import { mockFiles, recentFiles } from '../data/files.js';

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

const filterTypes = [
  { label: 'Documents', type: 'doc', icon: FileText },
  { label: 'Spreadsheets', type: 'sheet', icon: Table2 },
  { label: 'PDFs', type: 'pdf', icon: FileText },
  { label: 'Folders', type: 'folder', icon: Folder },
  { label: 'Images', type: 'image', icon: FileImage },
];

export default function SearchResults({ query = '' }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const navigate = useNavigate();

  const filteredFiles = mockFiles.filter(file => {
    const matchesQuery = !query || file.name.toLowerCase().includes(query.toLowerCase());
    const matchesType = !activeFilter || file.type === activeFilter;
    return matchesQuery && matchesType;
  });

  const displayQuery = query || 'design';

  return (
    <div className="p-6">
      <h2 className="text-xl font-normal text-[#202124] mb-5">
        Search results for "<span className="font-medium">{displayQuery}</span>"
      </h2>

      {/* Filter pills */}
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filterTypes.map(({ label, type, icon: Icon }) => (
          <button
            key={type}
            onClick={() => setActiveFilter(activeFilter === type ? null : type)}
            className={`filter-pill ${activeFilter === type ? 'active' : ''}`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {/* Suggested / Recently accessed */}
      {!query && (
        <div className="mb-8">
          <h3 className="text-sm font-medium text-[#5f6368] mb-3">Suggested</h3>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {recentFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center gap-3 bg-white rounded-xl border border-[#e0e0e0] px-3 py-2.5 hover:shadow-md transition-shadow cursor-pointer shrink-0"
                style={{ minWidth: 200 }}
                onClick={() => navigate('/preview', { state: { file } })}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${typeColors[file.type]}15` }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: typeColors[file.type] }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#202124] truncate">{file.name}</p>
                  <p className="text-xs text-[#5f6368]">{typeLabel[file.type]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-[#5f6368] mb-3">{filteredFiles.length} results</p>

      {/* Column headers */}
      <div className="flex items-center px-3 py-2 text-xs font-medium text-[#5f6368] border-b border-[#e0e0e0] mb-1">
        <div className="w-10 mr-3 shrink-0" />
        <span className="flex-1">Name</span>
        <span className="w-40 shrink-0">Location</span>
        <span className="w-36 shrink-0">Last modified</span>
        <span className="w-20 shrink-0 text-right">Size</span>
      </div>

      {/* Result rows */}
      <div>
        {filteredFiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-[#5f6368]">
            <div className="w-16 h-16 rounded-full bg-[#f1f3f4] flex items-center justify-center mb-4">
              <FileText size={28} className="text-[#bdc1c6]" />
            </div>
            <p className="text-base font-medium text-[#202124] mb-1">No results found</p>
            <p className="text-sm">Try a different search query or filter</p>
          </div>
        ) : (
          filteredFiles.map(file => (
            <div
              key={file.id}
              className="list-row"
              onClick={() => file.type !== 'folder' && navigate('/preview', { state: { file } })}
            >
              {/* Type icon */}
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mr-3" style={{ background: `${typeColors[file.type]}15` }}>
                <div className="w-4 h-4 rounded-full" style={{ background: typeColors[file.type] }} />
              </div>
              {/* Name + type */}
              <div className="flex-1 min-w-0 mr-8">
                <p className="text-sm font-medium text-[#202124] truncate">{file.name}</p>
                <p className="text-xs text-[#5f6368]">{typeLabel[file.type]}</p>
              </div>
              {/* Location */}
              <div className="w-40 shrink-0 flex items-center gap-1">
                <Folder size={12} className="text-[#5f6368] shrink-0" />
                <span className="text-xs text-[#5f6368] truncate">My Drive / Projects</span>
              </div>
              {/* Modified */}
              <div className="w-36 shrink-0 flex items-center gap-1">
                <Clock size={12} className="text-[#5f6368] shrink-0" />
                <span className="text-xs text-[#5f6368]">{file.modified}</span>
              </div>
              {/* Size */}
              <span className="w-20 shrink-0 text-right text-xs text-[#5f6368]">{file.size}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
