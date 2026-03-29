import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import Header from '../components/Header.jsx'
import PenCard from '../components/PenCard.jsx'
import { pens } from '../data/pens.js'

const TABS = ['Pens', 'Projects', 'Collections']

const myPens = pens.slice(0, 7)

export default function Work() {
  const [activeTab, setActiveTab] = useState('Pens')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen" style={{ background: '#1e1f26' }}>
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold mb-0.5" style={{ color: '#f8f8f2' }}>Your Work</h1>
            <p className="text-sm" style={{ color: '#6272a4' }}>All your pens, projects, and collections</p>
          </div>
          <button
            onClick={() => navigate('/editor')}
            className="flex items-center gap-1.5 px-4 py-2 rounded font-semibold text-sm"
            style={{ background: '#47cf73', color: '#0a1f12' }}
            onMouseEnter={e => e.currentTarget.style.background = '#3ab562'}
            onMouseLeave={e => e.currentTarget.style.background = '#47cf73'}
          >
            <Plus size={15} />
            New Pen
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-7" style={{ borderBottom: '1px solid #2d2f3d' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-2 text-sm font-medium transition-all relative"
              style={{
                color: activeTab === tab ? '#47cf73' : '#6272a4',
                background: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #47cf73' : '2px solid transparent',
                marginBottom: -1,
              }}
              onMouseEnter={e => {
                if (activeTab !== tab) e.currentTarget.style.color = '#f8f8f2'
              }}
              onMouseLeave={e => {
                if (activeTab !== tab) e.currentTarget.style.color = '#6272a4'
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
          {/* New Pen card */}
          <div
            className="rounded-lg overflow-hidden cursor-pointer transition-all flex flex-col items-center justify-center gap-3"
            style={{
              background: '#282a36',
              border: '2px dashed #3d3f52',
              height: 220,
            }}
            onClick={() => navigate('/editor')}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = '#47cf73'
              e.currentTarget.style.background = '#282a3699'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#3d3f52'
              e.currentTarget.style.background = '#282a36'
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: '#3d3f52' }}
            >
              <Plus size={22} style={{ color: '#47cf73' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#6272a4' }}>New Pen</span>
          </div>

          {myPens.map(pen => (
            <PenCard key={pen.id} pen={pen} />
          ))}
        </div>
      </div>
    </div>
  )
}
