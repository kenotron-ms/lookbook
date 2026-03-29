import { CheckCircle, Download, Hotel, Calendar, Users, Tag, Phone, Mail, Printer } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ConfirmPage() {
  const navigate = useNavigate()
  const confirmNumber = 'RES-2026-' + Math.floor(Math.random() * 900000 + 100000)

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 16px' }}>
      {/* Success banner */}
      <div style={{
        background: 'linear-gradient(135deg, #28a745 0%, #20863a 100%)',
        borderRadius: 12,
        padding: '32px 40px',
        textAlign: 'center',
        marginBottom: 28,
        color: '#fff',
      }}>
        <CheckCircle size={56} color="#fff" style={{ marginBottom: 12 }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
          Your reservation is confirmed!
        </h1>
        <p style={{ fontSize: 16, opacity: 0.85 }}>
          A confirmation has been sent to your email address
        </p>
      </div>

      {/* Booking details card */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '28px 32px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid #f2f2f2' }}>
          <div style={{ background: '#e8f0fb', borderRadius: 8, padding: 10 }}>
            <Hotel size={24} color="#003580" />
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#333' }}>The Grand Meridian Hotel</h2>
            <p style={{ fontSize: 14, color: '#6b6b6b' }}>Paris, France · ★★★★★</p>
          </div>
        </div>

        {/* Confirmation number */}
        <div style={{
          background: 'linear-gradient(135deg, #e8f0fb 0%, #f0f4ff 100%)',
          border: '1px dashed #006ce4',
          borderRadius: 8,
          padding: '14px 20px',
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 12, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Confirmation number</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#003580', letterSpacing: '1px', marginTop: 2 }}>{confirmNumber}</div>
          </div>
          <Tag size={28} color="#006ce4" />
        </div>

        {/* Booking details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
          <DetailBox icon={Calendar} label="Check-in" value="Thursday, April 10, 2026" sub="After 3:00 PM" />
          <DetailBox icon={Calendar} label="Check-out" value="Sunday, April 13, 2026" sub="Before 12:00 PM" />
          <DetailBox icon={Users} label="Guests" value="2 adults" sub="1 room · 3 nights" />
          <DetailBox icon={Hotel} label="Room type" value="Standard Double Room" sub="City view · Free WiFi" />
        </div>

        {/* Price summary */}
        <div style={{ background: '#f7f9fc', borderRadius: 8, padding: '16px 20px', marginBottom: 0 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#333', marginBottom: 12 }}>Price summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { label: '3 nights × $289/night', value: '$867.00' },
              { label: 'Taxes & fees', value: '$87.00' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span style={{ color: '#6b6b6b' }}>{label}</span>
                <span style={{ color: '#333' }}>{value}</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #e7e8e9', paddingTop: 10, marginTop: 4, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: 15, color: '#333' }}>Total charged</span>
              <span style={{ fontWeight: 700, fontSize: 18, color: '#333' }}>$954.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e7e8e9', padding: '24px 32px', marginBottom: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#333', marginBottom: 16 }}>Contact information</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ContactRow icon={Users} label="Guest name" value="Alex Johnson" />
          <ContactRow icon={Mail} label="Email" value="alex.johnson@example.com" />
          <ContactRow icon={Phone} label="Phone" value="+1 (555) 234-5678" />
          <ContactRow icon={Hotel} label="Hotel contact" value="+33 1 42 65 21 80" />
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#006ce4',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '13px 24px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <Download size={18} />
          Download confirmation
        </button>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: '#fff',
            color: '#333',
            border: '1px solid #e7e8e9',
            borderRadius: 4,
            padding: '13px 20px',
            fontSize: 15,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          <Printer size={18} />
          Print
        </button>
        <button
          onClick={() => navigate('/')}
          style={{
            background: '#fff',
            color: '#006ce4',
            border: '1px solid #006ce4',
            borderRadius: 4,
            padding: '13px 20px',
            fontSize: 15,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Book another stay
        </button>
      </div>

      {/* Footer note */}
      <div style={{ textAlign: 'center', marginTop: 28, color: '#6b6b6b', fontSize: 13 }}>
        <p>Need to modify or cancel your booking? <a href="#" style={{ color: '#006ce4' }}>Manage your reservation</a></p>
        <p style={{ marginTop: 6 }}>Questions? Contact <a href="#" style={{ color: '#006ce4' }}>Reserve customer support</a></p>
      </div>
    </div>
  )
}

function DetailBox({ icon: Icon, label, value, sub }) {
  return (
    <div style={{ border: '1px solid #e7e8e9', borderRadius: 8, padding: '14px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Icon size={16} color="#006ce4" />
        <span style={{ fontSize: 12, fontWeight: 600, color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</span>
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: '#333', marginBottom: 2 }}>{value}</div>
      <div style={{ fontSize: 12, color: '#6b6b6b' }}>{sub}</div>
    </div>
  )
}

function ContactRow({ icon: Icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ background: '#f2f2f2', borderRadius: 6, padding: 7, flexShrink: 0 }}>
        <Icon size={15} color="#6b6b6b" />
      </div>
      <div>
        <div style={{ fontSize: 12, color: '#6b6b6b' }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#333' }}>{value}</div>
      </div>
    </div>
  )
}
