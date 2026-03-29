import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers, Search, ChevronDown, Heart, Copy, Star,
  TrendingUp, Users, Grid, Zap, Bell, Share2, Filter
} from 'lucide-react'
import { communityTemplates } from '../data/files'

const CATEGORIES = ['All', 'UI Kits', 'Mobile', 'Web', 'Design Systems', 'Icons', 'Presentations', 'Wireframes']
const RESOURCE_TYPES = ['All types', 'Community file', 'Plugin', 'Widget', 'Template']
const SORT_BY = ['Popular', 'Trending', 'Newest', 'Most duplicated']

const EXTRA_TEMPLATES = [
  { id: 13, name: "Newsletter Template", creator: "mailcraft", likes: 670, duplicates: 280, gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
  { id: 14, name: "Event Landing Page", creator: "eventstudio", likes: 1100, duplicates: 540, gradient: "linear-gradient(135deg, #f7971e 0%, #ffd200 100%)" },
  { id: 15, name: "HR Dashboard", creator: "peoplefirst", likes: 890, duplicates: 420, gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)" },
  { id: 16, name: "Crypto Wallet App", creator: "web3studio", likes: 2200, duplicates: 1400, gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
]

const ALL_TEMPLATES = [...communityTemplates, ...EXTRA_TEMPLATES]

function CommunityCard({ tpl }) {
  const [liked, setLiked] = useState(false)
  const [duplicated, setDuplicated] = useState(false)

  return (
    <div className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-200">
        {/* Thumbnail */}
        <div className="h-36 w-full relative" style={{ background: tpl.gradient }}>
          {/* Simulated UI in thumbnail */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-16 bg-white/20 rounded-lg backdrop-blur-sm border border-white/30 p-2">
              <div className="h-2 bg-white/40 rounded mb-1.5" style={{ width: '70%' }} />
              <div className="h-1.5 bg-white/30 rounded mb-1" style={{ width: '90%' }} />
              <div className="h-1.5 bg-white/20 rounded" style={{ width: '60%' }} />
              <div className="mt-2 h-4 bg-white/30 rounded" style={{ width: '50%' }} />
            </div>
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <button
              onClick={() => setDuplicated(true)}
              className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 hover:bg-gray-100 transition-all shadow"
            >
              <Copy size={12} />
              {duplicated ? 'Duplicated!' : 'Duplicate'}
            </button>
          </div>
          {/* Likes badge */}
          <div className="absolute top-2 right-2 bg-black/40 backdrop-blur rounded-full px-2 py-0.5 flex items-center gap-1">
            <Heart size={10} className="text-red-400 fill-red-400" />
            <span className="text-white text-[10px] font-medium">{(tpl.likes + (liked ? 1 : 0)).toLocaleString()}</span>
          </div>
        </div>
        {/* Info */}
        <div className="p-3 bg-white">
          <p className="text-sm font-semibold text-gray-900 truncate">{tpl.name}</p>
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center text-white text-[8px] font-bold"
                style={{ background: tpl.gradient }}
              >
                {tpl.creator[0].toUpperCase()}
              </div>
              <span className="text-xs text-gray-400">{tpl.creator}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center gap-0.5 text-[11px] transition-colors ${liked ? 'text-red-400' : 'text-gray-400 hover:text-red-400'}`}
              >
                <Heart size={12} className={liked ? 'fill-red-400' : ''} />
                {(tpl.likes + (liked ? 1 : 0)).toLocaleString()}
              </button>
              <div className="flex items-center gap-0.5 text-[11px] text-gray-400">
                <Copy size={11} />
                {(tpl.duplicates + (duplicated ? 1 : 0)).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Community() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('Popular')
  const [resourceType, setResourceType] = useState('All types')

  const filtered = ALL_TEMPLATES.filter(t =>
    !searchQuery || t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.creator.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 h-12 shrink-0 border-b border-gray-100" style={{ background: '#1e1e1e' }}>
        <div className="flex items-center gap-2.5">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 hover:opacity-80">
            <Layers size={22} color="#a259ff" />
            <span className="text-white font-bold text-lg tracking-tight">Frame</span>
          </button>
        </div>
        <div className="flex-1 max-w-sm mx-6">
          <div className="flex items-center gap-2 bg-[#2c2c2c] rounded-md px-3 py-1.5">
            <Search size={13} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search community resources…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-gray-300 placeholder-gray-500 outline-none w-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-400 hover:text-white p-1"><Bell size={16} /></button>
          <button className="flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-md" style={{ background: '#a259ff', color: '#fff' }}>
            <Zap size={13} /> Upgrade
          </button>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#a259ff' }}>
            <span className="text-white">KL</span>
          </div>
        </div>
      </header>

      {/* Sub-header */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Community</h1>
              <p className="text-sm text-gray-400 mt-0.5">Discover and remix resources from the Frame community</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Users size={14} className="text-[#a259ff]" />
                <span><strong className="text-gray-900">2.4M</strong> creators</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Grid size={14} className="text-[#a259ff]" />
                <span><strong className="text-gray-900">180K</strong> resources</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <TrendingUp size={14} className="text-[#a259ff]" />
                <span><strong className="text-gray-900">14K</strong> this week</span>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex items-center gap-2 pb-4 overflow-x-auto">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                style={activeCategory === cat ? { background: '#a259ff' } : {}}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-5">
          {/* Filter row */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <Filter size={14} />
                <span>Filter:</span>
              </div>
              <select
                value={resourceType}
                onChange={e => setResourceType(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 outline-none focus:border-[#a259ff] bg-white"
              >
                {RESOURCE_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
              <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 outline-none focus:border-[#a259ff] bg-white">
                <option>Any creator</option>
                <option>Verified only</option>
                <option>Teams</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <div className="flex">
                {SORT_BY.map(s => (
                  <button
                    key={s}
                    onClick={() => setSortBy(s)}
                    className={`px-3 py-1.5 text-sm border transition-colors first:rounded-l-lg last:rounded-r-lg -ml-px ${
                      sortBy === s
                        ? 'border-[#a259ff] text-[#a259ff] bg-[#a259ff10] z-10 relative font-medium'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-400 mb-4">
            Showing <strong className="text-gray-700">{filtered.length}</strong> results
            {activeCategory !== 'All' && <> in <span className="text-[#a259ff] font-medium">{activeCategory}</span></>}
          </p>

          {/* Grid */}
          <div className="grid grid-cols-4 gap-5">
            {filtered.map(t => (
              <CommunityCard key={t.id} tpl={t} />
            ))}
          </div>

          {/* Load more */}
          <div className="flex justify-center mt-10 mb-4">
            <button className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:border-[#a259ff] hover:text-[#a259ff] transition-colors">
              Load more resources
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
