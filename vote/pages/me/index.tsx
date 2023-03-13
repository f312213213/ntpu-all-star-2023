import { GetServerSideProps } from 'next'

import { ESports } from '@/vote/constants/sports'
import { IPlayer } from '@/vote/interfaces/player'
import { isLoginSelector } from '@/vote/features/user/selector'
import { useAppSelector } from '@/vote/features/store'
import { useEffect, useState } from 'react'
import CandidateCard from '@/vote/components/Cards/CandidateCard'
import Layout from '@/vote/components/Layout'
import apiRequest from '@/vote/apis/apiClient'
import flatten from 'lodash/flatten'
import values from 'lodash/values'

const UserPage = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const [votedPlayer, setVotedPlayer] = useState<IPlayer[]>([])
  const getVotedPlayer = async () => {
    const { data } = await apiRequest({
      endpoint: '/api/player/voted-player',
    })
    setVotedPlayer(flatten(values(data.voted)) as IPlayer[])
  }

  const onCancelVote = (id: string) => {
    setVotedPlayer((v) => {
      return v.filter(player => {
        return player.id !== id
      })
    })
  }

  useEffect(() => {
    if (!isLogin) return
    getVotedPlayer()
  }, [isLogin])
  return (
    <Layout
      customMeta={{
        title: '我的頁面 - 北大明星賽 2023',
        description: '',
      }}
    >
      <h2 className={'text-center text-2xl my-8'}>
        你投給了以下的人
      </h2>
      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10'}>
        {
          votedPlayer.map((player) => {
            return (
              <CandidateCard
                onCancelVote={onCancelVote}
                key={player.id}
                id={player.id}
                photoURL={player.photoURL}
                username={player.username}
                introduction={player.introduction}
                gender={player.gender}
                collection={player.collection}
                voteCount={player.voteCount}
                sportType={player.collection === 'candidates' ? ESports.BASKETBALL : ESports.VOLLEYBALL}
              />
            )
          })
        }
      </div>
    </Layout>
  )
}

export default UserPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { accessToken } = context.req.cookies
  if (!accessToken) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    }
  }
  return {
    props: {
    },
  }
}
