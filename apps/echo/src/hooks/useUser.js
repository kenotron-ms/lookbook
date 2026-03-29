import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useUser(userId) {
  return useLiveQuery(
    () => db.users.get(userId),
    [userId]
  )
}

export function useCurrentUser() {
  return useUser(CURRENT_USER_ID)
}

export function useUserPosts(userId) {
  return useLiveQuery(
    () => db.posts.where('userId').equals(userId).reverse().sortBy('timestamp'),
    [userId]
  )
}
