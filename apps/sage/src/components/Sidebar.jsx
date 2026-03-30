import { useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import {
  MessageSquare, Search, Sliders, History, FolderOpen,
  Bookmark, Code2, SquarePen, ChevronRight, ChevronLeft,
  Building2,
} from 'lucide-react'
import db from '../db/index.js'

const USER_DISPLAY = {
  name: 'Ken Chau',
  initials: 'KC',
  org: 'Microsoft - MADE Explorations',
}

// ── NavItem ────────────────────────────────────────────────────────────────
// Full-width highlight (no border-radius), supports both routed + button modes
function NavItem({ to, icon: Icon, label, shortcut, collapsed, onClick }) {
  const [hover, setHover] = useState(false)

  const baseStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: collapsed ? '10px 0' : '10px 20px',
    justifyContent: collapsed ? 'center' : 'flex-start',
    fontSize: 15,
    color: '#1A1A1A',
    textDecoration: 'none',
    background: isActive || hover ? '#EFEFED' : 'transparent',
    fontWeight: isActive ? 500 : 400,
    transition: 'background 0.1s',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    boxSizing: 'border-box',
  })

  if (onClick) {
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={baseStyle(false)}
      >
        <Icon size={20} style={{ color: '#5F5F63', flexShrink: 0 }} />
        {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
        {!collapsed && shortcut && (
          <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400 }}>{shortcut}</span>
        )}
      </button>
    )
  }

  return (
    <NavLink
      to={to}
      style={({ isActive }) => baseStyle(isActive)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Icon size={20} style={{ color: '#5F5F63', flexShrink: 0 }} />
      {!collapsed && <span style={{ flex: 1 }}>{label}</span>}
      {!collapsed && shortcut && (
        <span style={{ fontSize: 12, color: '#9CA3AF', fontWeight: 400 }}>{shortcut}</span>
      )}
    </NavLink>
  )
}

// ── ConvoRow ───────────────────────────────────────────────────────────────
function ConvoRow({ convo, isActive, onClick }) {
  const [hover, setHover] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        padding: '6px 20px',
        cursor: 'pointer',
        fontSize: 14,
        color: '#1A1A1A',
        background: isActive ? '#EFEFED' : hover ? '#EFEFED' : 'transparent',
        fontWeight: isActive ? 500 : 400,
        transition: 'background 0.1s',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      }}
    >
      {convo.title}
    </div>
  )
}

