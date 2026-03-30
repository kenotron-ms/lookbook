import { useNavigate } from 'react-router-dom'
import db from '../db/index.js'
import { DEFAULT_MODEL } from '../db/seed.js'
import InputBar from '../components/InputBar'
import { Building2 } from 'lucide-react'

const USER_DISPLAY = { name: 'Ken', org: 'Microsoft - MADE Explorations' }

const SUGGESTIONS = [
  { icon: '💻', label: 'Code' },
  { icon: '✏️', label: 'Write' },
  { icon: '💼', label: 'Career chat' },
  { icon: '✨', label: "Claude's choice" },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Morning'
  if (h < 17) return 'Afternoon'
  return 'Evening'
}

// ── SparkIcon ──────────────────────────────────────────────────────────────
function SparkIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginBottom: 16 }}
    >
      {/* 8-pointed star / starburst */}
      <path
        d="M16 2 L17.8 12.2 L26.6 7.4 L21.8 16.2 L26.6 25 L17.8 20.2 L16 30.4 L14.2 20.2 L5.4 25 L10.2 16.2 L5.4 7.4 L14.2 12.2 Z"
        fill="#C85F47"
      />
    </svg>
  )
}

// ── Welcome ────────────────────────────────────────────────────────────────
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
      background: '#F8F8F6',
    }}>
      {/* ── Org badge ── */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 32 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 12px',
          borderRadius: 8,
          background: '#EFEFED',
        }}>
          <Building2 size={13} style={{ color: '#707070' }} />
          <span style={{ fontSize: 13, color: '#707070' }}>{USER_DISPLAY.org}</span>
        </div>
      </div>

      {/* ── Centered greeting area ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 32px',
        minHeight: 0,
      }}>
        {/* Spark icon */}
        <SparkIcon />

        {/* Greeting — Lora serif */}
        <h1 style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: 44,
          fontWeight: 400,
          color: '#1A1A1A',
          letterSpacing: '-0.01em',
          textAlign: 'center',
          marginBottom: 32,
          lineHeight: 1.2,
        }}>
          {getGreeting()}, {USER_DISPLAY.name}
        </h1>

        {/* Suggestion chips */}
        <div style={{
          display: 'flex',
          gap: 8,
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: 24,
          maxWidth: 520,
        }}>
          {SUGGESTIONS.map(({ icon, label }) => (
            <SuggestionChip
              key={label}
              icon={icon}
              label={label}
              onClick={() => handleSend(label)}
            />
          ))}
        </div>
      </div>

      {/* ── InputBar anchored to bottom ── */}
      <InputBar onSend={handleSend} />
    </div>
  )
}

// ── SuggestionChip ─────────────────────────────────────────────────────────
function SuggestionChip({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 16px',
        height: 36,
        borderRadius: 18,
        background: '#FFFFFF',
        border: '1px solid #E0E0E0',
        fontSize: 14,
        fontWeight: 500,
        color: '#1A1A1A',
        cursor: 'pointer',
        transition: 'border-color 0.15s',
        fontFamily: 'inherit',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C0C0C0' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#E0E0E0' }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}
