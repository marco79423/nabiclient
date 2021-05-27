import {app, ipcMain} from 'electron'
import serve from 'electron-serve'

import {createWindow} from './helpers'
import {connectNATS} from './utils/NATSClient'
import {connectNATSStreaming} from './utils/NATSStreamingClient'

const isProd = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({directory: 'app'})
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1600,
    height: 900,
  })

  if (isProd) {
    await mainWindow.loadURL('app://./index.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}`)
    mainWindow.webContents.openDevTools()

    const {default: installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS} = require('electron-devtools-installer')

    for (const extension of [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS]) {
      await installExtension(extension)
    }
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})


// NATS

let natsClient

ipcMain.on('nats.connect', async (event, connectInfo) => {
  natsClient = await connectNATS(connectInfo)
})

ipcMain.on('nats.disconnect', async (event) => {
  await natsClient.disconnect()
})

ipcMain.on('nats.publish', async (event, channel, messageBody) => {
  await natsClient.publish(channel, messageBody)
})

ipcMain.on('nats.subscribe', async (event, channel) => {
  await natsClient.subscribe(channel, (subject, messageBody) => {
    event.reply('nats.new-message', subject, messageBody)
  })
})

ipcMain.on('nats.unsubscribe', async (event, channel) => {
  await natsClient.unsubscribe(channel)
})

// NATS Streaming

let natsStreamingClient

ipcMain.on('nats-streaming.connect', async (event, connectInfo) => {
  natsStreamingClient = await connectNATSStreaming(connectInfo)
})

ipcMain.on('nats-streaming.disconnect', async (event) => {
  await natsStreamingClient.disconnect()
})

ipcMain.on('nats-streaming.publish', async (event, channel, messageBody) => {
  await natsStreamingClient.publish(channel, messageBody)
})

ipcMain.on('nats-streaming.subscribe', async (event, channel) => {
  await natsStreamingClient.subscribe(channel, (subject, messageBody) => {
    event.reply('nats-streaming.new-message', subject, messageBody)
  })
})

ipcMain.on('nats-streaming.unsubscribe', async (event, channel) => {
  await natsStreamingClient.unsubscribe(channel)
})
