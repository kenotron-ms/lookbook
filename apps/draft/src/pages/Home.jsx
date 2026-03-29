import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  FileText, Search, Grid3x3, List, Plus, Clock, ChevronRight,
  MoreVertical, Star, Grid, LayoutGrid, Menu, Folder
} from 'lucide-react'
import { recentDocs } from '../data/docs.js'

const TEMPLATES_PREVIEW = [
  { name: 'Meeting Notes', gradient: 'linear-gradient(135deg, #e8f0fe, #c5d9ff)' },
  { name: 'Resume', gradient: 'linear-gradient(135deg, #e6f4ea, #b7dfc5)' },
  { name: 'Cover Letter', gradient: 'linear-gradient(135deg, #fce8e6, #f5c2be)' },
  { name: 'Project Proposal', gradient: 'linear-gradient(135deg, #fef7e0, #fbdfa3)' },
  { name: 'Lesson Plan', gradient: 'linear-gradient(135deg, #f3e8fd, #ddb9f9)' },
  { name: 'Research Paper', gradient: 'linear-gradient(135deg, #e3f2fd, #90caf9)' },
]

function DocCard({ doc, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden border border-[#dadce0] bg-white transition-shadow duration-150"
      style={{ boxShadow: hovered ? '0 2px 8px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.06)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div
        className="w-full h-36 flex items-center justify-center relative"
        style={{ background: doc.gradient }}
      >
        {/* Simulated doc lines */}
        <div className="absolute inset-4 bg-white/70 rounded flex flex-col gap-1.5 p-3">
          <div className="h-2 rounded-full bg-gray-300/80 w-3/4" />
          <div className="h-1.5 rounded-full bg-gray-200/80 w-full" />
          <div className="h-1.5 rounded-full bg-gray-200/80 w-5/6" />
          <div className="h-1.5 rounded-full bg-gray-200/80 w-4/5" />
          <div className="mt-1 h-1.5 rounded-full bg-gray-200/60 w-2/3" />
          <div className="h-1.5 rounded-full bg-gray-200/60 w-3/4" />
        </div>
        {/* Hover overlay */}
        {hovered && (
          <div className="absolute inset-0 bg-[#1a73e8]/10 flex items-end justify-end p-2">
            <button
              className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center text-[#5f6368] hover:bg-white shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical size={14} />
            </button>
          </div>
        )}
      </div>
      {/* Info */}
      <div className="px-3 py-2.5 border-t border-[#f1f3f4]">
        <div className="flex items-center gap-1.5 mb-0.5">
          <FileText size={14} style={{ color: doc.accentColor }} className="shrink-0" />
          <p className="text-[13px] font-medium text-[#1f2937] truncate leading-snug">{doc.title}</p>
        </div>
        <p className="text-[11px] text-[#5f6368] truncate">
          {doc.owner === 'You' ? 'Opened' : `${doc.owner} •`} {doc.lastEdited}
        </p>
      </div>
    </div>
  )
}

function TemplateCard({ name, gradient, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="w-[130px] h-[168px] rounded border-2 overflow-hidden relative transition-all duration-150 flex items-center justify-center"
        style={{
          background: gradient,
          borderColor: hovered ? '#1a73e8' : '#dadce0',
          boxShadow: hovered ? '0 2px 8px rgba(26,115,232,0.2)' : '0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <div className="absolute inset-3 bg-white/70 rounded flex flex-col gap-1.5 p-2">
          <div className="h-2 rounded-full bg-gray-300/80 w-2/3" />
          <div className="h-1.5 rounded-full bg-gray-200/80 w-full" />
          <div className="h-1.5 rounded-full bg-gray-200/80 w-5/6" />
          <div className="h-1.5 rounded-full bg-gray-200/60 w-4/5" />
          <div className="mt-1 h-1.5 rounded-full bg-gray-200/50 w-2/3" />
          <div className="h-1.5 rounded-full bg-gray-200/50 w-3/4" />
        </div>
      </div>
      <span className="text-[12px] text-[#1f2937] group-hover:text-[#1a73e8] transition-colors font-medium">{name}</span>
    </button>
  )
}

function BlankCard({ onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      className="flex flex-col items-center gap-2 cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="w-[130px] h-[168px] rounded border-2 flex items-center justify-center transition-all duration-150 bg-white"
        style={{
          borderColor: hovered ? '#1a73e8' : '#dadce0',
          boxShadow: hovered ? '0 2px 8px rgba(26,115,232,0.2)' : '0 1px 2px rgba(0,0,0,0.06)',
        }}
      >
        <Plus size={32} color={hovered ? '#1a73e8' : '#5f6368'} className="transition-colors" />
      </div>
      <span className="text-[12px] text-[#1f2937] group-hover:text-[#1a73e8] transition-colors font-medium">Blank document</span>
    </button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = recentDocs.filter(d =>
    d.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#dadce0] sticky top-0 z-50">
        <div className="flex items-center gap-3 px-4 h-16">
          {/* Logo + name */}
          <button className="flex items-center gap-2 mr-2">
            <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: '#e8f0fe' }}>
              <FileText size={18} color="#1a73e8" />
            </div>
            <span className="text-[18px] font-medium text-[#5f6368] tracking-tight">Draft</span>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-[#f1f3f4] rounded-full px-4 h-11 hover:bg-[#e8eaed] transition-colors focus-within:bg-white focus-within:shadow-md">
              <Search size={18} color="#5f6368" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[16px] text-[#1f2937] placeholder-[#5f6368] outline-none"
              />
            </div>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors"
              title={viewMode === 'grid' ? 'Switch to list' : 'Switch to grid'}
            >
              {viewMode === 'grid' ? <List size={18} color="#5f6368" /> : <LayoutGrid size={18} color="#5f6368" />}
            </button>
            {/* Apps menu */}
            <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f1f3f4] transition-colors">
              <Grid size={18} color="#5f6368" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-medium cursor-pointer" style={{ background: '#1a73e8' }}>
              K
            </div>
          </div>
        </div>
      </header>

      {/* Template gallery */}
      <div className="bg-white border-b border-[#dadce0]">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[14px] font-medium text-[#1f2937]">Start a new document</h2>
            <button
              className="flex items-center gap-1 text-[13px] text-[#1a73e8] hover:underline"
              onClick={() => navigate('/templates')}
            >
              Template gallery <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex items-start gap-4 overflow-x-auto pb-1">
            <BlankCard onClick={() => navigate('/doc')} />
            {TEMPLATES_PREVIEW.map((t) => (
              <TemplateCard key={t.name} {...t} onClick={() => navigate('/doc')} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent docs */}
      <div className="max-w-6xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock size={16} color="#5f6368" />
            <h2 className="text-[14px] font-medium text-[#1f2937]">Recent documents</h2>
          </div>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#1a73e8] hover:bg-[#e8f0fe] rounded transition-colors">
              <Folder size={14} />
              My documents
            </button>
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-5 gap-4">
            {filtered.map((doc) => (
              <DocCard key={doc.id} doc={doc} onClick={() => navigate('/doc')} />
            ))}
          </div>
        ) : (
          <div className="border border-[#dadce0] rounded-lg overflow-hidden bg-white">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f1f3f4]">
                  <th className="text-left px-4 py-3 text-[12px] font-medium text-[#5f6368]">Name</th>
                  <th className="text-left px-4 py-3 text-[12px] font-medium text-[#5f6368]">Owner</th>
                  <th className="text-left px-4 py-3 text-[12px] font-medium text-[#5f6368]">Last modified</th>
                  <th className="w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-[#f1f3f4] last:border-0 hover:bg-[#f8f9fa] cursor-pointer transition-colors"
                    onClick={() => navigate('/doc')}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: doc.gradient }}>
                          <FileText size={14} color={doc.accentColor} />
                        </div>
                        <span className="text-[13px] text-[#1f2937] font-medium">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-[#5f6368]">{doc.owner}</td>
                    <td className="px-4 py-3 text-[13px] text-[#5f6368]">{doc.lastEdited}</td>
                    <td className="px-4 py-3">
                      <button className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[#f1f3f4]">
                        <MoreVertical size={14} color="#5f6368" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}