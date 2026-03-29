import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, SlidersHorizontal, Flame, Sparkles, Lock, Star } from 'lucide-react'
import { templates } from '../data/designs.js'

const ACCENT = '#7c3aed'

const filterGroups = [
  {
    label: 'Format',
    options: ['Presentation', 'Social Post', 'Poster', 'Logo', 'Video', 'Flyer', 'Card', 'Email'],
  },
  {
    label: 'Category',
    options: ['Business', 'Marketing', 'Education', 'Personal', 'Events', 'Retail'],
  },
  {
    label: 'Style',
    options: ['Minimalist', 'Bold', 'Elegant', 'Playful', 'Corporate', 'Vintage'],
  },
  {
    label: 'Color',
    options: ['Purple', 'Pink', 'Yellow', 'Green', 'Blue', 'Red', 'Monochrome'],
  },
  {
    label: 'Topic',
    options: ['Fashion', 'Food', 'Tech', 'Finance', 'Health', 'Sports', 'Travel'],
  },
]

const sortOptions = [
  { id: 'trending', icon: Flame, label: 'Trending' },
  { id: 'new', icon: Sparkles, label: 'New' },
  { id: 'free', icon: Star, label: 'Free' },
  { id: 'pro', icon: Lock, label: 'Pro' },
]

