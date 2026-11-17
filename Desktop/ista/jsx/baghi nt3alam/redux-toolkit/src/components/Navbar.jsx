import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCartCount } from '../features/panier/panierSlice.js'

function Navbar() {
  const cartCount = useSelector(selectCartCount)

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg container py-3" aria-label="Navigation principale">
        <NavLink className="navbar-brand brand-mark" to="/">
          <span className="brand-icon"><i className="bi bi-bag-heart-fill" /></span>
          Soukly<span className="brand-dot">.</span>
        </NavLink>
        <div className="d-flex align-items-center gap-2 ms-auto">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Boutique
          </NavLink>
          <NavLink
            to="/products/new"
            className={({ isActive }) => `nav-link add-product-link ${isActive ? 'active' : ''}`}
          >
            <i className="bi bi-plus-lg me-1" />
            Ajouter un produit
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => `cart-link ${isActive ? 'active' : ''}`}
            aria-label={`Panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}
          >
            <i className="bi bi-bag" />
            <span className="cart-label">Panier</span>
            <span className="cart-badge">{cartCount}</span>
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
