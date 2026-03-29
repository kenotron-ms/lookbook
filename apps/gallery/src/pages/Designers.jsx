import { useState } from 'react'
import { Search, MapPin, Users } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { shots, designers } from '../data/shots'

const filterOptions = ['All', 'Available for hire', 'Open to freelance', 'Full-time available']

function DesignerCard({ designer, onClick }) {
  const [hovered, setHovered] = useState(false)
  const [following, setFollowing] = useState(false)
  const topShots = designer.topShots.map(id => shots.find(s => s.id === id)).filter(Boolean)

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e8e8e8',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'box-shadow 0.2s, transform 0.2s',
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Cover gradient */}
      <div style={{
        height: '100px',
        background: designer.coverGradient,
        position: 'relative',
      }} />

      {/* Avatar overlapping cover */}
      <div style={{ padding: '0 20px', marginTop: '-28px', position: 'relative' }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          backgroundColor: designer.avatar,
          border: '3px solid #ffffff',
          marginBottom: '10px',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0d0c22', margin: 0 }}>{designer.name}</h3>
          <button
            onClick={e => { e.stopPropagation(); setFollowing(!following); }}
            style={{
              padding: '5px 14px',
              background: following ? '#f8f7f4' : '#ea4c89',
              color: following ? '#0d0c22' : '#ffffff',
              border: following ? '1px solid #e8e8e8' : 'none',
              borderRadius: '20px', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer', transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            {following ? 'Following' : 'Follow'}
          </button>
        </div>

        <p style={{ fontSize: '13px', color: '#6e6d7a', margin: '0 0 6px', lineHeight: '1.4' }}>{designer.headline}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <MapPin size={12} color="#6e6d7a" />
          <span style={{ fontSize: '12px', color: '#6e6d7a' }}>{designer.location}</span>
          {designer.openToWork && (
            <span style={{
              display: 'inline-block', padding: '2px 8px',
              background: '#d1fae5', color: '#065f46',
              borderRadius: '20px', fontSize: '11px', fontWeight: '600',
              marginLeft: '8px',
            }}>
              Open to work
            </span>
          )}
        </div>

        {/* Top 4 shots mini previews */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '14px' }}>
          {topShots.map(s => (
            <div key={s.id} style={{
              paddingBottom: '75%', position: 'relative',
              borderRadius: '6px', overflow: 'hidden',
              background: s.gradient,
            }} />
          ))}
        </div>

        {/* Follower count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingBottom: '16px' }}>
          <Users size={13} color="#6e6d7a" />
          <span style={{ fontSize: '12px', color: '#6e6d7a' }}>{designer.followers.toLocaleString()} followers</span>
        </div>
      </div>
    </div>
  )
}

export default function Designers() {
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('All')
  const navigate = useNavigate()

  const filtered = designers.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
    const matchesFilter = activeFilter === 'All' ||
      (activeFilter === 'Available for hire' && (d.available === 'freelance' || d.available === 'contract')) ||
      (activeFilter === 'Open to freelance' && d.available === 'freelance') ||
      (activeFilter === 'Full-time available' && d.available === 'full-time')
    return matchesSearch && matchesFilter
  })

  return (
    <main style={{ paddingTop: '64px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero search header */}
      <div style={{
        background: 'linear-gradient(135deg, #fdf2f7 0%, #f8f7f4 100%)',
        borderBottom: '1px solid #e8e8e8',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#0d0c22', margin: '0 0 8px' }}>
          Discover World-Class Designers
        </h1>
        <p style={{ fontSize: '16px', color: '#6e6d7a', margin: '0 0 24px' }}>
          Browse talented designers from around the globe
        </p>
        <div style={{ position: 'relative', maxWidth: '480px', margin: '0 auto' }}>
          <Search size={18} color="#6e6d7a" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            placeholder="Search designers by name or skill"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '13px 16px 13px 46px',
              fontSize: '15px',
              border: '1px solid #e8e8e8',
              borderRadius: '12px',
              background: '#ffffff',
              color: '#0d0c22',
              outline: 'none',
              fontFamily: 'inherit',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          />
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 32px' }}>
        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {filterOptions.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '8px 18px', fontSize: '13px', fontWeight: '500',
                color: activeFilter === f ? '#ffffff' : '#6e6d7a',
                background: activeFilter === f ? '#ea4c89' : '#f8f7f4',
                border: 'none', borderRadius: '20px', cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count */}
        <p style={{ fontSize: '14px', color: '#6e6d7a', marginBottom: '20px' }}>
          {filtered.length} designers
        </p>

        {/* Designer grid - 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {filtered.map(designer => (
            <DesignerCard
              key={designer.id}
              designer={designer}
              onClick={() => navigate('/shot', { state: { shot: shots.find(s => s.id === designer.topShots[0]) } })}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
