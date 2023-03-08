import { ESports, sportMap } from '@/vote/constants/sports'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useMemo } from 'react'

const Breadcrumbs = () => {
  const router = useRouter()
  const sportType = router.query.sport
  const gender = router.query.gender

  const getSportTypeText = useMemo(() => {
    // @ts-ignore
    return sportMap[sportType]
  }, [sportType])

  const getGenderText = useMemo(() => {
    if (gender === 'male') return '男'
    if (gender === 'female') return '女'
  }, [gender])

  if (!sportType || router.asPath.indexOf('vote') === -1) return null
  return (
    <div className={'text-sm breadcrumbs'}>
      <ul>
        <li>
          <Link href={'/vote'}>
            投票
          </Link>
        </li>

        <li>
          <Link href={`/vote/${sportType}`}>
            {getSportTypeText}
          </Link>
        </li>

        {
          gender && router.pathname.indexOf('gender') !== -1 && (
            <li>
              <Link href={`/vote/${sportType}/${gender}${sportType === ESports.VOLLEYBALL ? '/' : '/candidates'}`}>
                {getGenderText}
              </Link>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Breadcrumbs
