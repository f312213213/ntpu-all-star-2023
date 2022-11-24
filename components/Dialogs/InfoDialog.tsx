import React from 'react'

import { EDialogType } from '@/features/app/interface'
import { useAppSelector } from '@/features/store'
import DialogBase from '@/components/Dialogs/DialogBase'

const InfoDialog = () => {
  const infoDialog = useAppSelector(state => state.app.dialog[EDialogType.INFO])

  return (
    <DialogBase
      open={infoDialog.open}
      type={EDialogType.INFO}
      title={infoDialog.title}
      content={infoDialog.content}
      successAction={() => {
      }}
    />
  )
}

export default InfoDialog
