import { Sparkles } from 'lucide-react'
import CodeBlock from './CodeBlock.jsx'

function OracleMessage({ message }) {
  const parts = message.content.split(/\*\*(.*?)\*\*/g)

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '8px 0' }}>
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

      {/* Content */}
      <div style={{ flex: 1, maxWidth: '680px', paddingTop: '3px' }}>
        <div
          style={{
            color: '#ececec',
            lineHeight: '1.7',
            fontSize: '14px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {message.content.split('\n').map((line, li) => {
            // Bold markdown
            const rendered = line.split(/\*\*(.*?)\*\*/g).map((chunk, ci) =>
              ci % 2 === 1 ? (
                <strong key={ci} style={{ color: '#ececec', fontWeight: 600 }}>
                  {chunk}
                </strong>
              ) : (
                chunk
              )
            )
            return (
              <span key={li}>
                {rendered}
                {li < message.content.split('\n').length - 1 && '\n'}
              </span>
            )
          })}
        </div>

        {message.code && (
          <CodeBlock language={message.code.language} content={message.code.content} />
        )}
      </div>
    </div>
  )
}

function UserMessage({ message }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px 0' }}>
      <div
        style={{
          background: '#343541',
          color: '#ececec',
          padding: '10px 16px',
          borderRadius: '18px',
          maxWidth: '70%',
          lineHeight: '1.6',
          fontSize: '14px',
          whiteSpace: 'pre-wrap',
        }}
      >
        {message.content}
      </div>
    </div>
  )
}

export default function MessageThread({ messages, typingIndicator }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {messages.map((msg, i) =>
        msg.role === 'user' ? (
          <UserMessage key={i} message={msg} />
        ) : (
          <OracleMessage key={i} message={msg} />
        )
      )}
      {typingIndicator}
    </div>
  )
}
