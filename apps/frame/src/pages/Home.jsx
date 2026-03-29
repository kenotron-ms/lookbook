import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers, Search, Bell, ChevronDown, Plus, Clock, Star,
  FileText, Users, Grid, Share2, Zap, Heart, Copy, ExternalLink,
  MoreHorizontal, ChevronRight
} from 'lucide-react'
import { recentFiles, sharedFiles, communityTemplates, teams } from '../data/files'

function FileThumbnail({ file, size = 'normal' }) {
  const h = size === 'small' ? 80 : 120
  return (
    <svg
      width="100%"
      height={h}
      viewBox="0 0 100 90"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', borderRadius: 4 }}
    >
      <defs>
        <pattern id={`checker-${file.id}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#e0e0e0" />
          <rect width="4" height="4" fill="#c8c8c8" />
          <rect x="4" y="4" width="4" height="4" fill="#c8c8c8" />
        </pattern>
      </defs>
      <rect width="100" height="90" fill={`url(#checker-${file.id})`} />
      <rect width="100" height="90" fill="url(#grad)" />
      <defs>
        <linearGradient id={`grad-${file.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={file.gradient.match(/#[0-9a-fA-F]+/g)?.[0] || '#667eea'} />
          <stop offset="100%" stopColor={file.gradient.match(/#[0-9a-fA-F]+/g)?.[1] || '#764ba2'} />
        </linearGradient>
      </defs>
      <rect width="100" height="90" fill={`url(#grad-${file.id})`} opacity="0.85" />
      {file.shapes?.map((s, i) =>
        s.type === 'circle'
          ? <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.color} />
          : <rect key={i} x={s.x} y={s.y} width={s.w} height={s.h} rx={s.r || 0} fill={s.color} />
      )}
    </svg>
  )
}

function FileCard({ file, onOpen }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()
  return (
    <div
      className="group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate('/editor')}
    >
      <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all">
        <FileThumbnail file={file} />
        {hovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              className="bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-gray-100"
              onClick={(e) => { e.stopPropagation(); navigate('/editor') }}
            >
              <ExternalLink size={11} />
              Open in Frame
            </button>
          </div>
        )}
      </div>
      <div className="mt-2 px-0.5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-900 truncate">{file.name}</span>
          <button className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-gray-100">
            <MoreHorizontal size={14} className="text-gray-500" />
          </button>
        </div>
        <div className="flex items-center gap-1 mt-0.5">
          <Clock size={10} className="text-gray-400" />
          <span className="text-xs text-gray-400">{file.lastEdited}</span>
          <span className="text-xs text-gray-300 mx-1">·</span>
          <span className="text-xs text-gray-400">{file.team}</span>
        </div>
      </div>
    </div>
  )
}

function CommunityCard({ tpl }) {
  const [liked, setLiked] = useState(false)
  return (
    <div className="cursor-pointer group">
      <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all">
        <div
          className="h-28 w-full"
          style={{ background: tpl.gradient }}
        />
        {/* simple overlay shapes */}
        <div className="absolute inset-0 flex items-center justify-center opacity-60">
          <div className="w-16 h-10 rounded bg-white/20" />
        </div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded px-1.5 py-0.5 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
          <Copy size={10} /> Duplicate
        </div>
      </div>
      <div className="mt-2 px-0.5">
        <p className="text-sm font-medium text-gray-900 truncate">{tpl.name}</p>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-xs text-gray-400">by {tpl.creator}</span>
          <div className="flex items-center gap-2.5">
            <button
              className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-400"
              onClick={() => setLiked(!liked)}
            >
              <Heart size={11} className={liked ? 'fill-red-400 text-red-400' : ''} />
              {(tpl.likes + (liked ? 1 : 0)).toLocaleString()}
            </button>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Copy size={10} />
              {tpl.duplicates.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('recents')

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 h-12 shrink-0" style={{ background: '#1e1e1e' }}>
        <div className="flex items-center gap-2.5">
          <Layers size={22} color="#a259ff" />
          <span className="text-white font-bold text-lg tracking-tight">Frame</span>
        </div>
        <div className="flex-1 max-w-xs mx-6">
          <div className="flex items-center gap-2 bg-[#2c2c2c] rounded-md px-3 py-1.5">
            <Search size={13} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search files, teams, or people…"
              className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white p-1 rounded"><Bell size={16} /></button>
          <button
            className="text-sm font-medium text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 hover:bg-white/10"
            onClick={() => navigate('/community')}
          >
            <Share2 size={13} /> Share
          </button>
          <button className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-md" style={{ background: '#a259ff', color: '#fff' }}>
            <Zap size={13} /> Upgrade
          </button>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#a259ff' }}>
            <span className="text-white">KL</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-52 shrink-0 border-r border-gray-100 flex flex-col py-4" style={{ background: '#f7f7f7' }}>
          <div className="px-3 mb-4">
            <button
              className="w-full flex items-center gap-2 text-white text-sm font-medium py-2 px-3 rounded-lg"
              style={{ background: '#a259ff' }}
              onClick={() => navigate('/editor')}
            >
              <Plus size={15} /> New design file
            </button>
          </div>
          <nav className="px-2 space-y-0.5">
            {[
              { id: 'recents', icon: Clock, label: 'Recents' },
              { id: 'drafts', icon: FileText, label: 'Drafts' },
              { id: 'favorites', icon: Star, label: 'Favorites' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveNav(id)}
                className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                  activeNav === id
                    ? 'bg-[#a259ff15] text-[#a259ff] font-medium'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>

          <div className="mt-5 px-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Teams</span>
              <Plus size={13} className="text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
            {teams.map(team => (
              <button
                key={team.id}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: team.color }}>
                  <Users size={9} color="#fff" />
                </div>
                <span className="truncate">{team.name}</span>
                <span className="ml-auto text-xs text-gray-400">{team.members}</span>
              </button>
            ))}
          </div>

          <div className="mt-auto px-3">
            <button
              className="w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm text-gray-500 hover:bg-gray-200"
              onClick={() => navigate('/community')}
            >
              <Grid size={14} />
              Explore community
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          {/* Recent Files */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Recent files</h2>
              <button className="text-sm text-[#a259ff] hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {recentFiles.slice(0, 4).map(f => (
                <FileCard key={f.id} file={f} />
              ))}
            </div>
          </section>

          {/* Shared with you */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Shared with you</h2>
              <button className="text-sm text-[#a259ff] hover:underline flex items-center gap-1">
                View all <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {sharedFiles.slice(0, 4).map(f => (
                <div key={f.id} className="relative">
                  <FileCard file={f} />
                  <div className="mt-0.5 px-0.5">
                    <span className="text-xs text-gray-400">Shared by {f.sharedBy}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Explore community */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">Explore community</h2>
              <button
                className="text-sm text-[#a259ff] hover:underline flex items-center gap-1"
                onClick={() => navigate('/community')}
              >
                Browse all <ChevronRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-6 gap-3">
              {communityTemplates.slice(0, 6).map(t => (
                <CommunityCard key={t.id} tpl={t} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
