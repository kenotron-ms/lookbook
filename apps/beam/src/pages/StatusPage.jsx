import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Camera, MoreVertical } from 'lucide-react'
import { CURRENT_USER, STATUS_CONTACTS } from '../data/chats.js'

export default function StatusPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen w-full" style={{ background: '#111b21' }}>
      {/* Left Panel */}
      <div className="flex flex-col" style={{ width: 380, background: '#111b21', borderRight: '1px solid #2a3942' }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#202c33', minHeight: 60 }}>
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            style={{ color: '#aebac1' }}
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-semibold text-base" style={{ color: '#e9edef' }}>Status</span>
          <div className="ml-auto">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#aebac1' }}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* My Status */}
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #2a3942' }}>
          <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: '#8696a0' }}>MY STATUS</p>
          <div className="flex items-center gap-3 cursor-pointer py-2 px-2 rounded-lg hover:bg-white/5 transition-colors">
            <div className="relative flex-shrink-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                style={{ background: CURRENT_USER.avatarColor, color: '#fff' }}
              >
                {CURRENT_USER.initials}
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: '#00a884' }}
              >
                <Plus size={12} color="#fff" />
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: '#e9edef' }}>My status</p>
              <p className="text-xs" style={{ color: '#8696a0' }}>Add to my status</p>
            </div>
            <button className="ml-auto p-2 rounded-full hover:bg-white/10 transition-colors" style={{ color: '#8696a0' }}>
              <Camera size={18} />
            </button>
          </div>
        </div>

        {/* Recent Updates */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-semibold tracking-wide" style={{ color: '#8696a0' }}>RECENT UPDATES</p>
          </div>
          {STATUS_CONTACTS.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: contact.color,
                    color: '#fff',
                    boxShadow: `0 0 0 2px ${contact.color}, 0 0 0 4px #111b21`,
                  }}
                >
                  {contact.initials}
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#e9edef' }}>{contact.name}</p>
                <p className="text-xs" style={{ color: '#8696a0' }}>{contact.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Empty state */}
      <div className="flex-1 flex flex-col items-center justify-center" style={{ background: '#0b141a' }}>
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
          style={{ background: '#202c33' }}
        >
          <Camera size={36} style={{ color: '#8696a0' }} />
        </div>
        <h2 className="text-xl font-semibold mb-2" style={{ color: '#e9edef' }}>Status Updates</h2>
        <p className="text-sm text-center max-w-xs" style={{ color: '#8696a0' }}>
          Share photos and updates that disappear after 24 hours. Tap a contact's status to view it.
        </p>
      </div>
    </div>
  )
}
