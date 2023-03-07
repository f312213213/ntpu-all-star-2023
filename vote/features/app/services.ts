import { AppDispatch, RootState } from '@/vote/features/store'
import { closeBackdrop, showBackdrop } from '@/vote/features/app/slice'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { getCookie, setCookie } from '@/vote/utilis/auth'
import { userLogin } from '@/vote/features/user/slice'
import apiRequest, { setupApiCallerAuth } from '@/vote/apis/apiClient'

export const initApp = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const auth = getAuth()
  const customToken = getCookie('customToken')
  if (!customToken) return
  dispatch(showBackdrop())
  const signInResult = await signInWithCustomToken(auth, customToken)
  const user = signInResult.user
  const accessToken = await user.getIdToken()
  setCookie('accessToken', accessToken, 5)
  dispatch(userLogin(user))
  setupApiCallerAuth({ accessToken })
  const { data } = await apiRequest({
    endpoint: '/api/me',
  })
  // get accessToken from cookie
  const idToken = getCookie('accessToken')

  dispatch(closeBackdrop())
}
