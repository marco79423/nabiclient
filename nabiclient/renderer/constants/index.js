export const AppMode = Object.freeze({
  NATS: 'NATS',
  Streaming: 'Streaming'
})

export const LoadingState = Object.freeze({
  Idle: 'idle',
  Loading: 'loading',
  Loaded: 'loaded',
  Failed: 'failed',
})

export const ConnectionState = Object.freeze({
  Idle: 'idle',
  Connecting: 'connecting',
  Connected: 'connected',
  Closing: 'closing',
})

export const MessageSource = Object.freeze({
  Server: 'server',
  Client: 'client'
})

export const PanelTab = Object.freeze({
  Publish: 'publish',
  Subscribe: 'subscribe',
})

export const DetailMode = Object.freeze({
  PlainText: 'plain-text',
  JSON: 'json',
})
