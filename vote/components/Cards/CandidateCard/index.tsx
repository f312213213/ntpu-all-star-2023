import { AiOutlineShareAlt } from 'react-icons/ai'
import { ESports } from '@/vote/constants/sports'
import { EToastType } from '@/vote/features/app/interface'
import { IPlayer } from '@/vote/interfaces/player'
import { closeBackdrop, openToast, showBackdrop } from '@/vote/features/app/slice'
import {
  currentPlayerIsVotedSelector,
  currentSectionIsUpToLimitSelector,
  isLoginSelector
} from '@/vote/features/user/selector'
import { updateUserCancelVoteRecord, updateUserVoteRecord } from '@/vote/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import BlurImage from '@/vote/components/BlurImage'
import Image from 'next/image'
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
  const isLogin = useAppSelector(isLoginSelector)
  const currentPlayerIsVoted = useAppSelector(currentPlayerIsVotedSelector(id))
  const currentSectionIsUpLimit = useAppSelector(currentSectionIsUpToLimitSelector(
    `${sportType}-${gender}-${collection}-voteCount`
  ))
  const dispatch = useAppDispatch()
  const handleShare = () => {
    if (isMobile) {
      if (navigator.share) {
        navigator.share({
          url: `${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`,
        })
        return
      }
    }
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`)
    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '已複製到剪貼簿！',
    }))
  }

  const getButtonText = useMemo(() => {
    if (router.route === '/me') return '取消'
    if (currentSectionIsUpLimit) return '分區達上限'
    if (currentPlayerIsVoted) return '已投過'
    return '投票'
  }, [currentPlayerIsVoted, currentSectionIsUpLimit, router.route])

  const handleVote = async () => {
    dispatch(showBackdrop())

    if (router.route === '/me') {
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
      dispatch(closeBackdrop())
      return
    }

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
  }

  return (
    <div className={'card w-full bg-base-100 shadow-xl group'}>
      <figure className={'relative h-52 bg-base-300'}>
        <BlurImage
          src={photoURL}
          alt={username}
        />
        <button
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
        <p>
          {count} 票
        </p>
        <p className={'truncate'}>
          {introduction}
        </p>
        <div className={'card-actions justify-between items-baseline'}>
          <button
            disabled={(!isLogin || currentPlayerIsVoted || currentSectionIsUpLimit) && router.route !== '/me'}
            onClick={handleVote}
            className={'btn btn-primary'}
          >
            {getButtonText}
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
          >
            顯示更多
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CandidateCard
