import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import nextI18nConfig from '../next-i18next.config'
import AppController from '../components/controllers/AppController'
import MainContainer from '../components/containers/streaming/MainContainer'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, [
      'common',
      'Toolbar',
      'ControlPanel',
      'ListPanel',
      'DetailPanelContainer',
    ], nextI18nConfig),
  }
})

export default function StreamingPage() {
  return (
    <AppController>
      <MainContainer/>
    </AppController>
  )
}
