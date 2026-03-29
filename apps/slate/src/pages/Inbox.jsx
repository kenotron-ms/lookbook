import { useState } from 'react'
import { Inbox as InboxIcon, Plus, SlidersHorizontal } from 'lucide-react'
import TaskRow from '../components/TaskRow.jsx'
import { TASKS } from '../data/tasks.js'

export default function Inbox() {
  const [addingTask, setAddingTask]   = useState(false)
  const [newTitle, setNewTitle]       = useState('')
  const [completedIds, setCompletedIds] = useState(new Set())

  const inboxTasks = TASKS.filter(t => t.section === 'inbox')

  const handleComplete = (id) => setCompletedIds(prev => new Set([...prev, id]))

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 40px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <InboxIcon size={22} color="#db4035" />
          <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8e8e8', letterSpacing: '-0.3px' }}>
            Inbox
          </h1>
          <span style={{
            background: '#db4035', color: '#fff',
            fontSize: 11, fontWeight: 700,
            padding: '2px 7px', borderRadius: 10,
          }}>5</span>
        </div>
        <button className="view-toggle-btn">
          <SlidersHorizontal size={13} /> Sort
        </button>
      </div>

      {/* ── Quick capture ── */}
      <div style={{
        background: '#282828',
        border: '1px solid #3d3d3d',
        borderRadius: 8,
        padding: '10px 14px',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        cursor: 'text',
      }}
        onClick={() => setAddingTask(true)}
      >
        <Plus size={16} color="#db4035" />
        {addingTask ? (
          <input
            autoFocus
            className="task-input"
            style={{ background: 'transparent', border: 'none', padding: 0, flex: 1, fontSize: 14 }}
            placeholder="Capture a thought…"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === 'Escape') {
                setNewTitle('')
                setAddingTask(false)
              }
            }}
          />
        ) : (
          <span style={{ color: '#555', fontSize: 14 }}>Quick add — capture a thought…</span>
        )}
      </div>

      {/* ── Tasks ── */}
      <div>
        <div style={{
          fontSize: 11, fontWeight: 600, color: '#555',
          textTransform: 'uppercase', letterSpacing: 0.5,
          marginBottom: 4,
        }}>
          {inboxTasks.length} tasks
        </div>

        {inboxTasks.map(t => (
          <TaskRow key={t.id} task={t} onComplete={handleComplete} showProject={false} />
        ))}

        {!addingTask && (
          <div className="add-task-row" onClick={() => setAddingTask(true)}>
            <Plus size={15} />
            <span style={{ fontSize: 13 }}>Add task</span>
          </div>
        )}
      </div>

      {/* ── Empty tip ── */}
      <div style={{
        marginTop: 40, textAlign: 'center', color: '#444',
        fontSize: 13, lineHeight: 1.8,
      }}>
        <InboxIcon size={32} color="#333" style={{ margin: '0 auto 10px', display: 'block' }} />
        <div style={{ fontWeight: 600, color: '#555', marginBottom: 4 }}>Your Inbox captures everything</div>
        <div style={{ fontSize: 12 }}>Tasks without a project land here. Sort them out later.</div>
      </div>
    </div>
  )
}
