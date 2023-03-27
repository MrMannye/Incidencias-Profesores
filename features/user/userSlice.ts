import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface userState {
  Id: number,
  first_name: string,
  last_name: string,
  second_name: string,
  age: number,
  email: string,
  password: string,
}

// Define the initial state using that type
const initialState: userState = {
    Id: 0,   
    first_name: "",
    last_name: "",
    second_name: "",
    age: 0,
    email: "",
    password: "",
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    saveUser: (state, action: PayloadAction<userState>) => {
      state.Id = action.payload.Id
      state.first_name = action.payload.first_name
      state.last_name = action.payload.last_name
      state.second_name = action.payload.last_name
      state.age = action.payload.age
      state.email = action.payload.email
      state.password = action.payload.password
    },
  },
})

export const { saveUser } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user

export default userSlice.reducer