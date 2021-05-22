import React, {useState} from 'react'
import {useTranslation} from 'next-i18next'
import {useDispatch, useSelector} from 'react-redux'

import {
  getConnectionState,
  getFavoriteRequests,
  getRequestBody,
  getScheduleEnabledStatus,
  getScheduleTimeInterval
} from '../../../../selectors'
import generateRandomString from '../../../../utils/generateRandomString'
import {
  addFavoriteRequest,
  changeRequestBody,
  changeScheduleTimeInterval,
  removeFavoriteRequest,
  updateFavoriteRequest
} from '../../../../slices/project'
import {ConnectionState} from '../../../../constants'
import RequestPanel from '../../../modules/web/ControlPanel/RequestPanel'

export default function RequestPanelContainer({appController}) {
  const dispatch = useDispatch()
  const {t} = useTranslation('ControlPanel')
  const connectionState = useSelector(getConnectionState)
  const requestBody = useSelector(getRequestBody)
  const scheduleEnabled = useSelector(getScheduleEnabledStatus)
  const timeInterval = useSelector(getScheduleTimeInterval)
  const [favoriteRequestID, setFavoriteRequestID] = useState(null)
  const [localRequestBody, setLocalRequestBody] = useState(requestBody)
  const [localScheduleTimeInterval, setLocalTimeInterval] = useState(timeInterval)

  const onRequestBodyChange = (value) => {
    setLocalRequestBody(value)
    dispatch(changeRequestBody(localRequestBody))
    setFavoriteRequestID(null)
  }

  const onScheduleTimeIntervalChange = (timeInterval) => {
    setLocalTimeInterval(+timeInterval)
    dispatch(changeScheduleTimeInterval(+localScheduleTimeInterval))
  }

  const onSendMessage = async () => {
    dispatch(changeRequestBody(localRequestBody))
    try {
      await appController.sendMessage(localRequestBody)
    } catch (e) {
      console.log(e)
      appController.throwError(t('請求傳送失敗'))
    }
  }

  const onFavoriteRequestSet = () => {
    const favoriteRequest = {
      id: generateRandomString(),
      name: new Date().toLocaleString(),
      body: localRequestBody,
    }
    dispatch(addFavoriteRequest(favoriteRequest))
    setFavoriteRequestID(favoriteRequest.id)
    appController.track('add_favorite_message')
  }

  const onFavoriteRequestUnset = () => {
    dispatch(removeFavoriteRequest(favoriteRequestID))
    setFavoriteRequestID(null)
  }

  const onEnableButtonClick = async () => {
    if (scheduleEnabled) {
      await appController.disableScheduler()
    } else {
      await appController.enableScheduler(localRequestBody, +localScheduleTimeInterval)
    }
  }

  const showFavoriteRequestDialog = () => {
    setFavoriteRequestDialog(true)
    appController.track('show_favorite_requests_panel')
  }

  const isConnected = connectionState === ConnectionState.Connected

  return (
    <>
      <RequestPanel
        isConnected={isConnected}

        requestBody={localRequestBody}
        onRequestBodyChange={onRequestBodyChange}

        favoriteRequestID={favoriteRequestID}
        showFavoriteRequestDialog={showFavoriteRequestDialog}
        onFavoriteRequestSet={onFavoriteRequestSet}
        onFavoriteRequestUnset={onFavoriteRequestUnset}

        scheduleTimeInterval={localScheduleTimeInterval}
        onScheduleTimeIntervalChange={onScheduleTimeIntervalChange}

        onSendMessage={onSendMessage}

        scheduleEnabled={scheduleEnabled}
        onEnableButtonClick={onEnableButtonClick}
      />
    </>
  )
}
