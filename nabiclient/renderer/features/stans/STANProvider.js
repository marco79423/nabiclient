import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ipcRenderer} from 'electron'
import useAsyncEffect from 'use-async-effect'

import {AppMode, ConnectionState} from '../../constants'
import {appendMessage} from '../../redux/project'
import {useNotifications} from '../notifications'
import {nanoid} from 'nanoid'
import {selectAppMode} from '../../redux/selectors'

export const STANContext = React.createContext({
  ready: false,
  connectionState: ConnectionState.Idle,
  isSubscribed: false,
})

export default function STANProvider({children}) {
  const dispatch = useDispatch()
  const notifications = useNotifications()

  const appMode = useSelector(selectAppMode)

  const [ready, setReady] = React.useState(false)
  const [connectionState, setConnectionState] = React.useState(ConnectionState.Idle)
  const [isSubscribed, setIsSubscribed] = React.useState(false)
  const isConnected = React.useMemo(() => connectionState === ConnectionState.Connected, [connectionState])

  useAsyncEffect(async () => {
    ipcRenderer.on('nats-streaming.new-message', async (event, subject, messageBody) => {
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
    ipcRenderer.send('nats-streaming.connect', connectInfo)
    console.log('renderer nats-streaming.connect', connectInfo)
    setConnectionState(ConnectionState.Connected)
  }

  const disconnect = () => {
    ipcRenderer.send('nats-streaming.disconnect')
    setConnectionState(ConnectionState.Idle)
    setIsSubscribed(false)
  }

  const subscribe = async (channel) => {
    ipcRenderer.send('nats-streaming.subscribe', channel)
    setIsSubscribed(true)
  }

  const unsubscribe = async (channel) => {
    ipcRenderer.send('nats-streaming.unsubscribe', channel)
    setIsSubscribed(false)
  }

  const publish = async (channel, message) => {
    try {
      ipcRenderer.send('nats-streaming.publish', channel, message)
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
    <STANContext.Provider value={context}>
      {children}
    </STANContext.Provider>
  )
}
