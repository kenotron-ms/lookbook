import { useState } from 'react';
import { UserCheck, X } from 'lucide-react';
import { SUGGESTED_CONNECTIONS } from '../data/network';

function Avatar({ initials, color, size = 64 }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color || '#0a66c2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'white', fontWeight: 700,
      fontSize: size > 50 ? '22px' : '14px',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

function PersonCard({ person }) {
  const [status, setStatus] = useState('none'); // none | pending | connected

  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e0dfdc',
      borderRadius: '8px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Cover */}
      <div style={{ height: '50px', background: `linear-gradient(135deg, ${person.avatarColor}88, ${person.avatarColor})` }} />
      <div style={{ padding: '0 12px 16px', marginTop: '-32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <div style={{ border: '3px solid white', borderRadius: '50%', marginBottom: '8px' }}>
          <Avatar initials={person.initials} color={person.avatarColor} size={64} />
        </div>
        <div style={{ fontWeight: 700, fontSize: '14px', color: '#000000e6', marginBottom: '2px' }}>{person.name}</div>
        <div style={{ fontSize: '12px', color: '#666666', lineHeight: 1.3, marginBottom: '6px', minHeight: '32px' }}>{person.headline}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#e0dfdc', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>👤</div>
          <span style={{ fontSize: '11px', color: '#666666' }}>{person.mutual} mutual connection{person.mutual !== 1 ? 's' : ''}</span>
        </div>
        {status === 'none' && (
          <button
            onClick={() => setStatus('pending')}
            style={{
              width: '100%', padding: '7px 16px',
              border: '1px solid #0a66c2', borderRadius: '20px',
              background: 'transparent', color: '#0a66c2',
              fontWeight: 600, fontSize: '14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
            }}
          >
            Connect
          </button>
        )}
        {status === 'pending' && (
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button
              onClick={() => setStatus('connected')}
              style={{
                flex: 1, padding: '7px 8px',
                border: 'none', borderRadius: '20px',
                background: '#0a66c2', color: 'white',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              Accept
            </button>
            <button
              onClick={() => setStatus('none')}
              style={{
                flex: 1, padding: '7px 8px',
                border: '1px solid #e0dfdc', borderRadius: '20px',
                background: 'transparent', color: '#666666',
                fontWeight: 600, fontSize: '13px', cursor: 'pointer',
              }}
            >
              Ignore
            </button>
          </div>
        )}
        {status === 'connected' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: '#059669', fontSize: '13px', fontWeight: 600,
          }}>
            <UserCheck size={16} />
            Connected!
          </div>
        )}
      </div>
    </div>
  );
}

function InvitationCard() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div style={{
      background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
      padding: '16px', marginBottom: '24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '50%',
          background: '#7c3aed',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '16px',
        }}>AJ</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: '14px' }}>Andre Johnson wants to connect</div>
          <div style={{ fontSize: '13px', color: '#666666' }}>DevRel at HashiCorp · 5 mutual connections</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => setDismissed(true)} style={{
          padding: '7px 20px', border: '1px solid #e0dfdc', borderRadius: '20px',
          background: 'transparent', color: '#666666', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
        }}>Ignore</button>
        <button style={{
          padding: '7px 20px', border: '1px solid #0a66c2', borderRadius: '20px',
          background: 'transparent', color: '#0a66c2', fontWeight: 600, fontSize: '14px', cursor: 'pointer',
        }}>Accept</button>
      </div>
    </div>
  );
}

export default function Network() {
  const groups = [
    { label: 'People you may know from ParaNet Inc', items: SUGGESTED_CONNECTIONS.slice(0, 4) },
    { label: 'More suggestions for you', items: SUGGESTED_CONNECTIONS.slice(4, 8) },
    { label: 'People in the San Francisco Bay Area', items: SUGGESTED_CONNECTIONS.slice(8, 12) },
  ];

  return (
    <div style={{ maxWidth: '1128px', margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
        {/* Left stats panel */}
        <div style={{ width: '225px', flexShrink: 0 }}>
          <div style={{
            background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #e0dfdc' }}>
              <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>Grow your network</div>
              <div style={{ fontSize: '13px', color: '#666666' }}>Find people you know to expand your professional network.</div>
            </div>
            {[
              { label: 'Invitations', count: 1, color: '#0a66c2' },
              { label: 'Connections', count: '847', color: null },
              { label: 'Following & followers', count: '1.2K', color: null },
              { label: 'Groups', count: 3, color: null },
              { label: 'Events', count: 2, color: null },
              { label: 'Pages', count: 8, color: null },
            ].map(({ label, count, color }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 16px', borderBottom: '1px solid #f3f2ef',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: '13px', color: '#000000e6' }}>{label}</span>
                <span style={{ fontSize: '13px', fontWeight: 700, color: color || '#666666' }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <InvitationCard />
          {groups.map((group) => (
            <div key={group.label} style={{ marginBottom: '32px' }}>
              <div style={{
                background: '#ffffff', border: '1px solid #e0dfdc', borderRadius: '8px',
                overflow: 'hidden',
              }}>
                <div style={{
                  padding: '16px 20px', borderBottom: '1px solid #e0dfdc',
                  fontWeight: 700, fontSize: '16px', color: '#000000e6',
                }}>
                  {group.label}
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '1px',
                  background: '#e0dfdc',
                }}>
                  {group.items.map(person => (
                    <div key={person.id} style={{ background: '#ffffff' }}>
                      <PersonCard person={person} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
