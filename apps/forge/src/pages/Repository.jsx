import { Link } from 'react-router-dom'
import { Star, Eye, GitFork, GitCommit, GitBranch, Tag, Users, Folder, FileText, Code, CircleDot, GitPullRequest, Zap, Layout, Settings } from 'lucide-react'

const TABS = [
  { label: 'Code', icon: Code },
  { label: 'Issues', icon: CircleDot, count: 47, to: '/issues' },
  { label: 'Pull Requests', icon: GitPullRequest, count: 8, to: '/pulls' },
  { label: 'Actions', icon: Zap },
  { label: 'Projects', icon: Layout },
  { label: 'Settings', icon: Settings },
]

const FILES = [
  { type: 'folder', name: 'src', message: 'feat: restructure component exports for better tree-shaking', time: '3 hours ago' },
  { type: 'folder', name: 'tests', message: 'test: add coverage for async state transitions', time: '1 day ago' },
  { type: 'folder', name: '.github', message: 'ci: update Node.js matrix to include v22 LTS', time: '4 days ago' },
  { type: 'file', name: 'README.md', message: 'docs: add installation guide and quick start examples', time: '2 days ago' },
  { type: 'file', name: 'package.json', message: 'chore: bump dependencies — lucide-react, vite, tailwind', time: '5 days ago' },
  { type: 'file', name: 'LICENSE', message: 'chore: initial project setup', time: '6 months ago' },
]

