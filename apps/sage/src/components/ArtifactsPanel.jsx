import { useState, useEffect } from 'react'
import { Code2, FileText, Globe, X, Copy, Check, Download, ChevronLeft, ChevronRight, Eye, Code } from 'lucide-react'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function DarkIconBtn({ icon: Icon, onClick, disabled, size = 14 }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 28,
        height: 28,
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        background: 'none',
        cursor: disabled ? 'default' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)',
        transition: 'all 0.1s',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
        if (!disabled) e.currentTarget.style.color = 'rgba(255,255,255,0.9)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'none'
        e.currentTarget.style.color = disabled ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.5)'
      }}
    >
      <Icon size={size} />
    </button>
  )
}

function TabBtn({ label, icon: Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        borderRadius: 'var(--radius-sm)',
        border: 'none',
        cursor: 'pointer',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        background: active ? 'rgba(255,255,255,0.1)' : 'none',
        color: active ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
        transition: 'all 0.15s',
      }}
    >
      <Icon size={12} />
      {label}
    </button>
  )
}

function DarkMarkdown({ content }) {
  return (
    <div style={{ color: 'rgba(228,228,228,0.9)', lineHeight: 1.7, fontSize: 14 }}>
      {content.split('\n').map((line, i) => {
        if (line.startsWith('# '))
          return <h1 key={i} style={{ fontSize: '1.4em', fontWeight: 700, margin: '1em 0 0.5em', color: 'rgba(255,255,255,0.95)' }}>{line.slice(2)}</h1>
        if (line.startsWith('## '))
          return <h2 key={i} style={{ fontSize: '1.2em', fontWeight: 600, margin: '1em 0 0.4em', color: 'rgba(255,255,255,0.9)' }}>{line.slice(3)}</h2>
        if (line.startsWith('### '))
          return <h3 key={i} style={{ fontSize: '1.05em', fontWeight: 600, margin: '0.8em 0 0.3em', color: 'rgba(255,255,255,0.85)' }}>{line.slice(4)}</h3>
        if (line.startsWith('- ') || line.startsWith('* '))
          return <div key={i} style={{ paddingLeft: 16, marginBottom: 4 }}>• {line.slice(2)}</div>
        if (line.startsWith('```'))
          return <div key={i} />
        if (line === '')
          return <div key={i} style={{ height: 8 }} />
        return <p key={i} style={{ margin: '0 0 8px', lineHeight: 1.7 }}>{line}</p>
      })}
    </div>
  )
}

// ─── Icon per type ─────────────────────────────────────────────────────────────

function typeIcon(type) {
  if (type === 'html') return Globe
  if (type === 'document') return FileText
  return Code2 // code | react
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ArtifactsPanel({ artifact, onClose }) {
  // Version history: older versions array + current content as the last entry
  const allVersions = [...(artifact.versions ?? []), { label: 'current', content: artifact.content }]
  const totalVersions = allVersions.length
  const [versionIdx, setVersionIdx] = useState(totalVersions - 1)
  const currentContent = allVersions[versionIdx].content
  const currentLabel = allVersions[versionIdx].label ?? 'current'

  const prevVersion = () => setVersionIdx(i => Math.max(0, i - 1))
  const nextVersion = () => setVersionIdx(i => Math.min(totalVersions - 1, i + 1))

  // Reset to latest version when artifact changes
  useEffect(() => {
    const vers = [...(artifact.versions ?? []), { label: 'current', content: artifact.content }]
    setVersionIdx(vers.length - 1)
  }, [artifact.title])

  // Preview / code tab
  const showPreview = artifact.type === 'html' || artifact.type === 'react'
  const [tab, setTab] = useState(showPreview ? 'preview' : 'code')

  // Reset tab when artifact type/title changes
  useEffect(() => {
    setTab(showPreview ? 'preview' : 'code')
  }, [artifact.title, showPreview])

  // Copy
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable
    }
  }

  // Download
  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = artifact.title
    a.click()
    URL.revokeObjectURL(url)
  }

  const Icon = typeIcon(artifact.type)

  return (
    <div style={{
      width: 440,
      flexShrink: 0,
      height: '100vh',
      background: 'var(--bg-artifact)',
      borderLeft: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* ── Header ── */}
      <div style={{
        background: 'var(--bg-artifact-header)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}>
        {/* Row 1: icon + title + language badge + actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px 8px' }}>
          <Icon size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span style={{
            flex: 1,
            fontSize: 13,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {artifact.title}
          </span>
          {artifact.language && (
            <span style={{
              fontSize: 11,
              padding: '2px 7px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
              flexShrink: 0,
            }}>
              {artifact.language}
            </span>
          )}
          <DarkIconBtn icon={copied ? Check : Copy} onClick={handleCopy} />
          <DarkIconBtn icon={Download} onClick={handleDownload} />
          <DarkIconBtn icon={X} onClick={onClose} />
        </div>

        {/* Row 2: tab bar + version navigator */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 14px 10px', gap: 4 }}>
          {showPreview && (
            <TabBtn label="Preview" icon={Eye} active={tab === 'preview'} onClick={() => setTab('preview')} />
          )}
          <TabBtn label="Code" icon={Code} active={tab === 'code' || !showPreview} onClick={() => setTab('code')} />

          {totalVersions > 1 && (
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
              <DarkIconBtn icon={ChevronLeft} onClick={prevVersion} disabled={versionIdx === 0} size={13} />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>
                {versionIdx + 1} / {totalVersions}
              </span>
              <DarkIconBtn icon={ChevronRight} onClick={nextVersion} disabled={versionIdx === totalVersions - 1} size={13} />
            </div>
          )}
        </div>
      </div>

      {/* ── Preview tab ── */}
      {tab === 'preview' && showPreview && (
        <div style={{ flex: 1, background: '#fff', position: 'relative' }}>
          <iframe
            srcDoc={currentContent}
            style={{ width: '100%', height: '100%', border: 'none' }}
            sandbox="allow-scripts allow-same-origin"
            title={artifact.title}
          />
        </div>
      )}

      {/* ── Code tab ── */}
      {(tab === 'code' || !showPreview) && (
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {versionIdx < totalVersions - 1 && (
            <div style={{ marginBottom: 8, fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}>
              Viewing: {currentLabel} (not latest)
            </div>
          )}
          {artifact.type === 'document' ? (
            <DarkMarkdown content={currentContent} />
          ) : (
            <pre style={{
              margin: 0,
              fontFamily: "'SF Mono','Fira Code',Menlo,monospace",
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--text-code)',
              whiteSpace: 'pre',
              overflowX: 'auto',
              tabSize: 2,
            }}>
              {currentContent}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}
