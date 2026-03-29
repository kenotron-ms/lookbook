import { useState } from 'react'
import { Eye, EyeOff, Copy, CheckCircle, ExternalLink, RefreshCw, Zap, Clock } from 'lucide-react'
import { apiEvents, apiLogs, webhooks } from '../data/payments'

const ACCENT = '#635bff'

function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '10px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      marginBottom: '20px', overflow: 'hidden',
    }}>
      <div style={{ padding: '16px 22px', borderBottom: '1px solid #f0f2f5' }}>
        <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#30313d' }}>{title}</h2>
        {subtitle && <p style={{ margin: '3px 0 0', fontSize: '12.5px', color: '#697386' }}>{subtitle}</p>}
      </div>
      <div style={{ padding: '18px 22px' }}>
        {children}
      </div>
    </div>
  )
}

function KeyRow({ label, value, hint }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const display = revealed ? value : value.replace(/[^_]/g, (c, i) => i < 8 ? c : '•')

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 16px', borderRadius: '8px',
      border: '1px solid #e3e8ef', background: '#fafafa',
      marginBottom: '10px',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '11.5px', color: '#697386', fontWeight: '500', marginBottom: '4px' }}>{label}</div>
        <code style={{
          fontSize: '12.5px', color: '#30313d',
          fontFamily: 'SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          letterSpacing: revealed ? '0' : '1px',
          overflowWrap: 'break-word',
          wordBreak: 'break-all',
        }}>
          {display}
        </code>
        {hint && <div style={{ fontSize: '11px', color: '#9ba4b0', marginTop: '3px' }}>{hint}</div>}
      </div>
      <div style={{ display: 'flex', gap: '8px', marginLeft: '16px', flexShrink: 0 }}>
        <button
          onClick={() => setRevealed(!revealed)}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '5px 11px', borderRadius: '6px',
            background: '#fff', border: '1px solid #e3e8ef',
            fontSize: '12px', fontWeight: '500', color: '#30313d',
            cursor: 'pointer',
          }}
        >
          {revealed ? <EyeOff size={12} /> : <Eye size={12} />}
          {revealed ? 'Hide' : 'Reveal'}
        </button>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: '5px',
            padding: '5px 11px', borderRadius: '6px',
            background: copied ? '#d3f5e3' : '#fff',
            border: `1px solid ${copied ? '#1a8a41' : '#e3e8ef'}`,
            fontSize: '12px', fontWeight: '500',
            color: copied ? '#1a8a41' : '#30313d',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  )
}

function EventTypePill({ type }) {
  const color = type.includes('succeeded') || type.includes('created') || type.includes('updated')
    ? '#635bff' : type.includes('failed') ? '#c0392b' : type.includes('refunded') ? '#697386' : '#1a8a41'
  return (
    <code style={{
      fontSize: '11.5px', fontFamily: 'monospace',
      color, background: `${color}12`,
      padding: '2px 8px', borderRadius: '4px',
      fontWeight: '600',
    }}>
      {type}
    </code>
  )
}

function HttpMethod({ method }) {
  const colors = { GET: '#1a8a41', POST: '#635bff', DELETE: '#c0392b', PATCH: '#b08500' }
  return (
    <span style={{
      fontSize: '11px', fontWeight: '700', fontFamily: 'monospace',
      color: colors[method] || '#30313d',
      background: `${colors[method] || '#30313d'}12`,
      padding: '2px 6px', borderRadius: '4px',
    }}>
      {method}
    </span>
  )
}

function StatusCode({ code }) {
  const color = code >= 200 && code < 300 ? '#1a8a41' : code >= 400 ? '#c0392b' : '#b08500'
  return (
    <span style={{ fontSize: '12.5px', fontWeight: '600', fontFamily: 'monospace', color }}>{code}</span>
  )
}

