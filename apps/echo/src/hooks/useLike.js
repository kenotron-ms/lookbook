import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useLike(postId) {
  const liked = useLiveQuery(
    () => db.likes.get([postId, CURRENT_USER_ID]),
    [postId]
  )

  async function toggleLike() {
    if (liked) {
      await db.likes.delete([postId, CURRENT_USER_ID])
      await db.posts.where('id').equals(postId).modify(p => { p.likes = Math.max(0, p.likes - 1) })
    } else {
      await db.likes.put({ postId, userId: CURRENT_USER_ID })
      await db.posts.where('id').equals(postId).modify(p => { p.likes = p.likes + 1 })
    }
  }

  return { liked: !!liked, toggleLike }
}
