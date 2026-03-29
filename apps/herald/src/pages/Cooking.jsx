import { useState } from 'react'
import { recipes } from '../data/articles.js'
import { Search, Clock, Bookmark, Star } from 'lucide-react'

const categories = ['All', 'Easy', 'Quick', 'Healthy', 'Vegetarian', 'Comfort Food']
const featuredRecipe = recipes[2] // Chicken Tikka Masala

function difficultyColor(d) {
  if (d === 'Easy') return '#4a7c59'
  if (d === 'Medium') return '#b59f3b'
  return '#8b3a3a'
}

function RecipeCard({ recipe }) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`w-full ${recipe.imgClass} mb-2`}
        style={{ height: '160px' }}
      />
      <h3
        className="font-serif text-sm font-bold leading-snug text-gray-950 mb-1.5 group-hover:text-[#326891] transition-colors"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        {recipe.title}
      </h3>
      <div className="flex items-center gap-3 font-sans text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock size={11} />
          {recipe.time}
        </span>
        <span style={{ color: difficultyColor(recipe.difficulty), fontWeight: 600 }}>
          {recipe.difficulty}
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <Bookmark size={10} />
          {recipe.saves.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default function Cooking() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchValue, setSearchValue] = useState('')

  const filtered = recipes.filter(r => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory
    const matchesSearch = r.title.toLowerCase().includes(searchValue.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      {/* Page header */}
      <div className="border-t-2 border-gray-900 mb-1" />
      <div className="flex items-baseline justify-between mb-4">
        <h1
          className="font-serif text-4xl font-bold text-gray-950"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Cooking
        </h1>
        <span className="font-sans text-xs text-gray-400 hidden md:block">
          19,000+ tested recipes from The Herald's test kitchen
        </span>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-2xl">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search 19,000+ recipes"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="w-full pl-11 pr-4 py-3 border border-gray-300 font-sans text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-gray-600 transition-colors bg-white"
        />
      </div>

      {/* Recipe of the day */}
      {activeCategory === 'All' && !searchValue && (
        <section className="mb-10">
          <div className="border-t-2 border-gray-900 mb-4">
            <span className="section-label block mt-1">Recipe of the Day</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 border border-gray-200 p-6 bg-gray-50">
            <div
              className={`md:col-span-3 ${featuredRecipe.imgClass}`}
              style={{ height: '260px' }}
            />
            <div className="md:col-span-2 flex flex-col justify-center">
              <span className="section-label block mb-2">{featuredRecipe.category}</span>
              <h2
                className="font-serif text-2xl font-bold text-gray-950 mb-3 leading-snug"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                {featuredRecipe.title}
              </h2>
              <p className="font-serif text-sm text-gray-600 leading-relaxed mb-4"
                style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
              >
                A weeknight staple from our test kitchen — rich, warming, and endlessly adaptable. Serve with basmati rice and warm naan.
              </p>
              <div className="flex items-center gap-4 font-sans text-xs text-gray-500 mb-4">
                <span className="flex items-center gap-1">
                  <Clock size={12} />
                  {featuredRecipe.time}
                </span>
                <span style={{ color: difficultyColor(featuredRecipe.difficulty), fontWeight: 600 }}>
                  {featuredRecipe.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Star size={11} className="text-yellow-500 fill-yellow-500" />
                  4.8 (2,341 ratings)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="font-sans text-sm font-semibold uppercase tracking-wider text-white px-5 py-2.5 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#326891' }}
                >
                  View Recipe
                </button>
                <button className="font-sans text-sm text-gray-600 flex items-center gap-1.5 border border-gray-300 px-3 py-2.5 hover:border-gray-500 transition-colors">
                  <Bookmark size={13} />
                  Save
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Category tabs */}
      <div className="flex gap-0 mb-6 border-b border-gray-200 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`font-sans text-sm font-semibold px-4 py-2.5 whitespace-nowrap border-b-2 transition-colors ${
              activeCategory === cat
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Recipe grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="font-serif text-lg text-gray-400" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
            No recipes found for "{searchValue}"
          </p>
          <button
            onClick={() => { setSearchValue(''); setActiveCategory('All') }}
            className="font-sans text-sm text-[#326891] underline underline-offset-2 mt-2"
          >
            Clear filters
          </button>
        </div>
      )}

      {/* Newsletter signup */}
      {!searchValue && (
        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="section-label block mb-2">Herald Cooking Newsletter</p>
          <h3
            className="font-serif text-xl font-bold text-gray-950 mb-2"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Get five recipes in your inbox every week.
          </h3>
          <p className="font-sans text-sm text-gray-500 mb-4">
            Curated by our test kitchen. No spam, no filler — just great food.
          </p>
          <div className="flex gap-2 justify-center max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="font-sans text-sm border border-gray-300 px-3 py-2 flex-1 outline-none focus:border-gray-600 bg-white"
            />
            <button
              className="font-sans text-xs font-semibold uppercase tracking-wider text-white px-4 py-2 hover:opacity-90 transition-opacity whitespace-nowrap"
              style={{ backgroundColor: '#326891' }}
            >
              Sign up
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
