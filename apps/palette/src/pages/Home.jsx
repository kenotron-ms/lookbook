import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Monitor, Image, Star, Video, Crop, Plus,
  Clock, ChevronRight, Grid, MoreHorizontal
} from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { recentDesigns, templates } from '../data/designs.js'

const ACCENT = '#7c3aed'

const quickCreate = [
  { label: 'Presentation', icon: Monitor, bg: '#7c3aed' },
  { label: 'Social Post', icon: Image, bg: '#ec4899' },
  { label: 'Logo', icon: Star, bg: '#f59e0b' },
  { label: 'Video', icon: Video, bg: '#ef4444' },
  { label: 'Poster', icon: Crop, bg: '#10b981' },
  { label: 'Custom', icon: Plus, bg: '#6366f1' },
]

const tabs = ['Presentations', 'Social media', 'Print', 'Marketing', 'Logos']

export default function Home() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('Presentations')
  const [searchVal, setSearchVal] = useState('')

  const filteredTemplates = templates.filter(t =>
    activeTab === 'Presentations' ? t.category === 'Presentations' :
    activeTab === 'Social media' ? t.category === 'Social Media' :
    activeTab === 'Print' ? t.category === 'Print' :
    activeTab === 'Marketing' ? t.category === 'Marketing' :
    activeTab === 'Logos' ? t.category === 'Logos' : true
  )

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
      <Sidebar active="Home" />

      {/* Main content */}
      <main style={{ flex: 1, overflowY: 'auto', background: '#ffffff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 32px 60px' }}>

          {/* Hero search */}
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h1 style={{ fontSize: 32, fontWeight: 800, color: '#120b20', marginBottom: 6, letterSpacing: '-0.5px' }}>
              What will you design today?
            </h1>
            <p style={{ fontSize: 16, color: '#667085', marginBottom: 24 }}>
              Design anything. Publish everywhere.
            </p>
            <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto' }}>
              <Search size={18} color="#9ca3af" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={searchVal}
                onChange={e => setSearchVal(e.target.value)}
                placeholder="Search templates, designs, elements..."
                style={{
                  width: '100%', height: 50, paddingLeft: 46, paddingRight: 16,
                  borderRadius: 14, border: '1.5px solid #e5e7eb',
                  background: '#f9fafb', fontSize: 15, color: '#120b20',
                  outline: 'none', fontFamily: 'inherit',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
                onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.background = '#fff' }}
                onBlur={e => { e.target.style.borderColor = '#e5e7eb'; e.target.style.background = '#f9fafb' }}
              />
            </div>
          </div>

          {/* Quick create buttons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 48 }}>
            {quickCreate.map(({ label, icon: Icon, bg }) => (
              <button
                key={label}
                onClick={() => navigate('/editor')}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                  padding: '20px 12px 16px', borderRadius: 14, border: 'none',
                  background: '#f9fafb', cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#f3f0ff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.transform = 'none' }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 12, background: bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 12px ${bg}55`,
                }}>
                  <Icon size={24} color="#fff" />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#120b20' }}>{label}</span>
              </button>
            ))}
          </div>

          {/* Recent designs */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={18} color="#667085" />
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#120b20' }}>Recent designs</h2>
              </div>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: ACCENT,
              }}>
                See all <ChevronRight size={16} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {recentDesigns.map(design => (
                <div
                  key={design.id}
                  onClick={() => navigate('/editor')}
                  style={{
                    borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                    background: '#fff',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                    border: '1px solid #f0f0f0',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(124,58,237,0.14)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)' }}
                >
                  {/* Preview */}
                  <div style={{
                    height: 130, background: design.gradient,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <div style={{ position: 'absolute', top: 8, right: 8 }}>
                      <button
                        onClick={e => e.stopPropagation()}
                        style={{
                          width: 28, height: 28, borderRadius: 7, background: 'rgba(255,255,255,0.25)',
                          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <MoreHorizontal size={14} color="#fff" />
                      </button>
                    </div>
                    <Grid size={28} color="rgba(255,255,255,0.6)" />
                  </div>
                  {/* Info */}
                  <div style={{ padding: '10px 12px 12px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#120b20', marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {design.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>{design.format}</span>
                      <span style={{ fontSize: 11, color: '#9ca3af' }}>{design.lastEdited}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested templates */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#120b20' }}>Suggested templates</h2>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 500, color: ACCENT,
              }}>
                Browse all <ChevronRight size={16} />
              </button>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 500,
                    background: activeTab === tab ? ACCENT : '#f4f4f5',
                    color: activeTab === tab ? '#fff' : '#667085',
                    transition: 'all 0.15s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Template grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {(filteredTemplates.length ? filteredTemplates : templates).slice(0, 8).map(tmpl => (
                <div
                  key={tmpl.id}
                  onClick={() => navigate('/editor')}
                  style={{
                    borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                    background: '#fff', boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                    border: '1px solid #f0f0f0', transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.07)' }}
                >
                  <div style={{ height: 120, background: tmpl.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{tmpl.category}</span>
                  </div>
                  <div style={{ padding: '10px 12px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#120b20' }}>{tmpl.title}</span>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
                      background: tmpl.badge === 'Pro' ? '#fef3c7' : '#d1fae5',
                      color: tmpl.badge === 'Pro' ? '#d97706' : '#059669',
                    }}>
                      {tmpl.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
