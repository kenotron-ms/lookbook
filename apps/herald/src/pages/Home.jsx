import { Link } from 'react-router-dom'
import { articles, latestHeadlines } from '../data/articles.js'
import { Clock, ChevronRight } from 'lucide-react'

const topStory = articles[0]
const featuredThree = articles.slice(1, 4)
const techArticles = articles.filter(a => a.section === 'Technology')
const opinionPieces = articles.filter(a => a.opinion)

function SectionDivider({ label }) {
  return (
    <div className="mb-4">
      <div className="border-t-2 border-gray-900 mb-1" />
      <span className="section-label">{label}</span>
    </div>
  )
}

function ArticleCard({ article, size = 'sm' }) {
  const headlineSize = size === 'lg'
    ? 'text-xl font-bold leading-snug'
    : 'text-base font-bold leading-snug'

  return (
    <Link to="/article" className="block group no-underline" style={{ textDecoration: 'none' }}>
      <div
        className={`w-full rounded-none mb-3 ${article.imgClass}`}
        style={{ height: size === 'lg' ? '200px' : '140px' }}
      />
      {article.section && (
        <span className="section-label block mb-1">{article.section}</span>
      )}
      <h3
        className={`font-serif ${headlineSize} text-gray-950 mb-1 group-hover:text-[#326891] transition-colors`}
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {article.headline}
      </h3>
      {article.byline && (
        <p className="font-sans text-xs text-gray-500">{article.byline}</p>
      )}
    </Link>
  )
}

function OpinionCard({ article }) {
  return (
    <Link to="/article" className="block group no-underline border-t border-gray-200 pt-3" style={{ textDecoration: 'none' }}>
      <span className="section-label block mb-1">Opinion</span>
      <h3
        className="font-serif text-base font-bold leading-snug text-gray-950 mb-1 group-hover:text-[#326891] transition-colors"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {article.headline}
      </h3>
      <p className="font-sans text-xs text-gray-500 mb-1">{article.author}</p>
      <p className="font-serif text-sm text-gray-600 leading-snug line-clamp-2">
        {article.summary}
      </p>
    </Link>
  )
}

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-6">

      {/* TOP STORY — full-width editorial lead */}
      <section className="mb-8 border-b border-gray-200 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Image — 3/5 */}
          <Link to="/article" className="col-span-3 block no-underline group" style={{ textDecoration: 'none' }}>
            <div
              className={`w-full ${topStory.imgClass} rounded-none mb-4`}
              style={{ height: '320px' }}
            />
          </Link>
          {/* Text — 2/5 */}
          <div className="col-span-2 flex flex-col justify-start">
            <span className="section-label block mb-2">{topStory.section}</span>
            <Link to="/article" className="no-underline group" style={{ textDecoration: 'none' }}>
              <h1
                className="font-serif text-3xl font-bold leading-tight text-gray-950 mb-3 group-hover:text-[#326891] transition-colors"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {topStory.headline}
              </h1>
            </Link>
            <p
              className="font-serif text-base text-gray-700 leading-relaxed mb-4"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              {topStory.deck}
            </p>
            <div className="flex items-center gap-3 font-sans text-xs text-gray-500">
              <span>{topStory.byline}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {topStory.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED THREE */}
      <section className="mb-8 border-b border-gray-200 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredThree.map(a => (
            <ArticleCard key={a.id} article={a} size="md" />
          ))}
        </div>
      </section>

      {/* TECH SECTION */}
      <section className="mb-8 border-b border-gray-200 pb-8">
        <SectionDivider label="Technology" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large left card */}
          <div className="md:col-span-2">
            <ArticleCard article={techArticles[0]} size="lg" />
            {techArticles[0].deck && (
              <p className="font-serif text-sm text-gray-600 leading-relaxed mt-1 line-clamp-3">
                {techArticles[0].deck}
              </p>
            )}
          </div>
          {/* Three smaller right cards */}
          <div className="md:col-span-2 flex flex-col gap-4">
            {techArticles.slice(1, 4).map((a, i) => (
              <div key={a.id} className={i !== 0 ? 'border-t border-gray-200 pt-4' : ''}>
                <Link to="/article" className="block group no-underline" style={{ textDecoration: 'none' }}>
                  <span className="section-label block mb-1">{a.section}</span>
                  <h3
                    className="font-serif text-base font-bold leading-snug text-gray-950 group-hover:text-[#326891] transition-colors"
                    style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                  >
                    {a.headline}
                  </h3>
                  <p className="font-sans text-xs text-gray-500 mt-1">{a.byline}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OPINION + LATEST two-column */}
      <section className="mb-8 border-b border-gray-200 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Opinion — 2/3 */}
          <div className="lg:col-span-2">
            <SectionDivider label="Opinion" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {opinionPieces.map(a => (
                <OpinionCard key={a.id} article={a} />
              ))}
            </div>
          </div>

          {/* Latest News ticker — 1/3 */}
          <div>
            <SectionDivider label="Latest News" />
            <ul className="space-y-0">
              {latestHeadlines.map((item, i) => (
                <li key={i} className="border-b border-gray-100 py-2.5">
                  <Link to="/article" className="no-underline group block" style={{ textDecoration: 'none' }}>
                    <span className="font-sans text-xs text-gray-400 block mb-0.5">{item.time}</span>
                    <span
                      className="font-serif text-sm font-bold leading-snug text-gray-900 group-hover:text-[#326891] transition-colors"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {item.headline}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PAYWALL GATE */}
      <section className="mb-8">
        <div className="border border-gray-200 bg-gray-50 rounded-none p-8 text-center">
          <div className="border-t-2 border-gray-900 mb-4 w-16 mx-auto" />
          <h2
            className="font-serif text-2xl font-bold text-gray-950 mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            You've read 3 free articles this month.
          </h2>
          <p className="font-serif text-base text-gray-600 mb-6">
            Subscribe for unlimited access to Herald journalism.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              className="font-sans text-sm font-semibold uppercase tracking-wider text-white px-6 py-2.5 transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#326891' }}
            >
              Subscribe — $4/week
            </button>
            <button className="font-sans text-sm font-semibold text-gray-600 underline underline-offset-2">
              Sign in
            </button>
          </div>
          <p className="font-sans text-xs text-gray-400 mt-4">
            Or enter your email for our free daily briefing:
          </p>
          <div className="flex gap-2 justify-center mt-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="font-sans text-sm border border-gray-300 px-3 py-1.5 flex-1 outline-none focus:border-gray-600"
            />
            <button
              className="font-sans text-xs font-semibold uppercase tracking-wider text-white px-4 py-1.5"
              style={{ backgroundColor: '#121212' }}
            >
              Sign up
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
