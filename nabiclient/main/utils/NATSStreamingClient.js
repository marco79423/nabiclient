import {connect} from 'node-nats-streaming'

class NATSStreamingClient {
  constructor() {
    this.client = null
    this.isReady = false
    this.subscriptions = new Map()
  }

  connect = async (clusterID, clientID, {url}) => {
    this.client = connect(clusterID, clientID, {
      url: 'nats://localhost:4222'
    })

    this.client.on('connect', () => {
      this.isReady = true
      console.log(`連線到 NATS Streaming 服務器 (${url})`)
    })
  }

  publish = async (channel, messageBody) => {
    this.client.publish(channel, messageBody)
    console.log(`發布訊息 ${messageBody} 至頻道 ${channel}`)
  }

  subscribe = async (channel, callback) => {
    this.subscriptions.set(channel, this.client.subscribe(channel))
    console.log(`訂閱頻道 ${channel}`)

    this.subscriptions.get(channel).on('message', (msg) => {
      const [subject, messageBody] = [msg.getSubject(), msg.getData()]
      callback(subject, messageBody)
      console.log(`收到 ${subject} 的新訊息 ${messageBody}`)
    })
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
    await this.client.close()
    this.client = null
  }
}

export async function connectNATSStreaming(clusterID, clientID, connectInfo) {
  const natsClient = new NATSStreamingClient()
  await natsClient.connect(clusterID, clientID, connectInfo)
  return natsClient
}
