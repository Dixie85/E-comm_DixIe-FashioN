import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { ICartProduct, ISizes } from "../../../Interfaces/Interfaces";

// Defineing a type for the CartSlice state
interface ICartState {
  total: number,
  shipping: string | number,
  cart: ICartProduct[]
}

interface ICartAddRemoveProduct {
  selectedSize: string;
  _id: string
}

// Define the initial state using that type
const initialState: ICartState = {
  total: 0.00,
  shipping: 5.99,
  cart: [],
};

//Calculates the total cost of all products in the cart
const total = (cart: ICartProduct[]) =>
  cart.reduce(
    (tot, pro) =>
      tot += pro.price *
      Object.values(pro.cartQuantity)
        .reduce((res, quan): number => {
          return res += quan
        }, 0)
    , 0).toFixed(2)

//Determing the shipping fee
const setShippingPrice = (cart: ICartProduct[]) => {
  const totalPrice = total(cart)
  if (+totalPrice >= 70) return "Free"
  return 5.99
}

const totalCartQuantity = (cartQuantity: ISizes): number =>
  Object.values(cartQuantity)
    .reduce((res, quan): number => {
      return res += quan
    }, 0)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addTocart: (state, action: PayloadAction<ICartProduct>) => {
      state.cart = [...state.cart, action.payload]
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    },
    removeFromCart: (state, action: PayloadAction<ICartProduct>) => {
      const newCart = state.cart.filter(pro => pro._id !== action.payload._id)
      state.cart = newCart
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    },
    addQuantity: (state, action: PayloadAction<ICartAddRemoveProduct>) => {
      const findProduct = state.cart.find(pro => pro._id === action.payload._id)
      const cartQuantity = totalCartQuantity(findProduct!.cartQuantity)
      const productIndex = state.cart.indexOf(findProduct!)
      const size = action.payload.selectedSize
      const newCart = [...state.cart]
      //@ts-ignore
      if (state.cart[productIndex].cartQuantity[size] < state.cart[productIndex].size[size])
        newCart[productIndex] = {
          ...newCart[productIndex],
          cartQuantity: {
            ...newCart[productIndex].cartQuantity,
            //@ts-ignore
            [size]: newCart[productIndex].cartQuantity[size] + 1
          }
        }
      if (cartQuantity < findProduct?.stock!) state.cart = newCart
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    },
    subtractQuantity: (state, action: PayloadAction<ICartAddRemoveProduct>) => {
      const findProduct = state.cart.find(pro => pro._id === action.payload._id)
      const cartQuantity = totalCartQuantity(findProduct!.cartQuantity)
      const productIndex = state.cart.indexOf(findProduct!)
      const size = action.payload.selectedSize
      const newCart = [...state.cart]
      //@ts-ignore
      if (state.cart[productIndex].cartQuantity[size] > 0)
        newCart[productIndex] = {
          ...newCart[productIndex],
          cartQuantity: {
            ...newCart[productIndex].cartQuantity,
            //@ts-ignore
            [size]: newCart[productIndex].cartQuantity[size] - 1
          }
        }

      if (cartQuantity > 1) state.cart = newCart
      state.total = Number(total(state.cart))
      state.shipping = setShippingPrice(state.cart)
    },
    resetCart: (state) => {
      state.cart = [...initialState.cart]
      state.total = initialState.total
      state.shipping = initialState.shipping
    },
  },

});

export const { addTocart, removeFromCart, addQuantity, subtractQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

export const selectCurrentCart = (state: RootState) => state.cart
