import { Link } from 'react-router-dom'
import { articles } from '../data/articles.js'
import { Clock, Bookmark, Share2, ChevronRight } from 'lucide-react'

const article = articles[0]
const related = articles.slice(1, 4)

export default function Article() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

        {/* Main article — 3/4 */}
        <article className="lg:col-span-3">

          {/* Breadcrumb */}
          <nav className="flex items-center gap-1 mb-4 font-sans text-xs text-gray-500">
            <Link to="/" className="hover:text-[#326891] transition-colors" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
            <ChevronRight size={12} />
            <span className="text-[#326891] font-semibold uppercase tracking-wider">{article.section}</span>
          </nav>

          {/* Headline */}
          <h1
            className="font-serif font-bold text-gray-950 leading-tight mb-4"
            style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 'clamp(28px, 4vw, 40px)',
            }}
          >
            {article.headline}
          </h1>

          {/* Deck */}
          <p
            className="font-serif text-xl text-gray-600 leading-relaxed mb-5 border-b border-gray-200 pb-5"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            {article.deck}
          </p>

          {/* Byline row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div>
                <p
                  className="font-sans text-sm font-semibold text-gray-900"
                  style={{ color: '#326891' }}
                >
                  {article.byline}
                </p>
                <div className="flex items-center gap-3 font-sans text-xs text-gray-500 mt-0.5">
                  <span>{article.date}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />
                    {article.readTime}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 font-sans text-xs text-gray-600 border border-gray-300 px-3 py-1.5 hover:border-gray-500 transition-colors">
                <Bookmark size={13} />
                Save
              </button>
              <button className="flex items-center gap-1.5 font-sans text-xs text-gray-600 border border-gray-300 px-3 py-1.5 hover:border-gray-500 transition-colors">
                <Share2 size={13} />
                Share
              </button>
            </div>
          </div>

          {/* Lead image */}
          <div
            className={`w-full ${article.imgClass} mb-2`}
            style={{ height: '400px' }}
          />
          <p className="font-sans text-xs text-gray-400 mb-6 italic">
            The shift has accelerated faster than policymakers anticipated. Credit: Herald Graphics
          </p>

          {/* Article body */}
          <div className="article-body max-w-[680px]">
            {/* Paragraph 1 */}
            <p
              className="font-serif text-lg leading-8 text-gray-900 mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '18px', lineHeight: '1.85' }}
            >
              {article.body[0]}
            </p>

            {/* Paragraph 2 */}
            <p
              className="font-serif text-lg leading-8 text-gray-900 mb-5"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '18px', lineHeight: '1.85' }}
            >
              {article.body[1]}
            </p>

            {/* Paywall gate — blurred overlay */}
            <div className="relative">
              {/* Partially visible paragraph */}
              <div className="relative overflow-hidden" style={{ maxHeight: '120px' }}>
                <p
                  className="font-serif text-lg text-gray-900"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: '18px', lineHeight: '1.85' }}
                >
                  The displacement patterns emerging from newly available data tell a more nuanced story than either the optimists or pessimists had projected. High-income knowledge workers in sectors like consulting and market research have seen the steepest productivity gains, but also the steepest drops in headcount. Entry-level positions that once served as training grounds for the next generation of analysts have been reduced by an average of 40 percent at firms that have deployed AI tooling broadly.
                </p>
                {/* Fade to white */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.7) 50%, #ffffff 100%)',
                  }}
                />
              </div>

              {/* Paywall CTA */}
              <div className="border border-gray-200 bg-white p-8 text-center mt-0" style={{ boxShadow: '0 -4px 12px rgba(0,0,0,0.06)' }}>
                <p className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-2">Continue reading</p>
                <h3
                  className="font-serif text-xl font-bold text-gray-950 mb-3"
                  style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                >
                  Create a free account or log in to continue reading.
                </h3>
                <p className="font-serif text-sm text-gray-500 mb-5">
                  Herald subscribers get unlimited access to all articles, games, and cooking.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button
                    className="font-sans text-sm font-semibold uppercase tracking-wider text-white px-6 py-2.5 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#326891' }}
                  >
                    Subscribe now
                  </button>
                  <button className="font-sans text-sm font-semibold text-gray-700 border border-gray-400 px-6 py-2.5 hover:border-gray-600 transition-colors">
                    Log in
                  </button>
                </div>
                <p className="font-sans text-xs text-gray-400 mt-3">
                  Already a subscriber?{' '}
                  <button className="text-[#326891] underline underline-offset-2">Sign in</button>
                </p>
              </div>
            </div>

            {/* Pull quote — visible above paywall */}
            <blockquote
              className="border-l-4 border-gray-900 pl-6 my-8"
              style={{ display: 'none' }}
            >
              <p
                className="font-serif text-2xl italic text-gray-800 leading-relaxed mb-2"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                "{article.quote}"
              </p>
              <cite className="font-sans text-sm text-gray-500 not-italic">
                — {article.quoteAuthor}
              </cite>
            </blockquote>
          </div>
        </article>

        {/* Sidebar — 1/4 */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24">
            {/* Related articles */}
            <div className="border-t-2 border-gray-900 mb-4">
              <span className="section-label block mt-1 mb-3">More to read</span>
            </div>
            <div className="space-y-4">
              {related.map((a, i) => (
                <div key={a.id} className={i !== 0 ? 'border-t border-gray-100 pt-4' : ''}>
                  <Link to="/article" className="block group no-underline" style={{ textDecoration: 'none' }}>
                    <span className="section-label block mb-1">{a.section}</span>
                    <h4
                      className="font-serif text-sm font-bold leading-snug text-gray-950 group-hover:text-[#326891] transition-colors"
                      style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                    >
                      {a.headline}
                    </h4>
                    <p className="font-sans text-xs text-gray-400 mt-1">{a.byline}</p>
                  </Link>
                </div>
              ))}
            </div>

            {/* Subscribe box */}
            <div className="border border-gray-200 p-4 mt-8 bg-gray-50">
              <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-2">Herald Subscription</p>
              <p
                className="font-serif text-sm font-bold text-gray-900 mb-3"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                Unlimited journalism. Starting at $4/week.
              </p>
              <button
                className="w-full font-sans text-xs font-semibold uppercase tracking-wider text-white py-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#326891' }}
              >
                See options
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
