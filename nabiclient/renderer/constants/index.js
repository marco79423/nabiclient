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
