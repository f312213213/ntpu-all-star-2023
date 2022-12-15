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
  return (
    <Layout
      customMeta={{
        title: `${sportType} 的投票頁面 - 北大明星賽 2023`,
        description: `所有參加${sportType}投票的同學都在這！`,
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
                img={player.photoURL}
                name={player.username}
                description={player.introduction}
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

  const malePlayersFromFirestore = await db
    .collection(sport)
    .doc('male')
    .collection('candidates')
    .get()

  const femalePlayersFromFirestore = await db
    .collection(sport)
    .doc('female')
    .collection('candidates')
    .get()

  const playersToPage: IPlayer[] = []

  malePlayersFromFirestore.forEach((player) => {
    playersToPage.push({
      introduction: '',
      photoURL: '',
      username: '',
      id: player.id,
      ...player.data(),
    })
  })

  femalePlayersFromFirestore.forEach((player) => {
    playersToPage.push({
      introduction: '',
      photoURL: '',
      username: '',
      id: player.id,
      ...player.data(),
    })
  })

  context.res.setHeader('Cache-Control', 'max-age=10, public')

  return {
    props: {
      // @ts-ignore
      sportType: sportMap[sport],
      players: playersToPage,
    },
  }
}
