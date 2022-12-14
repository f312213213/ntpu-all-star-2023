import React from 'react'

import { EDialogType } from '@/vote/features/app/interface'
import { useAppSelector } from '@/vote/features/store'
import DialogBase from '@/vote/components/Dialogs/DialogBase'

const InfoDialog = () => {
  const infoDialog = useAppSelector(state => state.app.dialog[EDialogType.INFO])

  return (
    <DialogBase
      open={infoDialog.open}
      type={EDialogType.INFO}
      title={infoDialog.title}
      content={infoDialog.content}
      autoClose={infoDialog.autoClose}
      successAction={() => {
      }}
    />
  )
}

export default InfoDialog
