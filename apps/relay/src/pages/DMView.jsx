import { useState } from 'react'
import {
  PhoneCall, Video, Search, Info, Smile, Paperclip,
  AtSign, Film, Send, Bold, Italic, List, Link, Code,
  MoreHorizontal, Reply, Forward,
} from 'lucide-react'
import { USERS, DM_CONVERSATIONS, CURRENT_USER } from '../data/workspace'

const DM = DM_CONVERSATIONS[0]
const OTHER_USER = USERS.find(u => u.id === DM.userId)

const S = {
  root: { display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' },
  header: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '0 20px', height: 56, borderBottom: '1px solid #e8e8e8', flexShrink: 0,
  },
  avatarWrap: { position: 'relative' },
  avatar: (color) => ({
    width: 34, height: 34, borderRadius: 8, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 700, color: '#fff',
  }),
  onlineDot: {
    width: 10, height: 10, borderRadius: '50%', background: '#2bac76',
    border: '2px solid #fff', position: 'absolute', bottom: -1, right: -1,
  },
  userName: { fontWeight: 700, fontSize: 16, color: '#1d1c1d' },
  userStatus: { fontSize: 12, color: '#616061', display: 'flex', alignItems: 'center', gap: 4 },
  activeIndicator: { width: 8, height: 8, borderRadius: '50%', background: '#2bac76' },
  headerActions: { marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' },
  iconBtn: {
    width: 30, height: 30, borderRadius: 6, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061', border: '1px solid #e8e8e8',
  },
  feed: { flex: 1, overflowY: 'auto', padding: '16px 20px 8px' },
  dateDiv: {
    display: 'flex', alignItems: 'center', gap: 10,
    margin: '12px 0 8px', color: '#616061', fontSize: 12, fontWeight: 600,
  },
  dateLine: { flex: 1, height: 1, background: '#e8e8e8' },
  msgRow: (isMe) => ({
    display: 'flex', gap: 10, marginBottom: 4,
    flexDirection: isMe ? 'row-reverse' : 'row',
    position: 'relative',
  }),
  avatarSm: (color) => ({
    width: 32, height: 32, borderRadius: 7, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 11, fontWeight: 700, color: '#fff', flexShrink: 0,
  }),
  bubble: (isMe) => ({
    maxWidth: 480, padding: '8px 12px', borderRadius: isMe ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
    background: isMe ? '#4a154b' : '#f8f8f8',
    color: isMe ? '#fff' : '#1d1c1d',
    fontSize: 14, lineHeight: 1.5, position: 'relative',
  }),
  bubbleMeta: (isMe) => ({
    fontSize: 11, color: '#9e9e9e', marginTop: 2,
    textAlign: isMe ? 'right' : 'left',
  }),
  reactions: { display: 'flex', gap: 4, marginTop: 4 },
  reactionPill: {
    display: 'flex', alignItems: 'center', gap: 3, fontSize: 11,
    background: '#f8f8f8', border: '1px solid #e8e8e8', borderRadius: 99,
    padding: '2px 6px', cursor: 'pointer',
  },
  inputArea: {
    padding: '12px 20px 16px', borderTop: '1px solid #e8e8e8', flexShrink: 0,
  },
  inputBox: { border: '1px solid #d6d6d6', borderRadius: 10, overflow: 'hidden' },
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
  inputFooter: { display: 'flex', alignItems: 'center', padding: '4px 8px', gap: 4 },
  sendBtn: {
    marginLeft: 'auto', background: '#4a154b', color: '#fff', border: 'none',
    borderRadius: 7, padding: '6px 14px', fontSize: 13, fontWeight: 600,
    cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
  },
}

function ChatBubble({ msg }) {
  const isMe = msg.userId === CURRENT_USER.id
  const user = isMe ? USERS.find(u => u.id === CURRENT_USER.id) || { color: '#4a154b', avatar: 'JB' } : OTHER_USER
  return (
    <div>
      <div style={S.msgRow(isMe)}>
        <div style={S.avatarSm(user.color)}>{user.avatar}</div>
        <div>
          <div style={S.bubble(isMe)}>{msg.text}</div>
          {msg.reactions && msg.reactions.length > 0 && (
            <div style={{ ...S.reactions, justifyContent: isMe ? 'flex-end' : 'flex-start' }}>
              {msg.reactions.map((r, i) => (
                <div key={i} style={S.reactionPill}>
                  <span>{r.emoji}</span>
                  <span style={{ color: '#616061' }}>{r.count}</span>
                </div>
              ))}
            </div>
          )}
          <div style={S.bubbleMeta(isMe)}>{msg.timestamp}</div>
        </div>
      </div>
    </div>
  )
}

export default function DMView() {
  return (
    <div style={S.root}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.avatarWrap}>
          <div style={S.avatar(OTHER_USER.color)}>{OTHER_USER.avatar}</div>
          <div style={S.onlineDot} />
        </div>
        <div>
          <div style={S.userName}>{OTHER_USER.name}</div>
          <div style={S.userStatus}>
            <div style={S.activeIndicator} /> Active now
          </div>
        </div>
        <div style={S.headerActions}>
          <div style={S.iconBtn}><PhoneCall size={15} /></div>
          <div style={S.iconBtn}><Video size={15} /></div>
          <div style={S.iconBtn}><Search size={15} /></div>
          <div style={S.iconBtn}><Info size={15} /></div>
        </div>
      </div>

      {/* Messages */}
      <div style={S.feed} className="main-scroll">
        <div style={S.dateDiv}>
          <div style={S.dateLine} />
          <span>Today</span>
          <div style={S.dateLine} />
        </div>
        {/* Profile card at top of DM */}
        <div style={{ textAlign: 'center', padding: '16px 0 24px' }}>
          <div style={{ ...S.avatar(OTHER_USER.color), width: 56, height: 56, borderRadius: 14, margin: '0 auto 10px', fontSize: 20 }}>
            {OTHER_USER.avatar}
          </div>
          <div style={{ fontWeight: 700, fontSize: 18, color: '#1d1c1d' }}>{OTHER_USER.name}</div>
          <div style={{ fontSize: 13, color: '#616061', marginTop: 4 }}>
            This is the very beginning of your direct message history with <strong>{OTHER_USER.name}</strong>.
          </div>
        </div>
        {DM.messages.map(msg => <ChatBubble key={msg.id} msg={msg} />)}
      </div>

      {/* Input */}
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
          <textarea style={S.textArea} placeholder={`Message ${OTHER_USER.name}`} rows={2} />
          <div style={S.inputFooter}>
            <div style={S.toolBtn}><Smile size={17} /></div>
            <div style={S.toolBtn}><Paperclip size={17} /></div>
            <div style={S.toolBtn}><AtSign size={17} /></div>
            <div style={S.toolBtn}><Film size={17} /></div>
            <button style={S.sendBtn}><Send size={14} /> Send</button>
          </div>
        </div>
      </div>
    </div>
  )
}
