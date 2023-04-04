import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Dialog, Transition } from '@headlessui/react'
import { ESports, collectionMap, sportMap } from '@/vote/constants/sports'
import { IPlayer } from '@/vote/interfaces/player'
import { closeBackdrop, showBackdrop } from '@/vote/features/app/slice'
import { genderMap } from '@/vote/constants/gender'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import BlurImage from '@/vote/components/BlurImage'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import apiRequest from '@/vote/apis/apiClient'
import useIsMobile from '@/vote/hooks/useIsMobile'
import useIsMounted from '@/vote/hooks/useIsMounted'
import usePageScrollLock from '@/vote/hooks/usePageScrollLock'

const ScreenSinglePlayer = () => {
  const isMobile = useIsMobile()
  const router = useRouter()
  const isMounted = useIsMounted()
  const dispatch = useAppDispatch()
  const outRef = React.useRef<HTMLDivElement | null>(null)
  const [playerData, setPlayerData] = useState<IPlayer | null>(null)

  usePageScrollLock(!!playerData)

  const handleClose = () => {
    router.back()
  }

  const getSinglePlayer = async () => {
    dispatch(showBackdrop())
    const { data, success } = await apiRequest({
      endpoint: '/api/player/singlePlayer',
      params: {
        sport: router.query.sport,
        gender: router.query.gender,
        playerId: router.query.modalPlayerId,
        collection: router.query.collection,
      },
    })
    if (success) { setPlayerData(data.data.player) }
    dispatch(closeBackdrop())
  }

  useEffect(() => {
    if (!isMounted) return
    getSinglePlayer()
    return () => {
      setPlayerData(null)
    }
  }, [isMounted, router?.query?.modalPlayerId])

  if (!router?.query?.modalPlayerId) return null

  if (!playerData) return null

  const { introduction, photoURL, username, voteCount } = playerData

  return (
    <>
      <Head>
        <title>{`${username} 的投票頁面 - 北大明星賽 2023`}</title>
        <meta content={introduction} name={'description'} />
      </Head>
      {
        isMobile
          ? <div className={'fixed w-full min-h-screen h-screen top-0 left-0 z-40 bg-gray-700 overflow-y-auto'}>
              {/* back to prev page */}
              <div className={'h-16 p-4 border-b flex items-center justify-between text-2xl mb-4'}>
                <span onClick={() => { router.back() }}>
                  <AiOutlineArrowLeft />
                </span>
                <p className={'text-center'}>
                  {username}
                </p>
                <div className={'w-[24px]'} />
              </div>
              <div className={'w-full h-full px-4'}>
                {/* body */}
                <div className={'w-full h-full'}>
                  <figure className={'relative w-full h-3/5'}>
                    <BlurImage
                      src={photoURL}
                      alt={username}
                    />
                  </figure>
                  <div className={'card-body'}>
                    <h2 className={'card-title'}>
                      <p>
                        {username}
                      </p>
                    </h2>
                    <div className={'flex gap-2 my-2'}>
                      {/* @ts-ignore */}
                      <div className={'badge badge-outline'}>{sportMap[router.query.sport]}-{genderMap[router.query.gender]}</div>
                      {
                        // @ts-ignore
                        router.query.sport === ESports.VOLLEYBALL && <div className={'badge badge-outline'}>{collectionMap[router.query.collection]}</div>
                      }
                    </div>
                    <p>
                      {voteCount} 票
                    </p>
                    <p className={'whitespace-pre-wrap'}>
                      {introduction}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          : <div className={'fixed w-full h-screen bg-gray-400 z-40 bg-opacity-80 top-0 left-0'}>
              <Dialog open as={'div'} onClose={handleClose} className={'p-4 md:p-8 space-y-3 bg-white w-8/12 md:w-[700px] fixed h-screen overflow-y-auto top-0 left-1/2 z-50 transform -translate-x-1/2'}>
                <div className={'w-full h-full relative'}>
                  <figure className={'relative w-full h-3/5'}>
                    <BlurImage
                      src={photoURL}
                      alt={username}
                    />
                  </figure>
                  <div className={'card-body'}>
                    <h2 className={'card-title text-black'}>
                      <p>
                        {username}
                      </p>
                    </h2>
                    <div className={'flex gap-2 my-2'}>
                      {/* @ts-ignore */}
                      <div className={'badge'}>{sportMap[router.query.sport]}-{genderMap[router.query.gender]}</div>
                      {
                        // @ts-ignore
                        router.query.sport === ESports.VOLLEYBALL && <div className={'badge'}>{collectionMap[router.query.collection]}</div>
                      }
                    </div>
                    <p className={'text-gray-700'}>
                      {voteCount} 票
                    </p>
                    <p className={'text-gray-700 whitespace-pre-wrap'}>
                      {introduction}
                    </p>
                  </div>
                </div>
              </Dialog>
            </div>

      }
    </>
  )
}

export default ScreenSinglePlayer
