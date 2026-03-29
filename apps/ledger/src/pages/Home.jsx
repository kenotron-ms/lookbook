import { useState } from 'react'
import { TrendingUp, TrendingDown, ArrowUpRight, AlertTriangle, RefreshCw } from 'lucide-react'
import { revenueData, payments } from '../data/payments'

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

function MetricCard({ label, value, trend, trendLabel, accent, note }) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: '10px',
      padding: '20px 22px',
      flex: 1,
      minWidth: 0,
      borderLeft: accent ? `4px solid ${ACCENT}` : '4px solid transparent',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    }}>
      <div style={{ fontSize: '12px', color: '#697386', fontWeight: '500', marginBottom: '6px' }}>{label}</div>
      <div style={{ fontSize: '22px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.5px' }}>{value}</div>
      {trend && (
        <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {trend > 0
            ? <TrendingUp size={13} color="#1a8a41" />
            : <TrendingDown size={13} color="#c0392b" />}
          <span style={{ fontSize: '12px', fontWeight: '500', color: trend > 0 ? '#1a8a41' : '#c0392b' }}>
            {trend > 0 ? '+' : ''}{trend}%
          </span>
          {trendLabel && <span style={{ fontSize: '12px', color: '#697386' }}>{trendLabel}</span>}
        </div>
      )}
      {note && <div style={{ marginTop: '4px', fontSize: '11.5px', color: '#697386' }}>{note}</div>}
    </div>
  )
}

