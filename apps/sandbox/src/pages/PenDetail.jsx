import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Eye, MessageSquare, GitFork, Code2, Share2, Bookmark } from 'lucide-react'
import Header from '../components/Header.jsx'
import { pens, htmlCode, cssCode, jsCode } from '../data/pens.js'

const pen = pens[0]

/* ---- Syntax highlighter (same as editor, simplified) ---- */
function highlight(code, lang) {
  if (lang === 'js') {
    const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'new', 'this', 'true', 'false', 'null', 'addEventListener', 'document', 'getElementById', 'setTimeout', 'async', 'await']
    let c = code
    c = c.replace(/(\/\/.*$)/gm, '<span style="color:#6a9955">$1</span>')
    c = c.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#ce9178">$1</span>')
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
    c = c.replace(kwRegex, '<span style="color:#569cd6">$1</span>')
    c = c.replace(/\b(\w+)(\()/g, '<span style="color:#dcdcaa">$1</span>$2')
    c = c.replace(/\b(\d+)\b/g, '<span style="color:#b5cea8">$1</span>')
    return c
  }
  if (lang === 'css') {
    let c = code
    c = c.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color:#6a9955">$1</span>')
    c = c.replace(/^([.#\w*:,\[\]="'\s-]+?)(\s*\{)/gm, '<span style="color:#dcdcaa">$1</span><span style="color:#f8f8f2">$2</span>')
    c = c.replace(/(#[0-9a-fA-F]{3,8})/g, '<span style="color:#ce9178">$1</span>')
    c = c.replace(/(\d+(?:px|em|rem|vh|vw|%|ms|s))/g, '<span style="color:#b5cea8">$1</span>')
    return c
  }
  // html
  let c = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  c = c.replace(/(&lt;\/?)([\w]+)/g, '<span style="color:#569cd6">$1$2</span>')
  c = c.replace(/(&gt;|\/&gt;)/g, '<span style="color:#569cd6">$1</span>')
  return c
}

const CODE_TABS = [
  { label: 'HTML', code: htmlCode, lang: 'html' },
  { label: 'CSS', code: cssCode, lang: 'css' },
  { label: 'JS', code: jsCode, lang: 'js' },
]

export default function PenDetail() {
  const [activeTab, setActiveTab] = useState('HTML')
  const [liked, setLiked] = useState(false)
  const [hearts, setHearts] = useState(pen.hearts)
  const [bookmarked, setBookmarked] = useState(false)

  function toggleLike() {
    setLiked(v => !v)
    setHearts(h => liked ? h - 1 : h + 1)
  }

  const active = CODE_TABS.find(t => t.label === activeTab)

  return (
    <div className="min-h-screen" style={{ background: '#1e1f26' }}>
      <Header />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Title row */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold mb-1" style={{ color: '#f8f8f2' }}>{pen.title}</h1>
            <div className="flex items-center gap-2">
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: pen.avatarColor, color: '#0a0f0d', fontSize: 10 }}
              >
                {pen.avatar}
              </div>
              <span className="text-sm" style={{ color: '#6272a4' }}>{pen.author}</span>
              <span style={{ color: '#3d3f52' }}>·</span>
              {pen.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: '#282a36', color: '#6272a4', border: '1px solid #3d3f52' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookmarked(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
              style={{
                background: '#282a36',
                border: '1px solid #3d3f52',
                color: bookmarked ? '#f1fa8c' : '#6272a4',
              }}
            >
              <Bookmark size={13} fill={bookmarked ? '#f1fa8c' : 'none'} />
              Save
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
              style={{ background: '#282a36', border: '1px solid #3d3f52', color: '#6272a4' }}
            >
              <Share2 size={13} />
              Share
            </button>
            <Link
              to="/editor"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-sm font-semibold no-underline"
              style={{ background: '#47cf73', color: '#0a1f12' }}
            >
              <GitFork size={13} />
              Fork
            </Link>
          </div>
        </div>

        {/* Preview */}
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{ border: '1px solid #3d3f52' }}
        >
          <div
            className="flex items-center justify-between px-4 py-2"
            style={{ background: '#282a36', borderBottom: '1px solid #3d3f52' }}
          >
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: '#6272a4' }}>Live Preview</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5555' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffb86c' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#50fa7b' }} />
            </div>
          </div>
          <div
            className="flex items-center justify-center"
            style={{ background: '#ffffff', minHeight: 300 }}
          >
            <div style={{
              background: '#0f172a',
              borderRadius: 16,
              padding: 40,
              textAlign: 'center',
              boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
              minWidth: 320,
            }}>
              <p style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 600, marginBottom: 20 }}>
                Click Counter
              </p>
              <div style={{
                background: '#0a0f1a',
                borderRadius: 12,
                padding: '16px 36px',
                marginBottom: 20,
                border: '1px solid #334155',
              }}>
                <span style={{ fontSize: '3.5rem', fontWeight: 700, color: '#47cf73', fontFamily: 'JetBrains Mono, monospace' }}>0</span>
              </div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <button style={{
                  flex: 1, padding: '10px 16px', borderRadius: 8, fontSize: 13,
                  fontWeight: 600, background: 'transparent', color: '#94a3b8',
                  border: '1px solid #334155', cursor: 'pointer',
                }}>
                  − Decrease
                </button>
                <button style={{
                  flex: 1, padding: '10px 16px', borderRadius: 8, fontSize: 13,
                  fontWeight: 600, background: '#47cf73', color: '#0a0f0d',
                  border: 'none', cursor: 'pointer',
                }}>
                  + Increase
                </button>
              </div>
              <button style={{
                width: '100%', padding: '8px', background: 'transparent',
                color: '#64748b', border: '1px solid #1e293b', borderRadius: 8,
                fontSize: 12, cursor: 'pointer',
              }}>
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Engagement */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={toggleLike}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all"
            style={{
              background: liked ? '#47cf7322' : '#282a36',
              border: `1px solid ${liked ? '#47cf73' : '#3d3f52'}`,
              color: liked ? '#47cf73' : '#6272a4',
            }}
          >
            <Heart size={14} fill={liked ? '#47cf73' : 'none'} />
            {hearts.toLocaleString()} Hearts
          </button>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#6272a4' }}>
            <Eye size={14} />
            {pen.views.toLocaleString()} Views
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: '#6272a4' }}>
            <MessageSquare size={14} />
            24 Comments
          </span>
        </div>

        {/* Code tabs */}
        <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #3d3f52' }}>
          <div
            className="flex items-center gap-1 px-3 py-2"
            style={{ background: '#282a36', borderBottom: '1px solid #3d3f52' }}
          >
            <Code2 size={13} style={{ color: '#6272a4' }} />
            {CODE_TABS.map(t => (
              <button
                key={t.label}
                onClick={() => setActiveTab(t.label)}
                className="px-3 py-1 rounded text-xs font-bold tracking-widest uppercase transition-all"
                style={{
                  background: activeTab === t.label ? '#44475a' : 'transparent',
                  color: activeTab === t.label ? '#f8f8f2' : '#6272a4',
                  border: 'none',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="overflow-auto" style={{ background: '#1e1f26', maxHeight: 360 }}>
            <div className="py-2">
              {active.code.split('\n').map((line, i) => (
                <div key={i} className="flex hover:bg-white/5">
                  <div
                    className="shrink-0 select-none text-right pr-4 py-px"
                    style={{ width: 40, color: '#495670', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', lineHeight: '20px' }}
                  >
                    {i + 1}
                  </div>
                  <div
                    className="flex-1 pr-4 py-px"
                    style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', lineHeight: '20px', color: '#d4d4d4', whiteSpace: 'pre' }}
                    dangerouslySetInnerHTML={{ __html: highlight(line, active.lang) || ' ' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Author card */}
        <div
          className="mt-6 rounded-xl p-5 flex items-center justify-between"
          style={{ background: '#282a36', border: '1px solid #3d3f52' }}
        >
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold"
              style={{ background: pen.avatarColor, color: '#0a0f0d', fontSize: 14 }}
            >
              {pen.avatar}
            </div>
            <div>
              <p className="font-semibold text-sm mb-0.5" style={{ color: '#f8f8f2' }}>{pen.author}</p>
              <p className="text-xs" style={{ color: '#6272a4' }}>Full-stack developer · 42 pens</p>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded text-sm font-semibold"
            style={{ background: '#47cf7322', color: '#47cf73', border: '1px solid #47cf7355' }}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}
