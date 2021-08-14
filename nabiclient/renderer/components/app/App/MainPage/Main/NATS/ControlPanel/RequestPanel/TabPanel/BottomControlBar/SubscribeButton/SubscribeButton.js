import React from 'react'
import {useSelector} from 'react-redux'

import {AppMode} from '../../../../../../../../../../../constants'
import {selectAppMode, selectSubscribeChannel} from '../../../../../../../../../../../redux/selectors'
import {useNATS} from '../../../../../../../../../../../features/nats'
import Button from '../../../../../../../../../../elements/Button'
import {useSTAN} from '../../../../../../../../../../../features/stans'

export default function SubscribeButton() {
  const appMode = useSelector(selectAppMode)
  const nats = useNATS()
  const stan = useSTAN()
  const subscribeChannel = useSelector(selectSubscribeChannel)
  const client = React.useMemo(() => {
    switch (appMode) {
      case AppMode.NATS:
        return nats
      case AppMode.Streaming:
        return stan
    }
  }, [appMode, nats, stan])

  const onSubscribeButtonClick = async () => {
    await client.subscribe(subscribeChannel)
  }

  const onUnsubscribeButtonClick = async () => {
    await client.unsubscribe(subscribeChannel)
  }

  return (
    client.isSubscribed ? (
      <Button onClick={onUnsubscribeButtonClick}>取消訂閱</Button>
    ) : (
      <Button disabled={!client.isConnected || !subscribeChannel} onClick={onSubscribeButtonClick}>訂閱</Button>
    )
  )
}

SubscribeButton.propTypes = {}
