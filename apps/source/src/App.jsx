import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Story from './pages/Story'
import New from './pages/New'
import Ask from './pages/Ask'

const footerLinks = ['Guidelines', 'FAQ', 'Lists', 'API', 'Security', 'Legal', 'Contact']

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', backgroundColor: '#f6f6ef' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/new" element={<New />} />
          <Route path="/ask" element={<Ask />} />
        </Routes>
        {/* Footer */}
        <div style={{ maxWidth: 860, margin: '0 auto', paddingBottom: 16 }}>
          <div style={{ borderTop: '2px solid #ff6600', margin: '0 0 8px' }} />
          <div style={{ textAlign: 'center', fontSize: 9, color: '#828282', fontFamily: 'Verdana, sans-serif' }}>
            {footerLinks.map((label, i) => (
              <span key={label}>
                <a href="#" style={{ color: '#828282' }}>{label}</a>
                {i < footerLinks.length - 1 && ' | '}
              </span>
            ))}
            <br />
            <span style={{ display: 'inline-block', marginTop: 4 }}>
              Signal over noise.
            </span>
          </div>
        </div>
      </div>
    </HashRouter>
  )
}
