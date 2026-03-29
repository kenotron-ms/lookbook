import { useState } from 'react'
import { Plus, Search, Users } from 'lucide-react'
import { GROUPS, SUGGESTED_GROUPS, POSTS } from '../data/posts.js'
import PostCard from '../components/PostCard.jsx'

const ACCENT = '#1877f2'

function GroupCard({ group, full = false }) {
  return (
    <div style={{
      backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb',
      overflow: 'hidden', cursor: 'pointer',
      display: full ? 'flex' : 'block', alignItems: 'center', gap: full ? 12 : 0,
      padding: full ? '10px 12px' : 0,
      marginBottom: full ? 8 : 0,
    }}>
      {full ? (
        <>
          <div style={{ width: 56, height: 56, borderRadius: 8, background: group.gradient, flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#050505' }}>{group.name}</div>
            <div style={{ fontSize: 12, color: '#65676b', marginTop: 2 }}>{group.members} members · {group.posts}</div>
          </div>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            backgroundColor: group.activity === 'Very active' ? '#31a24c' : '#ffd700',
            flexShrink: 0,
          }} />
        </>
      ) : (
        <>
          <div style={{ height: 100, background: group.gradient }} />
          <div style={{ padding: '8px 10px 12px' }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#050505', marginBottom: 2 }}>{group.name}</div>
            <div style={{ fontSize: 11, color: '#65676b', marginBottom: 8 }}>{group.members} members · {group.category}</div>
            <button style={{
              width: '100%', padding: '6px 0', border: `1px solid ${ACCENT}`,
              borderRadius: 6, backgroundColor: '#e7f3ff', color: ACCENT,
              fontWeight: 600, fontSize: 13, cursor: 'pointer',
            }}>
              + Join group
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function Groups() {
  const [activeTab, setActiveTab] = useState('your')
  const [selectedGroup, setSelectedGroup] = useState(GROUPS[0])

  const tabs = [
    { id: 'your', label: 'Your groups' },
    { id: 'discover', label: 'Discover' },
  ]

  return (
    <div style={{ display: 'flex', maxWidth: 1200, margin: '0 auto', padding: '0 8px', minHeight: 'calc(100vh - 56px)' }}>
      {/* Left panel */}
      <div style={{ width: 360, flexShrink: 0, borderRight: '1px solid #e4e6eb', backgroundColor: '#fff', minHeight: '100%' }}>
        <div style={{ padding: '16px 16px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: '#050505' }}>Groups</h2>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
            backgroundColor: '#e4e6eb', border: 'none', borderRadius: 6,
            fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#050505',
          }}>
            <Plus size={16} />
            Create group
          </button>
        </div>

        {/* Search */}
        <div style={{ padding: '12px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, backgroundColor: '#f0f2f5', borderRadius: 999, padding: '8px 14px' }}>
            <Search size={16} color="#65676b" />
            <input placeholder="Search groups" style={{ background: 'none', border: 'none', outline: 'none', fontSize: 14, color: '#050505', flex: 1 }} />
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e4e6eb', padding: '0 16px' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                flex: 1, padding: '10px 0', background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, fontWeight: 600, borderBottom: activeTab === t.id ? `3px solid ${ACCENT}` : '3px solid transparent',
                color: activeTab === t.id ? ACCENT : '#65676b',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div style={{ padding: 12 }}>
          {activeTab === 'your' ? (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#65676b', padding: '4px 4px 8px' }}>YOUR GROUPS</div>
              {GROUPS.map(g => (
                <div key={g.id} onClick={() => setSelectedGroup(g)}>
                  <GroupCard group={g} full />
                </div>
              ))}
            </>
          ) : (
            <>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#65676b', padding: '4px 4px 8px' }}>SUGGESTED FOR YOU</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {SUGGESTED_GROUPS.map(g => <GroupCard key={g.id} group={g} />)}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right: group feed */}
      <div style={{ flex: 1, padding: '16px 24px', maxWidth: 680 }}>
        {selectedGroup && (
          <>
            {/* Group header */}
            <div style={{ backgroundColor: '#fff', borderRadius: 8, border: '1px solid #e4e6eb', overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ height: 160, background: selectedGroup.gradient }} />
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: '0 0 4px', fontSize: 22, fontWeight: 700, color: '#050505' }}>{selectedGroup.name}</h2>
                  <div style={{ fontSize: 14, color: '#65676b', display: 'flex', gap: 8 }}>
                    <span><Users size={14} style={{ verticalAlign: 'middle', marginRight: 4 }} />{selectedGroup.members} members</span>
                    <span>· {selectedGroup.posts}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{ padding: '7px 16px', backgroundColor: ACCENT, color: '#fff', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    + Joined
                  </button>
                  <button style={{ padding: '7px 16px', backgroundColor: '#e4e6eb', color: '#050505', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer', fontSize: 14 }}>
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Group posts */}
            {POSTS.slice(0, 4).map(post => <PostCard key={post.id} post={post} />)}
          </>
        )}
      </div>
    </div>
  )
}
