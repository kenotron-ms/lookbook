import { useState } from 'react'
import { CalendarRange, Plus, ChevronRight } from 'lucide-react'
import TaskRow from '../components/TaskRow.jsx'
import { TASKS } from '../data/tasks.js'

const DATE_GROUPS = [
  {
    id: 'overdue',
    label: 'Overdue',
    sublabel: '',
    color: '#db4035',
    section: 'overdue',
    dateFilter: null,
  },
  {
    id: 'today',
    label: 'Today',
    sublabel: 'Monday, Mar 29',
    color: '#25b84c',
    section: 'today',
    dateFilter: '2026-03-29',
  },
  {
    id: 'tomorrow',
    label: 'Tomorrow',
    sublabel: 'Tuesday, Mar 30',
    color: '#4073ff',
    section: 'upcoming',
    dateFilter: '2026-03-30',
  },
  {
    id: 'apr3',
    label: 'Thursday, Apr 3',
    sublabel: '4 days away',
    color: '#888',
    section: 'upcoming',
    dateFilter: '2026-04-03',
  },
  {
    id: 'apr7',
    label: 'Monday, Apr 7',
    sublabel: '9 days away',
    color: '#888',
    section: 'upcoming',
    dateFilter: '2026-04-07',
  },
]

export default function Upcoming() {
  const [collapsed, setCollapsed]     = useState({})
  const [completedIds, setCompletedIds] = useState(new Set())

  const getGroupTasks = (group) => {
    if (group.id === 'overdue') {
      return TASKS.filter(t => t.section === 'overdue')
    }
    if (group.id === 'today') {
      return TASKS.filter(t => t.section === 'today' && !t.completed).slice(0, 5)
    }
    return TASKS.filter(t => t.dueDate === group.dateFilter)
  }

  const toggle = (id) => setCollapsed(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 40px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
        <CalendarRange size={22} color="#e8e8e8" />
        <h1 style={{ fontSize: 22, fontWeight: 700, color: '#e8e8e8', letterSpacing: '-0.3px' }}>
          Upcoming
        </h1>
      </div>

      {/* ── Timeline ── */}
      {DATE_GROUPS.map(group => {
        const tasks   = getGroupTasks(group)
        const isOpen  = !collapsed[group.id]

        return (
          <div key={group.id}>
            {/* Date group header */}
            <div
              className="date-group-header"
              onClick={() => toggle(group.id)}
              style={{ cursor: 'pointer', userSelect: 'none' }}
            >
              <span style={{
                width: 10, height: 10,
                borderRadius: '50%',
                background: group.color,
                flexShrink: 0,
              }} />
              <span style={{ color: group.color === '#888' ? '#ccc' : group.color }}>
                {group.label}
              </span>
              {group.sublabel && (
                <span style={{ color: '#555', fontSize: 11, fontWeight: 400 }}>
                  {group.sublabel}
                </span>
              )}
              <span style={{ color: '#444', fontSize: 11, marginLeft: 6 }}>
                {tasks.length > 0 ? `${tasks.length} tasks` : 'No tasks'}
              </span>
              <ChevronRight
                size={14}
                color="#444"
                style={{
                  marginLeft: 'auto',
                  transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.15s',
                }}
              />
            </div>

            {/* Tasks */}
            {isOpen && (
              <div style={{ paddingLeft: 0 }}>
                {tasks.length === 0 ? (
                  <div style={{
                    color: '#444', fontSize: 12, padding: '8px 6px 12px',
                    fontStyle: 'italic',
                  }}>
                    No tasks scheduled
                  </div>
                ) : (
                  tasks.map(t => (
                    <TaskRow
                      key={t.id}
                      task={t}
                      onComplete={id => setCompletedIds(p => new Set([...p, id]))}
                    />
                  ))
                )}

                {isOpen && group.id !== 'overdue' && (
                  <div className="add-task-row">
                    <Plus size={13} />
                    <span style={{ fontSize: 12 }}>
                      Add task for {group.label === 'Today' || group.label === 'Tomorrow' ? group.label.toLowerCase() : group.label}
                    </span>
                  </div>
                )}
              </div>
            )}

            <div style={{ height: 1, background: '#222', margin: '4px 0 0' }} />
          </div>
        )
      })}
    </div>
  )
}
