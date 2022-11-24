import { EDialogType } from '@/features/app/interface'
import { closeBackdrop, initApp, openDialog, showBackdrop } from '@/features/app/slice'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const getNumber = createAsyncThunk(
  'app/getNumber',
  async (input, thunkAPI) => {
    thunkAPI.dispatch(showBackdrop())
    const response = await fetch('https://counter-tmqvi7b1k-f312213213.vercel.app/1231231231')
    const number = await response.json()
    console.log(number, thunkAPI)
    thunkAPI.dispatch(initApp())
    thunkAPI.dispatch(closeBackdrop())
  }
)
