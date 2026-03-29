import { useNavigate } from 'react-router-dom'
import { Heart, Eye } from 'lucide-react'

function PenPreview({ pen }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        height: 160,
        background: `linear-gradient(135deg, ${pen.gradient[0]}, ${pen.gradient[1]})`,
      }}
    >
      {/* Simulated code/UI elements */}
      <div className="absolute inset-0 p-4 flex flex-col gap-2">
        {/* Top shape row */}
        <div className="flex gap-2 items-center">
          <div
            className="rounded"
            style={{ width: 60, height: 12, background: pen.shapeColor, opacity: 0.9 }}
          />
          <div
            className="rounded"
            style={{ width: 40, height: 12, background: pen.shapeColor2, opacity: 0.6 }}
          />
        </div>
        {/* Center feature */}
        <div className="flex-1 flex items-center justify-center">
          <div
            className="rounded-xl flex items-center justify-center font-mono font-bold"
            style={{
              width: 72,
              height: 72,
              background: `${pen.shapeColor}22`,
              border: `2px solid ${pen.shapeColor}66`,
              color: pen.shapeColor,
              fontSize: 28,
            }}
          >
            0
          </div>
        </div>
        {/* Bottom bar lines */}
        <div className="flex gap-1.5">
          <div className="rounded" style={{ width: '40%', height: 8, background: '#ffffff20' }} />
          <div className="rounded" style={{ width: '30%', height: 8, background: `${pen.shapeColor}44` }} />
        </div>
        <div className="flex gap-1.5">
          <div className="rounded" style={{ width: '55%', height: 8, background: '#ffffff15' }} />
          <div className="rounded" style={{ width: '20%', height: 8, background: `${pen.shapeColor2}44` }} />
        </div>
      </div>
      {/* Overlay gradient */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 32, background: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)' }}
      />
    </div>
  )
}

export default function PenCard({ pen }) {
  const navigate = useNavigate()

  return (
    <div
      className="rounded-lg overflow-hidden cursor-pointer transition-transform"
      style={{ background: '#282a36', border: '1px solid #3d3f52' }}
      onClick={() => navigate('/pen')}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <PenPreview pen={pen} />
      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold mb-2" style={{ color: '#f8f8f2' }}>{pen.title}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: pen.avatarColor, color: '#0a0f0d', fontSize: 9 }}
            >
              {pen.avatar}
            </div>
            <span className="text-xs" style={{ color: '#6272a4' }}>{pen.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs" style={{ color: '#6272a4' }}>
              <Heart size={11} />
              {pen.hearts >= 1000 ? `${(pen.hearts / 1000).toFixed(1)}k` : pen.hearts}
            </span>
            <span className="flex items-center gap-1 text-xs" style={{ color: '#6272a4' }}>
              <Eye size={11} />
              {pen.views >= 1000 ? `${(pen.views / 1000).toFixed(0)}k` : pen.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
