import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown, ChevronRight, Filter, List, LayoutGrid,
  Zap, Clock, CheckCircle2, Circle, AlertOctagon,
  ArrowUp, ArrowDown, Minus, ChevronsUp, ChevronsDown,
  Plus, SlidersHorizontal
} from 'lucide-react'
import { issues, users, labels as labelDefs } from '../data/issues.js'

const ACCENT = '#5e6ad2'

// ── Status helpers ──────────────────────────────────────────────
function StatusIcon({ status, size = 14 }) {
  if (status === 'in_progress') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14" className="flex-shrink-0">
        <circle cx="7" cy="7" r="6" fill="none" stroke="#5e6ad2" strokeWidth="1.5" />
        <circle
          cx="7" cy="7" r="6"
          fill="none"
          stroke="#5e6ad2"
          strokeWidth="1.5"
          strokeDasharray="12 28"
          strokeLinecap="round"
          style={{
            transformOrigin: '7px 7px',
            animation: 'spin-slow 2s linear infinite',
          }}
        />
        <circle cx="7" cy="7" r="2.5" fill="#5e6ad2" />
      </svg>
    )
  }
  if (status === 'done') {
    return <CheckCircle2 size={size} className="flex-shrink-0" style={{ color: '#4cb782' }} />
  }
  if (status === 'cancelled') {
    return <Circle size={size} className="flex-shrink-0" style={{ color: '#555' }} />
  }
  // todo / backlog
  return <Circle size={size} className="flex-shrink-0" style={{ color: '#555', strokeDasharray: status === 'backlog' ? '2 2' : undefined }} />
}

// ── Priority helpers ────────────────────────────────────────────
const PRIORITY_CONFIG = {
  urgent: { color: '#eb5757', Icon: AlertOctagon, label: 'Urgent' },
  high:   { color: '#f0820f', Icon: ArrowUp,      label: 'High'   },
  medium: { color: '#f2c94c', Icon: Minus,         label: 'Medium' },
  low:    { color: '#9999a8', Icon: ArrowDown,     label: 'Low'    },
  no_priority: { color: '#555', Icon: ChevronsDown, label: 'None' },
}

function PriorityIcon({ priority, size = 13 }) {
  const { color, Icon } = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.no_priority
  return <Icon size={size} className="flex-shrink-0" style={{ color }} />
}

// ── Avatar ──────────────────────────────────────────────────────
function Avatar({ userId, size = 20 }) {
  const user = users.find(u => u.id === userId)
  if (!user) return null
  return (
    <div
      className="flex items-center justify-center rounded-full flex-shrink-0 font-semibold"
      style={{
        width: size, height: size,
        background: user.color + '33',
        border: `1px solid ${user.color}55`,
        color: user.color,
        fontSize: size * 0.45,
      }}
    >
      {user.initials}
    </div>
  )
}

// ── Label pill ──────────────────────────────────────────────────
function LabelPill({ labelKey }) {
  const def = labelDefs[labelKey]
  if (!def) return null
  return (
    <span
      className="px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0"
      style={{ color: def.color, background: def.bg, border: `1px solid ${def.color}33` }}
    >
      {def.name}
    </span>
  )
}

// ── Issue row ───────────────────────────────────────────────────
function IssueRow({ issue, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 px-4 group cursor-pointer transition-colors border-b"
      style={{
        height: 34,
        borderColor: '#1f1f1f',
      }}
      onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {/* Status */}
      <StatusIcon status={issue.status} />

      {/* Priority */}
      <PriorityIcon priority={issue.priority} />

      {/* ID */}
      <span className="mono text-[11px] text-[#444] w-16 flex-shrink-0">{issue.id}</span>

      {/* Title */}
      <span className="flex-1 text-[13px] text-[#d4d4d4] truncate min-w-0">{issue.title}</span>

      {/* Labels */}
      <div className="flex gap-1 items-center flex-shrink-0">
        {issue.labels.slice(0, 2).map(l => <LabelPill key={l} labelKey={l} />)}
      </div>

      {/* Assignee */}
      <div className="w-6 flex justify-end flex-shrink-0">
        <Avatar userId={issue.assigneeId} size={20} />
      </div>

      {/* Due date */}
      <span className="text-[11px] text-[#555] w-14 text-right flex-shrink-0">{issue.dueDate}</span>
    </div>
  )
}

