import { useState } from 'react'
import { Search, Star, Download } from 'lucide-react'
import { featuredExtensions } from '../data/files.js'

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={10}
          fill={i <= Math.floor(rating) ? '#f1c40f' : 'none'}
          color={i <= Math.floor(rating) ? '#f1c40f' : '#555'}
        />
      ))}
    </div>
  )
}

export default function ExtensionsPanel() {
  const [query, setQuery] = useState('')

  return (
    <div style={{
      width: 240,
      background: '#252526',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRight: '1px solid #1e1e1e',
    }}>
      {/* Header */}
      <div style={{
        padding: '8px 12px 4px',
        color: '#bbbbbe',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        Extensions
      </div>

      {/* Search */}
      <div style={{ padding: '4px 8px 8px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#3c3c3c',
          border: '1px solid #007acc',
          borderRadius: 2,
          padding: '3px 8px',
          gap: 6,
        }}>
          <Search size={12} color="#858585" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search Extensions in Marketplace"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#cccccc',
              fontSize: 12,
              fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      {/* Section header */}
      <div style={{
        padding: '4px 12px 4px',
        fontSize: 10,
        fontWeight: 700,
        color: '#bbbbbe',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderBottom: '1px solid #3c3c3c',
      }}>
        Popular
      </div>

      {/* Extension list */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {featuredExtensions.map(ext => (
          <div
            key={ext.id}
            style={{
              padding: '8px 10px',
              borderBottom: '1px solid #2a2a2a',
              cursor: 'default',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#2a2d2e'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Top row: icon + name + installs */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                background: '#1e1e1e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                flexShrink: 0,
              }}>
                {ext.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ fontSize: 12, color: '#cccccc', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                    {ext.name}
                  </span>
                </div>
                <div style={{ fontSize: 10, color: '#858585', marginTop: 1 }}>{ext.publisher}</div>
                <div style={{ fontSize: 11, color: '#adadad', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ext.description}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <StarRating rating={ext.rating} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Download size={9} color="#858585" />
                      <span style={{ fontSize: 10, color: '#858585' }}>{ext.installs}</span>
                    </div>
                  </div>
                  <button
                    style={{
                      fontSize: 10,
                      padding: '2px 8px',
                      background: ext.installed ? '#1e1e1e' : '#007acc',
                      color: ext.installed ? '#858585' : '#ffffff',
                      border: ext.installed ? '1px solid #3c3c3c' : 'none',
                      borderRadius: 2,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >
                    {ext.installed ? 'Installed' : 'Install'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
