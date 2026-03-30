import { useState, useEffect } from 'react'

const SIZES = ['13px', '15px', '17px', '19px']
const SIZE_LABELS = ['Sm', 'Md', 'Lg', 'XL']

const COLORS = [
  { name: 'Indigo',  accent: '#6366f1', hover: '#5254cc' },
  { name: 'Violet',  accent: '#7c3aed', hover: '#6d28d9' },
  { name: 'Blue',    accent: '#1d9bf0', hover: '#1a8cd8' },
  { name: 'Green',   accent: '#00ba7c', hover: '#00a368' },
  { name: 'Orange',  accent: '#ff7700', hover: '#e06600' },
  { name: 'Pink',    accent: '#f91880', hover: '#d61672' },
]

const THEMES = [
  { value: '',      label: 'Default', bg: '#000000',  text: '#e7e9ea' },
  { value: 'dim',   label: 'Dim',     bg: '#15202b',  text: '#f7f9f9' },
  { value: 'light', label: 'Light',   bg: '#ffffff',  text: '#0f1419' },
]

export default function SettingsDisplay() {
  /* ── Font size state ──────────────────────────────────────── */
  const [sizeIdx, setSizeIdx] = useState(() => {
    const saved = localStorage.getItem('echo-font-size')
    if (saved) {
      const idx = SIZES.indexOf(saved)
      return idx >= 0 ? idx : 1
    }
    return 1
  })

  /* ── Accent color state ───────────────────────────────────── */
  const [accentIdx, setAccentIdx] = useState(() => {
    const saved = localStorage.getItem('echo-accent')
    if (saved) {
      const idx = COLORS.findIndex(c => c.accent === saved)
      return idx >= 0 ? idx : 0
    }
    return 0
  })

  /* ── Theme state ──────────────────────────────────────────── */
  const [themeVal, setThemeVal] = useState(() => {
    return localStorage.getItem('echo-theme') || ''
  })

  /* ── Apply saved settings on mount ───────────────────────── */
  useEffect(() => {
    const theme = localStorage.getItem('echo-theme') || ''
    document.documentElement.setAttribute('data-theme', theme)

    const fontSz = localStorage.getItem('echo-font-size') || '15px'
    document.documentElement.style.setProperty('--font-size', fontSz)

    const accent = localStorage.getItem('echo-accent')
    if (accent) {
      const c = COLORS.find(c => c.accent === accent)
      if (c) {
        document.documentElement.style.setProperty('--accent', c.accent)
        document.documentElement.style.setProperty('--accent-hover', c.hover)
      }
    }
  }, [])

  /* ── Handlers ─────────────────────────────────────────────── */
  const changeSize = (idx) => {
    setSizeIdx(idx)
    document.documentElement.style.setProperty('--font-size', SIZES[idx])
    localStorage.setItem('echo-font-size', SIZES[idx])
  }

  const changeColor = (idx) => {
    setAccentIdx(idx)
    const c = COLORS[idx]
    document.documentElement.style.setProperty('--accent', c.accent)
    document.documentElement.style.setProperty('--accent-hover', c.hover)
    localStorage.setItem('echo-accent', c.accent)
  }

  const changeTheme = (val) => {
    setThemeVal(val)
    document.documentElement.setAttribute('data-theme', val)
    localStorage.setItem('echo-theme', val)
  }

  return (
    <div>
      {/* Page header */}
      <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
          Display
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Manage your font size, color, and background. These settings affect all Echo sessions on this browser.
        </p>
      </div>

      {/* ── Font size ─────────────────────────────────────────── */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>
          Font size
        </div>

        {/* Size scale row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 500 }}>Aa</span>
          <div style={{ flex: 1, display: 'flex', gap: 0 }}>
            {SIZES.map((_, i) => (
              <div
                key={i}
                onClick={() => changeSize(i)}
                style={{ flex: 1, height: 4, cursor: 'pointer', position: 'relative' }}
              >
                <div style={{
                  height: 4,
                  background: i <= sizeIdx ? 'var(--accent)' : 'var(--border)',
                  transition: 'background 0.2s',
                  borderRadius: i === 0 ? '99px 0 0 99px' : i === SIZES.length - 1 ? '0 99px 99px 0' : 0,
                }} />
                {/* Dot marker */}
                <div style={{
                  position: 'absolute', top: '50%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: i === sizeIdx ? 16 : 10,
                  height: i === sizeIdx ? 16 : 10,
                  borderRadius: '50%',
                  background: i <= sizeIdx ? 'var(--accent)' : 'var(--border)',
                  border: i === sizeIdx ? '2px solid var(--bg)' : 'none',
                  transition: 'all 0.2s',
                  zIndex: 1,
                }} />
              </div>
            ))}
          </div>
          <span style={{ fontSize: 19, color: 'var(--text-muted)', fontWeight: 500 }}>Aa</span>
        </div>

        {/* Labels */}
        <div style={{ display: 'flex', paddingLeft: 28, paddingRight: 28 }}>
          {SIZE_LABELS.map((label, i) => (
            <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: 12, color: i === sizeIdx ? 'var(--accent)' : 'var(--text-muted)', fontWeight: i === sizeIdx ? 700 : 400 }}>
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* ── Accent color ──────────────────────────────────────── */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>
          Color
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {COLORS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => changeColor(i)}
              title={c.name}
              aria-label={`${c.name} accent color`}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: c.accent,
                border: i === accentIdx ? `3px solid var(--bg)` : '3px solid transparent',
                outline: i === accentIdx ? `3px solid ${c.accent}` : 'none',
                cursor: 'pointer',
                transition: 'transform 0.15s, outline 0.15s',
                transform: i === accentIdx ? 'scale(1.15)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--text-muted)' }}>
          {COLORS[accentIdx].name}
        </div>
      </div>

      {/* ── Background theme ──────────────────────────────────── */}
      <div style={{ padding: '20px 20px 24px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 16 }}>
          Background
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          {THEMES.map(t => {
            const isActive = themeVal === t.value
            return (
              <button
                key={t.value}
                onClick={() => changeTheme(t.value)}
                style={{
                  flex: 1, padding: '14px 8px', borderRadius: 8,
                  background: t.bg, color: t.text,
                  border: isActive ? `2px solid var(--accent)` : '2px solid var(--border)',
                  cursor: 'pointer', fontWeight: isActive ? 700 : 400,
                  fontSize: 15, transition: 'border-color 0.15s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >
                {isActive && (
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%',
                    background: 'var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2 2 4-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
                {t.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Preview ───────────────────────────────────────────── */}
      <div style={{ padding: '20px' }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 12 }}>
          Preview
        </div>
        <div style={{
          border: '1px solid var(--border)', borderRadius: 12,
          padding: '16px', background: 'var(--bg-secondary)',
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size)', color: 'var(--text-primary)' }}>Jordan Blake</span>
                <span style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size)' }}>@jordanblake · 2m</span>
              </div>
              <p style={{ margin: 0, fontSize: 'var(--font-size)', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                This is a preview of how your posts will look with the current display settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
