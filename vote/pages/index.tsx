import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <Layout
      customMeta={{
        title: '首頁 - 北大明星賽 2023',
        description: '快叫你的同學來投票，一起選出這屆的明星賽隊長！',
      }}
    >
      <div className={'flex justify-center'}>
        <Link
          href={'/vote'}
          className={'btn btn-lg btn-accent'}
        >
          前往投票
        </Link>
      </div>
    </Layout>
  )
}

export default HomePage
