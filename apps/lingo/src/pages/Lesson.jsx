import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Zap, Volume2, Check } from 'lucide-react'
import { exercises } from '../data/lessons.js'

const totalSteps = exercises.length

export default function Lesson() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [result, setResult] = useState(null) // 'correct' | 'incorrect'
  const [showXP, setShowXP] = useState(false)
  const [wordSelected, setWordSelected] = useState([])
  const [typedAnswer, setTypedAnswer] = useState('')
  const [shake, setShake] = useState(false)
  const [score, setScore] = useState(0)
  const [complete, setComplete] = useState(false)

  const exercise = exercises[step]
  const progress = ((step) / totalSteps) * 100

  function handleSelect(optId) {
    if (checked) return
    setSelected(optId)
  }

  function handleWordTap(word) {
    if (checked) return
    setWordSelected(prev => [...prev, word])
  }

  function handleWordRemove(idx) {
    if (checked) return
    setWordSelected(prev => prev.filter((_, i) => i !== idx))
  }

  function handleCheck() {
    if (checked) {
      // Continue
      if (step + 1 >= totalSteps) {
        setComplete(true)
      } else {
        setStep(s => s + 1)
        setSelected(null)
        setChecked(false)
        setResult(null)
        setWordSelected([])
        setTypedAnswer('')
        setShake(false)
      }
      return
    }

    // Check answer
    let correct = false
    if (exercise.type === 'multiple_choice') {
      const opt = exercise.options.find(o => o.id === selected)
      correct = opt?.correct || false
    } else if (exercise.type === 'word_bank') {
      const ans = wordSelected.join(' ')
      correct = ans === exercise.answer.join(' ')
    } else if (exercise.type === 'type_answer') {
      correct = typedAnswer.trim().toLowerCase() === exercise.answer.toLowerCase()
    }

    setChecked(true)
    setResult(correct ? 'correct' : 'incorrect')
    if (correct) {
      setScore(s => s + 10)
      setShowXP(true)
      setTimeout(() => setShowXP(false), 1200)
    } else {
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  const canCheck =
    (exercise?.type === 'multiple_choice' && selected !== null) ||
    (exercise?.type === 'word_bank' && wordSelected.length > 0) ||
    (exercise?.type === 'type_answer' && typedAnswer.length > 0)

  if (complete) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4"
           style={{ background: '#f7f7f7' }}>
        <div className="text-6xl mb-4 animate-bounce-in">🎉</div>
        <h1 className="text-3xl font-black mb-2" style={{ color: '#58cc02' }}>Lesson Complete!</h1>
        <p className="text-lg font-bold mb-6" style={{ color: '#4b4b4b' }}>You earned <span style={{color:'#ffd900'}}>+{score} XP</span> 🏆</p>
        <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
          <div className="grid grid-cols-3 gap-4 w-full mb-2">
            {[{label:'XP Earned', val:`+${score}`, color:'#ffd900'},{label:'Accuracy',val:'100%',color:'#58cc02'},{label:'Time',val:'1:23',color:'#1cb0f6'}].map(s=>(
              <div key={s.label} className="flex flex-col items-center bg-white rounded-2xl p-3 card-shadow">
                <span className="text-xl font-black" style={{color:s.color}}>{s.val}</span>
                <span className="text-xs font-bold" style={{color:'#afafaf'}}>{s.label}</span>
              </div>
            ))}
          </div>
          <Link
            to="/"
            className="w-full text-center py-4 rounded-2xl font-black text-white text-base no-underline btn-raised"
            style={{ background: '#58cc02', boxShadow: '0 4px 0 #4aab00' }}
          >
            Continue
          </Link>
          <Link to="/" className="font-extrabold text-sm no-underline" style={{color:'#afafaf'}}>
            Back to courses
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f7f7f7' }}>
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-[#e5e5e5]">
        <div className="max-w-[640px] mx-auto flex items-center gap-4 px-4 py-3">
          <Link to="/" className="flex-shrink-0 text-[#afafaf] hover:text-[#4b4b4b] no-underline">
            <X size={24} strokeWidth={2.5} />
          </Link>

          {/* Progress bar */}
          <div className="flex-1 h-4 rounded-full" style={{ background: '#e5e5e5', overflow: 'hidden' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ background: '#58cc02', width: `${progress}%` }}
            />
          </div>

          {/* Score */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Zap size={18} fill="#ffd900" color="#ffd900" />
            <span className="font-extrabold text-sm" style={{ color: '#ffd900' }}>{score}</span>
          </div>
        </div>
      </div>

      {/* Exercise area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-[540px]">
          {/* Floating XP */}
          {showXP && (
            <div
              className="fixed top-24 right-8 font-black text-lg animate-float-xp z-50"
              style={{ color: '#58cc02' }}
            >
              +10 XP ⚡
            </div>
          )}

          {/* Exercise type badge */}
          <p className="text-xs font-extrabold tracking-widest mb-5" style={{ color: '#afafaf' }}>
            {exercise.instruction}
          </p>

          {/* Character + question */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
              style={{ background: '#d7f0b6', border: '3px solid #58cc02' }}
            >
              🦉
            </div>
            <div className="flex flex-col gap-2">
              {exercise.type !== 'type_answer' && (
                <div
                  className={`bg-white rounded-2xl px-5 py-4 card-shadow ${shake ? 'animate-shake' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <button style={{ color: '#1cb0f6' }}>
                      <Volume2 size={18} />
                    </button>
                    <span className="font-black text-xl" style={{ color: '#4b4b4b' }}>
                      {exercise.question}
                    </span>
                  </div>
                  <p className="text-sm font-bold" style={{ color: '#afafaf' }}>
                    {exercise.questionNote}
                  </p>
                </div>
              )}
              {exercise.type === 'type_answer' && (
                <div className="bg-white rounded-2xl px-5 py-4 card-shadow">
                  <p className="font-black text-xl mb-1" style={{ color: '#4b4b4b' }}>{exercise.question}</p>
                  <p className="text-sm font-bold" style={{ color: '#afafaf' }}>{exercise.questionNote}</p>
                </div>
              )}
            </div>
          </div>

          {/* MULTIPLE CHOICE */}
          {exercise.type === 'multiple_choice' && (
            <div className="flex flex-col gap-3">
              {exercise.options.map(opt => {
                let bg = '#fff', border = '#e5e5e5', shadow = '#e5e5e5', textColor = '#4b4b4b'
                if (checked) {
                  if (opt.correct) { bg = '#d7f0b6'; border = '#58cc02'; shadow = '#4aab00'; textColor = '#58cc02' }
                  else if (opt.id === selected && !opt.correct) { bg = '#ffd0d0'; border = '#ff4b4b'; shadow = '#cc0000'; textColor = '#ff4b4b' }
                } else if (selected === opt.id) {
                  bg = '#ddf4ff'; border = '#1cb0f6'; shadow = '#0a8dc0'; textColor = '#1cb0f6'
                }
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className="w-full text-left px-5 py-4 rounded-2xl font-extrabold text-base btn-raised transition-all"
                    style={{
                      background: bg,
                      border: `2px solid ${border}`,
                      boxShadow: `0 4px 0 ${shadow}`,
                      color: textColor,
                    }}
                  >
                    <span className="mr-3 opacity-60 font-black">{opt.id.toUpperCase()}.</span>
                    {opt.text}
                    {checked && opt.correct && (
                      <span className="float-right">
                        <Check size={20} strokeWidth={3} color="#58cc02" />
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          )}

          {/* WORD BANK */}
          {exercise.type === 'word_bank' && (
            <div>
              {/* Answer area */}
              <div
                className="min-h-[64px] bg-white rounded-2xl p-3 mb-4 flex flex-wrap gap-2 card-shadow"
                style={{ border: '2px solid #e5e5e5' }}
              >
                {wordSelected.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => handleWordRemove(i)}
                    className="px-4 py-2 rounded-xl font-extrabold text-sm btn-raised"
                    style={{
                      background: checked && result === 'correct' ? '#d7f0b6' : checked && result === 'incorrect' ? '#ffd0d0' : '#ddf4ff',
                      color: checked && result === 'correct' ? '#58cc02' : checked && result === 'incorrect' ? '#ff4b4b' : '#1cb0f6',
                      border: `2px solid ${checked && result === 'correct' ? '#58cc02' : checked && result === 'incorrect' ? '#ff4b4b' : '#1cb0f6'}`,
                      boxShadow: `0 3px 0 ${checked && result === 'correct' ? '#4aab00' : checked && result === 'incorrect' ? '#cc0000' : '#0a8dc0'}`,
                    }}
                  >
                    {w}
                  </button>
                ))}
                {wordSelected.length === 0 && (
                  <p className="text-sm font-bold" style={{ color: '#afafaf' }}>Tap words to build your answer</p>
                )}
              </div>

              {/* Word bank tiles */}
              <div className="flex flex-wrap gap-2 justify-center">
                {exercise.wordBank.map((w, i) => {
                  const used = wordSelected.filter(s => s === w).length
                  const total = exercise.wordBank.filter(b => b === w).length
                  const disabled = used >= total || checked
                  return (
                    <button
                      key={i}
                      onClick={() => !disabled && handleWordTap(w)}
                      disabled={disabled}
                      className="px-4 py-2 rounded-xl font-extrabold text-sm btn-raised transition-opacity"
                      style={{
                        background: disabled ? '#f0f0f0' : '#fff',
                        color: disabled ? '#c0c0c0' : '#4b4b4b',
                        border: `2px solid ${disabled ? '#e5e5e5' : '#e5e5e5'}`,
                        boxShadow: disabled ? 'none' : '0 3px 0 #c0c0c0',
                        opacity: disabled ? 0.5 : 1,
                      }}
                    >
                      {w}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* TYPE ANSWER */}
          {exercise.type === 'type_answer' && (
            <div>
              <input
                type="text"
                value={typedAnswer}
                onChange={e => !checked && setTypedAnswer(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && canCheck && handleCheck()}
                placeholder="Type your answer here..."
                className="w-full px-5 py-4 rounded-2xl font-extrabold text-base outline-none transition-all"
                style={{
                  background: '#fff',
                  border: `2px solid ${checked ? (result === 'correct' ? '#58cc02' : '#ff4b4b') : '#e5e5e5'}`,
                  boxShadow: `0 4px 0 ${checked ? (result === 'correct' ? '#4aab00' : '#cc0000') : '#e5e5e5'}`,
                  color: '#4b4b4b',
                }}
              />
              {exercise.hint && (
                <p className="mt-2 text-xs font-bold" style={{ color: '#afafaf' }}>
                  💡 Hint: {exercise.hint}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom: result + check/continue */}
      <div
        className="sticky bottom-0 z-40 border-t-2 border-[#e5e5e5] px-4 py-4"
        style={{
          background: checked
            ? result === 'correct' ? '#d7f0b6' : '#ffd0d0'
            : 'white',
          transition: 'background 0.3s',
        }}
      >
        {checked && (
          <div className="max-w-[540px] mx-auto mb-3 animate-bounce-in">
            {result === 'correct' ? (
              <div className="flex items-center gap-2">
                <Check size={22} strokeWidth={3} color="#58cc02" />
                <div>
                  <p className="font-black text-base" style={{ color: '#58cc02' }}>Correct! 🎉</p>
                  <p className="text-sm font-bold" style={{ color: '#58cc02' }}>+10 XP earned</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <X size={22} strokeWidth={3} color="#ff4b4b" />
                <div>
                  <p className="font-black text-base" style={{ color: '#ff4b4b' }}>Incorrect</p>
                  <p className="text-sm font-bold" style={{ color: '#ff4b4b' }}>
                    Correct answer: {exercise.type === 'multiple_choice'
                      ? exercise.options.find(o => o.correct)?.text
                      : exercise.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="max-w-[540px] mx-auto">
          <button
            onClick={handleCheck}
            disabled={!canCheck && !checked}
            className="w-full py-4 rounded-2xl font-black text-white text-base btn-raised transition-all"
            style={{
              background: !canCheck && !checked
                ? '#e5e5e5'
                : checked
                  ? (result === 'correct' ? '#58cc02' : '#ff4b4b')
                  : '#58cc02',
              color: !canCheck && !checked ? '#afafaf' : 'white',
              boxShadow: !canCheck && !checked
                ? '0 4px 0 #c0c0c0'
                : checked
                  ? (result === 'correct' ? '0 4px 0 #4aab00' : '0 4px 0 #cc0000')
                  : '0 4px 0 #4aab00',
            }}
          >
            {checked ? 'CONTINUE' : 'CHECK'}
          </button>
        </div>
      </div>
    </div>
  )
}
