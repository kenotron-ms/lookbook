import db from './index.js'
import usersData from '../data/seed/users.json'
import postsData from '../data/seed/posts.json'
import followsData from '../data/seed/follows.json'

export const CURRENT_USER_ID = 0

// ── Notification seed data (all target current user: Jordan Blake, id=0) ──────
const NOTIFICATIONS = [
  { id:  1, type: 'like',    fromUserId:  2, postId: 60, read: false, timestamp: 1743256400000 },
  { id:  2, type: 'echo',    fromUserId:  3, postId: 60, read: false, timestamp: 1743252800000 },
  { id:  3, type: 'like',    fromUserId:  4, postId: 61, read: false, timestamp: 1743249200000 },
  { id:  4, type: 'follow',  fromUserId: 13, postId: null, read: false, timestamp: 1743245600000 },
  { id:  5, type: 'like',    fromUserId:  5, postId: 60, read: false, timestamp: 1743242000000 },
  { id:  6, type: 'echo',    fromUserId:  6, postId: 61, read: false, timestamp: 1743238400000 },
  { id:  7, type: 'like',    fromUserId:  8, postId: 62, read: true,  timestamp: 1743231200000 },
  { id:  8, type: 'reply',   fromUserId:  2, postId: 59, read: true,  timestamp: 1743256400000 },
  { id:  9, type: 'like',    fromUserId:  9, postId: 95, read: true,  timestamp: 1743224000000 },
  { id: 10, type: 'like',    fromUserId: 10, postId: 62, read: true,  timestamp: 1743216800000 },
  { id: 11, type: 'follow',  fromUserId: 17, postId: null, read: true, timestamp: 1743173600000 },
  { id: 12, type: 'echo',    fromUserId: 15, postId: 61, read: true,  timestamp: 1743169600000 },
  { id: 13, type: 'like',    fromUserId:  7, postId: 60, read: true,  timestamp: 1743166000000 },
  { id: 14, type: 'like',    fromUserId: 11, postId: 95, read: true,  timestamp: 1743158000000 },
  { id: 15, type: 'echo',    fromUserId: 12, postId: 62, read: true,  timestamp: 1743087200000 },
  { id: 16, type: 'follow',  fromUserId: 19, postId: null, read: true, timestamp: 1743083600000 },
  { id: 17, type: 'like',    fromUserId: 16, postId: 86, read: true,  timestamp: 1743000800000 },
  { id: 18, type: 'echo',    fromUserId: 18, postId: 60, read: true,  timestamp: 1742997200000 },
  { id: 19, type: 'like',    fromUserId: 20, postId: 61, read: true,  timestamp: 1742914400000 },
  { id: 20, type: 'follow',  fromUserId: 14, postId: null, read: true, timestamp: 1742910800000 },
  { id: 21, type: 'mention', fromUserId:  2, postId: 63, read: true,  timestamp: 1743258400000 },
  { id: 22, type: 'reply',   fromUserId:  5, postId: 59, read: true,  timestamp: 1743258400000 },
]

// ── Conversation seed data (Jordan ↔ various users) ───────────────────────────
const CONVERSATIONS = [
  {
    id: 1,
    participantIds: [0, 2],   // Jordan ↔ Maya Chen
    lastMessage: "That would be amazing to hear if you do. Happy to chat more about the architecture.",
    lastTimestamp: 1743245600000,
    unread: 0,
  },
  {
    id: 2,
    participantIds: [0, 9],   // Jordan ↔ Marcus Thompson
    lastMessage: "One day I'll write a full post on it. For now, brief hot takes are safer 😅",
    lastTimestamp: 1743200000000,
    unread: 1,
  },
  {
    id: 3,
    participantIds: [0, 4],   // Jordan ↔ Sofia Rodriguez
    lastMessage: "Absolutely, please do! Would love to know what the Frame team thinks.",
    lastTimestamp: 1743152000000,
    unread: 0,
  },
  {
    id: 4,
    participantIds: [0, 13],  // Jordan ↔ Chris Santos
    lastMessage: "Sounds perfect. DM me the hotel name when you know it?",
    lastTimestamp: 1743072000000,
    unread: 2,
  },
]

