import { useState } from 'react'
import { MessageCircle, ThumbsUp, Plus, Flame, Clock, BarChart2, Share2, Shield } from 'lucide-react'
import { discussions } from '../data/wiki.js'

const TABS = [
  { id: 'hot', label: 'Hot', icon: Flame },
  { id: 'latest', label: 'Latest', icon: Clock },
  { id: 'polls', label: 'Polls', icon: BarChart2 },
  { id: 'share', label: 'Share', icon: Share2 },
]

const TAG_COLORS = {
  Theory: { bg: 'rgba(124,58,237,0.15)', color: '#a78bfa', border: 'rgba(124,58,237,0.3)' },
  Discussion: { bg: 'rgba(30,167,197,0.12)', color: '#1ea7c5', border: 'rgba(30,167,197,0.3)' },
  Poll: { bg: 'rgba(245,158,11,0.12)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  'Fan Art': { bg: 'rgba(236,72,153,0.12)', color: '#f472b6', border: 'rgba(236,72,153,0.3)' },
  News: { bg: 'rgba(34,197,94,0.12)', color: '#4ade80', border: 'rgba(34,197,94,0.3)' },
  Help: { bg: 'rgba(251,191,36,0.12)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  Community: { bg: 'rgba(0,214,214,0.12)', color: '#00d6d6', border: 'rgba(0,214,214,0.3)' },
}

export default function DiscussionsPage() {
  const [activeTab, setActiveTab] = useState('hot')

  const visiblePosts = activeTab === 'polls'
    ? discussions.filter(d => d.tag === 'Poll')
    : activeTab === 'share'
    ? discussions.filter(d => d.tag === 'Fan Art' || d.tag === 'Community')
    : activeTab === 'latest'
    ? [...discussions].reverse()
    : discussions

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Discussions</h1>
            <p className="text-gray-400 text-sm mt-0.5">
              Starfield Chronicles community — {discussions.length} active threads
            </p>
          </div>
          <button
            style={{ background: '#00d6d6' }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-black font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> New Post
          </button>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-6 border-b border-white/10 pb-0">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium transition-all border-b-2 -mb-px"
              style={{
                color: activeTab === id ? '#00d6d6' : '#9ca3af',
                borderBottomColor: activeTab === id ? '#00d6d6' : 'transparent',
              }}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Posts */}
        <div className="space-y-3">
          {visiblePosts.map(post => (
            <div
              key={post.id}
              className="rounded-xl border border-white/10 bg-[#202030] hover:border-white/20 transition-all cursor-pointer group"
            >
              <div className="p-5">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ background: post.avatarColor }}
                  >
                    {post.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-white font-semibold text-sm">{post.user}</span>
                      <div
                        className="flex items-center gap-1 text-xs px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(0,214,214,0.1)', color: '#00d6d6', border: '1px solid rgba(0,214,214,0.25)' }}
                      >
                        <Shield size={9} />
                        Fan
                      </div>
                      <span className="text-gray-500 text-xs">{post.time}</span>
                      {/* Tag */}
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{
                          background: TAG_COLORS[post.tag]?.bg || 'rgba(255,255,255,0.05)',
                          color: TAG_COLORS[post.tag]?.color || '#9ca3af',
                          border: `1px solid ${TAG_COLORS[post.tag]?.border || 'rgba(255,255,255,0.1)'}`,
                        }}
                      >
                        {post.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="text-white font-semibold text-base mb-1.5 group-hover:text-cyan-300 transition-colors leading-snug"
                    >
                      {post.title}
                    </h3>

                    {/* Preview */}
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                      {post.preview}
                    </p>

                    {/* Actions row */}
                    <div className="flex items-center gap-5 mt-3">
                      <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                      >
                        <ThumbsUp size={13} />
                        <span>{post.votes}</span>
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors"
                      >
                        <MessageCircle size={13} />
                        <span>{post.comments} comments</span>
                      </button>
                      <button
                        className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors ml-auto"
                      >
                        <Share2 size={13} />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {visiblePosts.length > 0 && (
          <div className="mt-6 text-center">
            <button
              className="px-6 py-2 rounded-lg text-sm font-medium border border-white/15 text-gray-400 hover:border-white/30 hover:text-white transition-all"
            >
              Load more posts
            </button>
          </div>
        )}

        {visiblePosts.length === 0 && (
          <div className="text-center py-12 text-gray-600">
            <MessageCircle size={36} className="mx-auto mb-3 opacity-30" />
            <p>No posts in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
