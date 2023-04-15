import { EGender, genderMap } from '@/vote/constants/gender'
import { ESports, collectionMap, sportMap } from '@/vote/constants/sports'
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
import omit from 'lodash/omit'

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
        // @ts-ignore
        title: `${sportType}-${genderMap[gender]} 的投票頁面 - 北大明星賽 2023`,
        // @ts-ignore
        description: `所有參加${sportType}投票的${genderMap[gender]}同學都在這！`,
      }}
    >

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
  const { sport, gender, collection = 'candidates' } = context.query as { sport: string, gender: string, collection: string }

  // @ts-ignore
  if (!sportMap[sport] || !genderMap[gender] || !collectionMap[collection]) {
    return {
      notFound: true,
    }
  }

  const playersFromFirestore = await db
    .collection(sport)
    .doc(gender)
    .collection(collection)
    .orderBy('voteCount', 'desc')
    .get()

  if (playersFromFirestore.empty) {
    return {
      notFound: true,
    }
  }

  const playersToPage: IPlayer[] = []

  playersFromFirestore.forEach((player) => {
    playersToPage.push({
      voteCount: 0,
      gender,
      introduction: '',
      photoURL: '',
      username: '',
      id: player.id,
      collection,
      ...player.data(),
    })
  })

  context.res.setHeader('Cache-Control', 'max-age=10, public')

  return {
    props: {
      // @ts-ignore
      sportType: sportMap[sport],

      players: playersToPage
        .sort((playerA, playerB) => {
          if (playerA.voteCount > playerB.voteCount) return -1
          if (playerA.voteCount < playerB.voteCount) return 1
          return 0
        })
        .map((player) => omit(player, 'votedPlayer'))
      ,
    },
  }
}
