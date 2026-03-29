import { Folder, FileText, Table2, Presentation, FileImage, Star, MoreVertical, CheckSquare } from 'lucide-react';

function FileTypeIcon({ type, color }) {
  const size = 28;
  const props = { size, color };
  switch (type) {
    case 'folder': return <Folder {...props} fill={color} />;
    case 'doc': return <FileText {...props} />;
    case 'sheet': return <Table2 {...props} />;
    case 'slide': return <Presentation {...props} />;
    case 'pdf': return <FileText {...props} />;
    case 'image': return <FileImage {...props} />;
    default: return <FileText {...props} />;
  }
}

function FilePreviewArea({ file }) {
  if (file.type === 'folder') {
    return (
      <div
        className={`h-24 flex items-center justify-center bg-gradient-to-br ${file.gradient}`}
        style={{ borderRadius: '8px 8px 0 0' }}
      >
        <Folder size={48} fill="rgba(255,255,255,0.9)" color="rgba(255,255,255,0.9)" />
      </div>
    );
  }
  if (file.type === 'image') {
    return (
      <div
        className={`h-24 bg-gradient-to-br ${file.gradient}`}
        style={{ borderRadius: '8px 8px 0 0' }}
      />
    );
  }
  if (file.type === 'doc') {
    return (
      <div className="h-24 bg-[#f8f9fa] border-b border-[#e0e0e0] p-3" style={{ borderRadius: '8px 8px 0 0' }}>
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center shrink-0" style={{ background: '#4285f4' }}>
            <FileText size={12} color="white" />
          </div>
          <div className="flex-1 space-y-1 pt-0.5">
            {[80, 60, 90, 50, 70].map((w, i) => (
              <div key={i} className="h-1.5 rounded-full bg-[#dadce0]" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  if (file.type === 'sheet') {
    return (
      <div className="h-24 bg-[#f8f9fa] border-b border-[#e0e0e0] overflow-hidden" style={{ borderRadius: '8px 8px 0 0' }}>
        <div className="grid grid-cols-4 gap-px bg-[#e0e0e0] h-full p-0 m-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="bg-white" />
          ))}
        </div>
      </div>
    );
  }
  if (file.type === 'slide') {
    return (
      <div className="h-24 flex items-center justify-center border-b border-[#e0e0e0]" style={{ borderRadius: '8px 8px 0 0', background: '#fafafa' }}>
        <div className="w-28 h-16 rounded border border-[#e0e0e0] bg-white flex flex-col items-center justify-center gap-1 shadow-sm">
          <div className="w-16 h-1.5 rounded bg-[#f9ab00]" />
          <div className="w-10 h-1 rounded bg-[#e0e0e0]" />
          <div className="w-12 h-1 rounded bg-[#e0e0e0]" />
        </div>
      </div>
    );
  }
  if (file.type === 'pdf') {
    return (
      <div className="h-24 flex items-center justify-center border-b border-[#e0e0e0]" style={{ borderRadius: '8px 8px 0 0', background: '#fff5f4' }}>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-12 rounded border-2 border-[#d93025] flex items-center justify-center bg-white">
            <span className="text-[10px] font-bold text-[#d93025]">PDF</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-24 bg-[#f1f3f4] flex items-center justify-center border-b border-[#e0e0e0]" style={{ borderRadius: '8px 8px 0 0' }}>
      <FileTypeIcon type={file.type} color={file.color} />
    </div>
  );
}

export default function FileCard({ file, selected, onClick, onContextMenu }) {
  return (
    <div
      className={`file-card ${selected ? 'selected' : ''}`}
      onClick={onClick}
      onContextMenu={e => {
        e.preventDefault();
        onContextMenu(e, file);
      }}
    >
      <FilePreviewArea file={file} />
      <div className="px-3 py-2 flex items-center gap-2">
        <FileTypeIcon type={file.type} color={file.color} />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#202124] truncate">{file.name}</p>
          {file.type !== 'folder' && (
            <p className="text-xs text-[#5f6368] truncate">{file.modified}</p>
          )}
        </div>
        {/* Actions (shown on hover/selected via CSS) */}
        <div className="card-actions flex items-center gap-1">
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#e8eaed] transition-colors"
            onClick={e => e.stopPropagation()}
          >
            <Star size={14} className="text-[#5f6368]" />
          </button>
          <button
            className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[#e8eaed] transition-colors"
            onClick={e => {
              e.stopPropagation();
              onContextMenu(e, file);
            }}
          >
            <MoreVertical size={14} className="text-[#5f6368]" />
          </button>
        </div>
      </div>
      {/* Checkbox (top-left, shown on hover) */}
      <div className="card-actions absolute top-2 left-2">
        <button
          className="w-6 h-6 flex items-center justify-center rounded bg-white/80 hover:bg-white transition-colors"
          onClick={e => {
            e.stopPropagation();
            onClick();
          }}
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}
        >
          {selected
            ? <div className="w-4 h-4 rounded bg-[#1967d2] flex items-center justify-center"><span className="text-white text-[8px]">✓</span></div>
            : <div className="w-4 h-4 rounded border-2 border-[#5f6368]" />
          }
        </button>
      </div>
    </div>
  );
}
