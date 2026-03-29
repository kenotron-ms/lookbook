import { Star, Plus, Clock, LayoutGrid } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { workspaceBoards } from '../data/boards.js'

function BoardCard({ board }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => navigate('/board')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 6, overflow: 'hidden',
        cursor: 'pointer', position: 'relative',
        height: 96,
        boxShadow: hovered ? '0 4px 16px rgba(0,0,0,0.2)' : '0 1px 4px rgba(0,0,0,0.12)',
        transform: hovered ? 'translateY(-2px)' : 'none',
        transition: 'box-shadow 0.15s ease, transform 0.12s ease',
        background: board.bg,
      }}
    >
      {/* Overlay on hover */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.18)',
        }} />
      )}

      {/* Board name */}
      <div style={{
        position: 'absolute', top: 10, left: 10,
        color: '#fff', fontSize: 14, fontWeight: 700,
        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
        lineHeight: 1.3, maxWidth: '80%',
      }}>
        {board.name}
      </div>

      {/* Workspace name */}
      <div style={{
        position: 'absolute', bottom: 8, left: 10,
        color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: 500,
      }}>
        {board.workspace}
      </div>

      {/* Star */}
      <button
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', bottom: 6, right: 8,
          background: 'none', border: 'none', cursor: 'pointer',
          color: board.starred ? '#f2d600' : 'rgba(255,255,255,0.7)',
          padding: 2,
          display: hovered || board.starred ? 'flex' : 'none',
          alignItems: 'center',
        }}
      >
        <Star size={14} fill={board.starred ? '#f2d600' : 'none'} />
      </button>
    </div>
  )
}

import { useState } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const starred = workspaceBoards.filter(b => b.starred)
  const recent = workspaceBoards

  return (
    <div style={{
      height: '100%',
      background: '#f4f5f7',
      overflowY: 'auto',
      padding: '32px 40px',
    }}>
      {/* Starred */}
      {starred.length > 0 && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <Star size={16} color="#172b4d" fill="#172b4d" />
            <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Starred boards</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
            {starred.map(b => <BoardCard key={b.id} board={b} />)}
          </div>
        </section>
      )}

      {/* Recently viewed */}
      <section style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <Clock size={16} color="#172b4d" />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Recently viewed</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
          {recent.map(b => <BoardCard key={b.id} board={b} />)}
          {/* Create new */}
          <div
            onClick={() => navigate('/board')}
            style={{
              height: 96, borderRadius: 6,
              border: '2px dashed #c1c7d0',
              background: '#ebecf0',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 6,
              transition: 'background 0.12s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#d5d9de'}
            onMouseLeave={e => e.currentTarget.style.background = '#ebecf0'}
          >
            <Plus size={16} color="#6b778c" />
            <span style={{ fontSize: 13, fontWeight: 500, color: '#6b778c' }}>Create new board</span>
          </div>
        </div>
      </section>

      {/* Your workspaces */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <LayoutGrid size={16} color="#172b4d" />
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#172b4d' }}>Your workspaces</h2>
        </div>
        {['ParaNet HQ', 'Engineering', 'Growth Team'].map(ws => {
          const wsBoards = workspaceBoards.filter(b => b.workspace === ws)
          return (
            <div key={ws} style={{ marginBottom: 28 }}>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 6,
                    background: '#0052cc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 12, fontWeight: 700,
                  }}>
                    {ws[0]}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#172b4d' }}>{ws}</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  {['Boards', 'Members', 'Settings'].map(tab => (
                    <button key={tab} style={{
                      background: '#ebecf0', border: 'none', borderRadius: 4,
                      padding: '5px 10px', cursor: 'pointer',
                      color: '#172b4d', fontSize: 12, fontWeight: 500,
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = '#d5d9de'}
                      onMouseLeave={e => e.currentTarget.style.background = '#ebecf0'}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
                {wsBoards.map(b => <BoardCard key={b.id} board={b} />)}
                <div
                  style={{
                    height: 96, borderRadius: 6,
                    border: '2px dashed #c1c7d0',
                    background: '#ebecf0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', gap: 6,
                    transition: 'background 0.12s ease',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#d5d9de'}
                  onMouseLeave={e => e.currentTarget.style.background = '#ebecf0'}
                >
                  <Plus size={14} color="#6b778c" />
                  <span style={{ fontSize: 13, color: '#6b778c' }}>Create board</span>
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
