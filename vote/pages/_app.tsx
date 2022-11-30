import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import { initializeApp } from 'firebase/app'
import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Backdrop from '@/components/Backdrop'
import Dialogs from '@/components/Dialogs'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Toast from '@/components/Toast'
import store from '@/features/store'

const App = ({ Component, pageProps }: AppProps) => {
  const app = initializeApp({
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
        <Component {...pageProps} />
        <Backdrop />
        <Footer />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
