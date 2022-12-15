import { GetServerSideProps } from 'next'
import { db } from '@/vote/lib/firebase'
import Image from 'next/image'
import Layout from '@/vote/components/Layout'
import React from 'react'

interface IProps {
  username: string
  introduction: string
  photoURL: string
}

const PlayerSinglePage = ({
  username,
  introduction,
  photoURL,
}: IProps) => {
  return (
    <Layout
      customMeta={{
        title: `${username} 的投票頁面 - 北大明星賽 2023`,
        description: introduction,
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
    </Layout>
  )
}

export default PlayerSinglePage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { sport, gender, playerId } = context.query as { sport: string, gender: string, playerId: string }
  const playerFromFirestore = await db.collection(sport).doc(gender).collection('candidates').doc(playerId).get()
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
    },
  }
}
