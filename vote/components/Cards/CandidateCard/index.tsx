import { AiOutlineShareAlt } from 'react-icons/ai'
import { ESports } from '@/vote/constants/sports'
import { EToastType } from '@/vote/features/app/interface'
import { IPlayer } from '@/vote/interfaces/player'
import { openToast } from '@/vote/features/app/slice'
import { useAppDispatch } from '@/vote/features/store'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps extends IPlayer {
  sportType: ESports
}

const CandidateCard = ({ id, introduction, photoURL, username, gender, collection, voteCount, sportType }: IProps) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const copyPlayerLink = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_DOMAIN}/vote/${sportType}/${gender}/${collection}/${id}`)
    dispatch(openToast({
      type: EToastType.SUCCESS,
      title: '已複製到剪貼簿！',
    }))
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
          {voteCount} 票
        </p>
        <p className={'truncate'}>
          {introduction}
        </p>
        <div className={'card-actions justify-between items-baseline'}>
          <button
            className={'btn btn-primary'}
          >
            投票
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
