import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartProduct} from "../../../Interfaces/Interfaces";

// Defineing a type for the CartSlice state
interface ICartState {
  cart: ICartProduct[]
}

// Define the initial state using that type
const initialState: ICartState = {
  cart: [],
};


export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<ICartProduct>) => {
      state.cart = [...state.cart, action.payload ]
    },
    removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
      const newCart = state.cart.filter(pro => pro._id !== action.payload._id )
      state.cart = newCart
    },
    addQuantity: (state, action: PayloadAction<ICartProduct>) => {
      const findProduct = state.cart.find(pro => pro._id === action.payload._id)
      const productIndex = state.cart.indexOf(findProduct!)
      const newCart = [...state.cart]
      newCart[productIndex] = {
        ...newCart[productIndex], 
        cartQuantity:newCart[productIndex].cartQuantity + 1
      }
      if (findProduct?.cartQuantity! < findProduct?.stock!) state.cart = newCart
    },
    subtractQuantity: (state, action: PayloadAction<ICartProduct>) => {
      const findProduct = state.cart.find(pro => pro._id === action.payload._id)
      const productIndex = state.cart.indexOf(findProduct!)
      const newCart = [...state.cart]
      newCart[productIndex] = {
        ...newCart[productIndex],
        cartQuantity: newCart[productIndex].cartQuantity - 1
      }
      if (findProduct?.cartQuantity! > 1) state.cart = newCart
    }
  },

});

export const { addTocart, removeFromCart, addQuantity, subtractQuantity } = cartSlice.actions;
export default cartSlice.reducer;
