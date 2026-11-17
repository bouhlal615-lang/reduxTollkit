import { useDispatch, useSelector } from 'react-redux'
import {
  selectCategories,
  selectSelectedCategory,
  setSelectedCategory,
} from '../features/produits/produitSlice.js'

function Filter() {
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const selectedCategory = useSelector(selectSelectedCategory)

  return (
    <aside className="filter-panel">
      <div className="filter-heading">
        <span className="eyebrow">AFFINER</span>
        <h2>Catégories</h2>
      </div>
      <div className="category-options">
        {categories.map((category, index) => (
          <label className="category-option" key={category}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value={category}
              checked={selectedCategory === category}
              onChange={() => dispatch(setSelectedCategory(category))}
            />
            <span>{category}</span>
            {index === 0 && <span className="category-count">Tout</span>}
          </label>
        ))}
      </div>
      <div className="filter-note">
        <i className="bi bi-stars" />
        <span>Des pièces choisies avec soin, rien que pour vous.</span>
      </div>
    </aside>
  )
}

export default Filter
