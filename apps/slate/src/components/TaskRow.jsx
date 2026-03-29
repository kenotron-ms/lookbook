import { useState } from 'react'
import { MessageSquare, ChevronRight } from 'lucide-react'
import { PROJECTS, LABELS, PRIORITY_COLORS, formatDueDate } from '../data/tasks.js'

export default function TaskRow({ task, onComplete, showProject = true }) {
  const [completing, setCompleting] = useState(false)
  const [done, setDone] = useState(task.completed)
  const [hovered, setHovered] = useState(false)

  const project = task.project ? PROJECTS.find(p => p.id === task.project) : null
  const pColor  = PRIORITY_COLORS[task.priority]
  const due     = task.dueDate ? formatDueDate(task.dueDate) : null

  const handleCheck = () => {
    if (done || completing) return
    setCompleting(true)
    setTimeout(() => {
      setDone(true)
      setCompleting(false)
      onComplete && onComplete(task.id)
    }, 550)
  }

  if (done && !task.completed) return null

  return (
    <div
      className={`task-row${completing ? ' task-completing' : ''}`}
      style={done && task.completed ? {
        opacity: 0.38,
        borderBottom: '1px solid #2a2a2a',
        padding: '7px 6px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      } : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Priority Checkbox */}
      <div
        className="priority-circle"
        onClick={handleCheck}
        style={{
          borderColor: pColor,
          background: hovered && !done ? pColor + '22' : 'transparent',
          position: 'relative',
        }}
      >
        {(done || completing) && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 5l2.5 2.5 4.5-5" stroke={pColor} strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap',
          textDecoration: done ? 'line-through' : 'none',
          color: done ? '#666' : '#e8e8e8',
          fontSize: 14,
          lineHeight: 1.4,
        }}>
          <span style={{ wordBreak: 'break-word' }}>{task.title}</span>
          {task.subtasks > 0 && (
            <span style={{
              fontSize: 10,
              color: '#666',
              background: '#2a2a2a',
              padding: '1px 5px',
              borderRadius: 3,
              flexShrink: 0,
            }}>
              <ChevronRight size={8} style={{ display: 'inline', verticalAlign: 'middle' }} />
              {task.subtasks}
            </span>
          )}
        </div>

        {/* Meta row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          marginTop: 3, flexWrap: 'wrap',
        }}>
          {/* Labels */}
          {task.labels.map(lKey => {
            const lbl = LABELS[lKey]
            if (!lbl) return null
            return (
              <span key={lKey} className="label-pill" style={{ color: lbl.color }}>
                {lbl.name}
              </span>
            )
          })}

          {/* Due date */}
          {due && (
            <span className={`date-${due.type}`}>
              {due.label}
            </span>
          )}

          {/* Project */}
          {showProject && project && (
            <span className="project-badge">
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: project.color, display: 'inline-block',
              }} />
              {project.name}
            </span>
          )}

          {/* Comments */}
          {task.comments > 0 && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#555', fontSize: 11 }}>
              <MessageSquare size={10} />
              {task.comments}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
