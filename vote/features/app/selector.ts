import { EDialogType } from '@/vote/features/app/interface'
import { RootState } from '@/vote/features/store'
import { createSelector } from '@reduxjs/toolkit'

export const isAlertDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.ALERT].open,
  (open) => open
)

export const isInfoDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.INFO].open,
  (open) => open
)

export const isInputDialogOpenSelector = createSelector(
  (state: RootState) => state.app.dialog[EDialogType.INPUT].open,
  (open) => open
)

export const systemTimestampSelector = (state: RootState) => state.app.time
