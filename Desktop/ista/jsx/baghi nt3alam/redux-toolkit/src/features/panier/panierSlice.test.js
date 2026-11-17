import { describe, expect, it } from 'vitest'
import reducer, {
  addToCart,
  clearCart,
  decrementQte,
  incrementQte,
  removeFromCart,
  selectCartCount,
  selectCartTotal,
  selectCartTotalsByCurrency,
  setCartItemQuantity,
} from './panierSlice.js'

const product = { id: 'p-1', intitule: 'Sac', prix: 100 }

describe('panierSlice', () => {
  it('ajoute un produit et incrémente sa quantité lorsqu’il existe déjà', () => {
    let panier = reducer(undefined, addToCart(product))
    panier = reducer(panier, addToCart(product))
    expect(panier.items).toEqual([{ ...product, quantity: 2 }])
  })

  it('incrémente, décrémente sans passer sous un et définit une quantité', () => {
    let panier = reducer(undefined, addToCart(product))
    panier = reducer(panier, incrementQte(product.id))
    panier = reducer(panier, decrementQte(product.id))
    panier = reducer(panier, decrementQte(product.id))
    expect(panier.items[0].quantity).toBe(1)

    panier = reducer(panier, setCartItemQuantity({ id: product.id, quantity: 4 }))
    expect(panier.items[0].quantity).toBe(4)
    expect(() =>
      reducer(panier, setCartItemQuantity({ id: product.id, quantity: -1 })),
    ).toThrow(RangeError)
  })

  it('calcule le nombre d’articles et le total, puis supprime les articles', () => {
    let panier = reducer(undefined, addToCart(product))
    panier = reducer(panier, addToCart(product))
    const state = { panier }
    expect(selectCartCount(state)).toBe(2)
    expect(selectCartTotal(state)).toBe(200)
    expect(selectCartTotalsByCurrency(state)).toEqual({ MAD: 200 })

    const mixedCurrency = {
      panier: {
        items: [
          { ...product, quantity: 1 },
          { ...product, id: 'usd-product', devise: 'USD', quantity: 2 },
        ],
      },
    }
    expect(selectCartTotalsByCurrency(mixedCurrency)).toEqual({ MAD: 100, USD: 200 })

    panier = reducer(panier, removeFromCart(product.id))
    expect(panier.items).toEqual([])
  })

  it('retire un article dont la quantité est mise à zéro et vide le panier', () => {
    let panier = reducer(undefined, addToCart(product))
    panier = reducer(panier, setCartItemQuantity({ id: product.id, quantity: 0 }))
    expect(panier.items).toEqual([])

    panier = reducer(panier, addToCart(product))
    expect(reducer(panier, clearCart()).items).toEqual([])
  })
})
