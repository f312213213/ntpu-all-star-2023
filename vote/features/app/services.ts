import { AppDispatch, RootState } from '@/vote/features/store'
import { closeBackdrop, initSystemTime, showBackdrop } from '@/vote/features/app/slice'
import { deleteCookie, getCookie } from '@/vote/utilis/auth'
import { logoutAction } from '@/vote/features/user/services'
import { userLogin } from '@/vote/features/user/slice'
import apiRequest, { setupApiCallerAuth } from '@/vote/apis/apiClient'

export const initApp = () => async (dispatch: AppDispatch, getState: () => RootState) => {
  const accessToken = getCookie('accessToken')

  const { data: { timestamp, startTimeStamp, endTimeStamp } } = await apiRequest({
    endpoint: '/api/system-config',
  })
  dispatch(initSystemTime({ systemTimestamp: timestamp, startTimeStamp, endTimeStamp }))

  if (!accessToken) return
  setupApiCallerAuth({ accessToken })
  dispatch(showBackdrop())
  try {
    const { data } = await apiRequest({
      endpoint: '/api/me',
    })
    dispatch(userLogin(data.user))
  } catch (e) {
    // 這組 accessToken 有問題，直接清除
    deleteCookie('accessToken')
    dispatch(logoutAction())
  }
  dispatch(closeBackdrop())
}

interface IGA {
  eventName: string
  eventDetail?: any
}

export const sendGALog = ({ eventName, eventDetail }: IGA) => async () => {
  window.gtag('event', eventName, eventDetail)
}
