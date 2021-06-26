import React, {memo} from 'react'
import PropTypes from 'prop-types'
import {makeStyles} from '@material-ui/core/styles'
import ListItem from '../../../elements/ListItem'

const useStyles = makeStyles((theme) => ({
  messageSubject: {
    color: theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '1.2rem',
  },
  messageTime: {
    color: theme.project.page.main.listPanel.message.server.textColor,
    fontSize: '0.8rem',
  },
  messageContent: {
    width: '100%',
    height: 40,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: theme.project.page.main.listPanel.message.server.textColor,
  },
}))

export function Message({message, selectedMessageID, onSelectedMessageChange}) {
  const classes = useStyles()
  const selected = message.id === selectedMessageID

  const onSelected = () => {
    if (selected) {
      onSelectedMessageChange(null)
    } else {
      onSelectedMessageChange(message.id)
    }
  }

  const MessageTitle = ({message}) => {
    const time = new Date(message.time).toLocaleString()
    return (
      <>
        <span className={classes.messageSubject}>{message.subject}</span>
        <span className={classes.messageTime}> [{time}]</span>
      </>
    )
  }

  return (
    <ListItem
      selected={selected}
      title={<MessageTitle message={message}/>}
      onClick={onSelected}>
      <span className={classes.messageContent}>{message.body}</span>
    </ListItem>
  )
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  selectedMessageID: PropTypes.string,
  onSelectedMessageChange: PropTypes.func.isRequired,
}

export default memo(Message)
