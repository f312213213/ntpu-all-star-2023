import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import React from 'react'

const ServerError = () => {
  return (
    <Layout
      customMeta={{
        title: ' 500 - 網站暫時壞掉了 - 北大明星賽 2023',
        description: '快叫你的同學來投票，一起選出這屆的明星賽隊長！',
      }}
      useFlex
    >
      <div className={'flex justify-center items-center flex-col gap-10'}>
        <h1 className={'text-3xl md:text-7xl'}>
          500 Server Down
        </h1>
        <p className={'text-xl'}>
          請聯繫主辦單位
        </p>
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

export default ServerError
