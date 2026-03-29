import { Flame, Diamond, Globe, Trophy, UserPlus } from 'lucide-react'
import { profile } from '../data/lessons.js'

const maxXP = Math.max(...profile.weeklyXP)

export default function Profile() {
  return (
    <div className="max-w-[520px] mx-auto">
      {/* User card */}
      <div className="bg-white rounded-2xl p-6 card-shadow mb-5 text-center">
        {/* Avatar */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mx-auto mb-3"
          style={{ background: '#d7f0b6', border: '4px solid #58cc02' }}
        >
          {profile.avatar}
        </div>
        <h1 className="font-black text-2xl" style={{ color: '#4b4b4b' }}>{profile.name}</h1>
        <p className="font-bold text-sm mb-0.5" style={{ color: '#afafaf' }}>{profile.username}</p>
        <p className="font-bold text-xs" style={{ color: '#afafaf' }}>Joined {profile.joined}</p>

        {/* Follow row */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t-2 border-[#f0f0f0]">
          <div className="text-center">
            <p className="font-black text-lg" style={{ color: '#4b4b4b' }}>{profile.following}</p>
            <p className="text-xs font-bold" style={{ color: '#afafaf' }}>Following</p>
          </div>
          <div className="w-px h-8 bg-[#e5e5e5]" />
          <div className="text-center">
            <p className="font-black text-lg" style={{ color: '#4b4b4b' }}>{profile.followers}</p>
            <p className="text-xs font-bold" style={{ color: '#afafaf' }}>Followers</p>
          </div>
          <button
            className="flex items-center gap-1 px-4 py-2 rounded-xl font-extrabold text-sm btn-raised ml-4"
            style={{ background: '#58cc02', color: 'white', boxShadow: '0 3px 0 #4aab00' }}
          >
            <UserPlus size={14} />
            Add Friend
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { icon: <Flame size={22} fill="#ffd900" color="#ffd900" />, val: profile.streak, label: 'Day Streak', color: '#ffd900' },
          { icon: <Diamond size={22} fill="#1cb0f6" color="#1cb0f6" />, val: profile.totalXP.toLocaleString(), label: 'Total XP', color: '#1cb0f6' },
          { icon: <Globe size={22} color="#58cc02" />, val: profile.languages, label: 'Languages', color: '#58cc02' },
          { icon: <Trophy size={22} fill="#ffd900" color="#ffd900" />, val: profile.league, label: 'League', color: '#ffd900' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-3 card-shadow flex flex-col items-center gap-1"
          >
            {stat.icon}
            <p className="font-black text-base leading-tight" style={{ color: stat.color }}>
              {stat.val}
            </p>
            <p className="text-xs font-bold text-center leading-tight" style={{ color: '#afafaf' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly XP chart */}
      <div className="bg-white rounded-2xl p-5 card-shadow mb-5">
        <h2 className="font-black text-base mb-4" style={{ color: '#4b4b4b' }}>
          My Statistics — XP This Week
        </h2>
        <div className="flex items-end justify-between gap-2" style={{ height: '100px' }}>
          {profile.weeklyXP.map((xp, i) => {
            const heightPct = maxXP > 0 ? (xp / maxXP) * 100 : 0
            const isToday = i === profile.weeklyXP.length - 1
            return (
              <div key={i} className="flex flex-col items-center gap-1 flex-1">
                <span className="text-xs font-extrabold" style={{ color: isToday ? '#58cc02' : '#afafaf' }}>
                  {xp}
                </span>
                <div
                  className="w-full rounded-t-lg transition-all"
                  style={{
                    height: `${heightPct}%`,
                    minHeight: xp > 0 ? '6px' : '0',
                    background: isToday ? '#58cc02' : '#d7f0b6',
                  }}
                />
                <span className="text-xs font-bold" style={{ color: '#afafaf' }}>
                  {profile.weekDays[i]}
                </span>
              </div>
            )
          })}
        </div>
        <div className="mt-3 pt-3 border-t-2 border-[#f0f0f0] flex items-center justify-between">
          <p className="text-xs font-bold" style={{ color: '#afafaf' }}>Total this week</p>
          <p className="font-black text-sm" style={{ color: '#58cc02' }}>
            {profile.weeklyXP.reduce((a, b) => a + b, 0)} XP ⚡
          </p>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl p-5 card-shadow mb-5">
        <h2 className="font-black text-base mb-4" style={{ color: '#4b4b4b' }}>Achievements</h2>
        <div className="grid grid-cols-3 gap-3">
          {profile.achievements.map(ach => (
            <div
              key={ach.id}
              className="flex flex-col items-center p-3 rounded-2xl text-center"
              style={{
                background: ach.earned ? '#d7f0b6' : '#f5f5f5',
                border: `2px solid ${ach.earned ? '#58cc02' : '#e5e5e5'}`,
                opacity: ach.earned ? 1 : 0.5,
              }}
            >
              <span className="text-3xl mb-1">{ach.icon}</span>
              <p
                className="font-extrabold text-xs"
                style={{ color: ach.earned ? '#58cc02' : '#afafaf' }}
              >
                {ach.title}
              </p>
              <p className="text-xs font-bold mt-0.5" style={{ color: '#afafaf', fontSize: '10px' }}>
                {ach.desc}
              </p>
              {!ach.earned && (
                <span className="text-xs mt-1" style={{ color: '#afafaf' }}>🔒</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Friends */}
      <div className="bg-white rounded-2xl p-5 card-shadow mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-base" style={{ color: '#4b4b4b' }}>Friends</h2>
          <button
            className="text-xs font-extrabold px-3 py-1 rounded-xl btn-raised"
            style={{ color: '#58cc02', background: '#d7f0b6', boxShadow: '0 2px 0 #4aab00' }}
          >
            + Add
          </button>
        </div>
        <div className="flex flex-col gap-3">
          {profile.friends.map((friend, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: '#f0f0f0', border: '2px solid #e5e5e5' }}
              >
                {friend.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-sm" style={{ color: '#4b4b4b' }}>{friend.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <Flame size={12} fill="#ffd900" color="#ffd900" />
                  <span className="text-xs font-bold" style={{ color: '#afafaf' }}>
                    {friend.streak} day streak
                  </span>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-extrabold text-sm" style={{ color: '#1cb0f6' }}>
                  {friend.xp.toLocaleString()}
                </p>
                <p className="text-xs font-bold" style={{ color: '#afafaf' }}>XP</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
