import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import AppController from '../components/controllers/AppController'
import MainContainer from '../components/containers/nats/MainContainer'
import nextI18nConfig from '../next-i18next.config'

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

export default function IndexPage() {
  return (
    <AppController>
      <MainContainer/>
    </AppController>
  )
}
