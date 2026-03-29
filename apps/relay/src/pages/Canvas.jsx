import { useState } from 'react'
import {
  FileText, Share2, MoreHorizontal, Bold, Italic, List,
  Link, Code, ChevronRight, Users, Clock, Edit3, Plus,
  Smile, AlignLeft,
} from 'lucide-react'
import { CANVAS_DOC, USERS } from '../data/workspace'

const S = {
  root: { display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' },
  header: {
    display: 'flex', alignItems: 'center', gap: 10, padding: '0 20px',
    height: 56, borderBottom: '1px solid #e8e8e8', flexShrink: 0,
  },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: 4, color: '#616061', fontSize: 13 },
  breadActive: { fontWeight: 700, color: '#1d1c1d' },
  headerActions: { marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' },
  shareBtn: {
    background: '#4a154b', color: '#fff', border: 'none', borderRadius: 7,
    padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 5,
  },
  iconBtn: {
    width: 30, height: 30, borderRadius: 6, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061', border: '1px solid #e8e8e8',
  },
  toolbar: {
    display: 'flex', gap: 2, padding: '8px 16px',
    borderBottom: '1px solid #e8e8e8', background: '#fafafa', flexShrink: 0, flexWrap: 'wrap',
  },
  toolBtn: {
    width: 30, height: 30, borderRadius: 5, display: 'flex', alignItems: 'center',
    justifyContent: 'center', cursor: 'pointer', color: '#616061', fontSize: 12, fontWeight: 600,
  },
  toolDivider: { width: 1, background: '#e8e8e8', margin: '4px 4px', alignSelf: 'stretch' },
  toolLabel: { display: 'flex', alignItems: 'center', gap: 4, padding: '0 6px', fontSize: 12, color: '#616061', cursor: 'pointer' },
  body: { flex: 1, overflowY: 'auto', padding: '40px 0' },
  page: { maxWidth: 720, margin: '0 auto', padding: '0 48px' },
  docTitle: {
    fontSize: 30, fontWeight: 800, color: '#1d1c1d', outline: 'none',
    border: 'none', width: '100%', marginBottom: 8,
    fontFamily: 'inherit', background: 'transparent',
  },
  docMeta: {
    display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28,
    paddingBottom: 16, borderBottom: '1px solid #f0f0f0',
  },
  metaItem: { display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#9e9e9e' },
  authorAvatar: (color) => ({
    width: 22, height: 22, borderRadius: 6, background: color,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 9, fontWeight: 700, color: '#fff',
  }),
  h1Block: { fontSize: 24, fontWeight: 800, color: '#1d1c1d', margin: '20px 0 8px', lineHeight: 1.2 },
  h2Block: { fontSize: 18, fontWeight: 700, color: '#1d1c1d', margin: '20px 0 6px', lineHeight: 1.3 },
  pBlock: { fontSize: 15, color: '#1d1c1d', lineHeight: 1.7, marginBottom: 10 },
  bullet: {
    display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6,
    fontSize: 15, color: '#1d1c1d', lineHeight: 1.6, paddingLeft: 8,
  },
  bulletDot: {
    width: 6, height: 6, borderRadius: '50%', background: '#4a154b',
    flexShrink: 0, marginTop: 9,
  },
  addBlockBtn: {
    display: 'flex', alignItems: 'center', gap: 8, marginTop: 24,
    padding: '8px 0', color: '#9e9e9e', fontSize: 14, cursor: 'pointer',
    borderTop: '1px dashed #e8e8e8',
  },
}

function Block({ block }) {
  switch (block.type) {
    case 'heading1':
      return <div style={S.h1Block}>{block.content}</div>
    case 'heading2':
      return <div style={S.h2Block}>{block.content}</div>
    case 'paragraph':
      return <p style={S.pBlock}>{block.content}</p>
    case 'bullet':
      return (
        <div style={S.bullet}>
          <div style={S.bulletDot} />
          <span>{block.content}</span>
        </div>
      )
    default:
      return null
  }
}

export default function Canvas() {
  const author = USERS.find(u => u.id === CANVAS_DOC.author)

  return (
    <div style={S.root}>
      {/* Header */}
      <div style={S.header}>
        <FileText size={18} color="#4a154b" />
        <div style={S.breadcrumb}>
          <span># general</span>
          <ChevronRight size={14} />
          <span style={S.breadActive}>{CANVAS_DOC.title}</span>
        </div>
        <div style={S.headerActions}>
          <button style={S.shareBtn}><Share2 size={14} /> Share</button>
          <div style={S.iconBtn}><Users size={15} /></div>
          <div style={S.iconBtn}><MoreHorizontal size={15} /></div>
        </div>
      </div>

      {/* Editor Toolbar */}
      <div style={S.toolbar}>
        <div style={{ ...S.toolLabel, background: '#f0f0f0', borderRadius: 5 }}>
          <AlignLeft size={13} /> Text <ChevronRight size={11} />
        </div>
        <div style={S.toolDivider} />
        <div style={S.toolBtn}><Bold size={14} /></div>
        <div style={S.toolBtn}><Italic size={14} /></div>
        <div style={S.toolBtn}><Link size={14} /></div>
        <div style={S.toolBtn}><Code size={14} /></div>
        <div style={S.toolDivider} />
        <div style={S.toolBtn}><List size={14} /></div>
        <div style={S.toolBtn}><Smile size={14} /></div>
        <div style={S.toolDivider} />
        <div style={{ ...S.toolLabel, gap: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#4a154b' }}>H1</span>
        </div>
        <div style={{ ...S.toolLabel, gap: 3 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#616061' }}>H2</span>
        </div>
        <div style={{ ...S.toolLabel, gap: 3 }}>
          <span style={{ fontSize: 11, color: '#616061' }}>H3</span>
        </div>
      </div>

      {/* Document Body */}
      <div style={S.body} className="main-scroll">
        <div style={S.page}>
          <input
            defaultValue={CANVAS_DOC.title}
            style={S.docTitle}
            readOnly
          />

          <div style={S.docMeta}>
            <div style={S.metaItem}>
              <div style={S.authorAvatar(author.color)}>{author.avatar}</div>
              <span>{author.name}</span>
            </div>
            <div style={S.metaItem}>
              <Clock size={13} />
              <span>Edited {CANVAS_DOC.lastEdited}</span>
            </div>
            <div style={S.metaItem}>
              <Edit3 size={13} />
              <span>Click to edit</span>
            </div>
          </div>

          {CANVAS_DOC.blocks.map((block, i) => <Block key={i} block={block} />)}

          <div style={S.addBlockBtn}>
            <Plus size={16} />
            <span>Add a block…</span>
          </div>
        </div>
      </div>
    </div>
  )
}
