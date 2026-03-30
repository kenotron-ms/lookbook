import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

const COLORS = {
  info:    { bg: 'var(--accent)',  icon: '💬' },
  success: { bg: '#00ba7c',       icon: '✓'  },
  error:   { bg: '#f4212e',       icon: '✕'  },
  like:    { bg: '#f91880',       icon: '♥'  },
  echo:    { bg: '#00ba7c',       icon: '↺'  },
}

function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', gap: 8, zIndex: 9999,
      pointerEvents: 'none',
    }}>
      {toasts.map(t => {
        const c = COLORS[t.type] ?? COLORS.info
        return (
          <div key={t.id} style={{
            background: c.bg, color: '#fff',
            padding: '10px 18px', borderRadius: 9999,
            fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            animation: 'fadeSlideUp 0.2s ease',
          }}>
            {t.message}
          </div>
        )
      })}
    </div>
  )
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 2800) => {
    const id = Date.now() + Math.random()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), duration)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  return ctx ?? { addToast: () => {} }
}
