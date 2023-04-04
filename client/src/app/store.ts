import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../redux/slices/productSlice/productsSlice";
import cartReducer from "../redux/slices/cart/cartSlice";
import authReducer from "../redux/slices/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import loginSlice from "../redux/slices/auth/loginSlice";
import registerSlice from "../redux/slices/auth/registerSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
    login: loginSlice,
    register: registerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
