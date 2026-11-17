import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('Navbar', () => {
  it('affiche les liens de navigation et le nombre d’articles du panier', () => {
    const product = { id: 'p-1', intitule: 'Sac', prix: 100 }
    renderWithProviders(<Navbar />, {
      preloadedState: {
        produits: undefined,
        panier: { items: [{ ...product, quantity: 2 }] },
      },
    })

    expect(screen.getByRole('link', { name: 'Boutique' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Ajouter un produit' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Panier, 2 articles' })).toBeInTheDocument()
  })
})
