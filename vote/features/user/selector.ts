import { EUserStatus } from '@/vote/features/user/interface'
import { RootState } from '@/vote/features/store'
import { sectionVoteLimit } from '@/vote/constants/vote'

export const isLoginSelector = (state: RootState) => state.user.status === EUserStatus.SUCCESS && !!state.user.user.uid

export const userInfoSelector = (state: RootState) => state.user.user

export const userVoteRecordSelector = (state: RootState) => state.user.user.votedPlayer

export const currentPlayerIsVotedSelector = (playerId: string) => (state: RootState) => state.user.user.votedPlayer?.[playerId]

// @ts-ignore
export const currentSectionIsUpToLimitSelector = (section: string) => (state: RootState) => state.user?.user[section] >= sectionVoteLimit[section] ?? true

// @ts-ignore
export const currentSectionVoteLeftSelector = (section: string) => (state: RootState) => sectionVoteLimit[section] - state.user?.user[section] ?? 0
