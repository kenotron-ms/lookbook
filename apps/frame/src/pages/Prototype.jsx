import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers, MousePointer2, Frame, Square, Type, PenTool, Hand,
  MessageCircle, ChevronRight, ChevronDown, Play, Share2,
  ArrowRight, Plus, Zap, Link2
} from 'lucide-react'
import { pages } from '../data/files'

const ARTBOARDS = [
  {
    id: 'home',
    name: 'Home',
    x: 60,
    y: 80,
    w: 180,
    h: 120,
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #f8f6ff 50%)',
    color: '#667eea',
  },
  {
    id: 'detail',
    name: 'Product Detail',
    x: 360,
    y: 40,
    w: 180,
    h: 120,
    color: '#f093fb',
  },
  {
    id: 'checkout',
    name: 'Checkout',
    x: 360,
    y: 240,
    w: 180,
    h: 120,
    color: '#43e97b',
  },
]

const FLOWS = [
  { from: 'home', to: 'detail', trigger: 'On Click', label: 'Navigate →' },
  { from: 'detail', to: 'checkout', trigger: 'On Click', label: 'Navigate →' },
]

export default function Prototype() {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState('prototype')

  return (
    <div className="flex flex-col h-screen" style={{ background: '#1e1e1e', color: '#e0e0e0' }}>
      {/* Top Bar */}
      <header className="flex items-center h-11 px-3 gap-3 shrink-0 border-b border-[#333]" style={{ background: '#1e1e1e' }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 hover:opacity-80">
          <Layers size={18} color="#a259ff" />
        </button>
        <div className="w-px h-5 bg-[#333]" />
        <span className="text-sm text-gray-300 font-medium">Product Redesign v3</span>
        <ChevronDown size={13} className="text-gray-500" />
        <div className="flex-1" />
        {/* Page tabs */}
        <div className="flex items-center">
          {pages.map(p => (
            <button
              key={p.id}
              onClick={() => {
                setActivePage(p.id)
                if (p.id === 'design') navigate('/editor')
              }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                (p.id === 'prototype' && activePage === 'prototype') || (p.id === activePage)
                  ? 'text-white bg-[#2c2c2c]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2 py-1 rounded border border-[#444] hover:border-[#666]">
            <Share2 size={12} /> Share
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md" style={{ background: '#a259ff', color: '#fff' }}>
            <Play size={11} fill="#fff" /> Preview
          </button>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#a259ff' }}>
            KL
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Narrow tool panel */}
        <div className="flex flex-col items-center py-2 gap-1 shrink-0 border-r border-[#333]" style={{ width: 40, background: '#252526' }}>
          {[MousePointer2, Hand, MessageCircle].map((Icon, i) => (
            <button key={i} className={`tool-btn ${i === 0 ? 'active' : ''}`}>
              <Icon size={16} />
            </button>
          ))}
        </div>

        {/* Left Sidebar */}
        <div className="flex flex-col shrink-0 border-r border-[#333]" style={{ width: 220, background: '#252526' }}>
          <div className="flex items-center justify-between px-3 h-9 border-b border-[#333]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Flow</span>
            <Plus size={13} className="text-gray-500 cursor-pointer hover:text-gray-300" />
          </div>
          <div className="p-2 space-y-1">
            {ARTBOARDS.map(ab => (
              <div key={ab.id} className="flex items-center gap-2 px-2 py-1.5 rounded layer-item cursor-pointer">
                <div className="w-8 h-5 rounded border border-[#444]" style={{ background: ab.color + '44' }} />
                <span className="text-xs text-gray-300 flex-1 truncate">{ab.name}</span>
              </div>
            ))}
            {/* Connections */}
            <div className="mt-4 px-2">
              <p className="text-[10px] text-gray-600 uppercase tracking-wider mb-2">Connections</p>
              {FLOWS.map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 py-1">
                  <Link2 size={11} className="text-[#a259ff] shrink-0" />
                  <span className="text-[11px] text-gray-400 truncate">
                    {ARTBOARDS.find(a => a.id === f.from)?.name}
                  </span>
                  <ArrowRight size={10} className="text-gray-600 shrink-0" />
                  <span className="text-[11px] text-gray-400 truncate">
                    {ARTBOARDS.find(a => a.id === f.to)?.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prototype Canvas */}
        <div className="flex-1 canvas-bg relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
            {/* Arrow from Home → Detail */}
            <defs>
              <marker id="arrow-purple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#a259ff" />
              </marker>
            </defs>
            {/* Home → Detail */}
            <path
              d="M 240 140 C 290 140, 320 100, 360 100"
              stroke="#a259ff"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="0"
              markerEnd="url(#arrow-purple)"
              opacity="0.8"
            />
            {/* Detail → Checkout */}
            <path
              d="M 450 160 C 450 200, 450 220, 450 240"
              stroke="#a259ff"
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrow-purple)"
              opacity="0.8"
            />
            {/* Connection labels */}
            <text x="282" y="130" fill="#a259ff" fontSize="9" fontFamily="monospace" opacity="0.9">On Click</text>
            <text x="455" y="200" fill="#a259ff" fontSize="9" fontFamily="monospace" opacity="0.9">On Click</text>
          </svg>

          {/* Artboard cards */}
          {ARTBOARDS.map(ab => (
            <div
              key={ab.id}
              className="absolute bg-white rounded shadow-lg border-2 hover:border-[#a259ff] transition-colors cursor-pointer"
              style={{ left: ab.x, top: ab.y, width: ab.w, height: ab.h, borderColor: '#333' }}
            >
              {/* Thumbnail */}
              <div className="w-full h-full rounded overflow-hidden">
                <div className="w-full h-10" style={{ background: '#1a1a2e' }}>
                  <div className="flex items-center px-3 h-full gap-2">
                    <div className="w-4 h-4 rounded" style={{ background: ab.color, opacity: 0.8 }} />
                    <div className="flex-1 h-2 rounded" style={{ background: '#ffffff22' }} />
                  </div>
                </div>
                <div className="p-2 space-y-1.5">
                  <div className="h-3 rounded w-3/4" style={{ background: ab.color + '44' }} />
                  <div className="h-2 rounded w-full" style={{ background: '#eee' }} />
                  <div className="h-2 rounded w-5/6" style={{ background: '#eee' }} />
                  <div className="flex gap-1.5 mt-2">
                    <div className="h-5 rounded flex-1" style={{ background: ab.color, opacity: 0.7 }} />
                    <div className="h-5 rounded flex-1 border" style={{ borderColor: ab.color, opacity: 0.5 }} />
                  </div>
                </div>
              </div>
              {/* Label */}
              <div
                className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-300 font-medium"
              >
                {ab.name}
              </div>
              {/* Trigger dot */}
              <div
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#a259ff] bg-[#1e1e1e] z-10"
              />
            </div>
          ))}
        </div>

        {/* Right Sidebar — Prototype panel */}
        <div className="flex flex-col shrink-0 border-l border-[#333]" style={{ width: 240, background: '#252526' }}>
          <div className="flex border-b border-[#333]">
            {['Design', 'Prototype', 'Inspect'].map(tab => (
              <button
                key={tab}
                className={`flex-1 text-xs py-2.5 font-medium transition-colors ${
                  tab === 'Prototype'
                    ? 'text-white border-b-2 border-[#a259ff] -mb-px'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-3 space-y-4">
            {/* Interaction */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">Interaction</p>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-gray-500">Trigger</label>
                  <select className="prop-input mt-0.5">
                    <option>On Click</option>
                    <option>On Hover</option>
                    <option>After Delay</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500">Action</label>
                  <select className="prop-input mt-0.5">
                    <option>Navigate To</option>
                    <option>Open Overlay</option>
                    <option>Swap Overlay</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500">Destination</label>
                  <select className="prop-input mt-0.5">
                    <option>Product Detail</option>
                    <option>Home</option>
                    <option>Checkout</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Animation */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">Animation</p>
              <div className="space-y-2">
                <div>
                  <label className="text-[10px] text-gray-500">Type</label>
                  <select className="prop-input mt-0.5">
                    <option>Smart Animate</option>
                    <option>Slide In</option>
                    <option>Push</option>
                    <option>Dissolve</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] text-gray-500">Easing</label>
                    <select className="prop-input mt-0.5">
                      <option>Ease In Out</option>
                      <option>Linear</option>
                      <option>Spring</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-500">Duration</label>
                    <input type="text" defaultValue="300ms" className="prop-input mt-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Overflow */}
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-2">Scroll behavior</p>
              <div>
                <label className="text-[10px] text-gray-500">Overflow</label>
                <select className="prop-input mt-0.5">
                  <option>No scrolling</option>
                  <option>Vertical scrolling</option>
                  <option>Horizontal scrolling</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
