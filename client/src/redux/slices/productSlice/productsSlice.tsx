import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../../Interfaces/Interfaces";

// Defineing a type for the ProductsSlice state
interface IProductsState {
  products: IProduct[]
}

// Define the initial state using that type
const initialState: IProductsState = {
  products: [],
};

export const fetchProducts = createAsyncThunk(
  "person/fetch",
  async (thunkAPI) => {
    const response = await fetch("http://localhost:8080/product", {       //change with ENV
      method: "GET",
    });
    const data = response.json();
    return data;
  },
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  }
});

export default productsSlice.reducer;
