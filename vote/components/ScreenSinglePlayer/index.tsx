import { IPlayer } from '@/vote/interfaces/player'
import { useRouter } from 'next/router'
import BlurImage from '@/vote/components/BlurImage'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import apiRequest from '@/vote/apis/apiClient'
import useIsMounted from '@/vote/hooks/useIsMounted'
import usePageScrollLock from '@/vote/hooks/usePageScrollLock'

const ScreenSinglePlayer = () => {
  const router = useRouter()
  const isMounted = useIsMounted()
  const outRef = React.useRef<HTMLDivElement | null>(null)
  const [playerData, setPlayerData] = useState<IPlayer | null>(null)

  usePageScrollLock(!!playerData)

  const handleClose = (e: any) => {
    if (e.target === outRef.current || e.key === 'Escape') {
      router.back()
    }
  }

  const getSinglePlayer = async () => {
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
      <div className={'fixed w-full h-screen bg-gray-400 z-40 bg-opacity-80 flex justify-center items-center top-0 left-0'} ref={outRef} onClick={handleClose} >
        <div className={'p-4 md:p-8 space-y-3 bg-white w-8/12  md:w-[700px] h-screen overflow-y-auto'}>
          <div className={' w-full h-full relative'}>
            <figure className={'relative w-full h-3/5'}>
              <BlurImage
                src={photoURL}
                alt={username}
              />
            </figure>
            <div className={'card-body '}>
              <h2 className={'card-title text-black'}>
                <p>
                  {username}
                </p>
              </h2>
              <p className={'text-gray-700'}>
                {voteCount} 票
              </p>
              <p className={'text-gray-700 whitespace-pre-wrap'}>
                {introduction}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScreenSinglePlayer
