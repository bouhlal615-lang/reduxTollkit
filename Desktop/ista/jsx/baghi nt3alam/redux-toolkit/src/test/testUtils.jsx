import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import panierReducer from '../features/panier/panierSlice.js'
import produitReducer from '../features/produits/produitSlice.js'

export function renderWithProviders(
  ui,
  {
    preloadedState,
    route = '/',
    store = configureStore({
      reducer: { produits: produitReducer, panier: panierReducer },
      preloadedState,
    }),
  } = {},
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>,
    ),
  }
}
