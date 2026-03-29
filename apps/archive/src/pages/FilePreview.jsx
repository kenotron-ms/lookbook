import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Star, Download, MoreVertical, ExternalLink, Clock, Eye, ChevronDown, Link2, Users } from 'lucide-react';
import { mockFiles } from '../data/files.js';

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
  pdf: 'PDF Document',
  image: 'Image',
};

const activityLog = [
  { action: 'You edited this', time: 'Today at 9:14 AM' },
  { action: 'Alex Chen viewed', time: 'Today at 8:52 AM' },
  { action: 'Maya Rodriguez commented', time: 'Yesterday at 4:30 PM' },
  { action: 'Sam Park viewed', time: 'Yesterday at 2:15 PM' },
  { action: 'You created this', time: 'Mar 20, 2026' },
];

export default function FilePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const file = location.state?.file || mockFiles[5]; // fallback to first doc

  const docColor = typeColors[file.type] || '#4285f4';

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Preview toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#e0e0e0] bg-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors"
          >
            <ArrowLeft size={20} className="text-[#5f6368]" />
          </button>
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: `${docColor}20` }}>
            <div className="w-3 h-3 rounded-full" style={{ background: docColor }} />
          </div>
          <div>
            <h1 className="text-[15px] font-medium text-[#202124]">{file.name}</h1>
            <p className="text-xs text-[#5f6368]">{typeLabel[file.type]}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-9 px-4 rounded-full border border-[#dadce0] text-sm font-medium text-[#3c4043] hover:bg-[#f8f9fa] transition-colors">
            <Share2 size={16} />
            Share
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f3f4]">
            <Star size={18} className="text-[#5f6368]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f3f4]">
            <Download size={18} className="text-[#5f6368]" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#f1f3f4]">
            <MoreVertical size={18} className="text-[#5f6368]" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Document preview area */}
        <div className="flex-1 overflow-auto bg-[#f1f3f4] flex items-start justify-center p-8">
          <div className="bg-white shadow-md rounded-sm" style={{ width: 680, minHeight: 880 }}>
            {/* Document header area */}
            <div className="px-16 pt-16 pb-8 border-b border-[#e0e0e0]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded flex items-center justify-center" style={{ background: `${docColor}20` }}>
                  <div className="w-4 h-4 rounded-full" style={{ background: docColor }} />
                </div>
                <div>
                  <p className="text-xs font-medium text-[#5f6368] uppercase tracking-wide">{typeLabel[file.type]}</p>
                </div>
              </div>
              <h2 className="text-3xl font-semibold text-[#202124] mb-3">{file.name}</h2>
              <div className="flex items-center gap-4 text-sm text-[#5f6368]">
                <span>Ken</span>
                <span>·</span>
                <span>{file.modified}</span>
              </div>
            </div>

            {/* Simulated content */}
            <div className="px-16 py-10 space-y-6">
              {/* Simulated heading */}
              <div className="space-y-2">
                <div className="h-5 rounded-full bg-[#e8eaed]" style={{ width: '75%' }} />
              </div>
              {/* Simulated paragraph */}
              <div className="space-y-2">
                {[95, 88, 92, 70, 85, 60].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-[#f1f3f4]" style={{ width: `${w}%` }} />
                ))}
              </div>
              {/* Section heading */}
              <div className="h-4 rounded-full bg-[#e8eaed]" style={{ width: '45%', marginTop: 24 }} />
              {/* Paragraph */}
              <div className="space-y-2">
                {[85, 92, 78, 95, 65, 88, 74].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-[#f1f3f4]" style={{ width: `${w}%` }} />
                ))}
              </div>
              {/* Callout block */}
              <div className="rounded-lg p-5 border-l-4" style={{ background: `${docColor}08`, borderColor: docColor }}>
                <div className="space-y-2">
                  {[70, 85, 60].map((w, i) => (
                    <div key={i} className="h-3 rounded-full" style={{ width: `${w}%`, background: `${docColor}30` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {[80, 68, 90, 55, 82].map((w, i) => (
                  <div key={i} className="h-3 rounded-full bg-[#f1f3f4]" style={{ width: `${w}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right details panel */}
        <div className="w-72 border-l border-[#e0e0e0] bg-white overflow-y-auto shrink-0 flex flex-col">
          {/* Open with button */}
          <div className="p-4 border-b border-[#e0e0e0]">
            <button
              className="w-full flex items-center justify-center gap-2 h-10 rounded-lg text-white text-sm font-medium transition-opacity hover:opacity-90"
              style={{ background: '#1967d2' }}
            >
              <ExternalLink size={16} />
              Open with Archive Docs
            </button>
          </div>

          {/* File details */}
          <div className="p-4 border-b border-[#e0e0e0]">
            <h3 className="text-sm font-semibold text-[#202124] mb-4">File details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-[#5f6368] mb-0.5">Type</p>
                <p className="text-sm text-[#202124]">{typeLabel[file.type]}</p>
              </div>
              <div>
                <p className="text-xs text-[#5f6368] mb-0.5">Size</p>
                <p className="text-sm text-[#202124]">{file.size}</p>
              </div>
              <div>
                <p className="text-xs text-[#5f6368] mb-0.5">Last modified</p>
                <p className="text-sm text-[#202124]">{file.modified}</p>
              </div>
              <div>
                <p className="text-xs text-[#5f6368] mb-0.5">Created</p>
                <p className="text-sm text-[#202124]">Mar 15, 2026</p>
              </div>
              <div>
                <p className="text-xs text-[#5f6368] mb-0.5">Owner</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ background: '#1967d2' }}>K</div>
                  <p className="text-sm text-[#202124]">me</p>
                </div>
              </div>
            </div>
          </div>

          {/* Access control */}
          <div className="p-4 border-b border-[#e0e0e0]">
            <h3 className="text-sm font-semibold text-[#202124] mb-3">Who has access</h3>
            <div className="flex items-start gap-2 mb-3">
              <Link2 size={16} className="text-[#5f6368] mt-0.5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-[#202124]">Anyone with the link can view</p>
                <button className="text-xs text-[#1967d2] font-medium hover:underline mt-0.5">Change access</button>
              </div>
            </div>
            {/* Shared with users */}
            <div className="space-y-2">
              {[
                { name: 'Alex Chen', email: 'alex@paranet.io', role: 'Editor' },
                { name: 'Maya Rodriguez', email: 'maya@paranet.io', role: 'Viewer' },
              ].map(user => (
                <div key={user.email} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium shrink-0" style={{ background: '#1e8e3e' }}>
                    {user.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#202124] truncate">{user.name}</p>
                    <p className="text-xs text-[#5f6368] truncate">{user.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity log */}
          <div className="p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#202124]">Activity</h3>
              <button className="text-xs text-[#1967d2] font-medium">All</button>
            </div>
            <div className="space-y-3">
              {activityLog.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <Clock size={14} className="text-[#5f6368] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-[#202124]">{item.action}</p>
                    <p className="text-xs text-[#5f6368]">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
