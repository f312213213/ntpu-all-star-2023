import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { EUserStatus, ILoginAction } from '@/vote/features/user/interface'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { MdOutlineHowToVote } from 'react-icons/md'
import { Menu, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { closeBackdrop, closeDialog, openDialog, openToast, showBackdrop } from '@/vote/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { userLogin, userLogout } from '@/vote/features/user/slice'
import React, { Fragment } from 'react'
import useApiHandler from '@/vote/hooks/useApiHandler'
import useIsMobile from '@/vote/hooks/useIsMobile'

const DropdownSiteMenu = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()
  const apiHandler = useApiHandler()

  const loginAction = async (inputState: ILoginAction) => {
    dispatch(showBackdrop())
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    try {
      const data = await apiHandler({
        apiRoute: '/api/login',
        needAuth: false,
        options: {
          method: 'post',
          body: JSON.stringify(inputState),
          headers,
        },
      })

      const { user } = data.data

      dispatch(userLogin(user))
      dispatch(closeDialog({
        type: EDialogType.INPUT,
      }))
      dispatch(closeBackdrop())

      dispatch(openToast({
        type: EToastType.SUCCESS,
        title: '登入成功',
      }))
    } catch (e) {
      dispatch(closeBackdrop())
      dispatch(openToast({
        type: EToastType.ERROR,
        title: '錯誤的帳號密碼',
      }))
    }
  }

  const logoutAction = () => {
    dispatch(showBackdrop())
    dispatch(userLogout())
    setTimeout(() => {
      dispatch(closeBackdrop())
    }, 300)
  }

  return (
    <div className={' text-right'}>
      <Menu as={'div'} className={'relative inline-block text-left'}>
        <div>
          <Menu.Button className={'btn btn-circle inline-flex w-full justify-center rounded-full bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'}>
            <div className={'avatar placeholder'}>
              <div className={'bg-neutral-focus text-neutral-content rounded-full w-12'}>
                <span className={'text-3xl'}>
                  {
                    isMobile
                      ? <RiArrowDropDownLine />
                      : <AiOutlineUser />
                  }
                </span>
              </div>
            </div>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter={'transition ease-out duration-100'}
          enterFrom={'transform opacity-0 scale-95'}
          enterTo={'transform opacity-100 scale-100'}
          leave={'transition ease-in duration-75'}
          leaveFrom={'transform opacity-100 scale-100'}
          leaveTo={'transform opacity-0 scale-95'}
        >
          <Menu.Items className={'absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'}>
            <div className={'px-1 py-1 '}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineHome
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    首頁
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className={'px-1 py-1'}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <MdOutlineHowToVote
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    投票
                  </button>
                )}
              </Menu.Item>
            </div>

            <div className={'px-1 py-1'}>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineUser
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    個人頁面
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => {
                  if (user.status === EUserStatus.SUCCESS) {
                    return <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={logoutAction}
                    >
                      <FiLogIn
                        className={'mr-2 h-5 w-5 text-violet-400'}
                        aria-hidden={'true'}
                      />
                      登出
                    </button>
                  }
                  return (
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => {
                        dispatch(openDialog({
                          title: '登入',
                          type: EDialogType.INPUT,
                          autoClose: false,
                          content: [
                            {
                              type: 'text',
                              name: 'username',
                              placeholder: '學號',
                            },
                            {
                              type: 'password',
                              name: 'password',
                              placeholder: '密碼',
                            },
                          ],
                          onConfirm: (inputState: ILoginAction) => loginAction(inputState),
                        }))
                      }}
                    >
                      <FiLogOut
                        className={'mr-2 h-5 w-5 text-violet-400'}
                        aria-hidden={'true'}
                      />
                      登入
                    </button>
                  )
                }}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropdownSiteMenu
