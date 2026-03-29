import { Plus, HardDrive, Monitor, Users, Clock, Star, AlertOctagon, Trash2, Server, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: HardDrive, label: 'My Drive', path: '/' },
    { icon: Monitor, label: 'Computers', path: '/computers' },
    { icon: Users, label: 'Shared with me', path: '/shared' },
    { icon: Clock, label: 'Recent', path: '/recent' },
    { icon: Star, label: 'Starred', path: '/starred' },
    { icon: AlertOctagon, label: 'Spam', path: '/spam' },
    { icon: Trash2, label: 'Trash', path: '/trash' },
  ];

  const sharedDrives = [
    { name: 'ParaNet Team Drive', letter: 'P', color: '#1967d2' },
    { name: 'Design Assets', letter: 'D', color: '#1e8e3e' },
  ];

  const usedPercent = 70; // 8.4 / 15
  const storageColor = usedPercent > 95 ? '#d93025' : usedPercent > 80 ? '#e37400' : '#1967d2';

  return (
    <aside
      className="fixed left-0 top-16 bottom-0 flex flex-col overflow-y-auto"
      style={{ width: 240, background: '#f8f9fa', paddingTop: 8, paddingBottom: 16 }}
    >
      {/* New button */}
      <div className="px-3 mb-4">
        <button
          onClick={() => {}}
          className="flex items-center gap-3 px-4 h-11 rounded-2xl bg-white text-[#202124] font-medium text-sm transition-shadow"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.12)', width: '100%', maxWidth: 160 }}
        >
          <Plus size={20} className="text-[#5f6368]" />
          <span>New</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-0.5 px-2">
        {navItems.map(({ icon: Icon, label, path }) => {
          const isActive = location.pathname === path;
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} style={{ color: isActive ? '#1967d2' : '#5f6368' }} />
              <span style={{ color: isActive ? '#1967d2' : '#202124' }}>{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-3 border-t border-[#e0e0e0]" />

      {/* Shared drives section */}
      <div className="px-2">
        <div className="flex items-center gap-2 px-3 mb-1">
          <span className="text-xs font-semibold text-[#5f6368] uppercase tracking-wide">Shared drives</span>
          <ChevronDown size={14} className="text-[#5f6368] ml-auto" />
        </div>
        {sharedDrives.map((drive) => (
          <button key={drive.name} className="nav-item w-full">
            <div
              className="w-5 h-5 rounded flex items-center justify-center text-white text-xs font-bold shrink-0"
              style={{ background: drive.color }}
            >
              {drive.letter}
            </div>
            <span className="text-sm truncate">{drive.name}</span>
          </button>
        ))}
      </div>

      {/* Storage section */}
      <div className="mt-auto px-4 pt-4">
        <div className="storage-bar mb-2">
          <div
            className="storage-bar-fill"
            style={{ width: `${usedPercent}%`, background: storageColor }}
          />
        </div>
        <p className="text-xs text-[#5f6368] mb-2">8.4 GB of 15 GB used</p>
        <button className="text-xs font-medium px-3 py-1.5 rounded-full border border-[#dadce0] hover:bg-[#e8eaed] transition-colors text-[#3c4043]">
          Get more storage
        </button>
      </div>
    </aside>
  );
}
