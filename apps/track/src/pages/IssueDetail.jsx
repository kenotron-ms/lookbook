import { useState } from 'react'
import {
  ChevronDown, ChevronRight, Paperclip, MessageSquare,
  CheckCircle2, Circle, AlertOctagon, ArrowUp, Minus, ArrowDown,
  GitCommit, Zap, FolderOpen, Calendar, Clock, Hash,
  User, Tag, BarChart, Link2, MoreHorizontal, Send
} from 'lucide-react'
import { detailedIssue, users, projects, labels as labelDefs } from '../data/issues.js'

const ACCENT = '#5e6ad2'

const PRIORITY_CONFIG = {
  urgent: { color: '#eb5757', Icon: AlertOctagon, label: 'Urgent' },
  high:   { color: '#f0820f', Icon: ArrowUp,      label: 'High'   },
  medium: { color: '#f2c94c', Icon: Minus,         label: 'Medium' },
  low:    { color: '#9999a8', Icon: ArrowDown,     label: 'Low'    },
}

function StatusIcon({ status, size = 14 }) {
  if (status === 'in_progress') {
    return (
      <svg width={size} height={size} viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill="none" stroke="#5e6ad2" strokeWidth="1.5" />
        <circle cx="7" cy="7" r="6" fill="none" stroke="#5e6ad2" strokeWidth="1.5"
          strokeDasharray="12 28" strokeLinecap="round"
          style={{ transformOrigin: '7px 7px', animation: 'spin-slow 2s linear infinite' }} />
        <circle cx="7" cy="7" r="2.5" fill="#5e6ad2" />
      </svg>
    )
  }
  if (status === 'done') return <CheckCircle2 size={size} style={{ color: '#4cb782' }} />
  return <Circle size={size} style={{ color: '#555' }} />
}

function Avatar({ userId, size = 24 }) {
  const user = users.find(u => u.id === userId)
  if (!user) return null
  return (
    <div className="flex items-center justify-center rounded-full font-semibold flex-shrink-0"
      style={{ width: size, height: size, background: user.color + '33', border: `1px solid ${user.color}55`, color: user.color, fontSize: size * 0.4 }}>
      {user.initials}
    </div>
  )
}

// ── Markdown-like description renderer ───────────────────────────
function DescriptionBlock({ text }) {
  const lines = text.split('\n')
  const elements = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-[15px] font-semibold text-[#e2e2e2] mt-4 mb-2">{line.slice(3)}</h2>
      )
    } else if (line.startsWith('```')) {
      const lang = line.slice(3)
      i++
      const codeLines = []
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <pre key={i} className="bg-[#181818] border border-[#282828] rounded p-3 my-3 text-[11px] font-mono text-[#a8b8d8] overflow-x-auto">
          <code>{codeLines.join('\n')}</code>
        </pre>
      )
    } else if (line.startsWith('- [ ] ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2 py-0.5">
          <div className="mt-0.5 w-3.5 h-3.5 rounded border border-[#404040] flex-shrink-0" />
          <span className="text-[13px] text-[#b8b8b8]">{line.slice(6)}</span>
        </div>
      )
    } else if (line.startsWith('- [x] ')) {
      elements.push(
        <div key={i} className="flex items-start gap-2 py-0.5">
          <CheckCircle2 size={14} style={{ color: '#4cb782' }} className="mt-0.5 flex-shrink-0" />
          <span className="text-[13px] text-[#707070] line-through">{line.slice(6)}</span>
        </div>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />)
    } else {
      // Handle bold (**text**) inline
      const parts = line.split(/\*\*(.*?)\*\*/g)
      elements.push(
        <p key={i} className="text-[13px] text-[#a8a8a8] leading-relaxed">
          {parts.map((p, j) =>
            j % 2 === 1
              ? <strong key={j} className="text-[#d4d4d4] font-medium">{p}</strong>
              : p
          )}
        </p>
      )
    }
    i++
  }
  return <div>{elements}</div>
}

