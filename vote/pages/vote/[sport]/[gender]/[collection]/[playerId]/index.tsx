import { EDialogType } from '@/vote/features/app/interface'
import { ESports, collectionMap, sportMap } from '@/vote/constants/sports'
import { GetServerSideProps } from 'next'
import { closeBackdrop, openDialog, showBackdrop } from '@/vote/features/app/slice'
import {
  currentPlayerButtonTextSelector,
  currentPlayerCanVoteSelector, currentSectionVoteLeftSelector
} from '@/vote/features/user/selector'
import { db } from '@/vote/lib/firebase'
import { genderMap } from '@/vote/constants/gender'
import { updateUserVoteRecord } from '@/vote/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import BlurImage from '@/vote/components/BlurImage'
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

  const currentPlayerButtonText = useAppSelector(currentPlayerButtonTextSelector(
    router.query.playerId as string,
    `${router.query.sport}-${router.query.gender}-${router.query.collection}-voteCount`
  ))
  const currentPlayerCanVoted = useAppSelector(currentPlayerCanVoteSelector(
    router.query.playerId as string,
    `${router.query.sport}-${router.query.gender}-${router.query.collection}-voteCount`
  ))
  const voteCountLeft = useAppSelector(currentSectionVoteLeftSelector(
    `${router.query.sport}-${router.query.gender}-${router.query.collection}-voteCount`
  ))

  const handleVote = async () => {
    dispatch(openDialog({
      type: EDialogType.ALERT,
      title: `你確定要投給 ${username} 嗎`,
      content: <p>你在這分區還剩 {voteCountLeft} 票</p>,
      onConfirm: async () => {
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
      },
    }))
  }
  return (
    <Layout
      customMeta={{
        title: `${username} 的投票頁面 - 北大明星賽 2023`,
        description: introduction,
        image: photoURL,
      }}
    >

      <div className={'w-full overflow-x-hidden relative'}>
        <figure className={'relative w-full h-[400px]'}>
          <BlurImage
            src={photoURL}
            alt={username}
          />
        </figure>
        <div className={'card-body '}>
          <h2 className={'card-title'}>
            <p>
              {username}
            </p>
          </h2>
          <div className={'flex gap-2 my-2'}>
            {/* @ts-ignore */}
            <div className={'badge badge-outline'}>{sportMap[router.query.sport]}-{genderMap[router.query.gender]}</div>
            {
              // @ts-ignore
              router.query.sport === ESports.VOLLEYBALL && <div className={'badge badge-outline'}>{collectionMap[router.query.collection]}</div>
            }
          </div>
          <p>
            {count} 票
          </p>
          <p className={'whitespace-pre-wrap'}>
            {introduction}
          </p>
        </div>
        <div className={'card-action flex justify-center'}>
          <button
            disabled={!currentPlayerCanVoted}
            onClick={handleVote}
            className={'btn btn-primary'}
          >
            {currentPlayerButtonText}
          </button>
        </div>
      </div>
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
