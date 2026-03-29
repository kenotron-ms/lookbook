import { useNavigate, useLocation } from 'react-router-dom'
import {
  MessageSquare, Hash, ChevronDown, Plus, Headphones,
  Settings, Circle, Bell, BellOff, FileText, Send,
  AtSign, Users, UserPlus,
} from 'lucide-react'
import { CHANNELS, USERS, DM_CONVERSATIONS, CURRENT_USER } from '../data/workspace'

const S = {
  sidebar: {
    width: 260, minWidth: 260, background: '#3f0e40',
    display: 'flex', flexDirection: 'column', height: '100%',
    userSelect: 'none', overflow: 'hidden',
  },
  header: {
    padding: '12px 16px 8px', borderBottom: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  workspaceName: {
    color: '#fff', fontWeight: 700, fontSize: 15, display: 'flex',
    alignItems: 'center', gap: 4, cursor: 'pointer',
  },
  statusBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
    background: 'rgba(255,255,255,0.08)', marginTop: 8,
    color: '#d1d2d3', fontSize: 12,
  },
  addBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '4px 10px', borderRadius: 6, cursor: 'pointer',
    color: '#d1d2d3', fontSize: 12, marginTop: 4,
  },
  nav: { flex: 1, overflowY: 'auto', padding: '6px 0' },
  navItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '4px 16px', cursor: 'pointer', borderRadius: 6,
    margin: '1px 8px', fontSize: 14, fontWeight: active ? 700 : 400,
    background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    color: active ? '#fff' : '#d1d2d3',
    transition: 'background 0.1s',
  }),
  sectionLabel: {
    fontSize: 12, fontWeight: 700, color: 'rgba(209,210,211,0.5)',
    padding: '12px 16px 4px', textTransform: 'uppercase', letterSpacing: '0.05em',
    display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer',
  },
  divider: {
    borderTop: '1px solid rgba(255,255,255,0.08)', margin: '6px 12px',
  },
  unreadBadge: {
    marginLeft: 'auto', background: '#e01e5a', color: '#fff',
    borderRadius: 99, fontSize: 11, fontWeight: 700,
    padding: '0px 5px', minWidth: 18, textAlign: 'center',
  },
  dmItem: (active) => ({
    display: 'flex', alignItems: 'center', gap: 8,
    padding: '4px 16px', cursor: 'pointer', borderRadius: 6,
    margin: '1px 8px', fontSize: 14,
    background: active ? 'rgba(255,255,255,0.15)' : 'transparent',
    color: active ? '#fff' : '#d1d2d3',
  }),
  avatar: (color) => ({
    width: 22, height: 22, borderRadius: 5, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0, position: 'relative',
  }),
  onlineDot: (online) => ({
    width: 8, height: 8, borderRadius: '50%',
    background: online ? '#2bac76' : 'transparent',
    border: online ? '2px solid #3f0e40' : '2px solid rgba(209,210,211,0.4)',
    position: 'absolute', bottom: -2, right: -2,
  }),
  footer: {
    padding: '8px 12px', borderTop: '1px solid rgba(255,255,255,0.08)',
    display: 'flex', alignItems: 'center', gap: 8,
  },
  footerAvatar: {
    width: 30, height: 30, borderRadius: 8, background: '#4a154b',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, color: '#fff', border: '2px solid #611f69',
    position: 'relative', flexShrink: 0,
  },
  footerName: { color: '#fff', fontSize: 13, fontWeight: 600, flex: 1 },
  iconBtn: {
    color: '#d1d2d3', cursor: 'pointer', padding: 4, borderRadius: 4,
    display: 'flex', alignItems: 'center',
  },
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const path = location.pathname

  const navLink = (label, icon, to) => {
    const active = path === to
    return (
      <div key={to} style={S.navItem(active)} onClick={() => navigate(to)}>
        {icon}
        <span style={{ flex: 1 }}>{label}</span>
      </div>
    )
  }

  return (
    <div style={S.sidebar}>
      {/* Workspace Header */}
      <div style={S.header}>
        <div style={{ flex: 1 }}>
          <div style={S.workspaceName}>
            <MessageSquare size={16} color="#e01e5a" style={{ flexShrink: 0 }} />
            ParaNet HQ
            <ChevronDown size={14} color="rgba(255,255,255,0.6)" />
          </div>

          <div style={S.statusBtn}>
            <Circle size={10} fill="#2bac76" color="#2bac76" />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {CURRENT_USER.status}
            </span>
          </div>

          <div style={S.addBtn}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', border: '1.5px solid rgba(209,210,211,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={11} />
            </div>
            Add...
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={S.nav}>
        {navLink('Threads', <AtSign size={16} />, '/threads')}
        {navLink('All Unreads', <Bell size={16} />, '/unreads')}
        {navLink('Drafts & Sent', <Send size={16} />, '/drafts')}
        {navLink('Canvas', <FileText size={16} />, '/canvas')}

        {/* Channels */}
        <div style={S.divider} />
        <div style={S.sectionLabel}>
          <ChevronDown size={12} /> Channels
        </div>

        {CHANNELS.map(ch => {
          const active = path === '/' && ch.name === 'general'
          return (
            <div key={ch.id} style={S.navItem(active)} onClick={() => navigate('/')}>
              <Hash size={15} />
              <span style={{ flex: 1 }}>{ch.name}</span>
              {ch.unread > 0 && !active && (
                <span style={S.unreadBadge}>{ch.unread}</span>
              )}
            </div>
          )
        })}

        <div style={{ ...S.navItem(false), color: 'rgba(209,210,211,0.55)', fontSize: 13 }}>
          <Plus size={14} />
          Add a channel
        </div>

        {/* Direct Messages */}
        <div style={S.divider} />
        <div style={S.sectionLabel}>
          <ChevronDown size={12} /> Direct messages
        </div>

        {DM_CONVERSATIONS.map(dm => {
          const user = USERS.find(u => u.id === dm.userId)
          const active = path === '/dm' && dm.userId === 'u2'
          return (
            <div key={dm.id} style={S.dmItem(active)} onClick={() => navigate('/dm')}>
              <div style={S.avatar(user.color)}>
                {user.avatar}
                <div style={S.onlineDot(user.online)} />
              </div>
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name}
              </span>
              {dm.unread > 0 && <span style={S.unreadBadge}>{dm.unread}</span>}
            </div>
          )
        })}

        <div style={{ ...S.dmItem(false), color: 'rgba(209,210,211,0.55)', fontSize: 13 }} onClick={() => navigate('/settings')}>
          <UserPlus size={14} />
          Add teammates
        </div>
      </div>

      {/* Footer */}
      <div style={S.footer}>
        <div style={S.footerAvatar}>
          {CURRENT_USER.avatar}
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#2bac76', border: '2px solid #3f0e40', position: 'absolute', bottom: -1, right: -1 }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={S.footerName}>{CURRENT_USER.name}</div>
          <div style={{ color: 'rgba(209,210,211,0.6)', fontSize: 11 }}>{CURRENT_USER.status}</div>
        </div>
        <div style={S.iconBtn}><Headphones size={16} /></div>
        <div style={S.iconBtn} onClick={() => navigate('/settings')}><Settings size={16} /></div>
      </div>
    </div>
  )
}
