import { createSelector, createSlice } from '@reduxjs/toolkit'

const panierSlice = createSlice({
  name: 'panier',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    incrementQte(state, action) {
      const item = state.items.find((product) => product.id === action.payload)
      if (item) item.quantity += 1
    },
    decrementQte(state, action) {
      const item = state.items.find((product) => product.id === action.payload)
      if (item && item.quantity > 1) item.quantity -= 1
    },
    clearCart(state) {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, incrementQte, decrementQte, clearCart } =
  panierSlice.actions

export const selectCartItems = (state) => state.panier.items
export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, item) => count + item.quantity, 0),
)
export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => total + item.prix * item.quantity, 0),
)

export default panierSlice.reducer
