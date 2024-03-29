import { AppDispatch, RootState } from '@/vote/features/store'
import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { closeBackdrop, closeDialog, openToast, showBackdrop } from '@/vote/features/app/slice'
import { deleteCookie, setCookie } from '@/vote/utilis/auth'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { sendGALog } from '@/vote/features/app/services'
import { userLogin, userLogout } from '@/vote/features/user/slice'
import apiRequest, { EApiMethod, setupApiCallerAuth } from '@/vote/apis/apiClient'
import omit from 'lodash/omit'

export const loginAction = (inputState: ILoginAction) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(showBackdrop())
  const auth = getAuth()
  try {
    const { data } = await apiRequest({
      endpoint: '/api/login',
      method: EApiMethod.POST,
      data: inputState,
    })

    if (data?.response?.status === 503) {
      throw Error('驗證伺服器故障！')
    }

    if (data?.response?.status === 403) {
      throw Error('錯誤的帳號密碼！')
    }

    const { user: { customToken } } = data

    const signInResult = await signInWithCustomToken(auth, customToken)
    const user = signInResult.user
    const accessToken = await user.getIdToken()
    setCookie('accessToken', accessToken, 1 / 24)

    dispatch(userLogin(omit(data.user, 'customToken')))

    setupApiCallerAuth({ accessToken })

    dispatch(closeDialog({
      type: EDialogType.INPUT,
    }))

    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '登入成功',
    }))

    dispatch(sendGALog({
      eventName: 'login-success',
    }))
  } catch (e) {
    dispatch(openToast({
      type: EToastType.ERROR,
      // @ts-ignore
      title: e.message,
    }))

    dispatch(sendGALog({
      eventName: 'login-failed',
    }))
  }
  dispatch(closeBackdrop())
}

export const logoutAction = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(showBackdrop())
  dispatch(userLogout())
  deleteCookie('accessToken')
  setTimeout(() => {
    dispatch(closeBackdrop())
    window.location.reload()
  }, 300)
}
