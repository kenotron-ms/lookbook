import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Filter, ArrowUpDown, Table2, Columns, Calendar, Image, ChevronDown, LayoutGrid } from 'lucide-react'

const STATUS_CONFIG = {
  'Not Started': { bg: '#252525', color: '#888', border: '#3d3d3d' },
  'In Progress': { bg: '#1e3a5f', color: '#60a5fa', border: '#2563eb44' },
  'Done':        { bg: '#1a3d2b', color: '#4ade80', border: '#16a34a44' },
  'Blocked':     { bg: '#3d1a1a', color: '#f87171', border: '#dc262644' },
}

const PRIORITY_CONFIG = {
  'High':   { color: '#ef4444' },
  'Medium': { color: '#f59e0b' },
  'Low':    { color: '#22c55e' },
}

const ROWS = [
  { id: 1, title: 'Auth system overhaul', status: 'In Progress', priority: 'High', assignee: 'JD', due: 'Mar 30', tags: ['Backend', 'Security'] },
  { id: 2, title: 'Design token migration', status: 'Done', priority: 'Medium', assignee: 'SR', due: 'Mar 22', tags: ['Design'] },
  { id: 3, title: 'API rate limiting', status: 'In Progress', priority: 'High', assignee: 'MK', due: 'Apr 5', tags: ['Backend'] },
  { id: 4, title: 'Onboarding flow redesign', status: 'Not Started', priority: 'Medium', assignee: 'AL', due: 'Apr 12', tags: ['Design', 'Product'] },
  { id: 5, title: 'Mobile app v2.0', status: 'Blocked', priority: 'High', assignee: 'JD', due: 'Apr 20', tags: ['Mobile'] },
  { id: 6, title: 'Search indexing', status: 'In Progress', priority: 'Medium', assignee: 'MK', due: 'Mar 28', tags: ['Backend', 'Search'] },
  { id: 7, title: 'Dashboard analytics', status: 'Not Started', priority: 'Low', assignee: 'SR', due: 'May 1', tags: ['Frontend'] },
  { id: 8, title: 'Email notification system', status: 'Done', priority: 'Low', assignee: 'AL', due: 'Mar 15', tags: ['Backend'] },
  { id: 9, title: 'SSO integration', status: 'Not Started', priority: 'High', assignee: 'JD', due: 'Apr 30', tags: ['Security', 'Auth'] },
  { id: 10, title: 'Performance audit', status: 'In Progress', priority: 'Medium', assignee: 'MK', due: 'Mar 31', tags: ['Infra'] },
]

const VIEWS = [
  { id: 'table', icon: Table2, label: 'Table', path: '/database/roadmap' },
  { id: 'board', icon: Columns, label: 'Board', path: '/board/roadmap' },
  { id: 'calendar', icon: Calendar, label: 'Calendar', path: '/database/roadmap' },
  { id: 'gallery', icon: Image, label: 'Gallery', path: '/database/roadmap' },
]

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG['Not Started']
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 4,
      background: cfg.bg, color: cfg.color,
      border: `1px solid ${cfg.border}`,
      fontSize: 11, fontWeight: 500, whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  )
}

function PriorityDot({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || { color: '#888' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        width: 8, height: 8, borderRadius: '50%',
        background: cfg.color, flexShrink: 0,
        boxShadow: `0 0 5px ${cfg.color}66`,
      }} />
      <span style={{ fontSize: 12, color: '#bbb' }}>{priority}</span>
    </div>
  )
}

