import { useState, useRef, useEffect } from 'react'
import { Sparkles } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import MessageThread from '../components/MessageThread.jsx'
import InputArea from '../components/InputArea.jsx'
import TypingIndicator from '../components/TypingIndicator.jsx'
import { fullConversation } from '../data/conversations.js'

const SUGGESTIONS = [
  'Explain quantum computing in simple terms',
  'Write a Python script to scrape data',
  'Draft a product requirements doc',
  'Create a workout plan for beginners',
]

// Sample Oracle replies for new user messages
const ORACLE_RESPONSES = [
  {
    content:
      "That's a great question! Let me break it down for you.\n\nThe key insight here is that we want to separate concerns cleanly. Think of it in three layers:\n\n**1. Data layer** — where your state lives\n**2. Logic layer** — how transformations happen\n**3. View layer** — what the user sees\n\nThis separation makes everything easier to test, maintain, and reason about.",
  },
  {
    content:
      "Happy to help with that. Here's a concise approach that handles the most common edge cases:",
    code: {
      language: 'typescript',
      content: `async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return response;
    } catch (err) {
      if (attempt === retries) throw err;
      // Exponential backoff: 1s, 2s, 4s
      await new Promise(r => setTimeout(r, 2 ** (attempt - 1) * 1000));
    }
  }
}`,
    },
  },
  {
    content:
      "Good thinking! Here's what I'd recommend based on your use case.\n\nThe main trade-off to consider is **performance vs. simplicity**. For most applications, simplicity wins unless you're operating at scale (10k+ concurrent users).\n\nStart simple, measure, then optimize where the profiler actually tells you to.",
  },
]

export default function Chat() {
  const [activeConvoId, setActiveConvoId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const responseIndex = useRef(0)
  const scrollRef = useRef(null)

  // Load the full pre-built conversation when c1 is selected
  const handleSelectConvo = (id) => {
    setActiveConvoId(id)
    if (id === 'c1') {
      setMessages(fullConversation.messages)
    } else {
      setMessages([])
    }
    setIsTyping(false)
  }

  const handleNewChat = () => {
    setActiveConvoId(null)
    setMessages([])
    setIsTyping(false)
  }

  const handleSend = (text) => {
    // Add user message
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])

    // If no active convo, create one
    if (!activeConvoId) {
      setActiveConvoId('new')
    }

    // Show typing indicator
    setIsTyping(true)

    // Simulate Oracle response after 1.2–2s delay
    const delay = 1200 + Math.random() * 800
    setTimeout(() => {
      const reply = ORACLE_RESPONSES[responseIndex.current % ORACLE_RESPONSES.length]
      responseIndex.current++
      setMessages((prev) => [...prev, { role: 'oracle', ...reply }])
      setIsTyping(false)
    }, delay)
  }

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const isEmpty = messages.length === 0 && !isTyping

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#212121', overflow: 'hidden' }}>
      <Sidebar
        activeConvoId={activeConvoId}
        onSelectConvo={handleSelectConvo}
        onNewChat={handleNewChat}
      />

      {/* Main chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {isEmpty ? (
          /* ─── Empty state ─── */
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 24px 0',
            }}
          >
            {/* Logo */}
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                background: '#10a37f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <Sparkles size={28} color="#fff" />
            </div>

            <h1
              style={{
                fontSize: '26px',
                fontWeight: 600,
                color: '#ececec',
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              How can Oracle help you today?
            </h1>

            {/* 2×2 suggestion grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
                maxWidth: '560px',
                width: '100%',
              }}
            >
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  className="suggestion-card"
                  onClick={() => handleSend(s)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: '10px',
                    background: '#2f2f2f',
                    textAlign: 'left',
                    fontSize: '13px',
                    color: '#c5c5c5',
                    lineHeight: '1.5',
                    cursor: 'pointer',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* ─── Active conversation ─── */
          <div
            ref={scrollRef}
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px 24px 8px',
            }}
          >
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
              <MessageThread
                messages={messages}
                typingIndicator={isTyping ? <TypingIndicator key="typing" /> : null}
              />
            </div>
          </div>
        )}

        {/* Input */}
        <InputArea onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  )
}
