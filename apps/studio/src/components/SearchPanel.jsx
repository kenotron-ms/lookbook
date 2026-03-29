import { useState } from 'react'
import { CaseSensitive, WholeWord, Regex, ChevronDown, ChevronRight } from 'lucide-react'
import { searchResults } from '../data/files.js'

export default function SearchPanel() {
  const [query, setQuery] = useState('Button')
  const [expanded, setExpanded] = useState({})

  const toggleFile = (file) => setExpanded(e => ({ ...e, [file]: !e[file] }))

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
        Search
      </div>

      {/* Search input */}
      <div style={{ padding: '4px 8px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#3c3c3c',
          border: '1px solid #007acc',
          borderRadius: 2,
          padding: '2px 6px',
          gap: 4,
        }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#cccccc',
              fontSize: 13,
              fontFamily: 'inherit',
            }}
          />
          {/* Toggles */}
          {[CaseSensitive, WholeWord, Regex].map((Icon, i) => (
            <button key={i} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#858585', display: 'flex', padding: 2, borderRadius: 2,
            }}
              onMouseEnter={e => e.currentTarget.style.background = '#505050'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <Icon size={13} />
            </button>
          ))}
        </div>
      </div>

      {/* Replace input */}
      <div style={{ padding: '2px 8px' }}>
        <input
          placeholder="Replace"
          style={{
            width: '100%',
            background: '#3c3c3c',
            border: '1px solid #3c3c3c',
            borderRadius: 2,
            padding: '3px 6px',
            color: '#cccccc',
            fontSize: 13,
            outline: 'none',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = '#007acc'}
          onBlur={e => e.target.style.borderColor = '#3c3c3c'}
        />
      </div>

      {/* Files to include */}
      <div style={{ padding: '4px 8px 8px' }}>
        <input
          placeholder="files to include"
          style={{
            width: '100%',
            background: '#3c3c3c',
            border: '1px solid #3c3c3c',
            borderRadius: 2,
            padding: '3px 6px',
            color: '#858585',
            fontSize: 11,
            outline: 'none',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = '#007acc'}
          onBlur={e => e.target.style.borderColor = '#3c3c3c'}
        />
      </div>

      {/* Results count */}
      <div style={{
        padding: '2px 12px 6px',
        fontSize: 11,
        color: '#858585',
        borderBottom: '1px solid #3c3c3c',
      }}>
        7 results in 4 files
      </div>

      {/* Results */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {searchResults.map((result) => {
          const isOpen = expanded[result.file] !== false
          return (
            <div key={result.file}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  cursor: 'default',
                  userSelect: 'none',
                }}
                onClick={() => toggleFile(result.file)}
                onMouseEnter={e => e.currentTarget.style.background = '#2a2d2e'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                {isOpen ? <ChevronDown size={12} color="#858585" /> : <ChevronRight size={12} color="#858585" />}
                <span style={{ color: '#cccccc', fontSize: 12, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {result.file}
                </span>
                <span style={{ fontSize: 10, color: '#858585', background: '#3c3c3c', borderRadius: 8, padding: '0 5px' }}>
                  {result.matches.length}
                </span>
              </div>
              {isOpen && result.matches.map((match, i) => (
                <div
                  key={i}
                  style={{
                    padding: '2px 8px 2px 28px',
                    fontSize: 12,
                    cursor: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    userSelect: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#2a2d2e'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ color: '#858585', minWidth: 20, textAlign: 'right', fontSize: 11 }}>{match.line}</span>
                  <span style={{ color: '#cccccc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {match.text.split(match.highlight).flatMap((part, j, arr) => (
                      j < arr.length - 1
                        ? [<span key={`p${j}`}>{part}</span>, <mark key={`h${j}`} style={{ background: '#613315', color: '#ff8c00', borderRadius: 1, padding: '0 1px' }}>{match.highlight}</mark>]
                        : [<span key={`p${j}`}>{part}</span>]
                    ))}
                  </span>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
