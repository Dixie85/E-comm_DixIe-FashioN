import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

// Defineing a type for the RegisterSlice state
interface IRegisterSlice {
  isOpen: boolean
}

// Define the initial state using that type
const initialState: IRegisterSlice = {
  isOpen: false,
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    isRegisterOpen: (state, action) => {
      state.isOpen = action.payload
    },
  }
})

export const { isRegisterOpen } = registerSlice.actions

export default registerSlice.reducer

export const registerOpen = (state: RootState) => state.register.isOpen
