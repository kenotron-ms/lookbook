import { useState } from 'react'
import {
  Hash, UserPlus, Search, PhoneCall, Info,
  Smile, Reply, Forward, MoreHorizontal, Bold, Italic,
  List, Link, Code, Paperclip, AtSign, Film, Send,
  MessageSquare, ChevronRight,
} from 'lucide-react'
import { MESSAGES, USERS, CHANNELS, CURRENT_USER } from '../data/workspace'

const CHANNEL = CHANNELS.find(c => c.name === 'general')

const S = {
  root: { display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' },
  header: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 20px', height: 56, borderBottom: '1px solid #e8e8e8',
    flexShrink: 0, background: '#fff',
  },
  headerTitle: { fontWeight: 700, fontSize: 16, color: '#1d1c1d', display: 'flex', alignItems: 'center', gap: 4 },
  headerDesc: { color: '#616061', fontSize: 13, marginLeft: 4 },
  headerActions: { marginLeft: 'auto', display: 'flex', gap: 4, alignItems: 'center' },
  iconBtn: {
    width: 30, height: 30, borderRadius: 6, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061',
    border: '1px solid #e8e8e8',
  },
  feed: { flex: 1, overflowY: 'auto', padding: '16px 0 8px' },
  msgGroup: { padding: '4px 20px 4px', position: 'relative' },
  msgGroupHover: {},
  avatar: (color) => ({
    width: 36, height: 36, borderRadius: 8, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: '#fff', flexShrink: 0,
  }),
  userName: { fontWeight: 700, fontSize: 14, color: '#1d1c1d' },
  ts: { fontSize: 12, color: '#616061', marginLeft: 6 },
  msgRow: { display: 'flex', gap: 12, marginBottom: 2 },
  msgBody: { flex: 1 },
  msgText: { fontSize: 14, color: '#1d1c1d', lineHeight: 1.55 },
  mention: { color: '#1264a3', background: 'rgba(18,100,163,0.08)', borderRadius: 3, padding: '0 2px', fontWeight: 600 },
  reactions: { display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4 },
  reactionPill: {
    display: 'flex', alignItems: 'center', gap: 4, fontSize: 12,
    background: '#f8f8f8', border: '1px solid #e8e8e8', borderRadius: 99,
    padding: '2px 8px', cursor: 'pointer', color: '#1d1c1d', fontWeight: 500,
  },
  threadLink: {
    display: 'flex', alignItems: 'center', gap: 6, marginTop: 6,
    fontSize: 13, color: '#1264a3', cursor: 'pointer', fontWeight: 500,
  },
  attachment: {
    marginTop: 6, borderRadius: 8, overflow: 'hidden', border: '1px solid #e8e8e8',
    maxWidth: 360,
  },
  attachPreview: (color) => ({
    height: 64, background: `linear-gradient(135deg, ${color}22, ${color}44)`,
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
  }),
  attachInfo: { padding: '8px 12px', background: '#fff', display: 'flex', gap: 8, alignItems: 'center' },
  attachName: { fontWeight: 600, fontSize: 13, color: '#1d1c1d' },
  attachSize: { fontSize: 12, color: '#616061' },
  unfurl: {
    marginTop: 6, borderRadius: 8, border: '1px solid #e8e8e8',
    borderLeft: '4px solid #4a154b', padding: '10px 14px', maxWidth: 420,
    background: '#fff',
  },
  unfurlTitle: { fontWeight: 700, fontSize: 14, color: '#1264a3', cursor: 'pointer' },
  unfurlDesc: { fontSize: 13, color: '#616061', marginTop: 3, lineHeight: 1.4 },
  unfurlUrl: { fontSize: 11, color: '#9e9e9e', marginTop: 4 },
  hoverMenu: {
    position: 'absolute', right: 20, top: 4,
    display: 'flex', gap: 2, background: '#fff',
    border: '1px solid #e8e8e8', borderRadius: 8,
    padding: '2px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  },
  hoverBtn: {
    width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061',
  },
  dayDivider: {
    display: 'flex', alignItems: 'center', gap: 10, margin: '12px 20px 8px',
    color: '#616061', fontSize: 12, fontWeight: 600,
  },
  dayLine: { flex: 1, height: 1, background: '#e8e8e8' },
  inputArea: {
    padding: '12px 20px 16px', borderTop: '1px solid #e8e8e8',
    flexShrink: 0, background: '#fff',
  },
  inputBox: {
    border: '1px solid #d6d6d6', borderRadius: 10, overflow: 'hidden',
  },
  toolbar: {
    display: 'flex', gap: 2, padding: '6px 8px',
    borderBottom: '1px solid #e8e8e8', background: '#f8f8f8',
  },
  toolBtn: {
    width: 28, height: 28, borderRadius: 5, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061',
  },
  toolDivider: { width: 1, background: '#e8e8e8', margin: '4px 2px', alignSelf: 'stretch' },
  textArea: {
    width: '100%', border: 'none', outline: 'none', padding: '10px 12px',
    fontSize: 14, color: '#1d1c1d', resize: 'none', minHeight: 44,
    background: '#fff', fontFamily: 'inherit',
  },
  inputFooter: {
    display: 'flex', alignItems: 'center', padding: '4px 8px', gap: 4, background: '#fff',
  },
  sendBtn: {
    marginLeft: 'auto', background: '#4a154b', color: '#fff', border: 'none',
    borderRadius: 7, padding: '6px 14px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
  },
}

function Avatar({ user }) {
  return <div style={S.avatar(user.color)}>{user.avatar}</div>
}

function MsgText({ text, mention }) {
  if (mention) {
    const parts = text.split(/(@\w+)/g)
    return (
      <span style={S.msgText}>
        {parts.map((p, i) =>
          p.startsWith('@') ? <span key={i} style={S.mention}>{p}</span> : p
        )}
      </span>
    )
  }
  return <span style={S.msgText}>{text}</span>
}

function MessageGroup({ messages }) {
  const [hovered, setHovered] = useState(false)
  const first = messages[0]
  const user = USERS.find(u => u.id === first.userId)

  return (
    <div
      style={{ ...S.msgGroup, background: hovered ? '#f8f8f8' : 'transparent', borderRadius: 8, transition: 'background 0.1s', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div style={S.hoverMenu}>
          <div style={S.hoverBtn}><Smile size={14} /></div>
          <div style={S.hoverBtn}><Reply size={14} /></div>
          <div style={S.hoverBtn}><Forward size={14} /></div>
          <div style={S.hoverBtn}><MoreHorizontal size={14} /></div>
        </div>
      )}
      {messages.map((msg, i) => (
        <div key={msg.id} style={{ ...S.msgRow, marginTop: i === 0 ? 0 : 2 }}>
          {i === 0
            ? <Avatar user={user} />
            : <div style={{ width: 36, flexShrink: 0 }} />
          }
          <div style={S.msgBody}>
            {i === 0 && (
              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 2 }}>
                <span style={S.userName}>{user.name}</span>
                <span style={S.ts}>{msg.timestamp}</span>
              </div>
            )}
            <MsgText text={msg.text} mention={msg.mention} />
            {/* Attachment */}
            {msg.attachment && (
              <div style={S.attachment}>
                <div style={S.attachPreview(msg.attachment.color)}>📄</div>
                <div style={S.attachInfo}>
                  <div>
                    <div style={S.attachName}>{msg.attachment.name}</div>
                    <div style={S.attachSize}>{msg.attachment.size}</div>
                  </div>
                </div>
              </div>
            )}
            {/* Unfurl */}
            {msg.unfurl && (
              <div style={S.unfurl}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 16 }}>{msg.unfurl.favicon}</span>
                  <span style={S.unfurlTitle}>{msg.unfurl.title}</span>
                </div>
                <div style={S.unfurlDesc}>{msg.unfurl.description}</div>
                <div style={S.unfurlUrl}>{msg.unfurl.url}</div>
              </div>
            )}
            {/* Reactions */}
            {msg.reactions && msg.reactions.length > 0 && (
              <div style={S.reactions}>
                {msg.reactions.map((r, ri) => (
                  <div key={ri} style={S.reactionPill}>
                    <span>{r.emoji}</span>
                    <span style={{ color: '#616061' }}>{r.count}</span>
                  </div>
                ))}
              </div>
            )}
            {/* Thread replies */}
            {msg.replies && (
              <div style={S.threadLink}>
                <MessageSquare size={14} />
                <span style={{ color: '#1264a3' }}>{msg.replies.count} {msg.replies.count === 1 ? 'reply' : 'replies'}</span>
                <span style={{ color: '#9e9e9e', fontSize: 12 }}>· Last reply {msg.replies.lastReply}</span>
                <ChevronRight size={14} color="#1264a3" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ChannelView() {
  // Group messages by consecutive same-user runs
  const groups = []
  let current = null
  for (const msg of MESSAGES) {
    if (current && current[0].userId === msg.userId && !msg.attachment && !msg.unfurl && !msg.replies && !current[current.length - 1].replies) {
      current.push(msg)
    } else {
      current = [msg]
      groups.push(current)
    }
  }

  return (
    <div style={S.root}>
      {/* Channel Header */}
      <div style={S.header}>
        <Hash size={18} color="#616061" />
        <div>
          <div style={S.headerTitle}>
            general
            <Info size={14} color="#9e9e9e" style={{ marginLeft: 4 }} />
          </div>
          <div style={S.headerDesc}>General chatter and announcements</div>
        </div>
        <div style={S.headerActions}>
          <div style={{ ...S.iconBtn, background: '#f8f8f8', border: '1px solid #e8e8e8', padding: '4px 10px', borderRadius: 20, display: 'flex', gap: 6, alignItems: 'center', width: 'auto', fontSize: 12, color: '#616061' }}>
            <Search size={13} /> Search
          </div>
          <div style={{ width: 8 }} />
          <div style={S.iconBtn}><UserPlus size={15} /></div>
          <div style={S.iconBtn}><PhoneCall size={15} /></div>
        </div>
      </div>

      {/* Message Feed */}
      <div style={S.feed} className="main-scroll">
        {/* Day divider */}
        <div style={S.dayDivider}>
          <div style={S.dayLine} />
          <span>Today</span>
          <div style={S.dayLine} />
        </div>
        {groups.map((group, i) => (
          <MessageGroup key={i} messages={group} />
        ))}
      </div>

      {/* Message Input */}
      <div style={S.inputArea}>
        <div style={S.inputBox}>
          <div style={S.toolbar}>
            <div style={S.toolBtn}><Bold size={14} /></div>
            <div style={S.toolBtn}><Italic size={14} /></div>
            <div style={S.toolDivider} />
            <div style={S.toolBtn}><List size={14} /></div>
            <div style={S.toolBtn}><Link size={14} /></div>
            <div style={S.toolBtn}><Code size={14} /></div>
          </div>
          <textarea
            style={S.textArea}
            placeholder={`Message #general`}
            rows={2}
          />
          <div style={S.inputFooter}>
            <div style={S.toolBtn}><Smile size={17} /></div>
            <div style={S.toolBtn}><Paperclip size={17} /></div>
            <div style={S.toolBtn}><AtSign size={17} /></div>
            <div style={S.toolBtn}><Film size={17} /></div>
            <button style={S.sendBtn}>
              <Send size={14} /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
