import {app, ipcMain} from 'electron'
import serve from 'electron-serve'

import {createWindow} from './helpers'
import {connectNATS} from './utils/NATSClient'

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


let natsClient

ipcMain.on('connect', async (event, {url}) => {
  natsClient = await connectNATS(url)
})

ipcMain.on('disconnect', async (event) => {
  await natsClient.disconnect()
})

ipcMain.on('publish', async (event, channel, messageBody) => {
  await natsClient.publish(channel, messageBody)
})

ipcMain.on('subscribe', async (event, channel) => {
  await natsClient.subscribe(channel, (subject, messageBody) => {
    event.reply('new-message', subject, messageBody)
  })
})

ipcMain.on('unsubscribe', async (event, channel) => {
  await natsClient.unsubscribe(channel)
})
