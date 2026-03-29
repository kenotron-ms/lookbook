import { useState } from 'react'
import { Heart, Eye, Plus, Play, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { shots } from '../data/shots'

const categories = ['Popular', 'New & Noteworthy', 'Following', 'Recent']
const filters = ['Motion', 'Web Design', 'Mobile', 'Typography', 'Illustration', 'Branding']
const sortOptions = ['Popular this week', 'All Time', 'Most Liked']

function ShotCard({ shot, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer' }}
    >
      {/* Shot preview 4:3 */}
      <div style={{
        position: 'relative',
        paddingBottom: '75%',
        borderRadius: '12px',
        overflow: 'hidden',
        background: shot.gradient,
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.14)' : '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s',
      }}>
        {/* Hover overlay */}
        {hovered && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '12px',
            zIndex: 2,
          }}>
            <button style={{
              width: '40px', height: '40px', borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '18px', color: '#0d0c22',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}>
              <Plus size={18} />
            </button>
            {shot.isAnimation && (
              <button style={{
                width: '40px', height: '40px', borderRadius: '50%',
                backgroundColor: '#ffffff',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}>
                <Play size={16} fill="#0d0c22" color="#0d0c22" />
              </button>
            )}
          </div>
        )}

        {/* Subtle content hint */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: 0.15,
        }}>
          <div style={{
            width: '60%', height: '50%', borderRadius: '8px',
            background: 'rgba(255,255,255,0.5)',
          }} />
        </div>
      </div>

      {/* Below card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px', padding: '0 2px' }}>
        {/* Designer avatar */}
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%',
          backgroundColor: shot.designerAvatar,
          flexShrink: 0,
        }} />
        <span style={{ fontSize: '13px', color: '#6e6d7a', fontWeight: '500', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {shot.designer}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6e6d7a' }}>
          <Heart size={13} />
          <span style={{ fontSize: '12px' }}>{shot.hearts.toLocaleString()}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#6e6d7a', marginLeft: '6px' }}>
          <Eye size={13} />
          <span style={{ fontSize: '12px' }}>{(shot.views / 1000).toFixed(1)}k</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [activeFilter, setActiveFilter] = useState(null)
  const [activeSort, setActiveSort] = useState('Popular this week')
  const navigate = useNavigate()

  return (
    <main style={{ paddingTop: '64px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Category + filter row */}
      <div style={{
        borderBottom: '1px solid #e8e8e8',
        backgroundColor: '#ffffff',
        padding: '0 32px',
        display: 'flex', alignItems: 'center', gap: '0',
        overflowX: 'auto',
      }}>
        {/* Category tabs */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '24px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '14px 16px',
                fontSize: '14px', fontWeight: '500',
                color: activeCategory === cat ? '#0d0c22' : '#6e6d7a',
                background: 'none', border: 'none', cursor: 'pointer',
                borderBottom: activeCategory === cat ? '2px solid #ea4c89' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'color 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e8e8e8', marginRight: '24px', flexShrink: 0 }} />

        {/* Filter pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(activeFilter === f ? null : f)}
              style={{
                padding: '5px 14px',
                fontSize: '13px', fontWeight: '500',
                color: activeFilter === f ? '#ea4c89' : '#6e6d7a',
                background: activeFilter === f ? '#fdf2f7' : '#f8f7f4',
                border: activeFilter === f ? '1px solid #ea4c89' : '1px solid transparent',
                borderRadius: '20px', cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '28px 32px' }}>
        {/* Sort row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: '600', color: '#0d0c22', margin: 0 }}>
            Shots
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SlidersHorizontal size={15} color="#6e6d7a" />
            {sortOptions.map(s => (
              <button
                key={s}
                onClick={() => setActiveSort(s)}
                style={{
                  padding: '6px 12px', fontSize: '13px', fontWeight: '500',
                  color: activeSort === s ? '#ea4c89' : '#6e6d7a',
                  background: activeSort === s ? '#fdf2f7' : 'none',
                  border: 'none', borderRadius: '20px', cursor: 'pointer',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* 4-col shot grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '28px 24px',
        }}>
          {shots.map(shot => (
            <ShotCard
              key={shot.id}
              shot={shot}
              onClick={() => navigate('/shot', { state: { shot } })}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
