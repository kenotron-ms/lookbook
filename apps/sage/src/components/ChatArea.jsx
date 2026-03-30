import { useState, useEffect, useRef } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'
import { generateResponse } from '../utils/aiResponder.js'
import MessageBubble from './MessageBubble'
import InputBar from './InputBar'

export default function ChatArea({ convoId }) {
  const [isThinking, setIsThinking] = useState(false)
  const [streamingMsgId, setStreamingMsgId] = useState(null)
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
    if (!messages || messages.length === 0 || isThinking) return
    const last = messages[messages.length - 1]
    if (last.role !== 'user') return
    if (pendingRef.current === last.id) return // already triggered

    pendingRef.current = last.id
    setIsThinking(true)

    generateResponse(last.content).then(async ({ content, thinking, toolCalls, artifact }) => {
      const newId = await db.messages.add({
        conversationId: convoId,
        role: 'assistant',
        content,
        thinking: thinking ?? null,
        toolCalls: toolCalls ?? null,
        artifact: artifact ?? null,
        timestamp: Date.now(),
      })
      await db.conversations.update(convoId, { updatedAt: Date.now() })
      setIsThinking(false)
      setStreamingMsgId(newId)
      // Clear streaming after animation completes (~2s)
      setTimeout(() => setStreamingMsgId(null), 2000)
    }).catch(err => {
      console.error('AI response error:', err)
      setIsThinking(false)
    })
  }, [messages])

  const handleSend = async (text) => {
    if (!text.trim() || isThinking) return
    await db.messages.add({
      conversationId: convoId,
      role: 'user',
      content: text.trim(),
      thinking: null,
      toolCalls: null,
      artifact: null,
      timestamp: Date.now(),
    })
    await db.conversations.update(convoId, { updatedAt: Date.now() })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--bg)' }}>
      {/* Messages */}
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px 0' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 24px' }}>
          {messages?.map(msg => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isStreaming={msg.id === streamingMsgId}
            />
          ))}

          {/* Thinking indicator — shown between user message and AI response */}
          {isThinking && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, paddingTop: 2 }}>
                <img
                  src="./sage-logo.jpg"
                  alt="Sage"
                  style={{ width: 22, height: 22, borderRadius: 4, objectFit: 'cover' }}
                />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: 'var(--text-primary)' }}>
                  Sage
                </div>
                <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                  <span className="thinking-dot" />
                  <span className="thinking-dot" style={{ animationDelay: '0.16s' }} />
                  <span className="thinking-dot" style={{ animationDelay: '0.32s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <InputBar onSend={handleSend} disabled={isThinking} />
    </div>
  )
}
