import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { EDialogType } from '@/vote/features/app/interface'
import { EUserStatus, ILoginAction } from '@/vote/features/user/interface'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { MdOutlineHowToVote } from 'react-icons/md'
import { Menu, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { isLoginSelector } from '@/vote/features/user/selector'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import Link from 'next/link'
import React, { Fragment } from 'react'
import useIsMobile from '@/vote/hooks/useIsMobile'
import useLoginAction from '@/vote/hooks/login/useLoginAction'

const DropdownSiteMenu = () => {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const isLogin = useAppSelector(isLoginSelector)
  const { loginAction, logoutAction } = useLoginAction()

  return (
    <div className={' text-right'}>
      <Menu as={'div'} className={'relative inline-block text-left'}>
        <div>
          {
            isLogin
              ? (
                <Menu.Button className={'btn btn-ghost inline-flex w-full justify-center bg-opacity-20 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'}>
                  <p className={'flex gap-1 items-center'}>
                    Hi, {user.user.username} <span className={'scale-125'}><RiArrowDropDownLine /></span>
                  </p>
                </Menu.Button>
                )
              : <button
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
                  className={'btn btn-ghost'}>
                  登入
                </button>
          }
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
                  <Link
                    href={'/'}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineHome
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    首頁
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className={'px-1 py-1'}>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={'/vote'}
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <MdOutlineHowToVote
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    投票
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className={'px-1 py-1'}>
              {
                isLogin && (
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href={'/me'}
                        className={`${
                          active ? 'bg-violet-500 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        <AiOutlineUser
                          className={'mr-2 h-5 w-5 text-violet-400'}
                          aria-hidden={'true'}
                        />
                        個人頁面
                      </Link>
                    )}
                  </Menu.Item>
                )
              }
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
