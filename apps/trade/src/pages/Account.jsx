import { ChevronRight, FileText, Clock, Building2, Settings, TrendingUp } from 'lucide-react'
import { portfolioValue } from '../data/stocks.js'

function PieChart() {
  const slices = [
    { color: '#00c805', pct: 42, label: 'Tech' },
    { color: '#3b82f6', pct: 28, label: 'Finance' },
    { color: '#f59e0b', pct: 18, label: 'Consumer' },
    { color: '#8b5cf6', pct: 12, label: 'Crypto' },
  ]

  const r = 60
  const cx = 70
  const cy = 70
  let angle = -90

  const paths = slices.map(slice => {
    const start = angle
    const end = angle + (slice.pct / 100) * 360
    const startRad = (start * Math.PI) / 180
    const endRad = (end * Math.PI) / 180
    const x1 = cx + r * Math.cos(startRad)
    const y1 = cy + r * Math.sin(startRad)
    const x2 = cx + r * Math.cos(endRad)
    const y2 = cy + r * Math.sin(endRad)
    const largeArc = end - start > 180 ? 1 : 0
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`
    angle = end
    return { d, color: slice.color, label: slice.label, pct: slice.pct }
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill={p.color} stroke="#fff" strokeWidth="2" />
        ))}
        <circle cx={cx} cy={cy} r="30" fill="#fff" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {paths.map((p, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: '#4b5563' }}>{p.label}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginLeft: 'auto' }}>{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function MenuRow({ icon: Icon, label, sublabel, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 14,
      padding: '14px 16px', borderBottom: '1px solid #f0f0f0', cursor: 'pointer',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#f9fafb'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: accent ? '#00c80518' : '#f3f4f6',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={18} color={accent ? '#00c805' : '#6b7280'} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{label}</div>
        {sublabel && <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1 }}>{sublabel}</div>}
      </div>
      <ChevronRight size={18} color="#d1d5db" />
    </div>
  )
}

function StatCard({ label, value, sub, positive }) {
  return (
    <div style={{
      flex: 1, padding: '14px 12px', borderRadius: 12,
      border: '1px solid #f0f0f0', background: '#fafafa',
    }}>
      <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: 4 }}>{label}</div>
      <div style={{
        fontSize: 17, fontWeight: 700,
        color: positive === undefined ? '#1a1a1a' : positive ? '#00c805' : '#ef4444',
      }}>
        {value}
      </div>
      {sub && <div style={{ fontSize: 10, color: '#9ca3af', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

export default function Account() {
  const portfolioStr = portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const buyingPower = (portfolioValue * 0.12).toFixed(2)

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ padding: '56px 16px 24px', background: '#1a1a1a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%',
            background: '#00c805',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingUp size={24} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Jordan Parker</div>
            <div style={{ fontSize: 13, color: '#9ca3af' }}>Trade Gold Member</div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span style={{
              fontSize: 11, fontWeight: 700, color: '#1a1a1a',
              background: '#00c805', borderRadius: 6, padding: '3px 8px',
            }}>GOLD</span>
          </div>
        </div>

        {/* Account value row */}
        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Portfolio Value</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>${portfolioStr}</div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 2 }}>Buying Power</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>${buyingPower}</div>
          </div>
        </div>
      </div>

      {/* Performance metrics */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Performance</div>
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <StatCard label="Total Return" value="+$2,847.23" sub="Since inception" positive={true} />
          <StatCard label="Today's P&L" value="+$234.56" sub="1.83%" positive={true} />
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <StatCard label="Ann. Return" value="+24.7%" sub="vs 18.2% S&P 500" positive={true} />
          <StatCard label="Positions" value="11" sub="Stocks + Crypto" />
        </div>
      </div>

      {/* Allocation chart */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>Allocation</div>
        <div style={{
          padding: 16, border: '1px solid #f0f0f0', borderRadius: 14,
        }}>
          <PieChart />
        </div>
      </div>

      {/* Menu items */}
      <div style={{ marginTop: 24, borderTop: '1px solid #f0f0f0' }}>
        <div style={{ padding: '12px 16px 4px' }}>
          <span style={{ fontSize: 12, color: '#9ca3af', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>Account</span>
        </div>
        <MenuRow icon={FileText} label="Tax Documents" sublabel="1099 forms available" />
        <MenuRow icon={Clock} label="History" sublabel="All transactions" />
        <MenuRow icon={Building2} label="Linked Bank" sublabel="Chase ••••4821" />
        <MenuRow icon={TrendingUp} label="Trade Gold" sublabel="Manage subscription" accent={true} />
        <MenuRow icon={Settings} label="Settings" sublabel="Notifications, security" />
      </div>

      {/* Footer */}
      <div style={{ padding: '24px 16px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, color: '#9ca3af', lineHeight: 1.7 }}>
          Trade is a member of the ParaNet Financial Network. Securities are offered through ParaNet Securities LLC.
          Cryptocurrency trading offered through ParaNet Crypto LLC.
        </div>
        <button style={{
          marginTop: 16, padding: '10px 24px', borderRadius: 8,
          background: 'none', border: '1px solid #f0f0f0',
          color: '#ef4444', fontWeight: 600, fontSize: 13, cursor: 'pointer',
        }}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
