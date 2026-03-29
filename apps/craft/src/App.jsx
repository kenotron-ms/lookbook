import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Product from './pages/Product.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ paddingTop: 97 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
