import { GetServerSideProps } from 'next'
import { closeBackdrop, showBackdrop } from '@/vote/features/app/slice'
import { currentPlayerIsVotedSelector, isLoginSelector } from '@/vote/features/user/selector'
import { db } from '@/vote/lib/firebase'
import { updateUserVoteRecord } from '@/vote/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Layout from '@/vote/components/Layout'
import React, { useState } from 'react'
import apiRequest, { EApiMethod } from '@/vote/apis/apiClient'

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
  const [count, setCount] = useState(voteCount)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isLogin = useAppSelector(isLoginSelector)
  const currentPlayerIsVoted = useAppSelector(currentPlayerIsVotedSelector(router.query.playerId as string))

  const handleVote = async () => {
    dispatch(showBackdrop())
    const { data, success } = await apiRequest({
      endpoint: '/api/vote',
      method: EApiMethod.POST,
      data: {
        id: router.query.playerId,
        collection: router.query.collection,
        gender: router.query.gender,
        sport: router.query.sport,
      },
    })
    if (success) {
      setCount((prevState) => prevState + 1)
      dispatch(updateUserVoteRecord({
        id: router.query.playerId,
        collection: router.query.collection,
        gender: router.query.gender,
        sport: router.query.sport,
      }))
    }

    dispatch(closeBackdrop())
  }
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
      <p>{count} 票</p>
      <button
        disabled={!isLogin || currentPlayerIsVoted}
        onClick={handleVote}
        className={'btn btn-primary'}
      >
        {currentPlayerIsVoted ? '已投過' : '投票' }
      </button>
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
