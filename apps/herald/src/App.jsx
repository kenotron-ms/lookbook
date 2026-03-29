import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Article from './pages/Article.jsx'
import Games from './pages/Games.jsx'
import Cooking from './pages/Cooking.jsx'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article" element={<Article />} />
          <Route path="/games" element={<Games />} />
          <Route path="/cooking" element={<Cooking />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
