import { useSelector } from 'react-redux'
import React from 'react'

import { EDialogType } from '@/vote/features/app/interface'
import { RootState } from '@/vote/features/store'
import DialogBase from '@/vote/components/Dialogs/DialogBase'

const AlertDialog = () => {
  const alertDialog = useSelector((state: RootState) => state.app.dialog[EDialogType.ALERT])

  return (
    <DialogBase
      open={alertDialog.open}
      type={EDialogType.ALERT}
      title={alertDialog.title}
      content={alertDialog.content}
      successAction={() => {
        if (alertDialog.onConfirm) {
          alertDialog.onConfirm()
        }
      }}
      cancelAction={() => {
      }}
    />
  )
}

export default AlertDialog
