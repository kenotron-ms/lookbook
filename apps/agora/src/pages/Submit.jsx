import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Image, Link2, BarChart2, Type, Bold, Italic, Link as LinkIcon,
  Quote, Code, ChevronDown, X,
} from 'lucide-react'
import Header from '../components/Header.jsx'
import { communities } from '../data/posts.js'

const flairs = [
  { label: 'Discussion', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
  { label: 'News', color: '#ff6314', bg: 'rgba(255,99,20,0.15)' },
  { label: 'Tutorial', color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { label: 'Question', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
  { label: 'Announcement', color: '#8b5cf6', bg: 'rgba(139,92,246,0.15)' },
  { label: 'Meta', color: '#818384', bg: 'rgba(129,131,132,0.15)' },
]

const tabs = [
  { id: 'post', label: 'Post', icon: <Type size={15} /> },
  { id: 'media', label: 'Images & Video', icon: <Image size={15} /> },
  { id: 'link', label: 'Link', icon: <Link2 size={15} /> },
  { id: 'poll', label: 'Poll', icon: <BarChart2 size={15} /> },
]

export default function Submit() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('post')
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [communityOpen, setCommunityOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [selectedFlair, setSelectedFlair] = useState(null)

  const canSubmit = selectedCommunity && title.trim().length > 0

  return (
    <div style={{ background: '#1a1a1b', minHeight: '100vh' }}>
      <Header />

      <div style={{
        display: 'flex', maxWidth: 1100, margin: '0 auto',
        paddingTop: 64, paddingLeft: 16, paddingRight: 16, gap: 24,
      }}>
        {/* Main form */}
        <main style={{ flex: 1, minWidth: 0, paddingTop: 24 }}>
          <h1 style={{
            fontSize: 18, fontWeight: 700, color: '#d7dadc',
            marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid #343536',
          }}>
            Create a post
          </h1>

          {/* Community selector */}
          <div style={{ position: 'relative', marginBottom: 20 }}>
            <button
              onClick={() => setCommunityOpen(o => !o)}
              style={{
                width: '100%', padding: '10px 16px',
                background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
                display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
                color: selectedCommunity ? '#d7dadc' : '#818384', fontSize: 14,
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#818384'}
              onMouseLeave={e => { if (!communityOpen) e.currentTarget.style.borderColor = '#343536'; }}
            >
              {selectedCommunity ? (
                <>
                  <div style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: communities.find(c => c.id === selectedCommunity)?.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
                  }}>
                    {communities.find(c => c.id === selectedCommunity)?.icon}
                  </div>
                  <span style={{ fontWeight: 700 }}>g/{selectedCommunity}</span>
                </>
              ) : (
                <span>Choose a community</span>
              )}
              <ChevronDown size={16} style={{ marginLeft: 'auto' }} />
            </button>

            {communityOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
                background: '#1a1a1b', border: '1px solid #343536', borderRadius: 4,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)', marginTop: 4, overflow: 'hidden',
              }}>
                {communities.map(c => (
                  <div
                    key={c.id}
                    onClick={() => { setSelectedCommunity(c.id); setCommunityOpen(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 16px', cursor: 'pointer',
                      background: selectedCommunity === c.id ? '#272729' : 'transparent',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#272729'}
                    onMouseLeave={e => e.currentTarget.style.background = selectedCommunity === c.id ? '#272729' : 'transparent'}
                  >
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: c.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15,
                    }}>
                      {c.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#d7dadc' }}>g/{c.name}</div>
                      <div style={{ fontSize: 12, color: '#818384' }}>
                        {(c.members / 1000000).toFixed(1)}M members
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tab bar */}
          <div style={{
            display: 'flex', borderBottom: '1px solid #343536', marginBottom: 0,
            background: '#1a1a1b', border: '1px solid #343536', borderRadius: '4px 4px 0 0',
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '12px 0', border: 'none', borderBottom: activeTab === tab.id ? '2px solid #ff6314' : '2px solid transparent',
                  background: 'transparent', cursor: 'pointer',
                  color: activeTab === tab.id ? '#ff6314' : '#818384',
                  fontWeight: 700, fontSize: 13, transition: 'all 0.1s',
                }}
                onMouseEnter={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#d7dadc'; }}
                onMouseLeave={e => { if (activeTab !== tab.id) e.currentTarget.style.color = '#818384'; }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Form body */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536', borderTop: 'none',
            borderRadius: '0 0 4px 4px', padding: 16,
          }}>
            {/* Title */}
            <div style={{ marginBottom: 12 }}>
              <div style={{ position: 'relative' }}>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value.slice(0, 300))}
                  placeholder="Title"
                  maxLength={300}
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#272729', border: '1px solid #343536',
                    borderRadius: 4, color: '#d7dadc', fontSize: 15,
                    outline: 'none', boxSizing: 'border-box',
                    paddingRight: 60,
                  }}
                  onFocus={e => e.target.style.border = '1px solid #ff6314'}
                  onBlur={e => e.target.style.border = '1px solid #343536'}
                />
                <span style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 12, color: '#818384',
                }}>
                  {title.length}/300
                </span>
              </div>
            </div>

            {activeTab === 'post' && (
              <div style={{ marginBottom: 12 }}>
                {/* Formatting toolbar */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 2,
                  padding: '6px 8px', background: '#272729',
                  border: '1px solid #343536', borderBottom: 'none',
                  borderRadius: '4px 4px 0 0',
                }}>
                  {[
                    { icon: <Bold size={14} />, label: 'Bold' },
                    { icon: <Italic size={14} />, label: 'Italic' },
                    { icon: <LinkIcon size={14} />, label: 'Link' },
                    { icon: <Quote size={14} />, label: 'Quote' },
                    { icon: <Code size={14} />, label: 'Code' },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      title={label}
                      style={{
                        padding: '4px 8px', background: 'none', border: 'none',
                        borderRadius: 2, cursor: 'pointer', color: '#818384',
                        display: 'flex', alignItems: 'center',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#343536'; e.currentTarget.style.color = '#d7dadc'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#818384'; }}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  placeholder="Text (optional)"
                  rows={8}
                  style={{
                    width: '100%', background: '#272729',
                    border: '1px solid #343536', borderRadius: '0 0 4px 4px',
                    padding: 12, color: '#d7dadc', fontSize: 14,
                    resize: 'vertical', outline: 'none', fontFamily: 'inherit',
                    lineHeight: 1.6, boxSizing: 'border-box',
                  }}
                  onFocus={e => { e.target.style.border = '1px solid #ff6314'; e.target.previousSibling.style.border = '1px solid #ff6314'; e.target.previousSibling.style.borderBottom = 'none'; }}
                  onBlur={e => { e.target.style.border = '1px solid #343536'; e.target.previousSibling.style.border = '1px solid #343536'; e.target.previousSibling.style.borderBottom = 'none'; }}
                />
              </div>
            )}

            {activeTab === 'link' && (
              <div style={{ marginBottom: 12 }}>
                <input
                  placeholder="URL"
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#272729', border: '1px solid #343536',
                    borderRadius: 4, color: '#d7dadc', fontSize: 14,
                    outline: 'none', boxSizing: 'border-box',
                  }}
                  onFocus={e => e.target.style.border = '1px solid #ff6314'}
                  onBlur={e => e.target.style.border = '1px solid #343536'}
                />
              </div>
            )}

            {activeTab === 'media' && (
              <div style={{
                border: '2px dashed #343536', borderRadius: 4, padding: 40,
                textAlign: 'center', marginBottom: 12, cursor: 'pointer',
                background: '#161617',
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#ff6314'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#343536'}
              >
                <Image size={32} color="#343536" style={{ marginBottom: 12 }} />
                <p style={{ color: '#818384', fontSize: 14 }}>Drag & drop images or videos, or click to browse</p>
                <p style={{ color: '#343536', fontSize: 12, marginTop: 4 }}>Supported: JPG, PNG, GIF, MP4 (max 20MB)</p>
              </div>
            )}

            {activeTab === 'poll' && (
              <div style={{ marginBottom: 12 }}>
                {['Option 1', 'Option 2'].map((placeholder, i) => (
                  <div key={i} style={{ marginBottom: 8 }}>
                    <input
                      placeholder={placeholder}
                      style={{
                        width: '100%', padding: '10px 16px',
                        background: '#272729', border: '1px solid #343536',
                        borderRadius: 4, color: '#d7dadc', fontSize: 14,
                        outline: 'none', boxSizing: 'border-box',
                      }}
                      onFocus={e => e.target.style.border = '1px solid #ff6314'}
                      onBlur={e => e.target.style.border = '1px solid #343536'}
                    />
                  </div>
                ))}
                <button style={{
                  color: '#ff6314', background: 'none', border: 'none',
                  fontSize: 13, fontWeight: 700, cursor: 'pointer', padding: '4px 0',
                }}>
                  + Add option
                </button>
              </div>
            )}

            {/* Flair */}
            <div style={{ borderTop: '1px solid #343536', paddingTop: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#818384', marginBottom: 8 }}>Select Flair</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {flairs.map(flair => (
                  <button
                    key={flair.label}
                    onClick={() => setSelectedFlair(prev => prev === flair.label ? null : flair.label)}
                    style={{
                      padding: '4px 12px', borderRadius: 12,
                      background: selectedFlair === flair.label ? flair.bg : 'transparent',
                      border: `1px solid ${selectedFlair === flair.label ? flair.color : '#343536'}`,
                      color: selectedFlair === flair.label ? flair.color : '#818384',
                      fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 6,
                      transition: 'all 0.1s',
                    }}
                    onMouseEnter={e => { if (selectedFlair !== flair.label) { e.currentTarget.style.borderColor = flair.color; e.currentTarget.style.color = flair.color; } }}
                    onMouseLeave={e => { if (selectedFlair !== flair.label) { e.currentTarget.style.borderColor = '#343536'; e.currentTarget.style.color = '#818384'; } }}
                  >
                    {flair.label}
                    {selectedFlair === flair.label && <X size={11} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Submit row */}
          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: 12,
            marginTop: 16, paddingBottom: 40,
          }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: '9px 24px', background: 'transparent',
                border: '1px solid #818384', borderRadius: 20,
                color: '#d7dadc', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#d7dadc'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#818384'}
            >
              Cancel
            </button>
            <button
              disabled={!canSubmit}
              onClick={() => navigate('/')}
              style={{
                padding: '9px 28px',
                background: canSubmit ? '#ff6314' : '#343536',
                border: 'none', borderRadius: 20, color: '#fff',
                fontWeight: 700, fontSize: 14,
                cursor: canSubmit ? 'pointer' : 'not-allowed',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (canSubmit) e.currentTarget.style.background = '#e55a10'; }}
              onMouseLeave={e => { if (canSubmit) e.currentTarget.style.background = '#ff6314'; }}
            >
              Post
            </button>
          </div>
        </main>

        {/* Right sidebar */}
        <aside style={{ width: 312, minWidth: 312, paddingTop: 24 }}>
          {/* Tips */}
          <div style={{
            background: '#1a1a1b', border: '1px solid #343536',
            borderRadius: 4, overflow: 'hidden', marginBottom: 16,
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ff6314 0%, #c0392b 100%)',
              padding: '10px 16px',
            }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#fff' }}>Posting to Agora</span>
            </div>
            <div style={{ padding: 16 }}>
              {[
                'Remember the human',
                'Behave like you would in real life',
                'Look for the original source of content',
                'Search for duplicates before posting',
                'Read the community\'s rules',
              ].map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: 10, paddingBottom: 12,
                  borderBottom: i < 4 ? '1px solid #272729' : 'none',
                  marginBottom: i < 4 ? 12 : 0,
                }}>
                  <span style={{ color: '#ff6314', fontWeight: 700, minWidth: 18, fontSize: 13 }}>{i + 1}.</span>
                  <span style={{ fontSize: 13, color: '#d7dadc', lineHeight: 1.5 }}>{tip}</span>
                </div>
              ))}
              <p style={{ fontSize: 12, color: '#818384', marginTop: 12, lineHeight: 1.6 }}>
                Please be mindful of Agora's <span style={{ color: '#ff6314', cursor: 'pointer' }}>content policy</span> and
                practice good citizenship.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
