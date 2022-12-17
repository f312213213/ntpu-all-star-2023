import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { closeBackdrop, closeDialog, openToast, showBackdrop } from '@/vote/features/app/slice'
import { useAppDispatch } from '@/vote/features/store'
import { userLogin, userLogout } from '@/vote/features/user/slice'
import React from 'react'
import useApiHandler from '@/vote/hooks/useApiHandler'

const useAccountAction = () => {
  const apiHandler = useApiHandler()
  const dispatch = useAppDispatch()

  const loginAction = async (inputState: ILoginAction) => {
    dispatch(showBackdrop())
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    try {
      const data = await apiHandler({
        apiRoute: '/api/login',
        needAuth: false,
        options: {
          method: 'post',
          body: JSON.stringify(inputState),
          headers,
        },
      })

      const { user } = data.data

      dispatch(userLogin(user))
      dispatch(closeDialog({
        type: EDialogType.INPUT,
      }))
      dispatch(closeBackdrop())

      dispatch(openToast({
        type: EToastType.SUCCESS,
        title: '登入成功',
      }))
    } catch (e) {
      dispatch(closeBackdrop())
      dispatch(openToast({
        type: EToastType.ERROR,
        title: '錯誤的帳號密碼',
      }))
    }
  }

  const logoutAction = () => {
    dispatch(showBackdrop())
    dispatch(userLogout())
    document.cookie = 'stdla=;Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    setTimeout(() => {
      dispatch(closeBackdrop())
      window.location.reload()
    }, 300)
  }
  return {
    loginAction,
    logoutAction,
  }
}

export default useAccountAction
