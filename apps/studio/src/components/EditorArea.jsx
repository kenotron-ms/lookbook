import { useState } from 'react'
import { X } from 'lucide-react'
import { openTabs, appTsxContent } from '../data/files.js'

function Minimap({ lines }) {
  return (
    <div style={{
      width: 60,
      background: '#252526',
      flexShrink: 0,
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Viewport indicator */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 80,
        background: 'rgba(121, 121, 121, 0.12)',
        pointerEvents: 'none',
      }} />
      {/* Tiny code lines */}
      {lines.map((line, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', height: 4, paddingLeft: 4, marginBottom: 0.5, overflow: 'hidden' }}>
          {line.tokens?.map((token, j) => (
            <div key={j} style={{
              height: 2,
              width: Math.min(token.text.length * 1.5, 40),
              background: token.color || '#555',
              opacity: 0.7,
              marginRight: 1,
              borderRadius: 1,
              flexShrink: 0,
            }} />
          ))}
        </div>
      ))}
    </div>
  )
}

function CodeLine({ line, lineNumber, isActive }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: 19,
      background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent',
      position: 'relative',
    }}>
      {/* Line number */}
      <div style={{
        width: 48,
        textAlign: 'right',
        paddingRight: 16,
        color: isActive ? '#c6c6c6' : '#5a5a5a',
        fontSize: 13,
        fontFamily: "'JetBrains Mono', Consolas, monospace",
        flexShrink: 0,
        userSelect: 'none',
      }}>
        {lineNumber}
      </div>
      {/* Code content */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: 4 }}>
        {line.tokens?.map((token, i) => (
          <span
            key={i}
            style={{
              color: token.color || '#cccccc',
              fontFamily: "'JetBrains Mono', Consolas, monospace",
              fontSize: 13,
              whiteSpace: 'pre',
            }}
          >
            {token.text}
          </span>
        ))}
        {/* Cursor blink */}
        {line.cursor && (
          <span className="cursor-blink" style={{
            display: 'inline-block',
            width: 2,
            height: 15,
            background: '#aeafad',
            marginLeft: 1,
            verticalAlign: 'middle',
          }} />
        )}
      </div>
    </div>
  )
}

export default function EditorArea() {
  const [activeTab, setActiveTab] = useState('App.tsx')
  const [tabs, setTabs] = useState(openTabs)

  const closeTab = (e, name) => {
    e.stopPropagation()
    const newTabs = tabs.filter(t => t.name !== name)
    setTabs(newTabs)
    if (activeTab === name && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1].name)
    }
  }

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      background: '#1e1e1e',
    }}>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        background: '#2d2d2d',
        borderBottom: '1px solid #252526',
        flexShrink: 0,
        overflowX: 'auto',
      }}>
        {tabs.map(tab => {
          const isActive = tab.name === activeTab
          return (
            <div
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 12px',
                height: 35,
                background: isActive ? '#1e1e1e' : '#2d2d2d',
                borderRight: '1px solid #252526',
                borderTop: isActive ? '1px solid #007acc' : '1px solid transparent',
                cursor: 'default',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              {/* Dot for modified */}
              {tab.modified && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#e6c07b', flexShrink: 0 }} />
              )}
              <span style={{
                fontSize: 13,
                color: isActive ? '#ffffff' : '#969696',
                whiteSpace: 'nowrap',
              }}>
                {tab.name}
              </span>
              <button
                onClick={(e) => closeTab(e, tab.name)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#969696',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 2,
                  borderRadius: 2,
                  marginLeft: 2,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#3c3c3c'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <X size={12} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Editor + minimap */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Code area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
          {/* Breadcrumb */}
          <div style={{
            height: 22,
            background: '#1e1e1e',
            display: 'flex',
            alignItems: 'center',
            padding: '0 8px',
            borderBottom: '1px solid #252526',
            gap: 4,
            flexShrink: 0,
          }}>
            {['src', '›', 'App.tsx'].map((part, i) => (
              <span key={i} style={{ fontSize: 12, color: i === 2 ? '#cccccc' : '#858585' }}>{part}</span>
            ))}
          </div>

          {/* Lines */}
          <div style={{ paddingTop: 4, paddingBottom: 80 }}>
            {appTsxContent.map((line, i) => (
              <CodeLine
                key={i}
                line={line}
                lineNumber={i + 1}
                isActive={line.cursor}
              />
            ))}
          </div>
        </div>

        {/* Minimap */}
        <Minimap lines={appTsxContent} />

        {/* Vertical scrollbar track (decorative) */}
        <div style={{
          width: 10,
          background: '#1e1e1e',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 2,
          borderLeft: '1px solid #252526',
        }}>
          <div style={{ width: 6, height: 40, background: '#424242', borderRadius: 3, marginTop: 2 }} />
        </div>
      </div>
    </div>
  )
}
