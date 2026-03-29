import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronRight } from 'lucide-react'

const settingsTabs = [
  'General', 'Labels', 'Inbox', 'Accounts', 'Filters', 'Chat and Meet', 'Advanced'
]

function RadioGroup({ options, selected, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 20 }}>
      {options.map(opt => (
        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 14, color: '#202124' }}>
          <input
            type="radio"
            value={opt.value}
            checked={selected === opt.value}
            onChange={() => onChange(opt.value)}
            style={{ accentColor: '#1a73e8' }}
          />
          {opt.label}
        </label>
      ))}
    </div>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 24,
      padding: '16px 0', borderBottom: '1px solid #f0f0f0',
    }}>
      <div style={{ width: 220, flexShrink: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#202124' }}>{label}</div>
        {description && (
          <div style={{ fontSize: 12, color: '#5f6368', marginTop: 4, lineHeight: 1.4 }}>{description}</div>
        )}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

export default function Settings() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('General')
  const [language, setLanguage] = useState('English (US)')
  const [density, setDensity] = useState('default')
  const [undoSend, setUndoSend] = useState('10')
  const [threading, setThreading] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#f6f8fc', overflow: 'hidden' }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '12px 24px', background: '#fff',
        borderBottom: '1px solid #e0e0e0', flexShrink: 0,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', background: 'transparent', cursor: 'pointer', color: '#5f6368', fontSize: 14 }}
        >
          <ArrowLeft size={18} />
          Settings
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Settings Tabs */}
        <div style={{
          background: '#fff',
          borderBottom: '1px solid #e0e0e0',
          padding: '0 24px',
          display: 'flex',
          overflowX: 'auto',
          flexShrink: 0,
        }}>
          {settingsTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '12px 16px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                color: activeTab === tab ? '#1a73e8' : '#5f6368',
                borderBottom: activeTab === tab ? '2px solid #1a73e8' : '2px solid transparent',
                whiteSpace: 'nowrap',
                marginBottom: -1,
                transition: 'color 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Settings Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
          {activeTab === 'General' && (
            <div style={{ maxWidth: 800, background: '#fff', marginTop: 16, borderRadius: 8, border: '1px solid #e0e0e0', padding: '0 24px' }}>

              <SettingRow label="Language" description="Choose the language Inbox uses">
                <select
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                  style={{
                    padding: '8px 12px', borderRadius: 4, border: '1px solid #dadce0',
                    fontSize: 14, color: '#202124', background: '#fff', cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option>English (US)</option>
                  <option>English (UK)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                  <option>Japanese</option>
                </select>
              </SettingRow>

              <SettingRow label="Display density" description="Choose how much space between emails in your list">
                <RadioGroup
                  options={[
                    { value: 'compact', label: 'Compact' },
                    { value: 'default', label: 'Default' },
                    { value: 'comfortable', label: 'Comfortable' },
                  ]}
                  selected={density}
                  onChange={setDensity}
                />
              </SettingRow>

              <SettingRow label="Undo Send" description="Choose how long you want to be able to undo sending your messages">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 14, color: '#202124' }}>Send cancellation period:</span>
                  <select
                    value={undoSend}
                    onChange={e => setUndoSend(e.target.value)}
                    style={{
                      padding: '6px 10px', borderRadius: 4, border: '1px solid #dadce0',
                      fontSize: 14, color: '#202124', background: '#fff', cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <option value="10">10 seconds</option>
                    <option value="20">20 seconds</option>
                    <option value="30">30 seconds</option>
                  </select>
                </div>
              </SettingRow>

              <SettingRow label="Conversation view" description="Group emails in the same thread together">
                <RadioGroup
                  options={[
                    { value: true, label: 'On (group emails by thread)' },
                    { value: false, label: 'Off (show each email separately)' },
                  ]}
                  selected={threading}
                  onChange={val => setThreading(val === 'true' || val === true)}
                />
              </SettingRow>

              <SettingRow label="Preview pane" description="Choose how to read emails">
                <RadioGroup
                  options={[
                    { value: 'none', label: 'No split' },
                    { value: 'right', label: 'Right of inbox' },
                    { value: 'below', label: 'Below inbox' },
                  ]}
                  selected="right"
                  onChange={() => {}}
                />
              </SettingRow>

              <SettingRow label="Default reply behavior" description="Set the default reply type when responding to messages">
                <RadioGroup
                  options={[
                    { value: 'reply', label: 'Reply' },
                    { value: 'reply-all', label: 'Reply all' },
                  ]}
                  selected="reply"
                  onChange={() => {}}
                />
              </SettingRow>

              <SettingRow label="Nudges" description="Suggest emails to follow up and reply to">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#202124' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#1a73e8' }} />
                    Suggest emails to reply to
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14, color: '#202124' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#1a73e8' }} />
                    Suggest emails to follow up on
                  </label>
                </div>
              </SettingRow>

              {/* Save button */}
              <div style={{ padding: '20px 0', display: 'flex', gap: 12 }}>
                <button
                  style={{
                    padding: '10px 24px', borderRadius: 4, border: 'none',
                    background: '#1a73e8', color: '#fff', fontSize: 14, fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#1558b0'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1a73e8'}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => navigate('/')}
                  style={{
                    padding: '10px 24px', borderRadius: 4,
                    border: '1px solid #dadce0', background: '#fff',
                    color: '#3c4043', fontSize: 14, fontWeight: 500, cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'General' && (
            <div style={{
              maxWidth: 800, background: '#fff', marginTop: 16,
              borderRadius: 8, border: '1px solid #e0e0e0',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', padding: 64, color: '#5f6368', textAlign: 'center',
            }}>
              <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.5 }}>⚙️</div>
              <div style={{ fontSize: 18, fontWeight: 500, color: '#202124', marginBottom: 8 }}>
                {activeTab} Settings
              </div>
              <div style={{ fontSize: 14 }}>
                Configure your {activeTab.toLowerCase()} preferences here.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
