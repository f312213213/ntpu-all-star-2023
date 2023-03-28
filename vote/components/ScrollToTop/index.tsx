import { FaArrowUp } from 'react-icons/fa'
import { useRouter } from 'next/router'

const ScrollToTopButton = () => {
  const router = useRouter()
  const onClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (!router.pathname.includes('sport')) return null

  return (
    <button className={'btn btn-circle btn-md fixed right-4 bottom-4'} onClick={onClick}>
      <span className={'text-2xl'}>
        <FaArrowUp />
      </span>
    </button>
  )
}

export default ScrollToTopButton
