import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useFollow(userId) {
  const following = useLiveQuery(
    () => db.follows.get([CURRENT_USER_ID, userId]),
    [userId]
  )

  async function toggleFollow() {
    if (following) {
      await db.follows.delete([CURRENT_USER_ID, userId])
      await db.users.where('id').equals(userId).modify(u => { u.followers = Math.max(0, u.followers - 1) })
    } else {
      await db.follows.put({ followerId: CURRENT_USER_ID, followingId: userId })
      await db.users.where('id').equals(userId).modify(u => { u.followers = u.followers + 1 })
    }
  }

  return { following: !!following, toggleFollow }
}
