import { ESports, sportMap } from '@/vote/constants/sports'
import { FaBasketballBall, FaVolleyballBall } from 'react-icons/fa'
import { GetServerSideProps } from 'next'
import { db } from '@/vote/lib/firebase'
import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import time from '@/vote/constants/time'

interface IProps {
  sportTypes: string[]
}

const VoteRootPage = ({ sportTypes }: IProps) => {
  return (
    <Layout
      customMeta={{
        title: '投票 - 北大明星賽 2023',
        description: '快叫你的同學來投票，一起選出這屆的明星賽隊長！',
      }}
      useFlex
    >
      <div
        className={'flex flex-col md:flex-row justify-center items-center uppercase gap-8'}
      >
        {
          sportTypes.map((type) => {
            return (
              <Link
                key={type}
                href={`/vote/${type}`}>
                <div
                  className={'shadow-xl w-64 h-64 bg-gray-500 hover:bg-gray-600 flex flex-col gap-8 items-center justify-center p-4 rounded-xl transform hover:-translate-y-2 transition'}
                >
                  {
                    type === ESports.BASKETBALL ? <FaBasketballBall className={'text-9xl'} /> : <FaVolleyballBall className={'text-9xl'} />
                  }
                  <p className={'text-3xl'}>
                    {/* @ts-ignore */}
                    {sportMap[type]}
                  </p>
                </div>
              </Link>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default VoteRootPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const collectionsFromFirestore = await db.listCollections()
  context.res.setHeader('Cache-Control', `max-age=${time.DAY * 30}, public`)

  const sportTypes: string[] = []

  collectionsFromFirestore.forEach(collection => {
    if (collection.id !== 'users') {
      sportTypes.push(collection.id)
    }
  })
  return {
    props: {
      sportTypes,
    },
  }
}
