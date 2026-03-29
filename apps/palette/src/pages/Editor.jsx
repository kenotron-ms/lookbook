import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronLeft, ChevronDown, Undo2, Redo2, ZoomIn, ZoomOut,
  Share2, Download, LayoutTemplate, Shapes, Image, Type,
  Video, Bookmark, AppWindow, Search, Circle, Square,
  Triangle, Star, Minus, CornerUpLeft, Sliders, Eye, EyeOff,
  AlignLeft, Users, Check
} from 'lucide-react'

const ACCENT = '#7c3aed'

const leftTabs = [
  { id: 'templates', icon: LayoutTemplate, label: 'Templates' },
  { id: 'elements', icon: Shapes, label: 'Elements' },
  { id: 'photos', icon: Image, label: 'Photos' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'videos', icon: Video, label: 'Videos' },
  { id: 'brand', icon: Bookmark, label: 'Brand' },
  { id: 'apps', icon: AppWindow, label: 'Apps' },
]

const elementCategories = ['Lines & Shapes', 'Frames', 'Stickers', 'Charts', 'Tables', 'Gradients']
const shapes = [
  { id: 1, type: 'circle', bg: '#7c3aed' },
  { id: 2, type: 'square', bg: '#ec4899' },
  { id: 3, type: 'triangle', bg: '#f59e0b' },
  { id: 4, type: 'star', bg: '#10b981' },
  { id: 5, type: 'circle', bg: '#3b82f6' },
  { id: 6, type: 'square', bg: '#ef4444' },
  { id: 7, type: 'circle', bg: '#6366f1' },
  { id: 8, type: 'square', bg: '#14b8a6' },
  { id: 9, type: 'triangle', bg: '#f97316' },
  { id: 10, type: 'star', bg: '#a855f7' },
  { id: 11, type: 'circle', bg: '#0ea5e9' },
  { id: 12, type: 'square', bg: '#84cc16' },
]

const collaborators = ['#7c3aed', '#ec4899', '#f59e0b', '#10b981']

