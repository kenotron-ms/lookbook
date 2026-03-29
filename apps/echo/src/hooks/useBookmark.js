import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useBookmark(postId) {
  const bookmarked = useLiveQuery(
    () => db.bookmarks.get([postId, CURRENT_USER_ID]),
    [postId]
  )

  async function toggleBookmark() {
    if (bookmarked) {
      await db.bookmarks.delete([postId, CURRENT_USER_ID])
    } else {
      await db.bookmarks.put({ postId, userId: CURRENT_USER_ID })
    }
  }

  return { bookmarked: !!bookmarked, toggleBookmark }
}
