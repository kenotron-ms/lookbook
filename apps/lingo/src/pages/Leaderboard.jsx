import { Trophy, ChevronUp, ChevronDown, Minus } from 'lucide-react'
import { leaderboard } from '../data/lessons.js'

const PROMOTE_CUTOFF = 10
const DEMOTE_START = 11

export default function Leaderboard() {
  const top3 = leaderboard.slice(0, 3)
  const rest = leaderboard.slice(3)

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Header card */}
      <div
        className="rounded-2xl p-5 mb-6 text-center card-shadow"
        style={{ background: 'linear-gradient(135deg, #ffd900 0%, #ff9600 100%)' }}
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <Trophy size={28} fill="white" color="white" />
          <h1 className="font-black text-2xl text-white">Diamond League</h1>
        </div>
        <p className="text-sm font-extrabold text-white opacity-90">Week ending in 3 days</p>
        <div className="mt-3 px-4 py-2 rounded-xl inline-block font-bold text-sm"
             style={{ background: 'rgba(255,255,255,0.3)', color: 'white' }}>
          💎 Top 10 advance to Master League
        </div>
      </div>

      {/* Podium — Top 3 */}
      <div className="flex items-end justify-center gap-3 mb-8">
        {/* 2nd */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-1">{top3[1].avatar}</div>
          <p className="font-extrabold text-sm mb-2" style={{ color: '#4b4b4b' }}>{top3[1].name}</p>
          <div
            className="w-24 flex flex-col items-center justify-start pt-3 rounded-t-2xl"
            style={{ background: '#c0c0c0', height: '80px' }}
          >
            <span className="text-2xl font-black text-white">2</span>
          </div>
        </div>

        {/* 1st */}
        <div className="flex flex-col items-center">
          <div className="text-4xl mb-1">{top3[0].avatar}</div>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-base mb-1"
               style={{ background: '#ffd900' }}>👑</div>
          <p className="font-extrabold text-sm mb-2" style={{ color: '#4b4b4b' }}>{top3[0].name}</p>
          <div
            className="w-28 flex flex-col items-center justify-start pt-3 rounded-t-2xl"
            style={{ background: '#ffd900', height: '110px' }}
          >
            <span className="text-2xl font-black" style={{ color: '#4b4b4b' }}>1</span>
          </div>
        </div>

        {/* 3rd */}
        <div className="flex flex-col items-center">
          <div className="text-3xl mb-1">{top3[2].avatar}</div>
          <p className="font-extrabold text-sm mb-2" style={{ color: '#4b4b4b' }}>{top3[2].name}</p>
          <div
            className="w-24 flex flex-col items-center justify-start pt-3 rounded-t-2xl"
            style={{ background: '#cd7f32', height: '60px' }}
          >
            <span className="text-2xl font-black text-white">3</span>
          </div>
        </div>
      </div>

      {/* XP for top 3 */}
      <div className="flex justify-center gap-3 mb-6">
        {[top3[1], top3[0], top3[2]].map(u => (
          <div key={u.rank} className="text-center">
            <p className="font-extrabold text-sm" style={{ color: '#4b4b4b' }}>{u.xp.toLocaleString()}</p>
            <p className="text-xs" style={{ color: '#afafaf' }}>XP</p>
          </div>
        ))}
      </div>

      {/* Zone label: promotion */}
      <div
        className="flex items-center gap-2 px-4 py-2 rounded-xl mb-2 text-sm font-extrabold"
        style={{ background: '#d7f0b6', color: '#58cc02' }}
      >
        <ChevronUp size={16} />
        Promotion Zone · Top 10 advance
      </div>

      {/* Full ranked list */}
      <div className="flex flex-col gap-2">
        {leaderboard.map((user, idx) => {
          const isPromo = user.rank <= PROMOTE_CUTOFF
          const isDanger = user.rank >= DEMOTE_START
          const isMe = user.isMe

          let rowBg = '#fff'
          if (isMe) rowBg = '#fff5b4'
          else if (!isPromo && isDanger) rowBg = '#fff0f0'
          else if (isPromo) rowBg = 'rgba(215,240,182,0.3)'

          return (
            <div key={user.rank}>
              {user.rank === DEMOTE_START && (
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-xl mb-2 mt-2 text-sm font-extrabold"
                  style={{ background: '#ffd0d0', color: '#ff4b4b' }}
                >
                  <ChevronDown size={16} />
                  Demotion Zone · Bottom 5 risk relegation
                </div>
              )}

              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${isMe ? 'card-shadow' : ''}`}
                style={{
                  background: rowBg,
                  border: isMe ? '2px solid #ffd900' : '2px solid transparent',
                }}
              >
                {/* Rank */}
                <span
                  className="w-7 text-center font-black text-sm flex-shrink-0"
                  style={{ color: user.rank <= 3 ? '#ffd900' : '#afafaf' }}
                >
                  {user.rank}
                </span>

                {/* Avatar */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: user.color + '22', border: `2px solid ${user.color}` }}
                >
                  {user.avatar}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p
                    className="font-extrabold text-sm truncate"
                    style={{ color: isMe ? '#d4a800' : '#4b4b4b' }}
                  >
                    {user.name} {isMe && '(You)'}
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${Math.round((user.xp / leaderboard[0].xp) * 100)}px`,
                        background: isMe ? '#ffd900' : isPromo ? '#58cc02' : '#e5e5e5',
                        maxWidth: '120px',
                      }}
                    />
                  </div>
                </div>

                {/* XP */}
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-sm" style={{ color: isMe ? '#d4a800' : '#4b4b4b' }}>
                    {user.xp.toLocaleString()}
                  </p>
                  <p className="text-xs font-bold" style={{ color: '#afafaf' }}>XP</p>
                </div>

                {/* Trend icon */}
                <div className="flex-shrink-0">
                  {user.rank <= 3 ? (
                    <ChevronUp size={16} color="#58cc02" />
                  ) : user.rank >= DEMOTE_START ? (
                    <ChevronDown size={16} color="#ff4b4b" />
                  ) : (
                    <Minus size={16} color="#afafaf" />
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer note */}
      <div
        className="mt-6 p-4 rounded-2xl text-center card-shadow"
        style={{ background: '#fff' }}
      >
        <p className="font-extrabold text-sm" style={{ color: '#4b4b4b' }}>
          You're in <span style={{ color: '#ffd900' }}>8th place</span> 🏅
        </p>
        <p className="text-xs font-bold mt-1" style={{ color: '#afafaf' }}>
          Keep going! Earn <strong style={{ color: '#58cc02' }}>220 more XP</strong> to reach 7th place.
        </p>
      </div>
    </div>
  )
}
