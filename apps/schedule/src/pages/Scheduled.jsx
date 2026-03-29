import { Link } from 'react-router-dom'
import { CalendarDays, Check, Download, Plus, Copy, Video, Clock, Globe, X } from 'lucide-react'
import { scheduledEvents } from '../data/events.js'

const ACCENT = '#006bff'

function SuccessCard() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e7e8ec', borderRadius: 16, padding: '36px 40px', maxWidth: 640, margin: '0 auto 32px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
      {/* Check badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Check size={26} color="#16a34a" strokeWidth={2.5} />
        </div>
      </div>

      <h1 style={{ textAlign: 'center', fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 6, letterSpacing: '-0.4px' }}>
        You are scheduled!
      </h1>
      <p style={{ textAlign: 'center', fontSize: 14, color: '#636c72', marginBottom: 28 }}>
        A calendar invitation has been sent to your email.
      </p>

      {/* Event details */}
      <div style={{ background: '#f8f9fa', borderRadius: 12, padding: '20px 24px', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #006bff, #4da3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>
            JB
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>30 Minute Meeting</div>
            <div style={{ fontSize: 12, color: '#636c72' }}>with Jordan Blake</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <CalendarDays size={15} color="#636c72" />
            <div>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>Monday, March 31, 2025</span>
              <span style={{ fontSize: 13, color: '#636c72' }}> · 9:00 AM – 9:30 AM</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Clock size={15} color="#636c72" />
            <span style={{ fontSize: 13, color: '#636c72' }}>30 minutes</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Video size={15} color="#636c72" />
            <span style={{ fontSize: 13, color: '#636c72' }}>Zoom · Link will be in your calendar invite</span>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Globe size={15} color="#636c72" />
            <span style={{ fontSize: 13, color: '#636c72' }}>America/Los_Angeles (PDT)</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '9px 16px', borderRadius: 8,
          border: '1px solid #e7e8ec', background: '#fff',
          fontSize: 13, fontWeight: 600, color: '#1a1a1a', cursor: 'pointer',
          flex: 1, justifyContent: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
          <Download size={14} />
          Download .ics
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '9px 16px', borderRadius: 8,
          border: '1px solid #e7e8ec', background: '#fff',
          fontSize: 13, fontWeight: 600, color: '#1a1a1a', cursor: 'pointer',
          flex: 1, justifyContent: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
          <Plus size={14} />
          Add to Google Calendar
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 7,
          padding: '9px 16px', borderRadius: 8,
          border: '1px solid #e7e8ec', background: '#fff',
          fontSize: 13, fontWeight: 600, color: '#1a1a1a', cursor: 'pointer',
          flex: 1, justifyContent: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}>
          <Copy size={14} />
          Copy event link
        </button>
      </div>
    </div>
  )
}

function ScheduledEventRow({ event }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderBottom: '1px solid #f0f1f3' }}>
      {/* Avatar */}
      <div style={{ width: 40, height: 40, borderRadius: '50%', background: event.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
        {event.initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{event.attendee}</div>
        <div style={{ fontSize: 13, color: '#636c72' }}>{event.type}</div>
      </div>

      {/* Date/time */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>{event.date}</div>
        <div style={{ fontSize: 12, color: '#636c72' }}>{event.time}</div>
      </div>

      {/* Platform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <Video size={14} color="#636c72" />
        <span style={{ fontSize: 12, color: '#636c72' }}>{event.platform}</span>
      </div>

      {/* Cancel */}
      <button style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e7e8ec', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onMouseEnter={e => { e.currentTarget.style.background = '#fff0f0'; e.currentTarget.style.borderColor = '#dc2626' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = '#e7e8ec' }}>
        <X size={14} color="#636c72" />
      </button>
    </div>
  )
}

export default function Scheduled() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa' }}>
      {/* Top bar */}
      <div style={{ height: 56, background: '#fff', borderBottom: '1px solid #e7e8ec', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 12 }}>
        <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CalendarDays size={15} color="#fff" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>Schedule</span>
        </Link>
      </div>

      <div style={{ padding: '48px 24px' }}>
        {/* Success card */}
        <SuccessCard />

        {/* Scheduled events list */}
        <div style={{ maxWidth: 640, margin: '0 auto', background: '#fff', border: '1px solid #e7e8ec', borderRadius: 16, padding: '24px 28px', boxShadow: '0 2px 24px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Your scheduled events</h2>
            <Link to="/book" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '7px 14px', borderRadius: 8,
              background: ACCENT, color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>
              <CalendarDays size={13} /> Book another
            </Link>
          </div>
          <p style={{ fontSize: 13, color: '#636c72', marginBottom: 16 }}>All upcoming bookings in your calendar.</p>

          {scheduledEvents.map(event => (
            <ScheduledEventRow key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  )
}