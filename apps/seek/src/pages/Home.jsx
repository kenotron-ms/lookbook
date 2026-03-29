import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Mic, Grid3x3, X } from 'lucide-react'
import SeekLogo from '../components/SeekLogo'
import { suggestions } from '../data/queries'

export default function Home() {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [focused, setFocused] = useState(false)
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const filteredSuggestions = query.length > 0
    ? suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : suggestions.slice(0, 6)

  const handleSearch = (q = query) => {
    if (q.trim()) {
      navigate(`/results?q=${encodeURIComponent(q.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
    if (e.key === 'Escape') {
      setShowSuggestions(false)
      inputRef.current?.blur()
    }
  }

  const handleSuggestionClick = (s) => {
    setQuery(s)
    setShowSuggestions(false)
    handleSearch(s)
  }

  const isOpen = showSuggestions && focused && filteredSuggestions.length > 0

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: '14px 24px',
        gap: '16px',
      }}>
        <a href="#" style={{ color: '#202124', fontSize: '13px', textDecoration: 'none' }}
          onMouseOver={e => e.target.style.textDecoration='underline'}
          onMouseOut={e => e.target.style.textDecoration='none'}>
          Mail
        </a>
        <a href="#" style={{ color: '#202124', fontSize: '13px', textDecoration: 'none' }}
          onMouseOver={e => e.target.style.textDecoration='underline'}
          onMouseOut={e => e.target.style.textDecoration='none'}>
          Images
        </a>
        <button style={{
          padding: '4px 8px',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          color: '#5f6368',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '50%',
          width: '32px',
          height: '32px',
          justifyContent: 'center',
        }}
          onMouseOver={e => e.currentTarget.style.backgroundColor='#f1f3f4'}
          onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>
          <Grid3x3 size={20} />
        </button>
        <button style={{
          padding: '8px 18px',
          backgroundColor: '#4285f4',
          color: '#ffffff',
          border: 'none',
          borderRadius: '4px',
          fontSize: '13px',
          fontWeight: '500',
          cursor: 'pointer',
        }}
          onMouseOver={e => e.currentTarget.style.backgroundColor='#1a73e8'}
          onMouseOut={e => e.currentTarget.style.backgroundColor='#4285f4'}>
          Sign in
        </button>
      </div>

      {/* Main centered content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '100px',
        paddingTop: '20px',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '28px' }}>
          <SeekLogo size="large" />
        </div>

        {/* Subtitle links */}
        <div style={{ display: 'flex', gap: '24px', marginBottom: '20px' }}>
          <a href="#" style={{ color: '#70757a', fontSize: '13px', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.textDecoration='underline'}
            onMouseOut={e => e.target.style.textDecoration='none'}>
            Seek Search
          </a>
          <a href="#" style={{ color: '#70757a', fontSize: '13px', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.textDecoration='underline'}
            onMouseOut={e => e.target.style.textDecoration='none'}>
            I'm Feeling Lucky
          </a>
        </div>

        {/* Search bar container */}
        <div style={{ width: '100%', maxWidth: '540px', position: 'relative' }}>
          {/* Search input */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: isOpen ? '1px solid #dfe1e5' : `1px solid ${focused ? 'transparent' : '#dfe1e5'}`,
            borderRadius: isOpen ? '24px 24px 0 0' : '24px',
            boxShadow: focused ? '0 1px 6px rgba(32,33,36,.28)' : '0 1px 3px rgba(32,33,36,.1)',
            backgroundColor: '#ffffff',
            padding: '10px 16px',
            gap: '12px',
            transition: 'box-shadow 0.2s',
          }}>
            <Search size={20} color="#9aa0a6" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => { setFocused(true); setShowSuggestions(true) }}
              onBlur={() => { setTimeout(() => { setFocused(false); setShowSuggestions(false) }, 150) }}
              onKeyDown={handleKeyDown}
              placeholder=""
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#202124',
                backgroundColor: 'transparent',
                caretColor: '#4285f4',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#70757a',
                display: 'flex',
                alignItems: 'center',
                padding: '2px',
              }}>
                <X size={18} />
              </button>
            )}
            <div style={{ width: '1px', height: '24px', backgroundColor: '#dfe1e5', marginRight: '4px' }} />
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#4285f4',
              display: 'flex',
              alignItems: 'center',
            }}>
              <Mic size={20} />
            </button>
          </div>

          {/* Autocomplete dropdown */}
          {isOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              border: '1px solid #dfe1e5',
              borderTop: 'none',
              borderRadius: '0 0 24px 24px',
              boxShadow: '0 4px 6px rgba(32,33,36,.28)',
              zIndex: 100,
              paddingBottom: '8px',
            }}>
              <div style={{ height: '1px', backgroundColor: '#e8eaed', margin: '0 16px 8px' }} />
              {filteredSuggestions.map((s, i) => (
                <button
                  key={i}
                  onMouseDown={() => handleSuggestionClick(s)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    width: '100%',
                    padding: '10px 20px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: '#202124',
                    fontSize: '14px',
                  }}
                  onMouseOver={e => e.currentTarget.style.backgroundColor='#f8f9fa'}
                  onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}
                >
                  <Search size={16} color="#9aa0a6" style={{ flexShrink: 0 }} />
                  <span>{s}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: isOpen ? '50px' : '24px', transition: 'margin 0.1s' }}>
          <button
            onClick={() => handleSearch()}
            style={{
              padding: '0 16px',
              height: '36px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #f8f9fa',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#3c4043',
              cursor: 'pointer',
              fontWeight: '400',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor='#f1f3f4'; e.currentTarget.style.borderColor='#dadce0'; e.currentTarget.style.color='#202124'; e.currentTarget.style.boxShadow='0 1px 1px rgba(0,0,0,.1)' }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor='#f8f9fa'; e.currentTarget.style.borderColor='#f8f9fa'; e.currentTarget.style.color='#3c4043'; e.currentTarget.style.boxShadow='none' }}
          >
            Seek Search
          </button>
          <button
            onClick={() => handleSearch(suggestions[Math.floor(Math.random() * suggestions.length)])}
            style={{
              padding: '0 16px',
              height: '36px',
              backgroundColor: '#f8f9fa',
              border: '1px solid #f8f9fa',
              borderRadius: '4px',
              fontSize: '14px',
              color: '#3c4043',
              cursor: 'pointer',
              fontWeight: '400',
            }}
            onMouseOver={e => { e.currentTarget.style.backgroundColor='#f1f3f4'; e.currentTarget.style.borderColor='#dadce0'; e.currentTarget.style.color='#202124'; e.currentTarget.style.boxShadow='0 1px 1px rgba(0,0,0,.1)' }}
            onMouseOut={e => { e.currentTarget.style.backgroundColor='#f8f9fa'; e.currentTarget.style.borderColor='#f8f9fa'; e.currentTarget.style.color='#3c4043'; e.currentTarget.style.boxShadow='none' }}
          >
            I'm Feeling Lucky
          </button>
        </div>

        {/* Language */}
        <div style={{ marginTop: '28px', fontSize: '13px', color: '#70757a' }}>
          Offered in:{' '}
          <a href="#" style={{ color: '#1a0dab', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.textDecoration='underline'}
            onMouseOut={e => e.target.style.textDecoration='none'}>
            Spanish
          </a>{' '}
          <a href="#" style={{ color: '#1a0dab', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.textDecoration='underline'}
            onMouseOut={e => e.target.style.textDecoration='none'}>
            French
          </a>{' '}
          <a href="#" style={{ color: '#1a0dab', textDecoration: 'none' }}
            onMouseOver={e => e.target.style.textDecoration='underline'}
            onMouseOut={e => e.target.style.textDecoration='none'}>
            German
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        backgroundColor: '#f2f2f2',
        borderTop: '1px solid #e4e4e4',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 24px',
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <span style={{ color: '#70757a', fontSize: '14px' }}>
            © 2025 - Seek Corp
          </span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {['Privacy', 'Terms', 'Settings'].map(link => (
              <a key={link} href="#" style={{ color: '#70757a', fontSize: '14px', textDecoration: 'none' }}
                onMouseOver={e => e.target.style.textDecoration='underline'}
                onMouseOut={e => e.target.style.textDecoration='none'}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
