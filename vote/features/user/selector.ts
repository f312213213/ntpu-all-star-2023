import { EUserStatus } from '@/vote/features/user/interface'
import { RootState } from '@/vote/features/store'

export const isLoginSelector = (state: RootState) => state.user.status === EUserStatus.SUCCESS && !!state.user.user.uid

export const userInfoSelector = (state: RootState) => state.user.user
