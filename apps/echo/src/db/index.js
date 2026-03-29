import Dexie from 'dexie'

export const db = new Dexie('EchoApp')

db.version(1).stores({
  users:     '++id, handle',
  posts:     '++id, userId, parentId, timestamp',
  likes:     '[postId+userId], postId, userId',
  echoes:    '[postId+userId], postId, userId',
  bookmarks: '[postId+userId], userId',
  follows:   '[followerId+followingId], followerId, followingId',
})

export default db
