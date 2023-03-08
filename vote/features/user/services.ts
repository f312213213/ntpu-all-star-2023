import { AppDispatch, RootState } from '@/vote/features/store'
import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { closeBackdrop, closeDialog, openToast, showBackdrop } from '@/vote/features/app/slice'
import { deleteCookie, setCookie } from '@/vote/utilis/auth'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { userLogin, userLogout } from '@/vote/features/user/slice'
import apiRequest, { EApiMethod, setupApiCallerAuth } from '@/vote/apis/apiClient'

export const loginAction = (inputState: ILoginAction) => async (dispatch: AppDispatch, getState: () => RootState) => {
  dispatch(showBackdrop())
  const auth = getAuth()
  try {
    const { data } = await apiRequest({
      endpoint: '/api/login',
      method: EApiMethod.POST,
      data: inputState,
    })

    const { user: { customToken } } = data

    const signInResult = await signInWithCustomToken(auth, customToken)
    const user = signInResult.user
    const accessToken = await user.getIdToken()
    setCookie('accessToken', accessToken, 1 / 24)

    dispatch(userLogin(data.user))

    setupApiCallerAuth({ accessToken })

    dispatch(closeDialog({
      type: EDialogType.INPUT,
    }))

    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '登入成功',
    }))
  } catch (e) {
    console.log(e)
    dispatch(openToast({
      type: EToastType.ERROR,
      title: '錯誤的帳號密碼',
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
