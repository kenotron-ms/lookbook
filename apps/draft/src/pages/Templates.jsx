import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, ArrowLeft, Search } from 'lucide-react'
import { templates } from '../data/docs.js'

const CATEGORIES = ['All', 'Personal', 'Work', 'Education']

function TemplateCard({ template, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="cursor-pointer group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="w-full aspect-[3/4] rounded-lg overflow-hidden relative border-2 transition-all duration-150 flex items-center justify-center"
        style={{
          background: template.gradient,
          borderColor: hovered ? '#1a73e8' : '#dadce0',
          boxShadow: hovered ? '0 4px 12px rgba(26,115,232,0.2)' : '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Simulated doc content */}
        <div className="absolute inset-4 bg-white/75 rounded flex flex-col gap-2 p-3">
          <div className="h-2.5 rounded-full bg-gray-300/80 w-3/5" />
          <div className="h-0.5 bg-gray-200/60 w-full my-0.5" />
          <div className="h-1.5 rounded-full bg-gray-200/70 w-full" />
          <div className="h-1.5 rounded-full bg-gray-200/70 w-4/5" />
          <div className="h-1.5 rounded-full bg-gray-200/70 w-5/6" />
          <div className="mt-1 h-1.5 rounded-full bg-gray-200/50 w-3/4" />
          <div className="h-1.5 rounded-full bg-gray-200/50 w-2/3" />
          <div className="mt-1 h-2 rounded-full bg-gray-300/60 w-2/5" />
          <div className="h-1.5 rounded-full bg-gray-200/50 w-full" />
          <div className="h-1.5 rounded-full bg-gray-200/50 w-5/6" />
        </div>

        {/* Preview overlay on hover */}
        {hovered && (
          <div className="absolute inset-0 bg-[#1a73e8]/10 flex items-center justify-center">
            <span className="bg-[#1a73e8] text-white text-[12px] font-medium px-3 py-1.5 rounded-full shadow-sm">
              Use template
            </span>
          </div>
        )}
      </div>

      <div className="mt-2.5 px-0.5">
        <p className="text-[13px] font-medium text-[#1f2937] group-hover:text-[#1a73e8] transition-colors">{template.name}</p>
        <p className="text-[11px] text-[#5f6368] mt-0.5">{template.category}</p>
      </div>
    </div>
  )
}

export default function Templates() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = templates.filter(t => {
    const matchesCategory = activeCategory === 'All' || t.category === activeCategory
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-[#dadce0] sticky top-0 z-50">
        <div className="flex items-center gap-3 px-6 h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-[#f1f3f4] rounded-full px-3 py-1.5 transition-colors"
          >
            <ArrowLeft size={16} color="#5f6368" />
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#e8f0fe' }}>
              <FileText size={13} color="#1a73e8" />
            </div>
            <span className="text-[16px] font-medium text-[#5f6368]">Draft</span>
          </button>

          <div className="flex-1" />

          {/* Search */}
          <div className="flex items-center gap-2 bg-[#f1f3f4] rounded-full px-4 h-10 w-72 hover:bg-[#e8eaed] focus-within:bg-white focus-within:shadow-md transition-all">
            <Search size={16} color="#5f6368" />
            <input
              type="text"
              placeholder="Search templates"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 text-[14px] text-[#1f2937] placeholder-[#5f6368] outline-none"
            />
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-[14px] font-medium" style={{ background: '#1a73e8' }}>
            K
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="max-w-6xl mx-auto px-8 pt-8 pb-4">
        <h1 className="text-[24px] font-normal text-[#1f2937] mb-1">Template gallery</h1>
        <p className="text-[14px] text-[#5f6368]">Choose a template to get started quickly</p>
      </div>

      {/* Category tabs */}
      <div className="bg-white border-b border-[#dadce0] sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center gap-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-3.5 text-[14px] font-medium border-b-2 transition-colors ${
                  activeCategory === cat
                    ? 'border-[#1a73e8] text-[#1a73e8]'
                    : 'border-transparent text-[#5f6368] hover:text-[#1f2937] hover:bg-[#f8f9fa]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Template grid */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <FileText size={48} color="#dadce0" className="mx-auto mb-4" />
            <p className="text-[16px] text-[#5f6368]">No templates found</p>
            <p className="text-[13px] text-[#9aa0a6] mt-1">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-6 gap-6">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onClick={() => navigate('/doc')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}