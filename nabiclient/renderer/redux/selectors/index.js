import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {entityAdapter} from '../project'

export const selectAppMode = state => state.current.appMode

export const selectProjectState = state => state.current.projectState
export const selectSelectedMessageID = state => state.current.selectedMessageID
export const selectMessagePanelOn = state => state.current.messagePanelOn

const searchQuerySelectors = entityAdapter.getSelectors(state => state.current.searchQuery)
export const selectSearchQueryIDs = state => searchQuerySelectors.selectIds(state)
export const selectSearchQueries = state => searchQuerySelectors.selectAll(state)
export const selectSearchQuery = id => state => searchQuerySelectors.selectById(state, id)

export const selectProjectData = state => state.project
export const selectProjectDataWithoutMessages = createDraftSafeSelector(
  selectProjectData,
  projectData => ({
    ...projectData,
    message: entityAdapter.getInitialState(),
  })
)
export const selectSettingMaxMessageCount = state => state.project.setting.maxMessageCount

export const selectConnectionUrl = state => state.project.connection.url

export const selectClusterID = state => state.project.connection.clusterID

export const selectClientID = state => state.project.connection.clientID

export const selectSubscribeChannel = state => state.project.subscribe.channel

export const selectPublishChannel = state => state.project.publish.channel

export const selectPublishMessageBody = state => state.project.publish.messageBody

const messageSelectors = entityAdapter.getSelectors(state => state.project.message)
export const selectAllMessages = state => messageSelectors.selectAll(state)
export const selectFilterMessageIDs = createDraftSafeSelector(
  [
    selectAllMessages,
    selectSearchQueries,
  ],
  (messages, searchQueries) => messages
    .filter(message => searchQueries.map(searchQuery => message.body.includes(searchQuery.value)).reduce((a, b) => a && b, true))
    .map(message => message.id)
)

export const selectMessage = id => state => messageSelectors.selectById(state, id)
export const selectSelectedMessage = createDraftSafeSelector(
  [
    selectSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
