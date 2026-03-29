import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Search, Mic, Settings, ChevronDown, ChevronRight, ExternalLink } from 'lucide-react'
import SeekLogo from '../components/SeekLogo'
import {
  defaultQuery, results, featuredSnippet,
  peopleAlsoAsk, relatedSearches, knowledgePanel
} from '../data/queries'

const TABS = ['All', 'Images', 'News', 'Videos', 'Maps', 'Shopping', 'More']

function Favicon({ bg, letter }) {
  return (
    <div style={{
      width: '16px', height: '16px',
      borderRadius: '2px',
      backgroundColor: bg,
      color: '#fff',
      fontSize: '10px',
      fontWeight: '700',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      {letter}
    </div>
  )
}

function ResultCard({ result }) {
  return (
    <div style={{ marginBottom: '28px', maxWidth: '600px' }}>
      {/* Favicon + URL */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <Favicon bg={result.faviconBg} letter={result.faviconLetter} />
        <span style={{ fontSize: '12px', color: '#202124', lineHeight: '20px' }}>{result.displayUrl.split(' › ')[0]}</span>
        <ChevronRight size={14} color="#70757a" />
      </div>
      <div style={{ fontSize: '12px', color: '#70757a', marginBottom: '2px', paddingLeft: '24px' }}>
        {result.displayUrl}
      </div>
      {/* Title */}
      <a href={result.url} target="_blank" rel="noopener noreferrer" style={{
        display: 'block',
        fontSize: '20px',
        color: '#1a0dab',
        lineHeight: '26px',
        marginBottom: '4px',
        textDecoration: 'none',
        fontWeight: '400',
      }}
        onMouseOver={e => e.currentTarget.style.textDecoration='underline'}
        onMouseOut={e => e.currentTarget.style.textDecoration='none'}>
        {result.title}
      </a>
      {/* Snippet */}
      <div style={{ fontSize: '14px', color: '#4d5156', lineHeight: '22px' }}>
        {result.snippet}
      </div>
      {/* Sitelinks */}
      {result.sitelinks && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
          {result.sitelinks.map(sl => (
            <a key={sl} href="#" style={{
              fontSize: '14px',
              color: '#1a0dab',
              border: '1px solid #dadce0',
              borderRadius: '8px',
              padding: '6px 12px',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
              onMouseOver={e => { e.currentTarget.style.backgroundColor='#f8f9fa'; e.currentTarget.style.textDecoration='underline' }}
              onMouseOut={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.textDecoration='none' }}>
              {sl}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

function PeopleAlsoAsk({ questions }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div style={{ marginBottom: '28px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '400', color: '#202124', marginBottom: '12px' }}>
        People also ask
      </h2>
      {questions.map((q, i) => (
        <div key={i} style={{
          borderTop: i === 0 ? '1px solid #dadce0' : 'none',
          borderBottom: '1px solid #dadce0',
        }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              background: 'none',
              border: 'none',
              textAlign: 'left',
              cursor: 'pointer',
              gap: '16px',
            }}
          >
            <span style={{ fontSize: '15px', color: '#202124', lineHeight: '22px' }}>{q.question}</span>
            <ChevronDown
              size={20}
              color="#70757a"
              style={{
                flexShrink: 0,
                transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>
          {openIndex === i && (
            <div style={{
              padding: '0 0 16px',
              fontSize: '14px',
              color: '#4d5156',
              lineHeight: '22px',
            }}>
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function KnowledgePanel({ data }) {
  return (
    <div style={{
      border: '1px solid #dadce0',
      borderRadius: '8px',
      padding: '20px',
      backgroundColor: '#ffffff',
      width: '100%',
    }}>
      {/* Title */}
      <h2 style={{ fontSize: '24px', fontWeight: '400', color: '#202124', marginBottom: '2px' }}>{data.title}</h2>
      <p style={{ fontSize: '13px', color: '#70757a', marginBottom: '16px' }}>{data.subtitle}</p>

      {/* Image area */}
      <div style={{
        width: '100%',
        height: '200px',
        borderRadius: '8px',
        background: `linear-gradient(135deg, ${data.gradientFrom} 0%, ${data.gradientTo} 60%, ${data.gradientAccent} 100%)`,
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '48px', fontWeight: '300', letterSpacing: '-2px' }}>
          {data.title}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: '14px', color: '#4d5156', lineHeight: '22px', marginBottom: '16px' }}>
        {data.description}
      </p>

      {/* Facts */}
      {data.facts.map((f, i) => (
        <div key={i} style={{
          display: 'flex',
          borderTop: '1px solid #e8eaed',
          padding: '10px 0',
          gap: '12px',
        }}>
          <span style={{ fontSize: '13px', color: '#70757a', width: '120px', flexShrink: 0 }}>{f.label}</span>
          <span style={{ fontSize: '13px', color: '#202124' }}>{f.value}</span>
        </div>
      ))}

      {/* See also */}
      <div style={{ marginTop: '16px', borderTop: '1px solid #e8eaed', paddingTop: '12px' }}>
        <p style={{ fontSize: '13px', color: '#70757a', marginBottom: '8px' }}>See results about</p>
        {data.seeAlso.map((s, i) => (
          <a key={i} href="#" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            color: '#1a0dab',
            padding: '6px 0',
            textDecoration: 'none',
          }}
            onMouseOver={e => e.currentTarget.style.textDecoration='underline'}
            onMouseOut={e => e.currentTarget.style.textDecoration='none'}>
            <ExternalLink size={13} />
            {s}
          </a>
        ))}
      </div>
    </div>
  )
}

function RelatedSearches({ searches }) {
  const navigate = useNavigate()
  return (
    <div style={{ marginBottom: '32px', maxWidth: '600px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '400', color: '#202124', marginBottom: '12px' }}>
        Related searches
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {searches.map((s, i) => (
          <button key={i} onClick={() => navigate(`/results?q=${encodeURIComponent(s)}`)} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            border: '1px solid #dadce0',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            textAlign: 'left',
            fontSize: '14px',
            color: '#202124',
          }}
            onMouseOver={e => e.currentTarget.style.backgroundColor='#f1f3f4'}
            onMouseOut={e => e.currentTarget.style.backgroundColor='#f8f9fa'}>
            <Search size={16} color="#70757a" style={{ flexShrink: 0 }} />
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Results() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialQuery = params.get('q') || defaultQuery
  const [query, setQuery] = useState(initialQuery)
  const [activeTab, setActiveTab] = useState('All')

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleTabClick = (tab) => {
    if (tab === 'Images') {
      navigate(`/images?q=${encodeURIComponent(query)}`)
    } else {
      setActiveTab(tab)
    }
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
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '12px 0 0',
        }}>
          <SeekLogo size="small" onClick={() => navigate('/')} />

          {/* Search bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
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
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '16px',
                color: '#202124',
                backgroundColor: 'transparent',
              }}
            />
            <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#70757a', display: 'flex', padding: '0 4px' }}>
              <Mic size={18} color="#4285f4" />
            </button>
            <div style={{ width: '1px', height: '24px', backgroundColor: '#dfe1e5' }} />
            <button onClick={handleSearch} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '0 4px' }}>
              <Search size={20} color="#4285f4" />
            </button>
          </div>

          {/* Right links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: 'auto', flexShrink: 0 }}>
            <a href="#" style={{ fontSize: '13px', color: '#4285f4', textDecoration: 'none' }}
              onMouseOver={e => e.target.style.textDecoration='underline'}
              onMouseOut={e => e.target.style.textDecoration='none'}>
              Advanced Search
            </a>
            <button style={{
              padding: '7px 18px',
              backgroundColor: '#4285f4',
              color: '#fff',
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
        </div>

        {/* Tab navigation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '4px' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => handleTabClick(tab)} style={{
              padding: '10px 14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '13px',
              color: activeTab === tab ? '#1a73e8' : '#70757a',
              borderBottom: activeTab === tab ? '3px solid #1a73e8' : '3px solid transparent',
              fontWeight: activeTab === tab ? '600' : '400',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
              onMouseOver={e => { if (activeTab !== tab) e.currentTarget.style.color='#202124' }}
              onMouseOut={e => { if (activeTab !== tab) e.currentTarget.style.color='#70757a' }}>
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
          <button style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            padding: '10px 14px', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '13px', color: '#70757a',
          }}>
            Tools
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px 40px', display: 'flex', gap: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Main column (70%) */}
        <div style={{ flex: '0 0 62%', minWidth: 0 }}>
          {/* Results count */}
          <p style={{ fontSize: '13px', color: '#70757a', marginBottom: '20px' }}>
            About 1,420,000,000 results (0.43 seconds)
          </p>

          {/* Featured Snippet */}
          <div style={{
            backgroundColor: '#e8f0fe',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '28px',
            maxWidth: '600px',
            border: '1px solid #c6d7fb',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Search size={14} color="#4285f4" />
              <span style={{ fontSize: '12px', color: '#4285f4', fontWeight: '500' }}>
                Featured snippet from the web
              </span>
            </div>
            <p style={{ fontSize: '14px', color: '#202124', lineHeight: '22px', marginBottom: '12px' }}>
              {featuredSnippet.content}
            </p>
            <a href={featuredSnippet.sourceUrl} style={{
              fontSize: '13px', color: '#188038', textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: '4px',
            }}
              onMouseOver={e => e.currentTarget.style.textDecoration='underline'}
              onMouseOut={e => e.currentTarget.style.textDecoration='none'}>
              <ExternalLink size={12} />
              {featuredSnippet.source} › {featuredSnippet.title}
            </a>
          </div>

          {/* Web Results */}
          {results.map(r => <ResultCard key={r.id} result={r} />)}

          {/* People also ask */}
          <PeopleAlsoAsk questions={peopleAlsoAsk} />

          {/* Related searches */}
          <RelatedSearches searches={relatedSearches} />

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', paddingTop: '8px', maxWidth: '600px' }}>
            {['1','2','3','4','5','6','7','8','9','10'].map((p, i) => (
              <button key={p} style={{
                width: '36px', height: '36px',
                border: 'none',
                background: i === 0 ? '#4285f4' : 'none',
                color: i === 0 ? '#fff' : '#1a0dab',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: i === 0 ? '600' : '400',
              }}
                onMouseOver={e => { if (i !== 0) e.currentTarget.style.backgroundColor='#f1f3f4' }}
                onMouseOut={e => { if (i !== 0) e.currentTarget.style.backgroundColor='transparent' }}>
                {p}
              </button>
            ))}
            <button style={{
              padding: '6px 16px', border: 'none', background: 'none',
              color: '#1a0dab', cursor: 'pointer', fontSize: '14px', borderRadius: '4px',
            }}
              onMouseOver={e => e.currentTarget.style.backgroundColor='#f1f3f4'}
              onMouseOut={e => e.currentTarget.style.backgroundColor='transparent'}>
              Next ›
            </button>
          </div>
        </div>

        {/* Knowledge panel (30%) */}
        <div style={{ flex: '0 0 34%', minWidth: 0, paddingTop: '36px' }}>
          <KnowledgePanel data={knowledgePanel} />
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
            {['Privacy', 'Terms', 'Settings', 'Help'].map(link => (
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
