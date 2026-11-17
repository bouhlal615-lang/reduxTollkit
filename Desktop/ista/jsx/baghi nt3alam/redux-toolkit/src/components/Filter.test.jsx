import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Filter from './Filter.jsx'
import { renderWithProviders } from '../test/testUtils.jsx'

describe('Filter', () => {
  it('filtre les catégories du catalogue et met à jour la sélection Redux', () => {
    const produits = {
      items: [
        { id: '1', intitule: 'Sac', prix: 20, categorie: 'Mode' },
        { id: '2', intitule: 'Lampe', prix: 30, categorie: 'Maison' },
      ],
      searchTerm: '',
      selectedCategory: 'Toutes',
      status: 'idle',
      error: null,
    }
    const { store } = renderWithProviders(<Filter />, {
      preloadedState: { produits },
    })

    fireEvent.click(screen.getByRole('radio', { name: /Mode/ }))

    expect(store.getState().produits.selectedCategory).toBe('Mode')
  })
})
