import { useState } from 'react'
import { Zap, ChevronRight, Calendar, Target } from 'lucide-react'
import { issues, users, currentCycle, burnupData } from '../data/issues.js'
import { CheckCircle2, Circle, AlertOctagon, ArrowUp, Minus, ArrowDown } from 'lucide-react'

const ACCENT = '#5e6ad2'

function StatusDot({ status }) {
  if (status === 'in_progress') {
    return (
      <svg width={12} height={12} viewBox="0 0 12 12" className="flex-shrink-0">
        <circle cx="6" cy="6" r="5" fill="none" stroke="#5e6ad2" strokeWidth="1.5" />
        <circle cx="6" cy="6" r="5" fill="none" stroke="#5e6ad2" strokeWidth="1.5"
          strokeDasharray="10 22" strokeLinecap="round"
          style={{ transformOrigin: '6px 6px', animation: 'spin-slow 2s linear infinite' }} />
        <circle cx="6" cy="6" r="2" fill="#5e6ad2" />
      </svg>
    )
  }
  if (status === 'done') return <CheckCircle2 size={12} style={{ color: '#4cb782' }} className="flex-shrink-0" />
  return <Circle size={12} style={{ color: '#555' }} className="flex-shrink-0" />
}

const PRIORITY_COLORS = { urgent: '#eb5757', high: '#f0820f', medium: '#f2c94c', low: '#9999a8' }

function Avatar({ userId, size = 20 }) {
  const user = users.find(u => u.id === userId)
  if (!user) return null
  return (
    <div className="flex items-center justify-center rounded-full flex-shrink-0 font-semibold"
      style={{ width: size, height: size, background: user.color + '33', border: `1px solid ${user.color}55`, color: user.color, fontSize: size * 0.45 }}>
      {user.initials}
    </div>
  )
}

// ── Burn-up chart ────────────────────────────────────────────────
function BurnupChart() {
  const W = 560, H = 120
  const pts = burnupData
  const maxScope = Math.max(...pts.map(p => p.scope))
  const n = pts.length

  const toX = i => 24 + (i / (n - 1)) * (W - 48)
  const toY = v => H - 16 - (v / maxScope) * (H - 32)

  // Scope line (all points)
  const scopePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(p.scope)}`).join(' ')

  // Completed line (only non-null)
  const compPoints = pts.filter(p => p.completed !== null)
  const compPath = compPoints.map((p, i) => {
    const realIdx = pts.indexOf(p)
    return `${i === 0 ? 'M' : 'L'} ${toX(realIdx)} ${toY(p.completed)}`
  }).join(' ')

  // Ideal line
  const idealPath = `M ${toX(0)} ${toY(0)} L ${toX(n - 1)} ${toY(maxScope)}`

  // Grid lines
  const gridYs = [0, 0.25, 0.5, 0.75, 1].map(f => toY(f * maxScope))
  const today = 6 // index of today

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
      {/* Grid */}
      {gridYs.map((y, i) => (
        <line key={i} x1={24} y1={y} x2={W - 24} y2={y}
          stroke="#282828" strokeWidth="1" />
      ))}
      {/* Today line */}
      <line x1={toX(today)} y1={16} x2={toX(today)} y2={H - 16}
        stroke="#333" strokeWidth="1" strokeDasharray="3 3" />
      <text x={toX(today) + 4} y={24} fill="#444" fontSize="10">Today</text>

      {/* Ideal */}
      <path d={idealPath} fill="none" stroke="#333" strokeWidth="1" strokeDasharray="4 3" />

      {/* Scope */}
      <path d={scopePath} fill="none" stroke="#5e6ad2" strokeWidth="1.5" opacity="0.5" />

      {/* Completed */}
      <path d={compPath} fill="none" stroke="#4cb782" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots on completed */}
      {compPoints.map((p, i) => {
        const realIdx = pts.indexOf(p)
        return <circle key={i} cx={toX(realIdx)} cy={toY(p.completed)} r="2.5" fill="#4cb782" />
      })}

      {/* Legend */}
      <g transform={`translate(${W - 130}, 12)`}>
        <line x1="0" y1="5" x2="14" y2="5" stroke="#5e6ad2" strokeWidth="1.5" opacity="0.5" />
        <text x="18" y="9" fill="#666" fontSize="9">Scope</text>
        <line x1="0" y1="18" x2="14" y2="18" stroke="#4cb782" strokeWidth="2" />
        <text x="18" y="22" fill="#666" fontSize="9">Completed</text>
        <line x1="0" y1="31" x2="14" y2="31" stroke="#333" strokeWidth="1" strokeDasharray="4 3" />
        <text x="18" y="35" fill="#666" fontSize="9">Ideal</text>
      </g>
    </svg>
  )
}

// ── Assignee group ───────────────────────────────────────────────
function AssigneeGroup({ user, userIssues }) {
  const done = userIssues.filter(i => i.status === 'done').length
  const total = userIssues.length
  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 px-4 py-2" style={{ borderBottom: '1px solid #1f1f1f' }}>
        <div className="flex items-center justify-center rounded-full font-semibold text-[11px]"
          style={{ width: 22, height: 22, background: user.color + '33', border: `1px solid ${user.color}55`, color: user.color }}>
          {user.initials}
        </div>
        <span className="text-xs text-[#c0c0c0] font-medium">{user.name}</span>
        <span className="text-[11px] text-[#444] ml-1">{done}/{total}</span>
        <div className="ml-auto flex items-center gap-2">
          <div className="h-1 w-20 rounded-full bg-[#282828] overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${total ? (done / total) * 100 : 0}%`, background: ACCENT }} />
          </div>
          <span className="text-[10px] text-[#444]">{total ? Math.round((done / total) * 100) : 0}%</span>
        </div>
      </div>
      {userIssues.map(issue => (
        <div key={issue.id} className="flex items-center gap-2 px-4 transition-colors"
          style={{ height: 32, borderBottom: '1px solid #1a1a1a' }}
          onMouseEnter={e => e.currentTarget.style.background = '#1a1a1a'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <StatusDot status={issue.status} />
          <span className="mono text-[10px] text-[#3a3a3a] w-14 flex-shrink-0">{issue.id}</span>
          <span className="text-[12px] text-[#c8c8c8] truncate flex-1">{issue.title}</span>
          <span className="text-[10px]" style={{ color: PRIORITY_COLORS[issue.priority] || '#555' }}>
            {issue.priority}
          </span>
          <span className="text-[10px] text-[#444]">{issue.dueDate}</span>
        </div>
      ))}
    </div>
  )
}