export default function Developers() {
  const [activeTab, setActiveTab] = useState('api-keys')

  const tabs = [
    { key: 'api-keys',  label: 'API Keys'  },
    { key: 'webhooks',  label: 'Webhooks'  },
    { key: 'events',    label: 'Event Log' },
    { key: 'logs',      label: 'API Logs'  },
  ]

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1000px' }}>
      {/* Header */}
      <div style={{ marginBottom: '22px' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.3px' }}>Developers</h1>
        <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#697386' }}>
          API access, webhooks, and event monitoring
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', background: '#fff',
        borderRadius: '10px 10px 0 0', border: '1px solid #e3e8ef',
        borderBottom: 'none', padding: '0 18px',
      }}>
        {tabs.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            style={{
              padding: '13px 14px 11px',
              border: 'none', background: 'none', cursor: 'pointer',
              fontSize: '13px', fontWeight: activeTab === key ? '600' : '400',
              color: activeTab === key ? ACCENT : '#697386',
              borderBottom: activeTab === key ? `2px solid ${ACCENT}` : '2px solid transparent',
              marginRight: '4px',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{
        background: '#fff', borderRadius: '0 0 10px 10px',
        border: '1px solid #e3e8ef', borderTop: '1px solid #f0f2f5',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        marginBottom: '20px',
      }}>
        {/* API Keys */}
        {activeTab === 'api-keys' && (
          <div style={{ padding: '22px' }}>
            <div style={{
              background: '#fff8e1', border: '1px solid #fce08a', borderRadius: '8px',
              padding: '10px 14px', marginBottom: '18px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}>
              <span style={{ fontSize: '14px' }}>⚠</span>
              <span style={{ fontSize: '12.5px', color: '#b08500', fontWeight: '500' }}>
                You're using test API keys. No real charges will be made.
              </span>
            </div>

            <KeyRow
              label="Publishable key"
              value="pk_test_··················································"
              hint="Safe to include in browser-side code and mobile apps"
            />
            <KeyRow
              label="Secret key"
              value="sk_test_··································"
              hint="Keep this confidential — never expose in client-side code"
            />

            <div style={{ marginTop: '18px', paddingTop: '18px', borderTop: '1px solid #f0f2f5' }}>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#30313d', marginBottom: '8px' }}>Restricted keys</div>
              <p style={{ margin: '0 0 12px', fontSize: '12.5px', color: '#697386' }}>
                Create keys with limited permissions for specific integrations.
              </p>
              <button style={{
                padding: '7px 14px', borderRadius: '7px',
                background: '#fff', border: `1px solid ${ACCENT}`,
                fontSize: '13px', fontWeight: '600', color: ACCENT,
                cursor: 'pointer',
              }}>
                Create restricted key
              </button>
            </div>
          </div>
        )}

        {/* Webhooks */}
        {activeTab === 'webhooks' && (
          <div style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#697386' }}>{webhooks.length} endpoints configured</span>
              <button style={{
                padding: '7px 14px', borderRadius: '7px',
                background: ACCENT, border: 'none',
                fontSize: '13px', fontWeight: '600', color: '#fff',
                cursor: 'pointer',
              }}>
                Add endpoint
              </button>
            </div>

            {webhooks.map((wh) => (
              <div key={wh.id} style={{
                border: '1px solid #e3e8ef', borderRadius: '8px',
                marginBottom: '12px', overflow: 'hidden',
              }}>
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <code style={{ fontSize: '13px', fontWeight: '600', color: '#30313d', fontFamily: 'monospace' }}>{wh.url}</code>
                      <ExternalLink size={12} color="#697386" style={{ cursor: 'pointer' }} />
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {wh.events.map(ev => (
                        <code key={ev} style={{ fontSize: '11px', fontFamily: 'monospace', background: '#f0f0f0', color: '#697386', padding: '1px 6px', borderRadius: '4px' }}>
                          {ev}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    <span style={{
                      background: '#d3f5e3', color: '#1a8a41',
                      padding: '2px 8px', borderRadius: '20px',
                      fontSize: '11.5px', fontWeight: '600',
                    }}>
                      Enabled
                    </span>
                    <button style={{ padding: '4px 10px', borderRadius: '5px', border: '1px solid #e3e8ef', background: '#fff', fontSize: '12px', color: '#30313d', cursor: 'pointer' }}>
                      Edit
                    </button>
                  </div>
                </div>
                <div style={{ padding: '12px 16px', borderTop: '1px solid #f0f2f5' }}>
                  <div style={{ fontSize: '11.5px', color: '#697386', fontWeight: '500', marginBottom: '8px' }}>Recent attempts</div>
                  {wh.attempts.map((attempt, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '6px 0',
                      borderBottom: i < wh.attempts.length - 1 ? '1px solid #f5f5f5' : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={11} color="#9ba4b0" />
                        <span style={{ fontSize: '12px', color: '#697386' }}>{attempt.date}</span>
                      </div>
                      <StatusCode code={attempt.status} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Event Log */}
        {activeTab === 'events' && (
          <div>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#697386' }}>Showing recent events in test mode</span>
              <button style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 11px', borderRadius: '6px',
                background: '#fff', border: '1px solid #e3e8ef',
                fontSize: '12px', fontWeight: '500', color: '#30313d',
                cursor: 'pointer',
              }}>
                <RefreshCw size={12} />
                Refresh
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  {['Event type', 'Object', 'Event ID', 'Date'].map(h => (
                    <th key={h} style={{
                      padding: '9px 18px', textAlign: 'left',
                      fontSize: '11px', fontWeight: '600', color: '#697386',
                      borderBottom: '1px solid #f0f2f5', letterSpacing: '0.3px', textTransform: 'uppercase',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apiEvents.map((ev, i) => (
                  <tr
                    key={ev.id}
                    style={{ borderBottom: i < apiEvents.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '11px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Zap size={13} color="#635bff" />
                        <EventTypePill type={ev.type} />
                      </div>
                    </td>
                    <td style={{ padding: '11px 18px', fontSize: '12.5px', color: '#697386' }}>{ev.object}</td>
                    <td style={{ padding: '11px 18px' }}>
                      <code style={{ fontSize: '11.5px', fontFamily: 'monospace', color: '#9ba4b0' }}>{ev.id}</code>
                    </td>
                    <td style={{ padding: '11px 18px', fontSize: '12px', color: '#697386', whiteSpace: 'nowrap' }}>{ev.created}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* API Logs */}
        {activeTab === 'logs' && (
          <div>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: '#697386' }}>API request logs — last 7 days</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  padding: '5px 11px', borderRadius: '6px',
                  background: '#fff', border: '1px solid #e3e8ef',
                  fontSize: '12px', fontWeight: '500', color: '#30313d',
                  cursor: 'pointer',
                }}>
                  2xx Only
                </button>
                <button style={{
                  padding: '5px 11px', borderRadius: '6px',
                  background: '#fff', border: '1px solid #e3e8ef',
                  fontSize: '12px', fontWeight: '500', color: '#30313d',
                  cursor: 'pointer',
                }}>
                  Errors Only
                </button>
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#fafafa' }}>
                  {['Method', 'Status', 'Endpoint', 'Duration', 'Date'].map(h => (
                    <th key={h} style={{
                      padding: '9px 18px', textAlign: 'left',
                      fontSize: '11px', fontWeight: '600', color: '#697386',
                      borderBottom: '1px solid #f0f2f5', letterSpacing: '0.3px', textTransform: 'uppercase',
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {apiLogs.map((log, i) => (
                  <tr
                    key={log.id}
                    style={{ borderBottom: i < apiLogs.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '11px 18px' }}>
                      <HttpMethod method={log.method} />
                    </td>
                    <td style={{ padding: '11px 18px' }}>
                      <StatusCode code={log.status} />
                    </td>
                    <td style={{ padding: '11px 18px' }}>
                      <code style={{ fontSize: '12.5px', fontFamily: 'monospace', color: '#30313d' }}>{log.endpoint}</code>
                    </td>
                    <td style={{ padding: '11px 18px', fontSize: '12px', color: '#697386' }}>{log.duration}</td>
                    <td style={{ padding: '11px 18px', fontSize: '12px', color: '#697386', whiteSpace: 'nowrap' }}>{log.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Start */}
      <SectionCard title="Quick start" subtitle="Get up and running with Ledger in minutes">
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { title: 'Accept a payment', desc: 'Process your first charge using the Ledger API', icon: '💳' },
            { title: 'Create a customer', desc: 'Save customer data to track payments over time', icon: '👤' },
            { title: 'Set up webhooks', desc: 'Listen to events and automate your workflow', icon: '⚡' },
          ].map(({ title, desc, icon }) => (
            <div key={title} style={{
              flex: '1', minWidth: '200px',
              padding: '16px', borderRadius: '8px',
              border: '1px solid #e3e8ef', cursor: 'pointer',
              transition: 'border-color 0.12s, box-shadow 0.12s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 1px ${ACCENT}` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e3e8ef'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ fontSize: '20px', marginBottom: '8px' }}>{icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '600', color: '#30313d', marginBottom: '4px' }}>{title}</div>
              <div style={{ fontSize: '12px', color: '#697386', lineHeight: '1.5' }}>{desc}</div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}
