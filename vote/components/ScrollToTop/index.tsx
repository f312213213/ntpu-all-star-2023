import { FaArrowUp } from 'react-icons/fa'
import { sendGALog } from '@/vote/features/app/services'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import ScrollToTop from 'react-scroll-up'
import useIsMobile from '@/vote/hooks/useIsMobile'

const ScrollToTopButton = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const onClick = () => {
    dispatch(sendGALog({
      eventName: 'scroll-to-top',
    }))
  }

  if (!router.pathname.includes('sport')) return null

  return (
    <ScrollToTop
      easing={'easeInCubic'}
      showUnder={200}
    >
      <button
        title={'scroll-to-top'}
        className={'btn btn-circle btn-md fixed right-4 bottom-4'}
        style={{ marginBottom: isMobile ? '64px' : 0 }}
        onClick={onClick}
      >
        <span className={'text-2xl'}>
          <FaArrowUp />
        </span>
      </button>
    </ScrollToTop>
  )
}

export default ScrollToTopButton
