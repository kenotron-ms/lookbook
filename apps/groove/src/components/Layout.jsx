import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import PlayerBar from './PlayerBar'
import { useState } from 'react'
import { CURRENT_TRACK } from '../data/music'

export default function Layout() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(32)
  const [volume, setVolume] = useState(75)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [liked, setLiked] = useState(false)
  const [track] = useState(CURRENT_TRACK)

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#121212', overflow: 'hidden', flexDirection: 'column' }}>
      {/* Top: sidebar + main */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{
          flex: 1,
          overflowY: 'auto',
          paddingBottom: '90px',
          background: '#121212',
        }}>
          <Outlet />
        </main>
      </div>
      {/* Bottom player bar */}
      <PlayerBar
        track={track}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        progress={progress}
        setProgress={setProgress}
        volume={volume}
        setVolume={setVolume}
        shuffle={shuffle}
        setShuffle={setShuffle}
        repeat={repeat}
        setRepeat={setRepeat}
        liked={liked}
        setLiked={setLiked}
      />
    </div>
  )
}