// Extend templates for a fuller grid
const extendedTemplates = [
  ...templates,
  { id: 13, title: 'Brand Guideline', category: 'Marketing', badge: 'Pro', gradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', aspect: '3/4' },
  { id: 14, title: 'Webinar Banner', category: 'Marketing', badge: 'Free', gradient: 'linear-gradient(135deg, #0f172a 0%, #1e40af 100%)', aspect: '16/9' },
  { id: 15, title: 'Product Label', category: 'Print', badge: 'Pro', gradient: 'linear-gradient(135deg, #f0fdf4 0%, #86efac 100%)', aspect: '1/1' },
  { id: 16, title: 'Stories Pack', category: 'Social Media', badge: 'Free', gradient: 'linear-gradient(135deg, #f97316 0%, #facc15 100%)', aspect: '9/16' },
]

export default function Templates() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [activeSort, setActiveSort] = useState('trending')
  const [expandedFilters, setExpandedFilters] = useState({ Format: true, Category: false, Style: false, Color: false, Topic: false })
  const [selectedFilters, setSelectedFilters] = useState({})

  const toggleFilter = (group, option) => {
    setSelectedFilters(prev => {
      const current = prev[group] || []
      return {
        ...prev,
        [group]: current.includes(option) ? current.filter(o => o !== option) : [...current, option],
      }
    })
  }

  const toggleGroup = (group) => {
    setExpandedFilters(prev => ({ ...prev, [group]: !prev[group] }))
  }

  const filtered = extendedTemplates.filter(t => {
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) && !t.category.toLowerCase().includes(search.toLowerCase())) return false
    if (activeSort === 'free' && t.badge !== 'Free') return false
    if (activeSort === 'pro' && t.badge !== 'Pro') return false
    return true
  })

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden', background: '#fff' }}>

      {/* Filter sidebar */}
      <aside style={{
        width: 220, flexShrink: 0, background: '#f4f4f5',
        borderRight: '1px solid #e5e7eb',
        overflowY: 'auto', padding: '16px 12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16, padding: '0 4px' }}>
          <SlidersHorizontal size={15} color={ACCENT} />
          <span style={{ fontSize: 14, fontWeight: 700, color: '#120b20' }}>Filters</span>
          {Object.values(selectedFilters).flat().length > 0 && (
            <button onClick={() => setSelectedFilters({})} style={{
              marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: ACCENT,
              background: 'none', border: 'none', cursor: 'pointer',
            }}>Clear all</button>
          )}
        </div>

        {filterGroups.map(({ label, options }) => (
          <div key={label} style={{ marginBottom: 4 }}>
            <button
              onClick={() => toggleGroup(label)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '8px 8px', borderRadius: 8, border: 'none',
                background: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#120b20',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#e9e9eb'}
              onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {label}
                {(selectedFilters[label] || []).length > 0 && (
                  <span style={{ fontSize: 10, fontWeight: 700, background: ACCENT, color: '#fff', borderRadius: 10, padding: '1px 6px' }}>
                    {(selectedFilters[label] || []).length}
                  </span>
                )}
              </div>
              <ChevronDown size={14} color="#9ca3af" style={{ transform: expandedFilters[label] ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {expandedFilters[label] && (
              <div style={{ padding: '4px 4px 8px', display: 'flex', flexDirection: 'column', gap: 1 }}>
                {options.map(option => {
                  const isSelected = (selectedFilters[label] || []).includes(option)
                  return (
                    <button
                      key={option}
                      onClick={() => toggleFilter(label, option)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '5px 8px', borderRadius: 7, border: 'none',
                        background: isSelected ? '#ede9fe' : 'none', cursor: 'pointer',
                        fontSize: 12, fontWeight: isSelected ? 600 : 400,
                        color: isSelected ? ACCENT : '#667085', textAlign: 'left',
                        transition: 'all 0.13s',
                      }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#f0f0f2' }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'none' }}
                    >
                      <div style={{
                        width: 14, height: 14, borderRadius: 4, flexShrink: 0,
                        border: isSelected ? `2px solid ${ACCENT}` : '1.5px solid #d1d5db',
                        background: isSelected ? ACCENT : '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSelected && <div style={{ width: 5, height: 5, borderRadius: 1, background: '#fff' }} />}
                      </div>
                      {option}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', padding: '28px 28px 60px' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
          <div style={{ position: 'relative', flex: 1, maxWidth: 400 }}>
            <Search size={14} color="#9ca3af" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search templates..."
              style={{
                width: '100%', height: 40, paddingLeft: 36, paddingRight: 12,
                borderRadius: 10, border: '1.5px solid #e5e7eb', background: '#f9fafb',
                fontSize: 13, color: '#120b20', outline: 'none', fontFamily: 'inherit',
              }}
              onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.background = '#fff' }}
              onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {sortOptions.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveSort(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '7px 14px', borderRadius: 9, border: 'none', cursor: 'pointer',
                  background: activeSort === id ? ACCENT : '#f4f4f5',
                  color: activeSort === id ? '#fff' : '#667085',
                  fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                }}
              >
                <Icon size={13} /> {label}
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', fontSize: 13, color: '#9ca3af' }}>
            {filtered.length} templates
          </div>
        </div>

        {/* Template grid — mixed aspect ratios like Canva */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
          alignItems: 'start',
        }}>
          {filtered.map(tmpl => (
            <TemplateCard key={tmpl.id} tmpl={tmpl} onClick={() => navigate('/editor')} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: '#9ca3af' }}>
            <Search size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
            <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>No templates found</div>
            <div style={{ fontSize: 13 }}>Try adjusting your filters or search</div>
          </div>
        )}
      </main>
    </div>
  )
}

function TemplateCard({ tmpl, onClick }) {
  const [hovered, setHovered] = useState(false)

  // Vary heights by aspect ratio
  const height = tmpl.aspect === '9/16' ? 240
    : tmpl.aspect === '3/4' ? 180
    : tmpl.aspect === '1/1' ? 140
    : 120

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        background: '#fff',
        boxShadow: hovered ? '0 8px 28px rgba(0,0,0,0.13)' : '0 2px 10px rgba(0,0,0,0.07)',
        border: `1.5px solid ${hovered ? ACCENT : '#f0f0f0'}`,
        transform: hovered ? 'translateY(-3px)' : 'none',
        transition: 'all 0.18s',
      }}
    >
      {/* Preview */}
      <div style={{ height, background: tmpl.gradient, position: 'relative', overflow: 'hidden' }}>
        {/* Simulated content inside template */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: 12 }}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.6)', margin: '0 auto 6px' }} />
            <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.4)', margin: '0 auto 6px' }} />
            <div style={{ width: 30, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.3)', margin: '0 auto' }} />
          </div>
        </div>
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(18,11,32,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <button style={{
              background: '#fff', color: ACCENT, border: 'none', borderRadius: 20,
              padding: '7px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}>
              Use template
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '10px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#120b20', marginBottom: 2 }}>{tmpl.title}</div>
          <div style={{ fontSize: 11, color: '#9ca3af' }}>{tmpl.category}</div>
        </div>
        <span style={{
          fontSize: 10, fontWeight: 700, padding: '3px 8px', borderRadius: 20,
          background: tmpl.badge === 'Pro' ? '#fef3c7' : '#d1fae5',
          color: tmpl.badge === 'Pro' ? '#d97706' : '#059669',
          flexShrink: 0,
        }}>
          {tmpl.badge}
        </span>
      </div>
    </div>
  )
}
