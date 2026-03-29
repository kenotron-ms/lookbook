import db from './index.js'
import usersData from '../data/seed/users.json'
import postsData from '../data/seed/posts.json'
import followsData from '../data/seed/follows.json'

export const CURRENT_USER_ID = 0

export async function seedIfEmpty() {
  const count = await db.users.count()
  if (count > 0) return  // already seeded

  await db.transaction('rw', db.users, db.posts, db.likes, db.echoes, db.bookmarks, db.follows, async () => {
    await db.users.bulkAdd(usersData)
    await db.posts.bulkAdd(postsData)
    await db.follows.bulkAdd(followsData)

    // Seed some initial likes from current user for a few posts to make it feel alive
    await db.likes.bulkAdd([
      { postId: 2, userId: 0 },
      { postId: 5, userId: 0 },
      { postId: 9, userId: 0 },
      { postId: 14, userId: 0 },
      { postId: 28, userId: 0 },
      { postId: 50, userId: 0 },
      { postId: 71, userId: 0 },
    ])

    // Seed some initial bookmarks from current user
    await db.bookmarks.bulkAdd([
      { postId: 6, userId: 0 },
      { postId: 22, userId: 0 },
      { postId: 51, userId: 0 },
    ])
  })
}
