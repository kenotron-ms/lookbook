import { games } from '../data/articles.js'
import { Flame, Check, Circle } from 'lucide-react'

const gameColors = {
  wordle: { bg: '#6aaa64', text: '#ffffff', symbol: 'W' },
  connections: { bg: '#b59f3b', text: '#ffffff', symbol: 'C' },
  'spelling-bee': { bg: '#f7da21', text: '#121212', symbol: '✦' },
  'mini-crossword': { bg: '#326891', text: '#ffffff', symbol: '✕' },
}

export default function Games() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">

      {/* Page header */}
      <div className="border-t-2 border-gray-900 mb-1" />
      <div className="flex items-baseline justify-between mb-6">
        <h1
          className="font-serif text-4xl font-bold text-gray-950"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Games
        </h1>
        <span className="font-sans text-xs text-gray-400 uppercase tracking-wider">{today}</span>
      </div>

      <p
        className="font-serif text-base text-gray-600 mb-8 max-w-xl"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        Free daily games from The Herald — sharpen your mind while you catch up on the news.
      </p>

      {/* Game cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
        {games.map((game) => {
          const meta = gameColors[game.id]
          return (
            <div key={game.id} className="border border-gray-200 bg-white overflow-hidden">
              {/* Colored illustration area */}
              <div
                className="flex items-center justify-center"
                style={{ backgroundColor: meta.bg, height: '140px' }}
              >
                <span
                  className="font-serif text-7xl font-bold select-none"
                  style={{
                    color: meta.text,
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    opacity: 0.9,
                  }}
                >
                  {meta.symbol}
                </span>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2
                    className="font-serif text-xl font-bold text-gray-950"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {game.name}
                  </h2>
                  {/* Streak */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Flame size={14} className="text-orange-500" />
                    <span className="font-sans text-xs font-semibold text-gray-700">
                      {game.streakDays} day streak
                    </span>
                  </div>
                </div>

                <p className="font-sans text-sm text-gray-500 mb-4 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex items-center justify-between">
                  <button
                    className="font-sans text-sm font-semibold uppercase tracking-wider text-white px-5 py-2 transition-opacity hover:opacity-90"
                    style={{ backgroundColor: game.completed ? '#4a4a4a' : '#326891' }}
                  >
                    {game.completed ? 'View Results' : 'Play'}
                  </button>
                  {game.completed && game.score && (
                    <span className="font-sans text-xs font-semibold text-green-700 flex items-center gap-1">
                      <Check size={12} strokeWidth={2.5} />
                      {game.score}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress today */}
      <div className="border-t-2 border-gray-900 mb-4">
        <span className="section-label block mt-1">Your Progress Today</span>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {games.map((game) => {
          const meta = gameColors[game.id]
          return (
            <div key={game.id} className="flex items-center gap-2">
              <div
                className="w-6 h-6 flex items-center justify-center rounded-full"
                style={{
                  backgroundColor: game.completed ? meta.bg : 'transparent',
                  border: game.completed ? 'none' : '2px solid #e2e2e2',
                }}
              >
                {game.completed
                  ? <Check size={12} color={meta.text} strokeWidth={3} />
                  : <Circle size={12} color="#cccccc" />
                }
              </div>
              <span className="font-sans text-xs text-gray-600">{game.name}</span>
            </div>
          )
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-gray-200 pt-6">
        {[
          { label: 'Games completed today', value: `${games.filter(g => g.completed).length}/${games.length}` },
          { label: 'Longest streak', value: `${Math.max(...games.map(g => g.streakDays))} days` },
          { label: 'Total games played', value: '284' },
          { label: 'Member since', value: '2025' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <p
              className="font-serif text-2xl font-bold text-gray-950 mb-1"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {stat.value}
            </p>
            <p className="font-sans text-xs text-gray-500 uppercase tracking-wider leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
