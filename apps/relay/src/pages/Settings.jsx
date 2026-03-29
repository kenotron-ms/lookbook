import { useState } from 'react'
import {
  User, Bell, Palette, Shield, Plug, ChevronRight,
  Moon, Sun, Contrast, Check, Edit3, Globe, Clock,
} from 'lucide-react'
import { CURRENT_USER, CHANNELS } from '../data/workspace'

const TABS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'themes', label: 'Themes', icon: Palette },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'integrations', label: 'Integrations', icon: Plug },
]

const NOTIFICATION_OPTS = ['All new messages', 'Mentions & keywords', 'Nothing']

const THEMES = [
  {
    id: 'light', label: 'Light', icon: Sun,
    sidebar: '#3f0e40', text: '#1d1c1d', bg: '#ffffff', active: '#1264a3',
  },
  {
    id: 'dark', label: 'Dark', icon: Moon,
    sidebar: '#1a1d21', text: '#d1d2d3', bg: '#222529', active: '#1264a3',
  },
  {
    id: 'contrast', label: 'High Contrast', icon: Contrast,
    sidebar: '#000000', text: '#ffffff', bg: '#1a1a1a', active: '#e01e5a',
  },
]

const S = {
  root: { display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' },
  header: {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '0 24px', height: 56, borderBottom: '1px solid #e8e8e8',
    flexShrink: 0,
  },
  headerTitle: { fontWeight: 700, fontSize: 17, color: '#1d1c1d' },
  body: { flex: 1, display: 'flex', overflow: 'hidden' },
  tabsPane: {
    width: 200, borderRight: '1px solid #e8e8e8', padding: '16px 8px',
    flexShrink: 0, overflowY: 'auto',
  },
  tab: (active) => ({
    display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
    borderRadius: 7, cursor: 'pointer', fontSize: 14, fontWeight: active ? 600 : 400,
    background: active ? '#f5eded' : 'transparent',
    color: active ? '#4a154b' : '#616061',
    marginBottom: 2,
  }),
  content: { flex: 1, overflowY: 'auto', padding: '28px 40px' },
  section: { marginBottom: 36 },
  sectionTitle: { fontSize: 13, fontWeight: 700, color: '#9e9e9e', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 16 },
  card: { border: '1px solid #e8e8e8', borderRadius: 10, padding: '20px 24px', background: '#fff' },

  // Profile
  profileTop: { display: 'flex', gap: 20, alignItems: 'flex-start', marginBottom: 20 },
  bigAvatar: {
    width: 72, height: 72, borderRadius: 16, background: '#4a154b',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 24, fontWeight: 700, color: '#fff', flexShrink: 0, cursor: 'pointer',
    border: '3px solid #611f69', position: 'relative',
  },
  avatarEdit: {
    position: 'absolute', bottom: -4, right: -4, background: '#e01e5a', borderRadius: '50%',
    width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
  profileInfo: { flex: 1 },
  fieldLabel: { fontSize: 12, fontWeight: 600, color: '#616061', marginBottom: 4, display: 'block' },
  fieldValue: {
    fontSize: 14, color: '#1d1c1d', padding: '8px 12px', borderRadius: 7,
    border: '1px solid #e8e8e8', background: '#fafafa', marginBottom: 12,
  },
  statusTag: {
    display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13,
    padding: '5px 12px', borderRadius: 99, background: '#f5eded',
    border: '1px solid #d4a4d5', color: '#4a154b', fontWeight: 500,
  },

  // Notifications
  notifRow: {
    display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
    borderBottom: '1px solid #f0f0f0',
  },
  notifCh: { flex: 1, fontSize: 14, color: '#1d1c1d', fontWeight: 500 },
  radioGroup: { display: 'flex', gap: 6 },
  radioOpt: (active) => ({
    padding: '4px 10px', borderRadius: 99, fontSize: 12, fontWeight: 500, cursor: 'pointer',
    background: active ? '#4a154b' : '#f8f8f8',
    color: active ? '#fff' : '#616061',
    border: `1px solid ${active ? '#4a154b' : '#e8e8e8'}`,
  }),

  // Themes
  themeGrid: { display: 'flex', gap: 16, flexWrap: 'wrap' },
  themeCard: (active) => ({
    width: 180, borderRadius: 10, overflow: 'hidden', cursor: 'pointer',
    border: `2px solid ${active ? '#4a154b' : '#e8e8e8'}`,
    transition: 'border-color 0.2s',
  }),
  themePreview: { height: 80, display: 'flex', overflow: 'hidden' },
  themeSidebar: (color) => ({ width: 48, background: color, flexShrink: 0 }),
  themeMain: (color) => ({ flex: 1, background: color }),
  themeFooter: (active) => ({
    padding: '8px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    background: '#fff', borderTop: '1px solid #f0f0f0',
  }),
  themeLabel: { fontSize: 13, fontWeight: 600, color: '#1d1c1d' },
  checkIcon: (active) => ({
    width: 18, height: 18, borderRadius: '50%',
    background: active ? '#4a154b' : '#f0f0f0',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }),
}

function ProfileTab() {
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Profile Information</div>
        <div style={S.card}>
          <div style={S.profileTop}>
            <div style={S.bigAvatar}>
              {CURRENT_USER.avatar}
              <div style={S.avatarEdit}><Edit3 size={10} color="#fff" /></div>
            </div>
            <div style={S.profileInfo}>
              <label style={S.fieldLabel}>Display name</label>
              <div style={S.fieldValue}>{CURRENT_USER.name}</div>
              <label style={S.fieldLabel}>What I do</label>
              <div style={S.fieldValue}>Product · ParaNet</div>
            </div>
          </div>
          <label style={S.fieldLabel}>Current status</label>
          <div style={{ marginBottom: 16 }}>
            <div style={S.statusTag}>
              <span>{CURRENT_USER.statusEmoji}</span>
              <span>{CURRENT_USER.statusText}</span>
            </div>
          </div>
          <label style={S.fieldLabel}>Timezone</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Globe size={14} color="#616061" />
            <div style={S.fieldValue}>Pacific Time (PT) · UTC −8</div>
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Account</div>
        <div style={S.card}>
          <div style={S.notifRow}>
            <span style={{ fontSize: 14, color: '#1d1c1d', flex: 1 }}>Email address</span>
            <span style={{ fontSize: 14, color: '#616061' }}>jordan@paranet.io</span>
            <ChevronRight size={14} color="#9e9e9e" />
          </div>
          <div style={{ ...S.notifRow, borderBottom: 'none' }}>
            <span style={{ fontSize: 14, color: '#1d1c1d', flex: 1 }}>Password</span>
            <span style={{ fontSize: 14, color: '#1264a3', cursor: 'pointer' }}>Change password</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState(
    Object.fromEntries(CHANNELS.map(c => [c.id, c.name === 'general' ? 0 : c.name === 'engineering' ? 0 : 1]))
  )
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Default Notifications</div>
        <div style={S.card}>
          <div style={{ ...S.notifRow, borderBottom: '1px solid #f0f0f0', paddingBottom: 12, marginBottom: 4 }}>
            <span style={{ flex: 1, fontSize: 14, fontWeight: 600, color: '#1d1c1d' }}>Global default</span>
            <div style={S.radioGroup}>
              {NOTIFICATION_OPTS.map((opt, i) => (
                <div key={i} style={S.radioOpt(i === 0)}>{opt}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Channel Preferences</div>
        <div style={S.card}>
          {CHANNELS.map(ch => (
            <div key={ch.id} style={S.notifRow}>
              <span style={S.notifCh}># {ch.name}</span>
              <div style={S.radioGroup}>
                {NOTIFICATION_OPTS.map((opt, i) => (
                  <div
                    key={i}
                    style={S.radioOpt(prefs[ch.id] === i)}
                    onClick={() => setPrefs(p => ({ ...p, [ch.id]: i }))}
                  >
                    {opt}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ThemesTab() {
  const [active, setActive] = useState('light')
  return (
    <div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Color Theme</div>
        <div style={S.themeGrid}>
          {THEMES.map(theme => (
            <div key={theme.id} style={S.themeCard(active === theme.id)} onClick={() => setActive(theme.id)}>
              <div style={S.themePreview}>
                <div style={S.themeSidebar(theme.sidebar)}>
                  {[0, 1, 2, 3, 4].map(i => (
                    <div key={i} style={{ height: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 2, margin: '8px 6px 0' }} />
                  ))}
                </div>
                <div style={S.themeMain(theme.bg)}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ display: 'flex', gap: 4, padding: '6px 6px 0' }}>
                      <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#e8e8e8', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: 5, background: '#e8e8e8', borderRadius: 2, marginBottom: 2, width: '60%' }} />
                        <div style={{ height: 4, background: '#f0f0f0', borderRadius: 2, width: '90%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={S.themeFooter(active === theme.id)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <theme.icon size={14} color="#616061" />
                  <span style={S.themeLabel}>{theme.label}</span>
                </div>
                <div style={S.checkIcon(active === theme.id)}>
                  {active === theme.id && <Check size={11} color="#fff" strokeWidth={3} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={S.section}>
        <div style={S.sectionTitle}>Sidebar Color</div>
        <div style={S.card}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['#3f0e40', '#1a1d21', '#0d7e83', '#3d2b1f', '#1264a3', '#2b5a2b'].map(color => (
              <div key={color} style={{
                width: 36, height: 36, borderRadius: 9, background: color, cursor: 'pointer',
                border: color === '#3f0e40' ? '3px solid #4a154b' : '2px solid transparent',
                boxShadow: color === '#3f0e40' ? '0 0 0 2px #fff, 0 0 0 4px #4a154b' : 'none',
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Settings() {
  const [tab, setTab] = useState('profile')

  const content = {
    profile: <ProfileTab />,
    notifications: <NotificationsTab />,
    themes: <ThemesTab />,
    privacy: <div style={{ color: '#616061', fontSize: 14 }}>Privacy settings coming soon.</div>,
    integrations: <div style={{ color: '#616061', fontSize: 14 }}>Manage your app integrations here.</div>,
  }

  return (
    <div style={S.root}>
      <div style={S.header}>
        <div style={S.headerTitle}>Preferences</div>
      </div>
      <div style={S.body}>
        {/* Tabs */}
        <div style={S.tabsPane}>
          {TABS.map(t => (
            <div key={t.id} style={S.tab(tab === t.id)} onClick={() => setTab(t.id)}>
              <t.icon size={16} />
              {t.label}
            </div>
          ))}
        </div>
        {/* Content */}
        <div style={S.content} className="main-scroll">
          {content[tab]}
        </div>
      </div>
    </div>
  )
}
