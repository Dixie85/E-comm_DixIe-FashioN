import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    const response = await fetch("http://localhost:8080/api/products", {
      method: "GET",
    });
    const data = response.json();    
    return data;
  },
);

export const counterSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  }
});

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
