import { Link, useLocation } from 'react-router-dom';
import {
  Briefcase, Search, Home, Users, BriefcaseBusiness,
  MessageSquare, Bell, User, Grid3X3, Star
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/network', icon: Users, label: 'Network' },
  { to: '/jobs', icon: BriefcaseBusiness, label: 'Jobs' },
  { to: '/messaging', icon: MessageSquare, label: 'Messaging' },
  { to: '/profile', icon: Bell, label: 'Notifications' },
];

export default function Header() {
  const location = useLocation();

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#ffffff',
        borderBottom: '1px solid #e0dfdc',
        height: '52px',
      }}
    >
      <div style={{
        maxWidth: '1128px',
        margin: '0 auto',
        padding: '0 16px',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px',
            background: '#0a66c2',
            borderRadius: '6px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Briefcase size={20} color="white" strokeWidth={2} />
          </div>
        </Link>

        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#eef3f8',
          border: '1px solid transparent',
          borderRadius: '4px',
          padding: '0 12px',
          height: '34px',
          width: '220px',
          flexShrink: 0,
        }}>
          <Search size={16} color="#666666" />
          <input
            placeholder="Search"
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: '14px', color: '#000000e6', width: '100%',
            }}
          />
        </div>

        <div style={{ flex: 1 }} />

        {/* Nav Icons */}
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  padding: '0 12px',
                  height: '52px',
                  minWidth: '60px',
                  borderBottom: active ? '2px solid #000000e6' : '2px solid transparent',
                  color: active ? '#000000e6' : '#666666',
                  gap: '3px',
                }}
              >
                <Icon size={20} strokeWidth={active ? 2.5 : 1.5} />
                <span style={{ fontSize: '11px', fontWeight: active ? 600 : 400 }}>{label}</span>
              </Link>
            );
          })}

          {/* Me */}
          <Link
            to="/profile"
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              padding: '0 12px',
              height: '52px',
              minWidth: '60px',
              borderBottom: location.pathname === '/profile' ? '2px solid #000000e6' : '2px solid transparent',
              color: location.pathname === '/profile' ? '#000000e6' : '#666666',
              gap: '3px',
            }}
          >
            <div style={{
              width: '22px', height: '22px', borderRadius: '50%',
              background: '#0a66c2',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <User size={13} color="white" />
            </div>
            <span style={{ fontSize: '11px' }}>Me ▾</span>
          </Link>

          {/* Divider */}
          <div style={{ width: '1px', height: '32px', background: '#e0dfdc', margin: '0 4px' }} />

          {/* Work */}
          <button style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            border: 'none', background: 'none', cursor: 'pointer',
            padding: '0 12px', height: '52px', minWidth: '60px',
            color: '#666666', gap: '3px',
          }}>
            <Grid3X3 size={20} strokeWidth={1.5} />
            <span style={{ fontSize: '11px' }}>Work ▾</span>
          </button>

          {/* Premium */}
          <a href="#" style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            padding: '0 12px', height: '52px', minWidth: '70px', gap: '3px',
          }}>
            <Star size={16} style={{ color: '#c8972a', fill: '#c8972a' }} />
            <span style={{ fontSize: '11px', color: '#c8972a', fontWeight: 600 }}>Try Premium</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
