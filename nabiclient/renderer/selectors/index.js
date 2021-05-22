import {createDraftSafeSelector} from '@reduxjs/toolkit'
import {messageAdapter} from '../slices/project'


export const getProjectState = state => state.current.projectState
export const getConnectionState = state => state.current.connectionState
export const getSelectedMessageID = state => state.current.selectedMessageID
export const getScheduleEnabledStatus = state => state.current.scheduleEnabled
export const getShareLink = state => state.current.shareLink

export const getProjectData = state => state.project
export const getProjectDataWithoutMessages = createDraftSafeSelector(
  getProjectData,
  projectData => ({
    ...projectData,
    message: messageAdapter.getInitialState(),
  })
)
export const getSettingMaxMessageCount = state => state.project.setting.maxMessageCount

export const getConnectionUrl = state => state.project.connection.url

export const getSubscribeChannel = state => state.project.subscribe.channel

export const getPublishChannel = state => state.project.publish.channel

export const getPublishMessageBody = state => state.project.publish.messageBody

const messageSelectors = messageAdapter.getSelectors(state => state.project.message)
export const getMessageCount = state => messageSelectors.selectTotal(state)
export const getMessages = state => messageSelectors.selectAll(state)
export const getMessage = createDraftSafeSelector(
  [
    getSelectedMessageID,
    state => id => messageSelectors.selectById(state, id),
  ],
  (selectedID, messageFunc) => messageFunc(selectedID),
)
