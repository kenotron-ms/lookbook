export const CURRENT_USER = {
  name: 'Jordan Blake',
  plan: 'Premium',
  avatar: 'JB',
}

export const CURRENT_TRACK = {
  id: 1,
  title: 'Neon Drift',
  artist: 'Synthwave Dreams',
  album: 'Digital Horizons',
  duration: 234,
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}

export const ARTISTS = [
  { id: 1, name: 'Synthwave Dreams', listeners: '2.4M', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, name: 'Luna Voss', listeners: '1.8M', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, name: 'The Analog Set', listeners: '3.1M', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, name: 'Nora Kane', listeners: '987K', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, name: 'Dusk Protocol', listeners: '1.2M', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, name: 'Echo Chamber', listeners: '654K', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 7, name: 'River Stone', listeners: '2.9M', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 8, name: 'Mira Sky', listeners: '1.5M', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
]

export const ALBUMS = [
  { id: 1, title: 'Digital Horizons', artist: 'Synthwave Dreams', year: 2024, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Crimson Tide', artist: 'Luna Voss', year: 2024, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: 'Static Dreams', artist: 'The Analog Set', year: 2023, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, title: 'Bloom', artist: 'Nora Kane', year: 2024, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, title: 'After Hours', artist: 'Dusk Protocol', year: 2023, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, title: 'Resonance', artist: 'Echo Chamber', year: 2024, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
]

export const SONGS = [
  { id: 1, title: 'Neon Drift', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 234, plays: '8.2M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Midnight Pulse', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 198, plays: '6.1M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 3, title: 'Ultraviolet', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 215, plays: '5.4M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 4, title: 'Ghost Signal', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 247, plays: '4.8M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 5, title: 'Parallel Lines', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 183, plays: '3.9M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 6, title: 'Burning Chrome', artist: 'Luna Voss', album: 'Crimson Tide', duration: 221, plays: '7.3M', albumId: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 7, title: 'Halcyon', artist: 'Luna Voss', album: 'Crimson Tide', duration: 189, plays: '5.6M', albumId: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 8, title: 'Red Sky', artist: 'Luna Voss', album: 'Crimson Tide', duration: 204, plays: '4.2M', albumId: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 9, title: 'Static Wave', artist: 'The Analog Set', album: 'Static Dreams', duration: 262, plays: '9.1M', albumId: 3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 10, title: 'Frequency', artist: 'The Analog Set', album: 'Static Dreams', duration: 178, plays: '6.8M', albumId: 3, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 11, title: 'Petal', artist: 'Nora Kane', album: 'Bloom', duration: 196, plays: '3.4M', albumId: 4, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 12, title: 'Solstice', artist: 'Nora Kane', album: 'Bloom', duration: 229, plays: '2.8M', albumId: 4, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 13, title: 'Last Light', artist: 'Dusk Protocol', album: 'After Hours', duration: 241, plays: '5.1M', albumId: 5, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 14, title: 'Phantom Room', artist: 'Echo Chamber', album: 'Resonance', duration: 193, plays: '2.2M', albumId: 6, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 15, title: 'River Delta', artist: 'River Stone', album: 'Earthen', duration: 217, plays: '4.6M', albumId: 1, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 16, title: 'Orbit', artist: 'Mira Sky', album: 'Celestial', duration: 234, plays: '3.8M', albumId: 2, gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
  { id: 17, title: 'Vertigo', artist: 'Synthwave Dreams', album: 'Digital Horizons', duration: 208, plays: '3.1M', albumId: 1, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 18, title: 'Tides', artist: 'Nora Kane', album: 'Bloom', duration: 185, plays: '2.5M', albumId: 4, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 19, title: 'Cascade', artist: 'Luna Voss', album: 'Crimson Tide', duration: 223, plays: '4.0M', albumId: 2, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 20, title: 'The Quiet', artist: 'River Stone', album: 'Earthen', duration: 252, plays: '1.9M', albumId: 6, gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
]

export const PLAYLISTS = [
  { id: 'liked', name: 'Liked Songs', description: 'Your favorite tracks', owner: 'Jordan Blake', count: 247, gradient: 'linear-gradient(135deg, #450af5 0%, #c4efd9 100%)' },
  { id: '1', name: 'Chill Vibes', description: 'Perfect for winding down', owner: 'Jordan Blake', count: 42, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: '2', name: 'Late Night Drive', description: 'The road goes on forever', owner: 'Jordan Blake', count: 31, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: '3', name: 'Morning Energy', description: 'Start the day right', owner: 'Jordan Blake', count: 58, gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: '4', name: 'Focus Mode', description: 'Deep work, deep sounds', owner: 'Groove', count: 76, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: '5', name: 'Throwback Hits', description: 'Classics never get old', owner: 'Groove', count: 103, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
]

export const RECENTLY_PLAYED = [
  { id: 1, title: 'Digital Horizons', artist: 'Synthwave Dreams', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Chill Vibes', artist: 'Playlist', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 3, title: 'Crimson Tide', artist: 'Luna Voss', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 4, title: 'Late Night Drive', artist: 'Playlist', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 5, title: 'Static Dreams', artist: 'The Analog Set', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 6, title: 'Morning Energy', artist: 'Playlist', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
]

export const MADE_FOR_YOU = [
  { id: 1, title: 'Daily Mix 1', description: 'Synthwave Dreams, Luna Voss and more', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Daily Mix 2', description: 'The Analog Set, River Stone and more', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 3, title: 'Daily Mix 3', description: 'Nora Kane, Mira Sky and more', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 4, title: 'Discover Weekly', description: 'Your weekly mixtape of fresh music', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 5, title: 'Release Radar', description: 'Catch all the latest music from artists you follow', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, title: 'Time Capsule', description: 'We made you a playlist of songs you used to love', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
]

export const NEW_RELEASES = [
  { id: 1, title: 'Digital Horizons', artist: 'Synthwave Dreams', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 2, title: 'Crimson Tide', artist: 'Luna Voss', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 3, title: 'Static Dreams', artist: 'The Analog Set', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 4, title: 'Bloom', artist: 'Nora Kane', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { id: 5, title: 'After Hours', artist: 'Dusk Protocol', gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
  { id: 6, title: 'Resonance', artist: 'Echo Chamber', gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 7, title: 'Earthen', artist: 'River Stone', gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 8, title: 'Celestial', artist: 'Mira Sky', gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' },
]

export const SEARCH_CATEGORIES = [
  { name: 'Pop', color: '#e91429' },
  { name: 'Hip-Hop', color: '#ba5d07' },
  { name: 'Rock', color: '#27856a' },
  { name: 'Electronic', color: '#8d67ab' },
  { name: 'R&B', color: '#1e3264' },
  { name: 'Jazz', color: '#537aa1' },
  { name: 'Classical', color: '#5179a1' },
  { name: 'Country', color: '#1b7a4d' },
  { name: 'Indie', color: '#e91429' },
  { name: 'Metal', color: '#3d3d3d' },
  { name: 'Latin', color: '#e8115b' },
  { name: 'K-Pop', color: '#8400e7' },
  { name: 'Soul', color: '#c87d3e' },
  { name: 'Punk', color: '#006450' },
  { name: 'Folk', color: '#d84000' },
]

export function formatDuration(seconds) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
