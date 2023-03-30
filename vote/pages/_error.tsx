import Layout from '@/vote/components/Layout'
import Link from 'next/link'
import React from 'react'

// @ts-ignore
const Error = ({ statusCode }) => {
  return (
    <Layout
      customMeta={{
        title: `${statusCode} - 北大明星賽 2023`,
        description: '快叫你的同學來投票，一起選出這屆的明星賽隊長！',
      }}
      useFlex
    >
      <div className={'flex justify-center items-center flex-col gap-10'}>
        <h1 className={'text-3xl md:text-7xl'}>
          {statusCode}
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

// @ts-ignore
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
