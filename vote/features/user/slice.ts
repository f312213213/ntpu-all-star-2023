import {
  EUserStatus,
  IState
} from './interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: IState = {
  status: EUserStatus.INITIAL,
  user: {
    username: '',
    uid: '',
  },
}

const appSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.status = EUserStatus.SUCCESS
      state.user = action.payload
    },
    userLogout: (state) => {
      state.user = initialState.user
      state.status = EUserStatus.INITIAL
    },
  },
})

export const {
  userLogin,
  userLogout,
} = appSlice.actions

export default appSlice
