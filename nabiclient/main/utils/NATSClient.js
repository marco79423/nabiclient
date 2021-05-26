import {ipcMain} from 'electron'
import {connect, StringCodec} from 'nats'

class NATSClient {
  constructor() {
    this.client = null
    this.subscriptions = new Map()
  }

  connect = async ({url}) => {
    this.client = await connect(url)
    console.log(`連線到 NATS 服務器 (${url})`)
  }

  publish = async (channel, messageBody) => {
    const sc = StringCodec()
    await this.client.publish(channel, sc.encode(messageBody))
    console.log(`發布訊息 ${messageBody} 至頻道 ${channel}`)
  }

  subscribe = async (channel, callback) => {
    const sc = StringCodec()
    this.subscriptions.set(channel, this.client.subscribe(channel))
    console.log(`訂閱頻道 ${channel}`)

    for await (const m of this.subscriptions.get(channel)) {
      const [subject, messageBody] = [m.subject, sc.decode(m.data)]
      callback(subject, messageBody)
      console.log(`收到 ${subject} 的新訊息 ${messageBody}`)
    }
  }

  unsubscribe = async (channel) => {
    this.subscriptions.get(channel).unsubscribe()
    this.subscriptions.delete(channel)
    console.log(`取消訂閱頻道 ${channel}`)
  }

  disconnect = async () => {
    for (const channel of this.subscriptions.keys()) {
      await this.unsubscribe(channel)
    }
    await this.client.drain()
    this.client = null
  }
}

export async function connectNATS(connectInfo) {
  const natsClient = new NATSClient()
  await natsClient.connect(connectInfo)
  return natsClient
}
