import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { ReactNode, useMemo } from 'react'

interface IProps {
  href: string
  icon: ReactNode
}

const BottomNavLink = ({ href, icon } : IProps) => {
  const router = useRouter()

  const isCurrentPage = useMemo(() => {
    return router.route === href || (href === '/vote' && router.route.indexOf('vote') === 1)
  }, [href, router.route])

  return (
    <Link href={href} className={isCurrentPage ? 'active' : undefined}>
      {icon}
    </Link>
  )
}

export default BottomNavLink
