import {createAction, createEntityAdapter, createSlice} from '@reduxjs/toolkit'


// Actions
export const setProjectData = createAction('project/setProjectData')

export const changeSettingMaxMessageCount = createAction('project/setting/changeSettingMaxMessageCount')

export const changeConnectionUrl = createAction('project/connection/changeConnectionUrl')

export const changeSubscribeChannel = createAction('project/subscribe/changeSubscribeChannel')

export const changePublishChannel = createAction('project/publish/changePublishChannel')

export const changePublishMessageBody = createAction('project/publish/changePublishMessageBody')

export const appendMessage = createAction('project/message/appendMessage')

export const removeFirstMessage = createAction( 'project/message/removeFirstMessage')

export const clearMessages = createAction(  'project/message/clearMessages')

// Slice
export const messageAdapter = createEntityAdapter()
const projectSlice = createSlice({
  name: 'project',
  initialState: {
    // 設定
    setting: {
      maxMessageCount: 100,
    },

    // 連線資訊
    connection: {
      url: 'localhost:4222',
    },

    subscribe: {
      channel: '',
    },

    publish: {
      channel: '',
      messageBody: '',
    },

    // 訊息
    message: messageAdapter.getInitialState(),
  },
  extraReducers: {
    [setProjectData]: (state, action) => {
      return action.payload
    },
    [changeSettingMaxMessageCount]: (state, action) => {
      state.setting.maxMessageCount = action.payload
    },
    [changeConnectionUrl]: (state, action) => {
      state.connection.url = action.payload
    },
    [changeSubscribeChannel]: (state, action) => {
      state.subscribe.channel = action.payload
    },
    [changePublishChannel]: (state, action) => {
      state.publish.channel = action.payload
    },
    [changePublishMessageBody]: (state, action) => {
      state.publish.messageBody = action.payload
    },
    [removeFirstMessage]: (state) => {
      messageAdapter.removeOne(state.message, state.message.ids[0])
    },
    [appendMessage]: (state, action) => {
      messageAdapter.addOne(state.message, action.payload)
    },
    [clearMessages]: (state) => {
      messageAdapter.removeAll(state.message)
    },
  },
})

// Reducer
export default projectSlice
