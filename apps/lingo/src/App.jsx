import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'
import Learn from './pages/Learn.jsx'
import Lesson from './pages/Lesson.jsx'
import Leaderboard from './pages/Leaderboard.jsx'
import Profile from './pages/Profile.jsx'

function Layout({ children }) {
  return (
    <div className="min-h-screen" style={{ background: '#f7f7f7' }}>
      <Header />
      {/* Main layout: sidebar + content */}
      <div
        className="max-w-[960px] mx-auto flex gap-6 px-4"
        style={{ paddingTop: '72px', paddingBottom: '40px' }}
      >
        <Sidebar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#e5e5e5] flex justify-around py-2 z-40">
        {[
          { to: '#/',        emoji: '📚', label: 'Learn'  },
          { to: '#/league',  emoji: '🏆', label: 'League' },
          { to: '#/profile', emoji: '👤', label: 'Profile'},
        ].map(({ to, emoji, label }) => (
          <a
            key={to}
            href={to}
            className="flex flex-col items-center gap-0.5 text-xs font-extrabold no-underline"
            style={{ color: '#afafaf' }}
          >
            <span className="text-xl">{emoji}</span>
            {label}
          </a>
        ))}
      </nav>
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout><Learn /></Layout>} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/league" element={<Layout><Leaderboard /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </HashRouter>
  )
}