// ── Sidebar ────────────────────────────────────────────────────────────────
export default function Sidebar({ collapsed = false, onToggleCollapse }) {
  const navigate = useNavigate()
  const { convoId } = useParams()
  const activeId = convoId ? Number(convoId) : null
  const [recentsHidden, setRecentsHidden] = useState(false)
  const [inviteHover, setInviteHover] = useState(false)
  const [profileHover, setProfileHover] = useState(false)

  const convos = useLiveQuery(
    () => db.conversations.orderBy('updatedAt').reverse().limit(20).toArray(),
    []
  )

  return (
    <div style={{
      width: collapsed ? 60 : 260,
      flexShrink: 0,
      height: '100vh',
      background: '#F8F8F6',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      transition: 'width 0.2s ease',
      // NO right border — same bg as main content
    }}>

      {/* ── Header ── */}
      <div style={{
        padding: collapsed ? '12px 0' : '12px 16px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        flexShrink: 0,
      }}>
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img
              src="./sage-logo.jpg"
              width={24}
              height={24}
              alt="Sage"
              style={{ borderRadius: 6, objectFit: 'cover' }}
            />
            <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: '#1A1A1A' }}>
              sage
            </span>
          </div>
        )}

        {collapsed && (
          <img
            src="./sage-logo.jpg"
            width={24}
            height={24}
            alt="Sage"
            style={{ borderRadius: 6, objectFit: 'cover' }}
          />
        )}

        {/* Toggle collapse button */}
        {!collapsed && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            style={{
              width: 32, height: 32, borderRadius: '50%',
              border: 'none', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#5F5F63',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#EFEFED' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            title="Collapse sidebar"
          >
            <ChevronLeft size={17} />
          </button>
        )}
      </div>

      {/* ── Collapsed: expand button ── */}
      {collapsed && onToggleCollapse && (
        <button
          onClick={onToggleCollapse}
          style={{
            width: '100%', padding: '10px 0',
            border: 'none', background: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#5F5F63',
            transition: 'background 0.1s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#EFEFED' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          <ChevronRight size={17} />
        </button>
      )}

      {/* ── Top nav items ── */}
      <div style={{ flexShrink: 0 }}>
        <NavItem
          icon={SquarePen}
          label="New chat"
          collapsed={collapsed}
          onClick={() => navigate('/')}
        />
        <NavItem
          icon={Search}
          label="Search"
          shortcut="⌘K"
          collapsed={collapsed}
          onClick={() => {}}
        />
        <NavItem
          icon={Sliders}
          label="Customize"
          collapsed={collapsed}
          onClick={() => {}}
        />
      </div>

      {/* ── Gap ── */}
      <div style={{ height: 8, flexShrink: 0 }} />

      {/* ── Section nav ── */}
      <div style={{ flexShrink: 0 }}>
        <NavItem to="/recents"   icon={History}    label="Chats"     collapsed={collapsed} />
        <NavItem to="/projects"  icon={FolderOpen} label="Projects"  collapsed={collapsed} />
        <NavItem to="/artifacts" icon={Bookmark}   label="Artifacts" collapsed={collapsed} />
        <NavItem to="/code"      icon={Code2}      label="Code"      collapsed={collapsed} />
      </div>

      {/* ── Recents list (expanded only) ── */}
      {!collapsed && (
        <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
          {/* Recents header */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 20px 4px',
          }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#9CA3AF' }}>Recents</span>
            <button
              onClick={() => setRecentsHidden(h => !h)}
              style={{
                fontSize: 13, color: '#9CA3AF', background: 'none',
                border: 'none', cursor: 'pointer', padding: 0,
                fontWeight: 400,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#707070' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#9CA3AF' }}
            >
              {recentsHidden ? 'Show' : 'Hide'}
            </button>
          </div>

          {/* Conversations list */}
          {!recentsHidden && (
            <div style={{ paddingBottom: 8 }}>
              {(convos || []).map(convo => (
                <ConvoRow
                  key={convo.id}
                  convo={convo}
                  isActive={convo.id === activeId}
                  onClick={() => navigate(`/c/${convo.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Spacer for collapsed mode */}
      {collapsed && <div style={{ flex: 1 }} />}

      {/* ── Bottom section ── */}
      {!collapsed && (
        <>
          {/* Invite team members */}
          <button
            onMouseEnter={() => setInviteHover(true)}
            onMouseLeave={() => setInviteHover(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              width: 'calc(100% - 16px)', margin: '0 8px 8px',
              padding: '12px 16px', borderRadius: 10,
              background: inviteHover ? '#E5E5E3' : '#EFEFED',
              border: 'none', fontSize: 14, fontWeight: 500,
              color: '#1A1A1A', cursor: 'pointer',
              transition: 'background 0.1s',
              flexShrink: 0,
            }}
          >
            <span>Invite team members</span>
            <ChevronRight size={15} style={{ color: '#9CA3AF' }} />
          </button>

          {/* User profile */}
          <div
            onMouseEnter={() => setProfileHover(true)}
            onMouseLeave={() => setProfileHover(false)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              cursor: 'pointer',
              borderTop: '1px solid #EEEEEE',
              background: profileHover ? '#EFEFED' : 'transparent',
              transition: 'background 0.1s',
              flexShrink: 0,
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              background: '#3D3D3D',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 14, fontWeight: 600,
              flexShrink: 0,
            }}>
              {USER_DISPLAY.initials}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A' }}>
                {USER_DISPLAY.name}
              </div>
              <div style={{
                fontSize: 12, color: '#707070',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>
                {USER_DISPLAY.org}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Collapsed: show avatar only */}
      {collapsed && (
        <div style={{
          display: 'flex', justifyContent: 'center',
          padding: '12px 0 16px',
          borderTop: '1px solid #EEEEEE',
          flexShrink: 0,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#3D3D3D',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 600,
            cursor: 'pointer',
          }}>
            {USER_DISPLAY.initials}
          </div>
        </div>
      )}
    </div>
  )
}
