import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

/* ── Reusable toggle row ───────────────────────────────────── */
function ToggleRow({ label, description, storageKey, defaultVal = false }) {
  const [on, setOn] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    return saved !== null ? saved === 'true' : defaultVal
  })
  const toggle = () => {
    const next = !on
    setOn(next)
    localStorage.setItem(storageKey, String(next))
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: '16px 20px', borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ flex: 1, minWidth: 0, paddingRight: 16 }}>
        <div style={{ fontWeight: 500, fontSize: 15, color: 'var(--text-primary)' }}>{label}</div>
        {description && (
          <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2, lineHeight: 1.4 }}>
            {description}
          </div>
        )}
      </div>
      <button
        onClick={toggle}
        aria-label={`Toggle ${label}`}
        style={{
          width: 44, height: 24, borderRadius: 12,
          background: on ? 'var(--accent)' : 'var(--border)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background 0.2s', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 2, left: on ? 22 : 2,
          width: 20, height: 20, borderRadius: '50%',
          background: '#fff', transition: 'left 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
        }} />
      </button>
    </div>
  )
}

function SectionHeader({ children }) {
  return (
    <div style={{
      padding: '10px 20px',
      color: 'var(--text-secondary)', fontSize: 13,
      textTransform: 'uppercase', letterSpacing: '0.05em',
      borderBottom: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      marginTop: 8, background: 'var(--bg-secondary)',
    }}>
      {children}
    </div>
  )
}

function LinkRow({ label, value = '' }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', borderBottom: '1px solid var(--border)',
        cursor: 'pointer', background: hovered ? 'var(--bg-hover)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ fontWeight: 500, fontSize: 15, color: 'var(--text-primary)' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {value && <span style={{ color: 'var(--text-muted)', fontSize: 14 }}>{value}</span>}
        <ChevronRight size={18} color="var(--text-muted)" />
      </div>
    </div>
  )
}

export default function SettingsPrivacy() {
  return (
    <div>
      {/* Page header */}
      <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
          Privacy and safety
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Manage what information you see and share on Echo.
        </p>
      </div>

      {/* Audience and tagging */}
      <SectionHeader>Audience and tagging</SectionHeader>
      <ToggleRow
        label="Protect your posts"
        description="Only your followers can see your posts."
        storageKey="echo-protect-posts"
        defaultVal={false}
      />
      <ToggleRow
        label="Protect your videos"
        description="If enabled, videos in your posts will not be downloadable by default."
        storageKey="echo-protect-videos"
        defaultVal={false}
      />
      <ToggleRow
        label="Photo tagging"
        description="Allow anyone to tag you in photos."
        storageKey="echo-photo-tagging"
        defaultVal={true}
      />

      {/* Your Echo activity */}
      <SectionHeader>Your Echo activity</SectionHeader>
      <ToggleRow
        label="Direct Messages"
        description="Allow message requests from everyone."
        storageKey="echo-dm-everyone"
        defaultVal={true}
      />
      <ToggleRow
        label="Discoverability and contacts"
        description="Let others find you by your phone number and email address."
        storageKey="echo-discoverability"
        defaultVal={true}
      />

      {/* Mute and block */}
      <SectionHeader>Mute and block</SectionHeader>
      <LinkRow label="Muted accounts" value="0" />
      <LinkRow label="Blocked accounts" value="0" />
      <ToggleRow
        label="Muted words"
        description="Add or remove keywords you want to mute from your timeline."
        storageKey="echo-muted-words"
        defaultVal={false}
      />

      {/* Location */}
      <SectionHeader>Location information</SectionHeader>
      <ToggleRow
        label="Add location information to your posts"
        description="Share your location with your posts to let people know where you're posting from."
        storageKey="echo-location"
        defaultVal={false}
      />
    </div>
  )
}
