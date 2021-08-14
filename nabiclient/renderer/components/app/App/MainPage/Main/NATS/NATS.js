import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ControlPanel from './ControlPanel'
import MessagePanel from './MessagePanel'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  controlPanel: {
    flex: 1,
    maxWidth: 500,
  },
  messagePanel: {
    flex: 1,
  }
}))


export default function NATS() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className={classes.controlPanel}>
        <ControlPanel/>
      </div>
      <div className={classes.messagePanel}>
        <MessagePanel/>
      </div>
    </div>
  )
}
