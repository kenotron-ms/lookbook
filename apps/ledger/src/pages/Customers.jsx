import { useState } from 'react'
import { Search, UserPlus, ChevronRight } from 'lucide-react'
import { customers } from '../data/payments'

const ACCENT = '#635bff'

function StatusPill({ status }) {
  return (
    <span style={{
      background: status === 'active' ? '#d3f5e3' : '#f0f0f0',
      color: status === 'active' ? '#1a8a41' : '#697386',
      padding: '2px 8px', borderRadius: '20px',
      fontSize: '11.5px', fontWeight: '600', display: 'inline-block',
    }}>
      {status === 'active' ? 'Active' : 'Inactive'}
    </span>
  )
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const colors = ['#635bff', '#1a8a41', '#b08500', '#c0392b', '#007bc1', '#6c5ce7', '#00b894', '#e17055']
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <div style={{
      width: '30px', height: '30px', borderRadius: '50%',
      background: color, color: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '11px', fontWeight: '700', flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export default function Customers() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = customers.filter(c => {
    const matchFilter = filter === 'all' || c.status === filter
    const matchSearch = !search
      || c.name.toLowerCase().includes(search.toLowerCase())
      || c.email.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const fmtSpend = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  const tabs = [
    { key: 'all',      label: 'All',      count: customers.length },
    { key: 'active',   label: 'Active',   count: customers.filter(c => c.status === 'active').length },
    { key: 'inactive', label: 'Inactive', count: customers.filter(c => c.status === 'inactive').length },
  ]

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '22px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.3px' }}>Customers</h1>
          <p style={{ margin: '3px 0 0', fontSize: '13px', color: '#697386' }}>
            {customers.length} total customers
          </p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', borderRadius: '7px',
          background: ACCENT, border: 'none',
          fontSize: '13px', fontWeight: '600', color: '#fff',
          cursor: 'pointer',
        }}>
          <UserPlus size={13} />
          Add customer
        </button>
      </div>

      {/* Main Card */}
      <div style={{
        background: '#fff', borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden',
      }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid #f0f2f5', padding: '0 18px' }}>
          {/* Tabs */}
          <div style={{ display: 'flex' }}>
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
          </div>

          <div style={{ flex: 1 }} />

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#f5f5f5', border: '1px solid #e3e8ef',
            borderRadius: '6px', padding: '5px 10px',
            margin: '8px 0',
          }}>
            <Search size={13} color="#697386" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              style={{
                border: 'none', background: 'none', outline: 'none',
                fontSize: '12.5px', color: '#30313d', width: '200px',
              }}
            />
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Name', 'Email', 'Total spend', 'Last payment', 'Customer since', 'Status', ''].map((h, i) => (
                <th key={i} style={{
                  padding: '9px 16px', textAlign: 'left',
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
            {filtered.map((c, i) => (
              <tr
                key={c.id}
                style={{ borderBottom: i < filtered.length - 1 ? '1px solid #f5f5f5' : 'none', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Avatar name={c.name} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#30313d' }}>{c.name}</span>
                  </div>
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#697386' }}>{c.email}</td>
                <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', fontWeight: '600', color: '#30313d' }}>
                  {fmtSpend(c.spend)}
                </td>
                <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#697386', whiteSpace: 'nowrap' }}>{c.lastPayment}</td>
                <td style={{ padding: '12px 16px', fontSize: '12.5px', color: '#697386' }}>{c.since}</td>
                <td style={{ padding: '12px 16px' }}><StatusPill status={c.status} /></td>
                <td style={{ padding: '12px 16px', width: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '10.5px', fontFamily: 'monospace', color: '#9ba4b0' }}>{c.id}</span>
                    <ChevronRight size={14} color="#c4cbd4" style={{ marginLeft: '6px', flexShrink: 0 }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div style={{ padding: '48px', textAlign: 'center', color: '#697386', fontSize: '13px' }}>
            No customers found.
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '12px', color: '#697386' }}>
            Showing {filtered.length} of {customers.length} customers
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
