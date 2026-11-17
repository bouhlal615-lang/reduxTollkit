import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../features/panier/panierSlice.js'
import {
  deleteProduct,
  selectFilteredProducts,
  selectSearchTerm,
  setSearchTerm,
} from '../features/produits/produitSlice.js'

const formatPrice = (price) =>
  new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(price)

function Listproduits() {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const searchTerm = useSelector(selectSearchTerm)

  const handleDelete = (product) => {
    if (window.confirm(`Supprimer « ${product.intitule} » ?`)) {
      dispatch(deleteProduct(product.id))
    }
  }

  return (
    <section className="product-list-section">
      <div className="product-toolbar">
        <div>
          <span className="eyebrow">LA SÉLECTION SOUKLY</span>
          <h2>Nos produits <span className="product-count">({products.length})</span></h2>
        </div>
        <label className="search-box">
          <i className="bi bi-search" aria-hidden="true" />
          <input
            type="search"
            className="form-control"
            placeholder="Rechercher un produit..."
            aria-label="Rechercher par intitulé"
            value={searchTerm}
            onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          />
          {searchTerm && (
            <button
              type="button"
              className="search-clear"
              onClick={() => dispatch(setSearchTerm(''))}
              aria-label="Effacer la recherche"
            >
              <i className="bi bi-x-lg" />
            </button>
          )}
        </label>
      </div>

      {products.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-image-wrap">
                <img
                  src={product.image || 'https://placehold.co/600x700/f2eee9/6b6259?text=Soukly'}
                  alt={product.intitule}
                  className="product-image"
                  loading="lazy"
                />
                <span className="product-category">{product.categorie}</span>
                <div className="product-actions">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="icon-action"
                    aria-label={`Modifier ${product.intitule}`}
                    title="Modifier"
                  >
                    <i className="bi bi-pencil" />
                  </Link>
                  <button
                    type="button"
                    className="icon-action"
                    onClick={() => handleDelete(product)}
                    aria-label={`Supprimer ${product.intitule}`}
                    title="Supprimer"
                  >
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
              <div className="product-card-body">
                <h3>{product.intitule}</h3>
                <div className="product-card-bottom">
                  <span className="product-price">{formatPrice(product.prix)}</span>
                  <button
                    type="button"
                    className="add-cart-button"
                    onClick={() => dispatch(addToCart(product))}
                    aria-label={`Ajouter ${product.intitule} au panier`}
                    title="Ajouter au panier"
                  >
                    <i className="bi bi-bag-plus" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-results">
          <span className="empty-icon"><i className="bi bi-search" /></span>
          <h3>Aucun produit trouvé</h3>
          <p>Essayez un autre mot-clé ou une autre catégorie.</p>
        </div>
      )}
    </section>
  )
}

export default Listproduits
