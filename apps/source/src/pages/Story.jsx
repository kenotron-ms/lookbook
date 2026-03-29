import { stories, comments } from '../data/stories'
import { Link } from 'react-router-dom'

const INDENT_PX = 20

function Comment({ comment, depth = 0 }) {
  return (
    <div style={{
      paddingLeft: depth * INDENT_PX,
      marginBottom: 8,
    }}>
      <div style={{
        padding: '6px 0 2px 0',
        borderTop: depth === 0 ? '1px solid #e8e8e0' : 'none',
      }}>
        {/* Comment header */}
        <div style={{ marginBottom: 3, fontSize: 10, color: '#828282', fontFamily: 'Verdana, sans-serif' }}>
          <span style={{ color: '#828282', marginRight: 4, cursor: 'pointer', userSelect: 'none' }}>▲</span>
          <Link to="#" style={{ color: '#828282', fontWeight: 'bold' }}>{comment.author}</Link>
          {' '}{comment.timeAgo}
          {' '}
          <Link to="#" style={{ color: '#828282' }}>[–]</Link>
        </div>

        {/* Comment body */}
        <div style={{
          fontSize: 12,
          fontFamily: 'Verdana, Geneva, sans-serif',
          lineHeight: 1.5,
          color: '#000',
          maxWidth: 720,
          paddingBottom: 4,
        }}>
          {comment.text}
        </div>

        {/* Reply */}
        <div style={{ fontSize: 10, fontFamily: 'Verdana, sans-serif' }}>
          <Link to="#" style={{ color: '#828282' }}>reply</Link>
        </div>
      </div>

      {/* Children */}
      {comment.children && comment.children.map(child => (
        <Comment key={child.id} comment={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function Story() {
  const story = stories[0]

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '8px 8px 0' }}>

      {/* Story header */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 2 }}>
        <tbody>
          <tr>
            <td style={{ width: 14, verticalAlign: 'top', paddingTop: 3, paddingRight: 3 }}>
              <span style={{ color: '#828282', fontSize: 11, cursor: 'pointer' }}>▲</span>
            </td>
            <td>
              <Link to="#" style={{ fontSize: 14, fontFamily: 'Verdana, Geneva, sans-serif', color: '#000' }}>
                {story.title}
              </Link>
              {story.domain && (
                <span style={{ fontSize: 11, color: '#828282', fontFamily: 'Verdana, sans-serif', marginLeft: 6 }}>
                  ({story.domain})
                </span>
              )}
              <div style={{ fontSize: 10, color: '#828282', fontFamily: 'Verdana, sans-serif', marginTop: 3, lineHeight: 1.6 }}>
                {story.points} points by{' '}
                <Link to="#" style={{ color: '#828282' }}>{story.author}</Link>
                {' '}{story.timeAgo}
                {' | '}
                <Link to="#" style={{ color: '#828282' }}>flag</Link>
                {' | '}
                <Link to="#" style={{ color: '#828282' }}>hide</Link>
                {' | '}
                <Link to="#" style={{ color: '#828282' }}>{story.comments} comments</Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #e8e8e0', margin: '8px 0' }} />

      {/* Add Comment box */}
      <div style={{ marginBottom: 12 }}>
        <textarea
          rows={6}
          style={{
            width: '100%',
            maxWidth: 600,
            display: 'block',
            fontFamily: 'monospace',
            fontSize: 12,
            border: '1px solid #ccc',
            padding: 6,
            resize: 'vertical',
            background: '#fff',
            outline: 'none',
            color: '#000',
          }}
          placeholder="add your comment…"
        />
        <div style={{ marginTop: 6 }}>
          <button style={{
            padding: '3px 8px',
            fontSize: 11,
            fontFamily: 'Verdana, sans-serif',
            background: '#f0f0e8',
            border: '1px solid #ccc',
            cursor: 'pointer',
          }}>
            add comment
          </button>
        </div>
      </div>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #e8e8e0', margin: '8px 0 4px' }} />

      {/* Comments thread */}
      <div style={{ paddingBottom: 24 }}>
        {comments.map(comment => (
          <Comment key={comment.id} comment={comment} depth={0} />
        ))}
      </div>

    </div>
  )
}
