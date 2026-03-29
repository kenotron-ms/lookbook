import { useState, useEffect } from 'react'

export default function CountdownTimer({ initialTime, className = '' }) {
  const [time, setTime] = useState(
    initialTime
      ? initialTime.h * 3600 + initialTime.m * 60 + initialTime.s
      : 0
  )

  useEffect(() => {
    if (!initialTime) return
    const interval = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = time % 60

  const isEndingSoon = h < 1
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <span
      className={className}
      style={{ color: isEndingSoon ? '#e53935' : '#191919', fontWeight: 600 }}
    >
      {h > 0 ? `${h}h ` : ''}{pad(m)}m {pad(s)}s
    </span>
  )
}