// ── Group header ────────────────────────────────────────────────
const STATUS_GROUPS = [
  { key: 'in_progress', label: 'In Progress', color: '#5e6ad2' },
  { key: 'todo',        label: 'Todo',         color: '#707070' },
  { key: 'done',        label: 'Done',         color: '#4cb782' },
]

function IssueGroup({ group, issueList, onIssueClick }) {
  const [open, setOpen] = useState(group.key !== 'done')
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 w-full text-left hover:bg-[#1a1a1a] transition-colors"
        style={{ height: 32, borderBottom: '1px solid #1f1f1f' }}
      >
        {open
          ? <ChevronDown size={13} className="text-[#444]" />
          : <ChevronRight size={13} className="text-[#444]" />
        }
        <StatusIcon status={group.key} size={13} />
        <span className="text-xs font-medium" style={{ color: group.color }}>{group.label}</span>
        <span className="ml-1 text-[11px] text-[#444]">{issueList.length}</span>
      </button>
      {open && issueList.map(issue => (
        <IssueRow key={issue.id} issue={issue} onClick={() => onIssueClick(issue)} />
      ))}
    </div>
  )
}

// ── Filter bar ──────────────────────────────────────────────────
const FILTERS = ['Status', 'Priority', 'Label', 'Assignee', 'Cycle', 'Project']

function FilterBar() {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {FILTERS.map(f => (
        <button
          key={f}
          className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#666] hover:text-[#aaa] hover:bg-[#222] transition-colors border border-transparent hover:border-[#2a2a2a]"
        >
          <Filter size={10} />
          {f}
          <ChevronDown size={10} />
        </button>
      ))}
      <div className="w-px h-3 bg-[#282828] mx-1" />
      <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] text-[#666] hover:text-[#aaa] hover:bg-[#222] transition-colors">
        <SlidersHorizontal size={10} />
        Display
      </button>
    </div>
  )
}

// ── View toggles ────────────────────────────────────────────────
function ViewToggle({ view, setView }) {
  return (
    <div className="flex gap-0.5 bg-[#1f1f1f] rounded p-0.5">
      {[
        { key: 'list',  Icon: List },
        { key: 'board', Icon: LayoutGrid },
        { key: 'cycle', Icon: Zap },
      ].map(({ key, Icon }) => (
        <button
          key={key}
          onClick={() => setView(key)}
          className="p-1 rounded transition-colors"
          style={{
            background: view === key ? '#2a2a2a' : 'transparent',
            color: view === key ? ACCENT : '#555',
          }}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  )
}

// ── Main page ───────────────────────────────────────────────────
export default function MyIssues() {
  const [view, setView] = useState('list')
  const navigate = useNavigate()

  const myIssues = issues.slice(0, 10)

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#141414' }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: '1px solid #282828' }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold text-[#e2e2e2]">My Issues</h1>
          <span className="text-[11px] text-[#444] bg-[#1f1f1f] border border-[#282828] rounded-full px-2 py-0.5">
            {myIssues.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FilterBar />
          <ViewToggle view={view} setView={setView} />
          <button
            className="flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors"
            style={{ background: ACCENT + '22', color: ACCENT }}
          >
            <Plus size={12} />
            Add issue
          </button>
        </div>
      </div>

      {/* Issue list */}
      <div className="flex-1 overflow-y-auto">
        {STATUS_GROUPS.map(group => {
          const groupIssues = myIssues.filter(i => i.status === group.key)
          if (groupIssues.length === 0) return null
          return (
            <IssueGroup
              key={group.key}
              group={group}
              issueList={groupIssues}
              onIssueClick={() => navigate('/issue')}
            />
          )
        })}
      </div>
    </div>
  )
}
