import { IPlayer } from '@/vote/interfaces/player'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useApiHandler from '@/vote/hooks/useApiHandler'
import usePageScrollLock from '@/vote/hooks/usePageScrollLock'

const ScreenSinglePlayer = () => {
  const apiHandler = useApiHandler()
  const router = useRouter()
  const outRef = React.useRef<HTMLDivElement | null>(null)
  const [playerData, setPlayerData] = useState<IPlayer | null>(null)

  usePageScrollLock(!!playerData)

  const handleClose = (e: any) => {
    if (e.target === outRef.current || e.key === 'Escape') {
      router.back()
    }
  }

  const getSinglePlayer = async () => {
    const { data, isSuccess } = await apiHandler({
      apiRoute: '/api/singlePlayer',
      needAuth: false,
      searchParam: {
        sport: router.query.sport,
        gender: router.query.gender,
        playerId: router.query.playerId,
        collection: router.query.collection,
      },
    })
    if (isSuccess) { setPlayerData(data.data.player) }
  }

  useEffect(() => {
    getSinglePlayer()
    return () => {
      setPlayerData(null)
    }
  }, [router?.query?.playerId])

  if (!router?.query?.playerId) return null

  if (!playerData) return null

  const { introduction, photoURL, username } = playerData

  return (
    <>
      <Head>
        <title>{`${username} 的投票頁面 - 北大明星賽 2023`}</title>
        <meta content={introduction} name={'description'} />
      </Head>
      <div className={'fixed w-full h-screen bg-gray-400 z-40 bg-opacity-80 flex justify-center items-center top-0 left-0'} ref={outRef} onClick={handleClose} >
        <div className={'flex flex-col justify-center items-center space-y-3 bg-white w-8/12 rounded-xl md:rounded-none md:w-3/5 md:h-screen p-4 overflow-y-auto'}>
          <div className={'card w-full '}>
            <figure className={'relative h-52'}>
              <Image
                className={'object-contain'}
                fill
                src={photoURL}
                alt={username}
              />
            </figure>
            <div className={'card-body'}>
              <h2 className={'card-title'}>
                {username}
              </h2>
              <p>
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
