import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import Backdrop from '@/components/Backdrop'
import Dialogs from '@/components/Dialogs'
import React from 'react'
import Toast from '@/components/Toast'
import store from '@/features/store'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary
      FallbackComponent={Toast}
    >
      <Provider store={store}>
        <Toast />
        <Dialogs />
        <Component {...pageProps} />
        <Backdrop />
      </Provider>
    </ErrorBoundary>
  )
}

export default App
