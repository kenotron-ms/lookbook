import { useState } from 'react'
import { Map, ChevronRight, ChevronDown, Circle } from 'lucide-react'
import { initiatives } from '../data/issues.js'

const ACCENT = '#5e6ad2'

const QUARTERS = ['Q1', 'Q2', 'Q3', 'Q4']
const WEEKS_PER_Q = 13
const TOTAL_WEEKS = 52

// Layout constants
const LABEL_W = 220
const WEEK_W = 18
const ROW_H = 36
const HEADER_H = 48

function getInitiativeRange(initiative, selectedQ) {
  // Convert quarter+week to absolute week number
  const startAbs = (initiative.startQ - 1) * WEEKS_PER_Q + initiative.startWeek
  const endAbs = (initiative.endQ - 1) * WEEKS_PER_Q + initiative.endWeek
  return { startAbs, endAbs }
}

function InitiativeBar({ initiative, viewStartWeek, viewWeeks }) {
  const { startAbs, endAbs } = getInitiativeRange(initiative)
  const relStart = startAbs - viewStartWeek
  const relEnd = endAbs - viewStartWeek

  // Clamp to view
  const clampedStart = Math.max(0, relStart)
  const clampedEnd = Math.min(viewWeeks, relEnd)
  if (clampedEnd <= clampedStart) return null

  const left = clampedStart * WEEK_W
  const width = (clampedEnd - clampedStart) * WEEK_W

  const isPartialStart = relStart < 0
  const isPartialEnd = relEnd > viewWeeks
  const progress = initiative.progress

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 flex items-center overflow-hidden group cursor-pointer"
      style={{
        left,
        width,
        height: 22,
        background: initiative.teamColor + '28',
        border: `1px solid ${initiative.teamColor}50`,
        borderRadius: isPartialStart && isPartialEnd ? 0 : isPartialStart ? '0 4px 4px 0' : isPartialEnd ? '4px 0 0 4px' : 4,
      }}
    >
      {/* Progress fill */}
      <div
        className="absolute inset-0 origin-left"
        style={{
          width: `${progress}%`,
          background: initiative.teamColor + '50',
        }}
      />
      {/* Label */}
      <span className="relative px-2 text-[11px] font-medium truncate"
        style={{ color: initiative.teamColor }}>
        {initiative.name}
      </span>
    </div>
  )
}

// Timeline quarter/month header
function TimelineHeader({ viewStartWeek, viewWeeks, selectedQ }) {
  // Show month-ish labels every ~4 weeks
  const cols = []
  for (let w = 0; w < viewWeeks; w += 4) {
    const absWeek = viewStartWeek + w
    const q = Math.floor((absWeek - 1) / WEEKS_PER_Q) + 1
    const weekInQ = ((absWeek - 1) % WEEKS_PER_Q) + 1
    const monthIdx = Math.floor((weekInQ - 1) / (WEEKS_PER_Q / 3))
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthName = MONTHS[((q - 1) * 3 + monthIdx) % 12]
    cols.push({ w, label: monthName })
  }

  return (
    <div className="relative" style={{ height: HEADER_H, marginLeft: LABEL_W }}>
      {/* Quarter bands */}
      {QUARTERS.map((q, qi) => {
        const qStartAbs = qi * WEEKS_PER_Q + 1
        const qEndAbs = (qi + 1) * WEEKS_PER_Q
        const relStart = qStartAbs - viewStartWeek
        const relEnd = qEndAbs - viewStartWeek
        const cStart = Math.max(0, relStart)
        const cEnd = Math.min(viewWeeks, relEnd)
        if (cEnd <= cStart) return null
        return (
          <div key={q}
            className="absolute top-0 flex items-start justify-start pt-2 px-2"
            style={{
              left: cStart * WEEK_W, width: (cEnd - cStart) * WEEK_W,
              height: HEADER_H,
              borderRight: '1px solid #282828',
              background: qi % 2 === 0 ? 'transparent' : '#0000000a',
            }}>
            <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">{q} 2026</span>
          </div>
        )
      })}
      {/* Month labels */}
      {cols.map(({ w, label }) => (
        <div key={w}
          className="absolute bottom-0 px-1 text-[10px] text-[#3a3a3a]"
          style={{ left: w * WEEK_W, bottom: 6 }}>
          {label}
        </div>
      ))}
      {/* Week tick lines */}
      {Array.from({ length: viewWeeks }, (_, i) => (
        <div key={i} className="absolute bottom-0"
          style={{ left: i * WEEK_W, width: 1, height: 6, background: i % 4 === 0 ? '#282828' : '#1e1e1e' }} />
      ))}
    </div>
  )
}

