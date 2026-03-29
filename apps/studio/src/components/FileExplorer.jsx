import { useState } from 'react'
import {
  ChevronRight,
  ChevronDown,
  FolderOpen,
  Folder,
  FileCode2,
  FileText,
  File,
  ChevronsUpDown,
} from 'lucide-react'
import { fileTree } from '../data/files.js'

function getFileIcon(name) {
  if (name.endsWith('.tsx') || name.endsWith('.jsx')) return <FileCode2 size={14} color="#519aba" />
  if (name.endsWith('.ts') || name.endsWith('.js')) return <FileCode2 size={14} color="#cbcb41" />
  if (name.endsWith('.css')) return <FileCode2 size={14} color="#6196cc" />
  if (name.endsWith('.json')) return <FileCode2 size={14} color="#cbcb41" />
  if (name.endsWith('.md')) return <FileText size={14} color="#519aba" />
  return <File size={14} color="#858585" />
}

function TreeNode({ node, depth = 0 }) {
  const [expanded, setExpanded] = useState(node.expanded ?? false)
  const isDir = node.type === 'dir'
  const indent = depth * 12

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          height: 22,
          paddingLeft: 8 + indent,
          paddingRight: 8,
          cursor: 'default',
          background: node.active ? '#094771' : 'transparent',
          color: node.active ? '#ffffff' : '#cccccc',
          fontSize: 13,
          userSelect: 'none',
        }}
        onClick={() => isDir && setExpanded(e => !e)}
        onMouseEnter={e => { if (!node.active) e.currentTarget.style.background = '#2a2d2e' }}
        onMouseLeave={e => { if (!node.active) e.currentTarget.style.background = 'transparent' }}
      >
        {/* expand chevron for dirs */}
        <span style={{ display: 'flex', alignItems: 'center', width: 16, flexShrink: 0 }}>
          {isDir
            ? (expanded ? <ChevronDown size={14} color="#858585" /> : <ChevronRight size={14} color="#858585" />)
            : null}
        </span>
        {/* icon */}
        <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {isDir
            ? (expanded ? <FolderOpen size={14} color="#dcb67a" /> : <Folder size={14} color="#dcb67a" />)
            : getFileIcon(node.name)}
        </span>
        {/* name */}
        <span style={{
          marginLeft: 4,
          fontWeight: node.active ? 600 : 400,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          flex: 1,
        }}>
          {node.name}
        </span>
        {/* modified dot */}
        {node.modified && (
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f1c40f', flexShrink: 0 }} />
        )}
      </div>
      {isDir && expanded && node.children?.map((child, i) => (
        <TreeNode key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  )
}

export default function FileExplorer() {
  return (
    <div style={{
      width: 240,
      background: '#252526',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      borderRight: '1px solid #1e1e1e',
    }}>
      {/* EXPLORER header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '8px 12px 4px',
        color: '#bbbbbe',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
      }}>
        <span>Explorer</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#858585', display: 'flex' }}
          title="Collapse All">
          <ChevronsUpDown size={14} />
        </button>
      </div>

      {/* Open Editors */}
      <div style={{ marginBottom: 4 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '2px 8px 2px 8px',
          cursor: 'default',
          userSelect: 'none',
        }}>
          <ChevronDown size={12} color="#858585" />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#bbbbbe', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Open Editors
          </span>
        </div>
        {['App.tsx'].map(f => (
          <div key={f} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            paddingLeft: 28, height: 22, fontSize: 13, color: '#cccccc',
          }}>
            <FileCode2 size={14} color="#519aba" />
            <span style={{ marginLeft: 4 }}>{f}</span>
          </div>
        ))}
      </div>

      {/* PARANET-UI project root */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '2px 8px', cursor: 'default', userSelect: 'none',
        }}>
          <ChevronDown size={12} color="#858585" />
          <span style={{ fontSize: 11, fontWeight: 600, color: '#bbbbbe', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            ParaNet-UI
          </span>
        </div>
        {fileTree.map((node, i) => (
          <TreeNode key={i} node={node} depth={0} />
        ))}
      </div>
    </div>
  )
}