export default function Cycles() {
  const cycle = currentCycle
  const cycleIssues = issues.filter(i => i.cycleId === 'c12')
  const done = cycleIssues.filter(i => i.status === 'done').length
  const inProgress = cycleIssues.filter(i => i.status === 'in_progress').length

  // Group by assignee
  const assigneeIds = [...new Set(cycleIssues.map(i => i.assigneeId))]

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#141414' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #282828' }}>
        <div className="flex items-center gap-2">
          <Zap size={16} style={{ color: ACCENT }} />
          <h1 className="text-sm font-semibold text-[#e2e2e2]">{cycle.name}</h1>
          <span className="text-[#444] text-sm">·</span>
          <span className="text-xs text-[#666]">{cycle.startDate} – {cycle.endDate}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-[#666]">
            <Calendar size={12} />
            <span>{cycle.daysRemaining} days left</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#666]">
            <Target size={12} />
            <span>{done}/{cycleIssues.length} done</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Cycle stats */}
        <div className="px-6 py-4 grid grid-cols-4 gap-3" style={{ borderBottom: '1px solid #282828' }}>
          {[
            { label: 'Total', value: cycleIssues.length, color: '#888' },
            { label: 'In Progress', value: inProgress, color: ACCENT },
            { label: 'Completed', value: done, color: '#4cb782' },
            { label: 'Remaining', value: cycleIssues.length - done, color: '#f0820f' },
          ].map(stat => (
            <div key={stat.label} className="bg-[#1a1a1a] rounded p-3 border border-[#282828]">
              <div className="text-[10px] text-[#555] uppercase tracking-wide mb-1">{stat.label}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="px-6 py-3" style={{ borderBottom: '1px solid #282828' }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-[#555]">Cycle progress</span>
            <span className="text-[11px] font-medium" style={{ color: ACCENT }}>{cycle.progress}%</span>
          </div>
          <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${cycle.progress}%`, background: `linear-gradient(90deg, ${ACCENT}, #7b8ae8)` }} />
          </div>
        </div>

        {/* Burn-up chart */}
        <div className="px-6 py-4" style={{ borderBottom: '1px solid #282828' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-[#888]">Burn-up Chart</span>
            <span className="text-[10px] text-[#444]">scope vs completed over time</span>
          </div>
          <div className="bg-[#181818] rounded border border-[#222] p-3">
            <BurnupChart />
          </div>
        </div>

        {/* Issues by assignee */}
        <div className="px-0 py-2">
          <div className="flex items-center px-4 mb-2">
            <span className="text-[11px] text-[#444] uppercase tracking-widest font-semibold">By Assignee</span>
          </div>
          {assigneeIds.map(uid => {
            const user = users.find(u => u.id === uid)
            const userIssues = cycleIssues.filter(i => i.assigneeId === uid)
            if (!user) return null
            return <AssigneeGroup key={uid} user={user} userIssues={userIssues} />
          })}
        </div>
      </div>
    </div>
  )
}
