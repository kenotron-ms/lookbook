import { useState } from 'react'
import { Hash, Volume2, Bell, Pin, ChevronDown, ChevronRight, Plus, Settings, Lock } from 'lucide-react'
import { channels } from '../data/server'

function VoiceMember({ member }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      padding: '2px 8px 2px 36px',
    }}>
      <div style={{
        width: '18px', height: '18px',
        borderRadius: '50%',
        background: member.avatarColor,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '8px', fontWeight: 700, color: '#fff', flexShrink: 0,
      }}>
        {member.avatar}
      </div>
      <span style={{ fontSize: '12px', color: '#80848e' }}>{member.avatar.toLowerCase()}</span>
    </div>
  )
}

function ChannelRow({ channel, isActive }) {
  const [hovered, setHovered] = useState(false)

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 8px',
          margin: '1px 8px',
          borderRadius: '6px',
          cursor: 'pointer',
          background: isActive ? '#404249' : (hovered ? '#35373c' : 'transparent'),
          color: isActive ? '#fff' : (hovered ? '#dbdee1' : '#80848e'),
          transition: 'background 0.1s',
          position: 'relative',
        }}
      >
        {channel.type === 'text' ? (
          <Hash size={16} style={{ flexShrink: 0, opacity: 0.7 }} />
        ) : (
          <Volume2 size={16} style={{ flexShrink: 0, opacity: 0.7 }} />
        )}
        <span style={{ fontSize: '15px', fontWeight: isActive ? 600 : 400, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {channel.name}
        </span>
        {channel.locked && <Lock size={12} style={{ opacity: 0.4 }} />}
        {hovered && channel.type === 'text' && (
          <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
            <Plus size={14} style={{ opacity: 0.6 }} />
          </div>
        )}
        {channel.type === 'voice' && channel.members && channel.members.length > 0 && !hovered && (
          <div style={{ display: 'flex', gap: '-2px', alignItems: 'center' }}>
            {channel.members.map((m, i) => (
              <div key={i} style={{
                width: '14px', height: '14px',
                borderRadius: '50%',
                background: m.avatarColor,
                border: '1px solid #2b2d31',
                marginLeft: i > 0 ? '-4px' : '0',
                flexShrink: 0,
              }} />
            ))}
          </div>
        )}
      </div>
      {channel.type === 'voice' && channel.members && channel.members.length > 0 && (
        <div style={{ marginBottom: '2px' }}>
          {channel.members.map((m, i) => <VoiceMember key={i} member={m} />)}
        </div>
      )}
    </>
  )
}

function Category({ cat }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div style={{ marginBottom: '8px' }}>
      <div
        onClick={() => setCollapsed(!collapsed)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px',
          cursor: 'pointer',
          color: '#80848e',
          fontSize: '11px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          userSelect: 'none',
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
        {cat.name}
        <Plus size={12} style={{ marginLeft: 'auto', opacity: 0.6 }} />
      </div>
      {!collapsed && cat.channels.map((ch) => (
        <ChannelRow key={ch.id} channel={ch} isActive={ch.active} />
      ))}
    </div>
  )
}

export default function ChannelList() {
  return (
    <div style={{
      width: '240px',
      minWidth: '240px',
      background: '#2b2d31',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Server header */}
      <div style={{
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        borderBottom: '1px solid #1e1f22',
        cursor: 'pointer',
        flexShrink: 0,
      }}>
        <span style={{ fontWeight: 700, fontSize: '15px', color: '#dbdee1', flex: 1 }}>Home Node</span>
        <div style={{ display: 'flex', gap: '6px', color: '#80848e' }}>
          <ChevronDown size={16} />
        </div>
      </div>

      {/* Channels scroll area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }} className="scrollbar-thin">
        {channels.categories.map((cat, i) => (
          <Category key={i} cat={cat} />
        ))}
      </div>
    </div>
  )
}
