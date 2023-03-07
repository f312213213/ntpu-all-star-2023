import { initApp } from '@/vote/features/app/services'
import { useAppDispatch } from '@/vote/features/store'
import { useEffect } from 'react'
import useIsMounted from '@/vote/hooks/useIsMounted'

const Init = () => {
  const isMounted = useIsMounted()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (!isMounted) return
    dispatch(initApp())
  }, [isMounted])
  return null
}

export default Init
