import { isAlertDialogOpenSelector, isInfoDialogOpenSelector, isInputDialogOpenSelector } from '@/features/app/selector'
import { useAppSelector } from '@/features/store'
import React from 'react'
import dynamic from 'next/dynamic'

const AlertDialog = dynamic(() => import('./AlertDialog'))
const InfoDialog = dynamic(() => import('./InfoDialog'))
const InputDialog = dynamic(() => import('./InputDialog'))

const Dialogs = () => {
  const isAlertDialogOpen = useAppSelector(isAlertDialogOpenSelector)
  const isInfoDialogOpen = useAppSelector(isInfoDialogOpenSelector)
  const isInputDialogOpen = useAppSelector(isInputDialogOpenSelector)
  return (
    <>
      {isAlertDialogOpen && <AlertDialog/>}
      {isInfoDialogOpen && <InfoDialog/>}
      {isInputDialogOpen && <InputDialog/>}
    </>
  )
}

export default Dialogs
