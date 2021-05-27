import React from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import {changeClientID, changeClusterID, changeConnectionUrl} from '../../../../redux/project'
import {getClientID, getClusterID, getConnectionState, getConnectionUrl} from '../../../../redux/selectors'
import ConnectionPanel from '../../../modules/streaming/ControlPanel/ConnectionPanel'


export default function ConnectionPanelContainer({appController}) {
  const dispatch = useDispatch()
  const connectionState = useSelector(getConnectionState)
  const connectionUrl = useSelector(getConnectionUrl)
  const clusterID = useSelector(getClusterID)
  const clientID = useSelector(getClientID)

  const connect = async ({url, clusterID, clientID}) => {
    await dispatch(changeConnectionUrl(url))
    await dispatch(changeClusterID(clusterID))
    await dispatch(changeClientID(clientID))
    await appController.connectNATSStreaming({url, clusterID, clientID})
  }

  const disconnect = async () => {
    await appController.disconnectNATSStreaming()
  }

  return (
    <ConnectionPanel
      state={connectionState}
      url={connectionUrl}
      clusterID={clusterID}
      clientID={clientID}
      connect={connect}
      disconnect={disconnect}
    />
  )
}

ConnectionPanelContainer.propTypes = {
  appController: PropTypes.object.isRequired,
}
