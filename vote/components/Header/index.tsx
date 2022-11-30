import { BsSearch } from 'react-icons/bs'
import DropdownSiteMenu from '@/components/Header/components/DropdownSiteMenu'
import Link from 'next/link'
import React from 'react'
import useIsMobile from '@/hooks/useIsMobile'

const Header = () => {
  return (
    <nav className={'navbar bg-base-100 z-10 fixed shadow-xl top-0 max-h-16'}>
      <div className={'flex-1'}>
        <Link href={'/'}>
          <span className={'btn btn-ghost normal-case text-xl'}>北大明星賽 2023</span>
        </Link>
      </div>
      <div className={'flex-none'}>
        <DropdownSiteMenu />
      </div>
    </nav>
  )
}

export default Header
