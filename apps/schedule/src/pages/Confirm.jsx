import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarDays, Clock, Video, Globe, User, Mail, MessageSquare, UserPlus, ChevronLeft } from 'lucide-react'

const ACCENT = '#006bff'

export default function Confirm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', notes: '', guest: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    navigate('/scheduled')
  }

  const inputStyle = (hasError) => ({
    width: '100%',
    padding: '11px 0 11px 0',
    border: 'none',
    borderBottom: `2px solid ${hasError ? '#dc2626' : '#e7e8ec'}`,
    fontSize: 15,
    color: '#1a1a1a',
    background: 'transparent',
    outline: 'none',
    transition: 'border-color 0.15s',
  })

  const InputWrapper = ({ icon: Icon, label, children, error }) => (
    <div style={{ marginBottom: 28 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, fontWeight: 600, color: '#636c72', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        <Icon size={13} />
        {label}
      </label>
      {children}
      {error && <div style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{error}</div>}
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8f9fa', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ height: 56, background: '#fff', borderBottom: '1px solid #e7e8ec', display: 'flex', alignItems: 'center', padding: '0 32px', gap: 12 }}>
        <div style={{ width: 28, height: 28, borderRadius: 6, background: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CalendarDays size={15} color="#fff" />
        </div>
        <span style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a' }}>Schedule</span>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '48px 24px' }}>
        <div style={{ display: 'flex', border: '1px solid #e7e8ec', borderRadius: 16, overflow: 'hidden', background: '#fff', maxWidth: 760, width: '100%', boxShadow: '0 2px 24px rgba(0,0,0,0.07)' }}>

          {/* Left summary panel */}
          <div style={{ width: 260, background: '#f8f9fa', padding: 32, borderRight: '1px solid #e7e8ec', flexShrink: 0 }}>
            <button
              onClick={() => navigate('/book')}
              style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: 'none', color: '#636c72', fontSize: 13, cursor: 'pointer', marginBottom: 24, padding: 0 }}
            >
              <ChevronLeft size={15} /> Back
            </button>

            {/* Host */}
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #006bff, #4da3ff)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
              JB
            </div>
            <div style={{ fontSize: 12, color: '#636c72', marginBottom: 2 }}>Jordan Blake</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: '#1a1a1a', marginBottom: 20 }}>30 Minute Meeting</div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Clock size={14} color="#636c72" />
                <span style={{ fontSize: 13, color: '#444' }}>30 minutes</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <CalendarDays size={14} color="#636c72" />
                <div>
                  <div style={{ fontSize: 13, color: '#444', fontWeight: 600 }}>Monday, March 31, 2025</div>
                  <div style={{ fontSize: 12, color: '#636c72' }}>9:00 AM – 9:30 AM</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Video size={14} color="#636c72" />
                <span style={{ fontSize: 13, color: '#444' }}>Zoom meeting</span>
              </div>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <Globe size={14} color="#636c72" />
                <span style={{ fontSize: 13, color: '#636c72' }}>America/Los_Angeles</span>
              </div>
            </div>
          </div>

          {/* Right form panel */}
          <div style={{ flex: 1, padding: '32px 36px' }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', marginBottom: 6, letterSpacing: '-0.4px' }}>Enter your details</h2>
            <p style={{ fontSize: 14, color: '#636c72', marginBottom: 32 }}>We'll send a confirmation to your email.</p>

            <form onSubmit={handleSubmit} noValidate>
              <InputWrapper icon={User} label="Name *" error={errors.name}>
                <input
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange('name')}
                  style={inputStyle(errors.name)}
                  onFocus={e => e.target.style.borderBottomColor = ACCENT}
                  onBlur={e => e.target.style.borderBottomColor = errors.name ? '#dc2626' : '#e7e8ec'}
                />
              </InputWrapper>

              <InputWrapper icon={Mail} label="Email *" error={errors.email}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange('email')}
                  style={inputStyle(errors.email)}
                  onFocus={e => e.target.style.borderBottomColor = ACCENT}
                  onBlur={e => e.target.style.borderBottomColor = errors.email ? '#dc2626' : '#e7e8ec'}
                />
              </InputWrapper>

              <InputWrapper icon={MessageSquare} label="Additional notes">
                <textarea
                  placeholder="Please share anything that will help prepare for our meeting..."
                  value={form.notes}
                  onChange={handleChange('notes')}
                  rows={3}
                  style={{
                    ...inputStyle(false),
                    resize: 'none',
                    lineHeight: 1.6,
                    display: 'block',
                    paddingTop: 8,
                  }}
                  onFocus={e => e.target.style.borderBottomColor = ACCENT}
                  onBlur={e => e.target.style.borderBottomColor = '#e7e8ec'}
                />
              </InputWrapper>

              <InputWrapper icon={UserPlus} label="Add guests">
                <input
                  type="email"
                  placeholder="guest@example.com"
                  value={form.guest}
                  onChange={handleChange('guest')}
                  style={inputStyle(false)}
                  onFocus={e => e.target.style.borderBottomColor = ACCENT}
                  onBlur={e => e.target.style.borderBottomColor = '#e7e8ec'}
                />
              </InputWrapper>

              <button
                type="submit"
                style={{
                  width: '100%', padding: '14px 0',
                  borderRadius: 10, background: ACCENT, color: '#fff',
                  border: 'none', fontSize: 16, fontWeight: 700,
                  cursor: 'pointer', marginTop: 8,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Schedule Event
              </button>

              <p style={{ fontSize: 12, color: '#636c72', marginTop: 12, textAlign: 'center', lineHeight: 1.5 }}>
                By proceeding, you confirm that you have read and agree to our
                {' '}<span style={{ color: ACCENT, cursor: 'pointer' }}>Terms of Use</span>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}