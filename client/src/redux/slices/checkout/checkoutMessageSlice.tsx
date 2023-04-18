import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";


// Defineing a type for the LoginSlice state
interface ICheckoutMessageSlice {
  isMessageOpen: boolean,
  message: string,
  isError: boolean,     
}

// Define the initial state using that type
const initialState: ICheckoutMessageSlice = {
  isMessageOpen: false,
  message: '',
  isError: false,
};

const checkoutMessageSlice = createSlice({
  name: 'checkoutMessage',
  initialState,
  reducers: {
    isCheckoutMessageOpen: (state, action) => {
          console.log(action.payload, 'isCheckoutMessageOpen' );        
          state.isMessageOpen = action.payload.isOpen
          state.message = action.payload.message
          state.isError = action.payload.isError
      },
  }
})

export const { isCheckoutMessageOpen } = checkoutMessageSlice.actions

export default checkoutMessageSlice.reducer

export const checkoutMessageOpen = (state: RootState ) => state.checkoutMessage