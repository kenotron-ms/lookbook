import { useState } from 'react'
import Header from '../components/Header.jsx'
import PenCard from '../components/PenCard.jsx'
import { pens } from '../data/pens.js'

const TABS = ['Trending', 'Latest', 'Picked', 'Following']

export default function Home() {
  const [activeTab, setActiveTab] = useState('Trending')

  return (
    <div className="min-h-screen" style={{ background: '#1e1f26' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-7">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-all"
              style={{
                background: activeTab === tab ? '#47cf73' : 'transparent',
                color: activeTab === tab ? '#0a1f12' : '#6272a4',
                border: activeTab === tab ? 'none' : '1px solid #2d2f3d',
              }}
              onMouseEnter={e => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#f8f8f2'
                  e.currentTarget.style.borderColor = '#6272a4'
                }
              }}
              onMouseLeave={e => {
                if (activeTab !== tab) {
                  e.currentTarget.style.color = '#6272a4'
                  e.currentTarget.style.borderColor = '#2d2f3d'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          className="grid gap-5"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
        >
          {pens.map(pen => (
            <PenCard key={pen.id} pen={pen} />
          ))}
        </div>
      </div>
    </div>
  )
}
