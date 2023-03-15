import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import dynamic from 'next/dynamic'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Backdrop from '@/vote/components/Backdrop'
import Dialogs from '@/vote/components/Dialogs'
import Footer from '@/vote/components/Footer'
import Header from '@/vote/components/Header'
import Toast from '@/vote/components/Toast'
import store from '@/vote/features/store'

const Init = dynamic(import('@/vote/components/Init'), { ssr: false })

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={Toast}
    >
      <Provider store={store}>
        <Init />
        <Header />
        <Toast />
        <Dialogs />
        <NextNProgress options={{ showSpinner: false }} />
        <Component {...pageProps} />
        <Backdrop />
        <Footer />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
