import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { MdOutlineHowToVote } from 'react-icons/md'
import React from 'react'

import BottomNavLink from '@/components/Footer/components/BottomNavLink'
import Link from 'next/link'
import useIsMobile from '@/hooks/useIsMobile'

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
          href={'/user'}
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
        Design and build by david
        </p>
      </div>
    </footer>
  )
}

export default Footer
