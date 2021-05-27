import React, {useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import * as projectActions from '../../../../redux/project'
import * as currentActions from '../../../../redux/current'
import {getMessages, getSelectedMessageID} from '../../../../redux/selectors'
import ListPanel from '../../../modules/common/ListPanel/ListPanel'


export default function ListPanelContainer({appController}) {
  const dispatch = useDispatch()
  const messages = useSelector(getMessages)
  const selectedMessageID = useSelector(getSelectedMessageID)

  const onSelectedMessageChange = useCallback((id) => {
    dispatch(currentActions.setSelectedMessageID(id))
  }, [])

  const clearAllMessages = () => {
    dispatch(projectActions.clearMessages())
    dispatch(currentActions.setSelectedMessageID(null))
    appController.track('clear_messages')
  }

  return (
    <ListPanel
      messages={messages}
      selectedMessageID={selectedMessageID}
      onSelectedMessageChange={onSelectedMessageChange}
      onClearAllMessages={clearAllMessages}
    />
  )
}
