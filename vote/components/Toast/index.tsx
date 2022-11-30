import { FaTimes } from 'react-icons/fa'
import React from 'react'
import * as T from '@radix-ui/react-toast'

import { closeToast } from '@/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/features/store'

const Toast = () => {
  const toast = useAppSelector(state => state.app.toast)
  const dispatch = useAppDispatch()

  const parseCloseToast = (open: boolean) => {
    if (!open) {
      dispatch(closeToast())
    }
  }

  const renderClass = () => {
    return `alert ${toast.type}-toast shadow-lg w-96 m-4`
  }

  return (
    <T.Provider swipeDirection={'right'}>
      <T.Root
        open={!!toast.title}
        onOpenChange={parseCloseToast}
        className={renderClass()}
      >
        <div className={'px-4 flex justify-between w-full'} >
          <T.Title>
            {toast.title}
          </T.Title>

          <T.Close >
            <span className={'btn btn-ghost btn-sm btn-circle dark:hover:bg-gray-200/50'}>
              <FaTimes />
            </span>
          </T.Close>
        </div>
      </T.Root>
      <T.Viewport className={'fixed bottom-0 right-0 z-50'} />
    </T.Provider>
  )
}

export default Toast
