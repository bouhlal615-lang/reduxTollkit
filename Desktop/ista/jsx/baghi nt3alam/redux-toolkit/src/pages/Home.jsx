import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Filter from '../components/Filter.jsx'
import Listproduits from '../components/Listproduits.jsx'
import { fetchProducts } from '../features/produits/produitSlice.js'

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <section className="hero-banner">
        <div className="hero-copy">
          <span className="eyebrow">LE PLAISIR DES BELLES TROUVAILLES</span>
          <h1>Un peu de beau<br />dans votre <em>quotidien.</em></h1>
          <p>Une sélection d’objets et d’essentiels pour rendre chaque jour spécial.</p>
          <a className="hero-cta" href="#catalogue">
            Explorer la sélection <i className="bi bi-arrow-down-right" />
          </a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-flower"><i className="bi bi-flower1" /></div>
          <div className="hero-sticker">CHOISI<br />AVEC ♥</div>
        </div>
      </section>
      <section className="catalogue-layout" id="catalogue">
        <Filter />
        <Listproduits />
      </section>
    </>
  )
}

export default Home
