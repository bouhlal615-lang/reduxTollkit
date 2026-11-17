import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { addProduct, selectProducts, updateProduct } from '../features/produits/produitSlice.js'

const emptyForm = { intitule: '', prix: '', categorie: '', image: '', devise: 'MAD' }

function ProductForm() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const products = useSelector(selectProducts)
  const product = products.find((item) => item.id === id)
  const [form, setForm] = useState(() =>
    product
      ? {
          intitule: product.intitule,
          prix: String(product.prix),
          categorie: product.categorie,
          image: product.image,
          devise: product.devise || 'MAD',
        }
      : emptyForm,
  )
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const price = Number(form.prix)
    if (!form.intitule.trim() || !form.categorie.trim() || !Number.isFinite(price) || price <= 0) {
      setError('Renseignez un intitulé, une catégorie et un prix supérieur à zéro.')
      return
    }

    const productData = {
      intitule: form.intitule.trim(),
      prix: price,
      categorie: form.categorie.trim(),
      image: form.image.trim(),
      devise: form.devise,
    }
    if (id) {
      dispatch(updateProduct({ id, ...productData }))
    } else {
      dispatch(addProduct(productData))
    }
    navigate('/')
  }

  if (id && !product) {
    return (
      <div className="form-page">
        <div className="form-card text-center">
          <span className="empty-icon"><i className="bi bi-box-seam" /></span>
          <h1>Produit introuvable</h1>
          <p className="text-muted mb-4">Ce produit n’existe plus dans la boutique.</p>
          <Link to="/" className="btn btn-dark">Retour à la boutique</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="form-page">
      <Link to="/" className="back-link"><i className="bi bi-arrow-left" /> Retour à la boutique</Link>
      <div className="form-card">
        <div className="form-card-heading">
          <span className="eyebrow">{id ? 'VOTRE CATALOGUE' : 'FAIRE GRANDIR LA SÉLECTION'}</span>
          <h1>{id ? 'Modifier le produit' : 'Ajouter un produit'}</h1>
          <p>{id ? 'Mettez à jour les informations de votre produit.' : 'Partagez une nouvelle trouvaille avec la communauté.'}</p>
        </div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="intitule" className="form-label">Intitulé du produit</label>
            <input
              id="intitule"
              name="intitule"
              className="form-control"
              value={form.intitule}
              onChange={handleChange}
              placeholder="Ex. Sac en cuir naturel"
              required
            />
          </div>
          <div className="form-row">
            <div className="mb-3">
              <label htmlFor="prix" className="form-label">Prix ({form.devise})</label>
              <div className="input-group">
                <input
                  id="prix"
                  name="prix"
                  type="number"
                  min="0.01"
                  step="0.01"
                  className="form-control"
                  value={form.prix}
                  onChange={handleChange}
                  placeholder="0"
                  required
                />
                <span className="input-group-text">MAD</span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="categorie" className="form-label">Catégorie</label>
              <input
                id="categorie"
                name="categorie"
                className="form-control"
                list="product-categories"
                value={form.categorie}
                onChange={handleChange}
                placeholder="Ex. Maison"
                required
              />
              <datalist id="product-categories">
                {[...new Set(products.map((item) => item.categorie))].map((category) => (
                  <option value={category} key={category} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="form-label">URL de l’image <span className="optional-label">— facultatif</span></label>
            <input
              id="image"
              name="image"
              type="url"
              className="form-control"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>
          {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
          <div className="d-flex gap-2 justify-content-end">
            <Link to="/" className="btn btn-light form-cancel">Annuler</Link>
            <button type="submit" className="btn btn-dark form-submit">
              <i className={`bi ${id ? 'bi-check2' : 'bi-plus-lg'} me-2`} />
              {id ? 'Enregistrer' : 'Ajouter le produit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
