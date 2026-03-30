import Dexie from 'dexie'

export const db = new Dexie('SageApp_v2')   // v2 — agentic UI, projects, toolCalls

db.version(1).stores({
  projects:      '++id, starred, updatedAt',
  conversations: '++id, projectId, title, model, createdAt, updatedAt',
  messages:      '++id, conversationId, role, timestamp',
  // message fields: content, thinking (JSON|null), toolCalls (JSON|null), artifact (JSON|null)
})

export default db
