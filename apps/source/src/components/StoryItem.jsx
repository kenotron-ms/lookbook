import { Link } from 'react-router-dom'

export default function StoryItem({ story, showPoints = true, highlighted = false }) {
  const { rank, title, domain, url, points, author, timeAgo, comments, type } = story

  const titlePrefix =
    type === 'ask' ? '' :
    type === 'show' ? '' :
    ''

  const isJob = type === 'job'

  return (
    <tr style={{ backgroundColor: highlighted ? '#fff8f0' : 'transparent' }}>
      <td colSpan={2} style={{ padding: 0 }}>
        {/* Title line */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr>
              <td style={{
                width: 30,
                textAlign: 'right',
                verticalAlign: 'top',
                paddingRight: 4,
                paddingTop: 2,
                fontSize: 11,
                color: '#828282',
                fontFamily: 'Verdana, sans-serif',
                whiteSpace: 'nowrap',
              }}>
                {rank}.
              </td>
              <td style={{
                width: 14,
                verticalAlign: 'top',
                paddingTop: 3,
                paddingRight: 2,
              }}>
                {!isJob && (
                  <span style={{
                    color: '#828282',
                    fontSize: 11,
                    cursor: 'pointer',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                    title="upvote"
                  >▲</span>
                )}
              </td>
              <td style={{ verticalAlign: 'top', paddingTop: 2, paddingBottom: 1 }}>
                <Link
                  to={type === 'ask' || type === 'show' ? '/story' : url}
                  style={{
                    fontSize: 13,
                    fontFamily: 'Verdana, Geneva, sans-serif',
                    color: '#000',
                    lineHeight: '1.3',
                  }}
                >
                  {title}
                </Link>
                {domain && (
                  <span style={{
                    fontSize: 10,
                    color: '#828282',
                    fontFamily: 'Verdana, sans-serif',
                    marginLeft: 6,
                  }}>
                    ({domain})
                  </span>
                )}
              </td>
            </tr>
            {/* Meta line */}
            <tr>
              <td />
              <td />
              <td style={{ paddingBottom: 6 }}>
                {isJob ? (
                  <span style={{ fontSize: 10, color: '#828282', fontFamily: 'Verdana, sans-serif' }}>
                    {timeAgo}
                  </span>
                ) : (
                  <span style={{ fontSize: 10, color: '#828282', fontFamily: 'Verdana, sans-serif', lineHeight: 1.4 }}>
                    {showPoints && points !== null && (
                      <><span>{points} points</span> by </>
                    )}
                    {!showPoints && (
                      <>by </>
                    )}
                    <Link to="#" style={{ color: '#828282' }}>{author}</Link>
                    {' '}{timeAgo}
                    {' | '}
                    <Link to="/story" style={{ color: '#828282' }}>
                      {comments === 0 ? 'discuss' : `${comments} comments`}
                    </Link>
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  )
}
