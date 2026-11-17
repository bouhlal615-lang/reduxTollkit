import { configureStore } from '@reduxjs/toolkit'
import produitReducer from '../features/produits/produitSlice.js'
import panierReducer from '../features/panier/panierSlice.js'

export const store = configureStore({
  reducer: {
    produits: produitReducer,
    panier: panierReducer,
  },
})
