import { EUserStatus } from '@/vote/features/user/interface'
import { RootState } from '@/vote/features/store'

export const isLoginSelector = (state: RootState) => state.user.status === EUserStatus.SUCCESS && !!state.user.user.uid

export const userInfoSelector = (state: RootState) => state.user.user

export const userVoteRecordSelector = (state: RootState) => state.user.user.votedPlayer

export const currentPlayerIsVotedSelector = (playerId: string) => (state: RootState) => state.user.user.votedPlayer?.[playerId]
