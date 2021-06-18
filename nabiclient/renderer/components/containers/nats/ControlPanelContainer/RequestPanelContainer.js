import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {
  getConnectionState,
  getIsSubscribed,
  getPublishChannel,
  getPublishMessageBody,
  getSubscribeChannel
} from '../../../../redux/selectors'
import {changePublishChannel, changePublishMessageBody, changeSubscribeChannel} from '../../../../redux/project'
import {ConnectionState} from '../../../../constants'
import RequestPanel from '../../../modules/nats/ControlPanel/RequestPanel'

export default function RequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const {t} = useTranslation()
  const connectionState = useSelector(getConnectionState)
  const isSubscribed = useSelector(getIsSubscribed)
  const subscribeChannel = useSelector(getSubscribeChannel)
  const publishChannel = useSelector(getPublishChannel)
  const publishMessageBody = useSelector(getPublishMessageBody)

  const [localSubscribeChannel, setLocalSubscribeChannel] = useState(subscribeChannel)
  const [localPublishChannel, setLocalPublishChannel] = useState(publishChannel)
  const [localPublishMessageBody, setLocalPublishMessageBody] = useState(publishMessageBody)

  const onSubscribeChannelChange = (value) => {
    setLocalSubscribeChannel(value)
    dispatch(changeSubscribeChannel(value))
  }

  const onPublishChannelChange = (value) => {
    setLocalPublishChannel(value)
    dispatch(changePublishChannel(value))
  }

  const onPublishMessageBodyChange = (value) => {
    setLocalPublishMessageBody(value)
    dispatch(changePublishMessageBody(value))
  }

  const onSubscribeChannel = async () => {
    await appController.subscribeNATSChannel(localSubscribeChannel)
  }

  const onUnsubscribeChannel = async () => {
    await appController.unsubscribeNATSChannel(localSubscribeChannel)
  }

  const onPublishMessage = async () => {
    dispatch(changePublishChannel(localPublishChannel))
    dispatch(changePublishMessageBody(localPublishMessageBody))

    try {
      await appController.publishNATSMessage(localPublishChannel, localPublishMessageBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('請求傳送失敗'))
    }
  }

  const isConnected = connectionState === ConnectionState.Connected

  return (
    <>
      <RequestPanel
        isConnected={isConnected}

        subscribeChannel={localSubscribeChannel}
        onSubscribeChannelChange={onSubscribeChannelChange}

        publishChannel={localPublishChannel}
        onPublishChannelChange={onPublishChannelChange}

        publishMessageBody={localPublishMessageBody}
        onPublishMessageBodyChange={onPublishMessageBodyChange}

        isSubscribed={isSubscribed}
        onSubscribeChannel={onSubscribeChannel}
        onUnsubscribeChannel={onUnsubscribeChannel}
        onPublishMessage={onPublishMessage}
      />
    </>
  )
}