export default function Roadmap() {
  const [selectedQ, setSelectedQ] = useState(1)
  const [expandedTeams, setExpandedTeams] = useState({ Engineering: true, Product: true, Design: true })

  // View window: show 2 quarters for context
  const viewStartWeek = (selectedQ - 1) * WEEKS_PER_Q + 1
  const viewWeeks = WEEKS_PER_Q * 2
  const timelineW = viewWeeks * WEEK_W

  // Group initiatives by team
  const teams = [...new Set(initiatives.map(i => i.team))]

  const toggleTeam = team => {
    setExpandedTeams(prev => ({ ...prev, [team]: !prev[team] }))
  }

  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ background: '#141414' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0" style={{ borderBottom: '1px solid #282828' }}>
        <div className="flex items-center gap-2">
          <Map size={16} style={{ color: ACCENT }} />
          <h1 className="text-sm font-semibold text-[#e2e2e2]">Roadmap</h1>
        </div>
        {/* Quarter tabs */}
        <div className="flex gap-1 bg-[#1a1a1a] rounded p-0.5 border border-[#282828]">
          {QUARTERS.map(q => {
            const qi = parseInt(q[1])
            return (
              <button key={q}
                onClick={() => setSelectedQ(qi)}
                className="px-3 py-1 rounded text-xs font-medium transition-colors"
                style={{
                  background: selectedQ === qi ? '#2a2a2a' : 'transparent',
                  color: selectedQ === qi ? ACCENT : '#555',
                }}>
                {q}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#555]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded-full" style={{ background: '#5e6ad2' }} />
            Engineering
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded-full" style={{ background: '#26b5ce' }} />
            Product
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-1 rounded-full" style={{ background: '#4cb782' }} />
            Design
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="flex-1 overflow-auto">
        <div style={{ minWidth: LABEL_W + timelineW + 40 }}>
          {/* Column: label area + timeline header */}
          <div className="flex sticky top-0 z-10" style={{ background: '#141414', borderBottom: '1px solid #282828' }}>
            {/* Label column header */}
            <div className="flex-shrink-0 flex items-end px-4 pb-2" style={{ width: LABEL_W, height: HEADER_H }}>
              <span className="text-[10px] font-semibold text-[#404040] uppercase tracking-widest">Initiative</span>
            </div>
            {/* Timeline header */}
            <TimelineHeader viewStartWeek={viewStartWeek} viewWeeks={viewWeeks} selectedQ={selectedQ} />
          </div>

          {/* Rows by team */}
          {teams.map(team => {
            const teamInits = initiatives.filter(i => i.team === team)
            const teamColor = teamInits[0]?.teamColor || ACCENT
            const expanded = expandedTeams[team]

            return (
              <div key={team}>
                {/* Team header row */}
                <div
                  className="flex items-center cursor-pointer hover:bg-[#1a1a1a] transition-colors"
                  style={{ height: 32, borderBottom: '1px solid #1e1e1e' }}
                  onClick={() => toggleTeam(team)}
                >
                  <div className="flex items-center gap-2 px-4" style={{ width: LABEL_W }}>
                    {expanded
                      ? <ChevronDown size={12} className="text-[#444]" />
                      : <ChevronRight size={12} className="text-[#444]" />
                    }
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: teamColor }} />
                    <span className="text-[11px] font-semibold" style={{ color: teamColor }}>{team}</span>
                    <span className="text-[10px] text-[#3a3a3a] ml-1">{teamInits.length}</span>
                  </div>
                  {/* Timeline background */}
                  <div className="relative flex-1" style={{ height: 32 }}>
                    {/* Alternating Q bands */}
                    {QUARTERS.map((q, qi) => {
                      const qStartAbs = qi * WEEKS_PER_Q + 1
                      const relStart = qStartAbs - viewStartWeek
                      const relEnd = relStart + WEEKS_PER_Q
                      const cStart = Math.max(0, relStart)
                      const cEnd = Math.min(viewWeeks, relEnd)
                      if (cEnd <= cStart) return null
                      return (
                        <div key={q} className="absolute inset-y-0"
                          style={{ left: cStart * WEEK_W, width: (cEnd - cStart) * WEEK_W, background: qi % 2 === 0 ? 'transparent' : '#0000000a' }} />
                      )
                    })}
                    {/* Week grid */}
                    {Array.from({ length: viewWeeks }, (_, i) => (
                      <div key={i} className="absolute inset-y-0"
                        style={{ left: i * WEEK_W, width: 1, background: i % 4 === 0 ? '#1e1e1e' : 'transparent' }} />
                    ))}
                  </div>
                </div>

                {/* Initiative rows */}
                {expanded && teamInits.map(initiative => (
                  <div key={initiative.id}
                    className="flex items-center"
                    style={{ height: ROW_H, borderBottom: '1px solid #1a1a1a' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#181818'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    {/* Label */}
                    <div className="flex items-center gap-2 px-4 flex-shrink-0" style={{ width: LABEL_W }}>
                      <div className="ml-4">
                        <div className="text-[12px] text-[#b0b0b0] truncate" style={{ maxWidth: 160 }}>{initiative.name}</div>
                        <div className="flex items-center gap-1 mt-0.5">
                          <div className="h-1 w-16 rounded-full bg-[#252525] overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${initiative.progress}%`, background: teamColor + '80' }} />
                          </div>
                          <span className="text-[9px] text-[#3a3a3a]">{initiative.progress}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline bar */}
                    <div className="relative flex-1" style={{ height: ROW_H }}>
                      {/* Alternating Q bands */}
                      {QUARTERS.map((q, qi) => {
                        const qStartAbs = qi * WEEKS_PER_Q + 1
                        const relStart = qStartAbs - viewStartWeek
                        const relEnd = relStart + WEEKS_PER_Q
                        const cStart = Math.max(0, relStart)
                        const cEnd = Math.min(viewWeeks, relEnd)
                        if (cEnd <= cStart) return null
                        return (
                          <div key={q} className="absolute inset-y-0"
                            style={{ left: cStart * WEEK_W, width: (cEnd - cStart) * WEEK_W, background: qi % 2 === 0 ? 'transparent' : '#0000000a' }} />
                        )
                      })}
                      {/* Week grid */}
                      {Array.from({ length: viewWeeks }, (_, i) => (
                        <div key={i} className="absolute inset-y-0"
                          style={{ left: i * WEEK_W, width: 1, background: i % 4 === 0 ? '#1e1e1e' : 'transparent' }} />
                      ))}
                      {/* Initiative bar */}
                      <InitiativeBar initiative={initiative} viewStartWeek={viewStartWeek} viewWeeks={viewWeeks} />
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
