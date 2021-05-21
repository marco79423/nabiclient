import {useEffect} from 'react'
import {Provider} from 'react-redux'
import {appWithTranslation} from 'next-i18next'
import Head from 'next/head'
import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/core/styles'

import store from '../store'
import theme from '../components/themes/defaultTheme'

function App({Component, pageProps}) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Nabiclient</title>

        <link rel="icon" href="/favicon.ico"/>
        <link rel="shortcut icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/logo-180x180.png"/>
        <link rel="icon" type="image/png" sizes="192x192" href="/logo-192x192.png"/>
        <link rel="icon" type="image/png" sizes="512x512" href="/logo-512x512.png"/>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
      </Head>

      <CssBaseline/>

      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SafeHydrate>
            <Component {...pageProps} />
          </SafeHydrate>
        </Provider>
      </ThemeProvider>
    </>
  )
}

export default appWithTranslation(App)

function SafeHydrate({children}) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : children}
    </div>
  )
}
