import Dexie from 'dexie'

export const db = new Dexie('SageApp_v1')

db.version(1).stores({
  conversations: '++id, title, model, createdAt, updatedAt',
  messages:      '++id, conversationId, role, timestamp',
  // role: 'user' | 'assistant'
  // messages also have: content (string), artifact (JSON|null), thinking (bool)
})

export default db
