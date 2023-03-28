import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <Layout
      customMeta={{
        title: ' 404 - 這頁找不到 - 北大明星賽 2023',
        description: '快叫你的同學來投票，一起選出這屆的明星賽隊長！',
      }}
      useFlex
    >
      <div className={'flex justify-center items-center flex-col gap-10'}>
        <h1 className={'text-8xl'}>
          404 Not Found
        </h1>
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

export default NotFound
