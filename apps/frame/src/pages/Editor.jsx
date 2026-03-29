import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Layers, MousePointer2, Frame, Square, Type, PenTool, Hand,
  MessageCircle, ChevronRight, ChevronDown, Eye, EyeOff, Lock,
  Unlock, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  RotateCcw, Plus, Minus, ZoomIn, ZoomOut, Play, Share2,
  MoreHorizontal, Minus as MinusIcon, X
} from 'lucide-react'
import { layerTree, pages } from '../data/files'

const TOOLS = [
  { id: 'select', icon: MousePointer2, label: 'Select (V)' },
  { id: 'frame', icon: Frame, label: 'Frame (F)' },
  { id: 'shape', icon: Square, label: 'Rectangle (R)' },
  { id: 'text', icon: Type, label: 'Text (T)' },
  { id: 'pen', icon: PenTool, label: 'Pen (P)' },
  { id: 'hand', icon: Hand, label: 'Hand (H)' },
  { id: 'comment', icon: MessageCircle, label: 'Comment (C)' },
]

function LayerItem({ layer, depth = 0 }) {
  const [expanded, setExpanded] = useState(layer.expanded ?? false)
  const [visible, setVisible] = useState(true)
  const [locked, setLocked] = useState(false)
  const hasChildren = layer.children && layer.children.length > 0

  const typeColor = {
    frame: '#a259ff',
    group: '#4facfe',
    text: '#43e97b',
    rect: '#fa709a',
    vector: '#ffd200',
    image: '#f7971e',
    circle: '#ff6b6b',
  }[layer.type] || '#888'

  const typeIcon = {
    frame: '⬚',
    group: '◻',
    text: 'T',
    rect: '▭',
    vector: '⬟',
    image: '⬜',
    circle: '○',
  }[layer.type] || '·'

  return (
    <div>
      <div
        className={`layer-item flex items-center gap-1 py-[3px] px-2 cursor-pointer rounded ${layer.selected ? 'selected' : ''}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
      >
        <button
          onClick={() => hasChildren && setExpanded(!expanded)}
          className="w-3 h-3 flex items-center justify-center shrink-0"
        >
          {hasChildren
            ? expanded
              ? <ChevronDown size={10} className="text-gray-500" />
              : <ChevronRight size={10} className="text-gray-500" />
            : <span className="w-3" />
          }
        </button>
        <span className="text-[10px] shrink-0 w-4 text-center" style={{ color: typeColor }}>{typeIcon}</span>
        <span className={`text-xs truncate flex-1 ${layer.selected ? 'text-[#a259ff]' : 'text-gray-300'}`}>
          {layer.name}
        </span>
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 ml-1">
          <button
            onClick={() => setVisible(!visible)}
            className="p-0.5 rounded hover:bg-white/10"
          >
            {visible
              ? <Eye size={10} className="text-gray-500" />
              : <EyeOff size={10} className="text-gray-500" />
            }
          </button>
          <button
            onClick={() => setLocked(!locked)}
            className="p-0.5 rounded hover:bg-white/10"
          >
            {locked
              ? <Lock size={10} className="text-gray-500" />
              : <Unlock size={10} className="text-gray-500 opacity-0" />
            }
          </button>
        </div>
      </div>
      {expanded && hasChildren && layer.children.map(child => (
        <LayerItem key={child.id} layer={child} depth={depth + 1} />
      ))}
    </div>
  )
}

function PropInput({ label, value, unit = '' }) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-[10px] text-gray-500">{label}</label>
      <div className="relative">
        <input
          type="text"
          defaultValue={value}
          className="prop-input pr-5"
        />
        {unit && (
          <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-gray-500">{unit}</span>
        )}
      </div>
    </div>
  )
}

function ColorSwatch({ color, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-5 h-5 rounded border border-[#555]" style={{ background: color }} />
      <input type="text" defaultValue={color} className="prop-input flex-1" />
      <input type="text" defaultValue="100%" className="prop-input w-12" />
    </div>
  )
}

export default function Editor() {
  const navigate = useNavigate()
  const [activeTool, setActiveTool] = useState('select')
  const [activePage, setActivePage] = useState('design')
  const [zoom, setZoom] = useState(100)

  return (
    <div className="flex flex-col h-screen" style={{ background: '#1e1e1e', color: '#e0e0e0' }}>
      {/* Top Bar */}
      <header className="flex items-center h-11 px-3 gap-3 shrink-0 border-b border-[#333]" style={{ background: '#1e1e1e' }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 hover:opacity-80">
          <Layers size={18} color="#a259ff" />
        </button>
        <div className="w-px h-5 bg-[#333]" />
        {/* File name */}
        <span className="text-sm text-gray-300 font-medium">Product Redesign v3</span>
        <ChevronDown size={13} className="text-gray-500" />
        <div className="flex-1" />
        {/* Page tabs */}
        <div className="flex items-center">
          {pages.map(p => (
            <button
              key={p.id}
              onClick={() => { setActivePage(p.id); if (p.id === 'prototype') navigate('/prototype') }}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                activePage === p.id
                  ? 'text-white bg-[#2c2c2c]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2 py-1 rounded border border-[#444] hover:border-[#666]">
            <Share2 size={12} /> Share
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md" style={{ background: '#a259ff', color: '#fff' }}>
            <Play size={11} fill="#fff" /> Present
          </button>
          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold" style={{ background: '#a259ff' }}>
            KL
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Tool Panel (far left, 40px) */}
        <div className="flex flex-col items-center py-2 gap-1 shrink-0 border-r border-[#333]" style={{ width: 40, background: '#252526' }}>
          {TOOLS.map(tool => (
            <button
              key={tool.id}
              title={tool.label}
              onClick={() => setActiveTool(tool.id)}
              className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
            >
              <tool.icon size={16} />
            </button>
          ))}
          <div className="w-5 h-px bg-[#444] my-1" />
          <button className="tool-btn" title="Zoom In" onClick={() => setZoom(z => Math.min(z + 25, 400))}>
            <ZoomIn size={14} />
          </button>
          <button className="tool-btn" title="Zoom Out" onClick={() => setZoom(z => Math.max(z - 25, 25))}>
            <ZoomOut size={14} />
          </button>
        </div>

        {/* Left Sidebar — Layers */}
        <div className="flex flex-col shrink-0 border-r border-[#333]" style={{ width: 220, background: '#252526' }}>
          {/* Layers header */}
          <div className="flex items-center justify-between px-3 h-9 border-b border-[#333]">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Layers</span>
            <div className="flex items-center gap-1">
              <button className="tool-btn w-5 h-5"><Plus size={11} /></button>
            </div>
          </div>
          {/* Layers tree */}
          <div className="flex-1 overflow-y-auto py-1">
            {layerTree.map(layer => (
              <LayerItem key={layer.id} layer={layer} />
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 canvas-bg relative overflow-hidden" style={{ background: '#2c2c2c' }}>
          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 text-xs text-gray-400 bg-[#1e1e1e] rounded px-2 py-1 border border-[#444]">
            {zoom}%
          </div>
          {/* Rulers */}
          <div className="absolute top-0 left-0 right-0 h-5 border-b border-[#444] flex items-center overflow-hidden" style={{ background: '#1e1e1e' }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <span key={i} style={{ minWidth: 40, fontSize: 9, color: '#555', textAlign: 'center' }}>
                {(i - 5) * 100}
              </span>
            ))}
          </div>
          <div className="absolute top-5 left-0 bottom-0 w-5 border-r border-[#444]" style={{ background: '#1e1e1e' }} />

          {/* Artboard container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ paddingLeft: 24, paddingTop: 24 }}>
            <div className="relative" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}>
              {/* Artboard label */}
              <div className="absolute -top-6 left-0 text-[11px] text-gray-400 whitespace-nowrap">
                Desktop — Home
              </div>
              {/* Artboard */}
              <div
                className="relative bg-white shadow-2xl"
                style={{ width: 600, height: 400, borderRadius: 2 }}
              >
                {/* Header bar */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{
                    height: 56,
                    background: 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 20px',
                    gap: 16
                  }}
                >
                  <div style={{ width: 28, height: 28, background: '#a259ff', borderRadius: 6 }} />
                  <div style={{ width: 60, height: 10, background: '#ffffff33', borderRadius: 3 }} />
                  <div style={{ flex: 1 }} />
                  <div style={{ width: 50, height: 10, background: '#ffffff22', borderRadius: 3 }} />
                  <div style={{ width: 50, height: 10, background: '#ffffff22', borderRadius: 3 }} />
                  <div style={{ width: 50, height: 10, background: '#ffffff22', borderRadius: 3 }} />
                  <div style={{ width: 72, height: 28, background: '#a259ff', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 40, height: 8, background: '#ffffff88', borderRadius: 2 }} />
                  </div>
                </div>

                {/* Hero section */}
                <div
                  className="absolute"
                  style={{
                    top: 56, left: 0, right: 0, height: 160,
                    background: 'linear-gradient(135deg, #f8f6ff 0%, #ede8ff 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10
                  }}
                >
                  <div style={{ width: 200, height: 16, background: '#2d1b69', borderRadius: 4, opacity: 0.8 }} />
                  <div style={{ width: 280, height: 10, background: '#7c5cb8', borderRadius: 3, opacity: 0.5 }} />
                  <div style={{ width: 260, height: 10, background: '#7c5cb8', borderRadius: 3, opacity: 0.4 }} />
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    <div style={{ width: 90, height: 30, background: '#a259ff', borderRadius: 6 }} />
                    <div style={{ width: 90, height: 30, background: 'transparent', borderRadius: 6, border: '1.5px solid #a259ff' }} />
                  </div>
                </div>

                {/* Features row */}
                <div
                  className="absolute"
                  style={{ top: 216, left: 20, right: 20, height: 100, display: 'flex', gap: 12 }}
                >
                  {['#667eea', '#f093fb', '#43e97b'].map((c, i) => (
                    <div key={i} style={{
                      flex: 1, background: '#f9f9f9', borderRadius: 8, border: '1px solid #eee',
                      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                      padding: '12px 14px', gap: 6
                    }}>
                      <div style={{ width: 28, height: 28, background: c, borderRadius: 6, opacity: 0.8 }} />
                      <div style={{ width: '70%', height: 8, background: '#333', borderRadius: 2 }} />
                      <div style={{ width: '90%', height: 6, background: '#bbb', borderRadius: 2 }} />
                      <div style={{ width: '60%', height: 6, background: '#ccc', borderRadius: 2 }} />
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: 84,
                    background: '#1a1a2e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 20px'
                  }}
                >
                  <div style={{ width: 60, height: 8, background: '#ffffff33', borderRadius: 3 }} />
                  <div style={{ display: 'flex', gap: 16 }}>
                    {[50, 50, 50, 50].map((w, i) => (
                      <div key={i} style={{ width: w, height: 7, background: '#ffffff22', borderRadius: 3 }} />
                    ))}
                  </div>
                </div>

                {/* Selection ring — on "Primary Button" */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: 275,
                    left: 22,
                    width: 175,
                    height: 100,
                    border: '1.5px solid #a259ff',
                    borderRadius: 8,
                  }}
                >
                  {/* Resize handles */}
                  {[
                    { top: -3.5, left: -3.5 },
                    { top: -3.5, left: '50%', transform: 'translateX(-50%)' },
                    { top: -3.5, right: -3.5 },
                    { top: '50%', left: -3.5, transform: 'translateY(-50%)' },
                    { top: '50%', right: -3.5, transform: 'translateY(-50%)' },
                    { bottom: -3.5, left: -3.5 },
                    { bottom: -3.5, left: '50%', transform: 'translateX(-50%)' },
                    { bottom: -3.5, right: -3.5 },
                  ].map((pos, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-white rounded-sm border border-[#a259ff]"
                      style={pos}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar — Properties */}
        <div className="flex flex-col shrink-0 border-l border-[#333]" style={{ width: 240, background: '#252526' }}>
          {/* Design / Prototype tabs */}
          <div className="flex border-b border-[#333]">
            {['Design', 'Prototype', 'Inspect'].map(tab => (
              <button
                key={tab}
                className={`flex-1 text-xs py-2.5 font-medium transition-colors ${
                  tab === 'Design'
                    ? 'text-white border-b-2 border-[#a259ff] -mb-px'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Alignment */}
            <div className="p-3 border-b border-[#333]">
              <div className="grid grid-cols-6 gap-1">
                {[AlignLeft, AlignCenter, AlignRight, AlignStartVertical, AlignCenterVertical, AlignEndVertical].map((Icon, i) => (
                  <button key={i} className="tool-btn w-full h-7">
                    <Icon size={13} />
                  </button>
                ))}
              </div>
            </div>

            {/* Position & Size */}
            <div className="p-3 border-b border-[#333] space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <PropInput label="X" value="24" unit="px" />
                <PropInput label="Y" value="216" unit="px" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <PropInput label="W" value="175" unit="px" />
                <PropInput label="H" value="100" unit="px" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <PropInput label="R" value="0" unit="°" />
                <PropInput label="Radius" value="8" unit="px" />
              </div>
            </div>

            {/* Fill */}
            <div className="p-3 border-b border-[#333]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Fill</span>
                <button className="tool-btn w-5 h-5"><Plus size={11} /></button>
              </div>
              <ColorSwatch color="#F9F9F9" />
            </div>

            {/* Stroke */}
            <div className="p-3 border-b border-[#333]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Stroke</span>
                <button className="tool-btn w-5 h-5"><Plus size={11} /></button>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded border border-[#555] bg-transparent border-2" style={{ borderColor: '#EEEEEE' }} />
                <input type="text" defaultValue="#EEEEEE" className="prop-input flex-1" />
                <input type="text" defaultValue="1" className="prop-input w-10" />
              </div>
            </div>

            {/* Effects */}
            <div className="p-3 border-b border-[#333]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Effects</span>
                <button className="tool-btn w-5 h-5"><Plus size={11} /></button>
              </div>
              <div className="text-xs text-gray-600 italic">No effects</div>
            </div>

            {/* Export */}
            <div className="p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Export</span>
                <button className="tool-btn w-5 h-5"><Plus size={11} /></button>
              </div>
              <div className="text-xs text-gray-600 italic">No export settings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
