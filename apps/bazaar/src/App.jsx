import { HashRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'
import Category from './pages/Category.jsx'

export default function App() {
  return (
    <HashRouter>
      <div style={{ minHeight: '100vh', background: '#eaeded' }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category" element={<Category />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
