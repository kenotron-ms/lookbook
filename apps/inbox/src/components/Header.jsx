import { Search, Settings, HelpCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate = useNavigate()

  return (
    <header
      style={{ height: 64, borderBottom: '1px solid #e0e0e0', background: '#ffffff' }}
      className="flex items-center px-4 gap-4 flex-shrink-0 z-10"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer select-none" style={{ minWidth: 216 }} onClick={() => navigate('/')}>
        {/* Gmail-style M icon */}
        <div
          style={{ width: 40, height: 32, borderRadius: 4, overflow: 'hidden', flexShrink: 0 }}
          className="relative flex items-center justify-center"
        >
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="32" rx="3" fill="#ffffff"/>
            {/* Gmail envelope */}
            <rect x="2" y="5" width="36" height="22" rx="2" fill="#EA4335"/>
            <rect x="2" y="5" width="36" height="22" rx="2" fill="url(#gmailGrad)"/>
            {/* M chevron */}
            <path d="M2 7L20 19L38 7" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="gmailGrad" x1="2" y1="5" x2="38" y2="27" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#EA4335"/>
                <stop offset="100%" stopColor="#C5221F"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span style={{ fontSize: 22, fontWeight: 400, color: '#5f6368', letterSpacing: '-0.3px' }}>
          Inbox
        </span>
      </div>

      {/* Search Bar */}
      <div
        style={{
          flex: 1,
          maxWidth: 680,
          background: '#eaf1fb',
          borderRadius: 24,
          height: 46,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '0 20px',
          transition: 'background 0.2s',
        }}
        className="group hover:bg-white hover:shadow-md"
      >
        <Search size={20} style={{ color: '#5f6368', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search mail"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            color: '#202124',
            width: '100%',
          }}
        />
      </div>

      <div className="flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <button
          style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <HelpCircle size={20} />
        </button>
        <button
          onClick={() => navigate('/settings')}
          style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          className="hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <Settings size={20} />
        </button>
        {/* Avatar */}
        <button
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: '#1a73e8',
            color: '#ffffff',
            fontWeight: 600,
            fontSize: 14,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 8,
            border: 'none',
            cursor: 'pointer',
          }}
        >
          K
        </button>
      </div>
    </header>
  )
}
