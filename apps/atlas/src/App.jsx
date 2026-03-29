import { useState, useCallback } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom'
import {
  MapPin, Search, Navigation2, Plus, Minus, Star, Phone, Globe,
  Clock, ChevronLeft, ArrowLeftRight, Car, Bus, Bike, Share2,
  Bookmark, Send, X, ChevronRight, Filter, Layers,
  PersonStanding, Camera, Info, MessageSquare, Maximize2
} from 'lucide-react'
import { places, routeOptions, nearbyCategories, suggestions } from './data/places.js'

/* ─────────────────── ACCENT ─────────────────── */
const BLUE = '#1a73e8'
const RED = '#ea4335'
const GREEN = '#34a853'

/* ═══════════════════════════════════════════════
   MAP VIEW — CSS Simulation
═══════════════════════════════════════════════ */
function MapView({ state, selectedPlaceId, activeRoute }) {
  const selectedPlace = places.find(p => p.id === selectedPlaceId)

  return (
    <div
      className="relative flex-1 overflow-hidden select-none"
      style={{ background: '#e5e3df' }}
    >
      {/* ── Water body ── */}
      <div style={{
        position: 'absolute', bottom: '-20px', right: '-10px',
        width: '320px', height: '260px',
        background: '#aadaff',
        borderRadius: '60% 40% 30% 70% / 70% 30% 60% 40%',
        opacity: 0.85,
      }} />
      <div style={{
        position: 'absolute', bottom: '60px', right: '80px',
        width: '180px', height: '120px',
        background: '#b8e1ff',
        borderRadius: '50% 60% 40% 50% / 40% 60% 50% 60%',
        opacity: 0.7,
      }} />
      {/* Water label */}
      <span className="map-label" style={{ bottom: '80px', right: '120px', color: '#5b9bc9', fontStyle: 'italic', fontSize: '12px', fontWeight: '600' }}>
        San Francisco Bay
      </span>

      {/* ── Parks / green areas ── */}
      <div style={{
        position: 'absolute', top: '6%', left: '2%',
        width: '200px', height: '155px',
        background: '#c8dcc8',
        borderRadius: '10px',
      }} />
      <div style={{
        position: 'absolute', top: '6%', left: '2%',
        width: '200px', height: '8px',
        background: '#b5cfb5',
      }} />
      <div style={{
        position: 'absolute', top: '7%', left: '2%',
        width: '8px', height: '140px',
        background: '#b5cfb5',
      }} />
      <span className="map-label" style={{ top: '12%', left: '4%' }}>Golden Gate Park</span>

      <div style={{
        position: 'absolute', top: '4%', right: '28%',
        width: '90px', height: '70px',
        background: '#c8dcc8',
        borderRadius: '8px',
      }} />
      <span className="map-label" style={{ top: '7%', right: '24%' }}>Alamo Square</span>

      <div style={{
        position: 'absolute', bottom: '28%', left: '6%',
        width: '70px', height: '55px',
        background: '#c8dcc8',
        borderRadius: '8px',
      }} />

      <div style={{
        position: 'absolute', top: '32%', left: '28%',
        width: '50px', height: '40px',
        background: '#cce0cc',
        borderRadius: '6px',
      }} />

      {/* ── Road grid ── */}
      {/* Major horizontal roads */}
      <div style={{ position: 'absolute', top: '28%', left: 0, right: 0, height: '9px', background: 'white', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: '28%', left: 0, right: 0, height: '1px', background: '#f0f0f0', zIndex: 3 }} />
      <span className="map-label" style={{ top: 'calc(28% - 14px)', left: '22%', zIndex: 4 }}>Market St</span>

      <div style={{ position: 'absolute', top: '45%', left: 0, right: 0, height: '7px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: 'calc(45% - 14px)', left: '15%', zIndex: 4 }}>Mission St</span>

      <div style={{ position: 'absolute', top: '58%', left: 0, right: 0, height: '6px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: 'calc(58% - 14px)', left: '8%', zIndex: 4 }}>Cesar Chavez St</span>

      <div style={{ position: 'absolute', top: '72%', left: 0, right: 0, height: '5px', background: 'white', zIndex: 2 }} />

      <div style={{ position: 'absolute', top: '18%', left: 0, right: 0, height: '5px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: 'calc(18% - 14px)', left: '45%', zIndex: 4 }}>Geary Blvd</span>

      <div style={{ position: 'absolute', top: '10%', left: 0, right: 0, height: '4px', background: 'white', zIndex: 2 }} />

      {/* Major vertical roads */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '22%', width: '9px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: '52%', left: 'calc(22% + 11px)', zIndex: 4, transform: 'rotate(90deg)', transformOrigin: 'left center' }}>Van Ness Ave</span>

      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '40%', width: '8px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: '40%', left: 'calc(40% + 10px)', zIndex: 4 }}>Castro St</span>

      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '55%', width: '7px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: '60%', left: 'calc(55% + 9px)', zIndex: 4 }}>3rd St</span>

      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '68%', width: '9px', background: 'white', zIndex: 2 }} />
      <span className="map-label" style={{ top: '35%', left: 'calc(68% + 11px)', zIndex: 4 }}>The Embarcadero</span>

      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '10%', width: '5px', background: 'white', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '32%', width: '5px', background: 'white', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '48%', width: '5px', background: 'white', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '62%', width: '4px', background: 'white', zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: '76%', width: '4px', background: 'white', zIndex: 2 }} />

      {/* Minor streets (thinner) */}
      <div style={{ position: 'absolute', top: '22%', left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.8)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '34%', left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.8)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '40%', left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.8)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '51%', left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.8)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '65%', left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.8)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '79%', left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.7)', zIndex: 1 }} />

      {/* Diagonal roads */}
      <div style={{
        position: 'absolute', top: '-10%', left: '14%',
        width: '5px', height: '160%',
        background: 'rgba(255,255,255,0.9)',
        transform: 'rotate(18deg)',
        transformOrigin: 'top left',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', top: '20%', right: '25%',
        width: '4px', height: '80%',
        background: 'rgba(255,255,255,0.85)',
        transform: 'rotate(12deg)',
        transformOrigin: 'top right',
        zIndex: 1,
      }} />

      {/* ── Building clusters ── */}
      <BuildingCluster top="30%" left="24%" count={12} size={14} gap={3} />
      <BuildingCluster top="46%" left="41%" count={9} size={12} gap={3} />
      <BuildingCluster top="46%" left="56%" count={10} size={15} gap={3} />
      <BuildingCluster top="30%" left="56%" count={8} size={11} gap={3} />
      <BuildingCluster top="20%" left="41%" count={7} size={10} gap={2} />
      <BuildingCluster top="59%" left="24%" count={6} size={11} gap={3} />
      <BuildingCluster top="12%" left="24%" count={8} size={10} gap={2} />
      <BuildingCluster top="59%" left="56%" count={6} size={12} gap={3} />

      {/* ── Route line (directions state) ── */}
      {state === 'directions' && (
        <svg
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 8, pointerEvents: 'none' }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* Route shadow */}
          <polyline
            points="20,85 22,70 25,58 30,45 40,35 48,28 55,22 65,20"
            fill="none"
            stroke="rgba(26,115,232,0.25)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Inactive route 2 */}
          {activeRoute !== 2 && (
            <polyline
              points="20,85 20,72 22,58 25,45 35,38 45,35 55,30 65,20"
              fill="none"
              stroke="#b0c4e8"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2,1.5"
            />
          )}
          {/* Inactive route 3 */}
          {activeRoute !== 3 && (
            <polyline
              points="20,85 15,72 12,60 14,48 20,38 28,30 40,24 65,20"
              fill="none"
              stroke="#b0c4e8"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2,1.5"
            />
          )}
          {/* Active route */}
          <polyline
            points="20,85 22,70 25,58 30,45 40,35 48,28 55,22 65,20"
            fill="none"
            stroke={BLUE}
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="3,1.5"
          />
          {/* Start marker */}
          <circle cx="20" cy="85" r="1.5" fill={GREEN} stroke="white" strokeWidth="0.5" />
          {/* End marker */}
          <circle cx="65" cy="20" r="1.5" fill={RED} stroke="white" strokeWidth="0.5" />
        </svg>
      )}

      {/* ── Pin markers ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        {places.map(place => {
          const isSelected = place.id === selectedPlaceId
          const color = isSelected ? BLUE : RED
          return (
            <div
              key={place.id}
              className={`map-pin ${isSelected ? 'selected' : ''}`}
              style={{
                top: place.pinPosition.top,
                left: place.pinPosition.left,
                background: color,
                boxShadow: isSelected ? `0 0 0 3px white, 0 0 0 5px ${color}` : undefined,
              }}
              title={place.name}
            />
          )
        })}
      </div>

      {/* ── Map Controls ── */}
      <div style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 20, display: 'flex', flexDirection: 'column', gap: '2px' }}>
        {/* Expand */}
        <button style={mapBtnStyle} title="Fullscreen">
          <Maximize2 size={16} color="#444" />
        </button>

        {/* Navigation */}
        <button style={{ ...mapBtnStyle, background: BLUE, marginTop: '8px' }} title="Navigate">
          <Navigation2 size={16} color="white" />
        </button>

        {/* Zoom */}
        <button style={{ ...mapBtnStyle, marginTop: '8px', borderRadius: '8px 8px 0 0', borderBottom: '1px solid #e0e0e0' }} title="Zoom in">
          <Plus size={18} color="#444" />
        </button>
        <button style={{ ...mapBtnStyle, borderRadius: '0 0 8px 8px' }} title="Zoom out">
          <Minus size={18} color="#444" />
        </button>
      </div>

      {/* Layers button */}
      <div style={{ position: 'absolute', bottom: '16px', right: '16px', zIndex: 20 }}>
        <button style={mapBtnStyle} title="Layers">
          <Layers size={16} color="#444" />
        </button>
      </div>

      {/* Street view pegman */}
      <div style={{ position: 'absolute', bottom: '60px', right: '16px', zIndex: 20 }}>
        <button style={{ ...mapBtnStyle, flexDirection: 'column', gap: '1px', padding: '6px' }} title="Street View">
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbc04', border: '1.5px solid #e6a800' }} />
          <div style={{ width: '2px', height: '12px', background: '#fbbc04', borderRadius: '1px' }} />
        </button>
      </div>

      {/* Scale indicator */}
      <div style={{
        position: 'absolute', bottom: '16px', left: '16px', zIndex: 20,
        background: 'rgba(255,255,255,0.85)', borderRadius: '4px', padding: '3px 8px',
        fontSize: '11px', color: '#444', borderBottom: '2px solid #666',
        backdropFilter: 'blur(4px)',
      }}>
        0.5 mi
      </div>

      {/* Attribution */}
      <div style={{
        position: 'absolute', bottom: '4px', right: '50px', zIndex: 20,
        fontSize: '10px', color: '#666',
      }}>
        © Atlas · Map data © ParaNet
      </div>
    </div>
  )
}

const mapBtnStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  width: '40px', height: '40px',
  background: 'white',
  borderRadius: '8px',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
}

function BuildingCluster({ top, left, count, size, gap }) {
  const cols = Math.ceil(Math.sqrt(count))
  return (
    <div style={{
      position: 'absolute', top, left,
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, ${size}px)`,
      gap: `${gap}px`,
      zIndex: 3,
    }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: `${size + Math.floor(Math.random() * 6 - 3)}px`,
          height: `${size + Math.floor(Math.random() * 6 - 3)}px`,
          background: '#dddde0',
          borderRadius: '1px',
          opacity: 0.9,
        }} />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SEARCH PANEL
═══════════════════════════════════════════════ */
function SearchPanel() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const filtered = suggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="flex flex-col h-full">
      {/* Header / Logo */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #e8eaed' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <MapPin size={22} color={BLUE} fill={BLUE} />
          <span style={{ fontSize: '18px', fontWeight: '700', color: '#1a1a1a' }}>Atlas</span>
        </div>

        {/* Search bar */}
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: 'white', borderRadius: '24px', padding: '10px 16px',
            boxShadow: '0 1px 6px rgba(32,33,36,0.18)',
            border: showSuggestions ? `1.5px solid ${BLUE}` : '1.5px solid transparent',
          }}>
            <Search size={18} color="#5f6368" />
            <input
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(e.target.value.length > 0) }}
              onFocus={() => query.length > 0 && setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search here"
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '15px', color: '#202124', background: 'transparent' }}
            />
            {query && (
              <button onClick={() => { setQuery(''); setShowSuggestions(false) }}>
                <X size={16} color="#5f6368" />
              </button>
            )}
            <button
              onClick={() => navigate('/directions')}
              style={{ padding: '4px 8px', background: BLUE, borderRadius: '6px', border: 'none', cursor: 'pointer' }}
              title="Get directions"
            >
              <Navigation2 size={14} color="white" />
            </button>
          </div>

          {/* Autocomplete */}
          {showSuggestions && filtered.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50,
              background: 'white', borderRadius: '12px', marginTop: '4px',
              boxShadow: '0 4px 12px rgba(32,33,36,0.2)',
              overflow: 'hidden',
            }}>
              {filtered.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const match = places.find(p => p.name.toLowerCase().includes(s.toLowerCase()))
                    if (match) navigate(`/place/${match.id}`)
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    width: '100%', padding: '10px 16px', border: 'none',
                    background: 'white', cursor: 'pointer', textAlign: 'left',
                    fontSize: '14px', color: '#202124',
                    borderBottom: i < filtered.length - 1 ? '1px solid #f1f3f4' : 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'white'}
                >
                  <Search size={14} color="#9aa0a6" />
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Explore nearby */}
      <div style={{ padding: '16px 16px 12px' }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: '#5f6368', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Explore nearby
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {nearbyCategories.map(cat => (
            <button
              key={cat.id}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '20px',
                border: '1px solid #dadce0', background: 'white',
                fontSize: '13px', color: '#202124', cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#e8f0fe'; e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.color = BLUE }}
              onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#dadce0'; e.currentTarget.style.color = '#202124' }}
            >
              <span style={{ fontSize: '15px' }}>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '8px 16px 10px', borderBottom: '1px solid #e8eaed',
      }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '5px',
          padding: '5px 12px', borderRadius: '16px',
          border: '1px solid #dadce0', background: 'white',
          fontSize: '12px', color: '#5f6368', cursor: 'pointer',
        }}>
          <Filter size={12} />
          Filters
        </button>
        <button style={filterChipStyle}>Open now</button>
        <button style={filterChipStyle}>Top rated</button>
        <button style={filterChipStyle}>≤ 1 mi</button>
      </div>

      {/* Nearby places list */}
      <div className="sidebar-scroll overflow-y-auto flex-1">
        <div style={{ padding: '8px 0' }}>
          {places.map(place => (
            <button
              key={place.id}
              onClick={() => navigate(`/place/${place.id}`)}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                width: '100%', padding: '12px 16px', border: 'none',
                background: 'white', cursor: 'pointer', textAlign: 'left',
                borderBottom: '1px solid #f1f3f4',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8f9fa'}
              onMouseLeave={e => e.currentTarget.style.background = 'white'}
            >
              {/* Icon box */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px',
                background: '#e8f0fe', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '22px',
              }}>
                {categoryIcon(place.category)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: '#202124' }}>{place.name}</p>
                  <ChevronRight size={14} color="#9aa0a6" />
                </div>
                <p style={{ fontSize: '12px', color: '#5f6368', marginTop: '1px' }}>{place.type}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                  <StarRating rating={place.rating} size={11} />
                  <span style={{ fontSize: '12px', color: '#5f6368' }}>{place.rating} ({place.reviews.toLocaleString()})</span>
                  <span style={{ color: '#dadce0' }}>·</span>
                  <span style={{ fontSize: '12px', color: place.hours.startsWith('Open') ? '#137333' : '#c5221f' }}>
                    {place.hours}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const filterChipStyle = {
  padding: '5px 12px', borderRadius: '16px',
  border: '1px solid #dadce0', background: 'white',
  fontSize: '12px', color: '#5f6368', cursor: 'pointer',
}

/* ═══════════════════════════════════════════════
   PLACE DETAIL PANEL
═══════════════════════════════════════════════ */
function PlacePanel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const place = places.find(p => p.id === Number(id)) || places[0]
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = ['Overview', 'Reviews', 'Photos', 'About']

  return (
    <div className="flex flex-col h-full">
      {/* Back button */}
      <div style={{ padding: '12px 16px 8px', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #e8eaed' }}>
        <button onClick={() => navigate('/')} style={{ padding: '6px', border: 'none', background: 'transparent', cursor: 'pointer', borderRadius: '50%', display: 'flex' }}
          onMouseEnter={e => e.currentTarget.style.background = '#f1f3f4'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <ChevronLeft size={20} color="#5f6368" />
        </button>

        {/* Mini search */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', gap: '8px',
          background: '#f1f3f4', borderRadius: '24px', padding: '8px 14px',
        }}>
          <Search size={15} color="#5f6368" />
          <span style={{ fontSize: '14px', color: '#5f6368' }}>Search here</span>
        </div>
      </div>

      <div className="sidebar-scroll overflow-y-auto flex-1">
        {/* Place header */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid #e8eaed' }}>
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#202124', lineHeight: 1.2, marginBottom: '6px' }}>
            {place.name}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '13px', color: '#5f6368' }}>{place.type}</span>
            <span style={{ color: '#dadce0' }}>·</span>
            <span style={{ fontSize: '13px', color: '#5f6368' }}>{place.priceLevel}</span>
          </div>

          {/* Rating row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#202124' }}>{place.rating}</span>
            <StarRating rating={place.rating} size={15} color="#fbbc04" />
            <span style={{ fontSize: '13px', color: BLUE, fontWeight: '500', cursor: 'pointer' }}>
              {place.reviews.toLocaleString()} reviews
            </span>
          </div>

          {/* Hours badge */}
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              fontSize: '13px', fontWeight: '600',
              color: place.hours.startsWith('Open') ? '#137333' : '#c5221f',
            }}>
              {place.hours}
            </span>
            <ChevronRight size={14} color="#5f6368" />
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            {[
              { icon: <Navigation2 size={18} />, label: 'Directions', primary: true, onClick: () => navigate('/directions') },
              { icon: <Bookmark size={18} />, label: 'Save' },
              { icon: <Share2 size={18} />, label: 'Share' },
              { icon: <Send size={18} />, label: 'Send' },
            ].map(btn => (
              <button
                key={btn.label}
                onClick={btn.onClick}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  padding: '10px 4px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  background: btn.primary ? BLUE : '#e8f0fe',
                  color: btn.primary ? 'white' : BLUE,
                  fontWeight: '500', fontSize: '12px',
                  transition: 'all 0.15s ease',
                }}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Photos row */}
        <div style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', gap: '2px', height: '130px' }}>
            <div className="photo-placeholder" style={{ flex: 2, minWidth: 0 }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div className="photo-placeholder-2" style={{ flex: 1 }} />
              <div className="photo-placeholder-3" style={{ flex: 1, position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>
                    <Camera size={12} style={{ display: 'inline', marginRight: '4px' }} />
                    View all
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e8eaed', padding: '0 4px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              style={{
                flex: 1, padding: '12px 4px', border: 'none', background: 'transparent', cursor: 'pointer',
                fontSize: '13px', fontWeight: '600',
                color: activeTab === tab.toLowerCase() ? BLUE : '#5f6368',
                borderBottom: activeTab === tab.toLowerCase() ? `2px solid ${BLUE}` : '2px solid transparent',
                marginBottom: '-1px',
                transition: 'color 0.15s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Overview tab content */}
        {activeTab === 'overview' && (
          <div>
            {/* Business info */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8eaed' }}>
              {[
                { icon: <Clock size={16} color="#5f6368" />, text: place.allHours },
                { icon: <Phone size={16} color="#5f6368" />, text: place.phone },
                { icon: <Globe size={16} color="#5f6368" />, text: place.website, link: true },
                { icon: <MapPin size={16} color="#5f6368" />, text: place.address },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '8px 0', borderBottom: i < 3 ? '1px solid #f1f3f4' : 'none' }}>
                  <div style={{ paddingTop: '1px', flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontSize: '13px', color: item.link ? BLUE : '#202124', lineHeight: '1.5' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Popular times */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8eaed' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', color: '#202124', marginBottom: '12px' }}>Popular times</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px' }}>
                {place.popularTimes.map((val, i) => {
                  const barColor = val >= 8 ? '#ea4335' : val >= 5 ? '#fbbc04' : '#34a853'
                  const hour = i + 8
                  const label = hour === 12 ? '12p' : hour > 12 ? `${hour - 12}p` : `${hour}a`
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                      <div style={{
                        width: '100%', background: barColor, borderRadius: '3px 3px 0 0',
                        height: `${(val / 10) * 45}px`,
                        minHeight: '3px',
                        transition: 'height 0.3s ease',
                      }} />
                      {i % 3 === 0 && (
                        <span style={{ fontSize: '9px', color: '#9aa0a6', whiteSpace: 'nowrap' }}>{label}</span>
                      )}
                    </div>
                  )
                })}
              </div>
              <p style={{ fontSize: '11px', color: '#9aa0a6', marginTop: '6px' }}>
                Thursday · Usually not too busy right now
              </p>
            </div>

            {/* Rating breakdown */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e8eaed' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '48px', fontWeight: '300', color: '#202124', lineHeight: 1 }}>{place.rating}</p>
                  <StarRating rating={place.rating} size={14} color="#fbbc04" />
                  <p style={{ fontSize: '12px', color: '#9aa0a6', marginTop: '4px' }}>{place.reviews.toLocaleString()}</p>
                </div>
                <div style={{ flex: 1 }}>
                  {[5, 4, 3, 2, 1].map(stars => {
                    const pct = stars === 5 ? 65 : stars === 4 ? 22 : stars === 3 ? 8 : stars === 2 ? 3 : 2
                    return (
                      <div key={stars} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '11px', color: '#5f6368', width: '8px' }}>{stars}</span>
                        <div style={{ flex: 1, height: '8px', background: '#e8eaed', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: '#fbbc04', borderRadius: '4px' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Reviews */}
            {place.reviews_list.length > 0 && (
              <div style={{ padding: '16px 20px' }}>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#202124', marginBottom: '12px' }}>Reviews</p>
                {place.reviews_list.map((review, i) => (
                  <div key={i} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: i < place.reviews_list.length - 1 ? '1px solid #f1f3f4' : 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      {/* Avatar */}
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                        background: `hsl(${i * 80 + 200}, 60%, 55%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '14px', fontWeight: '600',
                      }}>
                        {review.author[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124' }}>{review.author}</p>
                        <p style={{ fontSize: '11px', color: '#9aa0a6' }}>{review.date}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size={12} color="#fbbc04" />
                    <p style={{ fontSize: '13px', color: '#3c4043', marginTop: '6px', lineHeight: '1.5' }}>
                      {review.text}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#9aa0a6', fontSize: '14px' }}>
            <MessageSquare size={32} style={{ margin: '0 auto 12px' }} />
            <p>All reviews would appear here</p>
          </div>
        )}

        {activeTab === 'photos' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', padding: '2px' }}>
            {[...Array(9)].map((_, i) => (
              <div key={i} style={{
                height: '100px',
                background: `hsl(${i * 40 + 180}, 50%, ${55 + i * 3}%)`,
              }} />
            ))}
          </div>
        )}

        {activeTab === 'about' && (
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '8px 0' }}>
              <Info size={16} color="#5f6368" />
              <div>
                <p style={{ fontSize: '13px', fontWeight: '600', color: '#202124', marginBottom: '4px' }}>About</p>
                <p style={{ fontSize: '13px', color: '#5f6368', lineHeight: '1.5' }}>
                  {place.type} · {place.neighborhood}, San Francisco
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   DIRECTIONS PANEL
═══════════════════════════════════════════════ */
function DirectionsPanel({ activeRoute, setActiveRoute }) {
  const navigate = useNavigate()
  const [mode, setMode] = useState('drive')
  const [from, setFrom] = useState('Your location')
  const [to, setTo] = useState('Blue Bottle Coffee')

  const modes = [
    { id: 'drive', icon: <Car size={16} />, label: 'Drive' },
    { id: 'walk', icon: <PersonStanding size={16} />, label: 'Walk' },
    { id: 'transit', icon: <Bus size={16} />, label: 'Transit' },
    { id: 'bike', icon: <Bike size={16} />, label: 'Bike' },
  ]

  const modifiedRoutes = routeOptions.map(r => {
    if (mode === 'walk') return { ...r, time: r.time.replace(/\d+/, n => String(Math.round(parseInt(n) * 5))) }
    if (mode === 'bike') return { ...r, time: r.time.replace(/\d+/, n => String(Math.round(parseInt(n) * 2))) }
    if (mode === 'transit') return { ...r, time: r.time.replace(/\d+/, n => String(Math.round(parseInt(n) * 1.5))) }
    return r
  })

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid #e8eaed', background: '#1a73e8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <button onClick={() => navigate('/')} style={{ padding: '4px', border: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', cursor: 'pointer', display: 'flex' }}>
            <ChevronLeft size={18} color="white" />
          </button>
          <span style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Directions</span>
        </div>

        {/* From / To inputs */}
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', borderRadius: '8px', padding: '10px 12px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34a853', border: '2px solid #34a853', flexShrink: 0 }} />
            <input
              value={from}
              onChange={e => setFrom(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#202124' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', borderRadius: '8px', padding: '10px 12px' }}>
            <MapPin size={12} color={RED} fill={RED} style={{ flexShrink: 0 }} />
            <input
              value={to}
              onChange={e => setTo(e.target.value)}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: '14px', color: '#202124' }}
            />
          </div>

          {/* Swap button */}
          <button
            onClick={() => { const t = from; setFrom(to); setTo(t) }}
            style={{
              position: 'absolute', right: '-4px', top: '50%', transform: 'translateY(-50%)',
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'white', border: `2px solid ${BLUE}`, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            <ArrowLeftRight size={14} color={BLUE} />
          </button>
        </div>
      </div>

      {/* Transport mode selector */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e8eaed', padding: '0 8px' }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px',
              padding: '10px 4px', border: 'none', background: 'transparent', cursor: 'pointer',
              color: mode === m.id ? BLUE : '#5f6368',
              borderBottom: mode === m.id ? `2px solid ${BLUE}` : '2px solid transparent',
              marginBottom: '-1px',
              fontSize: '11px', fontWeight: '600',
              transition: 'color 0.15s ease',
            }}
          >
            {m.icon}
            {m.label}
          </button>
        ))}
      </div>

      {/* Traffic conditions */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 16px', background: '#fef7e0', borderBottom: '1px solid #fde68a',
      }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbc04' }} />
        <span style={{ fontSize: '12px', color: '#7a4f00', fontWeight: '500' }}>Moderate traffic on I-101 · Delays of 8 min</span>
      </div>

      {/* Route options */}
      <div className="sidebar-scroll overflow-y-auto flex-1">
        <div style={{ padding: '8px 0' }}>
          {modifiedRoutes.map((route, i) => (
            <button
              key={route.id}
              onClick={() => setActiveRoute(route.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                width: '100%', padding: '16px 20px', border: 'none',
                background: activeRoute === route.id ? '#e8f0fe' : 'white',
                cursor: 'pointer', textAlign: 'left',
                borderBottom: '1px solid #f1f3f4',
                borderLeft: activeRoute === route.id ? `4px solid ${BLUE}` : '4px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              {/* Route line preview */}
              <div style={{ flexShrink: 0 }}>
                <svg width="28" height="40" viewBox="0 0 28 40">
                  <circle cx="14" cy="6" r="4" fill={GREEN} />
                  <line x1="14" y1="10" x2="14" y2="30" stroke={activeRoute === route.id ? BLUE : '#dadce0'} strokeWidth="2.5" strokeDasharray="3,2" />
                  <circle cx="14" cy="34" r="4" fill={RED} />
                </svg>
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '20px', fontWeight: '700', color: activeRoute === route.id ? BLUE : '#202124' }}>
                    {route.time}
                  </span>
                  <span style={{ fontSize: '13px', color: '#5f6368' }}>{route.distance}</span>
                </div>
                <p style={{ fontSize: '13px', color: '#3c4043', marginTop: '2px', fontWeight: '500' }}>{route.via}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: route.trafficColor }} />
                  <span style={{ fontSize: '12px', color: '#5f6368' }}>{route.traffic}</span>
                  {route.fastest && (
                    <span style={{
                      fontSize: '11px', fontWeight: '600', color: GREEN,
                      background: '#e6f4ea', padding: '2px 8px', borderRadius: '12px',
                    }}>
                      Fastest
                    </span>
                  )}
                </div>
              </div>

              {activeRoute === route.id && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Navigation2 size={14} color="white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Start navigation CTA */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid #e8eaed' }}>
          <button style={{
            width: '100%', padding: '14px',
            background: BLUE, color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '15px', fontWeight: '600', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            boxShadow: '0 2px 8px rgba(26,115,232,0.4)',
          }}>
            <Navigation2 size={18} />
            Start Navigation
          </button>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════
   SHARED HELPERS
═══════════════════════════════════════════════ */
function StarRating({ rating, size = 14, color = '#fbbc04' }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map(i => {
        const fill = i <= Math.floor(rating) ? 1 : i - 1 < rating ? rating - (i - 1) : 0
        return (
          <div key={i} style={{ position: 'relative', width: size, height: size }}>
            <Star size={size} color={color} fill="none" />
            {fill > 0 && (
              <div style={{ position: 'absolute', top: 0, left: 0, width: `${fill * 100}%`, overflow: 'hidden' }}>
                <Star size={size} color={color} fill={color} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function categoryIcon(cat) {
  const icons = {
    café: '☕', restaurant: '🍽️', hotel: '🏨',
    transit: '🚌', pharmacy: '💊', gas: '⛽',
    park: '🌳', shopping: '🛍️',
  }
  return icons[cat] || '📍'
}

/* ═══════════════════════════════════════════════
   LAYOUT — Split view wrapper
═══════════════════════════════════════════════ */
function Layout({ panelContent, state, selectedPlaceId, activeRoute }) {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div style={{
        width: '400px', flexShrink: 0,
        background: 'white',
        borderRight: '1px solid #e8eaed',
        display: 'flex', flexDirection: 'column',
        height: '100vh',
        boxShadow: '2px 0 8px rgba(32,33,36,0.12)',
        zIndex: 30,
      }}>
        {panelContent}
      </div>

      {/* Map */}
      <MapView state={state} selectedPlaceId={selectedPlaceId} activeRoute={activeRoute} />
    </div>
  )
}

/* ═══════════════════════════════════════════════
   APP ROOT
═══════════════════════════════════════════════ */
export default function App() {
  const [activeRoute, setActiveRoute] = useState(1)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              state="search"
              selectedPlaceId={null}
              activeRoute={activeRoute}
              panelContent={<SearchPanel />}
            />
          }
        />
        <Route
          path="/place/:id"
          element={<PlaceWrapper activeRoute={activeRoute} />}
        />
        <Route
          path="/directions"
          element={
            <Layout
              state="directions"
              selectedPlaceId={null}
              activeRoute={activeRoute}
              panelContent={<DirectionsPanel activeRoute={activeRoute} setActiveRoute={setActiveRoute} />}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

function PlaceWrapper({ activeRoute }) {
  const { id } = useParams()
  return (
    <Layout
      state="place"
      selectedPlaceId={Number(id)}
      activeRoute={activeRoute}
      panelContent={<PlacePanel />}
    />
  )
}
