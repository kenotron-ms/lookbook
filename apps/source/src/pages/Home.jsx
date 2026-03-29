import { stories } from '../data/stories'
import StoryItem from '../components/StoryItem'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 4px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0 }}>
        <tbody>
          {/* Spacer row */}
          <tr style={{ height: 10 }}><td colSpan={2} /></tr>

          {stories.map((story, i) => (
            <StoryItem
              key={story.rank}
              story={story}
              showPoints={true}
              highlighted={i < 5}
            />
          ))}

          {/* Spacer */}
          <tr style={{ height: 10 }}><td colSpan={2} /></tr>

          {/* More link */}
          <tr>
            <td colSpan={2} style={{ paddingLeft: 44, paddingBottom: 16 }}>
              <Link to="#" style={{ fontSize: 10, color: '#000', fontFamily: 'Verdana, sans-serif' }}>
                More
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
