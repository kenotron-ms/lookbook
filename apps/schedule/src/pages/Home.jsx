import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CalendarDays, Plus, Copy, Edit2, Video, ChevronRight,
  Share2, LayoutGrid, Clock, Users, Bell, Plug, Settings,
  Calendar, Workflow, Check,
} from 'lucide-react'
import { eventTypes, upcomingMeetings, stats } from '../data/events.js'

const ACCENT = '#006bff'

function Sidebar({ active }) {
  const navItems = [
    { icon: LayoutGrid, label: 'My Calendly', href: '/home' },
    { icon: CalendarDays, label: 'Event Types', href: '/home' },
    { icon: Clock, label: 'Scheduled Events', href: '/scheduled' },
    { icon: Calendar, label: 'Availability', href: '/home' },
    { icon: Workflow, label: 'Workflows', href: '/home' },
    { icon: Plug, label: 'Integrations', href: '/home' },
    { icon: Settings, label: 'Settings', href: '/home' },
  ]

  return (
    <aside style={{ width: 240, background: '#f8f9fa', borderRight: '1px solid #e7e8ec', display: 'flex', flexDirection: 'column', height: '100vh', position: 'fixed', left: 0, top: 0 }}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarDays size={18} color="#fff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 17, color: '#1a1a1a', letterSpacing: '-0.3px' }}>Schedule</span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px' }}>
        {navItems.map(({ icon: Icon, label, href }) => {
          const isActive = label === active
          return (
            <Link
              key={label}
              to={href}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                borderRadius: 8, marginBottom: 2, textDecoration: 'none',
                background: isActive ? '#e8f0ff' : 'transparent',
                color: isActive ? ACCENT : '#444',
                fontWeight: isActive ? 600 : 400,
                fontSize: 14, transition: 'background 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#eef0f3' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
            >
              <Icon size={16} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Create */}
      <div style={{ padding: '0 12px 16px' }}>
        <Link to="/home" style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
          borderRadius: 8, background: ACCENT, color: '#fff',
          textDecoration: 'none', fontSize: 14, fontWeight: 600,
        }}>
          <Plus size={16} />
          + Create
        </Link>
      </div>

      {/* User avatar */}
      <div style={{ borderTop: '1px solid #e7e8ec', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>
          JB
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Jordan Blake</div>
          <div style={{ fontSize: 11, color: '#636c72' }}>Pro Plan</div>
        </div>
      </div>
    </aside>
  )
}

function StatCard({ label, value, sub }) {
  return (
    <div style={{ flex: 1, background: '#fff', border: '1px solid #e7e8ec', borderRadius: 12, padding: '20px 24px' }}>
      <div style={{ fontSize: 28, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 12, color: '#636c72' }}>{sub}</div>
    </div>
  )
}

function EventCard({ event }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e7e8ec', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Color bar */}
      <div style={{ width: 40, height: 4, borderRadius: 2, background: event.color }} />

      {/* Duration */}
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: event.color, background: event.color + '18', padding: '2px 8px', borderRadius: 20 }}>
          {event.durationLabel}
        </span>
      </div>

      <div>
        <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginBottom: 4 }}>{event.name}</div>
        <div style={{ fontSize: 13, color: '#636c72', lineHeight: 1.5 }}>{event.description}</div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 8,
            border: '1px solid #e7e8ec', background: '#fff',
            fontSize: 13, fontWeight: 500, color: '#1a1a1a',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e7e8ec'; e.currentTarget.style.color = '#1a1a1a' }}
        >
          {copied ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <button style={{ display: 'flex', alignItems: 'center', padding: '7px 8px', borderRadius: 8, border: '1px solid #e7e8ec', background: '#fff', cursor: 'pointer' }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5' }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff' }}>
          <Edit2 size={14} color="#636c72" />
        </button>
        <Link to="/book" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: ACCENT, textDecoration: 'none', fontWeight: 500 }}>
          View page <ChevronRight size={13} />
        </Link>
      </div>
    </div>
  )
}

