import {createAction, createSlice} from '@reduxjs/toolkit'

import {AppMode, LoadingState} from '../constants'
import {entityAdapter} from './project'


// Actions
export const initialize = createAction('current/initialize')

export const changeAppMode = createAction('current/changeAppMode')

export const changeProjectState = createAction('current/changeProjectState')

export const changeConnectionState = createAction('current/changeConnectionState')

export const addSearchQuery = createAction('current/addSearchQuery')

export const removeSearchQuery = createAction('current/removeSearchQuery')

export const clearSearchQueries = createAction('current/clearSearchQueries')

export const setSelectedMessageID = createAction('current/setSelectedMessageID')

export const changeSubscribedStatus = createAction('current/changeSubscribedStatus')

export const showMessagePanel = createAction('current/showMessagePanel')

const InitialState = {
  appMode: AppMode.NATS,

  projectState: LoadingState.Idle, // idle, loading, loaded, failed
  selectedMessageID: null,

  searchQuery: entityAdapter.getInitialState(),
  messagePanelOn: false,
}

// Slice
const currentSlice = createSlice({
  name: 'current',
  initialState: InitialState,
  extraReducers: {
    [initialize]: () => {
      return InitialState
    },
    [changeAppMode]: (state, action) => {
      state.appMode = action.payload
    },
    [changeProjectState]: (state, action) => {
      state.projectState = action.payload
    },
    [changeConnectionState]: (state, action) => {
      state.connectionState = action.payload
    },
    [addSearchQuery]: (state, action) => {
      entityAdapter.addOne(state.searchQuery, action.payload)
    },
    [removeSearchQuery]: (state, action) => {
      entityAdapter.removeOne(state.searchQuery, action.payload)
    },
    [clearSearchQueries]: (state) => {
      entityAdapter.removeAll(state.searchQuery)
    },
    [setSelectedMessageID]: (state, action) => {
      state.selectedMessageID = action.payload
    },
    [showMessagePanel]: (state, action) => {
      state.messagePanelOn = action.payload
    },
  }
})


// Reducer
export default currentSlice
