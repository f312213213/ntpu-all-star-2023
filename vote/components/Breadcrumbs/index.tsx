import { ECollection, ESports, collectionMap, sportMap } from '@/vote/constants/sports'
import { EGender, genderMap } from '@/vote/constants/gender'
import { IoMdArrowDown } from 'react-icons/io'
import { useRouter } from 'next/router'
import BreadcrumbItem from '@/vote/components/Breadcrumbs/components/BreadcrumbItem'
import Link from 'next/link'
import React, { useMemo } from 'react'
import useIsMobile from '@/vote/hooks/useIsMobile'

const Breadcrumbs = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const sportType = router.query.sport
  const gender = router.query.gender as string
  const collection = router.query.collection as string

  const getSportTypeText = useMemo(() => {
    // @ts-ignore
    return sportMap[sportType]
  }, [sportType])

  const getGenderText = useMemo(() => {
    if (gender === 'male') return '男'
    return '女'
  }, [gender])

  const getCollectionText = useMemo(() => {
    if (collection === ECollection.LIBERO) return '自由球員'
    if (collection === ECollection.SPIKER) return '中間手'
    if (collection === ECollection.EDGELINE) return '邊線攻擊手'
    if (collection === ECollection.SETTER) return '舉球員'
  }, [collection])

  if (!sportType || router.route === '/_error' || router.route === '/me' || !router.asPath.includes('vote')) return null
  return (
    <div className={'text-xl breadcrumbs my-4'}>
      <ul>
        <li>
          <Link href={'/vote'}>
            投票
          </Link>
        </li>

        <li>
          <BreadcrumbItem
            trigger={(
              <Link href={`/vote/${sportType}`} className={'flex items-center gap-1 group'}>
                {getSportTypeText}
                <span className={'text-sm'}>
                  <IoMdArrowDown />
                </span>
              </Link>
            )}
            content={(
              <>
                {Object.keys(sportMap).map((sport) => {
                  const link = (isMobile && sport === 'volleyball') ? `/vote/${sport}/female/edgeline` : `/vote/${sport}`
                  return (
                    <Link href={link} key={sport}>
                      {/* @ts-ignore */}
                      {sportMap[sport]}
                    </Link>
                  )
                })}
              </>
            )}
          />
        </li>

        <li>
          <BreadcrumbItem
            trigger={(
              <Link href={`/vote/${sportType}/${gender || 'female'}`} className={`flex items-center gap-1 ${gender ? undefined : 'text-gray-600'}`}>
                {getGenderText}
                <span className={'group-hover:rotate-180 transform transition text-sm'}>
                  <IoMdArrowDown />
                </span>
              </Link>
            )}
            content={(
              <>
                {['male', 'female'].map((gender) => {
                  return (
                    <Link href={`/vote/${sportType}/${gender}`} key={gender}>
                      {/* @ts-ignore */}
                      {genderMap[gender]}
                    </Link>
                  )
                })}
              </>
            )}
          />
        </li>
        {
          gender && sportType === ESports.VOLLEYBALL && (
            <li>
              <BreadcrumbItem
                trigger={(
                  <Link href={`/vote/${sportType}/${gender || 'female'}/${collection || 'edgeline'}`} className={`flex items-center gap-1 ${collection ? undefined : 'text-gray-600'}`}>
                    {getCollectionText || '邊線攻擊手'}
                    <span className={'group-hover:rotate-180 transform transition text-sm'}>
                      <IoMdArrowDown />
                    </span>
                  </Link>
                )}
                content={(
                  <>
                    {Object.keys(collectionMap).map((collection) => {
                      if (gender === EGender.FEMALE && (collection === ECollection.LIBERO || collection === ECollection.SPIKER)) return null
                      return (
                        <Link href={`/vote/${sportType}/${gender}/${collection}`} key={collection}>
                          {/* @ts-ignore */}
                          {collectionMap[collection]}
                        </Link>
                      )
                    })}
                  </>
                )}
              />
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Breadcrumbs
