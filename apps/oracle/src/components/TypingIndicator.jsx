import { Sparkles } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '4px 0' }}>
      {/* Avatar */}
      <div
        style={{
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: '#10a37f',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: '2px',
        }}
      >
        <Sparkles size={15} color="#fff" />
      </div>
      {/* Dots */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          paddingTop: '8px',
          minHeight: '36px',
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}
