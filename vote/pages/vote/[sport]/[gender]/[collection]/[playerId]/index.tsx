import { GetServerSideProps } from 'next'
import { db } from '@/vote/lib/firebase'
import Image from 'next/image'
import Layout from '@/vote/components/Layout'
import React from 'react'

interface IProps {
  username: string
  introduction: string
  photoURL: string
  voteCount: number
}

const PlayerSinglePage = ({
  username,
  introduction,
  photoURL,
  voteCount,
}: IProps) => {
  return (
    <Layout
      customMeta={{
        title: `${username} 的投票頁面 - 北大明星賽 2023`,
        description: introduction,
        image: photoURL,
      }}
    >

      <div className={'relative h-96'}>
        <Image
          className={'object-contain'}
          fill
          src={photoURL}
          alt={username}
        />
      </div>
      <p>

        {username}
      </p>
      <p>{voteCount} 票</p>
    </Layout>
  )
}

export default PlayerSinglePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sport, gender, playerId, collection = 'candidates' } = context.query as { sport: string, gender: string, playerId: string, collection: string }
  const playerFromFirestore = await db.collection(sport).doc(gender).collection(collection).doc(playerId).get()
  context.res.setHeader('Cache-Control', 'max-age=10, public')
  if (!playerFromFirestore.exists) {
    return {
      notFound: true,
    }
  }
  const player = playerFromFirestore.data()
  return {
    props: {
      username: player?.username,
      introduction: player?.introduction,
      photoURL: player?.photoURL,
      voteCount: player?.voteCount,
    },
  }
}