// ── Message seed data ─────────────────────────────────────────────────────────
const MESSAGES = [
  // Convo 1: Jordan ↔ Maya Chen
  { id:  1, conversationId: 1, senderId: 2, content: "Hey Jordan, really loved your post about component libraries. Had a similar thought about UI frameworks and abstraction costs...", timestamp: 1743238400000 },
  { id:  2, conversationId: 1, senderId: 0, content: "Thanks Maya! I've been thinking about this a lot lately. The abstraction cost is real — especially when you lose control of the primitives.", timestamp: 1743241200000 },
  { id:  3, conversationId: 1, senderId: 2, content: "Exactly. Also congrats on shipping echo-hooks! We might actually use something similar in our lab setup for reactive state.", timestamp: 1743243600000 },
  { id:  4, conversationId: 1, senderId: 0, content: "That would be amazing to hear if you do. Happy to chat more about the architecture.", timestamp: 1743245600000 },

  // Convo 2: Jordan ↔ Marcus Thompson
  { id:  5, conversationId: 2, senderId: 9, content: "Hey, saw your hot take about component libraries and Tailwind coupling. I'm team Tailwind but I fully get the argument 😂", timestamp: 1743190000000 },
  { id:  6, conversationId: 2, senderId: 0, content: "Haha, fair! It's not that I dislike Tailwind per se. It's more when libraries force it on consumers and break when you upgrade.", timestamp: 1743193600000 },
  { id:  7, conversationId: 2, senderId: 9, content: "That's a very specific and valid complaint actually. I ran into exactly that with a UI kit last month.", timestamp: 1743197200000 },
  { id:  8, conversationId: 2, senderId: 0, content: "One day I'll write a full post on it. For now, brief hot takes are safer 😅", timestamp: 1743200000000 },

  // Convo 3: Jordan ↔ Sofia Rodriguez
  { id:  9, conversationId: 3, senderId: 4, content: "Jordan your insight about the 'reading vs navigation' shift in deeply nested UIs is 🔥 We talk about this all the time at Frame.", timestamp: 1743145600000 },
  { id: 10, conversationId: 3, senderId: 0, content: "Thanks Sofia! I've been thinking about it all week. Wrote that reply right after the Echo threads update went live.", timestamp: 1743148800000 },
  { id: 11, conversationId: 3, senderId: 4, content: "We're dealing with something similar in Frame's comment threads. The mental model really does break at depth 3. Mind if I share your thread internally?", timestamp: 1743150400000 },
  { id: 12, conversationId: 3, senderId: 0, content: "Absolutely, please do! Would love to know what the Frame team thinks.", timestamp: 1743152000000 },

  // Convo 4: Jordan ↔ Chris Santos
  { id: 13, conversationId: 4, senderId: 13, content: "Hey! Are you coming to ParaNetConf next month? We should coordinate the talks — I think there's some overlap in our topics.", timestamp: 1743052000000 },
  { id: 14, conversationId: 4, senderId:  0, content: "100%! I'm presenting on Thursday I think. What slot do you have?", timestamp: 1743058000000 },
  { id: 15, conversationId: 4, senderId: 13, content: "Friday keynote. Let's grab coffee before the event starts — there's always that weird 45-minute gap before the first session.", timestamp: 1743064000000 },
  { id: 16, conversationId: 4, senderId:  0, content: "Sounds perfect. DM me the hotel name when you know it?", timestamp: 1743072000000 },
]

export async function seedIfEmpty() {
  const count = await db.users.count()
  if (count > 0) {
    // DB already has users — check if newer tables need seeding
    const notifCount = await db.notifications.count()
    if (notifCount === 0) {
      await db.notifications.bulkAdd(NOTIFICATIONS)
      await db.conversations.bulkAdd(CONVERSATIONS)
      await db.messages.bulkAdd(MESSAGES)
    }
    return
  }

  await db.transaction('rw',
    db.users, db.posts, db.likes, db.echoes,
    db.bookmarks, db.follows, db.notifications,
    db.conversations, db.messages,
    async () => {
      await db.users.bulkAdd(usersData)
      await db.posts.bulkAdd(postsData)
      await db.follows.bulkAdd(followsData)
      await db.notifications.bulkAdd(NOTIFICATIONS)
      await db.conversations.bulkAdd(CONVERSATIONS)
      await db.messages.bulkAdd(MESSAGES)

      // Seed initial likes from Jordan on a few posts
      await db.likes.bulkAdd([
        { postId:  2, userId: 0 },
        { postId:  5, userId: 0 },
        { postId:  9, userId: 0 },
        { postId: 14, userId: 0 },
        { postId: 28, userId: 0 },
        { postId: 50, userId: 0 },
        { postId: 71, userId: 0 },
      ])

      // Seed initial bookmarks from Jordan
      await db.bookmarks.bulkAdd([
        { postId:  6, userId: 0 },
        { postId: 22, userId: 0 },
        { postId: 51, userId: 0 },
        { postId: 71, userId: 0 },
        { postId: 13, userId: 0 },
      ])
    }
  )
}
