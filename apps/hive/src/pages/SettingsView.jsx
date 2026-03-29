import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, User, Shield, Palette, Bell, Keyboard, LogOut, ChevronRight } from 'lucide-react'
import { currentUser } from '../data/server'

const navSections = [
  {
    label: 'User Settings',
    items: [
      { id: 'account', icon: User, label: 'My Account' },
      { id: 'profile', icon: User, label: 'Profiles' },
      { id: 'appearance', icon: Palette, label: 'Appearance' },
      { id: 'notifications', icon: Bell, label: 'Notifications' },
    ],
  },
  {
    label: 'App Settings',
    items: [
      { id: 'privacy', icon: Shield, label: 'Privacy & Safety' },
      { id: 'keybinds', icon: Keyboard, label: 'Keybinds' },
    ],
  },
]

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px',
        background: checked ? '#7c3aed' : '#4e5058',
        borderRadius: '12px', position: 'relative', cursor: 'pointer',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <div style={{
        position: 'absolute',
        top: '2px',
        left: checked ? '22px' : '2px',
        width: '20px', height: '20px',
        background: '#fff', borderRadius: '50%',
        transition: 'left 0.2s',
      }} />
    </div>
  )
}

function AccountContent() {
  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#dbdee1', marginBottom: '24px' }}>My Account</h2>

      {/* Profile card */}
      <div style={{ background: '#232428', borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
        {/* Banner */}
        <div style={{ height: '100px', background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }} />
        {/* Avatar */}
        <div style={{ padding: '0 16px 16px', position: 'relative' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: currentUser.avatarColor,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 700, color: '#fff',
            marginTop: '-40px',
            border: '6px solid #232428',
            position: 'relative',
            zIndex: 1,
          }}>
            {currentUser.avatar}
          </div>
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#dbdee1' }}>{currentUser.username}</div>
            <div style={{ fontSize: '14px', color: '#80848e' }}>#{Math.floor(Math.random() * 9000 + 1000)}</div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
            <span style={{ background: '#3c3249', color: '#c4b5fd', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>🐝 Hive Member</span>
            <span style={{ background: '#1a3046', color: '#7dd3fc', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>⚡ Early Adopter</span>
            <span style={{ background: '#1a3030', color: '#6ee7b7', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 600 }}>🌐 ParaNet Citizen</span>
          </div>
        </div>
      </div>

      {/* Fields */}
      {[
        { label: 'USERNAME', value: currentUser.username },
        { label: 'EMAIL', value: 'pixel_ghost@paranet.io' },
        { label: 'PHONE NUMBER', value: 'Not added yet' },
      ].map(field => (
        <div key={field.label} style={{
          background: '#2b2d31', borderRadius: '8px', padding: '16px', marginBottom: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{field.label}</div>
            <div style={{ fontSize: '15px', color: '#dbdee1' }}>{field.value}</div>
          </div>
          <button style={{
            background: '#4e5058', color: '#dbdee1', border: 'none', borderRadius: '4px',
            padding: '8px 16px', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#5a5d68'}
            onMouseLeave={e => e.currentTarget.style.background = '#4e5058'}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  )
}

function ProfileContent() {
  const [bio, setBio] = useState('Building relay handlers for the ParaNet. Always online.')
  const [status, setStatus] = useState('🛠️ Building in the open')

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#dbdee1', marginBottom: '24px' }}>Profiles</h2>

      <div style={{ background: '#2b2d31', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          Custom Status
        </label>
        <input
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{
            width: '100%', background: '#1e1f22', border: '1px solid #3f4147',
            borderRadius: '4px', padding: '10px 12px', color: '#dbdee1',
            fontSize: '15px', outline: 'none',
          }}
        />
      </div>

      <div style={{ background: '#2b2d31', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <label style={{ fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>
          About Me
        </label>
        <textarea
          value={bio}
          onChange={e => setBio(e.target.value)}
          rows={4}
          style={{
            width: '100%', background: '#1e1f22', border: '1px solid #3f4147',
            borderRadius: '4px', padding: '10px 12px', color: '#dbdee1',
            fontSize: '15px', outline: 'none', resize: 'vertical',
            fontFamily: 'inherit',
          }}
        />
        <div style={{ fontSize: '12px', color: '#80848e', marginTop: '4px' }}>
          {190 - bio.length} of 190 remaining
        </div>
      </div>
    </div>
  )
}

function AppearanceContent() {
  const [theme, setTheme] = useState('dark')
  const [fontSize, setFontSize] = useState(16)
  const [compact, setCompact] = useState(false)

  return (
    <div>
      <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#dbdee1', marginBottom: '24px' }}>Appearance</h2>

      <div style={{ background: '#2b2d31', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '16px' }}>Theme</div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {['dark', 'light'].map(t => (
            <div
              key={t}
              onClick={() => setTheme(t)}
              style={{
                width: '160px', height: '100px', borderRadius: '8px',
                border: theme === t ? '2px solid #7c3aed' : '2px solid #3f4147',
                cursor: 'pointer', overflow: 'hidden', position: 'relative',
                background: t === 'dark' ? '#313338' : '#f2f3f5',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ height: '40px', background: t === 'dark' ? '#2b2d31' : '#e3e5e8' }} />
              <div style={{ padding: '8px', flex: 1 }}>
                <div style={{ width: '60%', height: '8px', background: t === 'dark' ? '#4e5058' : '#c8cdd2', borderRadius: '4px', marginBottom: '4px' }} />
                <div style={{ width: '80%', height: '8px', background: t === 'dark' ? '#4e5058' : '#c8cdd2', borderRadius: '4px' }} />
              </div>
              {theme === t && (
                <div style={{
                  position: 'absolute', bottom: '8px', right: '8px',
                  width: '18px', height: '18px', borderRadius: '50%',
                  background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', color: '#fff',
                }}>✓</div>
              )}
            </div>
          ))}
        </div>
        <div style={{ fontSize: '13px', color: '#80848e', marginTop: '8px', textTransform: 'capitalize' }}>{theme} theme selected</div>
      </div>

      <div style={{ background: '#2b2d31', borderRadius: '8px', padding: '20px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#dbdee1' }}>Message Font Size</div>
            <div style={{ fontSize: '13px', color: '#80848e' }}>Currently {fontSize}px</div>
          </div>
          <span style={{ fontSize: '20px', fontWeight: 700, color: '#7c3aed' }}>{fontSize}px</span>
        </div>
        <input
          type="range" min={12} max={20} value={fontSize}
          onChange={e => setFontSize(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#7c3aed' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#80848e', marginTop: '4px' }}>
          <span>12px</span><span>20px</span>
        </div>
      </div>

      <div style={{ background: '#2b2d31', borderRadius: '8px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#dbdee1' }}>Compact Mode</div>
            <div style={{ fontSize: '13px', color: '#80848e' }}>Condense messages for a denser view</div>
          </div>
          <Toggle checked={compact} onChange={setCompact} />
        </div>
      </div>
    </div>
  )
}

const contentMap = {
  account: <AccountContent />,
  profile: <ProfileContent />,
  appearance: <AppearanceContent />,
}

export default function SettingsView() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState('account')

  return (
    <div style={{ display: 'flex', width: '100%', height: '100vh', background: '#313338', overflow: 'hidden' }}>
      {/* Left nav */}
      <div style={{
        width: '240px', minWidth: '240px',
        background: '#2b2d31',
        overflowY: 'auto',
        padding: '60px 8px 16px',
        display: 'flex', flexDirection: 'column',
      }} className="scrollbar-thin">
        {navSections.map((section, si) => (
          <div key={si} style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, color: '#80848e', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '4px 10px', marginBottom: '4px' }}>
              {section.label}
            </div>
            {section.items.map(item => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    width: '100%', padding: '8px 10px', borderRadius: '6px',
                    background: isActive ? '#404249' : 'transparent',
                    color: isActive ? '#dbdee1' : '#80848e',
                    fontSize: '14px', fontWeight: isActive ? 600 : 400,
                    textAlign: 'left', cursor: 'pointer',
                    transition: 'background 0.1s, color 0.1s',
                    marginBottom: '2px',
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#35373c'; e.currentTarget.style.color = '#dbdee1' }}}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#80848e' }}}
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              )
            })}
          </div>
        ))}

        <div style={{ marginTop: 'auto', borderTop: '1px solid #3f4147', paddingTop: '16px' }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              width: '100%', padding: '8px 10px', borderRadius: '6px',
              color: '#da3453', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#35373c'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={16} />
            Log Out
          </button>
        </div>
      </div>

      {/* Right content */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }} className="scrollbar-thin">
        {/* Close button */}
        <button
          onClick={() => navigate('/')}
          style={{
            position: 'absolute', top: '16px', right: '16px', zIndex: 10,
            width: '36px', height: '36px', borderRadius: '50%',
            background: '#4e5058', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#dbdee1', transition: 'background 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#686d73'}
          onMouseLeave={e => e.currentTarget.style.background = '#4e5058'}
          title="Close settings (Esc)"
        >
          <X size={18} />
        </button>

        <div style={{ maxWidth: '740px', margin: '0 auto', padding: '60px 40px' }}>
          {contentMap[activeSection] || (
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#dbdee1', marginBottom: '16px', textTransform: 'capitalize' }}>{activeSection}</h2>
              <p style={{ color: '#80848e' }}>Settings for this section coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
