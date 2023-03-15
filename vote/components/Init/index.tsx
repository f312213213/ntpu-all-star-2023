import { getAnalytics } from 'firebase/analytics'
import { initApp } from '@/vote/features/app/services'
import { initializeApp } from 'firebase/app'
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
    dispatch(initApp())
  }, [isMounted])

  return null
}

export default Init
