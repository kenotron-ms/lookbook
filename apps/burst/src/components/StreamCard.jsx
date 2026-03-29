import { Link } from 'react-router-dom'
import { formatViewers } from '../data/streams.js'

export default function StreamCard({ stream }) {
  const { title, channel, game, viewers, gradient, avatar, avatarColor, tags } = stream

  return (
    <Link
      to="/watch"
      style={{ textDecoration: 'none' }}
      className="group block"
    >
      {/* Thumbnail */}
      <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: '16/9' }}>
        <div
          className="absolute inset-0 transition-transform duration-200 group-hover:scale-105"
          style={{ background: gradient }}
        />

        {/* Simulated stream noise overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
        />

        {/* LIVE badge */}
        <div
          className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-xs font-bold text-white tracking-wide"
          style={{ background: '#e91916' }}
        >
          LIVE
        </div>

        {/* Viewer count */}
        <div
          className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium text-white"
          style={{ background: 'rgba(0,0,0,0.7)' }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: '#e91916' }}
          />
          {formatViewers(viewers)}
        </div>

        {/* Channel avatar (overlapping) */}
        <div className="absolute -bottom-3 left-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
            style={{ background: avatarColor, borderColor: '#0e0e10' }}
          >
            {avatar}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="pt-5 pb-2 px-0.5">
        <div className="flex gap-2">
          <div className="flex-1 min-w-0">
            <div
              className="text-sm font-semibold truncate leading-tight"
              style={{ color: '#efeff1' }}
            >
              {title}
            </div>
            <div
              className="text-xs mt-0.5 truncate"
              style={{ color: '#adadb8' }}
            >
              {channel}
            </div>
            <div
              className="text-xs mt-0.5 truncate"
              style={{ color: '#9146ff' }}
            >
              {game}
            </div>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded-full text-xs"
                    style={{ background: '#26262c', color: '#adadb8' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
