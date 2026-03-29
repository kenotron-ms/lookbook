import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { CURRENT_USER_ID } from '../db/seed.js'

export function useFeed(tab = 'foryou') {
  return useLiveQuery(async () => {
    let posts
    if (tab === 'following') {
      const follows = await db.follows.where('followerId').equals(CURRENT_USER_ID).toArray()
      const followingIds = follows.map(f => f.followingId)
      const allPosts = await db.posts.where('userId').anyOf(followingIds).toArray()
      posts = allPosts.sort((a, b) => b.timestamp - a.timestamp).slice(0, 50)
    } else {
      posts = await db.posts.orderBy('timestamp').reverse().limit(50).toArray()
    }

    // Filter out replies for main feed
    return posts.filter(p => !p.parentId)
  }, [tab])
}

export async function createPost(content, mediaUrl = null) {
  return db.posts.add({
    userId: CURRENT_USER_ID,
    content,
    timestamp: Date.now(),
    likes: 0,
    echoes: 0,
    replies: 0,
    views: Math.floor(Math.random() * 500) + 50,
    mediaUrl,
    parentId: null,
    bookmarks: 0,
  })
}
