import { MapPin, Link2, Award, Star, ChevronRight, Plus, Edit2, Users } from 'lucide-react';
import { CURRENT_USER, EXPERIENCE } from '../data/network';

function Section({ title, children, action }) {
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
      padding: '20px', marginBottom: '10px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#000000e6' }}>{title}</h2>
        {action && (
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666666', padding: '4px' }}>
            {action}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function ExperienceItem({ exp, isLast }) {
  return (
    <div style={{ display: 'flex', gap: '14px', paddingBottom: isLast ? 0 : '20px', borderBottom: isLast ? 'none' : '1px solid #e0dfdc', marginBottom: isLast ? 0 : '20px' }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '8px',
        background: exp.gradient, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', fontWeight: 700, fontSize: '16px',
      }}>
        {exp.initials}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: '15px', color: '#000000e6', marginBottom: '2px' }}>{exp.role}</div>
        <div style={{ fontSize: '14px', color: '#444', marginBottom: '2px' }}>{exp.company}</div>
        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '2px' }}>{exp.dates}</div>
        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '8px' }}>{exp.location}</div>
        <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.6 }}>{exp.description}</div>
      </div>
    </div>
  );
}

const SKILLS = [
  { name: 'Product Design', endorsements: 84 },
  { name: 'Design Systems', endorsements: 71 },
  { name: 'UX Research', endorsements: 63 },
  { name: 'Figma', endorsements: 92 },
  { name: 'Prototyping', endorsements: 58 },
];

