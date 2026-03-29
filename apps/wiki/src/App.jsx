import { useState } from 'react'
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import {
  BookOpen, Search, ChevronDown, Plus, LogIn,
  Globe, Menu, X
} from 'lucide-react'

import MainPage from './pages/MainPage.jsx'
import ArticlePage from './pages/ArticlePage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import DiscussionsPage from './pages/DiscussionsPage.jsx'

const WIKI_NAV = [
  { label: 'Main Page', href: '/' },
  { label: 'Characters', href: '/category' },
  { label: 'Lore', href: '/' },
  { label: 'Locations', href: '/' },
  { label: 'Episodes', href: '/' },
  { label: 'Community', href: '/discussions' },
  { label: 'Discussions', href: '/discussions' },
  { label: 'Recent Changes', href: '/' },
]

function GlobalHeader() {
  const [exploreOpen, setExploreOpen] = useState(false)

  const EXPLORE_WIKIS = [
    'Starfield Chronicles', 'Nebula Rising', 'The Void Accord', 'Iron Covenant',
    'Phantom Protocol', 'Arcane Atlas', 'Dragon Epoch',
  ]

  return (
    <header
      style={{ background: '#131314', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-full px-4 flex items-center gap-4 h-11">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
          <div
            style={{ background: '#00d6d6' }}
            className="w-7 h-7 rounded-md flex items-center justify-center"
          >
            <BookOpen size={15} className="text-black" />
          </div>
          <span className="text-white font-bold text-lg leading-none">Wiki</span>
        </Link>

        {/* Global search */}
        <div className="flex-1 max-w-md relative">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search all wikis…"
              className="w-full bg-[#1f1f20] border border-white/10 rounded-full pl-8 pr-4 py-1.5 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-white/25 focus:bg-[#252526] transition-all"
            />
          </div>
        </div>

        {/* Explore Wikis dropdown */}
        <div className="relative">
          <button
            onClick={() => setExploreOpen(o => !o)}
            className="flex items-center gap-1.5 text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            <Globe size={14} />
            Explore Wikis
            <ChevronDown size={12} className={`transition-transform ${exploreOpen ? 'rotate-180' : ''}`} />
          </button>
          {exploreOpen && (
            <div
              style={{ background: '#1f1f20', border: '1px solid rgba(255,255,255,0.12)' }}
              className="absolute top-full left-0 mt-2 w-52 rounded-xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="px-3 py-2 border-b border-white/10">
                <span className="text-xs text-gray-500 uppercase tracking-wider">Popular Wikis</span>
              </div>
              {EXPLORE_WIKIS.map(wiki => (
                <button
                  key={wiki}
                  className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
                  onClick={() => setExploreOpen(false)}
                >
                  <div
                    className="w-4 h-4 rounded flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #1b2a4a, #00d6d6)' }}
                  />
                  {wiki}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto flex-shrink-0">
          <button
            style={{ background: '#00d6d6' }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-black font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            <Plus size={13} /> Create Wiki
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-gray-300 hover:text-white text-xs font-medium border border-white/15 hover:border-white/30 transition-all">
            <LogIn size={13} /> Log in
          </button>
        </div>
      </div>
    </header>
  )
}

function WikiHeader() {
  const location = useLocation()

  return (
    <div style={{ background: '#1b2a4a', borderBottom: '2px solid #00d6d6' }}>
      {/* Wiki branding row */}
      <div
        style={{ background: 'linear-gradient(90deg, #0d1829 0%, #1b2a4a 60%, #0a3040 100%)' }}
        className="px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div
            style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #00d6d6 100%)' }}
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <BookOpen size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-xl leading-tight">Starfield Chronicles Wiki</div>
            <div style={{ color: '#00d6d6' }} className="text-xs opacity-80">
              The definitive fan encyclopedia
            </div>
          </div>
        </div>
        {/* Wiki search */}
        <div className="hidden md:block w-64 relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search this wiki…"
            className="w-full bg-black/30 border border-white/15 rounded-full pl-8 pr-4 py-1.5 text-sm text-gray-300 placeholder-gray-600 outline-none focus:border-white/30 transition-all"
          />
        </div>
      </div>

      {/* Nav tabs */}
      <div className="flex overflow-x-auto scrollbar-none" style={{ background: 'rgba(0,0,0,0.3)' }}>
        {WIKI_NAV.map(({ label, href }) => {
          // Determine if active
          const path = location.pathname
          const isActive =
            (href === '/' && path === '/') ||
            (href !== '/' && path === href)

          return (
            <Link
              key={label}
              to={href}
              className="flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-all border-b-2 whitespace-nowrap"
              style={{
                color: isActive ? '#00d6d6' : 'rgba(255,255,255,0.65)',
                borderBottomColor: isActive ? '#00d6d6' : 'transparent',
                background: isActive ? 'rgba(0,214,214,0.08)' : 'transparent',
              }}
            >
              {label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function Layout({ children }) {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      <GlobalHeader />
      <WikiHeader />
      <main>{children}</main>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/article" element={<ArticlePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/discussions" element={<DiscussionsPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
