import { askStories } from '../data/stories'
import StoryItem from '../components/StoryItem'
import { Link } from 'react-router-dom'

export default function Ask() {
  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 4px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderSpacing: 0 }}>
        <tbody>
          <tr style={{ height: 10 }}><td colSpan={2} /></tr>

          {askStories.map((story) => (
            <StoryItem
              key={story.rank}
              story={story}
              showPoints={true}
            />
          ))}

          <tr style={{ height: 10 }}><td colSpan={2} /></tr>

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
