import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {nanoid} from 'nanoid'
import {ipcRenderer} from 'electron'
import useAsyncEffect from 'use-async-effect'

import {AppMode, ConnectionState} from '../../constants'
import {appendMessage} from '../../redux/project'
import {useNotifications} from '../notifications'
import {selectAppMode} from '../../redux/selectors'

export const NATSContext = React.createContext({
  ready: false,
  connectionState: ConnectionState.Idle,
  subscribeStatus: false,
})

export default function NATSProvider({children}) {
  const dispatch = useDispatch()
  const notifications = useNotifications()

  const appMode = useSelector(selectAppMode)

  const [ready, setReady] = React.useState(false)
  const [connectionState, setConnectionState] = React.useState(ConnectionState.Idle)
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const isConnected = connectionState === ConnectionState.Connected

  useAsyncEffect(async () => {
    ipcRenderer.on('nats.new-message', async (event, subject, messageBody) => {
      await dispatch(appendMessage({
        id: nanoid(),
        time: new Date().toISOString(),
        subject: subject,
        body: messageBody,
      }))
    })

    setReady(true)
  }, [])


  const connect = (connectInfo) => {
    ipcRenderer.send('nats.connect', connectInfo)
    console.log('renderer nats.connect', connectInfo)
    setConnectionState(ConnectionState.Connected)
  }

  const disconnect = () => {
    ipcRenderer.send('nats.disconnect')
    setConnectionState(ConnectionState.Idle)
  }

  const subscribe = async (channel) => {
    ipcRenderer.send('nats.subscribe', channel)
    setIsSubscribed(true)
  }

  const unsubscribe = async (channel) => {
    ipcRenderer.send('nats.unsubscribe', channel)
    setIsSubscribed(false)
  }

  const publish = async (channel, message) => {
    try {
      ipcRenderer.send('nats.publish', channel, message)
      notifications.showSuccessMessage('訊息已發布')
    } catch (e) {
      console.log(e)
      notifications.showErrorMessage('請求傳送失敗')
    }
  }

  useAsyncEffect(async () => {
    if (connectionState === ConnectionState.Connected && appMode !== AppMode.NATS) {
      disconnect()
    }
  }, [appMode])

  const context = {
    ready,
    connectionState,
    isSubscribed,

    connect,
    disconnect,
    isConnected,

    subscribe,
    unsubscribe,

    publish,
  }

  return (
    <NATSContext.Provider value={context}>
      {children}
    </NATSContext.Provider>
  )
}
