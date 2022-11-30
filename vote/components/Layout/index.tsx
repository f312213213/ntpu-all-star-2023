import { useAppDispatch, useAppSelector } from '@/features/store'
import { useRouter } from 'next/router'
import Head from 'next/head'
import React from 'react'

interface ICustomMeta {
  title: string
  description: string
  type?: string
  image?: string
  author?: string
  date?: string
  keyword?: string
}

interface IPageProps {
  customMeta?: ICustomMeta
  children: any
}

const Layout = ({ children, customMeta }: IPageProps) => {
  const router = useRouter()
  const meta = {
    title: '首頁 - 北大明星賽 2023',
    description: '',
    image: '',
    type: 'website',
    ...customMeta,
  } as ICustomMeta
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name={'robots'} content={'follow, index'} />
        <meta content={meta.description} name={'description'} />
        <meta name={'url'} itemProp={'url'} content={`https://chiendavid.com${router.asPath}`} />
        <meta
          property={'og:url'}
          content={`https://chiendavid.com${router.asPath}`}
        />
        <link
          rel={'canonical'}
          href={`https://chiendavid.com${router.asPath}`}
        />
        <meta property={'og:type'} content={meta.type} />
        <meta property={'og:site_name'} content={meta.title} />
        <meta property={'og:description'} content={meta.description} />
        <meta property={'og:title'} content={meta.title} />
        <meta property={'og:image'} content={meta.image} />
        <meta name={'twitter:card'} content={'summary_large_image'} />
        <meta name={'twitter:title'} content={meta.title} />
        <meta name={'twitter:description'} content={meta.description} />
        <meta name={'twitter:image'} content={meta.image} />
        <meta charSet={'utf-8'} />
        {
          meta.author && <meta property={'article:author'} content={meta.author} />
        }
        {
          meta.date && <meta property={'article:published_time'} content={meta.date} />
        }
        {
          meta.keyword && <meta name={'keywords'} content={meta.keyword} />
        }
      </Head>
      <main className={'min-h-screen w-full bg-gray-700 mt-16 py-10 px-4 md:px-10'}>
        {children}
      </main>
    </>
  )
}

export default Layout
