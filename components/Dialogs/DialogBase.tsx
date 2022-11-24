import { Dialog, Transition } from '@headlessui/react'
import { EDialogType, IBasicDialog } from '@/features/app/interface'
import { closeDialog } from '@/features/app/slice'
import { useDispatch } from 'react-redux'
import React from 'react'

interface IProps extends IBasicDialog {
  type: EDialogType
  successAction?: () => void
  cancelAction?: () => void
}

const DialogBase = ({ open, type, title, content, successAction, cancelAction }: IProps) => {
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(closeDialog({ type }))
  }
  return (
    <Transition appear show={open} as={React.Fragment}>
      <Dialog as={'div'} className={'relative z-10 select-none'} onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter={'ease-out duration-300'}
          enterFrom={'opacity-0'}
          enterTo={'opacity-100'}
          leave={'ease-in duration-200'}
          leaveFrom={'opacity-100'}
          leaveTo={'opacity-0'}
        >
          <div className={'fixed inset-0 bg-black bg-opacity-25'} />
        </Transition.Child>

        <div className={'fixed inset-0 overflow-y-auto'}>
          <div className={'flex min-h-full items-center justify-center p-4 text-center'}>
            <Transition.Child
              as={React.Fragment}
              enter={'ease-out duration-300'}
              enterFrom={'opacity-0 scale-95'}
              enterTo={'opacity-100 scale-100'}
              leave={'ease-in duration-200'}
              leaveFrom={'opacity-100 scale-100'}
              leaveTo={'opacity-0 scale-95'}
            >
              <Dialog.Panel className={'w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all text-center'}>
                <DialogTitle title={title} />
                <DialogContent content={content} />
                <DialogButton
                  success={
                    successAction
                      ? () => {
                          successAction()
                          closeModal()
                        }
                      : undefined
                  }
                  cancel={
                    cancelAction
                      ? () => {
                          cancelAction()
                          closeModal()
                        }
                      : undefined
                  }
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DialogBase

export const DialogTitle = ({ title }: { title: string }) => {
  return (
    <Dialog.Title
      as={'h3'}
      className={'text-lg font-medium leading-6 text-gray-900'}
    >
      {title}
    </Dialog.Title>
  )
}

export const DialogContent = ({ content }: { content: string | React.ReactNode }) => {
  return (
    <div className={'mt-2 text-base text-gray-500'}>
      {content ?? ''}
    </div>
  )
}

export const DialogButton = ({ success, cancel }: { success?: () => void, cancel?: () => void }) => {
  return (
    <div className={'mt-4 flex justify-center space-x-4'}>
      {
        cancel && (
          <button
            className={'btn btn-error btn-sm shadow-xl'}
            onClick={
              () => {
                cancel()
              }
            }
          >
            取消
          </button>
        )
      }

      {
        success && (
          <button
            className={'btn btn-success btn-sm shadow-xl'}
            onClick={() => {
              success()
            }}
          >
            確認
          </button>
        )
      }
    </div>
  )
}
