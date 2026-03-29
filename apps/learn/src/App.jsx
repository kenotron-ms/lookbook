import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Courses from './pages/Courses.jsx';
import CourseDetail from './pages/CourseDetail.jsx';
import MyLearning from './pages/MyLearning.jsx';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen" style={{ backgroundColor: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
        <Header />
        <main style={{ paddingTop: 64 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course" element={<CourseDetail />} />
            <Route path="/mylearning" element={<MyLearning />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
