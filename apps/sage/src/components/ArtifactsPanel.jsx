import { useState, useEffect } from 'react'
import {
  Eye, Code, X, Copy, Check, ChevronLeft, ChevronRight,
  Share2, RefreshCw,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// ─── Sub-components ────────────────────────────────────────────────────────────

function TabBtn({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        padding: '5px 10px',
        borderRadius: 6,
        border: 'none',
        cursor: 'pointer',
        background: active ? '#FFFFFF' : 'transparent',
        color: active ? '#1A1A1A' : '#6B7280',
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        boxShadow: active ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
        transition: 'all 0.1s',
        whiteSpace: 'nowrap',
      }}
    >
      <Icon size={13} />
      {label}
    </button>
  )
}

function NavBtn({ icon: Icon, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 24,
        height: 24,
        borderRadius: 4,
        border: 'none',
        background: 'none',
        cursor: disabled ? 'default' : 'pointer',
        color: disabled ? '#D1D5DB' : '#6B7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
      }}
    >
      <Icon size={13} />
    </button>
  )
}

function HeaderIconBtn({ icon: Icon, title, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      title={title}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 28,
        height: 28,
        borderRadius: 6,
        border: 'none',
        background: hovered ? '#EBEBEB' : 'none',
        cursor: 'pointer',
        color: hovered ? '#1A1A1A' : '#6B7280',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.1s',
        padding: 0,
      }}
    >
      <Icon size={14} />
    </button>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ArtifactsPanel({ artifact, onClose }) {
  const allVersions = [...(artifact.versions ?? []), { label: 'current', content: artifact.content }]
  const totalVersions = allVersions.length

  const showPreview = artifact.type === 'html' || artifact.type === 'react'

  const [versionIdx, setVersionIdx] = useState(totalVersions - 1)
  const [tab, setTab] = useState(showPreview ? 'preview' : 'code')
  const [copied, setCopied] = useState(false)

  // Reset to latest version + correct tab when artifact changes
  useEffect(() => {
    const vers = [...(artifact.versions ?? []), { label: 'current', content: artifact.content }]
    setVersionIdx(vers.length - 1)
    setTab(artifact.type === 'html' || artifact.type === 'react' ? 'preview' : 'code')
  }, [artifact.title, artifact.type])

  const currentContent = allVersions[versionIdx]?.content ?? ''

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#FFFFFF' }}>

      {/* ── Header bar ── */}
      <div style={{
        background: '#F5F5F5',
        borderBottom: '1px solid #E1E4E8',
        padding: '0 12px',
        height: 52,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexShrink: 0,
      }}>

        {/* Left: Preview / Code segmented tab switcher */}
        <div style={{
          display: 'flex',
          background: '#EBEBEB',
          borderRadius: 8,
          padding: 2,
          gap: 1,
        }}>
          {showPreview && (
            <TabBtn
              icon={Eye}
              label="Preview"
              active={tab === 'preview'}
              onClick={() => setTab('preview')}
            />
          )}
          <TabBtn
            icon={Code}
            label="Code"
            active={tab === 'code'}
            onClick={() => setTab('code')}
          />
        </div>

        {/* Version nav (only if multiple versions) */}
        {totalVersions > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4 }}>
            <NavBtn
              icon={ChevronLeft}
              onClick={() => setVersionIdx(i => Math.max(0, i - 1))}
              disabled={versionIdx === 0}
            />
            <span style={{
              fontSize: 12,
              color: '#71717A',
              padding: '0 4px',
              whiteSpace: 'nowrap',
            }}>
              {versionIdx + 1} / {totalVersions}
            </span>
            <NavBtn
              icon={ChevronRight}
              onClick={() => setVersionIdx(i => Math.min(totalVersions - 1, i + 1))}
              disabled={versionIdx === totalVersions - 1}
            />
          </div>
        )}

        {/* Right: Refresh | Copy | Share | × */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
          <HeaderIconBtn icon={RefreshCw} title="Refresh" />

          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 10px',
              borderRadius: 7,
              border: '1px solid #E0E0E0',
              background: '#FFFFFF',
              fontSize: 13,
              fontWeight: 500,
              color: '#1A1A1A',
              cursor: 'pointer',
            }}
          >
            {copied ? <Check size={13} color="#22C55E" /> : <Copy size={13} />}
            Copy
          </button>

          {/* Share — black bg */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '5px 10px',
              borderRadius: 7,
              border: 'none',
              background: '#18181B',
              fontSize: 13,
              fontWeight: 500,
              color: '#FFFFFF',
              cursor: 'pointer',
            }}
          >
            <Share2 size={13} />
            Share
          </button>

          {/* Close */}
          <HeaderIconBtn icon={X} title="Close" onClick={onClose} />
        </div>
      </div>

      {/* ── Content area ── */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Preview tab — dark gradient bg with iframe */}
        {tab === 'preview' && showPreview && (
          <div style={{
            flex: 1,
            background: 'linear-gradient(135deg, #141824 0%, #1F2937 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}>
            <iframe
              srcDoc={currentContent}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 12,
                background: '#FFFFFF',
              }}
              sandbox="allow-scripts allow-same-origin"
              title={artifact.title}
            />
          </div>
        )}

        {/* Code tab — white bg, light syntax */}
        {tab === 'code' && (
          <div style={{ flex: 1, overflow: 'auto', background: '#FFFFFF' }}>
            {versionIdx < totalVersions - 1 && (
              <div style={{
                padding: '8px 20px',
                fontSize: 12,
                color: '#9CA3AF',
                background: '#F9FAFB',
                borderBottom: '1px solid #F3F4F6',
                fontStyle: 'italic',
              }}>
                Viewing {allVersions[versionIdx].label ?? `v${versionIdx + 1}`} (not latest)
              </div>
            )}

            {artifact.type === 'document' ? (
              /* Document — readable prose with ReactMarkdown */
              <div style={{
                padding: '24px 28px',
                fontFamily: "'Lora', Georgia, serif",
                fontSize: 15,
                lineHeight: 1.8,
                color: '#1A1A1A',
              }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {currentContent}
                </ReactMarkdown>
              </div>
            ) : (
              /* Code — light theme monospace */
              <pre style={{
                margin: 0,
                padding: '20px 24px',
                fontFamily: "'SF Mono', 'Fira Code', Menlo, monospace",
                fontSize: 13,
                lineHeight: 1.65,
                color: '#383A42',
                background: '#FFFFFF',
                overflow: 'auto',
                minHeight: '100%',
                tabSize: 2,
                whiteSpace: 'pre',
              }}>
                <code style={{ fontFamily: 'inherit', background: 'none' }}>
                  {currentContent}
                </code>
              </pre>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