export default function Repository() {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>

      {/* Repo header */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{ color: '#58a6ff', fontSize: '20px', fontWeight: 600 }}>forge-ui</span>
              <span style={{ color: '#8b949e', fontSize: '20px' }}>/</span>
              <span style={{ color: '#58a6ff', fontSize: '20px', fontWeight: 700 }}>components</span>
              <span style={{
                fontSize: '11px',
                color: '#8b949e',
                border: '1px solid #30363d',
                borderRadius: '20px',
                padding: '2px 8px',
                fontWeight: 500,
              }}>Public</span>
            </div>
            <p style={{ margin: 0, color: '#8b949e', fontSize: '13px' }}>
              A headless component library for building modern developer tools and dashboards
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { icon: Eye, label: 'Watch', count: '128' },
              { icon: GitFork, label: 'Fork', count: '412' },
              { icon: Star, label: 'Star', count: '3.8k', accent: true },
            ].map(({ icon: Icon, label, count, accent }) => (
              <button key={label} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: accent ? '#238636' : '#21262d',
                border: `1px solid ${accent ? '#2ea043' : '#30363d'}`,
                borderRadius: '6px',
                padding: '5px 12px',
                color: accent ? '#fff' : '#c9d1d9',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>
                <Icon size={14} />
                {label}
                <span style={{
                  background: accent ? 'rgba(255,255,255,0.2)' : '#30363d',
                  borderRadius: '20px',
                  padding: '1px 6px',
                  fontSize: '11px',
                }}>{count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '12px 0',
        borderTop: '1px solid #21262d',
        borderBottom: '1px solid #21262d',
        marginBottom: '16px',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: GitCommit, label: 'commits', value: '847' },
          { icon: GitBranch, label: 'branches', value: '14' },
          { icon: Tag, label: 'tags', value: '23' },
          { icon: Users, label: 'contributors', value: '38' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            <Icon size={14} color="#8b949e" />
            <span style={{ color: '#e6edf3', fontWeight: 600, fontSize: '13px' }}>{value}</span>
            <span style={{ color: '#8b949e', fontSize: '13px' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #21262d',
        marginBottom: '20px',
        gap: '0',
        overflowX: 'auto',
      }}>
        {TABS.map(({ label, icon: Icon, count, to }, i) => {
          const isActive = i === 0
          return (
            <Link key={label} to={to || '/repo'} style={{ textDecoration: 'none' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid #f78166' : '2px solid transparent',
                padding: '10px 16px',
                color: isActive ? '#e6edf3' : '#8b949e',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                <Icon size={14} />
                {label}
                {count !== undefined && (
                  <span style={{
                    background: '#30363d',
                    borderRadius: '20px',
                    padding: '1px 6px',
                    fontSize: '11px',
                    color: '#c9d1d9',
                  }}>{count}</span>
                )}
              </button>
            </Link>
          )
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        {/* Main content */}
        <div>
          {/* Branch + file path row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#161b22',
            border: '1px solid #30363d',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '10px 16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#21262d',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '4px 10px',
                color: '#c9d1d9',
                fontSize: '13px',
                cursor: 'pointer',
              }}>
                <GitBranch size={13} />
                main
                <span style={{ color: '#8b949e', fontSize: '12px' }}>▾</span>
              </button>
              <span style={{ color: '#8b949e', fontSize: '13px' }}>1 branch ahead of origin/main</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button style={{
                background: '#238636',
                border: '1px solid #2ea043',
                borderRadius: '6px',
                padding: '4px 12px',
                color: '#fff',
                fontSize: '12px',
                cursor: 'pointer',
              }}>Code ▾</button>
            </div>
          </div>

          {/* Latest commit bar */}
          <div style={{
            background: '#161b22',
            border: '1px solid #30363d',
            borderBottom: 'none',
            padding: '10px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3fb950, #238636)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: 700,
                color: '#fff',
              }}>JB</div>
              <span style={{ color: '#e6edf3', fontSize: '13px', fontWeight: 500 }}>jordanblake</span>
              <span style={{ color: '#c9d1d9', fontSize: '13px' }}>feat: restructure component exports for better tree-shaking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#8b949e', fontSize: '12px' }}>3 hours ago</span>
              <span style={{ color: '#8b949e', fontSize: '12px', fontFamily: 'monospace', background: '#21262d', padding: '2px 7px', borderRadius: '4px' }}>a7f3c21</span>
              <GitCommit size={14} color="#8b949e" />
              <span style={{ color: '#8b949e', fontSize: '12px' }}>847</span>
            </div>
          </div>

          {/* File browser */}
          <div style={{ border: '1px solid #30363d', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
            {FILES.map((file, i) => (
              <div key={file.name} style={{
                display: 'grid',
                gridTemplateColumns: '280px 1fr auto',
                alignItems: 'center',
                padding: '8px 16px',
                borderTop: i === 0 ? 'none' : '1px solid #21262d',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#161b22'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {file.type === 'folder'
                    ? <Folder size={16} color="#8b949e" fill="#8b949e" fillOpacity={0.3} />
                    : <FileText size={16} color="#8b949e" />
                  }
                  <span style={{
                    color: file.type === 'folder' ? '#58a6ff' : '#c9d1d9',
                    fontSize: '13px',
                    fontFamily: 'monospace',
                    fontWeight: file.type === 'folder' ? 500 : 400,
                  }}>{file.name}</span>
                </div>
                <span style={{ color: '#8b949e', fontSize: '13px', paddingRight: '16px' }}>{file.message}</span>
                <span style={{ color: '#8b949e', fontSize: '12px', whiteSpace: 'nowrap' }}>{file.time}</span>
              </div>
            ))}
          </div>

          {/* README */}
          <div style={{
            marginTop: '24px',
            background: '#161b22',
            border: '1px solid #30363d',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '12px 16px',
              borderBottom: '1px solid #30363d',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <FileText size={14} color="#8b949e" />
              <span style={{ color: '#c9d1d9', fontSize: '13px', fontWeight: 600 }}>README.md</span>
            </div>
            <div style={{ padding: '24px 32px' }}>
              <h1 style={{ margin: '0 0 12px', fontSize: '28px', fontWeight: 700, color: '#e6edf3', borderBottom: '1px solid #21262d', paddingBottom: '12px' }}>
                forge-ui / components
              </h1>
              <p style={{ color: '#c9d1d9', lineHeight: 1.7, marginBottom: '16px' }}>
                A headless, framework-agnostic component library for building developer tools, dashboards, and internal applications. Built with TypeScript, Radix UI primitives, and a zero-config theming system.
              </p>
              <h2 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 600, margin: '20px 0 10px' }}>Installation</h2>
              <pre style={{
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#e6edf3',
                margin: '0 0 16px',
                overflowX: 'auto',
              }}>{`npm install @forge-ui/components

# or with yarn
yarn add @forge-ui/components`}</pre>
              <h2 style={{ color: '#e6edf3', fontSize: '18px', fontWeight: 600, margin: '20px 0 10px' }}>Quick Start</h2>
              <pre style={{
                background: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '13px',
                color: '#e6edf3',
                margin: '0 0 16px',
                overflowX: 'auto',
              }}>{`import { Button, Card, DataTable } from '@forge-ui/components'

function App() {
  return (
    <Card>
      <DataTable data={rows} columns={cols} />
      <Button variant="primary">Save changes</Button>
    </Card>
  )
}`}</pre>
              <p style={{ color: '#8b949e', fontSize: '13px', margin: 0 }}>
                Full documentation available at{' '}
                <span style={{ color: '#58a6ff' }}>forge-ui.paranet.dev/docs</span>
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#e6edf3' }}>About</h3>
            <p style={{ margin: '0 0 12px', color: '#c9d1d9', fontSize: '13px', lineHeight: 1.6 }}>
              Headless component library for developer tools
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #21262d', paddingTop: '12px' }}>
              {[
                { icon: Star, label: '3,842 stars' },
                { icon: Eye, label: '128 watching' },
                { icon: GitFork, label: '412 forks' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={14} color="#8b949e" />
                  <span style={{ color: '#c9d1d9', fontSize: '13px' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '16px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#e6edf3' }}>Languages</h3>
            <div style={{ display: 'flex', height: '8px', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
              <div style={{ width: '68%', background: '#3178c6' }} />
              <div style={{ width: '20%', background: '#f1e05a' }} />
              <div style={{ width: '12%', background: '#89e051' }} />
            </div>
            {[
              { name: 'TypeScript', pct: '68.2%', color: '#3178c6' },
              { name: 'JavaScript', pct: '20.1%', color: '#f1e05a' },
              { name: 'Shell', pct: '11.7%', color: '#89e051' },
            ].map(l => (
              <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
                <span style={{ color: '#c9d1d9', fontSize: '12px' }}>{l.name}</span>
                <span style={{ color: '#8b949e', fontSize: '12px', marginLeft: 'auto' }}>{l.pct}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}
