import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineHowToVote } from 'react-icons/md'
import { Menu, Transition } from '@headlessui/react'
import { RiArrowDropDownLine } from 'react-icons/ri'
import React, { Fragment } from 'react'
import useIsMobile from '@/vote/hooks/useIsMobile'

const DropdownSiteMenu = () => {
  const isMobile = useIsMobile()
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
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <FiLogOut
                      className={'mr-2 h-5 w-5 text-violet-400'}
                      aria-hidden={'true'}
                    />
                    登出
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropdownSiteMenu
