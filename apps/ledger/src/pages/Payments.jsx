import { useState } from 'react'
import { Download, Search, ChevronDown } from 'lucide-react'
import { payments } from '../data/payments'

const ACCENT = '#635bff'

function StatusBadge({ status }) {
  const styles = {
    succeeded: { bg: '#d3f5e3', text: '#1a8a41', label: 'Succeeded' },
    failed:    { bg: '#fde8e8', text: '#c0392b', label: 'Failed'    },
    refunded:  { bg: '#f0f0f0', text: '#697386', label: 'Refunded'  },
  }
  const s = styles[status] || styles.succeeded
  return (
    <span style={{
      background: s.bg, color: s.text,
      padding: '2px 8px', borderRadius: '20px',
      fontSize: '11.5px', fontWeight: '600',
      display: 'inline-block',
    }}>
      {s.label}
    </span>
  )
}

const METHOD_COLORS = {
  Visa:       '#1a1f71',
  Mastercard: '#eb001b',
  Amex:       '#007bc1',
  Discover:   '#ff6600',
}

export default function Payments() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = payments.filter(p => {
    const matchFilter = filter === 'all' || p.status === filter
    const matchSearch = !search || p.customer.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const fmtAmount = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  const tabs = [
    { key: 'all',       label: 'All',       count: payments.length },
    { key: 'succeeded', label: 'Succeeded',  count: payments.filter(p => p.status === 'succeeded').length },
    { key: 'failed',    label: 'Failed',     count: payments.filter(p => p.status === 'failed').length },
    { key: 'refunded',  label: 'Refunded',   count: payments.filter(p => p.status === 'refunded').length },
  ]

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.3px' }}>Payments</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#697386' }}>
            {payments.length} transactions this month
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', borderRadius: '7px',
          background: ACCENT, border: 'none',
          fontSize: '13px', fontWeight: '600', color: '#fff',
          cursor: 'pointer',
        }}>
          <Download size={13} />
          Export
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{
        background: '#fff', borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        marginBottom: '16px', overflow: 'hidden',
      }}>
        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #f0f2f5', padding: '0 18px' }}>
          {tabs.map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                padding: '13px 14px 11px',
                marginRight: '4px',
                border: 'none', background: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: filter === key ? '600' : '400',
                color: filter === key ? ACCENT : '#697386',
                borderBottom: filter === key ? `2px solid ${ACCENT}` : '2px solid transparent',
                transition: 'color 0.12s',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}
            >
              {label}
              <span style={{
                background: filter === key ? 'rgba(99,91,255,0.1)' : '#f0f2f5',
                color: filter === key ? ACCENT : '#697386',
                borderRadius: '12px', padding: '1px 7px',
                fontSize: '11px', fontWeight: '600',
              }}>
                {count}
              </span>
            </button>
          ))}

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#f5f5f5', border: '1px solid #e3e8ef',
              borderRadius: '6px', padding: '5px 10px',
            }}>
              <Search size={13} color="#697386" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search payments…"
                style={{
                  border: 'none', background: 'none', outline: 'none',
                  fontSize: '12.5px', color: '#30313d', width: '160px',
                }}
              />
            </div>
            <button style={{
              display: 'flex', alignItems: 'center', gap: '5px',
              padding: '5px 10px', borderRadius: '6px',
              background: '#fff', border: '1px solid #e3e8ef',
              fontSize: '12px', fontWeight: '500', color: '#30313d',
              cursor: 'pointer',
            }}>
              Date range <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Amount', 'Description', 'Customer', 'Method', 'Date', 'Status'].map(h => (
                <th key={h} style={{
                  padding: '9px 16px', textAlign: h === 'Amount' ? 'right' : 'left',
                  fontSize: '11px', fontWeight: '600', color: '#697386',
                  borderBottom: '1px solid #f0f2f5', letterSpacing: '0.3px', textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr
                key={p.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', fontSize: '13px', fontWeight: '600', color: '#30313d', whiteSpace: 'nowrap' }}>
                  {fmtAmount(p.amount)}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#30313d', maxWidth: '200px' }}>
                  <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.description}
                  </div>
                  <div style={{ fontSize: '11px', color: '#697386', fontFamily: 'monospace', marginTop: '1px' }}>{p.id}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '13px', color: '#30313d' }}>
                  <div style={{ fontWeight: '500' }}>{p.customer}</div>
                  <div style={{ fontSize: '11.5px', color: '#697386' }}>{p.email}</div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#697386', whiteSpace: 'nowrap' }}>
                  <span style={{ fontWeight: '600', color: METHOD_COLORS[p.method] || '#30313d' }}>{p.method}</span>
                  {' '}••{p.last4}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12px', color: '#697386', whiteSpace: 'nowrap' }}>
                  {p.date}
                </td>
                <td style={{ padding: '12px 16px' }}>
                  <StatusBadge status={p.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#697386', fontSize: '13px' }}>
            No payments match your filters.
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: '#697386' }}>
            Showing {filtered.length} of {payments.length} payments
          </span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button style={{ padding: '4px 10px', borderRadius: '5px', border: '1px solid #e3e8ef', background: '#fff', fontSize: '12px', color: '#697386', cursor: 'pointer' }}>← Prev</button>
            <button style={{ padding: '4px 10px', borderRadius: '5px', border: '1px solid #e3e8ef', background: '#fff', fontSize: '12px', color: '#697386', cursor: 'pointer' }}>Next →</button>
          </div>
        </div>
      </div>
    </div>
  )
}
