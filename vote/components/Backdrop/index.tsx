import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useAppSelector } from '../../features/store'
import React from 'react'
import usePageScrollLock from '@/vote/hooks/usePageScrollLock'

const Backdrop = () => {
  const show = useAppSelector(state => state.app.backdrop.show)

  usePageScrollLock(show)

  if (!show) return null

  return (
    <div className={'z-50 top-0 fixed w-full h-screen overflow-hidden flex justify-center items-center bg-gray-800/50'}>
      <span className={'text-2xl animate-spin text-gray-100'}>
        <AiOutlineLoading3Quarters />
      </span>
    </div>
  )
}

export default Backdrop
