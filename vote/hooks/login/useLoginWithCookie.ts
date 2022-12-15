import { EToastType } from '@/vote/features/app/interface'
import { closeBackdrop, openToast, showBackdrop } from '@/vote/features/app/slice'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { isLoginSelector } from '@/vote/features/user/selector'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { userLogin } from '@/vote/features/user/slice'
import React, { useEffect } from 'react'
import useApiHandler from '@/vote/hooks/useApiHandler'

const useLoginWithCookie = () => {
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(isLoginSelector)
  const auth = getAuth()
  const signIn = async () => {
    if (isLogin) return

    const cookies = Object.fromEntries(document.cookie.split('; ').map(c => c.split('=')))
    const { stdla } = cookies

    if (!stdla) return

    try {
      dispatch(showBackdrop())
      const signInResult = await signInWithCustomToken(auth, stdla)
      const user = signInResult.user
      dispatch(userLogin(user))

      dispatch(closeBackdrop())
    } catch (e) {
      dispatch(openToast({
        type: EToastType.ERROR,
        title: '登入已過期！',
      }))
      document.cookie = 'stdla=;Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      dispatch(closeBackdrop())
    }
  }
  useEffect(() => {
    signIn()
  }, [])
}

export default useLoginWithCookie
