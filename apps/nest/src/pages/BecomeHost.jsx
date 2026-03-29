import { useState } from 'react'
import { Home, Building2, TreePine, Hotel, Upload, ChevronLeft, ChevronRight, Check } from 'lucide-react'

const propertyTypes = [
  { icon: Home, label: 'House', desc: 'A standalone home' },
  { icon: Building2, label: 'Apartment', desc: 'A unit in a building' },
  { icon: TreePine, label: 'Guesthouse', desc: 'A private space' },
  { icon: Hotel, label: 'Hotel', desc: 'A professional stay' },
]

const stepTitles = [
  'Tell us about your place',
  'Make it stand out',
  'Finish up',
]

const stepSubtitles = [
  'Which of these best describes your place?',
  'Add some photos and details',
  'Set your price and availability',
]

function Step1({ propertyType, setPropertyType }) {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '32px' }}>
        {propertyTypes.map(({ icon: Icon, label, desc }) => (
          <button
            key={label}
            onClick={() => setPropertyType(label)}
            style={{
              padding: '24px',
              border: `2px solid ${propertyType === label ? '#222222' : '#dddddd'}`,
              borderRadius: '12px',
              background: propertyType === label ? '#f7f7f7' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.15s',
            }}
          >
            <Icon size={32} color="#222222" style={{ marginBottom: '12px', display: 'block' }} />
            <div style={{ fontSize: '16px', fontWeight: 600, color: '#222222', marginBottom: '4px' }}>{label}</div>
            <div style={{ fontSize: '13px', color: '#717171' }}>{desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

function Step2({ title, setTitle, description, setDescription }) {
  return (
    <div style={{ marginTop: '32px' }}>
      {/* Photo Upload */}
      <div
        style={{
          border: '2px dashed #dddddd',
          borderRadius: '12px',
          padding: '48px',
          textAlign: 'center',
          marginBottom: '24px',
          cursor: 'pointer',
          background: '#fafafa',
        }}
      >
        <Upload size={40} color="#717171" style={{ margin: '0 auto 12px', display: 'block' }} />
        <div style={{ fontSize: '16px', fontWeight: 600, color: '#222222', marginBottom: '4px' }}>
          Drag your photos here
        </div>
        <div style={{ fontSize: '13px', color: '#717171', marginBottom: '16px' }}>
          Choose at least 5 photos
        </div>
        <button
          style={{
            padding: '10px 20px',
            border: '1px solid #222222',
            borderRadius: '8px',
            background: '#ffffff',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            color: '#222222',
          }}
        >
          Upload from device
        </button>
      </div>

      {/* Title */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#222222', marginBottom: '8px' }}>
          Create your title
        </label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Stunning cliffside villa with sea views"
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '1px solid #dddddd',
            borderRadius: '10px',
            fontSize: '15px',
            color: '#222222',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <div style={{ fontSize: '12px', color: '#717171', textAlign: 'right', marginTop: '4px' }}>
          {title.length}/32
        </div>
      </div>

      {/* Description */}
      <div>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#222222', marginBottom: '8px' }}>
          Create your description
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Share what makes your place special..."
          rows={5}
          style={{
            width: '100%',
            padding: '14px 16px',
            border: '1px solid #dddddd',
            borderRadius: '10px',
            fontSize: '15px',
            color: '#222222',
            outline: 'none',
            fontFamily: 'inherit',
            resize: 'vertical',
          }}
        />
        <div style={{ fontSize: '12px', color: '#717171', textAlign: 'right', marginTop: '4px' }}>
          {description.length}/500
        </div>
      </div>
    </div>
  )
}

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function Step3({ price, setPrice }) {
  const today = new Date()

  return (
    <div style={{ marginTop: '32px' }}>
      {/* Pricing */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#222222', marginBottom: '8px' }}>
          Set your nightly price
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #dddddd', borderRadius: '10px', overflow: 'hidden' }}>
          <span style={{ padding: '14px 16px', fontSize: '20px', fontWeight: 700, color: '#222222', borderRight: '1px solid #dddddd', background: '#f7f7f7' }}>
            $
          </span>
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            style={{
              flex: 1,
              padding: '14px 16px',
              border: 'none',
              fontSize: '20px',
              fontWeight: 700,
              color: '#222222',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          <span style={{ padding: '14px 16px', fontSize: '14px', color: '#717171', borderLeft: '1px solid #dddddd', background: '#f7f7f7' }}>
            per night
          </span>
        </div>
        <div style={{ marginTop: '12px', padding: '12px 16px', background: '#f7f7f7', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '13px', color: '#717171' }}>Guest price before taxes</span>
          <span style={{ fontSize: '13px', fontWeight: 600, color: '#222222' }}>${Math.round(price * 1.14)}/night</span>
        </div>
      </div>

      {/* Availability Calendar */}
      <div>
        <label style={{ display: 'block', fontSize: '15px', fontWeight: 600, color: '#222222', marginBottom: '16px' }}>
          Set your availability
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {[0, 1].map(offset => {
            const date = new Date(today.getFullYear(), today.getMonth() + offset, 1)
            const monthLabel = date.toLocaleString('default', { month: 'long', year: 'numeric' })
            const firstDay = date.getDay()
            const daysCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
            return (
              <div key={offset}>
                <div style={{ textAlign: 'center', fontSize: '14px', fontWeight: 600, color: '#222222', marginBottom: '12px' }}>
                  {monthLabel}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
                  {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                    <div key={d} style={{ fontSize: '10px', fontWeight: 600, color: '#717171', padding: '4px 0' }}>{d}</div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                  {Array.from({ length: daysCount }).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '6px 0',
                        fontSize: '12px',
                        color: '#222222',
                        cursor: 'pointer',
                        borderRadius: '50%',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#ff385c'; e.currentTarget.style.color = '#ffffff' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#222222' }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function BecomeHost() {
  const [step, setStep] = useState(1)
  const [propertyType, setPropertyType] = useState('House')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(120)
  const [completed, setCompleted] = useState(false)

  const progress = (step / 3) * 100

  if (completed) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px', padding: '48px 24px' }}>
          <div
            style={{
              width: '80px',
              height: '80px',
              background: '#ff385c',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Check size={40} color="white" strokeWidth={3} />
          </div>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#222222', marginBottom: '12px' }}>
            Your listing is live!
          </h2>
          <p style={{ fontSize: '16px', color: '#717171', lineHeight: 1.6 }}>
            Congratulations! Your property has been submitted for review. You'll receive your first booking soon.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: '#ffffff' }}>
      {/* Progress Bar */}
      <div style={{ height: '4px', background: '#ebebeb', position: 'fixed', top: '80px', left: 0, right: 0, zIndex: 30 }}>
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: '#ff385c',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '48px 24px 120px' }}>
        {/* Step indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step >= s ? '#222222' : '#ebebeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: step >= s ? '#ffffff' : '#717171',
                }}
              >
                {step > s ? <Check size={14} color="white" strokeWidth={3} /> : s}
              </div>
              {s < 3 && <div style={{ width: '40px', height: '2px', background: step > s ? '#222222' : '#ebebeb', transition: 'background 0.3s' }} />}
            </div>
          ))}
          <span style={{ fontSize: '13px', color: '#717171', marginLeft: '8px' }}>Step {step} of 3</span>
        </div>

        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#222222', marginBottom: '4px' }}>
          {stepTitles[step - 1]}
        </h1>
        <p style={{ fontSize: '16px', color: '#717171', marginBottom: '8px' }}>
          {stepSubtitles[step - 1]}
        </p>

        {step === 1 && <Step1 propertyType={propertyType} setPropertyType={setPropertyType} />}
        {step === 2 && <Step2 title={title} setTitle={setTitle} description={description} setDescription={setDescription} />}
        {step === 3 && <Step3 price={price} setPrice={setPrice} />}
      </div>

      {/* Bottom Nav */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#ffffff',
          borderTop: '1px solid #ebebeb',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 30,
        }}
      >
        <button
          onClick={() => setStep(s => Math.max(1, s - 1))}
          disabled={step === 1}
          style={{
            padding: '12px 24px',
            background: 'transparent',
            border: 'none',
            cursor: step === 1 ? 'default' : 'pointer',
            fontSize: '15px',
            fontWeight: 600,
            color: step === 1 ? '#dddddd' : '#222222',
            textDecoration: 'underline',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ChevronLeft size={16} />
          Back
        </button>
        <button
          onClick={() => {
            if (step < 3) setStep(s => s + 1)
            else setCompleted(true)
          }}
          style={{
            padding: '14px 32px',
            background: '#222222',
            color: '#ffffff',
            border: 'none',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          {step === 3 ? 'Publish listing' : 'Next'}
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
