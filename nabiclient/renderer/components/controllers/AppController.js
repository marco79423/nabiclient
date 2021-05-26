import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GA4React} from 'ga-4-react'
import useAsyncEffect from 'use-async-effect'
import {useTranslation} from 'next-i18next'
import {ipcRenderer} from 'electron'

import {getMessageCount, getSettingMaxMessageCount} from '../../redux/selectors'
import {changeConnectionState, changeProjectState, changeSubscribedStatus} from '../../redux/current'
import {ConnectionState, LoadingState, MessageSource} from '../../constants'
import {appendMessage, setProjectData} from '../../redux/project'
import generateRandomString from '../../utils/generateRandomString'
import {loadProjectDataFromLocalStorage,} from '../../features/project'
import Alert from '../elements/Alert'


export default function AppController({children}) {
  const dispatch = useDispatch()
  const {t} = useTranslation('common')

  const maxMessageCount = useSelector(getSettingMaxMessageCount)
  const messageCount = useSelector(getMessageCount)
  const track = useTrackFunc()

  const [alert, setAlert] = useState({})

  const showErrorAlert = (message) => {
    setAlert({
      severity: 'error',
      open: true,
      message,
    })
  }

  const showSuccessAlert = (message) => {
    setAlert({
      severity: 'success',
      open: true,
      message,
    })
  }

  const hideAlert = () => {
    setAlert({
      open: false,
    })
  }

  const connect = (url) => {
    ipcRenderer.send('connect', {url})
    console.log('renderer connect', url)
    dispatch(changeConnectionState(ConnectionState.Connected))
  }

  const disconnect = () => {
    ipcRenderer.send('disconnect')
    dispatch(changeConnectionState(ConnectionState.Idle))
  }

  const publishMessage = async (channel, messageBody) => {
    ipcRenderer.send('publish', channel, messageBody)

    track('send_message')
    showSuccessAlert(t('訊息已發布'))
  }

  const subscribeChannel = async (channel) => {
    ipcRenderer.send('subscribe', channel)
    dispatch(changeSubscribedStatus(true))
  }

  const unsubscribeChannel = async (channel) => {
    ipcRenderer.send('unsubscribe', channel)
    dispatch(changeSubscribedStatus(false))
  }

  const throwError = (message) => {
    showErrorAlert(message)
  }

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    ipcRenderer.on('new-message', async (event, subject, messageBody) => {
      await dispatch(appendMessage({
        id: generateRandomString(),
        time: new Date().toISOString(),
        subject: subject,
        body: messageBody,
      }))
    })

    const projectData = await loadProjectData()
    if (projectData) {
      await dispatch(setProjectData(projectData))
    }

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])


  const appController = {
    track,

    connect,
    disconnect,

    publishMessage,
    subscribeChannel,
    unsubscribeChannel,

    throwError,
  }

  return (
    <>
      {React.cloneElement(children, {appController})}

      <Alert
        open={alert.open}
        severity={alert.severity}
        message={alert.message}
        onClose={hideAlert}
      />
    </>
  )
}


function useTrackFunc() {
  const [gaObj, setGAObj] = useState(null)

  useEffect(() => {
    if (!gaObj) {
      const ga4react = new GA4React('G-TQZV496TYL')
      ga4react.initialize()
        .then((ga4) => {
          setGAObj(ga4)
        })
        .catch(() => {
          // 什麼都不做
        })
    }
  }, [])

  return (key, data) => {
    if (gaObj) {
      gaObj.gtag('event', key, data)
    }
  }
}

async function loadProjectData() {
  try {
    return await loadProjectDataFromLocalStorage()
  } catch {
    return null
  }
}
