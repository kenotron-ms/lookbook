import { Search, Settings, Grid3x3, Bell } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoTriangle() {
  return (
    <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Multi-color triangle — Google Drive style */}
      {/* Left triangle — green */}
      <polygon points="0,32 12,32 18,21" fill="#0f9d58" />
      {/* Right triangle — yellow/orange */}
      <polygon points="24,32 36,32 30,21" fill="#f4b400" />
      {/* Top triangle — blue */}
      <polygon points="12,32 24,32 18,12" fill="#4285f4" />
      {/* Center overlay for depth */}
      <polygon points="12,32 24,32 18,21" fill="rgba(0,0,0,0.07)" />
      {/* Top peak */}
      <polygon points="13,10 23,10 18,0" fill="#1967d2" />
    </svg>
  );
}

export default function Header({ searchQuery, onSearchChange }) {
  const navigate = useNavigate();

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/search');
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center h-16 px-4 bg-white border-b border-[#e0e0e0]" style={{ gap: 0 }}>
      {/* Logo + Name */}
      <div className="flex items-center gap-3 shrink-0" style={{ width: 240 }}>
        <LogoTriangle />
        <span className="text-[22px] font-normal text-[#5f6368] tracking-tight select-none">Archive</span>
      </div>

      {/* Search bar */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center gap-3 bg-[#f1f3f4] rounded-full px-4 h-11 hover:bg-[#e8eaed] focus-within:bg-white focus-within:shadow-md focus-within:border focus-within:border-[#e0e0e0] transition-all">
          <Search size={20} className="text-[#5f6368] shrink-0" />
          <input
            type="text"
            placeholder="Search in Archive"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="flex-1 bg-transparent outline-none text-[16px] text-[#202124] placeholder-[#5f6368]"
          />
        </div>
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-1 ml-auto shrink-0">
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors">
          <Bell size={20} className="text-[#5f6368]" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors">
          <Settings size={20} className="text-[#5f6368]" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#f1f3f4] transition-colors">
          <Grid3x3 size={20} className="text-[#5f6368]" />
        </button>
        {/* Avatar */}
        <button className="w-9 h-9 rounded-full ml-1 flex items-center justify-center text-white text-sm font-medium shrink-0" style={{ background: 'linear-gradient(135deg, #1967d2, #4285f4)' }}>
          K
        </button>
      </div>
    </header>
  );
}
