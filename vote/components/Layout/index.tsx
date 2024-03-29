import { useRouter } from 'next/router'
import Breadcrumbs from '@/vote/components/Breadcrumbs'
import Head from 'next/head'
import React from 'react'
import ScrollToTopButton from '@/vote/components/ScrollToTop'
import VoteLeftBulletin from '@/vote/components/VoteLeftBulletin'
import useIsMobile from '@/vote/hooks/useIsMobile'

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
  useFlex?: boolean
  children: any
}

const Layout = ({ children, customMeta, useFlex = false }: IPageProps) => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const meta = {
    title: '首頁 - 北大明星賽 2023',
    description: '',
    image: '/logo.jpg',
    type: 'website',
    ...customMeta,
  } as ICustomMeta
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name={'robots'} content={'follow, index'} />
        <meta content={meta.description} name={'description'} />
        <meta name={'url'} itemProp={'url'} content={`https://allstar.ntpu.org${router.asPath}`} />
        <meta property={'image'} content={meta.image} />
        <meta
          property={'og:url'}
          content={`https://allstar.ntpu.org${router.asPath}`}
        />
        <link
          rel={'canonical'}
          href={`https://allstar.ntpu.org${router.asPath}`}
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
      <main className={`min-h-screen w-full bg-gray-700 mt-16 py-10  px-4 md:px-10 ${isMobile ? 'my-16' : undefined} ${useFlex ? 'flex justify-center items-center' : undefined}`}>

        <VoteLeftBulletin />

        <Breadcrumbs />

        {children}
        <ScrollToTopButton />
      </main>
    </>
  )
}

export default Layout
