import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  decrementQte,
  incrementQte,
  removeFromCart,
  selectCartItems,
  selectCartTotal,
} from '../features/panier/panierSlice.js'

const formatPrice = (price) =>
  new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(price)

function Panier() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const total = useSelector(selectCartTotal)

  return (
    <section className="cart-page">
      <div className="page-heading">
        <span className="eyebrow">VOS COUPS DE CŒUR</span>
        <h1>Votre panier<span className="brand-dot">.</span></h1>
        <p>Encore quelques belles trouvailles avant de vous faire plaisir.</p>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-icon"><i className="bi bi-bag" /></span>
          <h2>Votre panier est tout léger</h2>
          <p>Parcourez notre sélection et ajoutez-y vos coups de cœur.</p>
          <Link to="/" className="btn btn-dark mt-3">Découvrir la boutique <i className="bi bi-arrow-right ms-2" /></Link>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                <img
                  className="cart-item-image"
                  src={item.image || 'https://placehold.co/200x220/f2eee9/6b6259?text=Soukly'}
                  alt={item.intitule}
                />
                <div className="cart-item-info">
                  <span className="eyebrow">{item.categorie}</span>
                  <h2>{item.intitule}</h2>
                  <span className="cart-item-price">{formatPrice(item.prix)}</span>
                  <div className="cart-item-controls">
                    <div className="quantity-control" aria-label={`Quantité : ${item.quantity}`}>
                      <button
                        type="button"
                        onClick={() => dispatch(decrementQte(item.id))}
                        aria-label={`Diminuer la quantité de ${item.intitule}`}
                      >
                        <i className="bi bi-dash" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => dispatch(incrementQte(item.id))}
                        aria-label={`Augmenter la quantité de ${item.intitule}`}
                      >
                        <i className="bi bi-plus" />
                      </button>
                    </div>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <i className="bi bi-trash3 me-1" /> Retirer
                    </button>
                  </div>
                </div>
                <strong className="cart-line-total">{formatPrice(item.prix * item.quantity)}</strong>
              </article>
            ))}
            <Link to="/" className="continue-shopping"><i className="bi bi-arrow-left me-2" />Continuer mes achats</Link>
          </div>

          <aside className="order-summary">
            <span className="eyebrow">RÉCAPITULATIF</span>
            <h2>Votre commande</h2>
            <div className="summary-line"><span>Sous-total</span><span>{formatPrice(total)}</span></div>
            <div className="summary-line"><span>Livraison</span><span className="shipping-note">Calculée à la commande</span></div>
            <div className="summary-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <button type="button" className="btn btn-dark checkout-button" disabled>
              Finaliser la commande <i className="bi bi-arrow-right ms-2" />
            </button>
            <p className="checkout-note"><i className="bi bi-shield-check me-1" /> Paiement sécurisé bientôt disponible</p>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Panier
