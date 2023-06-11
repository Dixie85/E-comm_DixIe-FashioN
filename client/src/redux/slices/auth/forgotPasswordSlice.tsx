import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

// Defineing a type for the LoginSlice state
interface IForgotPasswordSlice {
  isOpen: boolean     
}

// Define the initial state using that type
const initialState: IForgotPasswordSlice = {
  isOpen: false,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    isForgotPasswordOpen: (state, action) => {          
          state.isOpen = action.payload
      },
  }
})

export const { isForgotPasswordOpen } = forgotPasswordSlice.actions

export default forgotPasswordSlice.reducer

export const forgotPasswordOpen = (state: RootState ) => state.forgotPassword.isOpen