function Avatar({ initials }) {
  const colors = { JD: '#9333ea', SR: '#0ea5e9', MK: '#10b981', AL: '#f59e0b' }
  return (
    <div style={{
      width: 22, height: 22, borderRadius: '50%',
      background: colors[initials] || '#555',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 9, fontWeight: 700, color: '#fff', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

const COLS = ['Title', 'Status', 'Priority', 'Assignee', 'Due Date', 'Tags']

export default function DatabaseTable() {
  const [checked, setChecked] = useState({})
  const [activeView, setActiveView] = useState('table')
  const navigate = useNavigate()

  const toggleCheck = id => setChecked(c => ({ ...c, [id]: !c[id] }))
  const allChecked = ROWS.every(r => checked[r.id])
  const toggleAll = () => {
    if (allChecked) setChecked({})
    else setChecked(Object.fromEntries(ROWS.map(r => [r.id, true])))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Page header */}
      <div style={{ padding: '32px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
          <span style={{ fontSize: 28 }}>🗺️</span>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#e6e6e6' }}>Roadmap</h1>
        </div>
        <p style={{ fontSize: 13, color: '#555', marginBottom: 20 }}>
          Track feature progress, assignments, and delivery timelines.
        </p>

        {/* View switcher */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 0, borderBottom: '1px solid #2d2d2d', paddingBottom: 0 }}>
          {VIEWS.map(v => {
            const Icon = v.icon
            const isActive = activeView === v.id
            return (
              <button
                key={v.id}
                onClick={() => {
                  setActiveView(v.id)
                  if (v.path !== '/database/roadmap') navigate(v.path)
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 14px', background: 'transparent', border: 'none',
                  cursor: 'pointer', fontSize: 12, fontWeight: 500,
                  color: isActive ? '#9333ea' : '#666',
                  borderBottom: isActive ? '2px solid #9333ea' : '2px solid transparent',
                  marginBottom: -1,
                }}
              >
                <Icon size={13} />
                {v.label}
              </button>
            )
          })}
          <div style={{ flex: 1 }} />
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: '#666' }}>
            <Filter size={12} />Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: '#666' }}>
            <ArrowUpDown size={12} />Sort
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px',
            background: '#9333ea', border: 'none', cursor: 'pointer', fontSize: 12,
            color: '#fff', borderRadius: 5, fontWeight: 500, marginLeft: 4,
          }}>
            <Plus size={12} />New
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto', padding: '0 40px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760 }}>
          {/* Sticky header */}
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            <tr style={{ background: '#111111', borderBottom: '1px solid #2d2d2d' }}>
              <th style={{ width: 36, padding: '9px 12px', textAlign: 'center' }}>
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  style={{ accentColor: '#9333ea', cursor: 'pointer' }}
                />
              </th>
              {COLS.map(col => (
                <th key={col} style={{
                  padding: '9px 12px', textAlign: 'left',
                  fontSize: 11, fontWeight: 600, color: '#555',
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  borderRight: '1px solid #2d2d2d',
                  cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {col}
                    <ChevronDown size={10} color="#444" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.id}
                style={{ background: i % 2 === 0 ? '#191919' : '#1b1b1b', borderBottom: '1px solid #252525' }}
                onMouseEnter={e => e.currentTarget.style.background = '#222'}
                onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? '#191919' : '#1b1b1b'}
              >
                <td style={{ padding: '9px 12px', textAlign: 'center', borderRight: '1px solid #2d2d2d' }}>
                  <input
                    type="checkbox"
                    checked={!!checked[row.id]}
                    onChange={() => toggleCheck(row.id)}
                    style={{ accentColor: '#9333ea', cursor: 'pointer' }}
                  />
                </td>
                <td style={{ padding: '9px 12px', borderRight: '1px solid #2d2d2d' }}>
                  <span style={{ fontSize: 13, color: '#e6e6e6', fontWeight: 450 }}>{row.title}</span>
                </td>
                <td style={{ padding: '9px 12px', borderRight: '1px solid #2d2d2d' }}>
                  <StatusPill status={row.status} />
                </td>
                <td style={{ padding: '9px 12px', borderRight: '1px solid #2d2d2d' }}>
                  <PriorityDot priority={row.priority} />
                </td>
                <td style={{ padding: '9px 12px', borderRight: '1px solid #2d2d2d' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Avatar initials={row.assignee} />
                    <span style={{ fontSize: 12, color: '#aaa' }}>{row.assignee}</span>
                  </div>
                </td>
                <td style={{ padding: '9px 12px', borderRight: '1px solid #2d2d2d' }}>
                  <span style={{ fontSize: 12, color: '#aaa' }}>{row.due}</span>
                </td>
                <td style={{ padding: '9px 12px' }}>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {row.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: 10, padding: '2px 7px', borderRadius: 3,
                        background: '#252525', color: '#888', border: '1px solid #3d3d3d',
                        fontWeight: 500,
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr style={{ borderTop: '2px solid #2d2d2d', background: '#111111' }}>
              <td colSpan={2} style={{ padding: '8px 12px' }}>
                <button
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'transparent', border: 'none', cursor: 'pointer',
                    color: '#555', fontSize: 12,
                  }}
                >
                  <Plus size={12} />
                  New row
                </button>
              </td>
              <td colSpan={5} style={{ padding: '8px 12px', fontSize: 11, color: '#444', textAlign: 'right' }}>
                {ROWS.length} rows · {Object.values(checked).filter(Boolean).length} selected
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}
