import { ESports, sportMap } from '@/vote/constants/sports'
import { GetServerSideProps } from 'next'
import { IPlayer } from '@/vote/interfaces/player'
import { db } from '@/vote/lib/firebase'
import { openDialog } from '@/vote/features/app/slice'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import Breadcrumbs from '@/vote/components/Breadcrumbs'
import CandidateCard from '@/vote/components/Cards/CandidateCard'
import Layout from '@/vote/components/Layout'
import PlayerSearchBar from '@/vote/components/PlayerSearchBar'
import React, { useEffect, useState } from 'react'
import ScreenSinglePlayer from '@/vote/components/ScreenSinglePlayer'
import SearchPlayer from '@/vote/components/SearchPlayer'
import gender from '@/vote/pages/vote/[sport]/[gender]'

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

      <SearchPlayer />

      <Breadcrumbs />

      <PlayerSearchBar />

      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'}>
        {
          players.map((player) => {
            return (
              <CandidateCard
                key={player.id}
                id={player.id}
                photoURL={player.photoURL}
                username={player.username}
                introduction={player.introduction}
                gender={player.gender}
                collection={player.collection}
                voteCount={player.voteCount}
                sportType={sportType === '籃球' ? ESports.BASKETBALL : ESports.VOLLEYBALL}
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
  const { sport } = context.query as { sport: string }

  const femalePlayersCollectionList: string[] = []
  const malePlayersCollectionList: string[] = []
  const playersToPage: IPlayer[] = []

  const femalePlayersCollectionListFromFirestore = await db
    .collection(sport)
    .doc('female')
    .listCollections()

  femalePlayersCollectionListFromFirestore.forEach(col => femalePlayersCollectionList.push(col.id))

  const malePlayersCollectionListFromFirestore = await db
    .collection(sport)
    .doc('male')
    .listCollections()

  malePlayersCollectionListFromFirestore.forEach(col => malePlayersCollectionList.push(col.id))

  for (const collection of malePlayersCollectionList) {
    const malePlayersFromFirestore = await db
      .collection(sport)
      .doc('male')
      .collection(collection)
      .orderBy('voteCount')
      .get()

    malePlayersFromFirestore.forEach((player) => {
      playersToPage.push({
        voteCount: 0,
        gender: 'male',
        introduction: '',
        photoURL: '',
        username: '',
        collection,
        id: player.id,
        ...player.data(),
      })
    })
  }

  for (const collection of femalePlayersCollectionList) {
    const femalePlayersFromFirestore = await db
      .collection(sport)
      .doc('female')
      .collection(collection)
      .orderBy('voteCount')
      .get()

    femalePlayersFromFirestore.forEach((player) => {
      playersToPage.push({
        voteCount: 0,
        gender: 'female',
        introduction: '',
        photoURL: '',
        username: '',
        collection,
        id: player.id,
        ...player.data(),
      })
    })
  }

  context.res.setHeader('Cache-Control', 'max-age=86400, public')

  return {
    props: {
      // @ts-ignore
      sportType: sportMap[sport],
      players: playersToPage.sort((playerA, playerB) => {
        if (playerA.voteCount > playerB.voteCount) return -1
        if (playerA.voteCount < playerB.voteCount) return 1
        return 0
      }),
    },
  }
}
