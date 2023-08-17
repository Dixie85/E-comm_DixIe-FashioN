import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";

// Defineing a type for the LoginSlice state
interface ILoginSlice {
  isOpen: boolean
}

// Define the initial state using that type
const initialState: ILoginSlice = {
  isOpen: false,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLoginOpen: (state, action) => {
      state.isOpen = action.payload
    },
  }
})

export const { isLoginOpen } = loginSlice.actions

export default loginSlice.reducer

export const loginOpen = (state: RootState) => state.login.isOpen
