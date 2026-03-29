import { useState } from 'react'
import { Edit3, Clock, User, ChevronDown, ChevronRight, Tag } from 'lucide-react'
import { characterArticle } from '../data/wiki.js'

export default function ArticlePage() {
  const [tocOpen, setTocOpen] = useState(true)
  const article = characterArticle

  return (
    <div className="article-body min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <a href="#" style={{ color: '#1ea7c5' }} className="hover:underline">Main Page</a>
          <ChevronRight size={12} />
          <a href="#/category" style={{ color: '#1ea7c5' }} className="hover:underline">Characters</a>
          <ChevronRight size={12} />
          <span className="text-gray-700">Commander Astra Voss</span>
        </div>

        {/* Article title row */}
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
          <div className="flex items-center gap-2 flex-shrink-0 ml-4">
            <button
              style={{ borderColor: '#1ea7c5', color: '#1ea7c5' }}
              className="flex items-center gap-1.5 border rounded px-3 py-1.5 text-sm hover:bg-blue-50 transition-colors"
            >
              <Edit3 size={13} /> Edit
            </button>
          </div>
        </div>

        {/* Main article layout */}
        <div className="flex gap-6">
          {/* LEFT: TOC + body */}
          <div className="flex-1 min-w-0">
            {/* Table of Contents */}
            <div className="border border-gray-300 bg-[#f8f9fa] rounded p-3 mb-5 inline-block min-w-[220px]">
              <button
                onClick={() => setTocOpen(o => !o)}
                className="flex items-center gap-2 font-bold text-gray-800 text-sm w-full"
              >
                <span>Contents</span>
                <span
                  style={{ color: '#1ea7c5' }}
                  className="font-normal text-xs ml-1 hover:underline cursor-pointer"
                >
                  [{tocOpen ? 'hide' : 'show'}]
                </span>
              </button>
              {tocOpen && (
                <ol className="mt-2 space-y-1">
                  {article.toc.map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        style={{ color: '#1ea7c5' }}
                        className="text-sm hover:underline"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a href="#references" style={{ color: '#1ea7c5' }} className="text-sm hover:underline">
                      5. References
                    </a>
                  </li>
                </ol>
              )}
            </div>

            {/* INFOBOX (floated right, inside article body flow) */}
            <div className="infobox float-right">
              <div className="infobox-header">{article.infobox.name}</div>
              <div className="infobox-portrait">
                <span className="text-center leading-tight px-2">Character Portrait</span>
              </div>
              <table>
                <tbody>
                  {[
                    ['Name', article.infobox.name],
                    ['Age', article.infobox.age],
                    ['Species', article.infobox.species],
                    ['Rank', article.infobox.rank],
                    ['Affiliation', article.infobox.affiliation],
                    ['Status', article.infobox.status],
                    ['First Appearance', article.infobox.firstAppearance],
                    ['Portrayed By', article.infobox.portrayedBy],
                  ].map(([key, val]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td style={{ color: '#1ea7c5', fontWeight: 500 }}>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Article body */}
            <div className="article-content text-gray-800 text-sm leading-relaxed">

              {/* Background */}
              <h2 id="background" className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3 mt-2">
                Background
              </h2>
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: article.sections.background }}
              />

              {/* Appearance */}
              <h2 id="appearance" className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Appearance
              </h2>
              <p
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: article.sections.appearance }}
              />

              {/* Relationships */}
              <h2 id="relationships" className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Relationships
              </h2>
              <div
                className="mb-4 space-y-3"
                dangerouslySetInnerHTML={{ __html: article.sections.relationships.split('\n\n').map(p => `<p>${p}</p>`).join('') }}
              />

              {/* Trivia */}
              <h2 id="trivia" className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                Trivia
              </h2>
              <ul className="mb-4 space-y-1.5 list-none">
                {article.sections.trivia.split('\n').map((line, i) => (
                  <li key={i} className="flex gap-2">
                    <span style={{ color: '#00d6d6' }} className="font-bold flex-shrink-0">•</span>
                    <span>{line.replace('• ', '')}</span>
                  </li>
                ))}
              </ul>

              {/* References */}
              <h2 id="references" className="text-xl font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
                References
              </h2>
              <ol className="list-decimal list-inside space-y-1 mb-4">
                {article.references.map((ref, i) => (
                  <li key={i} className="text-sm text-gray-600">
                    <a href="#" style={{ color: '#1ea7c5' }} className="hover:underline">{ref}</a>
                  </li>
                ))}
              </ol>
            </div>

            {/* Clear float */}
            <div style={{ clear: 'both' }} />

            {/* Categories */}
            <div className="mt-6 pt-4 border-t border-gray-300">
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1.5 text-sm text-gray-600">
                  <Tag size={13} />
                  <span className="font-semibold">Categories:</span>
                </div>
                {article.categories.map(cat => (
                  <a
                    key={cat}
                    href="#/category"
                    className="text-xs px-2.5 py-1 rounded-full border"
                    style={{
                      background: 'rgba(30,167,197,0.08)',
                      borderColor: 'rgba(30,167,197,0.3)',
                      color: '#1ea7c5',
                    }}
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>

            {/* Article meta footer */}
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <Clock size={11} />
                <span>Last edited {article.lastEdited}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User size={11} />
                <span>Contributors: {article.editors.map((e, i) => (
                  <span key={e}>
                    <a style={{ color: '#1ea7c5' }} className="hover:underline">{e}</a>
                    {i < article.editors.length - 1 && ', '}
                  </span>
                ))}</span>
              </div>
              <a href="#" style={{ color: '#1ea7c5' }} className="hover:underline">Talk page</a>
              <a href="#" style={{ color: '#1ea7c5' }} className="hover:underline">View history</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
