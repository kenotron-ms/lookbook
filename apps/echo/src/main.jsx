import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { seedIfEmpty } from './db/seed.js'
import db from './db/index.js'
import { applyDisplaySettings } from './hooks/useSettings.js'

seedIfEmpty().then(async () => {
  // Apply saved display settings from Dexie before first render
  // (localStorage paint-cache handles the very first load; this handles subsequent ones)
  try {
    const rows = await db.settings.toArray()
    const settings = Object.fromEntries(rows.map(r => [r.key, r.value]))
    applyDisplaySettings(settings)
    // Keep localStorage paint-cache in sync
    if (settings.theme !== undefined) localStorage.setItem('echo-theme', settings.theme)
    if (settings.fontSize) localStorage.setItem('echo-fontSize', settings.fontSize)
    if (settings.accent) localStorage.setItem('echo-accent', settings.accent)
  } catch (e) {
    console.warn('Could not apply display settings:', e)
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}).catch(console.error)
