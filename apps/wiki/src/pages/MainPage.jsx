import { Clock, Users, FileText, Edit3, Star, ChevronRight, TrendingUp } from 'lucide-react'
import { wikiMeta, articles, recentChanges, didYouKnow, discussions } from '../data/wiki.js'

export default function MainPage() {
  return (
    <div>
      {/* Hero Banner */}
      <div
        style={{ background: 'linear-gradient(135deg, #0d1829 0%, #1b2a4a 50%, #0a3a3a 100%)' }}
        className="relative overflow-hidden"
      >
        {/* star field bg */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
                height: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1,
                top: `${(i * 37 + 7) % 100}%`,
                left: `${(i * 53 + 13) % 100}%`,
                opacity: 0.4 + (i % 4) * 0.15,
              }}
            />
          ))}
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sm text-cyan-300 mb-4">
            <Star size={12} /> Fan Wiki
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Welcome to the Starfield Chronicles Wiki
          </h1>
          <p className="text-lg text-cyan-200/80 mb-8">
            The definitive fan-maintained encyclopedia for the Starfield Chronicles universe
          </p>
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: FileText, label: 'Articles', value: wikiMeta.articleCount.toLocaleString() },
              { icon: Users, label: 'Community Members', value: wikiMeta.userCount.toLocaleString() },
              { icon: Edit3, label: 'Total Edits', value: wikiMeta.editCount.toLocaleString() },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-6 py-3">
                <div className="flex items-center gap-2 text-cyan-300 mb-1">
                  <Icon size={16} />
                  <span className="text-2xl font-bold text-white">{value}</span>
                </div>
                <span className="text-white/60 text-xs">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content — 2-column layout */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT: Main column (2/3) */}
          <div className="lg:col-span-2 space-y-6">

            {/* Featured Article */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 flex items-center gap-2 border-b border-white/10"
              >
                <Star size={14} style={{ color: '#00d6d6' }} />
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Featured Article</span>
              </div>
              <div className="p-5 flex gap-5">
                <div
                  style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #00d6d6 100%)' }}
                  className="w-24 h-28 rounded-lg flex-shrink-0 flex items-center justify-center text-white/40 text-xs text-center"
                >
                  Commander<br />Astra Voss
                </div>
                <div>
                  <h2 className="text-white text-xl font-bold mb-2">Commander Astra Voss</h2>
                  <p className="text-gray-300 text-sm leading-relaxed mb-3">
                    Commander Astra Voss is the central protagonist of the Starfield Chronicles series. Born aboard the colony ship <span style={{ color: '#1ea7c5' }} className="cursor-pointer hover:underline">Ariadne's Thread</span>, she rose through the ranks of the <span style={{ color: '#1ea7c5' }} className="cursor-pointer hover:underline">Nebula Compact</span> to become one of its most decorated officers. Her tactical brilliance during <span style={{ color: '#1ea7c5' }} className="cursor-pointer hover:underline">The Void Breach</span> incident earned her field promotion and the loyalty of her crew.
                  </p>
                  <a
                    href="#/article"
                    style={{ color: '#00d6d6' }}
                    className="text-sm font-medium hover:underline flex items-center gap-1"
                  >
                    Read full article <ChevronRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Did You Know */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 border-b border-white/10"
              >
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Did You Know?</span>
              </div>
              <div className="p-5 space-y-4">
                {didYouKnow.map((fact, i) => (
                  <div key={i} className="flex gap-3">
                    <div
                      style={{ background: '#00d6d6', minWidth: 24, height: 24 }}
                      className="rounded-full flex items-center justify-center text-black text-xs font-bold flex-shrink-0 mt-0.5"
                    >
                      {i + 1}
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Changes */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 flex items-center justify-between border-b border-white/10"
              >
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: '#00d6d6' }} />
                  <span className="text-white font-semibold text-sm uppercase tracking-wider">Recent Changes</span>
                </div>
                <a href="#" style={{ color: '#00d6d6' }} className="text-xs hover:underline">View all →</a>
              </div>
              <div className="divide-y divide-white/5">
                {recentChanges.map((change, i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3">
                    <span
                      className="text-xs font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0"
                      style={{
                        background: change.type === 'new' ? 'rgba(0,214,214,0.15)' : 'rgba(255,200,50,0.1)',
                        color: change.type === 'new' ? '#00d6d6' : '#fbbf24',
                        border: `1px solid ${change.type === 'new' ? 'rgba(0,214,214,0.3)' : 'rgba(251,191,36,0.3)'}`,
                      }}
                    >
                      {change.type === 'new' ? 'N' : 'E'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span style={{ color: '#1ea7c5' }} className="text-sm font-medium hover:underline cursor-pointer">
                        {change.article}
                      </span>
                      <span className="text-gray-500 text-xs ml-2">by {change.editor}</span>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span
                        className="text-xs font-mono"
                        style={{ color: change.bytes.startsWith('+') ? '#4ade80' : '#f87171' }}
                      >
                        {change.bytes}
                      </span>
                      <div className="text-gray-600 text-xs">{change.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Sidebar (1/3) */}
          <div className="space-y-6">

            {/* Community Stats */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 border-b border-white/10"
              >
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Community</span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Active users today</span>
                  <span className="text-white font-semibold">347</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Edits this week</span>
                  <span className="text-white font-semibold">1,203</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">New articles (30d)</span>
                  <span className="text-white font-semibold">42</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Open discussion posts</span>
                  <span className="text-white font-semibold">128</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/10">
                  <a
                    href="#/discussions"
                    style={{ background: '#00d6d6' }}
                    className="block text-center text-black font-semibold text-sm rounded-lg py-2 hover:opacity-90 transition-opacity"
                  >
                    Join Discussions
                  </a>
                </div>
              </div>
            </div>

            {/* Hot Discussions */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 flex items-center gap-2 border-b border-white/10"
              >
                <TrendingUp size={14} style={{ color: '#00d6d6' }} />
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Hot Discussions</span>
              </div>
              <div className="divide-y divide-white/5">
                {discussions.filter(d => d.hot).slice(0, 3).map(post => (
                  <div key={post.id} className="px-5 py-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: post.avatarColor }}
                      >
                        {post.avatar[0]}
                      </div>
                      <span className="text-gray-400 text-xs">{post.user}</span>
                    </div>
                    <p style={{ color: '#1ea7c5' }} className="text-sm font-medium hover:underline cursor-pointer leading-snug">
                      {post.title}
                    </p>
                    <div className="flex gap-3 mt-1 text-gray-500 text-xs">
                      <span>▲ {post.votes}</span>
                      <span>💬 {post.comments}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Browse Articles */}
            <div className="rounded-xl overflow-hidden border border-white/10 bg-[#202030]">
              <div
                style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #0d3a4a 100%)' }}
                className="px-5 py-3 border-b border-white/10"
              >
                <span className="text-white font-semibold text-sm uppercase tracking-wider">Browse</span>
              </div>
              <div className="p-4 space-y-1.5">
                {['Characters', 'Locations', 'Events', 'Factions', 'Technology', 'Episodes'].map(cat => (
                  <a
                    key={cat}
                    href="#/category"
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors"
                  >
                    <span style={{ color: '#1ea7c5' }}>{cat}</span>
                    <ChevronRight size={14} className="text-gray-600" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
