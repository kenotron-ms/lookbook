import Dexie from 'dexie'

// v3 — adds notifications, conversations, messages tables + CSS-var theming
export const db = new Dexie('EchoApp_v3')

db.version(1).stores({
  users:         '++id, handle',
  posts:         '++id, userId, parentId, timestamp',
  likes:         '[postId+userId], postId, userId',
  echoes:        '[postId+userId], postId, userId',
  bookmarks:     '[postId+userId], userId',
  follows:       '[followerId+followingId], followerId, followingId',
  notifications: '++id, type, fromUserId, postId, read, timestamp',
  conversations: '++id, lastTimestamp',
  messages:      '++id, conversationId, senderId, timestamp',
})

// v2 — adds settings key-value store (all other tables preserved)
db.version(2).stores({
  settings: '&key',  // & = unique primary key (not auto-increment)
})

export default db
