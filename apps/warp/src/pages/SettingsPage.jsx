import {
  Bell,
  Shield,
  Database,
  Palette,
  Globe,
  Star,
  ChevronRight,
  Edit2,
  Camera,
  Phone,
  AtSign,
  Info,
  LogOut,
} from 'lucide-react'
import LeftNav from '../components/LeftNav'
import { CURRENT_USER } from '../data/chats'

const SETTINGS_SECTIONS = [
  {
    title: null,
    items: [
      { icon: Bell, label: 'Notifications', desc: 'Sounds, vibrations, badges', color: '#2ca5e0' },
      { icon: Shield, label: 'Privacy and Security', desc: 'Blocked users, 2FA, sessions', color: '#4cd964' },
      { icon: Database, label: 'Data and Storage', desc: 'Media autodownload, cache', color: '#fd79a8' },
      { icon: Palette, label: 'Appearance', desc: 'Themes, font size, night mode', color: '#a29bfe' },
      { icon: Globe, label: 'Language', desc: 'English', color: '#fdcb6e' },
    ],
  },
  {
    title: 'Premium',
    items: [
      {
        icon: Star,
        label: 'Warp Premium',
        desc: 'Faster uploads, exclusive stickers & more',
        color: null,
        premium: true,
      },
    ],
  },
  {
    title: 'Support',
    items: [
      { icon: Info, label: 'Warp Features', desc: null, color: '#2ca5e0' },
      { icon: Info, label: 'FAQ', desc: null, color: '#8a9ab0' },
    ],
  },
]

export default function SettingsPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <LeftNav />

      {/* Settings panel */}
      <div
        className="flex flex-col w-full overflow-y-auto"
        style={{ background: '#17212b', scrollbarWidth: 'thin' }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-10"
          style={{ height: 56, background: '#17212b', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <span style={{ fontSize: 20, fontWeight: 700, color: '#fff', letterSpacing: -0.3 }}>
            Settings
          </span>
          <button
            className="flex items-center gap-2 rounded-xl px-3 py-1.5 transition-colors hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <Edit2 size={14} color="#2ca5e0" />
            <span style={{ fontSize: 13, color: '#2ca5e0' }}>Edit</span>
          </button>
        </div>

        <div className="max-w-2xl mx-auto w-full px-6 py-6 flex flex-col gap-6">
          {/* Profile card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: '#212121' }}
          >
            {/* Cover gradient */}
            <div
              style={{
                height: 100,
                background: 'linear-gradient(135deg,#1a3a5c,#0d2137,#2ca5e0)',
                opacity: 0.8,
              }}
            />

            {/* Avatar row */}
            <div className="px-5 pb-4" style={{ marginTop: -36 }}>
              <div className="relative inline-block">
                <div
                  className="rounded-full flex items-center justify-center font-bold text-white"
                  style={{
                    width: 80,
                    height: 80,
                    background: CURRENT_USER.avatarColor,
                    fontSize: 28,
                    border: '4px solid #212121',
                  }}
                >
                  {CURRENT_USER.avatar}
                </div>
                <button
                  className="absolute rounded-full flex items-center justify-center"
                  style={{
                    width: 26,
                    height: 26,
                    background: '#2ca5e0',
                    bottom: 0,
                    right: 0,
                    border: '2px solid #212121',
                  }}
                >
                  <Camera size={13} color="#fff" />
                </button>
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{CURRENT_USER.name}</h2>
                  {/* Premium badge */}
                  <div
                    className="flex items-center gap-1 rounded-full px-2 py-0.5"
                    style={{ background: 'linear-gradient(90deg,#2ca5e0,#a29bfe)', fontSize: 10, color: '#fff', fontWeight: 700 }}
                  >
                    <Star size={9} fill="#fff" />
                    <span>PREMIUM</span>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: '#8a9ab0', marginTop: 2 }}>{CURRENT_USER.bio}</p>
              </div>

              {/* Info rows */}
              <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="flex items-center gap-3">
                  <Phone size={16} color="#8a9ab0" />
                  <div>
                    <p style={{ fontSize: 13, color: '#fff', filter: 'blur(4px)', userSelect: 'none' }}>
                      {CURRENT_USER.phone.replace(/\*/g, '•')}
                    </p>
                    <p style={{ fontSize: 11, color: '#8a9ab0' }}>Phone number</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <AtSign size={16} color="#8a9ab0" />
                  <div>
                    <p style={{ fontSize: 13, color: '#fff' }}>{CURRENT_USER.username}</p>
                    <p style={{ fontSize: 11, color: '#8a9ab0' }}>Username</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings sections */}
          {SETTINGS_SECTIONS.map((section, si) => (
            <div key={si}>
              {section.title && (
                <p style={{ fontSize: 12, color: '#8a9ab0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
                  {section.title}
                </p>
              )}
              <div className="rounded-2xl overflow-hidden" style={{ background: '#212121' }}>
                {section.items.map((item, ii) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={ii}
                      className="w-full flex items-center gap-4 px-4 transition-colors hover:bg-white/4 text-left"
                      style={{
                        height: 58,
                        borderBottom: ii < section.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}
                    >
                      {/* Icon */}
                      {item.premium ? (
                        <div
                          className="rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ width: 38, height: 38, background: 'linear-gradient(135deg,#2ca5e0,#a29bfe)' }}
                        >
                          <Icon size={18} color="#fff" fill="#fff" />
                        </div>
                      ) : (
                        <div
                          className="rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ width: 38, height: 38, background: item.color + '22' }}
                        >
                          <Icon size={18} color={item.color} />
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <p
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            color: item.premium ? 'transparent' : '#fff',
                            backgroundClip: item.premium ? 'text' : 'none',
                            backgroundImage: item.premium ? 'linear-gradient(90deg,#2ca5e0,#a29bfe)' : 'none',
                            WebkitBackgroundClip: item.premium ? 'text' : 'none',
                            WebkitTextFillColor: item.premium ? 'transparent' : 'inherit',
                          }}
                        >
                          {item.label}
                        </p>
                        {item.desc && (
                          <p style={{ fontSize: 12, color: '#8a9ab0' }}>{item.desc}</p>
                        )}
                      </div>

                      <ChevronRight size={16} color="#5a6a7a" />
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Version & logout */}
          <div className="flex flex-col items-center gap-3 pb-8">
            <p style={{ fontSize: 12, color: '#5a6a7a' }}>Warp v2.5.0 · ParaNet Universe</p>
            <button
              className="flex items-center gap-2 rounded-xl px-6 py-2.5 transition-colors hover:opacity-80"
              style={{ background: 'rgba(255,59,48,0.12)', border: '1px solid rgba(255,59,48,0.2)' }}
            >
              <LogOut size={16} color="#ff3b30" />
              <span style={{ fontSize: 14, color: '#ff3b30', fontWeight: 500 }}>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}