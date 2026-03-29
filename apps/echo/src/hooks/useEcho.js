import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useEcho(postId) {
  const echoed = useLiveQuery(
    () => db.echoes.get([postId, CURRENT_USER_ID]),
    [postId]
  )

  async function toggleEcho() {
    if (echoed) {
      await db.echoes.delete([postId, CURRENT_USER_ID])
      await db.posts.where('id').equals(postId).modify(p => { p.echoes = Math.max(0, p.echoes - 1) })
    } else {
      await db.echoes.put({ postId, userId: CURRENT_USER_ID })
      await db.posts.where('id').equals(postId).modify(p => { p.echoes = p.echoes + 1 })
    }
  }

  return { echoed: !!echoed, toggleEcho }
}
