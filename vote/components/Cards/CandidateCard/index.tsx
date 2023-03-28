import { AiOutlineShareAlt } from 'react-icons/ai'
import { EDialogType, EToastType } from '@/vote/features/app/interface'
import { ESports, collectionMap, sportMap } from '@/vote/constants/sports'
import { IPlayer } from '@/vote/interfaces/player'
import { closeBackdrop, openDialog, openToast, showBackdrop } from '@/vote/features/app/slice'
import {
  currentPlayerButtonTextSelector,
  currentPlayerCanVoteSelector,
  currentSectionVoteLeftSelector
} from '@/vote/features/user/selector'
import { genderMap } from '@/vote/constants/gender'
import { sendGALog } from '@/vote/features/app/services'
import { updateUserCancelVoteRecord, updateUserVoteRecord } from '@/vote/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BlurImage from '@/vote/components/BlurImage'
import Link from 'next/link'
import apiRequest, { EApiMethod } from '@/vote/apis/apiClient'
import useIsMobile from '@/vote/hooks/useIsMobile'

interface IProps extends IPlayer {
  sportType: ESports
  onCancelVote?: any
}

const CandidateCard = ({ id, introduction, photoURL, username, gender, collection, voteCount, sportType, onCancelVote }: IProps) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const [count, setCount] = useState(voteCount)
  const voteCountLeft = useAppSelector(currentSectionVoteLeftSelector(
    `${sportType}-${gender}-${collection}-voteCount`
  ))
  const dispatch = useAppDispatch()
  const handleShare = () => {
    if (isMobile) {
      if (navigator.share) {
        navigator.share({
          url: `${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`,
        })
        dispatch(sendGALog({
          eventName: 'share',
          eventDetail: {
            shareBy: 'navigator',
            playerId: id,
            sportType,
            gender,
            collection,
          },
        }))
        return
      }
    }
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`)
    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '已複製到剪貼簿！',
    }))
    dispatch(sendGALog({
      eventName: 'share',
      eventDetail: {
        shareBy: 'clipboard',
        playerId: id,
        sportType,
        gender,
        collection,
      },
    }))
  }

  const currentPlayerButtonText = useAppSelector(currentPlayerButtonTextSelector(
    id,
    `${sportType}-${gender}-${collection}-voteCount`
  ))
  const currentPlayerCanVoted = useAppSelector(currentPlayerCanVoteSelector(
    id,
    `${sportType}-${gender}-${collection}-voteCount`
  ))

  const handleVote = async () => {
    if (router.route === '/me') {
      dispatch(openDialog({
        type: EDialogType.ALERT,
        title: `取消投給 ${username} 的票`,
        onConfirm: async () => {
          dispatch(showBackdrop())
          const { data, success } = await apiRequest({
            endpoint: '/api/cancel-vote',
            method: EApiMethod.POST,
            data: {
              id,
              collection,
              gender,
              sport: sportType,
            },
          })
          if (success) {
            setCount((prevState) => prevState - 1)
            onCancelVote?.(id)
            dispatch(updateUserCancelVoteRecord({
              id,
              gender,
              collection,
              sport: sportType,
            }))
          }

          dispatch(sendGALog({
            eventName: 'cancel-vote',
            eventDetail: {
              playerId: id,
              sportType,
              gender,
              collection,
            },
          }))

          dispatch(closeBackdrop())
        },
      }))
      return
    }

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
            id,
            collection,
            gender,
            sport: sportType,
          },
        })
        if (success) {
          setCount((prevState) => prevState + 1)
          dispatch(updateUserVoteRecord({
            id,
            gender,
            collection,
            sport: sportType,
          }))
        }

        dispatch(closeBackdrop())
        dispatch(sendGALog({
          eventName: 'vote',
          eventDetail: {
            playerId: id,
            sportType,
            gender,
            collection,
          },
        }))
      },
    }))
  }

  return (
    <div className={'card w-full bg-base-100 shadow-xl group'}>
      <figure className={'relative h-52 bg-base-300'}>
        <BlurImage
          src={photoURL}
          alt={username}
        />
        <button
          title={'share-button'}
          name={'share-button'}
          onClick={handleShare}
          className={`text-white absolute right-0 top-0 p-4 text-2xl ${!isMobile && 'scale-0'} group-hover:scale-100 transition`}
        >
          <AiOutlineShareAlt />
        </button>
      </figure>
      <div className={'card-body'}>
        <h2 className={'card-title'}>
          {username}
        </h2>
        <div className={'flex gap-2 my-2'}>
          {/* @ts-ignore */}
          <div className={'badge badge-outline'}>{sportMap[sportType]}-{genderMap[gender]}</div>
          {
            // @ts-ignore
            sportType === ESports.VOLLEYBALL && <div className={'badge badge-outline'}>{collectionMap[collection]}</div>
          }
        </div>
        <p>
          {count} 票
        </p>
        <p className={'truncate'}>
          {introduction}
        </p>
        <div className={'card-actions justify-between items-baseline'}>

          <button
            title={'vote-button'}
            name={'vote-button'}
            disabled={!currentPlayerCanVoted && router.route !== '/me'}
            onClick={handleVote}
            className={'btn btn-primary'}
          >
            {router.route === '/me' ? '取消' : currentPlayerButtonText}
          </button>
          <Link
            href={{
              pathname: router.pathname,
              query: {
                sport: sportType,
                gender,
                modalPlayerId: id,
                collection,
              },
            }}
            as={`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`}
            className={'link link-hover'}
            scroll={false}
            shallow
          >
            顯示更多
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
