import {app, ipcMain} from 'electron'
import serve from 'electron-serve'
import {createWindow} from './helpers'
import {connect, StringCodec} from 'nats'

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
let subscription

ipcMain.on('connect', async (event, {url}) => {
  natsClient = await connect(url)

  console.log('main connect', url)
})

ipcMain.on('disconnect', async (event) => {
  await natsClient.drain()
  natsClient = null
})

ipcMain.on('publish', (event, channel, message) => {
  const sc = StringCodec()
  natsClient.publish(channel, sc.encode(message))
  console.log('main publish', channel, message)
})

ipcMain.on('subscribe', async (event, channel) => {
  const sc = StringCodec()
  subscription = natsClient.subscribe(channel)
  console.log('main subscribe', channel)
  for await (const m of subscription) {
    event.reply('new-message', sc.decode(m.data))
    console.log('main new message', channel, sc.decode(m.data), m.subject)
  }
})

ipcMain.on('unsubscribe', async (event ) => {
  subscription.unsubscribe()
  subscription = null
  console.log('main unsubscribe')
})
