import { ReactNode } from 'react'

export enum EAppStatus {
  INITIAL= 'INITIAL',
  SUCCESS= 'SUCCESS',
  FAILURE= 'FAILURE',
  PENDING= 'PENDING',
}

export interface IBasicDialog {
  open: boolean
  title: string
  content?: string | ReactNode | {
    type: string
    name: string
    placeholder: string
  }[]
  onDialogLoad?: () => void,
  onDialogClose?: () => void,
  autoClose: boolean
}

export enum EDialogType {
  ALERT = 'ALERT',
  INFO = 'INFO',
  INPUT = 'INPUT'
}

export interface IAlertDialog extends IBasicDialog {
  onConfirm?: (onConfirmData?: {}) => void,
}

export interface IInfoDialog extends IBasicDialog {
}

export interface IInputDialog extends IBasicDialog {
  onConfirm?: (onConfirmData?: {}) => void,
}

export enum EToastType {
  INITIAL = 'INITIAL',
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface IToast {
  type: EToastType
  title: string
}

export interface IDialog {
  [EDialogType.ALERT]: IAlertDialog
  [EDialogType.INFO]: IInfoDialog
  [EDialogType.INPUT]: IInputDialog
}

export interface IState {
  status: EAppStatus
  dialog: IDialog
  toast: IToast
  backdrop: {
    show: boolean
  }
  breadcrumbConfig: {

  }
}

export interface IOpenDialogAction {
  title: string
  type: EDialogType
  content?: string | ReactNode | {
    type: string
    name: string
    placeholder: string
  }[],
  onDialogLoad?: () => void
  onDialogClose?: () => void
  onConfirm?: any
  autoClose?: boolean
}

export interface ICloseDialogAction {
  type: EDialogType
}
