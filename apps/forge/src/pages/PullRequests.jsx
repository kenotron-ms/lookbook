import { Link } from 'react-router-dom'
import { GitPullRequest, GitMerge, MessageSquare, CheckCircle, XCircle, ChevronDown } from 'lucide-react'
import { PULL_REQUESTS } from '../data/repos.js'

function PRStatusIcon({ status }) {
  if (status === 'merged') return <GitMerge size={16} color="#8957e5" />
  if (status === 'draft') return <GitPullRequest size={16} color="#8b949e" />
  return <GitPullRequest size={16} color="#3fb950" />
}

function ChecksBadge({ checks }) {
  if (checks === 'passing') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3fb950', fontSize: '11px' }}>
        <CheckCircle size={12} />
        passing
      </div>
    )
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f85149', fontSize: '11px' }}>
      <XCircle size={12} />
      failing
    </div>
  )
}

export default function PullRequests() {
  const open = PULL_REQUESTS.filter(p => p.status === 'open' || p.status === 'draft')
  const closed = PULL_REQUESTS.filter(p => p.status === 'merged')

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      {/* Page title */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: 700, color: '#e6edf3' }}>Pull Requests</h1>
        <p style={{ margin: 0, color: '#8b949e', fontSize: '13px' }}>forge-ui / components</p>
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
        gap: '12px',
      }}>
        {/* Status toggle */}
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
            <GitPullRequest size={14} color="#3fb950" />
            {open.length} Open
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
            <GitMerge size={14} />
            {closed.length} Merged
          </button>
        </div>

        {/* Filter dropdowns */}
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

      {/* PR list */}
      <div style={{ border: '1px solid #30363d', borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
        {PULL_REQUESTS.map((pr, i) => (
          <div key={pr.id} style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '14px 16px',
            borderTop: '1px solid #21262d',
            background: i % 2 === 0 ? 'transparent' : '#0d1117',
            cursor: 'pointer',
            transition: 'background 0.1s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#161b22'}
            onMouseLeave={e => e.currentTarget.style.background = i % 2 === 0 ? 'transparent' : '#0d1117'}
          >
            {/* Status icon */}
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              <PRStatusIcon status={pr.status} />
            </div>

            {/* Main content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '4px' }}>
                    {pr.status === 'draft' && (
                      <span style={{
                        fontSize: '11px',
                        color: '#8b949e',
                        background: '#21262d',
                        border: '1px solid #30363d',
                        borderRadius: '20px',
                        padding: '1px 7px',
                      }}>Draft</span>
                    )}
                    <span style={{ color: '#e6edf3', fontSize: '14px', fontWeight: 600 }}>
                      {pr.title}
                    </span>
                    {pr.labels.map(label => (
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
                    <span>#{pr.number}</span>
                    <span>·</span>
                    <span>{pr.status === 'merged' ? 'Merged' : 'Opened'} {pr.createdAt} by</span>
                    <span style={{ color: '#58a6ff' }}>@{pr.author}</span>
                    <span>·</span>
                    <span style={{ fontFamily: 'monospace', color: '#8b949e' }}>{pr.branch}</span>
                  </div>
                </div>

                {/* Right info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <ChecksBadge checks={pr.checks} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '12px' }}>
                    <MessageSquare size={12} />
                    {pr.comments}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
