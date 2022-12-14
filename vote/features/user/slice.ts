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
      const {
        uid = '',
        username = '',
        photoURL = '',
        displayName = '',
      } = action.payload
      state.status = EUserStatus.SUCCESS
      state.user.username = displayName
      state.user.photoURL = photoURL
      state.user.uid = uid
      state.user.displayName = displayName
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
