import { useState } from 'react'
import {
  SlidersHorizontal, LayoutGrid, List, Plus, ChevronDown, ChevronRight, Check,
} from 'lucide-react'
import TaskRow from '../components/TaskRow.jsx'
import { TASKS } from '../data/tasks.js'

export default function Today() {
  const [completedIds, setCompletedIds]   = useState(new Set())
  const [showCompleted, setShowCompleted] = useState(true)
  const [addingTask, setAddingTask]       = useState(false)
  const [newTaskTitle, setNewTaskTitle]   = useState('')
  const [overdueOpen, setOverdueOpen]     = useState(true)
  const [todayOpen, setTodayOpen]         = useState(true)
  const [score, setScore]                 = useState(0)

  const overdue    = TASKS.filter(t => t.section === 'overdue')
  const todayTasks = TASKS.filter(t => t.section === 'today' && !t.completed)
  const completed  = TASKS.filter(t => t.section === 'today' && t.completed)

  const handleComplete = (id) => {
    setCompletedIds(prev => new Set([...prev, id]))
    setScore(s => s + 10)
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 40px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8e8e8', letterSpacing: '-0.3px' }}>
            Today
          </h1>
          <div style={{ fontSize: 13, color: '#666', marginTop: 3 }}>
            Monday, March 29
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {score > 0 && (
            <span style={{
              fontSize: 11, color: '#ff9933', background: 'rgba(255,153,51,0.12)',
              padding: '3px 8px', borderRadius: 20, fontWeight: 600,
            }}>
              +{score} pts
            </span>
          )}
          <button className="view-toggle-btn">
            <SlidersHorizontal size={13} /> Sort
          </button>
          <button className="view-toggle-btn">
            <LayoutGrid size={13} /> View
          </button>
        </div>
      </div>

      {/* ── Overdue ── */}
      <div>
        <div
          className="section-header"
          onClick={() => setOverdueOpen(o => !o)}
          style={{ color: '#db4035' }}
        >
          {overdueOpen
            ? <ChevronDown size={14} color="#db4035" />
            : <ChevronRight size={14} color="#db4035" />}
          Overdue
          <span style={{
            marginLeft: 'auto', fontSize: 10, background: '#db403522',
            color: '#db4035', padding: '1px 6px', borderRadius: 3, fontWeight: 700,
          }}>
            {overdue.length}
          </span>
        </div>

        {overdueOpen && overdue.map(t => (
          <TaskRow key={t.id} task={t} onComplete={handleComplete} />
        ))}
      </div>

      {/* ── Divider ── */}
      <div style={{ height: 1, background: '#2e2e2e', margin: '8px 0' }} />

      {/* ── Today tasks ── */}
      <div>
        <div
          className="section-header"
          onClick={() => setTodayOpen(o => !o)}
        >
          {todayOpen
            ? <ChevronDown size={14} />
            : <ChevronRight size={14} />}
          Today
          <span style={{ color: '#555', fontSize: 11, fontWeight: 400 }}>
            · {todayTasks.filter(t => !completedIds.has(t.id)).length} tasks
          </span>
        </div>

        {todayOpen && todayTasks.map(t => (
          <TaskRow key={t.id} task={t} onComplete={handleComplete} />
        ))}

        {/* Add task row */}
        {todayOpen && !addingTask && (
          <div className="add-task-row" onClick={() => setAddingTask(true)}>
            <Plus size={15} />
            <span style={{ fontSize: 13 }}>Add task</span>
          </div>
        )}

        {todayOpen && addingTask && (
          <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center' }}>
            <input
              autoFocus
              className="task-input"
              placeholder="Task name"
              value={newTaskTitle}
              onChange={e => setNewTaskTitle(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') setAddingTask(false)
                if (e.key === 'Escape') { setNewTaskTitle(''); setAddingTask(false) }
              }}
            />
            <button
              onClick={() => setAddingTask(false)}
              style={{
                background: '#db4035', color: '#fff', border: 'none',
                borderRadius: 5, padding: '6px 14px', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap',
              }}
            >
              Add task
            </button>
            <button
              onClick={() => { setNewTaskTitle(''); setAddingTask(false) }}
              style={{
                background: 'transparent', color: '#888', border: 'none',
                borderRadius: 5, padding: '6px 10px', cursor: 'pointer', fontSize: 13,
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* ── Completed ── */}
      {completed.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: '#555', fontSize: 12, fontWeight: 600,
              cursor: 'pointer', padding: '8px 0', userSelect: 'none',
              textTransform: 'uppercase', letterSpacing: 0.5,
            }}
            onClick={() => setShowCompleted(o => !o)}
          >
            <Check size={13} color="#25b84c" />
            <span>Completed</span>
            <span style={{ color: '#444' }}>· {completed.length}</span>
            {showCompleted
              ? <ChevronDown size={12} style={{ marginLeft: 'auto' }} />
              : <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
          </div>

          {showCompleted && completed.map(t => (
            <TaskRow key={t.id} task={t} onComplete={() => {}} />
          ))}
        </div>
      )}
    </div>
  )
}
