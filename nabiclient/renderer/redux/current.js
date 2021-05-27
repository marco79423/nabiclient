import {createAction, createSlice} from '@reduxjs/toolkit'

import {ConnectionState, LoadingState} from '../constants'


// Actions
export const initialize = createAction('current/initialize')

export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeSubscribedStatus = createAction('current/changeSubscribedStatus')

const InitialState = {
  projectState: LoadingState.Idle, // idle, loading, loaded, failed
  connectionState: ConnectionState.Idle, // idle, connecting, connected, closed
  selectedMessageID: null,
  isSubscribed: false,
}

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: InitialState,
  extraReducers: {
    [initialize]: () => {
      return InitialState
    },
    [changeProjectState]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState]: (state, action) => {
      state.connectionState = action.payload
    },
    [setSelectedMessageID]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [changeSubscribedStatus]: (state, action) => {
      state.isSubscribed = action.payload
    },
  }
})


// Reducer
export default currentSlice
