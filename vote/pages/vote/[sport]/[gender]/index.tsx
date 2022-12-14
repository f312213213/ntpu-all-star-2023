import { EGender } from '@/vote/constants/gender'
import { ESports, sportMap } from '@/vote/constants/sports'
import { GetServerSideProps } from 'next'
import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import CandidateCard from '@/vote/components/Cards/CandidateCard'
import Layout from '@/vote/components/Layout'
import React, { useEffect, useState } from 'react'
import ScreenSinglePlayer from '@/vote/components/ScreenSinglePlayer'

interface IProps {
  sportType: string
  players: IPlayer[]
}

const PlayerCategoryPage = ({ sportType, players }: IProps) => {
  const router = useRouter()
  const { gender = '' } = router.query
  return (
    <Layout
      customMeta={{
        title: `${sportType}-${gender === 'male' ? EGender.MALE : EGender.FEMALE} 的投票頁面 - 北大明星賽 2023`,
        description: `所有參加${sportType}投票的${gender === 'male' ? EGender.MALE : EGender.FEMALE}同學都在這！`,
      }}
    >
      {
        router?.query?.playerId && <ScreenSinglePlayer />
      }

      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'}>
        {
          players.map((player) => {
            return (
              <CandidateCard
                key={player.id}
                playerId={player.id}
                img={player.img}
                name={player.name}
                description={player.description}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export default PlayerCategoryPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sport, gender } = context.query as { sport: string, gender: string }
  const playersFromFirestore = await db.collection(sport).doc(gender).collection('player').get()

  const playersToPage: IPlayer[] = []

  playersFromFirestore.forEach((player) => {
    playersToPage.push({
      description: '',
      img: '',
      name: '',
      id: player.id,
      ...player.data(),
    })
  })

  return {
    props: {
      // @ts-ignore
      sportType: sportMap[sport],
      players: playersToPage,
    },
  }
}