export default function Editor() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('elements')
  const [selectedEl, setSelectedEl] = useState('gradient-text')
  const [zoom, setZoom] = useState(100)
  const [shadowOn, setShadowOn] = useState(true)
  const [opacity, setOpacity] = useState(100)
  const [fillColor, setFillColor] = useState('#7c3aed')
  const [searchEl, setSearchEl] = useState('')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', background: '#fff' }}>

      {/* Editor top bar */}
      <div style={{
        height: 52, borderBottom: '1px solid #e5e7eb',
        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8,
        background: '#fff', flexShrink: 0,
      }}>
        {/* Breadcrumb */}
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: '#667085', fontSize: 13 }}>
          <ChevronLeft size={16} /> Home
        </button>
        <span style={{ color: '#e5e7eb' }}>/</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#120b20' }}>Spring Collection Post</span>

        <div style={{ flex: 1 }} />

        {/* Undo / Redo */}
        {[Undo2, Redo2].map((Icon, i) => (
          <button key={i} style={{ width: 32, height: 32, borderRadius: 7, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f4f4f5'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <Icon size={16} color="#667085" />
          </button>
        ))}

        {/* Zoom */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, background: '#f4f4f5', borderRadius: 8, padding: '2px 4px' }}>
          <button onClick={() => setZoom(z => Math.max(25, z - 10))} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
            onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <ZoomOut size={13} color="#667085" />
          </button>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#120b20', minWidth: 36, textAlign: 'center' }}>{zoom}%</span>
          <button onClick={() => setZoom(z => Math.min(200, z + 10))} style={{ width: 24, height: 24, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5 }}
            onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <ZoomIn size={13} color="#667085" />
          </button>
        </div>

        {/* Collaborators */}
        <div style={{ display: 'flex', marginLeft: 8 }}>
          {collaborators.map((c, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: '50%', background: c,
              border: '2px solid #fff', marginLeft: i === 0 ? 0 : -8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, fontWeight: 700, color: '#fff',
            }}>
              {String.fromCharCode(65 + i)}
            </div>
          ))}
          <div style={{
            width: 28, height: 28, borderRadius: '50%', background: '#f4f4f5',
            border: '2px solid #fff', marginLeft: -8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: '#667085',
          }}>+2</div>
        </div>

        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: ACCENT, color: '#fff', border: 'none', borderRadius: 8,
          padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(124,58,237,0.35)',
        }}>
          <Share2 size={14} /> Share
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#f4f4f5', color: '#120b20', border: 'none', borderRadius: 8,
          padding: '7px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>
          <Download size={14} /> Download
        </button>
      </div>

      {/* Editor body */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Left panel — icon tabs */}
        <div style={{
          width: 60, background: '#f4f4f5', borderRight: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          paddingTop: 12, gap: 2, flexShrink: 0,
        }}>
          {leftTabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              title={label}
              style={{
                width: 48, padding: '8px 4px', borderRadius: 10, border: 'none',
                cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                background: activeTab === id ? '#ede9fe' : 'none',
                transition: 'all 0.13s',
              }}
              onMouseEnter={e => { if (activeTab !== id) e.currentTarget.style.background = '#e9e9eb' }}
              onMouseLeave={e => { if (activeTab !== id) e.currentTarget.style.background = 'none' }}
            >
              <Icon size={18} color={activeTab === id ? ACCENT : '#667085'} />
              <span style={{ fontSize: 9, fontWeight: 500, color: activeTab === id ? ACCENT : '#9ca3af', lineHeight: 1 }}>{label}</span>
            </button>
          ))}
        </div>

        {/* Left panel — content */}
        <div style={{
          width: 240, background: '#fff', borderRight: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0,
        }}>
          <div style={{ padding: '14px 12px 10px' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#120b20', marginBottom: 10 }}>
              {leftTabs.find(t => t.id === activeTab)?.label}
            </div>
            <div style={{ position: 'relative' }}>
              <Search size={13} color="#9ca3af" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                value={searchEl}
                onChange={e => setSearchEl(e.target.value)}
                placeholder="Search elements"
                style={{
                  width: '100%', height: 34, paddingLeft: 28, paddingRight: 10,
                  borderRadius: 8, border: '1.5px solid #e5e7eb', background: '#f9fafb',
                  fontSize: 12, color: '#120b20', outline: 'none', fontFamily: 'inherit',
                }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
          </div>

          {/* Element categories */}
          <div style={{ padding: '0 12px 10px' }}>
            {elementCategories.map(cat => (
              <button key={cat} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                width: '100%', padding: '6px 8px', borderRadius: 7, border: 'none',
                background: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 500, color: '#120b20',
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#f4f4f5'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {cat} <ChevronDown size={13} color="#9ca3af" />
              </button>
            ))}
          </div>

          <div style={{ height: 1, background: '#f0f0f0', margin: '0 12px 12px' }} />

          {/* Shape grid */}
          <div style={{ padding: '0 12px 16px' }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Basic shapes
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              {shapes.map(shape => (
                <button
                  key={shape.id}
                  style={{
                    width: '100%', aspectRatio: '1', borderRadius: 8, border: '1.5px solid transparent',
                    background: '#f9fafb', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.13s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = '#f3f0ff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.background = '#f9fafb' }}
                >
                  {shape.type === 'circle' && <Circle size={18} fill={shape.bg} color="transparent" />}
                  {shape.type === 'square' && <Square size={16} fill={shape.bg} color="transparent" />}
                  {shape.type === 'triangle' && <Triangle size={16} fill={shape.bg} color="transparent" />}
                  {shape.type === 'star' && <Star size={16} fill={shape.bg} color="transparent" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Canvas area */}
        <div style={{
          flex: 1, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'auto', position: 'relative',
        }}>
          {/* Canvas */}
          <div style={{
            width: 720, height: 405,
            background: '#fff',
            borderRadius: 4,
            boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
            position: 'relative', overflow: 'hidden',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
            flexShrink: 0,
          }}>
            {/* Background gradient */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 60%, #ec4899 100%)' }} />

            {/* Decorative circles */}
            <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
            <div style={{ position: 'absolute', bottom: -60, left: -30, width: 250, height: 250, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
            <div style={{ position: 'absolute', top: 60, right: 80, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />

            {/* Small colored shapes */}
            <div style={{ position: 'absolute', bottom: 60, right: 60, width: 50, height: 50, borderRadius: 8, background: 'rgba(255,255,255,0.25)', transform: 'rotate(15deg)' }} />
            <div style={{ position: 'absolute', top: 30, left: 50, width: 30, height: 30, borderRadius: '50%', background: '#fbbf24', opacity: 0.8 }} />

            {/* Main text block — selected (purple dashed border) */}
            <div
              onClick={() => setSelectedEl('gradient-text')}
              style={{
                position: 'absolute', left: 60, top: '50%', transform: 'translateY(-50%)',
                outline: selectedEl === 'gradient-text' ? `2.5px dashed ${ACCENT}` : 'none',
                padding: 10, borderRadius: 6, cursor: 'move',
              }}
            >
              {/* Selection handles */}
              {selectedEl === 'gradient-text' && (
                <>
                  {[[-4,-4],['calc(100% - 4px)',-4],[-4,'calc(100% - 4px)'],['calc(100% - 4px)','calc(100% - 4px)']].map(([l,t],i) => (
                    <div key={i} style={{ position: 'absolute', left: l, top: t, width: 8, height: 8, borderRadius: 2, background: ACCENT, border: '1.5px solid #fff' }} />
                  ))}
                </>
              )}
              <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.85)', marginBottom: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Spring 2026
              </div>
              <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 12, textShadow: '0 2px 12px rgba(0,0,0,0.2)' }}>
                New<br />Collection
              </div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 20, maxWidth: 240, lineHeight: 1.5 }}>
                Explore our hand-crafted pieces for the season.
              </div>
              <div style={{
                display: 'inline-block', background: '#fff', color: '#ef4444',
                fontSize: 13, fontWeight: 700, padding: '8px 20px', borderRadius: 24,
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}>
                Shop Now →
              </div>
            </div>

            {/* Right side product placeholder */}
            <div style={{
              position: 'absolute', right: 40, top: '50%', transform: 'translateY(-50%)',
              width: 180, height: 240, borderRadius: 16,
              background: 'rgba(255,255,255,0.25)',
              backdropFilter: 'blur(4px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.4)',
            }}>
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>
                <Image size={32} color="rgba(255,255,255,0.6)" style={{ marginBottom: 8 }} />
                <div>Product Image</div>
              </div>
            </div>
          </div>

          {/* Zoom badge */}
          <div style={{
            position: 'absolute', bottom: 16, right: 16,
            background: 'rgba(18,11,32,0.7)', color: '#fff',
            fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
          }}>
            {zoom}%
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          width: 240, background: '#fff', borderLeft: '1px solid #e5e7eb',
          display: 'flex', flexDirection: 'column', overflowY: 'auto', flexShrink: 0,
        }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb' }}>
            {['Design', 'Position', 'Text'].map(tab => (
              <button key={tab} style={{
                flex: 1, padding: '10px 0', border: 'none', background: 'none',
                cursor: 'pointer', fontSize: 12, fontWeight: 600,
                color: tab === 'Design' ? ACCENT : '#667085',
                borderBottom: tab === 'Design' ? `2px solid ${ACCENT}` : '2px solid transparent',
              }}>
                {tab}
              </button>
            ))}
          </div>

          <div style={{ padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Fill color */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Fill</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: fillColor, border: '1px solid #e5e7eb', cursor: 'pointer', flexShrink: 0 }} />
                <input value={fillColor} onChange={e => setFillColor(e.target.value)} style={{ flex: 1, height: 32, padding: '0 8px', borderRadius: 8, border: '1.5px solid #e5e7eb', fontSize: 12, fontFamily: 'inherit', outline: 'none', color: '#120b20' }}
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                {['#7c3aed','#ec4899','#f59e0b','#10b981','#3b82f6'].map(c => (
                  <button key={c} onClick={() => setFillColor(c)} style={{
                    width: 22, height: 22, borderRadius: 6, background: c, border: fillColor === c ? `2.5px solid ${ACCENT}` : '1.5px solid transparent',
                    cursor: 'pointer', padding: 0, outline: 'none',
                    boxShadow: fillColor === c ? `0 0 0 1px ${ACCENT}` : 'none',
                  }} />
                ))}
              </div>
            </div>

            {/* Opacity */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Opacity</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#120b20' }}>{opacity}%</span>
              </div>
              <input
                type="range" min={0} max={100} value={opacity}
                onChange={e => setOpacity(Number(e.target.value))}
                style={{ width: '100%', accentColor: ACCENT, cursor: 'pointer' }}
              />
            </div>

            {/* Border */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Border</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1, height: 32, borderRadius: 8, border: '1.5px solid #e5e7eb', display: 'flex', alignItems: 'center', padding: '0 10px', fontSize: 12, color: '#667085' }}>
                  None
                </div>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f4f4f5', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <Minus size={14} color="#667085" />
                </div>
              </div>
            </div>

            {/* Shadow */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Shadow</span>
                <button
                  onClick={() => setShadowOn(!shadowOn)}
                  style={{
                    width: 36, height: 20, borderRadius: 10, border: 'none', cursor: 'pointer',
                    background: shadowOn ? ACCENT : '#e5e7eb', position: 'relative', transition: 'background 0.2s',
                  }}
                >
                  <div style={{
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    position: 'absolute', top: 2,
                    left: shadowOn ? 18 : 2, transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                  }} />
                </button>
              </div>
            </div>

            {/* Layer order */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Layer</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['Forward', 'Backward'].map(lbl => (
                  <button key={lbl} style={{
                    flex: 1, height: 30, borderRadius: 8, border: '1.5px solid #e5e7eb',
                    background: '#f9fafb', fontSize: 11, fontWeight: 600, color: '#667085', cursor: 'pointer',
                  }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
                    onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}
                  >{lbl}</button>
                ))}
              </div>
            </div>

            {/* Alignment */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 8 }}>Alignment</div>
              <div style={{ display: 'flex', gap: 4 }}>
                {[AlignLeft, Sliders, CornerUpLeft].map((Icon, i) => (
                  <button key={i} style={{
                    flex: 1, height: 30, borderRadius: 8, border: '1.5px solid #e5e7eb',
                    background: '#f9fafb', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#ede9fe'; e.currentTarget.style.borderColor = ACCENT }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#f9fafb'; e.currentTarget.style.borderColor = '#e5e7eb' }}
                  >
                    <Icon size={13} color="#667085" />
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