function MeetingRow({ meeting }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 0', borderBottom: '1px solid #f0f1f3' }}>
      {/* Avatar */}
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: meeting.avatarColor, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>
        {meeting.initials}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a' }}>{meeting.attendee}</div>
        <div style={{ fontSize: 12, color: '#636c72' }}>{meeting.type}</div>
      </div>

      {/* Date/time */}
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: '#1a1a1a' }}>{meeting.date}</div>
        <div style={{ fontSize: 12, color: '#636c72' }}>{meeting.time}</div>
      </div>

      {/* Video icon */}
      <div style={{ flexShrink: 0 }}>
        <Video size={15} color="#636c72" />
      </div>

      {/* Join button */}
      <button style={{
        padding: '7px 16px', borderRadius: 8,
        background: ACCENT, color: '#fff',
        border: 'none', fontSize: 13, fontWeight: 600,
        cursor: 'pointer', flexShrink: 0,
      }}>
        Join
      </button>
    </div>
  )
}

function MiniCalendar() {
  const today = new Date()
  const month = today.toLocaleString('default', { month: 'long', year: 'numeric' })
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const todayNum = today.getDate()
  const meetingDays = [31, 1, 2, 5, 7, 8]

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  return (
    <div style={{ background: '#fff', border: '1px solid #e7e8ec', borderRadius: 12, padding: 20 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 16, textAlign: 'center' }}>{month}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px 0', textAlign: 'center' }}>
        {days.map((d, i) => (
          <div key={i} style={{ fontSize: 11, fontWeight: 600, color: '#636c72', padding: '2px 0', marginBottom: 4 }}>{d}</div>
        ))}
        {cells.map((d, i) => (
          <div key={i} style={{
            width: 30, height: 30, margin: '0 auto',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', fontSize: 12,
            background: d === todayNum ? ACCENT : 'transparent',
            color: d === todayNum ? '#fff' : meetingDays.includes(d) ? ACCENT : d ? '#1a1a1a' : 'transparent',
            fontWeight: meetingDays.includes(d) ? 600 : 400,
            cursor: d ? 'pointer' : 'default',
          }}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [shareCopied, setShareCopied] = useState(false)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      <Sidebar active="My Calendly" />

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 32px 32px 40px', minHeight: '100vh' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#636c72', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Dashboard</div>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>Welcome back, Jordan 👋</h1>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={() => { setShareCopied(true); setTimeout(() => setShareCopied(false), 1800) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 8,
                border: '1px solid #e7e8ec', background: '#fff',
                fontSize: 13, fontWeight: 600, color: '#1a1a1a', cursor: 'pointer',
              }}
            >
              {shareCopied ? <Check size={14} color="#16a34a" /> : <Share2 size={14} />}
              {shareCopied ? 'Copied!' : 'Share link'}
            </button>
            <Link to="/book" style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '9px 18px', borderRadius: 8,
              background: ACCENT, color: '#fff',
              fontSize: 13, fontWeight: 600, textDecoration: 'none',
            }}>
              <Plus size={14} />
              New Event Type
            </Link>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24, alignItems: 'start' }}>
          <div>
            {/* Event types */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Event types</h2>
                <Link to="/book" style={{ fontSize: 13, color: ACCENT, textDecoration: 'none', fontWeight: 500 }}>View all</Link>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {eventTypes.map(e => <EventCard key={e.id} event={e} />)}
              </div>
            </div>

            {/* Upcoming meetings */}
            <div style={{ background: '#fff', border: '1px solid #e7e8ec', borderRadius: 12, padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a' }}>Upcoming meetings</h2>
                <Link to="/scheduled" style={{ fontSize: 13, color: ACCENT, textDecoration: 'none', fontWeight: 500 }}>View all</Link>
              </div>
              {upcomingMeetings.map(m => <MeetingRow key={m.id} meeting={m} />)}
            </div>
          </div>

          {/* Right column: mini calendar */}
          <div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 16 }}>Calendar</h2>
            <MiniCalendar />

            {/* Quick tip */}
            <div style={{ marginTop: 16, background: '#e8f0ff', borderRadius: 12, padding: '14px 16px' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 4 }}>Tip</div>
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>
                Share your booking link in your email signature to get more meetings booked automatically.
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}