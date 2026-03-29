import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Network from './pages/Network';
import Jobs from './pages/Jobs';
import Profile from './pages/Profile';
import Messaging from './pages/Messaging';

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#f3f2ef' }}>
        <Header />
        <div style={{ paddingTop: '52px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/network" element={<Network />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/messaging" element={<Messaging />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
