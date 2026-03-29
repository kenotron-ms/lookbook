import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock, Video, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { timeSlots, unavailableDays } from '../data/events.js'

const ACCENT = '#006bff'

function CalendarGrid({ selectedDay, onSelectDay }) {
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const monthName = viewDate.toLocaleString('default', { month: 'long' })
  const year = viewDate.getFullYear()
  const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate()
  const firstDay = viewDate.getDay() // 0=Sun
  const offset = firstDay === 0 ? 6 : firstDay - 1
  const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const isCurrentMonth = viewDate.getMonth() === today.getMonth() && viewDate.getFullYear() === today.getFullYear()
  const todayDay = isCurrentMonth ? today.getDate() : -1

  const prevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
  const nextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))

  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isPast = (d) => {
    if (!d) return false
    if (!isCurrentMonth) return false
    return d < today.getDate()
  }

  const isUnavailable = (d) => unavailableDays.includes(d)

  return (
    <div>
      {/* Month nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={prevMonth} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <ChevronLeft size={18} color="#636c72" />
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>{monthName} {year}</span>
        <button onClick={nextMonth} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 6, borderRadius: 6, display: 'flex', alignItems: 'center' }}
          onMouseEnter={e => e.currentTarget.style.background = '#f0f0f0'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <ChevronRight size={18} color="#636c72" />
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', marginBottom: 8 }}>
        {dayLabels.map(d => (
          <div key={d} style={{ fontSize: 11, fontWeight: 600, color: '#636c72', paddingBottom: 8 }}>{d}</div>
        ))}
      </div>

      {/* Day grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
        {cells.map((d, i) => {
          const past = isPast(d)
          const unavail = isUnavailable(d)
          const isToday = d === todayDay
          const isSelected = d === selectedDay
          const disabled = !d || past || unavail

          let bg = 'transparent'
          let color = '#1a1a1a'
          let cursor = 'pointer'
          let border = 'none'

          if (isSelected) { bg = ACCENT; color = '#fff' }
          else if (isToday) { bg = '#e8f0ff'; color = ACCENT }
          else if (disabled) { color = '#c5c8cc'; cursor = 'default' }

          return (
            <div
              key={i}
              onClick={() => !disabled && onSelectDay(d)}
              style={{
                height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 8, background: bg, color,
                fontSize: 14, fontWeight: isSelected || isToday ? 700 : 400,
                cursor, userSelect: 'none', transition: 'background 0.12s',
              }}
              onMouseEnter={e => { if (!disabled && !isSelected) e.currentTarget.style.background = '#f0f4ff' }}
              onMouseLeave={e => { if (!disabled && !isSelected) e.currentTarget.style.background = 'transparent' }}
            >
              {d || ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TimeSlotList({ selectedSlot, onSelectSlot }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 420, overflowY: 'auto', paddingRight: 4 }}>
      {timeSlots.map(slot => {
        const isSelected = slot === selectedSlot
        return (
          <button
            key={slot}
            onClick={() => onSelectSlot(slot)}
            style={{
              padding: '11px 16px', borderRadius: 8,
              border: `1.5px solid ${isSelected ? ACCENT : '#e7e8ec'}`,
              background: isSelected ? ACCENT : '#fff',
              color: isSelected ? '#fff' : '#1a1a1a',
              fontSize: 14, fontWeight: 500, cursor: 'pointer',
              transition: 'all 0.15s', textAlign: 'center',
            }}
            onMouseEnter={e => { if (!isSelected) { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT } }}
            onMouseLeave={e => { if (!isSelected) { e.currentTarget.style.borderColor = '#e7e8ec'; e.currentTarget.style.color = '#1a1a1a' } }}
          >
            {slot}
          </button>
        )
      })}
    </div>
  )
}

export default function Book() {
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const navigate = useNavigate()

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot)
  }

  const handleConfirm = () => {
    if (selectedDay && selectedSlot) {
      navigate('/confirm')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ height: 56, borderBottom: '1px solid #e7e8ec', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarDays size={15} color="#fff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>Schedule</span>
        <span style={{ color: '#e7e8ec', margin: '0 4px' }}>|</span>
        <span style={{ fontSize: 13, color: '#636c72' }}>schedule.paranet</span>
      </div>

      {/* Main booking UI */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ display: 'flex', border: '1px solid #e7e8ec', borderRadius: 16, overflow: 'hidden', background: '#fff', maxWidth: 860, width: '100%', boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}>

          {/* Left panel */}
          <div style={{ width: 280, padding: 32, borderRight: '1px solid #e7e8ec', flexShrink: 0 }}>
            {/* Host avatar + info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #006bff, #4da3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700, flexShrink: 0 }}>
                JB
              </div>
              <div>
                <div style={{ fontSize: 13, color: '#636c72' }}>Jordan Blake</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>30 Minute Meeting</div>
              </div>
            </div>

            {/* Video badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#e8f0ff', padding: '4px 10px', borderRadius: 20, marginBottom: 24 }}>
              <Video size={12} color={ACCENT} />
              <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>Video call</span>
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Clock size={15} color="#636c72" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>30 minutes</div>
                  <div style={{ fontSize: 12, color: '#636c72' }}>Duration</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Video size={15} color="#636c72" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>Zoom</div>
                  <div style={{ fontSize: 12, color: '#636c72' }}>Video platform</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Globe size={15} color="#636c72" style={{ marginTop: 1, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a1a' }}>America/Los_Angeles</div>
                  <div style={{ fontSize: 12, color: '#636c72' }}>Timezone</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24, padding: '14px', background: '#f8f9fa', borderRadius: 10 }}>
              <p style={{ fontSize: 12, color: '#636c72', lineHeight: 1.6 }}>
                A quick sync to connect, align, or explore working together. Pick a time that works for you.
              </p>
            </div>
          </div>

          {/* Right panel */}
          <div style={{ flex: 1, padding: 32 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', marginBottom: 24, letterSpacing: '-0.3px' }}>Select a Date &amp; Time</h2>

            <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
              {/* Calendar */}
              <div style={{ flex: 1 }}>
                <CalendarGrid selectedDay={selectedDay} onSelectDay={setSelectedDay} />

                {/* Timezone */}
                <div style={{ marginTop: 20 }}>
                  <select style={{
                    width: '100%', padding: '9px 12px', borderRadius: 8,
                    border: '1px solid #e7e8ec', background: '#fff',
                    fontSize: 13, color: '#636c72', cursor: 'pointer', outline: 'none',
                  }}>
                    <option>🌍 America/Los_Angeles (PDT, UTC-7)</option>
                    <option>🌍 America/New_York (EDT, UTC-4)</option>
                    <option>🌍 Europe/London (BST, UTC+1)</option>
                    <option>🌍 Asia/Tokyo (JST, UTC+9)</option>
                  </select>
                </div>
              </div>

              {/* Time slots */}
              {selectedDay && (
                <div style={{ width: 160, flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginBottom: 12 }}>
                    Available times
                  </div>
                  <TimeSlotList selectedSlot={selectedSlot} onSelectSlot={handleSlotClick} />
                  {selectedSlot && (
                    <button
                      onClick={handleConfirm}
                      style={{
                        marginTop: 12, width: '100%', padding: '11px 0',
                        borderRadius: 8, background: ACCENT, color: '#fff',
                        border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer',
                      }}
                    >
                      Confirm →
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}