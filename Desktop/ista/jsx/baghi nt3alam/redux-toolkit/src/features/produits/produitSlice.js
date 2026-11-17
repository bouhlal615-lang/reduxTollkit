import { createAsyncThunk, createSelector, createSlice, nanoid } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'produits/fetchProducts',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) {
      return rejectWithValue(`Impossible de charger les produits (HTTP ${response.status}).`)
    }

    const products = await response.json()
    if (
      !Array.isArray(products) ||
      products.some(
        (product) =>
          !product ||
          (typeof product.id !== 'string' && typeof product.id !== 'number') ||
          typeof product.title !== 'string' ||
          typeof product.price !== 'number' ||
          typeof product.category !== 'string' ||
          typeof product.image !== 'string',
      )
    ) {
      return rejectWithValue('La réponse de FakeStore API est invalide.')
    }

    return products.map((product) => ({
      id: String(product.id),
      intitule: product.title,
      prix: product.price,
      categorie: product.category,
      image: product.image,
      devise: 'USD',
    }))
  },
  {
    condition: (_, { getState }) => getState().produits.status !== 'loading',
  },
)

const initialProducts = [
  {
    id: 'p-1',
    intitule: 'Sac en cuir naturel',
    prix: 690,
    categorie: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'p-2',
    intitule: 'Sneakers urbaines',
    prix: 520,
    categorie: 'Mode',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'p-3',
    intitule: 'Lampe de table',
    prix: 340,
    categorie: 'Maison',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'p-4',
    intitule: 'Montre minimaliste',
    prix: 850,
    categorie: 'Accessoires',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'p-5',
    intitule: 'Vase en céramique',
    prix: 260,
    categorie: 'Maison',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 'p-6',
    intitule: 'Lunettes de soleil',
    prix: 390,
    categorie: 'Mode',
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85',
  },
]

const produitSlice = createSlice({
  name: 'produits',
  initialState: {
    items: initialProducts,
    searchTerm: '',
    selectedCategory: 'Toutes',
    status: 'idle',
    error: null,
  },
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.items.unshift(action.payload)
      },
      prepare(product) {
        return { payload: { ...product, id: product.id || nanoid() } }
      },
    },
    updateProduct(state, action) {
      const index = state.items.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },
    deleteProduct(state, action) {
      state.items = state.items.filter((product) => product.id !== action.payload)
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || action.error.message || 'Une erreur est survenue.'
      })
  },
})

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setSearchTerm,
  setSelectedCategory,
} = produitSlice.actions

export const selectProducts = (state) => state.produits.items
export const selectProductsStatus = (state) => state.produits.status
export const selectProductsError = (state) => state.produits.error
export const selectSearchTerm = (state) => state.produits.searchTerm
export const selectSelectedCategory = (state) => state.produits.selectedCategory
export const selectCategories = createSelector([selectProducts], (products) => [
  'Toutes',
  ...new Set(products.map((product) => product.categorie).filter(Boolean)),
])
export const selectFilteredProducts = createSelector(
  [selectProducts, selectSearchTerm, selectSelectedCategory],
  (products, searchTerm, selectedCategory) => {
    const query = searchTerm.trim().toLocaleLowerCase('fr')
    return products.filter((product) => {
      const matchesName = product.intitule.toLocaleLowerCase('fr').includes(query)
      const matchesCategory =
        selectedCategory === 'Toutes' || product.categorie === selectedCategory
      return matchesName && matchesCategory
    })
  },
)

export default produitSlice.reducer
