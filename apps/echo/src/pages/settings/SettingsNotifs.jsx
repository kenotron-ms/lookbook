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

export default function SettingsNotifs() {
  return (
    <div>
      {/* Page header */}
      <div style={{ padding: 20, borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>
          Notifications
        </h1>
        <p style={{ margin: '6px 0 0', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          Select the kinds of notifications you get about your activities, interests, and recommendations.
        </p>
      </div>

      {/* Filters */}
      <SectionHeader>Filters</SectionHeader>
      <ToggleRow
        label="Quality filter"
        description="Filter lower-quality content from your notifications. This won't filter out notifications from people you follow or have interacted with recently."
        settingKey="echo-notif-quality-filter"
        defaultVal={true}
      />
      <ToggleRow
        label="Muted notifications"
        description="From people you don't follow."
        settingKey="echo-notif-muted"
        defaultVal={false}
      />

      {/* Push notifications */}
      <SectionHeader>Push notifications</SectionHeader>
      <ToggleRow
        label="Likes"
        description="When someone likes one of your posts."
        settingKey="echo-push-likes"
        defaultVal={true}
      />
      <ToggleRow
        label="Reposts"
        description="When someone reposts one of your posts."
        settingKey="echo-push-reposts"
        defaultVal={true}
      />
      <ToggleRow
        label="New followers"
        description="When someone new follows you."
        settingKey="echo-push-followers"
        defaultVal={true}
      />
      <ToggleRow
        label="Direct Messages"
        description="When you receive a new direct message."
        settingKey="echo-push-dms"
        defaultVal={true}
      />
      <ToggleRow
        label="Mentions"
        description="When someone mentions you in a post."
        settingKey="echo-push-mentions"
        defaultVal={true}
      />
      <ToggleRow
        label="Echo platform updates"
        description="News and announcements about Echo."
        settingKey="echo-push-platform"
        defaultVal={true}
      />

      {/* Email notifications */}
      <SectionHeader>Email notifications</SectionHeader>
      <ToggleRow
        label="From Echo"
        description="News about Echo features and tips."
        settingKey="echo-email-from-echo"
        defaultVal={true}
      />
      <ToggleRow
        label="Things you missed"
        description="A digest of posts and activity you may have missed."
        settingKey="echo-email-missed"
        defaultVal={false}
      />
      <ToggleRow
        label="Top posts and stories"
        description="The most engaging posts in your network."
        settingKey="echo-email-top"
        defaultVal={false}
      />
    </div>
  )
}
