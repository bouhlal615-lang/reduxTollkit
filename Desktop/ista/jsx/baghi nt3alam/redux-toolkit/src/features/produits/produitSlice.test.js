import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import reducer, {
  addProduct,
  deleteProduct,
  fetchProducts,
  selectCategories,
  selectFilteredProducts,
  setSearchTerm,
  setSelectedCategory,
  updateProduct,
} from './produitSlice.js'

const product = {
  id: 'test-1',
  intitule: 'Sac de voyage',
  prix: 120,
  categorie: 'Accessoires',
  image: 'bag.jpg',
}

const createStore = () => configureStore({ reducer: { produits: reducer } })

describe('produitSlice', () => {
  beforeEach(() => {
    vi.unstubAllGlobals()
  })

  it('ajoute, modifie et supprime des produits', () => {
    let state = reducer(undefined, { type: 'init' })
    state = reducer(state, addProduct(product))
    expect(state.items[0]).toMatchObject(product)

    state = reducer(state, updateProduct({ id: product.id, prix: 150 }))
    expect(state.items[0]).toMatchObject({ ...product, prix: 150 })

    state = reducer(state, deleteProduct(product.id))
    expect(state.items.some((item) => item.id === product.id)).toBe(false)
  })

  it('génère un identifiant si le produit ajouté n’en fournit pas', () => {
    const state = reducer(undefined, addProduct({ intitule: 'Sans ID' }))
    expect(state.items[0].id).toEqual(expect.any(String))
    expect(state.items[0].id).not.toBe('')
  })

  it('filtre par recherche et catégorie et expose les catégories disponibles', () => {
    let produits = reducer(undefined, { type: 'init' })
    produits = reducer(produits, setSearchTerm('  SAC '))
    produits = reducer(produits, setSelectedCategory('Accessoires'))
    const state = { produits }

    expect(selectFilteredProducts(state).map((item) => item.id)).toEqual(['p-1'])
    expect(selectCategories(state)).toContain('Accessoires')
  })

  it('charge et normalise les produits FakeStore', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [
          { id: 8, title: 'T-shirt', price: 19.5, category: 'clothing', image: 'shirt.jpg' },
        ],
      }),
    )
    const store = createStore()

    await store.dispatch(fetchProducts())

    expect(store.getState().produits.status).toBe('succeeded')
    expect(store.getState().produits.items).toEqual([
      {
        id: '8',
        intitule: 'T-shirt',
        prix: 19.5,
        categorie: 'clothing',
        image: 'shirt.jpg',
        devise: 'USD',
      },
    ])
  })

  it('expose l’état pending puis rejected si la requête échoue', async () => {
    let resolveResponse
    vi.stubGlobal(
      'fetch',
      vi.fn(
        () =>
          new Promise((resolve) => {
            resolveResponse = resolve
          }),
      ),
    )
    const store = createStore()
    const request = store.dispatch(fetchProducts())

    expect(store.getState().produits.status).toBe('loading')
    resolveResponse({ ok: false, status: 503 })
    await request

    expect(store.getState().produits.status).toBe('failed')
    expect(store.getState().produits.error).toContain('503')
  })

  it('rejette une réponse FakeStore mal formée', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => [{ id: 8, title: 'T-shirt' }],
      }),
    )
    const store = createStore()

    await store.dispatch(fetchProducts())

    expect(store.getState().produits.status).toBe('failed')
    expect(store.getState().produits.error).toContain('invalide')
  })
})
