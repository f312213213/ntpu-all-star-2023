export enum EUserStatus {
  INITIAL= 'INITIAL',
  SUCCESS= 'SUCCESS',
  FAILURE= 'FAILURE',
  PENDING= 'PENDING',
}

export interface IState {
  status: EUserStatus
  user: {
    username: string
    uid: string
    displayName?: string
    photoURL?: string
  }
}

export interface ILoginAction {
  username: string
  uid: string
}
