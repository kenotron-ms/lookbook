import { User, Key, Globe, Shield, ChevronRight } from 'lucide-react'

function SectionHeader({ children }) {
  return (
    <div style={{
      padding: '8px 20px',
      color: 'var(--text-secondary)',
      fontSize: 13,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      borderBottom: '1px solid var(--border)',
      borderTop: '1px solid var(--border)',
      marginTop: 8,
    }}>
      {children}
    </div>
  )
}

function LinkRow({ icon: Icon, label, description, destructive = false }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '16px 20px',
        borderBottom: '1px solid var(--border)',
        cursor: 'pointer',
        background: hovered ? 'var(--bg-hover)' : 'transparent',
        transition: 'background 0.15s',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        <Icon size={20} color={destructive ? '#f4212e' : 'var(--accent)'} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 15, color: destructive ? '#f4212e' : 'var(--text-primary)' }}>
          {label}
        </div>
        {description && (
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
            {description}
          </div>
        )}
      </div>
      <ChevronRight size={18} color="var(--text-muted)" />
    </div>
  )
}

import React from 'react'

export default function SettingsProfile() {
  return (
    <div>
      {/* Page header */}
      <div style={{ padding: '20px', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Your account</h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          See information about your account, download an archive of your data, or learn about your account deactivation options.
        </p>
      </div>

      <SectionHeader>Account overview</SectionHeader>

      <LinkRow
        icon={User}
        label="Account information"
        description="See your account information like your phone number and email address."
      />
      <LinkRow
        icon={Key}
        label="Change your password"
        description="Change your password at any time."
      />
      <LinkRow
        icon={Globe}
        label="Download an archive of your data"
        description="Get insights into the type of information stored for your account."
      />

      <SectionHeader>Deactivation</SectionHeader>

      <LinkRow
        icon={Shield}
        label="Deactivate your account"
        description="Find out how you can deactivate your account."
        destructive
      />
    </div>
  )
}
