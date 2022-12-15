import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app'
import NextNProgress from 'nextjs-progressbar'
import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Backdrop from '@/vote/components/Backdrop'
import Dialogs from '@/vote/components/Dialogs'
import Footer from '@/vote/components/Footer'
import Header from '@/vote/components/Header'
import Toast from '@/vote/components/Toast'
import store from '@/vote/features/store'

const App = ({ Component, pageProps }: AppProps) => {
  initializeApp({
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGEING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  })
  return (
    <ErrorBoundary
      FallbackComponent={Toast}
    >
      <Provider store={store}>
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
