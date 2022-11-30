import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'

interface IProps {
  href: string
  icon: ReactNode
}

const BottomNavLink = ({ href, icon } : IProps) => {
  const router = useRouter()
  const [isCurrentPage, setIsCurrentPage] = useState(false)

  const detectIsCurrentPage = useCallback(() => {
    if (router.route === href) {
      setIsCurrentPage(true)
    } else {
      setIsCurrentPage(false)
    }
  }, [href, router.route])

  useEffect(() => {
    detectIsCurrentPage()
  }, [detectIsCurrentPage])

  return (
    <Link href={href} className={isCurrentPage ? 'active' : undefined}>
      <button >
        {icon}
      </button>
    </Link>
  )
}

export default BottomNavLink
