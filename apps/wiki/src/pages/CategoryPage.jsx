import { ChevronRight, Folder, FileText, Grid3X3 } from 'lucide-react'
import { categoryData } from '../data/wiki.js'

// Group pages alphabetically
function groupByInitial(pages) {
  const grouped = {}
  for (const page of pages) {
    const letter = page.initial
    if (!grouped[letter]) grouped[letter] = []
    grouped[letter].push(page)
  }
  return grouped
}

export default function CategoryPage() {
  const grouped = groupByInitial(categoryData.pages)
  const letters = Object.keys(grouped).sort()

  return (
    <div style={{ background: '#f6f6f7', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 py-6">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
          <a href="#/" style={{ color: '#1ea7c5' }} className="hover:underline">Main Page</a>
          <ChevronRight size={12} />
          <span className="text-gray-700">Category: Characters</span>
        </div>

        {/* Page header */}
        <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: '#1b2a4a' }}
          >
            <Folder size={20} className="text-white" />
          </div>
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Category</div>
            <h1 className="text-2xl font-bold text-gray-900">Characters</h1>
          </div>
          <div className="ml-auto text-sm text-gray-500">
            {categoryData.articleCount} articles
          </div>
        </div>

        {/* Subcategories */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Grid3X3 size={15} style={{ color: '#1ea7c5' }} />
            Subcategories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryData.subcategories.map(sub => (
              <a
                key={sub.name}
                href="#/category"
                className="group flex items-center gap-3 rounded-xl p-4 border border-gray-200 bg-white hover:border-cyan-300 hover:shadow-sm transition-all"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: sub.color }}
                >
                  <Folder size={14} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div style={{ color: '#1ea7c5' }} className="text-sm font-medium group-hover:underline leading-snug">
                    {sub.name}
                  </div>
                  <div className="text-xs text-gray-400">{sub.count} articles</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Pages in category */}
        <section>
          <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText size={15} style={{ color: '#1ea7c5' }} />
            Pages in this category
          </h2>

          {/* Alphabet jump */}
          <div className="flex flex-wrap gap-1 mb-5 pb-3 border-b border-gray-200">
            {letters.map(l => (
              <a
                key={l}
                href={`#letter-${l}`}
                className="w-7 h-7 flex items-center justify-center rounded text-sm font-mono font-bold transition-colors hover:bg-cyan-100"
                style={{ color: '#1ea7c5', border: '1px solid rgba(30,167,197,0.3)' }}
              >
                {l}
              </a>
            ))}
          </div>

          {/* Alphabetical groups */}
          <div className="space-y-5">
            {letters.map(letter => (
              <div key={letter} id={`letter-${letter}`}>
                <div
                  className="text-lg font-bold mb-2 pb-1 border-b"
                  style={{ color: '#1b2a4a', borderColor: '#00d6d6' }}
                >
                  {letter}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {grouped[letter].map(page => (
                    <a
                      key={page.title}
                      href="#/article"
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all group"
                    >
                      {/* Tiny thumbnail placeholder */}
                      <div
                        className="w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-white text-xs font-bold"
                        style={{ background: 'linear-gradient(135deg, #1b2a4a 0%, #00d6d6 100%)' }}
                      >
                        {page.title[0]}
                      </div>
                      <span
                        style={{ color: '#1ea7c5' }}
                        className="text-sm group-hover:underline leading-snug"
                      >
                        {page.title}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Category footer */}
        <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          This category currently contains {categoryData.articleCount} pages and {categoryData.subcategories.length} subcategories.
        </div>
      </div>
    </div>
  )
}
