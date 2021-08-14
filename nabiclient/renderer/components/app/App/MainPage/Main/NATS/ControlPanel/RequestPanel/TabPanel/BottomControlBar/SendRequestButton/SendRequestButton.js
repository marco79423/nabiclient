import React from 'react'
import {useSelector} from 'react-redux'

import {AppMode, ConnectionState} from '../../../../../../../../../../../constants'
import {
  selectAppMode,
  selectPublishChannel,
  selectPublishMessageBody
} from '../../../../../../../../../../../redux/selectors'
import {useNATS} from '../../../../../../../../../../../features/nats'
import {useSTAN} from '../../../../../../../../../../../features/stans'
import Button from '../../../../../../../../../../elements/Button'


export default function SendRequestButton() {
  const appMode = useSelector(selectAppMode)
  const nats = useNATS()
  const stan = useSTAN()

  const channel = useSelector(selectPublishChannel)
  const requestBody = useSelector(selectPublishMessageBody)

  const client = React.useMemo(() => {
    switch (appMode) {
      case AppMode.NATS:
        return nats
      case AppMode.Streaming:
        return stan
    }
  }, [appMode, nats, stan])


  const onClick = async () => {
    await client.publish(channel, requestBody)
  }

  return (
    <Button disabled={!client.isConnected} onClick={onClick}>送出</Button>
  )
}

SendRequestButton.propTypes = {}
