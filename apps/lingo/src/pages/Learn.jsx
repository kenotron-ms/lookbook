import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Lock, Check, Star, ChevronDown, Zap } from 'lucide-react'
import { sections } from '../data/lessons.js'

const sectionColors = ['#58cc02', '#1cb0f6', '#ff9600', '#ce82ff', '#ffd900']

// Winding path offsets for node positioning
const pathOffsets = [
  'ml-[30%]', 'ml-[55%]', 'ml-[70%]', 'ml-[45%]',
]

export default function Learn() {
  const [expandedSection, setExpandedSection] = useState(null)

  return (
    <div className="max-w-[520px] mx-auto">
      {/* Language selector bar */}
      <div className="flex items-center justify-between mb-6 bg-white rounded-2xl p-4 card-shadow">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🇪🇸</span>
          <div>
            <p className="text-xs font-extrabold" style={{ color: '#afafaf' }}>CURRENT COURSE</p>
            <p className="font-black text-base" style={{ color: '#4b4b4b' }}>Spanish · Section 5</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1 px-3 py-2 rounded-xl font-extrabold text-sm card-shadow btn-raised"
            style={{ background: '#fff', color: '#58cc02', border: '2px solid #58cc02', boxShadow: '0 4px 0 #4aab00' }}
          >
            <BookOpen size={14} />
            Guidebook
          </button>
          <button
            className="p-2 rounded-xl"
            style={{ background: '#f0f0f0', color: '#afafaf' }}
          >
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Lesson path */}
      <div className="flex flex-col gap-3">
        {sections.map((section, sIdx) => {
          const color = sectionColors[sIdx % sectionColors.length]
          return (
            <div key={section.id}>
              {/* Section banner */}
              <div
                className="rounded-2xl p-4 mb-4 flex items-center justify-between"
                style={{ background: section.bgColor, border: `2px solid ${color}` }}
              >
                <div>
                  <p
                    className="text-xs font-extrabold tracking-widest uppercase mb-0.5"
                    style={{ color }}
                  >
                    {section.title}
                  </p>
                  <p className="text-sm font-bold" style={{ color: '#4b4b4b' }}>
                    {section.nodes.length} lessons
                  </p>
                </div>
                <div className="text-2xl">
                  {sIdx === 0 ? '🌱' : sIdx === 1 ? '💬' : sIdx === 2 ? '👨‍👩‍👧' : sIdx === 3 ? '💼' : '🚀'}
                </div>
              </div>

              {/* Nodes in winding path */}
              <div className="flex flex-col gap-5 mb-6">
                {section.nodes.map((node, nIdx) => {
                  const offset = pathOffsets[nIdx % pathOffsets.length]
                  const isActive = node.type === 'active'
                  const isDone = node.type === 'completed'
                  const isLocked = node.type === 'locked'

                  return (
                    <div key={node.id} className={`flex flex-col items-start ${offset}`}>
                      {/* Active node tooltip */}
                      {isActive && (
                        <div
                          className="mb-2 px-3 py-1.5 rounded-xl text-white text-xs font-extrabold animate-fade-up"
                          style={{ background: '#58cc02', boxShadow: '0 2px 8px rgba(88,204,2,0.4)' }}
                        >
                          START →
                        </div>
                      )}

                      <Link to={isLocked ? '#' : '/lesson'} className="no-underline">
                        <div
                          className={`
                            relative flex items-center justify-center rounded-full font-black text-xl
                            transition-transform hover:scale-105
                            ${isActive ? 'w-20 h-20 animate-pulse-ring' : 'w-16 h-16'}
                            ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          style={{
                            background: isDone || isActive ? color : '#e5e5e5',
                            color: isDone || isActive ? 'white' : '#afafaf',
                            boxShadow: isDone || isActive
                              ? `0 4px 0 ${isDone ? '#4aab00' : '#4aab00'}, 0 0 0 3px white, 0 0 0 5px ${color}`
                              : '0 4px 0 #c0c0c0',
                          }}
                        >
                          {isDone ? (
                            <Check size={24} strokeWidth={3} color="white" />
                          ) : isLocked ? (
                            <Lock size={22} strokeWidth={2.5} />
                          ) : (
                            <Star size={28} fill="white" color="white" />
                          )}

                          {/* XP badge for active */}
                          {isActive && (
                            <div
                              className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                              style={{ background: '#ffd900', color: '#4b4b4b', border: '2px solid white' }}
                            >
                              {node.xp}
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Node label */}
                      <p
                        className="mt-2 text-xs font-extrabold text-center"
                        style={{
                          color: isDone || isActive ? '#4b4b4b' : '#afafaf',
                          maxWidth: '80px',
                        }}
                      >
                        {node.title}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bonus / Practice floating area */}
      <div
        className="sticky bottom-6 mx-auto mt-2 flex items-center justify-center gap-3"
      >
        <Link
          to="/lesson"
          className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white no-underline text-base btn-raised card-shadow-green"
          style={{ background: '#58cc02', boxShadow: '0 4px 0 #4aab00' }}
        >
          <Zap size={20} fill="white" color="white" />
          Practice
        </Link>
        <button
          className="flex items-center gap-2 px-5 py-4 rounded-2xl font-black text-sm btn-raised"
          style={{
            background: '#fff',
            color: '#4b4b4b',
            border: '2px solid #e5e5e5',
            boxShadow: '0 4px 0 #e5e5e5',
          }}
        >
          💎 Daily Quests
        </button>
      </div>
    </div>
  )
}
