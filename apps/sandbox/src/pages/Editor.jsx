import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code2, Save, Settings, GitFork, AlignLeft, Eye, ChevronDown, Terminal, X } from 'lucide-react'
import { htmlCode, cssCode, jsCode } from '../data/pens.js'

/* ---- Syntax Highlighting ---- */
function tokenizeHTML(code) {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    const parts = []
    let remaining = line
    const tagPattern = /(<\/?[\w]+|>|\/?>)/g
    const attrPattern = /([\w-]+=)/g
    const stringPattern = /(".*?"|'.*?')/g

    // Simple pass: color < > tags, attributes, strings
    let colored = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Re-color tags
    colored = colored.replace(/(&lt;\/?)([\w]+)/g, '<span style="color:#569cd6">$1$2</span>')
    colored = colored.replace(/(&gt;|\/&gt;)/g, '<span style="color:#569cd6">$1</span>')
    colored = colored.replace(/([\w-]+=)(&quot;|")/g, '<span style="color:#9cdcfe">$1</span><span style="color:#ce9178">$2</span>')
    colored = colored.replace(/(&quot;[^&]*&quot;)/g, '<span style="color:#ce9178">$1</span>')
    colored = colored.replace(/(<!--.*?-->)/g, '<span style="color:#6a9955">$1</span>')

    return { line: colored, num: i + 1 }
  })
}

