import { GetServerSideProps } from 'next'
import { db } from '@/vote/lib/firebase'
import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import React from 'react'

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
    >
      <div
        className={'flex flex-col justify-center items-center uppercase gap-4'}
      >
        {
          sportTypes.map((type) => {
            return (
              <Link
                key={type}
                href={`/vote/${type}`}>
                {type}
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
  context.res.setHeader('Cache-Control', 'max-age=10, public')
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
