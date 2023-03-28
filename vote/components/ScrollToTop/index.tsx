import { FaArrowUp } from 'react-icons/fa'
import { sendGALog } from '@/vote/features/app/services'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import useIsMobile from '@/vote/hooks/useIsMobile'

const ScrollToTopButton = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(sendGALog({
      eventName: 'scroll-to-top',
    }))
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (!router.pathname.includes('sport')) return null

  return (
    <button title={'scroll-to-top'} className={'btn btn-circle btn-md fixed right-4 bottom-4'} style={{ marginBottom: isMobile ? '64px' : 0 }} onClick={onClick}>
      <span className={'text-2xl'}>
        <FaArrowUp />
      </span>
    </button>
  )
}

export default ScrollToTopButton
