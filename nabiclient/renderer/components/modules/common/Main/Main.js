import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

import {LoadingState} from '../../../../constants'
import DefaultLayout from '../../../layouts/DefaultLayout'


const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    display: 'flex',
    background: theme.project.page.main.background,
    height: 'calc(100vh - 64px)',
    position: 'relative',
    overflowY: 'hidden',
  },
  controlPanel: {
    zIndex: 1,
    width: 500,
  },
  listPanel: {
    flex: 1,
    overflow: 'hidden',
  },
  detailPanel: {
    flex: 1,
    overflow: 'hidden',
  },
}))

export default function Main({appMode, changeAppMode, projectState, controlPanel, listPanel, detailPanel}) {
  const classes = useStyles()

  return (
    <DefaultLayout
      appMode={appMode}
      changeAppMode={changeAppMode}
      loading={projectState === LoadingState.Loading}
    >
      <main className={classes.main}>
        <div className={classes.controlPanel}>
          {controlPanel}
        </div>
        <div className={classes.listPanel}>
          {listPanel}
        </div>
        <div className={classes.detailPanel}>
          {detailPanel}
        </div>
      </main>
    </DefaultLayout>
  )
}
