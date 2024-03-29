import {
  EUserStatus,
  IState
} from './interface'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import omit from 'lodash/omit'

const initialState: IState = {
  status: EUserStatus.INITIAL,
  user: {
    displayName: '',
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
    updateUserVoteRecord: (state, action) => {
      const {
        id,
        sport,
        gender,
        collection,
      } = action.payload
      state.user.votedPlayer = {
        ...state.user.votedPlayer,
        [id]: true,
      }
      // @ts-ignore
      state.user[`${sport}-${gender}-${collection}-voteCount`] = (state.user[`${sport}-${gender}-${collection}-voteCount`] || 0) + 1
    },
    updateUserCancelVoteRecord: (state, action) => {
      const {
        id,
        sport,
        gender,
        collection,
      } = action.payload
      state.user.votedPlayer = omit(state.user.votedPlayer, id)

      // @ts-ignore
      state.user[`${sport}-${gender}-${collection}-voteCount`] = (state.user[`${sport}-${gender}-${collection}-voteCount`] || 0) - 1
    },
  },
})

export const {
  userLogin,
  userLogout,
  updateUserVoteRecord,
  updateUserCancelVoteRecord,
} = appSlice.actions

export default appSlice
