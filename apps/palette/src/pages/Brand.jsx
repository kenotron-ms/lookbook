import { useState } from 'react'
import { Plus, Upload, Pencil, Trash2, ChevronRight, Check } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'
import { brandColors, brandFonts } from '../data/designs.js'

const ACCENT = '#7c3aed'

const brandLogos = [
  { id: 1, gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', label: 'Primary Logo' },
  { id: 2, gradient: 'linear-gradient(135deg, #1e293b 0%, #475569 100%)', label: 'Dark Version' },
  { id: 3, gradient: 'linear-gradient(135deg, #f4f4f5 0%, #e5e7eb 100%)', label: 'Light Version', textColor: '#667085' },
]

const toneDescriptors = ['Professional', 'Approachable', 'Creative', 'Bold', 'Innovative', 'Authentic']

export default function Brand() {
  const [colors, setColors] = useState(brandColors)
  const [activeTones, setActiveTones] = useState(['Professional', 'Creative', 'Bold'])

  const toggleTone = (tone) => {
    setActiveTones(prev =>
      prev.includes(tone) ? prev.filter(t => t !== tone) : [...prev, tone]
    )
  }

  return (
    <div style={{ display: 'flex', flex: 1, height: '100%', overflow: 'hidden' }}>
      <Sidebar active="Brand hub" />

      <main style={{ flex: 1, overflowY: 'auto', background: '#ffffff' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '40px 40px 60px' }}>

          {/* Page header */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: ACCENT }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.07em' }}>Brand Kit</span>
            </div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: '#120b20', marginBottom: 6, letterSpacing: '-0.5px' }}>
              Your Brand Hub
            </h1>
            <p style={{ fontSize: 15, color: '#667085' }}>
              Keep your brand consistent across every design. Manage colors, fonts, logos, and voice.
            </p>
          </div>

          {/* Brand palette */}
          <Section title="Brand Palette" subtitle="Your primary brand colors">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              {colors.map(color => (
                <div key={color.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: 14, background: color.hex,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    cursor: 'pointer', transition: 'transform 0.15s',
                    border: '3px solid #fff',
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 6,
                  }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <Pencil size={10} color="rgba(255,255,255,0.8)" />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#120b20' }}>{color.name}</div>
                    <div style={{ fontSize: 10, color: '#9ca3af', fontFamily: 'monospace' }}>{color.hex}</div>
                  </div>
                </div>
              ))}

              {/* Add color button */}
              <button style={{
                width: 72, height: 72, borderRadius: 14,
                border: '2px dashed #d1d5db', background: '#f9fafb',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
                cursor: 'pointer', color: '#9ca3af', fontSize: 11, fontWeight: 600,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = '#f3f0ff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#9ca3af'; e.currentTarget.style.background = '#f9fafb' }}
              >
                <Plus size={18} />
                <span>Add</span>
              </button>
            </div>
          </Section>

          {/* Brand fonts */}
          <Section title="Brand Fonts" subtitle="Typography that represents your brand">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {brandFonts.map(font => (
                <div key={font.id} style={{
                  padding: '18px 20px', borderRadius: 14, border: '1.5px solid #f0f0f0',
                  background: '#fafafa', display: 'flex', alignItems: 'center', gap: 20,
                  transition: 'border-color 0.15s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#f0f0f0'}
                >
                  <div style={{ width: 90, flexShrink: 0 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>
                      {font.role}
                    </div>
                    <div style={{ fontSize: 12, color: '#667085' }}>{font.name} · {font.weight}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: font.role === 'Heading' ? 22 : font.role === 'Accent' ? 16 : 14,
                      fontWeight: font.weight,
                      color: '#120b20',
                      lineHeight: 1.3,
                    }}>
                      {font.preview}
                    </span>
                  </div>
                  <button style={{
                    width: 32, height: 32, borderRadius: 8, border: '1.5px solid #e5e7eb',
                    background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Pencil size={13} color="#667085" />
                  </button>
                </div>
              ))}

              <button style={{
                padding: '12px 20px', borderRadius: 12, border: '2px dashed #d1d5db',
                background: '#f9fafb', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: '#667085',
                display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center',
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = '#f3f0ff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#667085'; e.currentTarget.style.background = '#f9fafb' }}
              >
                <Plus size={16} /> Add a font
              </button>
            </div>
          </Section>

          {/* Brand logos */}
          <Section title="Brand Logos" subtitle="Your official logo variations">
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {brandLogos.map(logo => (
                <div key={logo.id} style={{
                  borderRadius: 14, overflow: 'hidden', border: '1.5px solid #f0f0f0',
                  background: '#fafafa', width: 160, transition: 'all 0.15s',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#f0f0f0'; e.currentTarget.style.transform = 'none' }}
                >
                  <div style={{ height: 120, background: logo.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 22, fontWeight: 800, color: logo.textColor || '#fff', letterSpacing: '-0.5px' }}>P</span>
                  </div>
                  <div style={{ padding: '10px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#120b20' }}>{logo.label}</span>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                      <Trash2 size={13} color="#9ca3af" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Upload button */}
              <button style={{
                width: 160, height: 170, borderRadius: 14, border: '2px dashed #d1d5db',
                background: '#f9fafb', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.background = '#f3f0ff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.background = '#f9fafb' }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Upload size={18} color={ACCENT} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: '#667085' }}>Upload logo</span>
                <span style={{ fontSize: 11, color: '#9ca3af' }}>PNG, SVG, PDF</span>
              </button>
            </div>
          </Section>

          {/* Brand voice */}
          <Section title="Brand Voice" subtitle="Tone descriptors that guide your messaging">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {toneDescriptors.map(tone => {
                const isActive = activeTones.includes(tone)
                return (
                  <button
                    key={tone}
                    onClick={() => toggleTone(tone)}
                    style={{
                      padding: '8px 18px', borderRadius: 24, border: 'none', cursor: 'pointer',
                      background: isActive ? ACCENT : '#f4f4f5',
                      color: isActive ? '#fff' : '#667085',
                      fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    {isActive && <Check size={13} />}
                    {tone}
                  </button>
                )
              })}
              <button style={{
                padding: '8px 18px', borderRadius: 24, border: '2px dashed #d1d5db',
                background: 'none', cursor: 'pointer',
                fontSize: 13, fontWeight: 600, color: '#9ca3af',
                display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.15s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#d1d5db'; e.currentTarget.style.color = '#9ca3af' }}
              >
                <Plus size={13} /> Add tone
              </button>
            </div>

            <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: '#f9fafb', border: '1.5px solid #f0f0f0' }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Voice preview</div>
              <p style={{ fontSize: 14, color: '#120b20', lineHeight: 1.6 }}>
                "At Palette, we believe great design is for everyone. We bring{' '}
                <strong style={{ color: ACCENT }}>bold creativity</strong> and{' '}
                <strong style={{ color: ACCENT }}>professional polish</strong> to every canvas —
                empowering you to tell your story with confidence."
              </p>
            </div>
          </Section>

        </div>
      </main>
    </div>
  )
}

function Section({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 44 }}>
      <div style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#120b20', marginBottom: 4 }}>{title}</h2>
        <p style={{ fontSize: 13, color: '#667085' }}>{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
