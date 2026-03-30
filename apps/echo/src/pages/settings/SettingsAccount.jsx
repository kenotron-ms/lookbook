import { Shield, Smartphone, Globe, Monitor } from 'lucide-react'
import { useSetting } from '../../hooks/useSettings.js'

/* ── Reusable toggle row ─────────────────────────────────────────────────── */
function ToggleRow({ label, description, settingKey, defaultVal = false }) {
  const [rawVal, setVal] = useSetting(settingKey, String(defaultVal))
  const on = rawVal === 'true' || rawVal === true
  const toggle = async () => { await setVal(String(!on)) }
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

/* ── Section header ──────────────────────────────────────────────────────── */
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

/* ── Info row (non-interactive) ──────────────────────────────────────────── */
function InfoRow({ icon: Icon, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', borderBottom: '1px solid var(--border)' }}>
      <Icon size={20} color="var(--accent)" style={{ flexShrink: 0 }} />
      <div>
        <div style={{ fontWeight: 500, fontSize: 15, color: 'var(--text-primary)' }}>{label}</div>
        {sub && <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  )
}

export default function SettingsAccount() {
  return (
    <div>
      {/* Page header */}
      <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
          Security and account access
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Manage your account's security and keep track of your account's usage including apps that you have connected to your account.
        </p>
      </div>

      {/* Security section */}
      <SectionHeader>Security</SectionHeader>
      <ToggleRow
        label="Two-factor authentication"
        description="Protect your account with an extra layer of security by requiring a verification code in addition to your password."
        settingKey="echo-2fa"
        defaultVal={false}
      />
      <ToggleRow
        label="Password reset protection"
        description="Adds extra confirmation steps before your password can be changed."
        settingKey="echo-pwd-protection"
        defaultVal={true}
      />

      {/* Apps and sessions */}
      <SectionHeader>Apps and sessions</SectionHeader>
      <InfoRow
        icon={Smartphone}
        label="Echo for iOS"
        sub="Connected · Last active 2 hours ago"
      />
      <InfoRow
        icon={Globe}
        label="Echo for Web"
        sub="Connected · Last active just now"
      />

      <SectionHeader>Active sessions</SectionHeader>
      <InfoRow
        icon={Monitor}
        label="Jordan's browser session"
        sub="Current session · Chrome on macOS · San Francisco, CA"
      />

      {/* Login history */}
      <SectionHeader>Additional settings</SectionHeader>
      <ToggleRow
        label="Personalized login prompts"
        description="Make signing into Echo easier with personalized account suggestions."
        settingKey="echo-login-prompts"
        defaultVal={true}
      />
      <ToggleRow
        label="Connected accounts"
        description="Connect to Google or Apple to sign in quickly."
        settingKey="echo-connected-accounts"
        defaultVal={false}
      />
    </div>
  )
}
