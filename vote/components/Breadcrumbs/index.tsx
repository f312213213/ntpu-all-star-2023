import { ECollection, ESports, collectionMap, sportMap } from '@/vote/constants/sports'
import { EGender, genderMap } from '@/vote/constants/gender'
import { useRouter } from 'next/router'
import Link from 'next/link'
import React, { useMemo } from 'react'
import Tooltip from '@/vote/components/Tooltip'
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
          <Tooltip
            side={'bottom'}
            trigger={(
              <Link href={`/vote/${sportType}`}>
                {getSportTypeText}
              </Link>
            )}
            content={(
              <>
                {Object.keys(sportMap).map((sport) => {
                  return (
                    <Link href={`/vote/${sport}`} key={sport}>
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
          <Tooltip
            side={'bottom'}
            trigger={(
              <Link href={`/vote/${sportType}/${gender || 'female'}`} className={gender ? undefined : 'text-gray-500'}>
                {getGenderText}
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
              <Tooltip
                side={'bottom'}
                trigger={(
                  <Link href={`/vote/${sportType}/${gender || 'female'}/${collection || 'edgeline'}`} className={collection ? undefined : 'text-gray-500'}>
                    {getCollectionText || '邊線攻擊手'}
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
