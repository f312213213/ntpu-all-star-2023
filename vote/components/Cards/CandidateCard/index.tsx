import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface IProps {
  playerId: string
  description: string
  img: string
  name: string
  gender: string
}

const CandidateCard = ({ playerId, description, img, name, gender }: IProps) => {
  const router = useRouter()
  return (
    <div className={'card w-full bg-base-100 shadow-xl'}>
      <figure className={'relative h-52'}>
        <Image
          className={'object-contain'}
          fill
          src={img}
          alt={name}
        />
      </figure>
      <div className={'card-body'}>
        <h2 className={'card-title'}>
          {name}
        </h2>
        <p className={'truncate'}>
          {description}
        </p>
        <div className={'card-actions justify-end'}>
          <Link
            href={{
              pathname: router.pathname,
              query: {
                sport: router.query.sport,
                gender,
                playerId,
              },
            }}
            as={`${router.asPath}/${playerId}`}
            className={'btn btn-primary'}
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
