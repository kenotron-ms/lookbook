import { useState, useEffect, useRef } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { generateResponse } from '../utils/aiResponder.js'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'

export default function ChatArea({ convoId }) {
  const [isThinking, setIsThinking] = useState(false)
  const scrollRef = useRef(null)
  const pendingRef = useRef(null)

  const messages = useLiveQuery(
    () => db.messages.where('conversationId').equals(convoId).sortBy('timestamp'),
    [convoId]
  )

  // Auto-scroll to bottom when messages change or thinking state changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [messages, isThinking])

  // Trigger AI response when last message is from user
  useEffect(() => {
    if (!messages || messages.length === 0) return
    const last = messages[messages.length - 1]
    if (last.role !== 'user') return
    if (pendingRef.current === last.id) return // already triggered

    pendingRef.current = last.id
    setIsThinking(true)

    generateResponse(last.content).then(async ({ content, artifact }) => {
      await db.messages.add({
        conversationId: convoId,
        role: 'assistant',
        content,
        artifact,
        timestamp: Date.now(),
      })
      await db.conversations.update(convoId, { updatedAt: Date.now() })
      setIsThinking(false)
    }).catch((err) => {
      console.error('AI response error:', err)
      setIsThinking(false)
      pendingRef.current = null
    })
  }, [messages, convoId])

  const handleSend = async (text) => {
    if (!text.trim() || isThinking) return
    await db.messages.add({
      conversationId: convoId,
      role: 'user',
      content: text.trim(),
      artifact: null,
      timestamp: Date.now(),
    })
    await db.conversations.update(convoId, {
      updatedAt: Date.now(),
      title: text.slice(0, 60),
    })
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Scrollable message area */}
      <div
        ref={scrollRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {messages?.map((msg) => (
          <div key={msg.id} style={{ width: '100%', maxWidth: 680, padding: '0 24px' }}>
            <MessageBubble message={msg} />
          </div>
        ))}

        {/* Thinking indicator */}
        {isThinking && (
          <div style={{ width: '100%', maxWidth: 680, padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' }}>
              <img
                src="./sage-logo.jpg"
                alt="Sage"
                style={{ width: 22, height: 22, borderRadius: 4, flexShrink: 0, objectFit: 'cover' }}
              />
              <div>
                <span className="thinking-dot" />
                <span className="thinking-dot" />
                <span className="thinking-dot" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <InputBar onSend={handleSend} disabled={isThinking} />
    </div>
  )
}
