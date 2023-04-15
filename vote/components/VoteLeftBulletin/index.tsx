import { EGender, genderMap } from '@/vote/constants/gender'
import { currentSectionVoteLeftSelector, isLoginSelector } from '@/vote/features/user/selector'
import { useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import BulletinItem from '@/vote/components/VoteLeftBulletin/BulletinItem'
import useIsMobile from '@/vote/hooks/useIsMobile'

const VoteLeftBulletin = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const isMobile = useIsMobile()
  const router = useRouter()
  const basketballFemaleLeft = useAppSelector(currentSectionVoteLeftSelector(
    'basketball-female-candidates-voteCount'
  ))
  const basketballMaleLeft = useAppSelector(currentSectionVoteLeftSelector(
    'basketball-male-candidates-voteCount'
  ))
  const volleyballFemaleSetterLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-female-setter-voteCount'
  ))
  const volleyballMaleSetterLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-setter-voteCount'
  ))
  const volleyballFemaleEdgeLineLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-female-edgeline-voteCount'
  ))
  const volleyballMaleEdgeLineLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-edgeline-voteCount'
  ))
  const volleyballMaleSpikerLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-spiker-voteCount'
  ))
  const volleyballMaleLiberoLeft = useAppSelector(currentSectionVoteLeftSelector(
    'volleyball-male-libero-voteCount'
  ))

  if (router.route === '/_error' || !isLogin || router.route === '/me' || router.asPath === '/vote' || !router.asPath.includes('vote')) return null

  // if (isMobile) {
  //   if (!router.pathname.includes('collection')) return null
  //   return (
  //     <div className={'flex justify-center items-center gap-4'}>
  //       <p className={'text-xl'}>
  //         此區剩下
  //       </p>
  //       <div className={'flex gap-4'}>
  //         <BulletinItem value={dynamicLeft} />
  //       </div>
  //       <p className={'text-xl'}>
  //         票
  //       </p>
  //     </div>
  //   )
  // }

  return (
    <div className={'max-w-full flex flex-col items-center justify-center'}>
      <h1>
        剩餘票數
      </h1>
      <div className={'max-w-full grid grid-flow-col gap-5 text-center auto-cols-max'}>
        {
          router.query.sport === 'basketball' && (
            <div className={'flex flex-col items-center gap-4'}>
              <p className={'text-2xl'}>
                籃球
              </p>
              <div className={'flex gap-4'}>
                {
                  (router.query.gender === EGender.MALE || !router.query.gender) && <BulletinItem value={basketballMaleLeft} gender={genderMap.male} />
                }

                {
                  (router.query.gender === EGender.FEMALE || !router.query.gender) && <BulletinItem value={basketballFemaleLeft} gender={genderMap.female} />
                }
              </div>
            </div>
          )
        }

        {
          router.query.sport === 'volleyball' && (
            <>
              {
                (router.query.collection === 'edgeline' || !router.query.collection) && (
                  <div className={'flex flex-col items-center gap-4'}>
                    <p className={'text-2xl'}>
                      排球 - 邊線攻擊手
                    </p>
                    <div className={'flex gap-4'}>
                      {
                        (router.query.gender === EGender.MALE || !router.query.gender) && <BulletinItem value={volleyballMaleEdgeLineLeft} gender={genderMap.male} />
                      }

                      {
                        (router.query.gender === EGender.FEMALE || !router.query.gender) && <BulletinItem value={volleyballFemaleEdgeLineLeft} gender={genderMap.female} />
                      }
                    </div>
                  </div>
                )
              }

              {!isMobile && (router.query.collection === 'edgeline' || !router.query.collection) && (router.query.collection === 'setter' || !router.query.collection) && <div className={'divider divider-horizontal'} />}

              {
                (router.query.collection === 'setter' || !router.query.collection) && (
                  <>

                    <div className={'flex flex-col items-center gap-4'}>
                      <p className={'text-2xl'}>
                        排球 - 舉球員
                      </p>
                      <div className={'flex gap-4'}>
                        {
                          (router.query.gender === EGender.MALE || !router.query.gender) && <BulletinItem value={volleyballMaleSetterLeft} gender={genderMap.male} />
                        }

                        {
                          (router.query.gender === EGender.FEMALE || !router.query.gender) && <BulletinItem value={volleyballFemaleSetterLeft} gender={genderMap.female} />
                        }
                      </div>
                    </div>
                  </>
                )
              }

              {
                router.query.gender === EGender.FEMALE
                  ? <></>
                  : (
                    <>
                      {
                        (router.query.collection === 'spiker' || !router.query.collection) && (
                          <>
                            {!isMobile && (router.query.collection === 'setter' || !router.query.collection) && <div className={'divider divider-horizontal'} />}

                            <div className={'flex flex-col items-center gap-4'}>
                              <p className={'text-2xl'}>
                                排球 - 中間攔網手
                              </p>
                              <div className={'flex gap-4'}>
                                <BulletinItem value={volleyballMaleSpikerLeft} gender={genderMap.male} />
                              </div>
                            </div>
                          </>
                        )
                      }

                      {!isMobile && (router.query.collection === 'setter' || !router.query.collection) && (router.query.collection === 'libero' || !router.query.collection) && <div className={'divider divider-horizontal'} />}

                      {
                        (router.query.collection === 'libero' || !router.query.collection) && (
                          <>

                            <div className={'flex flex-col items-center gap-4'}>
                              <p className={'text-2xl'}>
                                排球 - 自由球員
                              </p>
                              <div className={'flex gap-4'}>
                                <BulletinItem value={volleyballMaleLiberoLeft} gender={genderMap.male} />
                              </div>
                            </div>
                          </>
                        )
                      }
                    </>
                    )
              }
            </>
          )
        }

      </div>
    </div>
  )
}

export default VoteLeftBulletin