function tokenizeCSS(code) {
  const lines = code.split('\n')
  return lines.map((line, i) => {
    let colored = line
    // Comments
    colored = colored.replace(/(\/\*.*?\*\/)/g, '<span style="color:#6a9955">$1</span>')
    // Selectors (before {)
    colored = colored.replace(/^([.#\w*:,\s\[\]="'-]+)(\s*\{)/, '<span style="color:#dcdcaa">$1</span><span style="color:#f8f8f2">$2</span>')
    // Properties
    colored = colored.replace(/^\s*([\w-]+)\s*(:)/, '  <span style="color:#9cdcfe">$1</span><span style="color:#f8f8f2">$2</span>')
    // Values with colors/units
    colored = colored.replace(/(#[0-9a-fA-F]{3,8})/g, '<span style="color:#ce9178">$1</span>')
    colored = colored.replace(/(\d+(?:px|em|rem|vh|vw|%|ms|s))/g, '<span style="color:#b5cea8">$1</span>')
    // Strings
    colored = colored.replace(/('.*?'|".*?")/g, '<span style="color:#ce9178">$1</span>')
    return { line: colored, num: i + 1 }
  })
}

function tokenizeJS(code) {
  const lines = code.split('\n')
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'new', 'this', 'true', 'false', 'null', 'undefined', 'typeof', 'class', 'import', 'export', 'default', 'async', 'await', 'from', 'of', 'in']
  return lines.map((line, i) => {
    let colored = line
    // Comments
    if (colored.trim().startsWith('//')) {
      return { line: `<span style="color:#6a9955">${colored}</span>`, num: i + 1 }
    }
    colored = colored.replace(/(\/\/.*$)/g, '<span style="color:#6a9955">$1</span>')
    // Strings
    colored = colored.replace(/('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#ce9178">$1</span>')
    // Keywords
    const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g')
    colored = colored.replace(kwRegex, '<span style="color:#569cd6">$1</span>')
    // Function calls
    colored = colored.replace(/(\w+)(\()/g, '<span style="color:#dcdcaa">$1</span>$2')
    // Numbers
    colored = colored.replace(/\b(\d+)\b/g, '<span style="color:#b5cea8">$1</span>')
    return { line: colored, num: i + 1 }
  })
}

function CodePanel({ label, lines }) {
  return (
    <div className="flex flex-col h-full overflow-hidden" style={{ borderRight: '1px solid #3d3f52' }}>
      {/* Panel header */}
      <div
        className="flex items-center gap-2 px-3 py-2 shrink-0"
        style={{ background: '#282a36', borderBottom: '1px solid #3d3f52' }}
      >
        <span
          className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
          style={{ color: '#f8f8f2', background: '#44475a' }}
        >
          {label}
        </span>
        <div className="flex-1" />
        <ChevronDown size={12} style={{ color: '#6272a4' }} />
      </div>
      {/* Code area */}
      <div className="flex-1 overflow-auto" style={{ background: '#1e1f26' }}>
        <div className="py-2">
          {lines.map(({ line, num }) => (
            <div key={num} className="flex hover:bg-white/5">
              <div
                className="shrink-0 select-none text-right pr-4 py-px"
                style={{ width: 36, color: '#495670', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', lineHeight: '20px' }}
              >
                {num}
              </div>
              <div
                className="flex-1 pr-4 py-px"
                style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', lineHeight: '20px', color: '#d4d4d4', whiteSpace: 'pre' }}
                dangerouslySetInnerHTML={{ __html: line || ' ' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Editor() {
  const [title, setTitle] = useState('Untitled')
  const [showConsole, setShowConsole] = useState(false)
  const [saved, setSaved] = useState(false)

  const htmlLines = tokenizeHTML(htmlCode)
  const cssLines = tokenizeCSS(cssCode)
  const jsLines = tokenizeJS(jsCode)

  function handleSave() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: '#1e1f26' }}>
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 h-12 shrink-0"
        style={{ background: '#1e1f26', borderBottom: '1px solid #2d2f3d' }}
      >
        <Link to="/" className="flex items-center gap-1.5 no-underline shrink-0">
          <Code2 size={18} color="#47cf73" />
          <span className="font-semibold text-sm" style={{ color: '#f8f8f2' }}>Sandbox</span>
        </Link>
        <div style={{ width: 1, height: 20, background: '#2d2f3d' }} />

        {/* Title */}
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="bg-transparent outline-none text-sm font-medium"
          style={{ color: '#f8f8f2', minWidth: 80 }}
        />

        <div className="flex-1" />

        {/* Toolbar */}
        <div className="flex items-center gap-1">
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
            style={{ color: '#6272a4' }}
            title="Settings"
          >
            <Settings size={13} />
          </button>
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
            style={{ color: '#6272a4' }}
            title="Fork"
          >
            <GitFork size={13} />
            <span>Fork</span>
          </button>
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
            style={{ color: '#6272a4' }}
            title="Format"
          >
            <AlignLeft size={13} />
            <span>Format</span>
          </button>
          <button
            className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs"
            style={{ color: '#6272a4' }}
            title="Toggle Preview"
          >
            <Eye size={13} />
            <span>Preview</span>
          </button>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-all"
          style={{ background: saved ? '#3ab562' : '#47cf73', color: '#0a1f12' }}
        >
          <Save size={12} />
          {saved ? 'Saved!' : 'Save'}
        </button>
      </div>

      {/* Editor panels */}
      <div
        className="flex shrink-0"
        style={{ height: 340, borderBottom: '1px solid #3d3f52' }}
      >
        <div style={{ flex: 1 }}>
          <CodePanel label="HTML" lines={htmlLines} />
        </div>
        <div style={{ flex: 1 }}>
          <CodePanel label="CSS" lines={cssLines} />
        </div>
        <div style={{ flex: 1, borderRight: 'none' }}>
          <CodePanel label="JS" lines={jsLines} />
        </div>
      </div>

      {/* Preview panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Preview header */}
        <div
          className="flex items-center gap-3 px-3 py-2 shrink-0"
          style={{ background: '#282a36', borderBottom: '1px solid #3d3f52' }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase px-2 py-0.5 rounded"
            style={{ color: '#f8f8f2', background: '#44475a' }}
          >
            Result
          </span>
          <div className="flex-1" />
          <button
            onClick={() => setShowConsole(v => !v)}
            className="flex items-center gap-1.5 text-xs px-2 py-0.5 rounded"
            style={{ color: '#6272a4', background: showConsole ? '#44475a' : 'transparent' }}
          >
            <Terminal size={12} />
            Console
          </button>
        </div>

        {/* Preview iframe simulation */}
        <div className="flex-1 relative overflow-hidden" style={{ background: '#ffffff' }}>
          {/* Simulated running result */}
          <div className="h-full flex items-center justify-center">
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

          {/* Console panel */}
          {showConsole && (
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{ background: '#1e1f26', borderTop: '1px solid #3d3f52', height: 100 }}
            >
              <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: '1px solid #3d3f52' }}>
                <span className="text-xs font-semibold" style={{ color: '#6272a4' }}>Console</span>
                <X size={12} style={{ color: '#6272a4', cursor: 'pointer' }} onClick={() => setShowConsole(false)} />
              </div>
              <div className="px-3 py-2">
                <p className="text-xs font-mono" style={{ color: '#6a9955' }}>
                  {'>'} Counter initialized!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
