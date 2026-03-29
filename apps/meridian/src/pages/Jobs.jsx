import { useState } from 'react';
import { Search, MapPin, Bookmark, BookmarkCheck, ChevronDown, X } from 'lucide-react';
import { JOBS } from '../data/network';

function TypeBadge({ type }) {
  const styles = {
    Remote: { background: '#dcfce7', color: '#166534', border: '1px solid #bbf7d0' },
    Hybrid: { background: '#dbeafe', color: '#1d4ed8', border: '1px solid #bfdbfe' },
    'On-site': { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb' },
  };
  const s = styles[type] || styles['On-site'];
  return (
    <span style={{
      ...s,
      padding: '2px 8px', borderRadius: '12px',
      fontSize: '11px', fontWeight: 600,
    }}>{type}</span>
  );
}

function JobCard({ job }) {
  const [saved, setSaved] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e0dfdc',
      borderRadius: '8px',
      padding: '16px',
      display: 'flex',
      gap: '14px',
      alignItems: 'flex-start',
      cursor: 'pointer',
      transition: 'box-shadow 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Company Logo */}
      <div style={{
        width: '48px', height: '48px', borderRadius: '8px',
        background: job.gradient, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 700, fontSize: '18px',
      }}>
        {job.initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: '15px', color: '#0a66c2', marginBottom: '2px' }}>{job.title}</div>
            <div style={{ fontSize: '13px', color: '#000000e6', marginBottom: '2px' }}>{job.company}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#666666' }}>{job.location}</span>
              <span style={{ color: '#c0bfbc' }}>·</span>
              <TypeBadge type={job.type} />
            </div>
            {job.salary && (
              <div style={{ fontSize: '12px', color: '#059669', fontWeight: 600, marginBottom: '4px' }}>
                {job.salary} / yr
              </div>
            )}
            <div style={{ fontSize: '12px', color: '#666666' }}>{job.posted}</div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setSaved(!saved); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: saved ? '#0a66c2' : '#666666', padding: '4px' }}
          >
            {saved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
          {job.easyApply ? (
            <button
              onClick={() => setApplied(!applied)}
              style={{
                padding: '7px 20px',
                border: 'none',
                borderRadius: '20px',
                background: applied ? '#059669' : '#0a66c2',
                color: 'white',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              {applied ? '✓ Applied' : '⚡ Easy Apply'}
            </button>
          ) : (
            <button
              onClick={() => setApplied(!applied)}
              style={{
                padding: '7px 20px',
                border: '1px solid #0a66c2', borderRadius: '20px',
                background: 'transparent', color: '#0a66c2',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              {applied ? '✓ Applied' : 'Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const FILTERS = ['Date posted', 'Experience level', 'Company', 'Job type', 'Remote'];

export default function Jobs() {
  const [titleQ, setTitleQ] = useState('');
  const [locationQ, setLocationQ] = useState('San Francisco Bay Area');
  const [activeFilter, setActiveFilter] = useState(null);

  const filtered = JOBS.filter(j =>
    (!titleQ || j.title.toLowerCase().includes(titleQ.toLowerCase()) || j.company.toLowerCase().includes(titleQ.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Search bar */}
      <div style={{
        background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
        padding: '20px', marginBottom: '16px',
      }}>
        <div style={{ fontSize: '20px', fontWeight: 700, marginBottom: '16px', color: '#000000e6' }}>
          Find your next opportunity
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid #c0bfbc', borderRadius: '4px', padding: '10px 14px',
            flex: 1, background: '#ffffff',
          }}>
            <Search size={18} color="#666666" />
            <input
              value={titleQ}
              onChange={e => setTitleQ(e.target.value)}
              placeholder="Job title or company"
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#000000e6' }}
            />
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid #c0bfbc', borderRadius: '4px', padding: '10px 14px',
            flex: 1, background: '#ffffff',
          }}>
            <MapPin size={18} color="#666666" />
            <input
              value={locationQ}
              onChange={e => setLocationQ(e.target.value)}
              placeholder="City, state, or remote"
              style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#000000e6' }}
            />
          </div>
          <button style={{
            padding: '10px 28px', background: '#0a66c2', color: 'white',
            border: 'none', borderRadius: '4px', fontWeight: 600, fontSize: '15px', cursor: 'pointer',
          }}>
            Search
          </button>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(activeFilter === f ? null : f)}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 14px',
              border: `1px solid ${activeFilter === f ? '#0a66c2' : '#c0bfbc'}`,
              borderRadius: '20px',
              background: activeFilter === f ? '#dbeafe' : '#ffffff',
              color: activeFilter === f ? '#0a66c2' : '#000000e6',
              fontSize: '13px', fontWeight: 500, cursor: 'pointer',
            }}
          >
            {f} <ChevronDown size={14} />
          </button>
        ))}
        {activeFilter && (
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 12px', border: 'none', background: 'none',
              color: '#0a66c2', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            <X size={14} /> Reset filters
          </button>
        )}
      </div>

      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Job list */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '15px', fontWeight: 600, color: '#000000e6', marginBottom: '12px' }}>
            Jobs you might be interested in
            <span style={{ color: '#666666', fontWeight: 400, marginLeft: '8px' }}>({filtered.length} results)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(job => <JobCard key={job.id} job={job} />)}
          </div>
        </div>

        {/* Right sidebar */}
        <div style={{ width: '280px', flexShrink: 0 }}>
          <div style={{
            background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px', padding: '16px',
          }}>
            <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '12px' }}>Job search tips</div>
            {[
              '✨ Complete your profile to get noticed by recruiters',
              '🔔 Set up job alerts for your top keywords',
              '🤝 Reach out to connections at target companies',
              '📝 Tailor your resume for each application',
            ].map((tip, i) => (
              <div key={i} style={{ fontSize: '13px', color: '#444', lineHeight: 1.5, marginBottom: '10px' }}>{tip}</div>
            ))}
            <div style={{ marginTop: '16px', padding: '12px', background: '#f3f2ef', borderRadius: '6px' }}>
              <div style={{ fontSize: '12px', color: '#666666', marginBottom: '4px' }}>Profile completion</div>
              <div style={{ fontWeight: 700, fontSize: '22px', color: '#0a66c2' }}>87%</div>
              <div style={{ height: '6px', background: '#e0dfdc', borderRadius: '3px', marginTop: '6px' }}>
                <div style={{ width: '87%', height: '100%', background: '#0a66c2', borderRadius: '3px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
