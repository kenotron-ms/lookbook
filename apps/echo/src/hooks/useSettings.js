import { useLiveQuery } from 'dexie-react-hooks'
import db from '../db/index.js'

// Map of setting keys that need localStorage paint cache (applied before React hydrates)
const PAINT_CACHE_KEYS = new Set(['theme', 'fontSize', 'accent'])

/**
 * useSetting(key, defaultValue?)
 * Returns [value, setValue] backed by Dexie settings table.
 * - value is `defaultValue` while loading or when not set.
 * - setValue writes to Dexie; also writes to localStorage for paint-cache keys.
 */
export function useSetting(key, defaultValue = null) {
  const row = useLiveQuery(() => db.settings.get(key), [key])

  // undefined = still loading; null = not in DB
  const value = row === undefined ? defaultValue : (row?.value ?? defaultValue)

  async function setValue(newValue) {
    if (newValue === null || newValue === undefined) {
      await db.settings.delete(key)
      if (PAINT_CACHE_KEYS.has(key)) localStorage.removeItem(`echo-${key}`)
    } else {
      const str = String(newValue)
      await db.settings.put({ key, value: str })
      if (PAINT_CACHE_KEYS.has(key)) localStorage.setItem(`echo-${key}`, str)
    }
  }

  return [value, setValue]
}

// Accent color → hover color lookup
export const ACCENT_HOVERS = {
  '#6366f1': '#5254cc',
  '#7c3aed': '#6d28d9',
  '#1d9bf0': '#1a8cd8',
  '#00ba7c': '#00a368',
  '#ff7700': '#e06600',
  '#f91880': '#d61672',
}

/**
 * applyDisplaySettings — applies theme/fontSize/accent to the DOM.
 * Called from main.jsx before React mounts to avoid flash.
 */
export function applyDisplaySettings(settings = {}) {
  if (settings.theme !== undefined) {
    document.documentElement.setAttribute('data-theme', settings.theme)
  }
  if (settings.fontSize) {
    document.documentElement.style.setProperty('--font-size', settings.fontSize)
  }
  if (settings.accent) {
    document.documentElement.style.setProperty('--accent', settings.accent)
    document.documentElement.style.setProperty('--accent-hover', ACCENT_HOVERS[settings.accent] || '#5254cc')
  }
}