function RevenueChart({ period }) {
  const W = 720, H = 150
  const data = period === 'week'
    ? revenueData.slice(-7)
    : period === 'month'
    ? revenueData.slice(-30)
    : period === 'quarter'
    ? revenueData
    : revenueData

  const maxVal = Math.max(...data.map(d => d.amount)) * 1.18
  const toX = (i) => (i / (data.length - 1)) * W
  const toY = (v) => H - (v / maxVal) * H

  const linePts = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(d.amount).toFixed(1)}`).join(' ')
  const areaPts = `${linePts} L${W},${H} L0,${H} Z`

  // Grid lines at 25, 50, 75, 100%
  const gridVals = [0.25, 0.5, 0.75, 1].map(p => ({ y: toY(maxVal * p).toFixed(1), label: `$${((maxVal * p) / 1000).toFixed(1)}k` }))
  // X labels: show a few
  const xLabels = data.filter((_, i) => i % Math.floor(data.length / 5) === 0 || i === data.length - 1)
    .map((d, _, arr) => {
      const i = data.indexOf(d)
      return { x: toX(i), label: d.date }
    })

  return (
    <div style={{ overflowX: 'auto' }}>
      <svg viewBox={`-40 -10 ${W + 60} ${H + 30}`} style={{ width: '100%', minWidth: '400px' }}>
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ACCENT} stopOpacity="0.18" />
            <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {gridVals.map(({ y, label }) => (
          <g key={y}>
            <line x1={0} y1={y} x2={W} y2={y} stroke="#e3e8ef" strokeWidth="1" />
            <text x={-6} y={parseFloat(y) + 4} textAnchor="end" fontSize="10" fill="#9ba4b0">{label}</text>
          </g>
        ))}

        {/* Area fill */}
        <path d={areaPts} fill="url(#chartGrad)" />

        {/* Line */}
        <path d={linePts} fill="none" stroke={ACCENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

        {/* Data points at peaks */}
        {data.map((d, i) => {
          const y = toY(d.amount)
          const prev = data[i - 1]?.amount ?? d.amount
          const next = data[i + 1]?.amount ?? d.amount
          const isPeak = d.amount > prev && d.amount > next
          return isPeak ? (
            <circle key={i} cx={toX(i)} cy={y} r="3" fill={ACCENT} />
          ) : null
        })}

        {/* X axis labels */}
        {xLabels.map(({ x, label }) => (
          <text key={label} x={x} y={H + 18} textAnchor="middle" fontSize="10" fill="#9ba4b0">{label}</text>
        ))}
      </svg>
    </div>
  )
}

export default function Home() {
  const [period, setPeriod] = useState('month')
  const recentPayments = payments.slice(0, 8)
  const failedPayments = payments.filter(p => p.status === 'failed')

  const fmtAmount = (cents) => `$${(cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2 })}`

  return (
    <div style={{ padding: '28px 32px', maxWidth: '1100px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.3px' }}>
            Good morning, Jordan
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#697386' }}>
            Here's what's happening with your business today.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#fff8e1', color: '#b08500',
            border: '1px solid #fce08a',
            borderRadius: '20px', padding: '4px 12px',
            fontSize: '11.5px', fontWeight: '600',
            letterSpacing: '0.3px',
          }}>
            TEST MODE
          </span>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 14px', borderRadius: '7px',
            background: '#fff', border: '1px solid #e3e8ef',
            fontSize: '13px', fontWeight: '500', color: '#30313d',
            cursor: 'pointer',
          }}>
            <RefreshCw size={13} />
            Refresh
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'flex', gap: '14px', marginBottom: '22px' }}>
        <MetricCard label="Net volume" value="$45,823.00" trend={12.4} trendLabel="vs last month" accent />
        <MetricCard label="Gross volume" value="$48,201.00" note="this month" />
        <MetricCard label="Successful charges" value="1,247" trend={8.1} trendLabel="vs last month" />
        <MetricCard label="Refunds" value="$342.00" trend={-2.3} trendLabel="vs last month" />
      </div>

      {/* Revenue Chart */}
      <div style={{
        background: '#fff', borderRadius: '10px', padding: '20px 22px',
        marginBottom: '22px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#30313d' }}>Revenue</h2>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#697386' }}>Net volume · March 2026</p>
          </div>
          <div style={{ display: 'flex', background: '#f0f2f5', borderRadius: '7px', padding: '2px', gap: '2px' }}>
            {['week', 'month', 'quarter', 'year'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                style={{
                  padding: '4px 11px', borderRadius: '5px', border: 'none',
                  cursor: 'pointer', fontSize: '12px', fontWeight: '500',
                  background: period === p ? '#fff' : 'transparent',
                  color: period === p ? '#30313d' : '#697386',
                  boxShadow: period === p ? '0 1px 3px rgba(0,0,0,0.10)' : 'none',
                  transition: 'all 0.12s', textTransform: 'capitalize',
                }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <RevenueChart period={period} />
      </div>

      {/* Recent Payments */}
      <div style={{
        background: '#fff', borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        marginBottom: '22px', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#30313d' }}>Recent payments</h2>
          <a href="#/payments" style={{ fontSize: '12.5px', color: ACCENT, textDecoration: 'none', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '3px' }}>
            View all <ArrowUpRight size={13} />
          </a>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              {['Amount', 'Status', 'Customer', 'Date', 'Method'].map(h => (
                <th key={h} style={{
                  padding: '9px 14px', textAlign: h === 'Amount' ? 'right' : 'left',
                  fontSize: '11px', fontWeight: '600', color: '#697386',
                  borderBottom: '1px solid #f0f2f5', letterSpacing: '0.3px', textTransform: 'uppercase',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentPayments.map((p, i) => (
              <tr
                key={p.id}
                style={{ borderBottom: i < recentPayments.length - 1 ? '1px solid #f0f2f5' : 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = '#f9f9f9'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '11px 14px', textAlign: 'right', fontFamily: 'monospace', fontSize: '13px', fontWeight: '600', color: '#30313d' }}>
                  {fmtAmount(p.amount)}
                </td>
                <td style={{ padding: '11px 14px' }}><StatusBadge status={p.status} /></td>
                <td style={{ padding: '11px 14px', fontSize: '13px', color: '#30313d' }}>
                  <div style={{ fontWeight: '500' }}>{p.customer}</div>
                  <div style={{ fontSize: '11.5px', color: '#697386' }}>{p.email}</div>
                </td>
                <td style={{ padding: '11px 14px', fontSize: '12.5px', color: '#697386', whiteSpace: 'nowrap' }}>{p.date}</td>
                <td style={{ padding: '11px 14px', fontSize: '12.5px', color: '#697386' }}>
                  {p.method} ••{p.last4}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Failed Payments Alert */}
      {failedPayments.length > 0 && (
        <div style={{
          background: '#fff', borderRadius: '10px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)', overflow: 'hidden',
        }}>
          <div style={{
            padding: '14px 22px', borderBottom: '1px solid #fde8e8',
            background: '#fff9f9',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <AlertTriangle size={15} color="#c0392b" />
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#c0392b' }}>
              Failed payments requiring attention
            </h2>
          </div>
          <div style={{ padding: '12px 22px 16px' }}>
            <p style={{ margin: '0 0 12px', fontSize: '13px', color: '#697386' }}>
              {failedPayments.length} charge{failedPayments.length !== 1 ? 's' : ''} failed recently. Review and retry or contact the customer.
            </p>
            {failedPayments.map((p, i) => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '12px 16px', borderRadius: '8px',
                background: '#fef2f2', border: '1px solid #fde8e8',
                marginBottom: i < failedPayments.length - 1 ? '8px' : 0,
              }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#30313d' }}>{p.customer}</div>
                  <div style={{ fontSize: '12px', color: '#697386', marginTop: '2px' }}>{p.description} · {p.date}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: '700', color: '#c0392b' }}>
                    {fmtAmount(p.amount)}
                  </span>
                  <button style={{
                    padding: '5px 12px', borderRadius: '6px',
                    background: '#fff', border: '1px solid #e3e8ef',
                    fontSize: '12px', fontWeight: '500', color: '#30313d',
                    cursor: 'pointer',
                  }}>
                    Retry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
