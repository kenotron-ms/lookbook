import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CreditCard, Home, DollarSign, Layers, Users, BarChart2,
  Link2, AppWindow, RefreshCw, FileText, Receipt,
  Key, Webhook, ScrollText, Zap, Settings,
} from 'lucide-react'

const ACCENT = '#635bff'

function NavItem({ to, icon: Icon, label, end = false, devSection = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 10px',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: isActive ? '500' : '400',
        color: isActive ? ACCENT : '#30313d',
        background: isActive ? 'rgba(99,91,255,0.08)' : 'transparent',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'background 0.12s, color 0.12s',
      })}
    >
      {({ isActive }) => (
        <>
          <Icon size={14} color={isActive ? ACCENT : '#697386'} />
          {label}
        </>
      )}
    </NavLink>
  )
}

function Section({ label, children }) {
  return (
    <div style={{ marginBottom: '2px' }}>
      <div style={{
        fontSize: '10.5px',
        fontWeight: '600',
        color: '#9ba4b0',
        padding: '10px 10px 3px',
        textTransform: 'uppercase',
        letterSpacing: '0.6px',
      }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {children}
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [mode, setMode] = useState('test')

  return (
    <aside style={{
      width: '220px',
      minWidth: '220px',
      height: '100vh',
      background: '#ffffff',
      borderRight: '1px solid #e3e8ef',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{ padding: '18px 14px 12px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #f0f2f5' }}>
        <div style={{
          width: '30px', height: '30px',
          background: ACCENT,
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <CreditCard size={16} color="#fff" />
        </div>
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#30313d', letterSpacing: '-0.2px' }}>Ledger</span>
      </div>

      {/* Mode Toggle */}
      <div style={{ padding: '12px 14px 10px' }}>
        <div style={{
          display: 'flex',
          background: '#f0f2f5',
          borderRadius: '8px',
          padding: '3px',
          gap: '2px',
        }}>
          {[
            { key: 'test', label: 'Test' },
            { key: 'live', label: 'Live' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setMode(key)}
              style={{
                flex: 1,
                padding: '4px 6px',
                borderRadius: '6px',
                fontSize: '11.5px',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                background: mode === key ? '#ffffff' : 'transparent',
                color: mode === key
                  ? (key === 'test' ? '#b08500' : '#30313d')
                  : '#697386',
                boxShadow: mode === key ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>
        {mode === 'test' && (
          <div style={{
            marginTop: '6px',
            fontSize: '10.5px',
            color: '#b08500',
            background: '#fff8e1',
            border: '1px solid #fce08a',
            borderRadius: '4px',
            padding: '3px 7px',
            textAlign: 'center',
            fontWeight: '500',
          }}>
            ⚠ Test mode — no real charges
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '4px 8px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <NavItem to="/" icon={Home} label="Home" end />

        <Section label="Payments">
          <NavItem to="/payments" icon={DollarSign} label="Payments" />
          <NavItem to="/balances" icon={Layers} label="Balances" />
          <NavItem to="/customers" icon={Users} label="Customers" />
          <NavItem to="/reports" icon={BarChart2} label="Reports" />
        </Section>

        <Section label="Connect">
          <NavItem to="/accounts" icon={Link2} label="Accounts" />
          <NavItem to="/applications" icon={AppWindow} label="Applications" />
        </Section>

        <Section label="Products">
          <NavItem to="/subscriptions" icon={RefreshCw} label="Subscriptions" />
          <NavItem to="/invoices" icon={FileText} label="Invoices" />
          <NavItem to="/tax" icon={Receipt} label="Tax" />
        </Section>

        <Section label="Developers">
          <NavItem to="/developers" icon={Key} label="API Keys" />
          <NavItem to="/developers" icon={Webhook} label="Webhooks" />
          <NavItem to="/developers" icon={ScrollText} label="Logs" />
          <NavItem to="/developers" icon={Zap} label="Events" />
        </Section>
      </nav>

      {/* Settings */}
      <div style={{ padding: '10px 8px 14px', borderTop: '1px solid #e3e8ef' }}>
        <NavLink
          to="/settings"
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '6px 10px', borderRadius: '6px',
            color: '#697386', textDecoration: 'none',
            fontSize: '13px', fontWeight: '400',
            transition: 'background 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <Settings size={14} color="#697386" />
          Settings
        </NavLink>
      </div>
    </aside>
  )
}
