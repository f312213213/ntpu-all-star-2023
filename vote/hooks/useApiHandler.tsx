import { closeBackdrop, openToast, showBackdrop } from '@/vote/features/app/slice'
import { useAppSelector } from '@/vote/features/store'
import { useDispatch } from 'react-redux'
import React from 'react'

interface IApiHandlerProp {
  apiRoute: string
  needAuth?: boolean
  options?: {}
  searchParam?: {}
}

interface IApiHandlerReturn {
  apiRoute: string
  needAuth?: boolean
  options?: {}
  searchParam?: {}
}

const useApiHandler = () => {
  const dispatch = useDispatch()
  const user = useAppSelector(state => state.user)

  return React.useCallback(async ({
    apiRoute,
    needAuth = true,
    options = {},
    searchParam = {},
  }: IApiHandlerProp) => {
    if (needAuth && !user.user.uid) {
      dispatch(openToast({
        type: 'error',
        title: '尚未登入！',
      }))
      return {
        isSuccess: false,
        loading: false,
        data: undefined,
      }
    }
    dispatch(showBackdrop())
    try {
      const url = new URL(apiRoute, new URL(process.env.NEXT_PUBLIC_API_BASE_URL || ''))
      const searchParamKeys = Object.keys(searchParam)
      searchParamKeys.forEach(key => {
        // @ts-ignore
        if (searchParam[key]) {
          // @ts-ignore
          url.searchParams.set(key, searchParam[key])
        }
      })
      const response = await fetch(url.toString(), {
        ...options,
        headers: {
          'content-type': 'application/json',
        },
      })
      if (response.status !== 200) {
        throw Error(response.statusText)
      }
      const data = await response.json()

      dispatch(closeBackdrop())
      return {
        isSuccess: true,
        loading: false,
        data,
      }
    } catch (error: any) {
      dispatch(openToast({
        type: 'error',
        title: error.toString(),
      }))
      dispatch(closeBackdrop())
    }

    return {
      isSuccess: false,
      loading: false,
      data: undefined,
    }
  }, [dispatch, user.user.uid])
}

export default useApiHandler
