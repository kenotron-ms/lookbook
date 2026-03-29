import { Link } from 'react-router-dom'
import { MapPin, Building, Globe, Users, Star, GitFork } from 'lucide-react'
import { CURRENT_USER, REPOS, CONTRIBUTION_DATA, LANGUAGE_COLORS } from '../data/repos.js'

// Map intensity 0–4 to GitHub-style green shades
const HEAT_COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']

function HeatmapCell({ value }) {
  return (
    <div style={{
      width: 10,
      height: 10,
      borderRadius: '2px',
      background: HEAT_COLORS[value] || HEAT_COLORS[0],
    }} />
  )
}

function ContributionHeatmap() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const total = CONTRIBUTION_DATA.flat().reduce((a, b) => a + b, 0)

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '16px 20px',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ color: '#c9d1d9', fontSize: '13px', fontWeight: 500 }}>
          <strong style={{ color: '#e6edf3' }}>{(total * 4).toLocaleString()} contributions</strong> in the last year
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#8b949e' }}>
          Less
          {HEAT_COLORS.map((c, i) => (
            <div key={i} style={{ width: 10, height: 10, borderRadius: '2px', background: c }} />
          ))}
          More
        </div>
      </div>

      {/* Month labels */}
      <div style={{ display: 'flex', gap: '2px', marginBottom: '4px', paddingLeft: '30px' }}>
        {months.map((m, i) => (
          <div key={m} style={{
            width: `${100 / 12}%`,
            fontSize: '10px',
            color: '#8b949e',
          }}>{m}</div>
        ))}
      </div>

      {/* Day labels + grid */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {/* Day labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '2px' }}>
          {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
            <div key={i} style={{ height: 10, fontSize: '9px', color: '#8b949e', lineHeight: '10px', width: '24px' }}>{d}</div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div style={{ display: 'flex', gap: '2px', flex: 1, overflowX: 'auto' }}>
          {CONTRIBUTION_DATA.map((week, wi) => (
            <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {week.map((val, di) => (
                <HeatmapCell key={di} value={val} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PinnedRepoCard({ repo }) {
  return (
    <Link to="/repo" style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '16px',
        cursor: 'pointer',
        transition: 'border-color 0.1s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#58a6ff'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ color: '#58a6ff', fontSize: '13px', fontWeight: 600 }}>
            {repo.owner}/{repo.name}
          </span>
          {repo.isPrivate && (
            <span style={{
              fontSize: '10px',
              color: '#8b949e',
              border: '1px solid #30363d',
              borderRadius: '20px',
              padding: '1px 5px',
            }}>Private</span>
          )}
        </div>
        <p style={{ margin: '0 0 auto', color: '#8b949e', fontSize: '12px', lineHeight: 1.5 }}>
          {repo.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: LANGUAGE_COLORS[repo.language] || '#8b949e',
              display: 'inline-block',
            }} />
            <span style={{ color: '#8b949e', fontSize: '11px' }}>{repo.language}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '11px' }}>
            <Star size={11} />
            {repo.stars.toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '11px' }}>
            <GitFork size={11} />
            {repo.forks}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function Profile() {
  const pinnedRepos = REPOS.slice(0, 6)

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>

        {/* Left sidebar — user info */}
        <aside>
          {/* Avatar */}
          <div style={{
            width: '100%',
            aspectRatio: '1',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3fb950, #238636)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 800,
            color: '#fff',
            marginBottom: '16px',
            border: '4px solid #30363d',
            maxWidth: '260px',
          }}>
            {CURRENT_USER.avatar}
          </div>

          {/* Name + handle */}
          <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: '#e6edf3' }}>
            {CURRENT_USER.name}
          </h1>
          <p style={{ margin: '0 0 16px', color: '#8b949e', fontSize: '20px', fontWeight: 300 }}>
            @{CURRENT_USER.handle}
          </p>

          <p style={{ margin: '0 0 16px', color: '#c9d1d9', fontSize: '14px', lineHeight: 1.6 }}>
            {CURRENT_USER.bio}
          </p>

          {/* Follow button */}
          <button style={{
            width: '100%',
            background: '#21262d',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '8px',
            color: '#c9d1d9',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            marginBottom: '16px',
          }}>Follow</button>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <Users size={14} color="#8b949e" />
              <span style={{ color: '#e6edf3', fontWeight: 600 }}>{CURRENT_USER.followers.toLocaleString()}</span>
              <span style={{ color: '#8b949e' }}>followers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
              <span style={{ color: '#e6edf3', fontWeight: 600 }}>{CURRENT_USER.following}</span>
              <span style={{ color: '#8b949e' }}>following</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Star size={14} color="#8b949e" />
              <span style={{ color: '#e6edf3', fontWeight: 600 }}>{CURRENT_USER.stars.toLocaleString()}</span>
            </div>
          </div>

          {/* Info */}
          <div style={{ borderTop: '1px solid #21262d', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { icon: Building, text: CURRENT_USER.company },
              { icon: MapPin, text: CURRENT_USER.location },
              { icon: Globe, text: CURRENT_USER.website },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon size={14} color="#8b949e" />
                <span style={{ color: '#c9d1d9', fontSize: '13px' }}>{text}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <div>
          {/* Contribution heatmap */}
          <ContributionHeatmap />

          {/* Pinned repos */}
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600, color: '#e6edf3' }}>
              Pinned repositories
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '8px',
            }}>
              {pinnedRepos.slice(0, 6).map(repo => (
                <PinnedRepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div>
            <h2 style={{ margin: '0 0 12px', fontSize: '16px', fontWeight: 600, color: '#e6edf3' }}>
              Recent activity
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {[
                { time: '3 hours ago', text: 'Pushed 2 commits to', repo: 'jordanblake/forge-ui', branch: 'feat/dark-mode' },
                { time: '1 day ago', text: 'Opened pull request in', repo: 'jordanblake/rust-parser', branch: 'perf/simd-scanner' },
                { time: '2 days ago', text: 'Starred', repo: 'rust-lang/rust', branch: null },
                { time: '3 days ago', text: 'Merged pull request in', repo: 'jordanblake/forge-ui', branch: 'feat/rust-build-cache' },
                { time: '1 week ago', text: 'Commented on issue in', repo: 'paranet/paranet-core', branch: null },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  padding: '12px 0',
                  borderBottom: '1px solid #21262d',
                }}>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#3fb950',
                    marginTop: '5px',
                    flexShrink: 0,
                  }} />
                  <div>
                    <span style={{ color: '#8b949e', fontSize: '13px' }}>{item.text} </span>
                    <span style={{ color: '#58a6ff', fontSize: '13px', cursor: 'pointer' }}>{item.repo}</span>
                    {item.branch && (
                      <span style={{ color: '#8b949e', fontSize: '13px' }}> on <span style={{ fontFamily: 'monospace', color: '#8b949e', background: '#21262d', padding: '1px 5px', borderRadius: '4px' }}>{item.branch}</span></span>
                    )}
                    <div style={{ color: '#8b949e', fontSize: '12px', marginTop: '2px' }}>{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
