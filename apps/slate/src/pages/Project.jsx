import { useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  List, LayoutGrid, Calendar, ChevronDown, ChevronRight, Plus, MoreHorizontal,
} from 'lucide-react'
import TaskRow from '../components/TaskRow.jsx'
import { PROJECTS, TASKS, getTaskById } from '../data/tasks.js'

const BOARD_COLUMNS = [
  { id: 'todo',       name: 'To Do',       color: '#666' },
  { id: 'inprogress', name: 'In Progress',  color: '#4073ff' },
  { id: 'review',     name: 'In Review',    color: '#ff9933' },
  { id: 'done',       name: 'Done',         color: '#25b84c' },
]

export default function Project() {
  const { id: projectId } = useParams()
  const pid = projectId || 'work'

  const project = PROJECTS.find(p => p.id === pid) || PROJECTS[0]
  const [view, setView] = useState('list')
  const [collapsed, setCollapsed] = useState({})
  const [completedIds, setCompletedIds] = useState(new Set())

  const projectTasks = TASKS.filter(t => t.project === project.id && !t.completed)
  const completedTasks = TASKS.filter(t => t.project === project.id && t.completed)
  const progress = projectTasks.length > 0
    ? Math.round((completedTasks.length / (projectTasks.length + completedTasks.length)) * 100)
    : 0

  // Build sections for list view
  const SECTIONS = [
    { id: 'design',      name: 'Design',      color: '#a970ff' },
    { id: 'development', name: 'Development',  color: '#4073ff' },
    { id: 'review',      name: 'Review',       color: '#ff9933' },
  ]

  // Distribute tasks evenly across sections
  const taskChunks = [
    projectTasks.slice(0, Math.ceil(projectTasks.length / 3)),
    projectTasks.slice(Math.ceil(projectTasks.length / 3), Math.ceil(2 * projectTasks.length / 3)),
    projectTasks.slice(Math.ceil(2 * projectTasks.length / 3)),
  ]

  const toggleSection = (id) => {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))
  }

  // Board: distribute tasks across columns
  const boardChunks = [
    projectTasks.slice(0, 2),
    projectTasks.slice(2, 4),
    projectTasks.slice(4, 6),
    completedTasks,
  ]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 40px' }}>

      {/* ── Header ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 14, height: 14, borderRadius: '50%',
              background: project.color, flexShrink: 0,
            }} />
            <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8e8e8', letterSpacing: '-0.3px' }}>
              {project.name}
            </h1>
            <span style={{ color: '#555', fontSize: 14 }}>
              {projectTasks.length} tasks
            </span>
          </div>
          <button style={{
            background: 'none', border: '1px solid #3d3d3d',
            borderRadius: 6, padding: '5px 8px',
            cursor: 'pointer', color: '#888',
          }}>
            <MoreHorizontal size={15} />
          </button>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="progress-bar-track" style={{ flex: 1 }}>
            <div className="progress-bar-fill" style={{ width: `${progress}%`, background: project.color }} />
          </div>
          <span style={{ fontSize: 11, color: '#555', width: 36, textAlign: 'right' }}>
            {progress}%
          </span>
        </div>

        {/* View toggles */}
        <div style={{ display: 'flex', gap: 4, marginTop: 14 }}>
          {[
            { id: 'list',  icon: List,        label: 'List' },
            { id: 'board', icon: LayoutGrid,  label: 'Board' },
            { id: 'cal',   icon: Calendar,    label: 'Calendar' },
          ].map(v => (
            <button
              key={v.id}
              className={`view-toggle-btn ${view === v.id ? 'active' : ''}`}
              onClick={() => setView(v.id)}
            >
              <v.icon size={13} /> {v.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: '#2e2e2e', marginBottom: 16 }} />

      {/* ── List View ── */}
      {view === 'list' && (
        <div>
          {SECTIONS.map((sec, idx) => {
            const secTasks = taskChunks[idx] || []
            const isOpen = !collapsed[sec.id]
            return (
              <div key={sec.id} style={{ marginBottom: 4 }}>
                <div
                  className="section-header"
                  onClick={() => toggleSection(sec.id)}
                  style={{ fontSize: 12 }}
                >
                  {isOpen
                    ? <ChevronDown size={14} />
                    : <ChevronRight size={14} />}
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: sec.color, flexShrink: 0,
                  }} />
                  <span style={{ color: '#ccc' }}>{sec.name}</span>
                  <span style={{ color: '#555', fontWeight: 400 }}>
                    · {secTasks.length}
                  </span>
                  <div style={{ marginLeft: 'auto' }}>
                    <Plus size={13} color="#555" />
                  </div>
                </div>

                {isOpen && secTasks.map(t => (
                  <TaskRow
                    key={t.id}
                    task={t}
                    onComplete={id => setCompletedIds(p => new Set([...p, id]))}
                    showProject={false}
                  />
                ))}

                {isOpen && (
                  <div className="add-task-row" style={{ paddingLeft: 28 }}>
                    <Plus size={13} />
                    <span style={{ fontSize: 12 }}>Add task to {sec.name}</span>
                  </div>
                )}
              </div>
            )
          })}

          <button style={{
            display: 'flex', alignItems: 'center', gap: 6,
            marginTop: 16, color: '#555', fontSize: 13,
            background: 'none', border: '1px dashed #3d3d3d',
            borderRadius: 6, padding: '7px 14px', cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}>
            <Plus size={13} /> Add section
          </button>
        </div>
      )}

      {/* ── Board View ── */}
      {view === 'board' && (
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16 }}>
          {BOARD_COLUMNS.map((col, idx) => {
            const colTasks = boardChunks[idx] || []
            return (
              <div key={col.id} className="board-column" style={{ minWidth: 240 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  marginBottom: 12,
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: col.color, flexShrink: 0,
                  }} />
                  <span style={{ fontWeight: 600, color: '#ccc', fontSize: 13 }}>
                    {col.name}
                  </span>
                  <span style={{ color: '#555', fontSize: 11 }}>{colTasks.length}</span>
                </div>

                {colTasks.map(t => (
                  <div key={t.id} style={{
                    background: '#323232',
                    borderRadius: 6,
                    padding: '10px 12px',
                    marginBottom: 8,
                    border: '1px solid #3d3d3d',
                  }}>
                    <div style={{
                      fontSize: 13, color: t.completed ? '#666' : '#e8e8e8',
                      textDecoration: t.completed ? 'line-through' : 'none',
                      marginBottom: 6,
                      lineHeight: 1.4,
                    }}>{t.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                      <span style={{
                        width: 8, height: 8, borderRadius: '50%',
                        border: `2px solid ${['#db4035','#ff9933','#4073ff','#666'][t.priority-1]}`,
                        flexShrink: 0,
                      }} />
                      {t.dueDate && (
                        <span style={{ fontSize: 10, color: '#666' }}>
                          {new Date(t.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                <div className="add-task-row" style={{ justifyContent: 'center' }}>
                  <Plus size={13} />
                  <span style={{ fontSize: 12 }}>Add task</span>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── Calendar View ── */}
      {view === 'cal' && (
        <div style={{
          textAlign: 'center', color: '#555', padding: '60px 0',
        }}>
          <Calendar size={40} color="#333" style={{ margin: '0 auto 12px', display: 'block' }} />
          <div style={{ fontWeight: 600, color: '#555', marginBottom: 4 }}>Calendar view</div>
          <div style={{ fontSize: 12 }}>
            Task scheduling across your month — coming soon
          </div>
        </div>
      )}
    </div>
  )
}
