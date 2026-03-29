import { Link } from 'react-router-dom'
import { GitCommit, GitPullRequest, CircleDot, Star, GitFork, GitBranch, Users } from 'lucide-react'
import { REPOS, ACTIVITY_FEED, FEATURED_REPOS, LANGUAGE_COLORS, CURRENT_USER } from '../data/repos.js'

function Avatar({ initials, size = 32, gradient = '135deg, #3fb950, #238636' }) {
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `linear-gradient(${gradient})`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.35,
      fontWeight: 700,
      color: '#fff',
      flexShrink: 0,
    }}>{initials}</div>
  )
}

function ActivityCard({ item }) {
  const iconMap = {
    commit: { Icon: GitCommit, color: '#8b949e' },
    pr_opened: { Icon: GitPullRequest, color: '#3fb950' },
    pr_merged: { Icon: GitPullRequest, color: '#8957e5' },
    issue_opened: { Icon: CircleDot, color: '#3fb950' },
  }
  const { Icon, color } = iconMap[item.type] || { Icon: GitCommit, color: '#8b949e' }

  return (
    <div style={{
      background: '#161b22',
      border: '1px solid #30363d',
      borderRadius: '8px',
      padding: '14px 16px',
      display: 'flex',
      gap: '12px',
      alignItems: 'flex-start',
    }}>
      <Avatar initials={item.actorAvatar} size={34} gradient={
        item.actor === 'jordanblake' ? '135deg, #3fb950, #238636' :
        item.actor === 'alex_nova' ? '135deg, #58a6ff, #1f6feb' :
        item.actor === 'priya_k' ? '135deg, #f7986b, #e05e2d' :
        '135deg, #8957e5, #6e40c9'
      } />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <Icon size={14} color={color} strokeWidth={2} />
          <span style={{ color: '#e6edf3', fontWeight: 600, fontSize: '13px' }}>@{item.actor}</span>
          <span style={{ color: '#8b949e', fontSize: '12px' }}>·</span>
          <span style={{ color: '#8b949e', fontSize: '12px' }}>{item.time}</span>
        </div>
        <div style={{ color: '#8b949e', fontSize: '12px', marginBottom: '4px' }}>
          in <span style={{ color: '#58a6ff' }}>{item.repo}</span>
        </div>
        {item.message && (
          <p style={{ margin: 0, color: '#c9d1d9', fontSize: '13px', fontFamily: 'monospace', background: '#0d1117', padding: '6px 10px', borderRadius: '4px', border: '1px solid #21262d' }}>
            {item.message}
          </p>
        )}
        {item.prTitle && (
          <p style={{ margin: 0, color: '#c9d1d9', fontSize: '13px' }}>
            PR <span style={{ color: '#8b949e' }}>#{item.prNumber}</span>: {item.prTitle}
          </p>
        )}
        {item.issueTitle && (
          <p style={{ margin: 0, color: '#c9d1d9', fontSize: '13px' }}>
            Issue <span style={{ color: '#8b949e' }}>#{item.issueNumber}</span>: {item.issueTitle}
          </p>
        )}
      </div>
    </div>
  )
}

function RepoCard({ repo }) {
  return (
    <Link to="/repo" style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#161b22',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '14px 16px',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = '#58a6ff'}
        onMouseLeave={e => e.currentTarget.style.borderColor = '#30363d'}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
          <span style={{ color: '#58a6ff', fontWeight: 600, fontSize: '13px' }}>
            {repo.owner}/{repo.name}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#8b949e', fontSize: '12px' }}>
            <Star size={12} />
            {repo.stars.toLocaleString()}
          </div>
        </div>
        <p style={{ margin: '0 0 10px', color: '#8b949e', fontSize: '12px', lineHeight: 1.5 }}>
          {repo.description}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: LANGUAGE_COLORS[repo.language] || '#8b949e',
            display: 'inline-block',
          }} />
          <span style={{ color: '#8b949e', fontSize: '11px' }}>{repo.language}</span>
          <span style={{ color: '#30363d', margin: '0 4px' }}>·</span>
          <GitFork size={11} color="#8b949e" />
          <span style={{ color: '#8b949e', fontSize: '11px' }}>{repo.forks.toLocaleString()}</span>
        </div>
      </div>
    </Link>
  )
}

export default function Dashboard() {
  const myRepos = REPOS.filter(r => r.owner === 'jordanblake').slice(0, 5)

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '25% 1fr 25%', gap: '24px' }}>

        {/* LEFT — repos + teams */}
        <aside>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#e6edf3' }}>Top repositories</h3>
              <button style={{
                background: '#238636',
                border: 'none',
                borderRadius: '6px',
                padding: '3px 10px',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 500,
                cursor: 'pointer',
              }}>New</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {myRepos.map(repo => (
                <Link key={repo.id} to="/repo" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 8px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.1s',
                }}
                  onMouseEnter={e => e.currentTarget.style.background = '#21262d'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <GitBranch size={14} color="#8b949e" />
                  <span style={{ color: '#c9d1d9', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {repo.name}
                  </span>
                  <div style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: LANGUAGE_COLORS[repo.language] || '#8b949e',
                    marginLeft: 'auto',
                    flexShrink: 0,
                  }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Teams */}
          <div style={{ borderTop: '1px solid #21262d', paddingTop: '20px' }}>
            <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#e6edf3' }}>Your teams</h3>
            {['paranet / core-infra', 'paranet / frontend', 'forge-ui / maintainers'].map(team => (
              <div key={team} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#21262d'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Users size={14} color="#8b949e" />
                <span style={{ color: '#c9d1d9', fontSize: '13px' }}>{team}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* CENTER — activity feed */}
        <div>
          <h2 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: 600, color: '#e6edf3' }}>
            Activity from people you follow
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ACTIVITY_FEED.map(item => (
              <ActivityCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* RIGHT — explore */}
        <aside>
          <h3 style={{ margin: '0 0 12px', fontSize: '13px', fontWeight: 600, color: '#e6edf3' }}>
            Explore repositories
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
            {FEATURED_REPOS.map(repo => (
              <RepoCard key={`${repo.owner}/${repo.name}`} repo={repo} />
            ))}
          </div>
          <button style={{
            width: '100%',
            background: 'none',
            border: '1px solid #30363d',
            borderRadius: '6px',
            padding: '8px',
            color: '#58a6ff',
            fontSize: '13px',
            cursor: 'pointer',
          }}>Explore more →</button>
        </aside>

      </div>
    </div>
  )
}
