import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineHowToVote } from 'react-icons/md'
import React from 'react'

import { EDialogType } from '@/vote/features/app/interface'
import { ILoginAction } from '@/vote/features/user/interface'
import { isLoginSelector } from '@/vote/features/user/selector'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import BottomNavLink from '@/vote/components/Footer/components/BottomNavLink'
import useIsMobile from '@/vote/hooks/useIsMobile'
import useLoginAction from '@/vote/hooks/login/useLoginAction'

const Footer = () => {
  const isMobile = useIsMobile()
  const isLogin = useAppSelector(isLoginSelector)
  const dispatch = useAppDispatch()
  const { loginAction } = useLoginAction()

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
                    onConfirm: (inputState: ILoginAction) => loginAction(inputState),
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
      <div className={'items-center grid-flow-col'}>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
      <div className={'grid-flow-col gap-4 md:place-self-center md:justify-self-end'}>
        <p>
        Design and build by
          <a className={'text-blue-50'} href={'https://chiendavid.com'} target={'_blank'} rel={'noreferrer'}>
            David
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
