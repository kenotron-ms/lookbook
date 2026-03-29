import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, ArrowLeft, Users } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'

const CATEGORIES = ['Featured', 'Most Popular', 'Productivity', 'Writing', 'Coding', 'Education']

const MODELS = [
  {
    id: 1,
    name: 'ResearchBot',
    description: 'Deep academic research with citation tracking and source verification.',
    category: 'Education',
    icon: '📚',
    iconBg: '#3b82f6',
    rating: 4.8,
    users: '2.3M',
  },
  {
    id: 2,
    name: 'CodeReview Pro',
    description: 'Automated PR reviews, security checks, and refactoring suggestions.',
    category: 'Coding',
    icon: '🔍',
    iconBg: '#8b5cf6',
    rating: 4.9,
    users: '1.8M',
  },
  {
    id: 3,
    name: 'CopyWriter AI',
    description: 'High-converting marketing copy, ads, and landing page content.',
    category: 'Writing',
    icon: '✍️',
    iconBg: '#f59e0b',
    rating: 4.7,
    users: '3.1M',
  },
  {
    id: 4,
    name: 'DataAnalyst',
    description: 'Upload CSVs and get instant charts, insights, and summaries.',
    category: 'Productivity',
    icon: '📊',
    iconBg: '#10a37f',
    rating: 4.6,
    users: '900K',
  },
  {
    id: 5,
    name: 'DebugGPT',
    description: 'Paste broken code and get a step-by-step diagnosis with fix.',
    category: 'Coding',
    icon: '🐛',
    iconBg: '#ef4444',
    rating: 4.8,
    users: '1.4M',
  },
  {
    id: 6,
    name: 'DocScribe',
    description: 'Auto-generates technical docs, READMEs, and API references.',
    category: 'Writing',
    icon: '📝',
    iconBg: '#6366f1',
    rating: 4.5,
    users: '670K',
  },
  {
    id: 7,
    name: 'MathTutor',
    description: 'Step-by-step solutions for calculus, algebra, and statistics.',
    category: 'Education',
    icon: '∑',
    iconBg: '#0ea5e9',
    rating: 4.9,
    users: '2.1M',
  },
  {
    id: 8,
    name: 'MeetingMind',
    description: 'Summarize meeting transcripts and extract action items instantly.',
    category: 'Productivity',
    icon: '🎙️',
    iconBg: '#f97316',
    rating: 4.6,
    users: '1.1M',
  },
  {
    id: 9,
    name: 'SQLGenius',
    description: 'Write, optimize, and explain complex SQL queries in plain English.',
    category: 'Coding',
    icon: '🗄️',
    iconBg: '#14b8a6',
    rating: 4.7,
    users: '850K',
  },
  {
    id: 10,
    name: 'StoryForge',
    description: 'Long-form narrative writing with consistent characters and plot.',
    category: 'Writing',
    icon: '📖',
    iconBg: '#ec4899',
    rating: 4.4,
    users: '560K',
  },
  {
    id: 11,
    name: 'EmailCraft',
    description: 'Draft professional emails in seconds. Tone-aware and context-smart.',
    category: 'Productivity',
    icon: '📧',
    iconBg: '#84cc16',
    rating: 4.5,
    users: '1.9M',
  },
  {
    id: 12,
    name: 'LangLearn',
    description: 'Conversational language learning with grammar correction and vocab.',
    category: 'Education',
    icon: '🌐',
    iconBg: '#a855f7',
    rating: 4.8,
    users: '2.7M',
  },
]

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
      <Star size={12} fill="#f59e0b" color="#f59e0b" />
      <span style={{ fontSize: '12px', color: '#9b9b9b' }}>{rating}</span>
    </div>
  )
}

export default function Store() {
  const [activeCategory, setActiveCategory] = useState('Featured')
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const filtered = MODELS.filter((m) => {
    const matchesSearch =
      search === '' ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      activeCategory === 'Featured' ||
      activeCategory === 'Most Popular' ||
      m.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#212121', overflow: 'hidden' }}>
      <Sidebar activeConvoId={null} onSelectConvo={() => navigate('/')} onNewChat={() => navigate('/')} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9b9b9b',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#ececec' }}>Model Store</h1>
            <p style={{ fontSize: '13px', color: '#9b9b9b', marginTop: '2px' }}>
              Specialized AI models built for specific tasks
            </p>
          </div>
        </div>

        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#2f2f2f',
            border: '1px solid #383838',
            borderRadius: '10px',
            padding: '10px 14px',
            maxWidth: '480px',
            marginBottom: '20px',
          }}
        >
          <Search size={16} color="#9b9b9b" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search models..."
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#ececec',
              fontSize: '14px',
              flex: 1,
            }}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: `1px solid ${activeCategory === cat ? '#10a37f' : '#383838'}`,
                background: activeCategory === cat ? 'rgba(16,163,127,0.15)' : '#2f2f2f',
                color: activeCategory === cat ? '#10a37f' : '#9b9b9b',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '14px',
          }}
        >
          {filtered.map((model) => (
            <div
              key={model.id}
              className="gpt-card"
              style={{ padding: '18px', cursor: 'pointer' }}
            >
              {/* Icon + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: model.iconBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '20px',
                    flexShrink: 0,
                  }}
                >
                  {model.icon}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: '#ececec' }}>
                    {model.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9b9b9b', marginTop: '1px' }}>
                    {model.category}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                style={{
                  fontSize: '13px',
                  color: '#9b9b9b',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                }}
              >
                {model.description}
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <StarRating rating={model.rating} />
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '12px',
                    color: '#9b9b9b',
                  }}
                >
                  <Users size={12} />
                  {model.users}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9b9b9b', padding: '60px 0', fontSize: '14px' }}>
            No models found for "{search}"
          </div>
        )}
      </div>
    </div>
  )
}
