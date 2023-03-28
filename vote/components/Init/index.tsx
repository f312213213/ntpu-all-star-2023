import { EDialogType } from '@/vote/features/app/interface'
import { getAnalytics } from 'firebase/analytics'
import { initApp } from '@/vote/features/app/services'
import { initializeApp } from 'firebase/app'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch } from '@/vote/features/store'
import { useEffect } from 'react'
import useIsMounted from '@/vote/hooks/useIsMounted'

const Init = () => {
  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  })
  getAnalytics(app)

  const isMounted = useIsMounted()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isMounted) return
    const isFirstTimeEnter = !localStorage.ALL_STAR_RECORD
    if (isFirstTimeEnter) {
      localStorage.ALL_STAR_RECORD = Date.now()
      dispatch(openDialog({
        type: EDialogType.INFO,
        title: '提示',
        content: (
          <div className={'w-full flex justify-center'}>
            <div className={'w-3/5'}>
              <ol className={'list-decimal text-left gap-0.5'}>
                <li>帳號密碼與學生資訊系統相同</li>
                <li>各分區剩餘票數皆顯示在畫面最上方</li>
                <li>登入後方能投票</li>
                <li>投完票後可至投票記錄頁面取消投票</li>
              </ol>
            </div>
          </div>
        ),
      }))
    }
    dispatch(initApp())
  }, [isMounted])

  return null
}

export default Init
