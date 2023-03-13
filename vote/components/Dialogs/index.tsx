import { isAlertDialogOpenSelector, isInfoDialogOpenSelector, isInputDialogOpenSelector } from '@/vote/features/app/selector'
import { useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import React from 'react'
import dynamic from 'next/dynamic'

const AlertDialog = dynamic(() => import('./AlertDialog'))
const InfoDialog = dynamic(() => import('./InfoDialog'))
const InputDialog = dynamic(() => import('./InputDialog'))
const ScreenSinglePlayer = dynamic(() => import('../ScreenSinglePlayer'))

const Dialogs = () => {
  const router = useRouter()
  const isAlertDialogOpen = useAppSelector(isAlertDialogOpenSelector)
  const isInfoDialogOpen = useAppSelector(isInfoDialogOpenSelector)
  const isInputDialogOpen = useAppSelector(isInputDialogOpenSelector)
  const isPlayerDialogOpen = router?.query?.modalPlayerId
  return (
    <>
      {isAlertDialogOpen && <AlertDialog/>}
      {isInfoDialogOpen && <InfoDialog/>}
      {isInputDialogOpen && <InputDialog/>}
      {isPlayerDialogOpen && <ScreenSinglePlayer />}
    </>
  )
}

export default Dialogs
