import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import db from '../db/index.js'
import { DEFAULT_MODEL, USER } from '../db/seed.js'
import InputBar from '../components/InputBar'

const SUGGESTIONS = [
  'Explain the intuition behind gradient descent',
  'Review my code for security issues',
  'Help me think through this architecture decision',
  'Write a technical spec for this feature',
]

export default function Welcome() {
  const navigate = useNavigate()

  const handleSend = async (text) => {
    if (!text.trim()) return
    const id = await db.conversations.add({
      title: text.slice(0, 60),
      model: DEFAULT_MODEL,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
    await db.messages.add({
      conversationId: id,
      role: 'user',
      content: text.trim(),
      artifact: null,
      timestamp: Date.now(),
    })
    navigate(`/c/${id}`)
  }

  return (
    <div style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 32px',
      background: 'var(--bg)',
    }}>
      <img
        src="./sage-logo.jpg"
        alt="Sage"
        width={48}
        height={48}
        style={{
          borderRadius: 10,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.12))',
          marginBottom: 20,
          objectFit: 'cover',
        }}
      />

      <h1 style={{
        fontSize: 28,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--text-primary)',
        marginBottom: 40,
        textAlign: 'center',
      }}>
        What&apos;s on your mind, {USER.name}?
      </h1>

      {/* Suggestion cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 12,
        maxWidth: 560,
        width: '100%',
        marginBottom: 32,
      }}>
        {SUGGESTIONS.map((text) => (
          <SuggestionCard key={text} text={text} onSubmit={handleSend} />
        ))}
      </div>

      {/* Input bar */}
      <InputBar onSend={handleSend} />
    </div>
  )
}

function SuggestionCard({ text, onSubmit }) {
  const [hover, setHover] = useState(false)

  return (
    <button
      onClick={() => onSubmit(text)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '14px 16px',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--bg-input)',
        border: hover ? '1px solid var(--accent-dim)' : '1px solid var(--border)',
        cursor: 'pointer',
        textAlign: 'left',
        fontSize: 14,
        color: hover ? 'var(--text-primary)' : 'var(--text-secondary)',
        lineHeight: 1.4,
        boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all 0.15s',
      }}
    >
      {text}
    </button>
  )
}
