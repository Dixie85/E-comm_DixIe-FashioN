import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";


// Defineing a type for the AuthSlice state
interface IAuthSlice {
  token: string | null
}

// Define the initial state using that type
const initialState: IAuthSlice = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
      setCredentials: (state, action) => {
          const { accessToken } = action.payload
          state.token = accessToken
      },
      logOut: (state, action) => {
          state.token = null
      },
  }
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: RootState ) => state.auth.token