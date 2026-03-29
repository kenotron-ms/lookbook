import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import {
  GitCommit, ChevronRight, ChevronDown, Search, Settings,
  Inbox, User, FolderOpen, BarChart2, Map, Zap,
  CheckCircle2, Circle, Clock, AlertCircle, ArrowUp, ArrowDown,
  Minus, Flag, Command, Layers, RotateCcw
} from 'lucide-react'
import MyIssues from './pages/MyIssues.jsx'
import Cycles from './pages/Cycles.jsx'
import IssueDetail from './pages/IssueDetail.jsx'
import Roadmap from './pages/Roadmap.jsx'

const ACCENT = '#5e6ad2'

const teams = [
  { id: 'product', label: 'Product', dot: '#9b59b6' },
  { id: 'engineering', label: 'Engineering', dot: '#3b82f6' },
  { id: 'design', label: 'Design', dot: '#22c55e' },
]

function TeamItem({ team }) {
  const [open, setOpen] = useState(team.id === 'engineering')
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-1.5 px-3 py-1 rounded hover:bg-[#232323] text-[#a0a0a0] text-xs group transition-colors"
      >
        {open
          ? <ChevronDown size={12} className="text-[#505050] flex-shrink-0" />
          : <ChevronRight size={12} className="text-[#505050] flex-shrink-0" />
        }
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ background: team.dot }}
        />
        <span className="text-[#c8c8c8] font-medium">{team.label}</span>
      </button>
      {open && (
        <div className="ml-5 mt-0.5">
          {['Issues', 'Cycles', 'Views', 'Backlog'].map(sub => (
            <button
              key={sub}
              className="w-full text-left px-3 py-0.5 text-[#666] text-xs hover:text-[#c8c8c8] hover:bg-[#232323] rounded transition-colors"
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function SidebarLink({ to, icon: Icon, label, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-2.5 px-3 py-1 rounded text-xs transition-colors ${
          isActive
            ? 'bg-[#2a2a3a] text-[#e2e2e2]'
            : 'text-[#888] hover:bg-[#232323] hover:text-[#c8c8c8]'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon size={14} style={{ color: isActive ? ACCENT : undefined }} />
          <span>{label}</span>
        </>
      )}
    </NavLink>
  )
}

function Sidebar() {
  return (
    <div
      className="flex flex-col h-full select-none"
      style={{
        width: 240,
        minWidth: 240,
        background: '#1c1c1c',
        borderRight: '1px solid #282828',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3.5" style={{ borderBottom: '1px solid #282828' }}>
        <GitCommit size={20} style={{ color: ACCENT }} strokeWidth={2.5} />
        <span className="font-semibold text-[#e2e2e2] text-sm tracking-tight">Track</span>
        <span className="ml-auto text-[10px] text-[#444] bg-[#242424] border border-[#333] rounded px-1.5 py-0.5 font-mono">⌘K</span>
      </div>

      {/* Workspace */}
      <div className="px-3 py-2" style={{ borderBottom: '1px solid #222' }}>
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-[#232323] cursor-pointer transition-colors">
          <div
            className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: ACCENT }}
          >P</div>
          <span className="text-xs text-[#c0c0c0] font-medium">ParaNet Inc</span>
          <ChevronDown size={12} className="ml-auto text-[#444]" />
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto sidebar-scroll py-2 space-y-0.5 px-2">
        <SidebarLink to="/" end icon={User} label="My Issues" />
        <SidebarLink to="/inbox" icon={Inbox} label="Inbox" />
        <SidebarLink to="/projects" icon={FolderOpen} label="My Projects" />

        {/* Teams */}
        <div className="pt-3 pb-1 px-1">
          <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">Teams</span>
        </div>
        {teams.map(t => <TeamItem key={t.id} team={t} />)}

        {/* Views */}
        <div className="pt-3 pb-1 px-1">
          <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">Views</span>
        </div>
        <SidebarLink to="/all" icon={Layers} label="All Issues" />
        <SidebarLink to="/active" icon={Clock} label="Active" />
        <SidebarLink to="/backlog" icon={RotateCcw} label="Backlog" />
        <SidebarLink to="/done-view" icon={CheckCircle2} label="Done" />

        {/* Other */}
        <div className="pt-3" />
        <SidebarLink to="/roadmap" icon={Map} label="Roadmap" />
        <SidebarLink to="/initiatives" icon={Flag} label="Initiatives" />
        <SidebarLink to="/analytics" icon={BarChart2} label="Analytics" />
        <SidebarLink to="/cycles" icon={Zap} label="Cycles" />
      </div>

      {/* Footer */}
      <div className="px-3 py-2" style={{ borderTop: '1px solid #222' }}>
        <button className="flex items-center gap-2.5 px-2 py-1 w-full rounded hover:bg-[#232323] text-[#666] hover:text-[#999] transition-colors text-xs">
          <Settings size={14} />
          <span>Settings</span>
        </button>
      </div>
    </div>
  )
}

function CmdKBanner() {
  return (
    <div
      className="fixed bottom-6 right-6 flex items-center gap-2 text-[11px] text-[#555] pointer-events-none z-50"
    >
      <span className="bg-[#1f1f1f] border border-[#2a2a2a] rounded px-1.5 py-0.5 font-mono text-[10px] text-[#444]">⌘K</span>
      <span className="text-[#3a3a3a]">Command menu</span>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <div className="flex h-full" style={{ background: '#141414' }}>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<MyIssues />} />
            <Route path="/cycles" element={<Cycles />} />
            <Route path="/issue" element={<IssueDetail />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="*" element={<MyIssues />} />
          </Routes>
        </div>
      </div>
      <CmdKBanner />
    </HashRouter>
  )
}
