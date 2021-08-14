import React from 'react'
import {useSelector} from 'react-redux'

import {AppMode} from '../../../../../../../../constants'
import {selectAppMode} from '../../../../../../../../redux/selectors'
import NATSConnectionPanel from './NATSConnectionPanel'
import STANConnectionPanel from './STANConnectionPanel'


export default function ConnectionPanel() {
  const appMode = useSelector(selectAppMode)

  return (
    appMode === AppMode.NATS ? (
      <NATSConnectionPanel/>
    ) : (
      <STANConnectionPanel/>
    )
  )
}

ConnectionPanel.propTypes = {}
