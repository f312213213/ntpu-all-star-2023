import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineHowToVote } from 'react-icons/md'
import React from 'react'

import BottomNavLink from '@/vote/components/Footer/components/BottomNavLink'
import Link from 'next/link'
import useIsMobile from '@/vote/hooks/useIsMobile'

const Footer = () => {
  const isMobile = useIsMobile()

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
        <BottomNavLink
          href={'/me'}
          icon={<AiOutlineUser />}
        />
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
