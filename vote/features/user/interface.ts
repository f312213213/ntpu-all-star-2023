export enum EUserStatus {
  INITIAL= 'INITIAL',
  SUCCESS= 'SUCCESS',
  FAILURE= 'FAILURE',
  PENDING= 'PENDING',
}

export interface IState {
  status: EUserStatus
  user: {
    uid: string
    displayName?: string
    photoURL?: string
    votedPlayer?: {
      [key: string]: boolean
    }
  }
}

export interface ILoginAction {
  username: string
  uid: string
}
