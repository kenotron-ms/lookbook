import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Lock, Globe, X, Plus, Image, ArrowLeft } from 'lucide-react'
import { pins } from '../data/pins.js'

const CATEGORIES = ['Fashion', 'Home Decor', 'Food', 'DIY', 'Art', 'Travel', 'Architecture', 'Photography', 'Wellness', 'Technology']

export default function Create() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isSecret, setIsSecret] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const [category, setCategory] = useState('')
  const [pinSearch, setPinSearch] = useState('')
  const [selectedPins, setSelectedPins] = useState([])

  const searchedPins = pinSearch
    ? pins.filter(p =>
        p.title.toLowerCase().includes(pinSearch.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(pinSearch.toLowerCase()))
      )
    : pins.slice(0, 12)

  const togglePin = pin => {
    setSelectedPins(prev =>
      prev.find(p => p.id === pin.id) ? prev.filter(p => p.id !== pin.id) : [...prev, pin]
    )
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 24px' }}>
      {/* Back */}
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#767676',
          textDecoration: 'none',
          fontSize: 14,
          fontWeight: 500,
          marginBottom: 28,
        }}
      >
        <ArrowLeft size={16} /> Back to home
      </Link>

      <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', marginBottom: 8 }}>Create board</h1>
      <p style={{ fontSize: 15, color: '#767676', marginBottom: 32 }}>
        Organize your ideas and inspiration into curated collections
      </p>

      <div
        style={{
          background: '#fff',
          border: '1px solid #e0e0e0',
          borderRadius: 24,
          padding: 32,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Board title */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 8 }}>
            Board title <span style={{ color: '#e60023' }}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Give your board a name..."
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '2px solid #e0e0e0',
              fontSize: 15,
              color: '#111',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.target.style.borderColor = '#e60023')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
          <p style={{ fontSize: 12, color: '#767676', marginTop: 6 }}>
            {title.length}/50 characters
          </p>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 8 }}>
            Description <span style={{ color: '#767676', fontWeight: 400 }}>(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="What is this board about?"
            rows={3}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 12,
              border: '2px solid #e0e0e0',
              fontSize: 15,
              color: '#111',
              outline: 'none',
              resize: 'vertical',
              fontFamily: 'Inter, sans-serif',
            }}
            onFocus={e => (e.target.style.borderColor = '#e60023')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
        </div>

        {/* Category */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 8 }}>
            Category
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat === category ? '' : cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 24,
                  border: '2px solid',
                  borderColor: category === cat ? '#e60023' : '#e0e0e0',
                  background: category === cat ? '#fff0f1' : '#fff',
                  color: category === cat ? '#e60023' : '#111',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Visibility toggle */}
        <div>
          <label style={{ display: 'block', fontWeight: 700, fontSize: 14, color: '#111', marginBottom: 12 }}>
            Visibility
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { label: 'Public', icon: Globe, value: true },
              { label: 'Private', icon: Lock, value: false },
            ].map(opt => (
              <button
                key={opt.label}
                onClick={() => setIsPublic(opt.value)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '14px 20px',
                  borderRadius: 16,
                  border: '2px solid',
                  borderColor: isPublic === opt.value ? '#e60023' : '#e0e0e0',
                  background: isPublic === opt.value ? '#fff0f1' : '#fff',
                  color: isPublic === opt.value ? '#e60023' : '#111',
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                <opt.icon size={16} />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secret board toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 20px',
            background: '#f8f8f8',
            borderRadius: 16,
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>
              <Lock size={14} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle' }} />
              Secret board
            </p>
            <p style={{ fontSize: 12, color: '#767676', marginTop: 2 }}>
              Only you and collaborators can see this board
            </p>
          </div>
          <button
            onClick={() => setIsSecret(!isSecret)}
            style={{
              width: 48,
              height: 26,
              borderRadius: 13,
              background: isSecret ? '#e60023' : '#e0e0e0',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background 0.2s',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 3,
                left: isSecret ? 25 : 3,
                width: 20,
                height: 20,
                borderRadius: '50%',
                background: '#fff',
                transition: 'left 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
          </button>
        </div>
      </div>

      {/* Add pins section */}
      <div style={{ marginTop: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#111', marginBottom: 6 }}>Add pins</h2>
        <p style={{ fontSize: 14, color: '#767676', marginBottom: 16 }}>
          Search your saved pins to add to this board
        </p>

        {/* Selected pins */}
        {selectedPins.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
            {selectedPins.map(pin => (
              <div
                key={pin.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 10px 6px 6px',
                  background: '#f0f0f0',
                  borderRadius: 24,
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#111',
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: pin.gradient,
                    flexShrink: 0,
                  }}
                />
                {pin.title}
                <button
                  onClick={() => togglePin(pin)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}
                >
                  <X size={14} color="#767676" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <Search
            size={16}
            color="#767676"
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            type="text"
            value={pinSearch}
            onChange={e => setPinSearch(e.target.value)}
            placeholder="Search your saved pins..."
            style={{
              width: '100%',
              padding: '12px 16px 12px 42px',
              borderRadius: 12,
              border: '2px solid #e0e0e0',
              fontSize: 14,
              color: '#111',
              outline: 'none',
            }}
            onFocus={e => (e.target.style.borderColor = '#e60023')}
            onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
          />
        </div>

        {/* Pin grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 8,
          }}
        >
          {searchedPins.map(pin => {
            const isSelected = selectedPins.find(p => p.id === pin.id)
            return (
              <div
                key={pin.id}
                onClick={() => togglePin(pin)}
                style={{
                  position: 'relative',
                  cursor: 'pointer',
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: isSelected ? '3px solid #e60023' : '3px solid transparent',
                  transition: 'border-color 0.15s',
                }}
              >
                <div
                  style={{
                    height: 100,
                    background: pin.gradient,
                    borderRadius: 10,
                  }}
                />
                {isSelected && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#e60023',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: 12, fontWeight: 700 }}>✓</span>
                  </div>
                )}
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#111',
                    padding: '4px 2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {pin.title}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Create button */}
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button
            style={{
              padding: '14px 28px',
              borderRadius: 24,
              border: '2px solid #e0e0e0',
              background: '#fff',
              fontWeight: 700,
              fontSize: 15,
              color: '#111',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </Link>
        <button
          style={{
            padding: '14px 32px',
            borderRadius: 24,
            border: 'none',
            background: title ? '#e60023' : '#e0e0e0',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            cursor: title ? 'pointer' : 'not-allowed',
          }}
          disabled={!title}
        >
          Create board
        </button>
      </div>
    </div>
  )
}
