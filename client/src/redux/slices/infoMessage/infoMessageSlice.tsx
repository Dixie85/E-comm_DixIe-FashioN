import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";


// Defineing a type for the LoginSlice state
interface IInfoMessageSlice {
  isMessageOpen: boolean,
  message: string,
  isError: boolean,     
}

// Define the initial state using that type
const initialState: IInfoMessageSlice = {
  isMessageOpen: false,
  message: '',
  isError: false,
};

const infoMessageSlice = createSlice({
  name: 'infoMessage',
  initialState,
  reducers: {
    isInfoMessageOpen: (state, action) => {
          console.log(action.payload, 'isInfoMessageOpen' );        
          state.isMessageOpen = action.payload.isOpen
          state.message = action.payload.message
          state.isError = action.payload.isError
      },
  }
})

export const { isInfoMessageOpen } = infoMessageSlice.actions

export default infoMessageSlice.reducer

export const infoMessageOpen = (state: RootState ) => state.infoMessage