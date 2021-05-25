import React from 'react'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'

import AppController from '../components/controllers/AppController'
import MainWebContainer from '../components/containers/web/MainWebContainer'
import nextI18nConfig from '../next-i18next.config'

export const getStaticProps = async ({locale}) => ({
  props: {
    ...await serverSideTranslations(locale, [
      'common',
      'Toolbar',
      'ControlPanel',
      'ListPanel',
      'DetailPanel',
    ], nextI18nConfig),
  }
})

export default function JetStreamPage() {
  return (
    <AppController>
      <MainWebContainer/>
    </AppController>
  )
}
