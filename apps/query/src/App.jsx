import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import QuestionsPage from './pages/QuestionsPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import TagsPage from './pages/TagsPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<QuestionsPage />} />
          <Route path="question" element={<QuestionDetailPage />} />
          <Route path="tags" element={<TagsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
