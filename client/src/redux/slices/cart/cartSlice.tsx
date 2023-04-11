import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ICartProduct} from "../../../Interfaces/Interfaces";

// Defineing a type for the CartSlice state
interface ICartState {
  total: number,
  shipping : string | number,
  cart: ICartProduct[]
}

// Define the initial state using that type
const initialState: ICartState = {
  total: 0.00,
  shipping: 5.99,
  cart: [],
};

const total = (cart: ICartProduct[]) => cart.reduce((tot, pro) => tot += pro.price * pro.cartQuantity, 0).toFixed(2)

const setShippingPrice = (cart: ICartProduct[]) => {
  const totalPrice = total(cart)
  if (+totalPrice >= 70 ) return "Free"
  return 5.99
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<ICartProduct>) => {
      state.cart = [...state.cart, action.payload ]
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    },
    removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
      const newCart = state.cart.filter(pro => pro._id !== action.payload._id )
      state.cart = newCart
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
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
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
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
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    }
  },

});

export const { addTocart, removeFromCart, addQuantity, subtractQuantity } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state: RootState ) => state.cart
