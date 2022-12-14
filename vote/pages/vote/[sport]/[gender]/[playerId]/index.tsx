import { GetServerSideProps } from 'next'
import { db } from '@/vote/lib/firebase'
import Layout from '@/vote/components/Layout'
import React from 'react'

interface IProps {
  playerName: string
  description: string
}

const PlayerSinglePage = ({
  playerName,
  description,
}: IProps) => {
  return (
    <Layout
      customMeta={{
        title: `${playerName} 的投票頁面 - 北大明星賽 2023`,
        description,
      }}
    >
      {playerName}
    </Layout>
  )
}

export default PlayerSinglePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sport, gender, playerId } = context.query as { sport: string, gender: string, playerId: string }
  const playerFromFirestore = await db.collection(sport).doc(gender).collection('player').doc(playerId).get()
  context.res.setHeader('Cache-Control', 'max-age=10, public')
  if (!playerFromFirestore.exists) {
    return {
      notFound: true,
    }
  }
  const player = playerFromFirestore.data()
  return {
    props: {
      playerName: player?.name,
      description: player?.description,
    },
  }
}
