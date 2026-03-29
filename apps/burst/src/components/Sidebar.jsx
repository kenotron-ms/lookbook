import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { followingChannels, recommendedChannels, formatViewers } from '../data/streams.js'

function ChannelRow({ channel, viewers, game, live, avatar, avatarColor, collapsed }) {
  return (
    <Link
      to="/watch"
      className="flex items-center gap-2.5 px-3 py-1.5 rounded mx-1 group transition-colors"
      style={{ textDecoration: 'none' }}
      onMouseEnter={(e) => (e.currentTarget.style.background = '#26262c')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {/* Avatar with live dot */}
      <div className="relative shrink-0">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
          style={{ background: avatarColor }}
        >
          {avatar}
        </div>
        {live && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
            style={{ background: '#e91916', borderColor: '#1f1f23' }}
          />
        )}
      </div>

      {!collapsed && (
        <>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate" style={{ color: '#efeff1' }}>
              {channel}
            </div>
            <div className="text-xs truncate" style={{ color: '#adadb8' }}>
              {game}
            </div>
          </div>
          {live && (
            <div className="text-xs shrink-0" style={{ color: '#adadb8' }}>
              {formatViewers(viewers)}
            </div>
          )}
        </>
      )}
    </Link>
  )
}

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className="flex flex-col shrink-0 overflow-hidden transition-all duration-200 h-full"
      style={{
        width: collapsed ? '56px' : '240px',
        background: '#1f1f23',
        borderRight: '1px solid #2a2a2f',
      }}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between px-3 py-2 shrink-0">
        {!collapsed && (
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#adadb8' }}>
            Following
          </span>
        )}
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="ml-auto p-1 rounded transition-colors"
          style={{ color: '#adadb8' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#efeff1'; e.currentTarget.style.background = '#26262c' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#adadb8'; e.currentTarget.style.background = 'transparent' }}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Following section */}
        <div className="mb-4">
          {!collapsed && (
            <div className="px-4 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#adadb8' }}>
                Live Channels
              </span>
            </div>
          )}
          {followingChannels.map((ch) => (
            <ChannelRow key={ch.id} {...ch} collapsed={collapsed} />
          ))}
        </div>

        {/* Recommended section */}
        <div>
          {!collapsed && (
            <div className="px-4 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#adadb8' }}>
                Recommended
              </span>
            </div>
          )}
          {recommendedChannels.map((ch) => (
            <ChannelRow key={ch.id} {...ch} collapsed={collapsed} />
          ))}
        </div>
      </div>
    </aside>
  )
}
