import { useState } from 'react'
import { Image, Smile, BarChart2, MapPin, Calendar } from 'lucide-react'
import { Avatar } from './LeftSidebar'
import { CURRENT_USER } from '../data/posts'

const MAX_CHARS = 280

export default function PostComposer({ placeholder = "What's on your mind?" }) {
  const [text, setText] = useState('')
  const [focused, setFocused] = useState(false)

  const remaining = MAX_CHARS - text.length
  const canPost = text.trim().length > 0

  const pct = Math.min(1, text.length / MAX_CHARS)
  const radius = 10
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - pct)
  const nearLimit = remaining <= 20
  const overLimit = remaining < 0

  return (
    <div
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #2f3336',
        display: 'flex',
        gap: '12px',
      }}
    >
      <Avatar
        initials={CURRENT_USER.initials}
        bg={CURRENT_USER.avatarBg}
        size={48}
      />

      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Audience selector pill — only when focused */}
        {focused && (
          <button
            style={{
              background: 'transparent',
              border: '1px solid #6366f1',
              color: '#6366f1',
              borderRadius: '9999px',
              padding: '2px 12px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer',
              marginBottom: '8px',
            }}
          >
            Everyone ▾
          </button>
        )}

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            color: '#e7e9ea',
            fontSize: '20px',
            lineHeight: '28px',
            minHeight: focused ? '120px' : '52px',
            fontFamily: 'inherit',
            transition: 'min-height 0.2s',
          }}
          maxLength={MAX_CHARS + 10}
        />

        {/* Reply permission row — only when focused */}
        {focused && (
          <div
            style={{
              borderTop: '1px solid #2f3336',
              paddingTop: '12px',
              marginTop: '8px',
              marginBottom: '8px',
            }}
          >
            <button
              style={{
                background: 'transparent',
                border: 'none',
                color: '#6366f1',
                fontSize: '14px',
                fontWeight: '700',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              🌐 Everyone can reply
            </button>
          </div>
        )}

        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: focused ? '8px' : '12px',
            borderTop: focused ? 'none' : '0px',
          }}
        >
          <div style={{ display: 'flex', gap: '4px', marginLeft: '-4px' }}>
            {[Image, Smile, BarChart2, MapPin, Calendar].map((Icon, i) => (
              <button
                key={i}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6366f1',
                  cursor: 'pointer',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = 'rgba(99,102,241,0.12)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = 'transparent')
                }
              >
                <Icon size={20} strokeWidth={1.75} />
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {text.length > 0 && (
              <>
                {/* Ring counter */}
                <svg width="26" height="26" viewBox="0 0 26 26">
                  <circle
                    cx="13"
                    cy="13"
                    r={radius}
                    fill="none"
                    stroke="#2f3336"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="13"
                    cy="13"
                    r={radius}
                    fill="none"
                    stroke={overLimit ? '#f4212e' : nearLimit ? '#ffd400' : '#6366f1'}
                    strokeWidth="2.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 13 13)"
                    style={{ transition: 'stroke-dashoffset 0.1s, stroke 0.2s' }}
                  />
                  {nearLimit && (
                    <text
                      x="13"
                      y="17"
                      textAnchor="middle"
                      fontSize="9"
                      fill={overLimit ? '#f4212e' : '#71767b'}
                    >
                      {remaining}
                    </text>
                  )}
                </svg>

                {/* Divider */}
                <div
                  style={{
                    width: '1px',
                    height: '28px',
                    background: '#2f3336',
                  }}
                />
              </>
            )}

            <button
              disabled={!canPost || overLimit}
              style={{
                background: canPost && !overLimit ? '#6366f1' : 'rgba(99,102,241,0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '9999px',
                padding: '8px 18px',
                fontSize: '15px',
                fontWeight: '700',
                cursor: canPost && !overLimit ? 'pointer' : 'default',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                if (canPost && !overLimit)
                  e.currentTarget.style.background = '#5254cc'
              }}
              onMouseLeave={(e) => {
                if (canPost && !overLimit)
                  e.currentTarget.style.background = '#6366f1'
              }}
              onClick={() => {
                if (canPost && !overLimit) {
                  setText('')
                  setFocused(false)
                }
              }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
