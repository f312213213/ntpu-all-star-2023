import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineHowToVote } from 'react-icons/md'
import React from 'react'

import { EDialogType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { isLoginSelector } from '@/vote/features/user/selector'
import { loginAction } from '@/vote/features/user/services'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import BottomNavLink from '@/vote/components/Footer/components/BottomNavLink'
import useIsMobile from '@/vote/hooks/useIsMobile'

const Footer = () => {
  const isMobile = useIsMobile()
  const isLogin = useAppSelector(isLoginSelector)
  const dispatch = useAppDispatch()

  if (isMobile) {
    return (
      <div className={'btm-nav'}>
        <BottomNavLink
          href={'/'}
          icon={<AiOutlineHome />}
        />
        <BottomNavLink
          href={'/vote'}
          icon={<MdOutlineHowToVote />}
        />
        {
          isLogin
            ? (
              <BottomNavLink
                href={'/me'}
                icon={<AiOutlineUser />}
              />
              )
            : (
              <button
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
                    onConfirm: (inputState: ILoginAction) => dispatch(loginAction(inputState)),
                  }))
                }}
              >
                <AiOutlineUser />
              </button>
              )
        }
      </div>
    )
  }
  return (
    <footer className={'footer items-center p-4 bg-neutral text-neutral-content'}>
      <div className={'flex justify-between w-full flex-col sm:flex-row items-center'}>
        <p>
          Design and build by {' '}
          <a className={'text-blue-50'} href={'https://chiendavid.com'} target={'_blank'} rel={'noreferrer'}>
            David
          </a>
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  )
}

export default Footer
