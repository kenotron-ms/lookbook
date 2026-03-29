import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Mic, Settings, ChevronDown } from 'lucide-react'
import SeekLogo from '../components/SeekLogo'
import { defaultQuery, imageResults } from '../data/queries'

const TABS = ['All', 'Images', 'News', 'Videos', 'Maps', 'Shopping', 'More']
const FILTERS = ['All', 'Photos', 'Clipart', 'Drawings', 'GIF', 'Transparent']
const COLORS = ['Any color', 'Full color', 'Black & white', 'Transparent']

export default function Images() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialQuery = params.get('q') || defaultQuery
  const [query, setQuery] = useState(initialQuery)
  const [activeFilter, setActiveFilter] = useState('All')
  const [hoveredId, setHoveredId] = useState(null)
  const [showColorFilter, setShowColorFilter] = useState(false)

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/images?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #ebebeb',
        padding: '0 16px',
      }}>
        {/* Top row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px 0 0' }}>
          <SeekLogo size="small" onClick={() => navigate('/')} />

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            border: '1px solid #dfe1e5',
            borderRadius: '24px',
            padding: '8px 16px',
            gap: '10px',
            flex: 1,
            maxWidth: '680px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
            onMouseOver={e => e.currentTarget.style.boxShadow='0 1px 6px rgba(32,33,36,.28)'}
            onMouseOut={e => e.currentTarget.style.boxShadow='0 1px 3px rgba(0,0,0,0.08)'}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: '16px', color: '#202124', backgroundColor: 'transparent',
              }}
            />
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0 4px' }}>
              <Mic size={18} color="#4285f4" />
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#dfe1e5' }} />
            <button onClick={handleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0 4px' }}>
              <Search size={20} color="#4285f4" />
            </button>
          </div>

          {/* Right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto', flexShrink: 0 }}>
            <button style={{
              padding: '7px 18px', backgroundColor: '#4285f4', color: '#fff',
              border: 'none', borderRadius: '4px', fontSize: '13px', fontWeight: '500', cursor: 'pointer',
            }}
              onMouseOver={e => e.currentTarget.style.backgroundColor='#1a73e8'}
              onMouseOut={e => e.currentTarget.style.backgroundColor='#4285f4'}>
              Sign in
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '4px' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => {
              if (tab === 'All') navigate(`/results?q=${encodeURIComponent(query)}`)
              else if (tab === 'Images') return
            }} style={{
              padding: '10px 14px', background: 'none', border: 'none',
              cursor: 'pointer', fontSize: '13px',
              color: tab === 'Images' ? '#1a73e8' : '#70757a',
              borderBottom: tab === 'Images' ? '3px solid #1a73e8' : '3px solid transparent',
              fontWeight: tab === 'Images' ? '600' : '400',
              whiteSpace: 'nowrap',
            }}
              onMouseOver={e => { if (tab !== 'Images') e.currentTarget.style.color='#202124' }}
              onMouseOut={e => { if (tab !== 'Images') e.currentTarget.style.color='#70757a' }}>
              {tab}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '10px 14px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', color: '#70757a',
          }}>
            <Settings size={16} /> Settings
          </button>
        </div>

        {/* Filter bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 0 12px', overflowX: 'auto',
        }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: '6px 14px',
              border: `1px solid ${activeFilter === f ? '#1a73e8' : '#dadce0'}`,
              borderRadius: '16px',
              backgroundColor: activeFilter === f ? '#e8f0fe' : '#ffffff',
              color: activeFilter === f ? '#1a73e8' : '#202124',
              fontSize: '13px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontWeight: activeFilter === f ? '500' : '400',
            }}>
              {f}
            </button>
          ))}

          {/* Color filter */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowColorFilter(!showColorFilter)} style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 14px', border: '1px solid #dadce0',
              borderRadius: '16px', backgroundColor: '#ffffff',
              color: '#202124', fontSize: '13px', cursor: 'pointer',
            }}>
              Color filter <ChevronDown size={14} />
            </button>
            {showColorFilter && (
              <div style={{
                position: 'absolute', top: '36px', left: 0, zIndex: 50,
                backgroundColor: '#fff', border: '1px solid #dadce0',
                borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '160px', padding: '8px 0',
              }}>
                {COLORS.map(c => (
                  <button key={c} onClick={() => setShowColorFilter(false)} style={{
                    display: 'block', width: '100%', padding: '8px 16px',
                    background: 'none', border: 'none', textAlign: 'left',
                    fontSize: '13px', color: '#202124', cursor: 'pointer',
                  }}
                    onMouseOver={e => e.currentTarget.style.backgroundColor='#f8f9fa'}
                    onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image grid */}
      <div style={{ padding: '16px 16px 40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        <p style={{ fontSize: '13px', color: '#70757a', marginBottom: '16px' }}>
          About 4,820,000,000 images (0.38 seconds)
        </p>

        {/* Masonry-like grid using CSS columns */}
        <div style={{
          columnCount: 4,
          columnGap: '8px',
          columnFill: 'balance',
        }}>
          {/* Repeat images for more content */}
          {[...imageResults, ...imageResults].map((img, idx) => (
            <div
              key={`${img.id}-${idx}`}
              style={{
                breakInside: 'avoid',
                marginBottom: '8px',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                position: 'relative',
              }}
              onMouseEnter={() => setHoveredId(`${img.id}-${idx}`)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Gradient image placeholder */}
              <div style={{
                width: '100%',
                height: `${img.h + (idx % 3) * 40}px`,
                background: `linear-gradient(${135 + idx * 15}deg, ${img.from} 0%, ${img.to} 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                transition: 'transform 0.2s',
                transform: hoveredId === `${img.id}-${idx}` ? 'scale(1.02)' : 'scale(1)',
              }}>
                {/* Hover overlay */}
                {hoveredId === `${img.id}-${idx}` && (
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    display: 'flex', flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '12px',
                    borderRadius: '8px',
                  }}>
                    <p style={{ color: '#fff', fontSize: '13px', fontWeight: '500', marginBottom: '2px' }}>
                      {img.label}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>
                      {['reactguide.dev', 'dev.to', 'medium.com', 'github.com'][idx % 4]}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button style={{
            padding: '12px 32px',
            border: '1px solid #dadce0',
            borderRadius: '24px',
            backgroundColor: '#f8f9fa',
            color: '#3c4043',
            fontSize: '14px',
            cursor: 'pointer',
          }}
            onMouseOver={e => e.currentTarget.style.backgroundColor='#e8eaed'}
            onMouseOut={e => e.currentTarget.style.backgroundColor='#f8f9fa'}>
            Show more images
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#f2f2f2', borderTop: '1px solid #e4e4e4', marginTop: 'auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 24px', flexWrap: 'wrap', gap: '8px',
        }}>
          <span style={{ color: '#70757a', fontSize: '14px' }}>© 2025 - Seek Corp</span>
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
