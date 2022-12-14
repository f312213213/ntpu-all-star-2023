import { EToastType } from '@/vote/features/app/interface'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { isLoginSelector } from '@/vote/features/user/selector'
import { openToast } from '@/vote/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { userLogin } from '@/vote/features/user/slice'
import React, { useEffect } from 'react'

const useLoginWithCustom = (stdla: string) => {
  const dispatch = useAppDispatch()
  const auth = getAuth()
  const isLogin = useAppSelector(isLoginSelector)
  const signIn = async () => {
    if (isLogin || !stdla) return
    try {
      const signInResult = await signInWithCustomToken(auth, stdla)
      const user = signInResult.user
      dispatch(userLogin(user))
    } catch (e) {
      dispatch(openToast({
        type: EToastType.ERROR,
        title: '登入已過期！',
      }))
    }
  }
  useEffect(() => {
    signIn()
  }, [])
}

export default useLoginWithCustom