// ── Property row ─────────────────────────────────────────────────
function PropRow({ icon: Icon, label, children }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-3 rounded hover:bg-[#1f1f1f] transition-colors cursor-pointer group">
      <Icon size={13} className="text-[#444] flex-shrink-0" />
      <span className="text-[11px] text-[#555] w-20 flex-shrink-0">{label}</span>
      <div className="flex-1 text-[12px] text-[#888] group-hover:text-[#aaa] transition-colors">{children}</div>
    </div>
  )
}

// ── Comment ──────────────────────────────────────────────────────
function Comment({ comment }) {
  const user = users.find(u => u.id === comment.userId)
  return (
    <div className="flex gap-3 py-3" style={{ borderBottom: '1px solid #1f1f1f' }}>
      <Avatar userId={comment.userId} size={26} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-[#d0d0d0]">{user?.name}</span>
          <span className="text-[10px] text-[#444]">{comment.timestamp}</span>
        </div>
        <p className="text-[12.5px] text-[#909090] leading-relaxed">{comment.text}</p>
      </div>
    </div>
  )
}

export default function IssueDetail() {
  const issue = detailedIssue
  const assignee = users.find(u => u.id === issue.assigneeId)
  const project = projects.find(p => p.id === issue.projectId)
  const { Icon: PriorityIcon, color: priorityColor, label: priorityLabel } = PRIORITY_CONFIG[issue.priority] || {}

  return (
    <div className="flex h-full overflow-hidden" style={{ background: '#141414' }}>
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden" style={{ borderRight: '1px solid #282828' }}>
        {/* Top bar */}
        <div className="flex items-center gap-2 px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #282828' }}>
          <span className="text-[11px] text-[#444] mono">{issue.id}</span>
          <ChevronRight size={12} className="text-[#333]" />
          <span className="text-[11px] text-[#666] truncate">{issue.title.slice(0, 40)}…</span>
          <div className="ml-auto flex items-center gap-2">
            <button className="p-1.5 rounded hover:bg-[#222] text-[#444] hover:text-[#777] transition-colors">
              <Link2 size={13} />
            </button>
            <button className="p-1.5 rounded hover:bg-[#222] text-[#444] hover:text-[#777] transition-colors">
              <MoreHorizontal size={13} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Status + Priority row */}
          <div className="flex items-center gap-2 mb-5">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs border border-[#2a2a2a] hover:border-[#3a3a3a] text-[#888] hover:text-[#aaa] transition-colors gap-1">
              <StatusIcon status={issue.status} size={12} />
              <span>In Progress</span>
              <ChevronDown size={11} />
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded text-xs border border-[#2a2a2a] hover:border-[#3a3a3a] hover:text-[#aaa] transition-colors"
              style={{ color: priorityColor }}>
              {PriorityIcon && <PriorityIcon size={12} />}
              <span>{priorityLabel}</span>
              <ChevronDown size={11} className="text-[#555]" />
            </button>
          </div>

          {/* Title */}
          <h1 className="text-[22px] font-semibold text-[#e8e8e8] leading-snug mb-5 tracking-tight">
            {issue.title}
          </h1>

          {/* Description */}
          <div className="mb-6">
            <DescriptionBlock text={issue.description} />
          </div>

          {/* Attachments */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Paperclip size={13} className="text-[#444]" />
              <span className="text-[11px] font-semibold text-[#555] uppercase tracking-wide">Attachments</span>
            </div>
            <button className="text-[12px] text-[#444] hover:text-[#666] transition-colors border border-dashed border-[#282828] rounded px-4 py-2 w-full text-center hover:border-[#333]">
              Drop files here or click to attach
            </button>
          </div>

          {/* Sub-issues */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Hash size={13} className="text-[#444]" />
              <span className="text-[11px] font-semibold text-[#555] uppercase tracking-wide">Sub-issues</span>
              <span className="text-[10px] text-[#3a3a3a] bg-[#1f1f1f] rounded-full px-1.5">{issue.subIssues.length}</span>
            </div>
            <div className="border border-[#222] rounded overflow-hidden">
              {issue.subIssues.map((sub, idx) => (
                <div key={sub.id}
                  className="flex items-center gap-2 px-3 transition-colors cursor-pointer"
                  style={{ height: 32, borderBottom: idx < issue.subIssues.length - 1 ? '1px solid #1f1f1f' : 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <StatusIcon status={sub.status} size={12} />
                  <span className="mono text-[10px] text-[#3a3a3a] w-20 flex-shrink-0">{sub.id}</span>
                  <span className="text-[12px] text-[#b0b0b0]">{sub.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity / Comments */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare size={13} className="text-[#444]" />
              <span className="text-[11px] font-semibold text-[#555] uppercase tracking-wide">Activity</span>
            </div>
            {issue.comments.map(c => <Comment key={c.id} comment={c} />)}

            {/* Comment input */}
            <div className="flex gap-3 pt-4">
              <Avatar userId="u1" size={26} />
              <div className="flex-1 bg-[#1c1c1c] border border-[#282828] rounded-lg p-3 hover:border-[#333] transition-colors">
                <input
                  type="text"
                  placeholder="Leave a comment… (supports markdown)"
                  className="w-full bg-transparent text-[12.5px] text-[#888] placeholder-[#444] outline-none"
                />
                <div className="flex items-center justify-between mt-2 pt-2" style={{ borderTop: '1px solid #222' }}>
                  <span className="text-[10px] text-[#3a3a3a]">Markdown supported</span>
                  <button className="flex items-center gap-1 px-2 py-1 rounded text-[11px] transition-colors"
                    style={{ background: ACCENT + '22', color: ACCENT }}>
                    <Send size={10} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar — Properties */}
      <div className="flex-shrink-0 overflow-y-auto py-4" style={{ width: 240, background: '#171717' }}>
        <div className="px-3 mb-3">
          <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">Properties</span>
        </div>

        <PropRow icon={User} label="Assignee">
          <div className="flex items-center gap-1.5">
            <Avatar userId={issue.assigneeId} size={16} />
            <span>{assignee?.name}</span>
          </div>
        </PropRow>

        <PropRow icon={Tag} label="Label">
          <div className="flex gap-1 flex-wrap">
            {issue.labels.map(l => {
              const def = labelDefs[l]
              return def ? (
                <span key={l} className="px-1 py-0.5 rounded text-[10px]"
                  style={{ color: def.color, background: def.bg }}>
                  {def.name}
                </span>
              ) : null
            })}
          </div>
        </PropRow>

        <PropRow icon={AlertOctagon} label="Priority">
          <span style={{ color: priorityColor }}>{priorityLabel}</span>
        </PropRow>

        <PropRow icon={Circle} label="Status">
          <div className="flex items-center gap-1.5">
            <StatusIcon status={issue.status} size={11} />
            <span>In Progress</span>
          </div>
        </PropRow>

        <PropRow icon={Zap} label="Cycle">
          <span>Cycle 12</span>
        </PropRow>

        <PropRow icon={FolderOpen} label="Project">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: project?.color }} />
            <span>{project?.name}</span>
          </div>
        </PropRow>

        <PropRow icon={Link2} label="Parent">
          <span className="text-[#3a3a3a]">None</span>
        </PropRow>

        <PropRow icon={BarChart} label="Estimate">
          <span>{issue.estimate} points</span>
        </PropRow>

        <PropRow icon={Calendar} label="Due date">
          <span>Mar 31, 2026</span>
        </PropRow>

        <PropRow icon={Clock} label="Created">
          <span>Mar 20, 2026</span>
        </PropRow>

        <div className="mt-4 px-3">
          <div className="h-px bg-[#222] mb-4" />
          <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">Relations</span>
        </div>
        <div className="px-3 py-2">
          <button className="text-[11px] text-[#3a3a3a] hover:text-[#666] transition-colors">
            + Add relation
          </button>
        </div>
      </div>
    </div>
  )
}
