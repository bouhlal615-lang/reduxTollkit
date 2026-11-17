import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Listproduits from './Listproduits.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('Listproduits', () => {
  it('recherche un produit et l’ajoute au panier', () => {
    const produit = {
      id: 'p-1',
      intitule: 'Sac de voyage',
      prix: 120,
      categorie: 'Accessoires',
      image: 'bag.jpg',
    }
    const produits = {
      items: [produit],
      searchTerm: '',
      selectedCategory: 'Toutes',
      status: 'succeeded',
      error: null,
    }
    const { store } = renderWithProviders(<Listproduits />, {
      preloadedState: { produits },
    })

    fireEvent.change(screen.getByRole('searchbox'), { target: { value: 'voyage' } })
    expect(screen.getByRole('heading', { name: 'Sac de voyage' })).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Ajouter Sac de voyage au panier' }))

    expect(store.getState().panier.items).toEqual([{ ...produit, quantity: 1 }])
  })

  it('signale un échec de chargement sans masquer le catalogue existant', () => {
    const produit = {
      id: 'p-1',
      intitule: 'Sac',
      prix: 120,
      categorie: 'Accessoires',
      image: 'bag.jpg',
    }
    renderWithProviders(<Listproduits />, {
      preloadedState: {
        produits: {
          items: [produit],
          searchTerm: '',
          selectedCategory: 'Toutes',
          status: 'failed',
          error: 'API indisponible.',
        },
      },
    })

    expect(screen.getByRole('alert')).toHaveTextContent('API indisponible.')
    expect(screen.getByRole('heading', { name: 'Sac' })).toBeInTheDocument()
  })
})
