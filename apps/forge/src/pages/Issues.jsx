import { CircleDot, CircleCheck, MessageSquare, Pin, ChevronDown } from 'lucide-react'
import { ISSUES } from '../data/repos.js'

function IssueIcon({ status }) {
  if (status === 'closed') {
    return <CircleCheck size={16} color="#8957e5" />
  }
  return <CircleDot size={16} color="#3fb950" />
}

export default function Issues() {
  const pinned = ISSUES.filter(i => i.isPinned)
  const open = ISSUES.filter(i => i.status === 'open' && !i.isPinned)
  const closed = ISSUES.filter(i => i.status === 'closed')

  const IssueRow = ({ issue, idx }) => (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: '14px 16px',
      borderTop: idx === 0 ? 'none' : '1px solid #21262d',
      cursor: 'pointer',
      transition: 'background 0.1s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#161b22'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{ marginTop: '2px', flexShrink: 0 }}>
        <IssueIcon status={issue.status} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
              <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 600 }}>{issue.title}</span>
              {issue.labels.map(label => (
                <span key={label.name} style={{
                  fontSize: '11px',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: label.color + '22',
                  color: label.color,
                  border: `1px solid ${label.color}44`,
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                }}>{label.name}</span>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b949e', fontSize: '12px' }}>
              <span>#{issue.number}</span>
              <span>·</span>
              <span>{issue.status === 'closed' ? 'Closed' : 'Opened'} {issue.createdAt} by</span>
              <span style={{ color: '#58a6ff' }}>@{issue.author}</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '12px', flexShrink: 0 }}>
            <MessageSquare size={12} />
            {issue.comments}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 700, color: '#e6edf3' }}>Issues</h1>
        <p style={{ margin: 0, color: '#8b949e', fontSize: '13px' }}>forge-ui / components</p>
      </div>

      {/* Pinned issues */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <Pin size={13} color="#8b949e" />
          <span style={{ color: '#8b949e', fontSize: '13px', fontWeight: 600 }}>Pinned issues</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {pinned.map(issue => (
            <div key={issue.id} style={{
              background: '#161b22',
              border: '1px solid #30363d',
              borderRadius: '8px',
              padding: '14px 16px',
              cursor: 'pointer',
              transition: 'border-color 0.1s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#58a6ff'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <IssueIcon status={issue.status} />
                <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 600 }}>{issue.title}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {issue.labels.map(label => (
                  <span key={label.name} style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '20px',
                    background: label.color + '22',
                    color: label.color,
                    border: `1px solid ${label.color}44`,
                    fontWeight: 500,
                  }}>{label.name}</span>
                ))}
              </div>
              <div style={{ color: '#8b949e', fontSize: '12px' }}>
                #{issue.number} · opened {issue.createdAt} by <span style={{ color: '#58a6ff' }}>@{issue.author}</span>
                {' '}· <MessageSquare size={11} style={{ display: 'inline', verticalAlign: 'middle' }} /> {issue.comments}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px 8px 0 0',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            borderRadius: '6px',
            padding: '5px 10px',
            color: '#e6edf3',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
          }}>
            <CircleDot size={14} color="#3fb950" />
            {open.length + pinned.length} Open
          </button>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            background: 'none',
            border: 'none',
            borderRadius: '6px',
            padding: '5px 10px',
            color: '#8b949e',
            fontSize: '13px',
            cursor: 'pointer',
          }}>
            <CircleCheck size={14} />
            {closed.length} Closed
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['Label', 'Milestone', 'Assignee', 'Author'].map(filter => (
            <button key={filter} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'none',
              border: 'none',
              borderRadius: '6px',
              padding: '4px 8px',
              color: '#8b949e',
              fontSize: '13px',
              cursor: 'pointer',
            }}>
              {filter} <ChevronDown size={12} />
            </button>
          ))}
        </div>
      </div>

      {/* Issues list */}
      <div style={{ border: '1px solid #30363d', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
        {[...open, ...closed].map((issue, i) => (
          <IssueRow key={issue.id} issue={issue} idx={i} />
        ))}
      </div>
    </div>
  )
}
