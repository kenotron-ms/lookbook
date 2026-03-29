import { useState } from 'react'
import { MapPin, Star, Clock, Briefcase, ChevronDown, CheckCircle } from 'lucide-react'
import { designers, shots } from '../data/shots'

const jobTypes = ['All', 'Full-time', 'Contract', 'Freelance']
const skills = ['All Skills', 'UI Design', 'Mobile', 'Branding', 'Illustration', 'Design Systems']
const locations = ['Anywhere', 'US Only', 'Europe', 'Remote Only']

const availabilityBadge = {
  'freelance': { label: 'Freelance', color: '#dbeafe', text: '#1d4ed8' },
  'contract': { label: 'Contract', color: '#fef3c7', text: '#92400e' },
  'full-time': { label: 'Full-time', color: '#f3e8ff', text: '#6d28d9' },
}

function HireCard({ designer }) {
  const [contacted, setContacted] = useState(false)
  const topShots = designer.topShots.slice(0, 3).map(id => shots.find(s => s.id === id)).filter(Boolean)
  const badge = availabilityBadge[designer.available]

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e8e8e8',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      gap: '20px',
      alignItems: 'flex-start',
      transition: 'box-shadow 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.08)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Avatar */}
      <div style={{
        width: '64px', height: '64px', borderRadius: '50%',
        backgroundColor: designer.avatar, flexShrink: 0,
        position: 'relative',
      }}>
        {designer.openToWork && (
          <div style={{
            position: 'absolute', bottom: 0, right: 0,
            width: '18px', height: '18px', borderRadius: '50%',
            background: '#10b981', border: '2px solid #fff',
          }} />
        )}
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0d0c22', margin: '0 0 2px' }}>{designer.name}</h3>
            <p style={{ fontSize: '13px', color: '#6e6d7a', margin: 0 }}>{designer.headline}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '18px', fontWeight: '700', color: '#0d0c22', margin: '0 0 2px' }}>{designer.rate}</p>
            <span style={{
              display: 'inline-block', padding: '3px 10px',
              background: badge.color, color: badge.text,
              borderRadius: '20px', fontSize: '11px', fontWeight: '600',
            }}>
              {badge.label}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <MapPin size={12} color="#6e6d7a" />
            <span style={{ fontSize: '12px', color: '#6e6d7a' }}>{designer.location}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={12} color="#f59e0b" fill="#f59e0b" />
            <span style={{ fontSize: '12px', color: '#6e6d7a' }}>4.{Math.floor(Math.random() * 3) + 7} · {Math.floor(designer.followers / 1000)}k followers</span>
          </div>
          {designer.openToWork && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={12} color="#10b981" />
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '500' }}>Open to work</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
          {designer.skills.map(skill => (
            <span key={skill} style={{
              padding: '4px 10px',
              background: '#f8f7f4',
              color: '#6e6d7a',
              borderRadius: '20px',
              fontSize: '12px', fontWeight: '500',
            }}>
              {skill}
            </span>
          ))}
        </div>

        {/* Mini shot previews */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {topShots.map(s => (
            <div key={s.id} style={{
              width: '80px', height: '60px',
              borderRadius: '8px', overflow: 'hidden',
              background: s.gradient, flexShrink: 0,
            }} />
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setContacted(!contacted)}
            style={{
              padding: '9px 20px',
              background: contacted ? '#10b981' : '#ea4c89',
              color: '#ffffff',
              border: 'none', borderRadius: '8px',
              fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', transition: 'background 0.15s',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}
            onMouseEnter={e => e.currentTarget.style.background = contacted ? '#059669' : '#d63678'}
            onMouseLeave={e => e.currentTarget.style.background = contacted ? '#10b981' : '#ea4c89'}
          >
            {contacted ? <><CheckCircle size={14} /> Contacted</> : 'Hire Now'}
          </button>
          <button style={{
            padding: '9px 20px',
            background: '#f8f7f4',
            color: '#0d0c22',
            border: '1px solid #e8e8e8', borderRadius: '8px',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          }}>
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}

function FilterDropdown({ label, options, active, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '9px 16px',
          background: '#ffffff',
          border: '1px solid #e8e8e8',
          borderRadius: '10px',
          fontSize: '13px', fontWeight: '500',
          color: '#0d0c22', cursor: 'pointer',
        }}
      >
        {active} <ChevronDown size={14} />
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '110%', left: 0, zIndex: 50,
          background: '#ffffff',
          border: '1px solid #e8e8e8',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
          minWidth: '160px',
          padding: '6px',
        }}>
          {options.map(o => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '8px 12px', fontSize: '13px',
                color: active === o ? '#ea4c89' : '#0d0c22',
                background: active === o ? '#fdf2f7' : 'transparent',
                border: 'none', borderRadius: '6px', cursor: 'pointer',
                fontWeight: active === o ? '600' : '400',
              }}
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Hire() {
  const [jobType, setJobType] = useState('All')
  const [skill, setSkill] = useState('All Skills')
  const [location, setLocation] = useState('Anywhere')

  const filtered = designers.filter(d => {
    if (jobType !== 'All' && d.available !== jobType.toLowerCase()) return false
    if (skill !== 'All Skills' && !d.skills.includes(skill)) return false
    return true
  })

  return (
    <main style={{ paddingTop: '64px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #ea4c89 0%, #764ba2 100%)',
        padding: '56px 32px',
        textAlign: 'center',
        color: '#ffffff',
      }}>
        <h1 style={{ fontSize: '38px', fontWeight: '800', margin: '0 0 10px', letterSpacing: '-1px' }}>
          Find Your Next Designer
        </h1>
        <p style={{ fontSize: '17px', opacity: 0.85, margin: 0 }}>
          Connect with world-class design talent, ready to start immediately.
        </p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 32px' }}>
        {/* Filters */}
        <div style={{
          display: 'flex', gap: '12px', marginBottom: '28px',
          flexWrap: 'wrap', alignItems: 'center',
        }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#0d0c22', marginRight: '4px' }}>Filter by:</span>
          <FilterDropdown label="Job Type" options={jobTypes} active={jobType} onChange={setJobType} />
          <FilterDropdown label="Skill" options={skills} active={skill} onChange={setSkill} />
          <FilterDropdown label="Location" options={locations} active={location} onChange={setLocation} />
        </div>

        {/* Count */}
        <p style={{ fontSize: '14px', color: '#6e6d7a', marginBottom: '20px' }}>
          {filtered.length} designers available
        </p>

        {/* Listings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(designer => (
            <HireCard key={designer.id} designer={designer} />
          ))}
        </div>
      </div>
    </main>
  )
}
