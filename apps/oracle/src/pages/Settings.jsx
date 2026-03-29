import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Moon, Sun, Monitor, Download, Trash2 } from 'lucide-react'
import Sidebar from '../components/Sidebar.jsx'

const TABS = ['General', 'Personalization', 'Speech', 'Data Controls', 'Security', 'Beta Features']

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      style={{
        width: '44px',
        height: '24px',
        borderRadius: '12px',
        background: checked ? '#10a37f' : '#383838',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: '#fff',
          transition: 'left 0.2s',
        }}
      />
    </button>
  )
}

function SettingRow({ label, description, children }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 0',
        borderBottom: '1px solid #2f2f2f',
        gap: '20px',
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: '#ececec', fontWeight: 500 }}>{label}</div>
        {description && (
          <div style={{ fontSize: '12px', color: '#9b9b9b', marginTop: '2px' }}>{description}</div>
        )}
      </div>
      {children}
    </div>
  )
}

function GeneralTab() {
  const [theme, setTheme] = useState('dark')
  const [language, setLanguage] = useState('English (US)')
  const [format, setFormat] = useState('markdown')

  const themes = [
    { id: 'light', icon: Sun, label: 'Light' },
    { id: 'dark', icon: Moon, label: 'Dark' },
    { id: 'system', icon: Monitor, label: 'System' },
  ]

  return (
    <div>
      {/* Theme */}
      <SettingRow label="Theme" description="Choose how Oracle looks on this device">
        <div style={{ display: 'flex', gap: '6px' }}>
          {themes.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setTheme(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: `1px solid ${theme === id ? '#10a37f' : '#383838'}`,
                background: theme === id ? 'rgba(16,163,127,0.12)' : '#2f2f2f',
                color: theme === id ? '#10a37f' : '#9b9b9b',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: theme === id ? 600 : 400,
                transition: 'all 0.15s',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>
      </SettingRow>

      {/* Language */}
      <SettingRow label="Language" description="Language for the Oracle interface">
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{
            background: '#2f2f2f',
            border: '1px solid #383838',
            borderRadius: '8px',
            color: '#ececec',
            padding: '6px 12px',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {['English (US)', 'English (UK)', 'Spanish', 'French', 'German', 'Japanese', 'Chinese'].map((l) => (
            <option key={l} value={l} style={{ background: '#2f2f2f' }}>{l}</option>
          ))}
        </select>
      </SettingRow>

      {/* Response format */}
      <SettingRow label="Response format" description="Default format for Oracle responses">
        <select
          value={format}
          onChange={(e) => setFormat(e.target.value)}
          style={{
            background: '#2f2f2f',
            border: '1px solid #383838',
            borderRadius: '8px',
            color: '#ececec',
            padding: '6px 12px',
            fontSize: '13px',
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {['Markdown', 'Plain text', 'Concise', 'Detailed'].map((f) => (
            <option key={f} value={f.toLowerCase()} style={{ background: '#2f2f2f' }}>{f}</option>
          ))}
        </select>
      </SettingRow>
    </div>
  )
}

function DataControlsTab() {
  const [chatHistory, setChatHistory] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  return (
    <div>
      <SettingRow
        label="Chat history & training"
        description="Save new chats on this device and allow them to be used to improve Oracle models"
      >
        <Toggle checked={chatHistory} onChange={setChatHistory} />
      </SettingRow>

      <SettingRow label="Export data" description="Download a copy of all your Oracle data">
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '8px',
            border: '1px solid #383838',
            background: '#2f2f2f',
            color: '#ececec',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#383838'}
          onMouseLeave={e => e.currentTarget.style.background = '#2f2f2f'}
        >
          <Download size={14} />
          Export
        </button>
      </SettingRow>

      <SettingRow label="Delete all conversations" description="Permanently delete all your chat history">
        {showDeleteConfirm ? (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid #383838',
                background: '#2f2f2f',
                color: '#9b9b9b',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => setShowDeleteConfirm(false)}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid #e74c3c',
                background: 'rgba(231,76,60,0.15)',
                color: '#e74c3c',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              Confirm delete
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 14px',
              borderRadius: '8px',
              border: '1px solid #e74c3c',
              background: 'rgba(231,76,60,0.08)',
              color: '#e74c3c',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
            }}
          >
            <Trash2 size={14} />
            Delete all
          </button>
        )}
      </SettingRow>
    </div>
  )
}

function PlaceholderTab({ name }) {
  return (
    <div
      style={{
        padding: '40px 0',
        textAlign: 'center',
        color: '#9b9b9b',
        fontSize: '14px',
      }}
    >
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚙️</div>
      {name} settings coming soon.
    </div>
  )
}

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General')
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#212121', overflow: 'hidden' }}>
      <Sidebar activeConvoId={null} onSelectConvo={() => navigate('/')} onNewChat={() => navigate('/')} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#9b9b9b',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ececec'}
            onMouseLeave={e => e.currentTarget.style.color = '#9b9b9b'}
          >
            <ArrowLeft size={18} />
          </button>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#ececec' }}>Settings</h1>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid #383838',
            marginBottom: '0',
            gap: '0',
            overflowX: 'auto',
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={activeTab === tab ? 'tab-active' : 'tab-inactive'}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ maxWidth: '600px', paddingTop: '8px' }}>
          {activeTab === 'General' && <GeneralTab />}
          {activeTab === 'Data Controls' && <DataControlsTab />}
          {!['General', 'Data Controls'].includes(activeTab) && <PlaceholderTab name={activeTab} />}
        </div>
      </div>
    </div>
  )
}
