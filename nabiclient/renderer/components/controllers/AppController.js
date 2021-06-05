import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GA4React} from 'ga-4-react'
import useAsyncEffect from 'use-async-effect'
import {useTranslation} from 'next-i18next'
import {ipcRenderer} from 'electron'
import {changeConnectionState, changeProjectState, changeSubscribedStatus, initialize} from '../../redux/current'
import {AppMode, ConnectionState, LoadingState} from '../../constants'
import {appendMessage} from '../../redux/project'
import generateRandomString from '../../utils/generateRandomString'
import Alert from '../elements/Alert'
import {useRouter} from 'next/router'
import {getConnectionState} from '../../redux/selectors'


export default function AppController({children}) {
  const dispatch = useDispatch()
  const connectState = useSelector(getConnectionState)
  const {t} = useTranslation('common')
  const router = useRouter()
  const track = useTrackFunc()
  const [appMode, setAppMode] = useState(AppMode.NATS)
  const [alert, setAlert] = useState({})

  useEffect(() => {
    switch (router.pathname) {
      case '/':
        setAppMode(AppMode.NATS)
        break
      case '/streaming':
        setAppMode(AppMode.Streaming)
        break
    }
  }, [router.pathname])

  const getAppMode = () => {
    return appMode
  }

  const reset = async () => {
    if (connectState === ConnectionState.Connected) {
      switch (appMode) {
        case AppMode.NATS:
          await disconnectNATS()
          break
        case AppMode.Streaming:
          await disconnectNATSStreaming()
          break
      }
    }

    await initialize()
  }

  const changeAppMode = async (appMode) => {
    await reset()

    switch (appMode) {
      case AppMode.NATS:
        await router.push('/')
        break
      case AppMode.Streaming:
        await router.push('/streaming')
        break
    }
  }

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

  // NATS

  const connectNATS = (connectInfo) => {
    ipcRenderer.send('nats.connect', connectInfo)
    console.log('renderer nats.connect', connectInfo)
    dispatch(changeConnectionState(ConnectionState.Connected))
  }

  const disconnectNATS = () => {
    ipcRenderer.send('nats.disconnect')
    dispatch(changeConnectionState(ConnectionState.Idle))
  }

  const publishNATSMessage = async (channel, messageBody) => {
    ipcRenderer.send('nats.publish', channel, messageBody)
    showSuccessAlert(t('訊息已發布'))
  }

  const subscribeNATSChannel = async (channel) => {
    ipcRenderer.send('nats.subscribe', channel)
    dispatch(changeSubscribedStatus(true))
  }

  const unsubscribeNATSChannel = async (channel) => {
    ipcRenderer.send('nats.unsubscribe', channel)
    dispatch(changeSubscribedStatus(false))
  }

  // NATS Streaming

  const connectNATSStreaming = (connectInfo) => {
    ipcRenderer.send('nats-streaming.connect', connectInfo)
    console.log('renderer nats-streaming.connect', connectInfo)
    dispatch(changeConnectionState(ConnectionState.Connected))
  }

  const disconnectNATSStreaming = () => {
    ipcRenderer.send('nats-streaming.disconnect')
    dispatch(changeConnectionState(ConnectionState.Idle))
  }

  const publishNATSStreamingMessage = async (channel, messageBody) => {
    ipcRenderer.send('nats-streaming.publish', channel, messageBody)
    showSuccessAlert(t('訊息已發布'))
  }

  const subscribeNATSStreamingChannel = async (channel) => {
    ipcRenderer.send('nats-streaming.subscribe', channel)
    dispatch(changeSubscribedStatus(true))
  }

  const unsubscribeNATSStreamingChannel = async (channel) => {
    ipcRenderer.send('nats-streaming.unsubscribe', channel)
    dispatch(changeSubscribedStatus(false))
  }

  const throwError = (message) => {
    showErrorAlert(message)
  }

  useAsyncEffect(async () => {
    await dispatch(changeProjectState(LoadingState.Loading))

    ipcRenderer.on('nats.new-message', async (event, subject, messageBody) => {
      await dispatch(appendMessage({
        id: generateRandomString(),
        time: new Date().toISOString(),
        subject: subject,
        body: messageBody,
      }))
    })

    ipcRenderer.on('nats-streaming.new-message', async (event, subject, messageBody) => {
      await dispatch(appendMessage({
        id: generateRandomString(),
        time: new Date().toISOString(),
        subject: subject,
        body: messageBody,
      }))
    })

    await dispatch(changeProjectState(LoadingState.Loaded))
  }, [])


  const appController = {
    getAppMode,
    changeAppMode,

    track,

    connectNATS,
    disconnectNATS,

    publishNATSMessage,
    subscribeNATSChannel,
    unsubscribeNATSChannel,

    connectNATSStreaming,
    disconnectNATSStreaming,

    publishNATSStreamingMessage,
    subscribeNATSStreamingChannel,
    unsubscribeNATSStreamingChannel,

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