const EDUCATION = [
  {
    school: 'Carnegie Mellon University',
    degree: 'B.S. in Human-Computer Interaction',
    years: '2012 – 2016',
    initials: 'CMU',
    gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
  },
  {
    school: 'IDEO U',
    degree: 'Certificate in Human-Centered Design',
    years: '2018',
    initials: 'IU',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
];

const RECOMMENDATIONS = [
  {
    name: 'Leila Santos',
    role: 'CTO at Vanta Health',
    date: 'January 12, 2024',
    initials: 'LS',
    color: '#059669',
    text: 'Jordan is one of the most talented and thoughtful product designers I have had the pleasure of working with. Their ability to synthesize complex user needs into elegant, intuitive experiences is remarkable. At ParaNet, Jordan redesigned our core onboarding flow and increased activation rate by 28% — a meaningful business outcome driven entirely by design excellence.',
  },
  {
    name: 'Marcus Chen',
    role: 'Product Lead, ex-Google',
    date: 'October 3, 2023',
    initials: 'MC',
    color: '#0a66c2',
    text: 'I had the privilege of working alongside Jordan for two years. What sets Jordan apart is the combination of craft and strategic thinking. They don\'t just make beautiful screens — they deeply understand the problem space and design solutions that actually work. A genuine multiplier for any product team.',
  },
];

export default function Profile() {
  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Profile Card */}
      <div style={{
        background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
        overflow: 'hidden', marginBottom: '10px',
      }}>
        {/* Cover */}
        <div style={{
          height: '200px',
          background: CURRENT_USER.coverGradient,
          position: 'relative',
        }}>
          <button style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '6px', padding: '6px 12px', color: 'white',
            fontSize: '13px', cursor: 'pointer', fontWeight: 600,
          }}>
            <Edit2 size={13} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
            Edit cover
          </button>
        </div>

        {/* Profile info */}
        <div style={{ padding: '0 24px 24px', marginTop: '-50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{
              width: '120px', height: '120px', borderRadius: '50%',
              background: '#0a66c2',
              border: '4px solid white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '36px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>JB</div>
            <div style={{ display: 'flex', gap: '8px', paddingBottom: '4px' }}>
              <button style={{
                padding: '8px 20px', border: '1px solid #e0dfdc', borderRadius: '20px',
                background: 'transparent', color: '#000000e6', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}>More</button>
              <button style={{
                padding: '8px 20px', border: '1px solid #0a66c2', borderRadius: '20px',
                background: 'transparent', color: '#0a66c2', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}>Open to</button>
              <button style={{
                padding: '8px 20px', border: 'none', borderRadius: '20px',
                background: '#0a66c2', color: 'white', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              }}>Add profile section</button>
            </div>
          </div>

          <div style={{ marginTop: '12px' }}>
            <h1 style={{ margin: '0 0 4px', fontSize: '24px', fontWeight: 700, color: '#000000e6' }}>{CURRENT_USER.name}</h1>
            <h2 style={{ margin: '0 0 6px', fontSize: '16px', fontWeight: 400, color: '#444' }}>{CURRENT_USER.headline}</h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#666666', fontSize: '13px' }}>
                <MapPin size={14} />
                {CURRENT_USER.location}
              </div>
              <span style={{ fontSize: '13px', color: '#0a66c2', fontWeight: 600, cursor: 'pointer' }}>
                {CURRENT_USER.connections.toLocaleString()} connections
              </span>
              <span style={{ fontSize: '13px', color: '#666666' }}>Contact info</span>
            </div>
          </div>

          {/* Open to work banner */}
          <div style={{
            marginTop: '16px', padding: '12px 16px',
            background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '14px', color: '#166534' }}>🟢 Open to work</div>
              <div style={{ fontSize: '13px', color: '#166534', opacity: 0.8 }}>Product Designer, Lead Designer, Design Manager roles</div>
            </div>
            <button style={{
              background: 'none', border: '1px solid #166534', borderRadius: '20px',
              padding: '6px 14px', color: '#166534', fontSize: '13px', fontWeight: 600, cursor: 'pointer',
            }}>Edit</button>
          </div>

          {/* About */}
          <div style={{ marginTop: '16px', borderTop: '1px solid #e0dfdc', paddingTop: '16px' }}>
            <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.7 }}>{CURRENT_USER.about}</div>
          </div>
        </div>
      </div>

      {/* Analytics */}
      <div style={{
        background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
        padding: '20px', marginBottom: '10px',
      }}>
        <div style={{ fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>Your Dashboard</div>
        <div style={{ fontSize: '13px', color: '#666666', marginBottom: '16px' }}>Private to you</div>
        <div style={{ display: 'flex', gap: '24px' }}>
          {[
            { label: 'Profile viewers', value: '248', sub: 'Past 90 days' },
            { label: 'Post impressions', value: '1,842', sub: 'Past 90 days' },
            { label: 'Search appearances', value: '94', sub: 'Past 7 days' },
          ].map(({ label, value, sub }) => (
            <div key={label} style={{ cursor: 'pointer' }}>
              <div style={{ fontWeight: 700, fontSize: '22px', color: '#000000e6' }}>{value}</div>
              <div style={{ fontSize: '14px', color: '#000000e6', marginBottom: '2px' }}>{label}</div>
              <div style={{ fontSize: '12px', color: '#666666' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
      <Section title="Experience" action={<Plus size={20} />}>
        {EXPERIENCE.map((exp, i) => (
          <ExperienceItem key={exp.id} exp={exp} isLast={i === EXPERIENCE.length - 1} />
        ))}
      </Section>

      {/* Education */}
      <Section title="Education" action={<Plus size={20} />}>
        {EDUCATION.map((edu, i) => (
          <div key={edu.school} style={{
            display: 'flex', gap: '14px',
            paddingBottom: i < EDUCATION.length - 1 ? '16px' : 0,
            borderBottom: i < EDUCATION.length - 1 ? '1px solid #e0dfdc' : 'none',
            marginBottom: i < EDUCATION.length - 1 ? '16px' : 0,
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '8px',
              background: edu.gradient, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '14px',
            }}>{edu.initials}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '15px', color: '#000000e6' }}>{edu.school}</div>
              <div style={{ fontSize: '14px', color: '#444' }}>{edu.degree}</div>
              <div style={{ fontSize: '13px', color: '#666666' }}>{edu.years}</div>
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="Skills" action={<Plus size={20} />}>
        {SKILLS.map((skill, i) => (
          <div key={skill.name} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0',
            borderBottom: i < SKILLS.length - 1 ? '1px solid #e0dfdc' : 'none',
          }}>
            <div style={{ fontWeight: 600, fontSize: '14px', color: '#000000e6' }}>{skill.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#666666', fontSize: '13px' }}>
              <Award size={14} color="#0a66c2" />
              <span>{skill.endorsements} endorsements</span>
            </div>
          </div>
        ))}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '12px', color: '#000000e6', textDecoration: 'none', fontWeight: 600, fontSize: '14px' }}>
          Show all 23 skills <ChevronRight size={16} />
        </a>
      </Section>

      {/* Recommendations */}
      <Section title="Recommendations" action={<Plus size={20} />}>
        <div style={{ marginBottom: '8px', borderBottom: '1px solid #e0dfdc', paddingBottom: '12px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#0a66c2', marginRight: '16px', cursor: 'pointer' }}>
            Received (2)
          </span>
          <span style={{ fontSize: '14px', color: '#666666', cursor: 'pointer' }}>Given (4)</span>
        </div>
        {RECOMMENDATIONS.map((rec, i) => (
          <div key={rec.name} style={{
            paddingBottom: i < RECOMMENDATIONS.length - 1 ? '20px' : 0,
            borderBottom: i < RECOMMENDATIONS.length - 1 ? '1px solid #e0dfdc' : 'none',
            marginBottom: i < RECOMMENDATIONS.length - 1 ? '20px' : 0,
          }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: rec.color, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 700, fontSize: '16px',
              }}>{rec.initials}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '14px', color: '#000000e6' }}>{rec.name}</div>
                <div style={{ fontSize: '13px', color: '#666666' }}>{rec.role}</div>
                <div style={{ fontSize: '12px', color: '#666666' }}>{rec.date}</div>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#444', lineHeight: 1.7 }}>"{rec.text}"</div>
          </div>
        ))}
      </Section>
    </div>
  );
}
