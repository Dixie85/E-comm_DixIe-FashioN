import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/productSlice/productsSlice'
import cartReducer from './slices/cart/cartSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,

  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch