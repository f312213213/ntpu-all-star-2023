import { GetServerSideProps } from 'next'

import { IPlayer } from '@/vote/interfaces/player'
import { collectionMap, sportMap } from '@/vote/constants/sports'
import { genderMap } from '@/vote/constants/gender'
import { isLoginSelector } from '@/vote/features/user/selector'
import { useAppSelector } from '@/vote/features/store'
import { useEffect, useState } from 'react'
import Layout from '@/vote/components/Layout'
import VoteRecordSection from '@/vote/components/VoteRecordSection'
import apiRequest from '@/vote/apis/apiClient'
import snakeCase from 'lodash/snakeCase'

const UserPage = () => {
  const isLogin = useAppSelector(isLoginSelector)
  const [votedPlayer, setVotedPlayer] = useState<{
    [key: string]: IPlayer[]
  }>({})
  const getVotedPlayer = async () => {
    const { data } = await apiRequest({
      endpoint: '/api/player/voted-player',
    })

    setVotedPlayer(data.voted)
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
      {
        Object.keys(votedPlayer).map((k) => {
          const getHeaderText = () => {
            const splitText = snakeCase(k).split('_')
            if (splitText.length > 2) {
              // @ts-ignore
              return `${sportMap[splitText[0]]} ${collectionMap[splitText[1]]} ${genderMap[splitText[2]]}`
            }
            // @ts-ignore
            return `${sportMap[splitText[0]]} ${genderMap[splitText[1]]}`
          }
          return (
            <VoteRecordSection
              key={k}
              headerText={getHeaderText()}
              votedPlayer={votedPlayer[k]}
            />
          )
        })
      }

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
