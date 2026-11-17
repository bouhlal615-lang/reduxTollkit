import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Panier from './pages/Panier.jsx'
import ProductForm from './pages/ProductForm.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="container page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/:id/edit" element={<ProductForm />} />
          <Route path="/cart" element={<Panier />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <span className="brand-mark"><i className="bi bi-bag-heart-fill" /> Soukly</span>
          <span>Des trouvailles qui font plaisir.</span>
        </div>
      </footer>
    </div>
  )
}

export default App
