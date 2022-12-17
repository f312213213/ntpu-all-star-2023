import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { closeBackdrop, closeDialog, initApp, openToast, showBackdrop } from '@/vote/features/app/slice'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { userLogin } from '@/vote/features/user/slice'

export const getNumber = createAsyncThunk(
  'app/getNumber',
  async (input, { dispatch, getState, rejectWithValue, fulfillWithValue }) => {
    dispatch(showBackdrop())
    try {
      const response = await fetch('https://counter-tmqvi7b1k-f312213213.vercel.app/')
      dispatch(closeBackdrop())
      if (!response.ok) {
        return rejectWithValue(response.status)
      }
      const number = await response.json()
      fulfillWithValue(number)
    } catch (err: any) {
      rejectWithValue(err.message)
    }
    dispatch(initApp())
  }
)
