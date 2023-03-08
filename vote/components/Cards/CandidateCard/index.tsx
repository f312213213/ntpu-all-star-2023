import { AiOutlineShareAlt } from 'react-icons/ai'
import { ESports } from '@/vote/constants/sports'
import { EToastType } from '@/vote/features/app/interface'
import { IPlayer } from '@/vote/interfaces/player'
import { closeBackdrop, openToast, showBackdrop } from '@/vote/features/app/slice'
import { currentPlayerIsVotedSelector } from '@/vote/features/user/selector'
import { updateUserVoteRecord } from '@/vote/features/user/slice'
import { useAppDispatch, useAppSelector } from '@/vote/features/store'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import apiRequest, { EApiMethod } from '@/vote/apis/apiClient'

interface IProps extends IPlayer {
  sportType: ESports
}

const CandidateCard = ({ id, introduction, photoURL, username, gender, collection, voteCount, sportType }: IProps) => {
  const router = useRouter()
  const [count, setCount] = useState(voteCount)
  const currentPlayerIsVoted = useAppSelector(currentPlayerIsVotedSelector(id))
  const dispatch = useAppDispatch()
  const copyPlayerLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`)
    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '已複製到剪貼簿！',
    }))
  }

  const handleVote = async () => {
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
  }

  return (
    <div className={'card w-full bg-base-100 shadow-xl group'}>
      <figure className={'relative h-52 bg-base-300'}>
        <Image
          className={'object-contain'}
          fill
          src={photoURL}
          alt={username}
        />
        <button
        onClick={copyPlayerLink}
          className={'text-white absolute right-0 top-0 p-4 text-2xl scale-0 group-hover:scale-100 transition'}
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
            disabled={currentPlayerIsVoted}
            onClick={handleVote}
            className={'btn btn-primary'}
          >
            {currentPlayerIsVoted ? '已投過' : '投票' }
          </button>
          <Link
            href={{
              pathname: router.pathname,
              query: {
                sport: router.query.sport,
                gender,
                playerId: id,
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
